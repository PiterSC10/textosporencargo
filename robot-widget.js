
(()=>{'use strict';
const AS={idle:'ydg01-idle-v101.png',wave:'ydg01-wave-v101.png',jump:'ydg01-jump-v101.png',run:'ydg01-run-v101.png'};
function init(){
 document.querySelectorAll('#ydg-robot-widget,#ydg-robot-reopen').forEach(x=>x.remove());
 const w=document.createElement('div'); w.id='ydg-robot-widget'; w.tabIndex=0;
 w.setAttribute('aria-label','YDG-01: 1 clic saluda, 2 clics salta, 3 clics corre');
 w.innerHTML=`<img class="yr-dog" src="${AS.idle}" alt="YDG-01 robot dog"><button class="yr-close" aria-label="Cerrar" type="button">×</button><div class="yr-help">1× SALUDA · 2× SALTA · 3× CORRE</div>`;
 const r=document.createElement('button');r.id='ydg-robot-reopen';r.type='button';r.innerHTML='YDG-01';
 document.body.append(w,r);
 const img=w.querySelector('.yr-dog'),close=w.querySelector('.yr-close');
 let n=0,t=0,busy=false,lastTouch=0;
 const pose=(p)=>{img.src=AS[p]};
 function idle(){w.className='';pose('idle');busy=false}
 function wave(){if(busy)return;busy=true;pose('wave');w.className='act-wave';setTimeout(idle,1250)}
 function jump(){if(busy)return;busy=true;pose('jump');w.className='act-jump';setTimeout(idle,1250)}
 function run(){if(busy)return;busy=true;pose('run');w.className='act-run';setTimeout(idle,2450)}
 function fire(){let c=n;n=0;c===1?wave():c===2?jump():c>=3&&run()}
 function tap(){if(busy)return;n=Math.min(3,n+1);clearTimeout(t);t=setTimeout(fire,360)}
 w.addEventListener('pointerup',e=>{if(e.target===close)return;if(e.pointerType==='touch'){lastTouch=Date.now();e.preventDefault();tap()}});
 w.addEventListener('click',e=>{if(e.target===close||Date.now()-lastTouch<550)return;tap()});
 close.onclick=e=>{e.stopPropagation();w.hidden=true;r.classList.add('show')};
 r.onclick=()=>{w.hidden=false;r.classList.remove('show');wave()};
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',init,{once:true}):init();
})();
