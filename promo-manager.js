
(()=>{
'use strict';
const EXPIRY=new Date('2027-01-01T00:00:00+01:00');
const alive=()=>Date.now()<EXPIRY.getTime();
const q=s=>document.querySelector(s),qa=s=>[...document.querySelectorAll(s)];
function mountPricePanel(){
 if(q('#ydg-final-price'))return;
 const target=q('#ydg-live-budget')||q('.included-top');
 if(!target)return;
 const box=document.createElement('div');box.id='ydg-final-price';box.className='ydg-final-price';
 box.innerHTML=`<div class="pf-normal"><small>PRECIO NORMAL</small><strong>495 € + 150 €</strong><span>Desarrollo web + dominio, hosting y mantenimiento del primer año</span></div>
 <div class="pf-arrow">→</div>
 <div class="pf-promo"><small>OFERTA DE LANZAMIENTO</small><strong>99 € + 100 €/año</strong><span>Código YOURDESIGNGPT</span><em>VÁLIDA HASTA 31 · 12 · 2026</em></div>`;
 target.parentNode.insertBefore(box,target);
}
function setPromo(on,{persist=true}={}){
 if(!alive())on=false;
 document.body.classList.toggle('ydg-promo-on',on);
 document.body.classList.toggle('ydg-promo-off',!on);
 document.body.classList.toggle('ydg-promo-dead',!alive());
 const sw=q('#ydg-promo-switch');if(sw){sw.checked=on;sw.disabled=!alive()}
 const field=q('#ydg-promo-field');if(field)field.value=on?'YOURDESIGNGPT':'';
 const price=q('#ydg-promo-price');if(price)price.value=on?'99 € + 100 €/año · válida hasta 31/12/2026':'495 € + 150 € primer año';
 q('#ydg-promo-applied')?.classList.toggle('is-active',on);
 const old=q('.budget-old-price'),newp=q('.budget-new-price'),first=q('[data-lang-key="budget-first-year"]');
 if(old)old.textContent=on?'645 €':'495 € + 150 €';
 if(newp)newp.textContent=on?'99 €':'PRECIO NORMAL';
 if(first)first.textContent=on?'Oferta activa: 99 € + 100 €/año · válida hasta 31/12/2026':'Precio normal: 495 € + 150 € el primer año';
 const toggleTitle=q('[data-lang-key="promo-toggle-title"]');
 if(toggleTitle)toggleTitle.textContent=alive()?(on?'Oferta YOURDESIGNGPT activa · 99 €':'Activar oferta YOURDESIGNGPT · 99 €'):'Oferta finalizada · precio normal';
 const toggleDesc=q('[data-lang-key="promo-toggle-desc"]');
 if(toggleDesc)toggleDesc.textContent=alive()?'Oferta limitada hasta el 31 de diciembre de 2026. Puedes activarla o desactivarla aquí.':'La oferta finalizó el 31 de diciembre de 2026. Se aplica el precio normal.';
 if(!alive())toggleDesc?.classList.add('promo-dead-note');
 if(persist){try{localStorage.setItem('ydgLaunchPromo',on?'1':'0')}catch(_){}}
 window.dispatchEvent(new CustomEvent('ydg-promo-change',{detail:{active:on,alive:alive()}}));
}
function init(){
 mountPricePanel();
 let initial=alive();
 try{const saved=localStorage.getItem('ydgLaunchPromo');if(saved!==null)initial=saved==='1'}catch(_){}
 setPromo(initial,{persist:false});
 q('#ydg-promo-switch')?.addEventListener('change',e=>setPromo(e.target.checked));
 q('#ydg-promo-remove')?.addEventListener('click',()=>setPromo(false));
 q('#ydg-launch-apply')?.addEventListener('click',()=>setPromo(true));
 window.ydgSetPromo=setPromo;
 // Update main static promo copy
 qa('.included-note').forEach(n=>n.textContent='Oferta de lanzamiento: 99 € de desarrollo + 100 €/año de dominio, hosting y mantenimiento, válida hasta el 31/12/2026. Después se aplica el precio normal: 495 € de desarrollo + 150 €/año.');
 qa('.hero-promo-meta').forEach(n=>n.textContent='Oferta 99 € + 100 €/año hasta 31/12/2026 · Después: 495 € + 150 €/año');
 // Popup expiry/regular price
 const maint=q('[data-lang-key="launch-maintenance"]');if(maint)maint.textContent='+ 100 €/año · válida hasta 31/12/2026';
 const terms=q('[data-lang-key="launch-terms"]');if(terms)terms.textContent='Oferta de lanzamiento para proyectos web estándar, válida hasta el 31/12/2026. Después: 495 € de desarrollo + 150 €/año.';
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
