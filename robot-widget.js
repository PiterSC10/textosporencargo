
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
  function wave(){if(busy)return;busy=true;clear();void w.offsetWidth;w.classList.add('act-wave'); if(window.YDG01FrameMotion)window.YDG01FrameMotion.wave();setTimeout(idle,1250)}
  function jump(){if(busy)return;busy=true;clear();void w.offsetWidth;w.classList.add('act-jump'); if(window.YDG01FrameMotion)window.YDG01FrameMotion.jump();setTimeout(idle,1400)}
  function run(){if(busy)return;busy=true;clear();void w.offsetWidth;w.classList.add('act-run'); if(window.YDG01FrameMotion)window.YDG01FrameMotion.run();setTimeout(idle,2600)}

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


/* V121 frame-motion controller: original YDG-01 master-derived frames only */
(()=>{
  'use strict';
  const SEQ = {"idle": ["ydg01-idle-01.png", "ydg01-idle-02.png", "ydg01-idle-03.png", "ydg01-idle-04.png", "ydg01-idle-05.png"], "wave": ["ydg01-wave-01.png", "ydg01-wave-02.png", "ydg01-wave-03.png", "ydg01-wave-04.png", "ydg01-wave-05.png", "ydg01-wave-06.png", "ydg01-wave-07.png", "ydg01-wave-08.png"], "jump": ["ydg01-jump-01.png", "ydg01-jump-02.png", "ydg01-jump-03.png", "ydg01-jump-04.png", "ydg01-jump-05.png", "ydg01-jump-06.png", "ydg01-jump-07.png", "ydg01-jump-08.png", "ydg01-jump-09.png", "ydg01-jump-10.png"], "run": ["ydg01-run-01.png", "ydg01-run-02.png", "ydg01-run-03.png", "ydg01-run-04.png", "ydg01-run-05.png", "ydg01-run-06.png"]};
  const wait = ms => new Promise(r=>setTimeout(r,ms));
  function getRobot(){
    const w=document.getElementById('ydg-robot-widget');
    if(!w)return null;
    const img=w.querySelector('.yr-dog img, img.yr-dog, .yr-dog');
    return {w,img};
  }
  function srcFor(name){ return name; }
  async function playFrames(img,names,frameMs,flip=false){
    if(!img || !('src' in img)) return;
    for(const name of names){
      img.style.transform = flip ? 'scaleX(-1)' : '';
      img.src=srcFor(name);
      await wait(frameMs);
    }
  }
  async function ydgFrameWave(){
    const r=getRobot(); if(!r||r.w.dataset.frameBusy==='1')return;
    r.w.dataset.frameBusy='1';
    await playFrames(r.img,SEQ.wave,145,false);
    r.img.src='ydg01-clean-v106.png'; r.img.style.transform='';
    r.w.dataset.frameBusy='0';
  }
  async function ydgFrameJump(){
    const r=getRobot(); if(!r||r.w.dataset.frameBusy==='1')return;
    r.w.dataset.frameBusy='1';
    await playFrames(r.img,SEQ.jump,105,false);
    r.img.src='ydg01-clean-v106.png'; r.img.style.transform='';
    r.w.dataset.frameBusy='0';
  }
  async function ydgFrameRun(){
    const r=getRobot(); if(!r||r.w.dataset.frameBusy==='1')return;
    r.w.dataset.frameBusy='1';
    const start=performance.now(), duration=1250;
    while(performance.now()-start<duration){
      await playFrames(r.img,SEQ.run,70,false);
    }
    await wait(100);
    const start2=performance.now();
    while(performance.now()-start2<duration){
      await playFrames(r.img,SEQ.run,70,true);
    }
    r.img.src='ydg01-clean-v106.png'; r.img.style.transform='';
    r.w.dataset.frameBusy='0';
  }
  window.YDG01FrameMotion={wave:ydgFrameWave,jump:ydgFrameJump,run:ydgFrameRun};
})();
