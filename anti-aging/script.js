(function(){
  var revealItems=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
      });
    },{threshold:.08,rootMargin:'0px 0px -35px'});
    revealItems.forEach(function(item,index){item.style.transitionDelay=Math.min(index%4,3)*55+'ms';observer.observe(item);});
  }else{revealItems.forEach(function(item){item.classList.add('visible');});}

  var lightbox=document.getElementById('lightbox');
  var lightboxImage=lightbox.querySelector('img');
  var lightboxFrame=lightbox.querySelector('.lightbox-image-frame');
  var lightboxCaption=lightbox.querySelector('p');
  document.querySelectorAll('.report-card').forEach(function(card){
    card.addEventListener('click',function(){
      lightboxImage.src=card.getAttribute('data-image');
      lightboxCaption.textContent=card.getAttribute('data-caption')||'';
      lightboxFrame.classList.toggle('company-hidden',card.getAttribute('data-hide-company')==='true');
      lightbox.showModal();
    });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click',function(){lightbox.close();});
  lightbox.addEventListener('click',function(event){if(event.target===lightbox){lightbox.close();}});
  document.addEventListener('keydown',function(event){if(event.key==='Escape'&&lightbox.open){lightbox.close();}});
})();
