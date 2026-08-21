
(()=>{
'use strict';
const IMG='ydg01-v100.png', THUMB='ydg01-v100-thumb.png';
function mount(){
  document.querySelectorAll('#ydg-robot-widget,#ydg-robot-reopen,.ydg-dog-mascot,#ydg-dog-mascot,#ydg-dog-3d').forEach(n=>n.remove());
  const w=document.createElement('div');
  w.id='ydg-robot-widget'; w.tabIndex=0; w.setAttribute('role','button');
  w.setAttribute('aria-label','YDG-01: 1 clic saluda, 2 clics salta, 3 clics corre');
  w.innerHTML=`<div class="yr-stage">
    <span class="yr-aura"></span>
    <img class="yr-dog" src="${IMG}" alt="YDG-01 robot perro">
    <div class="yr-head"><i></i><b>YDG-01</b><span class="yr-state">ONLINE</span></div>
    <button class="yr-close" type="button" aria-label="Cerrar YDG-01">×</button>
    <span class="yr-beam" aria-hidden="true"></span>
    <div class="yr-message"><b>YDG-01</b><span>ONLINE</span></div>
    <div class="yr-guide"><span>1× 👋 SALUDO</span><span>2× ↟ SALTO</span><span>3× RUN</span></div>
  </div>`;
  const re=document.createElement('button');
  re.id='ydg-robot-reopen'; re.type='button'; re.setAttribute('aria-label','Abrir YDG-01');
  re.innerHTML=`<img src="${THUMB}" alt="">`;
  document.body.append(w,re);

  const state=w.querySelector('.yr-state'), msg=w.querySelector('.yr-message span'), close=w.querySelector('.yr-close');
  let clicks=0,timer=0,busy=false,lastTouch=0;

  const clear=()=>w.classList.remove('yr-greeting','yr-jumping','yr-running');
  const label=(s,m)=>{state.textContent=s;msg.textContent=m};

  function idle(){clear();label('ONLINE','ONLINE');busy=false}
  function greet(){if(busy)return;busy=true;clear();label('HELLO','HOLA 👋');void w.offsetWidth;w.classList.add('yr-greeting');setTimeout(idle,1050)}
  function jump(){if(busy)return;busy=true;clear();label('JUMP','SALTO ↟');void w.offsetWidth;w.classList.add('yr-jumping');setTimeout(idle,1150)}
  function run(){if(busy)return;busy=true;clear();label('RUN MODE','CARRERA');void w.offsetWidth;w.classList.add('yr-running');setTimeout(()=>{idle();setTimeout(greet,140)},2300)}
  function execute(){const n=Math.min(clicks,3);clicks=0;if(n===1)greet();else if(n===2)jump();else if(n>=3)run()}
  function register(){if(busy)return;clicks=Math.min(3,clicks+1);clearTimeout(timer);timer=setTimeout(execute,340)}

  w.addEventListener('pointerup',e=>{if(e.target===close)return;if(e.pointerType==='touch'){lastTouch=Date.now();e.preventDefault();register()}});
  w.addEventListener('click',e=>{if(e.target===close||Date.now()-lastTouch<550)return;register()});
  w.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();register()}});
  close.addEventListener('click',e=>{e.stopPropagation();w.hidden=true;re.classList.add('is-visible');try{sessionStorage.setItem('ydgRobotClosed','1')}catch(_){}});
  re.addEventListener('click',()=>{w.hidden=false;re.classList.remove('is-visible');try{sessionStorage.removeItem('ydgRobotClosed')}catch(_){};setTimeout(greet,100)});
  try{if(sessionStorage.getItem('ydgRobotClosed')==='1'){w.hidden=true;re.classList.add('is-visible')}}catch(_){}
  if(!w.hidden)setTimeout(greet,1200);
}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',mount,{once:true}):mount();
})();
