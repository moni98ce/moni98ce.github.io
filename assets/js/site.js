
(function(){
  const menu=document.getElementById('menuToggle');
  const links=document.querySelector('.nav-links');
  if(menu&&links) menu.addEventListener('click',()=>links.classList.toggle('open'));

  const revealObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },{threshold:.10});
  document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

  document.querySelectorAll('[data-count]').forEach(el=>{
    const end=parseInt(el.dataset.count,10);
    const suffix=el.dataset.suffix||'';
    let started=false;
    const observer=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting&&!started){
        started=true;
        let value=0;
        const increment=Math.max(1,Math.ceil(end/35));
        const tick=()=>{
          value=Math.min(end,value+increment);
          el.textContent=value+suffix;
          if(value<end) requestAnimationFrame(tick);
        };
        tick();
        observer.disconnect();
      }
    },{threshold:.5});
    observer.observe(el);
  });

  const track=document.getElementById('carouselTrack');
  const prev=document.getElementById('prevSlide');
  const next=document.getElementById('nextSlide');
  if(track){
    const slides=[...track.children];
    let index=0;
    const show=i=>{
      index=(i+slides.length)%slides.length;
      track.style.transform=`translateX(-${index*100}%)`;
      slides.forEach((slide,n)=>slide.setAttribute('aria-hidden',n===index?'false':'true'));
    };
    if(prev) prev.addEventListener('click',()=>show(index-1));
    if(next) next.addEventListener('click',()=>show(index+1));
    let timer=setInterval(()=>show(index+1),6000);
    track.addEventListener('mouseenter',()=>clearInterval(timer));
    track.addEventListener('mouseleave',()=>timer=setInterval(()=>show(index+1),6000));
    show(0);
  }

  const lightbox=document.getElementById('lightbox');
  const lightboxImage=document.getElementById('lightboxImage');
  const lightboxClose=document.getElementById('lightboxClose');
  document.querySelectorAll('[data-lightbox]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(!lightbox||!lightboxImage) return;
      lightboxImage.src=btn.dataset.lightbox;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden','false');
    });
  });
  const closeLightbox=()=>{
    if(!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden','true');
  };
  if(lightboxClose) lightboxClose.addEventListener('click',closeLightbox);
  if(lightbox) lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});
})();
