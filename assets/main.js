(() => {
  // Year
  const y = document.getElementById("y");
  if (y) y.textContent = String(new Date().getFullYear());

  // Hover-to-play previews (desktop). On mobile, keep them paused until tapped.
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const vids = Array.from(document.querySelectorAll("video.preview"));

  const canHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;

  const safePlay = async (v) => {
    try {
      if (prefersReduced) return;
      v.muted = true;
      v.playsInline = true;
      await v.play();
    } catch (e) {
      // Autoplay might be blocked — that's fine.
    }
  };

  const safePause = (v) => {
    try { v.pause(); } catch (e) {}
  };

  if (canHover) {
    vids.forEach(v => {
      v.addEventListener("mouseenter", () => safePlay(v));
      v.addEventListener("mouseleave", () => safePause(v));
      // Start first frame quickly
      v.addEventListener("loadedmetadata", () => { v.currentTime = 0.01; }, { once: true });
    });
  } else {
    // Mobile: show controls on tap (optional)
    vids.forEach(v => {
      v.controls = true;
      v.addEventListener("loadedmetadata", () => { v.currentTime = 0.01; }, { once: true });
    });
  }
})();
