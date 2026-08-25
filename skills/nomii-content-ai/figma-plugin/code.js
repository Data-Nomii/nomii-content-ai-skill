// NOMII Carousel Builder — Figma plugin main thread.
// Lee un carousel.figma.json (contrato de la skill NOMII) y crea láminas
// 1080x1440 editables con la marca NOMII y capas nombradas de forma estable.

figma.showUI(__html__, { width: 380, height: 560 });

// ---- Marca NOMII ----
const W = 1080, H = 1440;
const SAFE_Y = 85, SAFE_X = 63;
const LOGO_W = 200, LOGO_H = 76;   // logo 2250x851 -> ratio 0.378
const GAP = 120;                   // separación entre frames

const C = {
  celeste: hex(0x77, 0xBF, 0xD0),
  azul:    hex(0x10, 0x45, 0x74),
  dark:    hex(0x3C, 0x3C, 0x3B),
  soft:    hex(0xF8, 0xF8, 0xF8),
  white:   { r: 1, g: 1, b: 1 },
};
function hex(r, g, b) { return { r: r / 255, g: g / 255, b: b / 255 }; }
function solid(color, opacity) { return [{ type: 'SOLID', color: color, opacity: opacity == null ? 1 : opacity }]; }

// FONT se resuelve en loadFonts() a estilos realmente disponibles (con fallback).
const FONT = {
  light:  { family: 'Rubik', style: 'Light' },
  medium: { family: 'Rubik', style: 'Medium' },
  italic: { family: 'Rubik', style: 'Medium Italic' },
  regular:{ family: 'Rubik', style: 'Regular' },
};

figma.ui.onmessage = async (msg) => {
  try {
    let data = msg.data;
    if (msg.type === 'loadUrl') {
      if (!msg.url) throw new Error('Falta la URL.');
      figma.ui.postMessage({ type: 'progress', message: 'Descargando JSON…' });
      const res = await fetch(msg.url);
      if (!res.ok) throw new Error('HTTP ' + res.status + ' al leer la URL.');
      data = await res.json();
    } else if (msg.type !== 'build') {
      return;
    }
    if (!data || !Array.isArray(data.slides) || !data.slides.length) {
      throw new Error('El JSON no tiene un arreglo "slides".');
    }
    await loadFonts();
    const built = await buildCarousel(data);
    figma.ui.postMessage({ type: 'done', count: built });
    figma.notify('NOMII: ' + built + ' láminas creadas');
  } catch (e) {
    figma.ui.postMessage({ type: 'error', message: String(e && e.message || e) });
    figma.notify('NOMII error: ' + (e && e.message || e), { error: true });
  }
};

// Devuelve la fuente de imagen de una lámina (URL http(s) o data URI base64), o null.
function imageSrcOf(s) {
  const f = s.fields || {};
  const cand = s.selected_image_url || s.image_url || f.image_url || f.image;
  if (typeof cand === 'string' && (/^https?:\/\//i.test(cand) || /^data:image\//i.test(cand))) return cand;
  return null;
}

// Rellena la capa "image" del frame con la foto real.
async function fillImage(frame, src) {
  const target = frame.findOne(function (n) { return n.name === 'image' && n.type === 'RECTANGLE'; });
  if (!target) return;
  let image;
  if (/^data:image\//i.test(src)) {
    const b64 = src.slice(src.indexOf(',') + 1);
    image = figma.createImage(figma.base64Decode(b64));
  } else {
    image = await figma.createImageAsync(src);
  }
  target.fills = [{ type: 'IMAGE', scaleMode: 'FILL', imageHash: image.hash }];
  const label = frame.findOne(function (n) { return n.name === 'image_label'; });
  if (label) label.visible = false;
}

async function loadFonts() {
  const want = { light: 'Light', regular: 'Regular', medium: 'Medium', italic: 'Medium Italic' };
  const loaded = {};
  for (const key in want) {
    try { await figma.loadFontAsync({ family: 'Rubik', style: want[key] }); loaded[key] = { family: 'Rubik', style: want[key] }; }
    catch (e) { /* estilo no disponible */ }
  }
  const anyRubik = loaded.regular || loaded.medium || loaded.light || loaded.italic;
  if (!anyRubik) {
    // Rubik no disponible en este Figma: fallback a Inter (siempre presente).
    await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });
    let interMed = { family: 'Inter', style: 'Regular' };
    try { await figma.loadFontAsync({ family: 'Inter', style: 'Medium' }); interMed = { family: 'Inter', style: 'Medium' }; } catch (e) {}
    let interIt = interMed;
    try { await figma.loadFontAsync({ family: 'Inter', style: 'Italic' }); interIt = { family: 'Inter', style: 'Italic' }; } catch (e) {}
    FONT.regular = FONT.light = { family: 'Inter', style: 'Regular' };
    FONT.medium = interMed; FONT.italic = interIt;
    figma.notify('Rubik no está disponible: usando Inter como sustituto.');
    return;
  }
  FONT.regular = loaded.regular || anyRubik;
  FONT.light   = loaded.light   || FONT.regular;
  FONT.medium  = loaded.medium  || FONT.regular;
  FONT.italic  = loaded.italic  || loaded.medium || FONT.regular;
}

// ---------- helpers de nodos ----------
function frameSlide(n) {
  const f = figma.createFrame();
  f.name = 'slide_' + String(n).padStart(2, '0');
  f.resize(W, H);
  f.clipsContent = true;
  f.layoutMode = 'NONE';
  return f;
}

function bg(frame, color) {
  frame.fills = solid(color);
  frame.name = frame.name; // keep
  // marca semántica: el fondo es el propio frame (capa "background")
}

function rect(parent, name, x, y, w, h, color, radius) {
  const r = figma.createRectangle();
  r.name = name; r.x = x; r.y = y; r.resize(w, h);
  r.fills = solid(color);
  if (radius) r.cornerRadius = radius;
  parent.appendChild(r);
  return r;
}

function imagePlaceholder(parent, x, y, w, h, radius) {
  const r = rect(parent, 'image', x, y, w, h, C.celeste, radius || 0);
  // etiqueta editable "IMAGEN · reemplazar"
  const t = text(parent, 'image_label', 'IMAGEN · reemplazar', {
    x: x, y: y + h / 2 - 22, w: w, size: 32, font: FONT.medium, color: C.white, align: 'CENTER', opacity: 0.9,
  });
  return r;
}

function text(parent, name, chars, opt) {
  opt = opt || {};
  const t = figma.createText();
  t.name = name;
  t.fontName = opt.font || FONT.light;
  t.fontSize = opt.size || 34;
  t.characters = chars == null ? '' : String(chars);
  t.fills = solid(opt.color || C.dark, opt.opacity == null ? 1 : opt.opacity);
  if (opt.lineHeightPct) t.lineHeight = { unit: 'PERCENT', value: opt.lineHeightPct };
  const w = opt.w || (W - 2 * SAFE_X);
  t.resize(w, t.height);
  t.textAutoResize = 'HEIGHT';
  t.textAlignHorizontal = opt.align || 'LEFT';
  t.x = opt.x == null ? SAFE_X : opt.x;
  t.y = opt.y == null ? SAFE_Y : opt.y;
  parent.appendChild(t);
  return t;
}

function pill(parent, name, chars, x, y, color, textColor) {
  // pill = auto-layout frame con texto
  const p = figma.createFrame();
  p.name = name;
  p.layoutMode = 'HORIZONTAL';
  p.primaryAxisSizingMode = 'AUTO';
  p.counterAxisSizingMode = 'AUTO';
  p.paddingLeft = 36; p.paddingRight = 36; p.paddingTop = 16; p.paddingBottom = 16;
  p.cornerRadius = 999;
  p.fills = color ? solid(color) : [];
  if (!color) { p.strokes = solid(textColor || C.white); p.strokeWeight = 1.5; }
  const t = figma.createText();
  t.fontName = FONT.medium; t.fontSize = 34;
  t.characters = String(chars);
  t.fills = solid(textColor || C.white);
  p.appendChild(t);
  p.x = x == null ? SAFE_X : x; p.y = y == null ? SAFE_Y : y;
  parent.appendChild(p);
  return p;
}

function logo(parent, variant) {
  // Marca oficial: rect placeholder nombrado "logo" (el diseñador pega el asset real).
  const color = variant === 'blanco' ? C.white : C.azul;
  const r = rect(parent, 'logo', W - SAFE_X - LOGO_W, SAFE_Y, LOGO_W, LOGO_H, color, 6);
  r.opacity = variant === 'blanco' ? 0.001 : 0.001; // invisible: solo marca posición/nombre
  // Nota visible para el diseñador
  const t = text(parent, 'logo_hint', 'LOGO', {
    x: W - SAFE_X - LOGO_W, y: SAFE_Y + 24, w: LOGO_W, size: 26, font: FONT.medium,
    color: variant === 'blanco' ? C.white : C.azul, align: 'CENTER', opacity: 0.55,
  });
  return r;
}

function isotipo(parent, y) {
  const size = 288;
  const r = rect(parent, 'isotipo', (W - size) / 2, y, size, size, C.white, 12);
  r.opacity = 0.001;
  text(parent, 'isotipo_hint', 'ISOTIPO', { x: (W - size) / 2, y: y + size / 2 - 16, w: size, size: 28, font: FONT.medium, color: C.white, align: 'CENTER', opacity: 0.6 });
  return r;
}

function centerBox(frame) {
  return { x: SAFE_X, y: SAFE_Y, w: W - 2 * SAFE_X, h: H - 2 * SAFE_Y };
}

// ---------- carrusel ----------
async function buildCarousel(data) {
  const slides = data.slides || [];
  const title = (data.carousel && data.carousel.title) || 'NOMII Carousel';
  const group = [];
  let x0 = 0;
  // ancla: junto a la selección o el centro del viewport
  const anchorX = Math.round(figma.viewport.center.x - ((W + GAP) * slides.length) / 2);
  const anchorY = Math.round(figma.viewport.center.y - H / 2);

  const imageJobs = [];
  for (let i = 0; i < slides.length; i++) {
    const s = slides[i] || {};
    const n = s.number || (i + 1);
    const f = frameSlide(n);
    renderTemplate(f, s);
    f.x = anchorX + i * (W + GAP);
    f.y = anchorY;
    figma.currentPage.appendChild(f);
    group.push(f);
    const src = imageSrcOf(s);
    if (src) imageJobs.push({ frame: f, src: src, n: n });
  }
  // Cargar imágenes reales (si el JSON las trae). No bloquea la creación de frames.
  for (const job of imageJobs) {
    figma.ui.postMessage({ type: 'progress', message: 'Cargando imagen ' + job.n + '/' + slides.length + '…' });
    try { await fillImage(job.frame, job.src); }
    catch (e) { figma.notify('Imagen lámina ' + job.n + ' no cargó: ' + (e && e.message || e)); }
  }
  if (group.length) {
    figma.currentPage.selection = group;
    figma.viewport.scrollAndZoomIntoView(group);
  }
  return group.length;
}

function fld(s, key) { return (s.fields && s.fields[key] != null) ? s.fields[key] : null; }

function renderTemplate(f, s) {
  const tpl = String(s.template || '').toLowerCase();
  const F = s.fields || {};
  if (tpl.indexOf('portada tipo a') >= 0 || (tpl.indexOf('cover') >= 0 && tpl.indexOf('azul') >= 0)) return coverA(f, F);
  if (tpl.indexOf('portada tipo b') >= 0 || (tpl.indexOf('cover') >= 0 && tpl.indexOf('blanco') >= 0)) return coverB(f, F);
  if (tpl.indexOf('chat') >= 0) return chat(f, F);
  if (tpl.indexOf('50/50') >= 0 || tpl.indexOf('50-50') >= 0 || tpl.indexOf('fifty') >= 0) return fifty(f, F);
  if (tpl.indexOf('card') >= 0) return cardText(f, F);
  if (tpl.indexOf('pop') >= 0) return popout(f, F);
  if (tpl.indexOf('flat') >= 0 || tpl.indexOf('pause') >= 0 || tpl.indexOf('pausa') >= 0) return flatPause(f, F);
  if (tpl.indexOf('cta') >= 0 || tpl.indexOf('cierre') >= 0) return cta(f, F);
  return cardText(f, F); // fallback seguro
}

// ---- Portada tipo A · cover soft azul ----
function coverA(f, F) {
  bg(f, C.dark);
  imagePlaceholder(f, 0, 0, W, H, 0);
  // gradiente azul inferior (aprox con rect semitransparente)
  const grad = rect(f, 'overlay', 0, H * 0.42, W, H * 0.58, C.azul, 0);
  grad.opacity = 0.72;
  logo(f, 'blanco');
  let y = H - 470;
  if (F.pill) { const p = pill(f, 'pill', F.pill, SAFE_X, y, C.celeste, C.white); y += 110; }
  if (F.title) { const t = text(f, 'title', F.title, { x: SAFE_X, y: y, w: W - 2 * SAFE_X, size: 72, font: FONT.medium, color: C.white, lineHeightPct: 110 }); y += t.height + 16; }
  if (F.caption) text(f, 'caption', F.caption, { x: SAFE_X, y: y, w: W - 2 * SAFE_X, size: 36, font: FONT.light, color: C.white, opacity: 0.9 });
}

// ---- Portada tipo B · cover soft blanco ----
function coverB(f, F) {
  bg(f, C.soft);
  imagePlaceholder(f, 0, 230, W, H - 230, 0);
  const grad = rect(f, 'overlay', 0, 0, W, 560, C.soft, 0);
  grad.opacity = 0.9;
  logo(f, 'azul');
  let y = 200;
  if (F.title) { const t = text(f, 'title', F.title, { x: 90, y: y, w: W - 180, size: 44, font: FONT.medium, color: C.dark, align: 'CENTER', lineHeightPct: 120 }); y += t.height + 28; }
  if (F.caption) { const box = rect(f, 'caption_bg', 180, y, W - 360, 160, C.celeste, 20); text(f, 'caption', F.caption, { x: 216, y: y + 30, w: W - 432, size: 34, font: FONT.light, color: C.white, align: 'CENTER', lineHeightPct: 140 }); }
}

// ---- Interior · chat bubbles ----
function chat(f, F) {
  bg(f, C.celeste);
  logo(f, 'blanco');
  let y = 420;
  if (F.subtitle) { text(f, 'subtitle', F.subtitle, { x: SAFE_X, y: y, w: W - 2 * SAFE_X, size: 36, font: FONT.light, color: C.white, align: 'CENTER' }); y += 90; }
  const bubbles = ['chat_1', 'chat_2', 'chat_3', 'chat_4'].map(k => F[k]).filter(Boolean);
  for (let i = 0; i < bubbles.length; i++) {
    const b = figma.createFrame();
    b.name = 'chat_' + (i + 1);
    b.layoutMode = 'HORIZONTAL'; b.primaryAxisSizingMode = 'AUTO'; b.counterAxisSizingMode = 'AUTO';
    b.paddingLeft = 32; b.paddingRight = 32; b.paddingTop = 20; b.paddingBottom = 20;
    b.cornerRadius = 999; b.fills = solid(C.white);
    const t = figma.createText(); t.fontName = FONT.light; t.fontSize = 34; t.characters = String(bubbles[i]); t.fills = solid(C.dark);
    b.appendChild(t);
    f.appendChild(b);
    b.x = (W - b.width) / 2; b.y = y;
    y += b.height + 26;
  }
}

// ---- Interior · 50/50 (imagen arriba, texto abajo) ----
function fifty(f, F) {
  bg(f, C.soft);
  imagePlaceholder(f, 0, 0, W, 720, 0);
  logo(f, 'azul');
  let y = 900;
  if (F.body) { const t = text(f, 'body', F.body, { x: 90, y: y, w: W - 180, size: 45, font: FONT.light, color: C.dark, align: 'CENTER', lineHeightPct: 130 }); y += t.height + 24; }
  if (F.caption) text(f, 'caption', F.caption, { x: 90, y: y, w: W - 180, size: 32, font: FONT.light, color: C.dark, align: 'CENTER', lineHeightPct: 140 });
}

// ---- Interior · card text ----
function cardText(f, F) {
  bg(f, C.soft);
  logo(f, 'azul');
  let y = 240;
  imagePlaceholder(f, (W - 640) / 2, y, 640, 400, 36); y += 400 + 48;
  if (F.title || F.subtitle) { const t = text(f, 'subtitle', F.title || F.subtitle, { x: SAFE_X, y: y, w: W - 2 * SAFE_X, size: 38, font: FONT.medium, color: C.celeste, align: 'CENTER', lineHeightPct: 120 }); y += t.height + 26; }
  if (F.body) { const t = text(f, 'body', F.body, { x: 120, y: y, w: W - 240, size: 34, font: FONT.light, color: C.dark, align: 'CENTER', lineHeightPct: 140 }); y += t.height + 20; }
  const bullets = ['bullet_1', 'bullet_2', 'bullet_3'].map(k => F[k]).filter(Boolean);
  for (let i = 0; i < bullets.length; i++) {
    text(f, 'bullet_' + (i + 1), '→  ' + bullets[i], { x: 200, y: y, w: W - 400, size: 34, font: FONT.light, color: C.dark, align: 'LEFT' });
    y += 56;
  }
}

// ---- Interior · pop-up card ----
function popout(f, F) {
  bg(f, C.soft);
  logo(f, 'azul');
  let y = 220;
  imagePlaceholder(f, (W - 620) / 2, y, 620, 465, 36); y += 465 + 40;
  if (F.title) { const t = text(f, 'title', F.title, { x: SAFE_X, y: y, w: W - 2 * SAFE_X, size: 38, font: FONT.medium, color: C.dark, align: 'CENTER', lineHeightPct: 120 }); y += t.height + 30; }
  const chips = ['bullet_1', 'bullet_2', 'bullet_3', 'chip_1', 'chip_2', 'chip_3'].map(k => F[k]).filter(Boolean);
  let cx = SAFE_X, cy = y;
  for (let i = 0; i < chips.length; i++) {
    const c = figma.createFrame(); c.name = 'chip_' + (i + 1);
    c.layoutMode = 'HORIZONTAL'; c.primaryAxisSizingMode = 'AUTO'; c.counterAxisSizingMode = 'AUTO';
    c.paddingLeft = 28; c.paddingRight = 28; c.paddingTop = 12; c.paddingBottom = 12;
    c.cornerRadius = 999; c.fills = []; c.strokes = solid(C.celeste); c.strokeWeight = 1.5;
    const t = figma.createText(); t.fontName = FONT.medium; t.fontSize = 34; t.characters = String(chips[i]); t.fills = solid(C.celeste);
    c.appendChild(t); f.appendChild(c);
    if (cx + c.width > W - SAFE_X) { cx = SAFE_X; cy += c.height + 18; }
    c.x = cx; c.y = cy; cx += c.width + 18;
  }
}

// ---- Intermedio · flat pause ----
function flatPause(f, F) {
  bg(f, C.azul);
  logo(f, 'blanco');
  const phrase = F.body || F.title || F.caption || '';
  const t = text(f, 'body', phrase, { x: 220, y: 0, w: W - 440, size: 44, font: FONT.italic, color: C.white, align: 'CENTER', lineHeightPct: 135 });
  t.y = (H - t.height) / 2;
}

// ---- Cierre · CTA ----
function cta(f, F) {
  bg(f, C.celeste);
  let y = 430;
  isotipo(f, y); y += 288 + 46;
  if (F.cta || F.body) { const t = text(f, 'cta', F.cta || F.body, { x: 160, y: y, w: W - 320, size: 38, font: FONT.italic, color: C.white, align: 'CENTER', lineHeightPct: 130 }); y += t.height + 40; }
  if (F.pill) pill(f, 'pill', F.pill, 0, y, null, C.white).x = (W - 320) / 2;
}
