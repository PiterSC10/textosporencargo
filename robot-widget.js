
(()=>{'use strict';
const A={idle:'ydg01-idle.webp',wave:'ydg01-wave.webp',jump:'ydg01-jump.webp',run:'ydg01-run.webp',thumb:'ydg01-thumb.webp'};
function mount(){document.querySelectorAll('.ydg-dog-mascot,#ydg-dog-mascot,#ydg-dog-3d,#ydg-robot-widget,#ydg-robot-reopen').forEach(n=>n.remove());
const w=document.createElement('div');w.id='ydg-robot-widget';w.tabIndex=0;w.setAttribute('role','button');w.setAttribute('aria-label','YDG-01: un clic saluda, dos clics salta, tres clics corre');
w.innerHTML=`<div class="yr-stage"><span class="yr-aura"></span><img class="yr-dog" src="${A.idle}" alt="YDG-01 perro robot chino fotorrealista"><div class="yr-head"><i></i><b>YDG-01</b><span class="yr-state">ONLINE</span></div><button class="yr-close" type="button" aria-label="Cerrar YDG-01">×</button><span class="yr-scan"></span><div class="yr-message"><b>YDG-01</b><span>HOLA 👋</span></div><div class="yr-guide"><span>1× HOLA</span><span>2× SALTO</span><span>3× RUN</span></div></div>`;
const re=document.createElement('button');re.id='ydg-robot-reopen';re.type='button';re.setAttribute('aria-label','Volver a abrir YDG-01');re.innerHTML=`<img src="${A.thumb}" alt="">`;document.body.append(w,re);
const img=w.querySelector('.yr-dog'),st=w.querySelector('.yr-state'),msg=w.querySelector('.yr-message span'),close=w.querySelector('.yr-close');let count=0,timer=0,busy=false,lastTouch=0;
const label=(s,m)=>{st.textContent=s;msg.textContent=m||s};const clear=()=>w.classList.remove('yr-greeting','yr-jumping','yr-running');function idle(){clear();img.src=A.idle;label('ONLINE','HOLA 👋');busy=false}
function greet(){if(busy)return;busy=true;clear();img.src=A.wave;label('HELLO','HOLA 👋');void w.offsetWidth;w.classList.add('yr-greeting');setTimeout(idle,980)}
function jump(){if(busy)return;busy=true;clear();img.src=A.jump;label('JUMP','SALTO ↟');void w.offsetWidth;w.classList.add('yr-jumping');setTimeout(idle,1100)}
function run(){if(busy)return;busy=true;clear();img.src=A.run;label('RUN MODE','CARRERA');void w.offsetWidth;w.classList.add('yr-running');setTimeout(()=>{idle();setTimeout(greet,120)},2110)}
function execute(){const n=Math.min(count,3);count=0;if(n===1)greet();else if(n===2)jump();else if(n>=3)run()}function register(){if(busy)return;count=Math.min(3,count+1);clearTimeout(timer);timer=setTimeout(execute,335)}
w.addEventListener('pointerup',e=>{if(e.target===close)return;if(e.pointerType==='touch'){lastTouch=Date.now();e.preventDefault();register()}});w.addEventListener('click',e=>{if(e.target===close)return;if(Date.now()-lastTouch<550)return;register()});w.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();register()}});
close.addEventListener('click',e=>{e.stopPropagation();w.hidden=true;re.classList.add('is-visible');try{sessionStorage.setItem('ydgRobotClosed','1')}catch(_){}});re.addEventListener('click',()=>{w.hidden=false;re.classList.remove('is-visible');try{sessionStorage.removeItem('ydgRobotClosed')}catch(_){};setTimeout(greet,100)});
try{if(sessionStorage.getItem('ydgRobotClosed')==='1'){w.hidden=true;re.classList.add('is-visible')}}catch(_){}if(!w.hidden)setTimeout(greet,1150)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount()})();
