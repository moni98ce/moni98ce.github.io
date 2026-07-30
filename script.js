
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
if(localStorage.theme==='dark')document.body.classList.add('dark');
const t=$('#themeToggle');if(t){t.textContent=document.body.classList.contains('dark')?'Light':'Dark';t.onclick=()=>{document.body.classList.toggle('dark');localStorage.theme=document.body.classList.contains('dark')?'dark':'light';t.textContent=document.body.classList.contains('dark')?'Light':'Dark'}}
const m=$('#menuToggle');if(m)m.onclick=()=>document.body.classList.toggle('nav-open');
$$('[data-filter]').forEach(b=>b.onclick=()=>{$$('[data-filter]').forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.filter;$$('[data-category]').forEach(c=>c.style.display=(f==='All'||c.dataset.category===f)?'block':'none')});
const s=$('#projectSearch');if(s)s.oninput=()=>{const q=s.value.toLowerCase();$$('[data-project]').forEach(c=>c.style.display=c.textContent.toLowerCase().includes(q)?'block':'none')};
const modal=$('#projectModal'),mc=$('#modalContent');$$('[data-open-project]').forEach(b=>b.onclick=()=>{const c=b.closest('[data-project]');mc.innerHTML=c.querySelector('.project-detail').innerHTML;modal.classList.add('open')});if(modal)modal.onclick=e=>{if(e.target===modal||e.target.matches('.close'))modal.classList.remove('open')};
