
(()=>{'use strict';
const EXP=new Date('2027-01-01T00:00:00+01:00'),q=s=>document.querySelector(s),alive=()=>Date.now()<EXP.getTime();
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
  if(first)first.textContent=on?'PROMOCIÓN ACTIVADA · 99 € + 100 €/año · hasta 31/12/2026':'PRECIO NORMAL · 495 € + 150 €/año';
  const title=q('[data-lang-key="promo-toggle-title"]'),desc=q('[data-lang-key="promo-toggle-desc"]');
  if(title)title.textContent=!alive()?'Oferta finalizada · precio normal':on?'PROMOCIÓN ACTIVADA · 99 € + 100 €/año':'PRECIO NORMAL · 495 € + 150 €/año';
  if(desc)desc.textContent=!alive()?'Desde el 01/01/2027 se aplica el precio normal.':on?'Estado activo en verde. Oferta válida hasta el 31/12/2026.':'Promoción desactivada. Puedes volver a activarla mientras siga vigente.';
  const lp=q('.ydg-launch-price'),lm=q('[data-lang-key="launch-maintenance"]'),lk=q('[data-lang-key="launch-kicker"]'),ll=q('[data-lang-key="launch-limited"]'),btn=q('#ydg-launch-apply');
  if(lp)lp.innerHTML='99<span>€</span>';
  if(lm)lm.textContent='+ 100 €/año · dominio + hosting + mantenimiento + 3 cambios/ajustes menores';
  if(lk)lk.textContent='OFERTA DE LANZAMIENTO';
  if(ll)ll.textContent='HASTA 31/12/2026';
  if(btn)btn.textContent=on?'PROMOCIÓN 99 € ACTIVADA':'ACTIVAR PROMOCIÓN 99 €';
  try{localStorage.setItem('ydgLaunchPromo',on?'1':'0')}catch(_){}
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
