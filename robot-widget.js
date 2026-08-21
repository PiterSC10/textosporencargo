
(()=>{'use strict';
const AS={
  idle:'ydg01-idle-v101.png',
  wave:'ydg01-wave-v101.png',
  jump:'ydg01-jump-v101.png',
  run:'ydg01-run-v101.png'
};
function mount(){
  document.querySelectorAll('#ydg-robot-widget,#ydg-robot-reopen').forEach(n=>n.remove());

  const w=document.createElement('div');
  w.id='ydg-robot-widget';
  w.tabIndex=0;
  w.setAttribute('role','button');
  w.setAttribute('aria-label','YDG-01: 1 clic saluda, 2 clics salta, 3 clics corre');
  w.innerHTML=`
    <div class="ydg01-hud" aria-hidden="true">
      <div class="ydg01-hud-top">
        <div><b>YDG-01</b><small>AI ROBOT DOG</small></div>
        <span class="ydg01-online"><i></i> ONLINE</span>
      </div>
      <div class="ydg01-scan">
        <span class="scan-ring"></span>
        <span class="scan-line"></span>
        <strong>SCAN</strong>
      </div>
      <div class="ydg01-skills">
        <b>HABILIDADES</b>
        <span>1 CLIC · SALUDO</span>
        <span>2 CLICS · SALTO</span>
        <span>3 CLICS · CARRERA</span>
      </div>
    </div>

    <img class="yr-dog" src="${AS.idle}" alt="YDG-01 perro robot">
    <button class="yr-close" aria-label="Cerrar YDG-01" type="button">×</button>
    <div class="yr-help">1× SALUDA · 2× SALTA · 3× CORRE</div>
  `;

  const reopen=document.createElement('button');
  reopen.id='ydg-robot-reopen';
  reopen.type='button';
  reopen.setAttribute('aria-label','Abrir YDG-01');
  reopen.textContent='YDG-01';

  document.body.append(w,reopen);

  const img=w.querySelector('.yr-dog');
  const close=w.querySelector('.yr-close');
  let clicks=0,timer=0,busy=false,lastTouch=0;

  const clear=()=>w.classList.remove('act-wave','act-jump','act-run');
  function idle(){clear();img.src=AS.idle;busy=false}
  function wave(){if(busy)return;busy=true;clear();img.src=AS.wave;void w.offsetWidth;w.classList.add('act-wave');setTimeout(idle,1300)}
  function jump(){if(busy)return;busy=true;clear();img.src=AS.jump;void w.offsetWidth;w.classList.add('act-jump');setTimeout(idle,1350)}
  function run(){if(busy)return;busy=true;clear();img.src=AS.run;void w.offsetWidth;w.classList.add('act-run');setTimeout(idle,2500)}
  function fire(){const c=Math.min(clicks,3);clicks=0;if(c===1)wave();else if(c===2)jump();else if(c>=3)run()}
  function tap(){if(busy)return;clicks=Math.min(3,clicks+1);clearTimeout(timer);timer=setTimeout(fire,360)}

  w.addEventListener('pointerup',e=>{
    if(e.target===close)return;
    if(e.pointerType==='touch'){lastTouch=Date.now();e.preventDefault();tap()}
  });
  w.addEventListener('click',e=>{
    if(e.target===close || Date.now()-lastTouch<550)return;
    tap();
  });
  w.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' '){e.preventDefault();tap()}
  });

  close.addEventListener('click',e=>{
    e.stopPropagation();
    w.hidden=true;
    reopen.classList.add('show');
  });
  reopen.addEventListener('click',()=>{
    w.hidden=false;
    reopen.classList.remove('show');
    wave();
  });
}
document.readyState==='loading'
  ? document.addEventListener('DOMContentLoaded',mount,{once:true})
  : mount();
})();
