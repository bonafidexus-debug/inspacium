
(function(){
  // Smooth scroll for in-page anchors
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const id = a.getAttribute('href');
    const el = document.querySelector(id);
    if(!el) return;
    e.preventDefault();
    el.scrollIntoView({behavior:'smooth', block:'start'});
    history.replaceState(null, '', id);
  });

  // Video hover play (desktop) + first frame on load
  const vids = Array.from(document.querySelectorAll('video.preview'));
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const tryPlay = (v) => {
    if(prefersReduced) return;
    const p = v.play();
    if(p && typeof p.catch === 'function') p.catch(()=>{});
  };

  vids.forEach(v => {
    v.addEventListener('mouseenter', () => tryPlay(v));
    v.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
    // mobile: show controls on tap
    v.addEventListener('touchstart', () => { v.controls = true; }, {passive:true});
  });

  // Mailto "form"
  window.InSpaciumMailto = {
    submit: (event) => {
      event.preventDefault();
      const form = event.target;
      const name = (form.name.value || '').trim();
      const email = (form.email.value || '').trim();
      const message = (form.message.value || '').trim();
      const subject = encodeURIComponent('InSpacium Inquiry');
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );
      window.location.href = `mailto:hello@inspacium.com?subject=${subject}&body=${body}`;
      return false;
    }
  };
})();
