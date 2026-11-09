"use strict";

const DEFAULTS = {
  enabled: true,
  blurChatList: true,
  blurMessages: true,
  blurComposer: false,
  blurContactNames: true,
  blurProfilePhotos: true,
  revealOnHover: true,
  blurStrength: 8
};

const ids = Object.keys(DEFAULTS);
const elements = Object.fromEntries(ids.map(id => [id, document.getElementById(id)]));
const blurValue = document.getElementById("blurValue");

function render(settings) {
  const s = { ...DEFAULTS, ...settings };

  for (const [key, value] of Object.entries(s)) {
    const el = elements[key];
    if (!el) continue;

    if (el.type === "checkbox") {
      el.checked = Boolean(value);
    } else if (el.type === "range") {
      el.value = value;
    }
  }

  blurValue.textContent = `${s.blurStrength}px`;
}

chrome.storage.local.get(DEFAULTS, render);

for (const id of ids) {
  const el = elements[id];
  if (!el) continue;

  el.addEventListener("input", () => {
    const value = el.type === "checkbox" ? el.checked : Number(el.value);

    if (id === "blurStrength") {
      blurValue.textContent = `${value}px`;
    }

    chrome.storage.local.set({ [id]: value });
  });
}
