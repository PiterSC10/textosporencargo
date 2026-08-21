
(()=>{'use strict';
const AS={
  idle:'ydg01-idle-v103.png',
  wave:'ydg01-wave-v103.png',
  jump:'ydg01-jump-v103.png',
  run:'ydg01-run-v103.png',
  thumb:'ydg01-thumb-v103.png'
};

function mount(){
  document.querySelectorAll('#ydg-robot-widget,#ydg-robot-reopen').forEach(n=>n.remove());

  const w=document.createElement('div');
  w.id='ydg-robot-widget';
  w.tabIndex=0;
  w.setAttribute('role','button');
  w.setAttribute('aria-label','YDG-01: 1 clic saluda, 2 clics salta, 3 clics corre');

  w.innerHTML=`
    <div class="ydg01-hud" id="ydg01-hud">
      <div class="hud-head">
        <div><b>YDG-01</b><small>AI ROBOT DOG</small></div>
        <div class="hud-actions">
          <button class="hud-min" type="button" aria-label="Minimizar panel">−</button>
          <button class="hud-close" type="button" aria-label="Cerrar YDG-01">×</button>
        </div>
      </div>

      <div class="hud-body">
        <div class="scan-core">
          <span class="scan-r1"></span>
          <span class="scan-r2"></span>
          <span class="scan-sweep"></span>
          <i></i>
          <strong>SCAN</strong>
        </div>
        <div class="skills">
          <span><b>1</b> SALUDO</span>
          <span><b>2</b> SALTO</span>
          <span><b>3</b> CARRERA</span>
        </div>
      </div>
    </div>

    <img class="yr-dog" src="${AS.idle}" alt="YDG-01 perro robot">
    <span class="yr-beam" aria-hidden="true"></span>
    <div class="yr-help">1× SALUDA · 2× SALTA · 3× CORRE</div>
  `;

  const reopen=document.createElement('button');
  reopen.id='ydg-robot-reopen';
  reopen.type='button';
  reopen.setAttribute('aria-label','Abrir YDG-01');
  reopen.innerHTML=`<img src="${AS.thumb}" alt="">`;

  document.body.append(w,reopen);

  const img=w.querySelector('.yr-dog');
  const hud=w.querySelector('#ydg01-hud');
  const min=w.querySelector('.hud-min');
  const close=w.querySelector('.hud-close');

  let clicks=0,timer=0,busy=false,lastTouch=0;

  const clear=()=>w.classList.remove('act-wave','act-jump','act-run');
  function idle(){clear();img.src=AS.idle;busy=false}
  function wave(){if(busy)return;busy=true;clear();img.src=AS.wave;void w.offsetWidth;w.classList.add('act-wave');setTimeout(idle,1350)}
  function jump(){if(busy)return;busy=true;clear();img.src=AS.jump;void w.offsetWidth;w.classList.add('act-jump');setTimeout(idle,1450)}
  function run(){if(busy)return;busy=true;clear();img.src=AS.run;void w.offsetWidth;w.classList.add('act-run');setTimeout(idle,2650)}

  function execute(){
    const c=Math.min(clicks,3);
    clicks=0;
    if(c===1)wave();
    else if(c===2)jump();
    else if(c>=3)run();
  }
  function register(){
    if(busy)return;
    clicks=Math.min(3,clicks+1);
    clearTimeout(timer);
    timer=setTimeout(execute,360);
  }

  w.addEventListener('pointerup',e=>{
    if(e.target.closest('button')) return;
    if(e.pointerType==='touch'){lastTouch=Date.now();e.preventDefault();register()}
  });
  w.addEventListener('click',e=>{
    if(e.target.closest('button') || Date.now()-lastTouch<550) return;
    register();
  });
  w.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' '){e.preventDefault();register()}
  });

  min.addEventListener('click',e=>{
    e.stopPropagation();
    hud.classList.toggle('is-min');
    min.textContent=hud.classList.contains('is-min')?'＋':'−';
  });

  close.addEventListener('click',e=>{
    e.stopPropagation();
    w.hidden=true;
    reopen.classList.add('show');
  });

  reopen.addEventListener('click',()=>{
    w.hidden=false;
    reopen.classList.remove('show');
    setTimeout(wave,100);
  });
}

document.readyState==='loading'
  ? document.addEventListener('DOMContentLoaded',mount,{once:true})
  : mount();
})();
