
(function(){
 const menu=document.getElementById('menuToggle'), links=document.querySelector('.nav-links'); if(menu&&links)menu.addEventListener('click',()=>links.classList.toggle('open'));
 document.querySelectorAll('.reveal').forEach(el=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12}).observe(el));
 document.querySelectorAll('[data-count]').forEach(el=>{const end=parseInt(el.dataset.count); let start=0; const step=Math.max(1,Math.round(end/45)); const tick=()=>{start=Math.min(end,start+step);el.textContent=start+(el.dataset.suffix||'');if(start<end)requestAnimationFrame(tick)};new IntersectionObserver(es=>{if(es[0].isIntersecting){tick();es[0].target.dataset.count=''}},{once:true}).observe(el)});
})();
