#!/usr/bin/env node

const fs = require("fs");

const file = process.argv[2];
if (!file) {
  console.error("Usage: validate-carousel-json.js <carousel.figma.json>");
  process.exit(2);
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));
const errors = [];

if (!data.carousel || typeof data.carousel !== "object") {
  errors.push("Missing carousel object.");
}
if (!data.carousel?.id) errors.push("Missing carousel.id.");
if (!data.carousel?.title) errors.push("Missing carousel.title.");
if (!Array.isArray(data.slides) || data.slides.length === 0) {
  errors.push("Missing slides array.");
}

for (const [index, slide] of (data.slides || []).entries()) {
  const label = `slide ${index + 1}`;
  if (!Number.isInteger(slide.number)) errors.push(`${label}: number must be an integer.`);
  if (!slide.template) errors.push(`${label}: missing template.`);
  if (!slide.role) errors.push(`${label}: missing role.`);
  if (!slide.fields || typeof slide.fields !== "object") errors.push(`${label}: missing fields object.`);
  if (/cover|portada/i.test(slide.template) && slide.face_safe_required && !slide.image_focus) {
    errors.push(`${label}: face_safe_required is true but image_focus is missing.`);
  }
}

if (errors.length) {
  console.error(JSON.stringify({ status: "errors_found", errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ status: "ok", slides: data.slides.length }, null, 2));
