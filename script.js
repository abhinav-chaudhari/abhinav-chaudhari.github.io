const theme=document.querySelector('#theme');
const menu=document.querySelector('#menu');
const links=document.querySelector('#links');
document.body.classList.toggle('dark',localStorage.getItem('corporate-theme')==='dark');
theme.addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('corporate-theme',document.body.classList.contains('dark')?'dark':'light')});
menu.addEventListener('click',()=>{links.classList.toggle('open');menu.setAttribute('aria-expanded',String(links.classList.contains('open')))});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
document.querySelector('#year').textContent=new Date().getFullYear();
