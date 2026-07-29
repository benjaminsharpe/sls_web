/* The shared source of truth for sponsor placements across the static site. */
(() => {
  const gold = [
    { src: "images/asset-202sony.svg", alt: "Sony Pictures Animation logo", className: "sony" },
    { src: "images/asset-201tit.svg", alt: "Titmouse logo", className: "titmouse" },
    { src: "images/759b196ab15dd86d408fefb0169b9368_sls_sponsor_bandera.svg", alt: "Bandera logo", className: "bandera" },
    { src: "images/sls_sponsor_smosh.svg", alt: "Smosh logo", className: "smosh" },
    { src: "images/this_one_sls_sponsor_tierney_corp_edited.svg", alt: "Tierney Corp logo", className: "tierney" },
    { src: "images/sls_sponsor_tongal.svg", alt: "Tongal logo", className: "tongal" }
  ];

  const carousel = [
    ...gold,
    { src: "images/asset-201005.svg" },
    { src: "images/asset-201006.svg" },
    { src: "images/asset-202sls_sponsor_73tv.svg" },
    { src: "images/silver_animationplus.svg" },
    { src: "images/asset-202sls_sponsor_dropout.svg" },
    { src: "images/asset-201.svg" },
    { src: "images/asset-201111111.svg" },
    { src: "images/asset-201sls_sponsor_portal.svg" },
    { src: "images/bronze_animation_guild.svg" },
    { src: "images/bronze_asifa.svg" },
    { src: "images/bronze_fourthwall.svg" },
    { src: "images/asset-201bronze_hurley_pickle.svg" },
    { src: "images/asset-201-1.svg" },
    { src: "images/sls_sponsor_shadowmachine.svg" },
    { src: "images/asset-201-2.svg" },
    { src: "images/sls_sponsor_psyop.svg" },
    { src: "images/sls_sponsor_chupacabra.svg" },
    { src: "images/sls_sponsor_make.svg" },
    { src: "images/fotokem.svg" },
    { src: "images/asset-201sls_sponsor_ottawa.svg" },
    { src: "images/asset-2012.svg" },
    { src: "images/asset-201sls_sponsor_stitchspace.svg" },
    { src: "images/asset-201-3.svg" },
    { src: "images/asset-201007.svg" },
    { src: "images/asset-201sls_sponsor_glas.svg" },
    { src: "images/sls_sponsor_revival.svg" },
    { src: "images/sls_sponsor_smcu.svg" }
  ];

  const createGoldCard = (sponsor, template) => {
    const card = template.cloneNode(true);
    const image = card.querySelector("img");
    image.src = sponsor.src;
    image.alt = sponsor.alt;
    image.className = sponsor.className;
    return card;
  };

  const syncGoldGrids = () => {
    document.querySelectorAll(".new-gold-partner-card-grid").forEach((grid) => {
      const container = grid.parentElement;
      if (!container || container.dataset.sponsorsSynced === "true") return;

      const cards = Array.from(container.children).filter((child) =>
        child.classList.contains("new-gold-partner-card-grid")
      );
      const hasSony = cards.some((card) => card.querySelector('img[src$="asset-202sony.svg"]'));
      if (!hasSony || cards.length !== gold.length) return;

      const template = cards[0];
      container.dataset.sponsorsSynced = "true";
      cards.forEach((card) => card.remove());
      gold.forEach((sponsor) => container.append(createGoldCard(sponsor, template)));
    });
  };

  const syncCarousels = () => {
    document.querySelectorAll(".brand-wrap").forEach((wrap) => {
      if (!wrap.querySelector('img.brand-logo[src$="asset-202sony.svg"]')) return;
      wrap.replaceChildren(...carousel.map((sponsor) => {
        const image = document.createElement("img");
        image.width = 100;
        image.loading = "lazy";
        image.alt = "";
        image.setAttribute("aria-hidden", "true");
        image.src = sponsor.src;
        image.className = "brand-logo";
        return image;
      }));
    });
  };

  const syncRoster = () => {
    syncGoldGrids();
    syncCarousels();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncRoster, { once: true });
  } else {
    syncRoster();
  }
})();
