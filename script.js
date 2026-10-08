const loader=document.getElementById("loader");
const percent=document.getElementById("loaderPercent");
let p=0;
const loadTimer=setInterval(()=>{
  p+=Math.floor(Math.random()*12)+5;
  if(p>=100){p=100;clearInterval(loadTimer);setTimeout(()=>loader.classList.add("done"),350)}
  percent.textContent=String(p).padStart(2,"0")+"%";
  document.querySelector(".loader-bar i").style.width=p+"%";
},90);

const body=document.body;
const theme=document.getElementById("themeToggle");
const saved=localStorage.getItem("ms-theme");
if(saved==="light") body.classList.add("light");
function icon(){theme.querySelector(".material-symbols-rounded").textContent=body.classList.contains("light")?"light_mode":"dark_mode"}
icon();
theme.addEventListener("click",()=>{body.classList.toggle("light");localStorage.setItem("ms-theme",body.classList.contains("light")?"light":"dark");icon()});

const cur=document.querySelector(".cursor"),dot=document.querySelector(".cursor-dot");
let mx=innerWidth/2,my=innerHeight/2,cx=mx,cy=my;
addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+"px";dot.style.top=my+"px"});
function follow(){cx+=(mx-cx)*.14;cy+=(my-cy)*.14;cur.style.left=cx+"px";cur.style.top=cy+"px";requestAnimationFrame(follow)}
follow();

document.querySelectorAll("a,button,.project").forEach(el=>{
 el.addEventListener("mouseenter",()=>{cur.style.width="70px";cur.style.height="70px";cur.style.background="rgba(162,140,255,.07)"});
 el.addEventListener("mouseleave",()=>{cur.style.width="44px";cur.style.height="44px";cur.style.background="transparent"});
});

const observer=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}})
},{threshold:.12});
document.querySelectorAll(".reveal").forEach((el,i)=>{el.style.transitionDelay=Math.min(i*55,280)+"ms";observer.observe(el)});

document.querySelectorAll(".magnetic").forEach(el=>{
 el.addEventListener("pointermove",e=>{
  const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.12,y=(e.clientY-r.top-r.height/2)*.12;
  el.style.transform=`translate(${x}px,${y}px)`;
 });
 el.addEventListener("pointerleave",()=>el.style.transform="");
});

document.querySelector(".back").addEventListener("click",()=>scrollTo({top:0,behavior:"smooth"}));
document.querySelectorAll(".project-card").forEach(a=>a.addEventListener("click",e=>e.preventDefault()));
document.querySelectorAll(".socials a").forEach(a=>a.addEventListener("click",e=>e.preventDefault()));
