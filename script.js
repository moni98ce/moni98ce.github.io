
const $ = (s, c=document) => c.querySelector(s);
const $$ = (s, c=document) => [...c.querySelectorAll(s)];

const body = document.body;
const themeBtn = $('#themeToggle');
const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'dark') body.classList.add('dark');
if(themeBtn){
  themeBtn.textContent = body.classList.contains('dark') ? '☀' : '☾';
  themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    themeBtn.textContent = body.classList.contains('dark') ? '☀' : '☾';
  });
}
const menuBtn = $('#menuToggle');
if(menuBtn) menuBtn.addEventListener('click',()=>document.body.classList.toggle('nav-open'));

$$('[data-filter]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    $$('[data-filter]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    $$('[data-category]').forEach(card=>{
      card.style.display=(f==='All'||card.dataset.category===f)?'block':'none';
    });
  });
});
const search = $('#projectSearch');
if(search){
  search.addEventListener('input',()=>{
    const q=search.value.toLowerCase().trim();
    $$('[data-project]').forEach(card=>{
      card.style.display=card.textContent.toLowerCase().includes(q)?'block':'none';
    });
  });
}
const modal=$('#projectModal'), modalContent=$('#modalContent');
$$('[data-open-project]').forEach(btn=>btn.addEventListener('click',()=>{
  const card=btn.closest('[data-project]');
  modalContent.innerHTML=card.querySelector('.project-detail').innerHTML;
  modal.classList.add('open');
}));
if(modal){
  modal.addEventListener('click',e=>{if(e.target===modal||e.target.matches('.close'))modal.classList.remove('open')});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('open')});
}
