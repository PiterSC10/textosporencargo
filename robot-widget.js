
(()=>{'use strict';
const IMG='ydg01-clean-v106.png',THUMB='ydg01-clean-thumb-v106.png';

function mount(){
  document.querySelectorAll('#ydg-robot-widget,#ydg-robot-reopen').forEach(n=>n.remove());

  const w=document.createElement('div');
  w.id='ydg-robot-widget';
  w.tabIndex=0;
  w.setAttribute('role','button');
  w.setAttribute('aria-label','YDG-01: 1 clic saluda, 2 clics salta, 3 clics corre');

  w.innerHTML=`
    <img class="yr-dog" src="${IMG}" alt="YDG-01 perro robot">
    <span class="yr-laser" aria-hidden="true"></span>
    <button class="yr-close" type="button" aria-label="Cerrar YDG-01">×</button>
    <div class="yr-help">1× SALUDA · 2× SALTA · 3× CORRE</div>
  `;

  const reopen=document.createElement('button');
  reopen.id='ydg-robot-reopen';
  reopen.type='button';
  reopen.setAttribute('aria-label','Abrir YDG-01');
  reopen.innerHTML=`<img src="${THUMB}" alt="">`;

  document.body.append(w,reopen);

  // Mantener el robot oculto mientras se reproduce la presentación.
  const intro=document.getElementById('fx-intro');
  const revealRobot=()=>document.body.classList.add('ydg-robot-live');
  if(intro){
    const done=()=>{revealRobot();intro.removeEventListener('animationend',done)};
    intro.addEventListener('animationend',done);
    setTimeout(revealRobot,4700);
  }else{
    revealRobot();
  }

  const close=w.querySelector('.yr-close');
  let clicks=0,timer=0,busy=false,lastTouch=0;

  const clear=()=>w.classList.remove('act-wave','act-jump','act-run');
  function idle(){clear();busy=false}
  function wave(){if(busy)return;busy=true;clear();void w.offsetWidth;w.classList.add('act-wave');setTimeout(idle,1250)}
  function jump(){if(busy)return;busy=true;clear();void w.offsetWidth;w.classList.add('act-jump');setTimeout(idle,1400)}
  function run(){if(busy)return;busy=true;clear();void w.offsetWidth;w.classList.add('act-run');setTimeout(idle,2600)}

  function fire(){
    const n=Math.min(clicks,3);
    clicks=0;
    if(n===1)wave();
    else if(n===2)jump();
    else if(n>=3)run();
  }

  function tap(){
    if(busy)return;
    clicks=Math.min(3,clicks+1);
    clearTimeout(timer);
    timer=setTimeout(fire,350);
  }

  w.addEventListener('pointerup',e=>{
    if(e.target===close)return;
    if(e.pointerType==='touch'){
      lastTouch=Date.now();
      e.preventDefault();
      tap();
    }
  });

  w.addEventListener('click',e=>{
    if(e.target===close || Date.now()-lastTouch<550)return;
    tap();
  });

  w.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' '){
      e.preventDefault();
      tap();
    }
  });

  close.addEventListener('click',e=>{
    e.stopPropagation();
    w.hidden=true;
    reopen.classList.add('show');
  });

  reopen.addEventListener('click',()=>{
    w.hidden=false;
    reopen.classList.remove('show');
    setTimeout(wave,120);
  });
}

document.readyState==='loading'
 ? document.addEventListener('DOMContentLoaded',mount,{once:true})
 : mount();
})();
