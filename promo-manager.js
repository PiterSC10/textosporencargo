
(()=>{'use strict';
const EXP=new Date('2027-01-01T00:00:00+01:00'),q=s=>document.querySelector(s),alive=()=>Date.now()<EXP.getTime();
function textState(on){
 const title=q('[data-lang-key="promo-toggle-title"]'),desc=q('[data-lang-key="promo-toggle-desc"]');
 if(title)title.textContent=!alive()?'Oferta finalizada · precio normal':on?'Oferta YOURDESIGNGPT activa · 99 €':'Activar oferta YOURDESIGNGPT · 99 €';
 if(desc)desc.textContent=!alive()?'Desde el 01/01/2027 se aplica el precio normal: 495 € + 150 €/año.':on?'99 € + 100 €/año. Oferta limitada hasta el 31/12/2026.':'Precio normal activo: 495 € de desarrollo + 150 €/año.';
}
function setPromo(on){
 on=!!on&&alive();
 document.body.classList.toggle('ydg-promo-on',on);document.body.classList.toggle('ydg-promo-off',!on);
 const sw=q('#ydg-promo-switch');if(sw){sw.checked=on;sw.disabled=!alive()}
 const f=q('#ydg-promo-field');if(f)f.value=on?'YOURDESIGNGPT':'';
 const p=q('#ydg-promo-price');if(p)p.value=on?'99 € + 100 €/año · hasta 31/12/2026':'495 € + 150 €/año';
 q('#ydg-promo-applied')?.classList.toggle('is-active',on);
 const old=q('.budget-old-price'),neu=q('.budget-new-price'),first=q('[data-lang-key="budget-first-year"]');
 if(old)old.textContent=on?'645 €':'495 € + 150 €';
 if(neu)neu.textContent='99 €';
 if(first)first.textContent=on?'Oferta activa: 99 € + 100 €/año · válida hasta 31/12/2026':'Precio normal activo: 495 € + 150 €/año';
 textState(on);
 try{localStorage.setItem('ydgLaunchPromo',on?'1':'0')}catch(_){}
 window.dispatchEvent(new CustomEvent('ydg-promo-change',{detail:{active:on}}));
}
function init(){
 let on=alive();try{const s=localStorage.getItem('ydgLaunchPromo');if(s!==null)on=s==='1'}catch(_){}
 setPromo(on);
 q('#ydg-promo-switch')?.addEventListener('change',e=>setPromo(e.target.checked));
 q('#ydg-promo-remove')?.addEventListener('click',()=>setPromo(false));
 q('#ydg-launch-apply')?.addEventListener('click',()=>setPromo(true));
 window.ydgSetPromo=setPromo;
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();
