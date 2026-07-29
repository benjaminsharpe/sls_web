(() => {
  const iconLabels = {
    "mailto:info@silverlakeshorts.com": "Email Silver Lake Shorts",
    "https://discord.gg/S6UrEegnEG": "Silver Lake Shorts on Discord",
    "https://www.instagram.com/silverlakeshorts": "Silver Lake Shorts on Instagram",
    "https://www.venmo.com/u/silverlakeshorts": "Donate with Venmo",
    "https://silverlakeshorts.substack.com/": "Silver Lake Shorts on Substack"
  };

  const labelIconLinks = () => {
    document.querySelectorAll("a").forEach((link) => {
      if (link.matches(".blank-sidebar-menu-item, .sidebar-link")) {
        link.removeAttribute("href");
        link.setAttribute("aria-hidden", "true");
        link.tabIndex = -1;
        return;
      }
      const hasText = link.textContent.trim().length > 0;
      const hasLabel = link.hasAttribute("aria-label") || link.hasAttribute("aria-labelledby");
      const images = Array.from(link.querySelectorAll("img"));
      const hasImageLabel = images.some((image) => image.alt.trim().length > 0);
      if (hasText || hasLabel || hasImageLabel || images.length === 0) return;

      const label = iconLabels[link.href] || (link.classList.contains("brand")
        ? "Silver Lake Shorts home"
        : "Open linked page");
      link.setAttribute("aria-label", label);
    });
  };

  const enhanceMenu = (menu, index) => {
    const open = menu.querySelector(".open-menu-link");
    const close = menu.querySelector(".close-menu-link");
    const panel = document.querySelector(".sidebar-menu-content");
    if (!open || !close || !panel) return;

    const panelId = panel.id || `site-navigation-${index + 1}`;
    panel.id = panelId;
    [[open, "Open site navigation"], [close, "Close site navigation"]].forEach(([control, label]) => {
      control.setAttribute("role", "button");
      control.setAttribute("tabindex", "0");
      control.setAttribute("aria-label", label);
      control.setAttribute("aria-controls", panelId);
    });

    const setState = (isOpen) => {
      open.setAttribute("aria-expanded", String(isOpen));
      close.removeAttribute("aria-expanded");
      panel.setAttribute("aria-hidden", String(!isOpen));
    };
    setState(false);

    const activateOnKeyboard = (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      event.currentTarget.click();
    };
    open.addEventListener("keydown", activateOnKeyboard);
    close.addEventListener("keydown", activateOnKeyboard);
    open.addEventListener("click", () => window.setTimeout(() => {
      setState(true);
      close.focus({ preventScroll: true });
    }, 550));
    close.addEventListener("click", () => window.setTimeout(() => {
      setState(false);
      open.focus({ preventScroll: true });
    }, 550));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && open.getAttribute("aria-expanded") === "true") close.click();
    });
  };

  const enhanceSite = () => {
    labelIconLinks();
    document.querySelectorAll(".menu-link-mouseover").forEach(enhanceMenu);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceSite, { once: true });
  } else {
    enhanceSite();
  }
})();
