(() => {
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

  function applySettings(settings) {
    const s = { ...DEFAULTS, ...settings };
    const root = document.documentElement;

    root.classList.toggle("wapb-enabled", !!s.enabled);
    root.classList.toggle("wapb-chat-list", !!s.blurChatList);
    root.classList.toggle("wapb-messages", !!s.blurMessages);
    root.classList.toggle("wapb-composer", !!s.blurComposer);
    root.classList.toggle("wapb-contact-names", !!s.blurContactNames);
    root.classList.toggle("wapb-profile-photos", !!s.blurProfilePhotos);
    root.classList.toggle("wapb-reveal-hover", !!s.revealOnHover);

    const strength = Math.min(20, Math.max(2, Number(s.blurStrength) || 8));
    root.style.setProperty("--wapb-blur", `${strength}px`);
  }

  chrome.storage.local.get(DEFAULTS, applySettings);

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== "local") return;
    chrome.storage.local.get(DEFAULTS, applySettings);
  });

  window.addEventListener("keydown", (event) => {
    if (event.altKey && event.shiftKey && event.code === "KeyB") {
      chrome.storage.local.get(DEFAULTS, (settings) => {
        chrome.storage.local.set({ enabled: !settings.enabled });
      });
    }
  }, true);
})();
