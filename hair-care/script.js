document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{
  const target=document.querySelector(link.getAttribute('href'));
  if(!target)return;
  event.preventDefault();
  target.scrollIntoView({behavior:'smooth',block:'start'});
}));

document.querySelectorAll('article,figure,.section-title,.limit-note').forEach(element=>{
  element.classList.add('reveal');
  requestAnimationFrame(()=>element.classList.add('visible'));
});
