
const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
if(menu && nav){menu.addEventListener('click',()=>nav.classList.toggle('open'));}
document.querySelectorAll('[data-filter]').forEach(btn=>{
 btn.addEventListener('click',()=>{
  document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const f=btn.dataset.filter;
  document.querySelectorAll('[data-category]').forEach(card=>{
   card.style.display=(f==='all'||card.dataset.category.includes(f))?'block':'none';
  });
 });
});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
