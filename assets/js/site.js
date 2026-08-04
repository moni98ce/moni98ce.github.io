
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
  const chips=[...document.querySelectorAll('.project-chip[data-slide]')];

  if(track){
    const slides=[...track.children];
    let index=0;
    let timer=null;
    let touchStartX=0;

    const updateChips=()=>{
      chips.forEach((chip,n)=>{
        const active=n===index;
        chip.classList.toggle('active',active);
        chip.setAttribute('aria-current',active?'true':'false');
        chip.setAttribute('aria-pressed',active?'true':'false');
      });

      const activeChip=chips[index];
      if(activeChip){
        activeChip.scrollIntoView({
          behavior:'smooth',
          block:'nearest',
          inline:'center'
        });
      }
    };

    const show=i=>{
      index=(i+slides.length)%slides.length;
      track.style.transform=`translate3d(-${index*100}%,0,0)`;

      slides.forEach((slide,n)=>{
        const active=n===index;
        slide.setAttribute('aria-hidden',active?'false':'true');
        slide.toggleAttribute('inert',!active);
      });

      updateChips();
    };

    const stopAuto=()=>{
      if(timer){
        clearInterval(timer);
        timer=null;
      }
    };

    const startAuto=()=>{
      stopAuto();
      timer=setInterval(()=>show(index+1),6000);
    };

    const goTo=i=>{
      show(i);
      startAuto();
    };

    if(prev) prev.addEventListener('click',()=>goTo(index-1));
    if(next) next.addEventListener('click',()=>goTo(index+1));

    chips.forEach(chip=>{
      chip.type='button';
      chip.addEventListener('click',()=>{
        const target=Number(chip.dataset.slide);
        if(Number.isInteger(target) && target>=0 && target<slides.length){
          goTo(target);
        }
      });
    });

    track.addEventListener('mouseenter',stopAuto);
    track.addEventListener('mouseleave',startAuto);
    track.addEventListener('focusin',stopAuto);
    track.addEventListener('focusout',startAuto);

    track.addEventListener('touchstart',event=>{
      touchStartX=event.changedTouches[0].clientX;
      stopAuto();
    },{passive:true});

    track.addEventListener('touchend',event=>{
      const delta=event.changedTouches[0].clientX-touchStartX;
      if(Math.abs(delta)>45){
        show(delta<0?index+1:index-1);
      }
      startAuto();
    },{passive:true});

    document.addEventListener('keydown',event=>{
      if(event.key==='ArrowLeft' && document.activeElement?.closest('.carousel, .project-strip')){
        goTo(index-1);
      }
      if(event.key==='ArrowRight' && document.activeElement?.closest('.carousel, .project-strip')){
        goTo(index+1);
      }
    });

    show(0);
    startAuto();
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

document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('#portfolioGrid .portfolio-card').forEach(card=>{
      card.classList.toggle('hidden',f!=='All' && card.dataset.sector!==f);
    });
  });
});
