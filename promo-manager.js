
(()=>{'use strict';
const EXP=new Date('2027-01-01T00:00:00+01:00'),q=s=>document.querySelector(s),alive=()=>Date.now()<EXP.getTime();

function setPopup(on){
 const lp=q('.ydg-launch-price');
 const lm=q('[data-lang-key="launch-maintenance"]');
 const lk=q('[data-lang-key="launch-kicker"]');
 const ll=q('[data-lang-key="launch-limited"]');
 const btn=q('#ydg-launch-apply');
 if(lp) lp.innerHTML=on?'99<span>€</span>':'495<span>€</span>';
 if(lm) lm.textContent=on?'+ 100 €/año · oferta válida hasta 31/12/2026':'+ 150 €/año · precio normal';
 if(lk) lk.textContent=on?'PROMOCIÓN ACTIVADA':'PROMOCIÓN DESACTIVADA';
 if(ll) ll.textContent=on?'ACTIVA':'PRECIO NORMAL';
 if(btn) btn.textContent=on?'PROMOCIÓN 99 € ACTIVADA':'ACTIVAR PROMOCIÓN 99 €';
}

function setPromo(on){
 on=!!on&&alive();
 document.body.classList.toggle('ydg-promo-on',on);
 document.body.classList.toggle('ydg-promo-off',!on);

 const sw=q('#ydg-promo-switch');if(sw){sw.checked=on;sw.disabled=!alive()}
 const field=q('#ydg-promo-field');if(field)field.value=on?'YOURDESIGNGPT':'';
 const price=q('#ydg-promo-price');if(price)price.value=on?'99 € + 100 €/año · hasta 31/12/2026':'495 € + 150 €/año';
 q('#ydg-promo-applied')?.classList.toggle('is-active',on);

 const old=q('.budget-old-price'),neu=q('.budget-new-price'),first=q('[data-lang-key="budget-first-year"]');
 if(old)old.textContent='495 € + 150 €/año';
 if(neu)neu.textContent='99 € + 100 €/año';
 if(first)first.textContent=on
   ?'PROMOCIÓN ACTIVADA · 99 € + 100 €/año · válida hasta 31/12/2026'
   :'PROMOCIÓN DESACTIVADA · Precio normal 495 € + 150 €/año';

 const title=q('[data-lang-key="promo-toggle-title"]'),desc=q('[data-lang-key="promo-toggle-desc"]');
 if(title)title.textContent=!alive()
   ?'Oferta finalizada · 495 € + 150 €/año'
   :on?'PROMOCIÓN ACTIVADA · 99 € + 100 €/año':'PROMOCIÓN DESACTIVADA · 495 € + 150 €/año';
 if(desc)desc.textContent=!alive()
   ?'La oferta terminó el 31/12/2026. Se aplica el precio normal.'
   :on?'Estado activo en verde. Oferta limitada hasta el 31 de diciembre de 2026.'
      :'Precio normal activo. Puedes activar la oferta de lanzamiento cuando quieras.';

 setPopup(on);
 try{localStorage.setItem('ydgLaunchPromo',on?'1':'0')}catch(_){}
 window.dispatchEvent(new CustomEvent('ydg-promo-change',{detail:{active:on}}));
}

function init(){
 let on=alive();
 try{const saved=localStorage.getItem('ydgLaunchPromo');if(saved!==null)on=saved==='1'}catch(_){}
 setPromo(on);
 q('#ydg-promo-switch')?.addEventListener('change',e=>setPromo(e.target.checked));
 q('#ydg-promo-remove')?.addEventListener('click',()=>setPromo(false));
 q('#ydg-launch-apply')?.addEventListener('click',()=>setPromo(true));
 window.ydgSetPromo=setPromo;
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();
