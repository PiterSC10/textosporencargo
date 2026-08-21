
(()=>{
'use strict';
const IMG={
 idle:'robot-idle.webp',
 wave:'robot-wave.webp',
 jump:'robot-jump.webp',
 run:'robot-run.webp'
};
function mount(){
 if(document.getElementById('ydg-robot-widget')) return;
 // remove any legacy mascot left in old HTML
 document.querySelectorAll('.ydg-dog-mascot,#ydg-dog-mascot,#ydg-dog-3d').forEach(n=>n.remove());

 const w=document.createElement('div');
 w.id='ydg-robot-widget';
 w.setAttribute('role','button');w.tabIndex=0;
 w.setAttribute('aria-label','YDG-01: un clic saluda, dos clics salta, tres clics corre');
 w.innerHTML=`<div class="rw-stage">
   <span class="rw-aura"></span>
   <img class="rw-img" src="${IMG.idle}" alt="YDG-01 robot perro">
   <div class="rw-status"><i></i><b>YDG-01</b><span class="rw-state">ONLINE</span></div>
   <button class="rw-close" type="button" aria-label="Cerrar YDG-01">×</button>
   <span class="rw-scan"></span>
   <div class="rw-message"><b>YDG-01</b><span>HOLA 👋</span></div>
   <div class="rw-guide"><span>1× HOLA</span><span>2× SALTO</span><span>3× RUN</span></div>
 </div>`;
 const reopen=document.createElement('button');
 reopen.id='ydg-robot-reopen';reopen.type='button';reopen.setAttribute('aria-label','Abrir YDG-01');
 reopen.innerHTML=`<img src="robot-thumb.webp" alt="">`;
 document.body.append(w,reopen);

 const img=w.querySelector('.rw-img'),state=w.querySelector('.rw-state'),msg=w.querySelector('.rw-message span'),close=w.querySelector('.rw-close');
 let count=0,timer=0,busy=false,lastTouch=0;

 function label(s,m){state.textContent=s;msg.textContent=m||s}
 function clear(){w.classList.remove('rw-greeting','rw-jumping','rw-running')}
 function idle(){clear();img.src=IMG.idle;label('ONLINE','HOLA 👋');busy=false}
 function greet(){
   if(busy)return;busy=true;clear();img.src=IMG.wave;label('HELLO','HOLA 👋');void w.offsetWidth;w.classList.add('rw-greeting');
   setTimeout(idle,960)
 }
 function jump(){
   if(busy)return;busy=true;clear();img.src=IMG.jump;label('JUMP','SALTO ↟');void w.offsetWidth;w.classList.add('rw-jumping');
   setTimeout(idle,1080)
 }
 function run(){
   if(busy)return;busy=true;clear();img.src=IMG.run;label('RUN MODE','MODO CARRERA');void w.offsetWidth;w.classList.add('rw-running');
   setTimeout(()=>{idle();setTimeout(greet,130)},2190)
 }
 function execute(){const n=Math.min(count,3);count=0;if(n===1)greet();else if(n===2)jump();else if(n>=3)run()}
 function register(){
   if(busy)return;count=Math.min(3,count+1);clearTimeout(timer);timer=setTimeout(execute,335)
 }
 w.addEventListener('pointerup',e=>{
   if(e.target===close)return;
   if(e.pointerType==='touch'){lastTouch=Date.now();e.preventDefault();register()}
 });
 w.addEventListener('click',e=>{
   if(e.target===close)return;
   if(Date.now()-lastTouch<550)return;register()
 });
 w.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();register()}});
 close.addEventListener('click',e=>{
   e.stopPropagation();w.hidden=true;reopen.classList.add('is-visible');try{sessionStorage.setItem('ydgRobotClosed','1')}catch(_){}
 });
 reopen.addEventListener('click',()=>{
   w.hidden=false;reopen.classList.remove('is-visible');try{sessionStorage.removeItem('ydgRobotClosed')}catch(_){}
   setTimeout(greet,120)
 });
 try{if(sessionStorage.getItem('ydgRobotClosed')==='1'){w.hidden=true;reopen.classList.add('is-visible')}}catch(_){}
 // visual proof-of-life once the page is available
 if(!w.hidden)setTimeout(greet,1250);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
})();
