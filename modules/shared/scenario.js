// DSY Training — shared behaviour for walk-through scenario modules.
// Scroll progress bar, collapsible sections, fade-in, and tickable checklists.

const bar=document.getElementById('progBar');
window.addEventListener('scroll',()=>{
const h=document.documentElement;
const max=h.scrollHeight-h.clientHeight;
bar.style.width=(max>0?(h.scrollTop/max)*100:0)+'%';
});

function toggle(btn){
btn.classList.toggle('open');
const body=btn.nextElementSibling;
if(body.style.maxHeight){body.style.maxHeight=null;}
else{body.style.maxHeight=body.scrollHeight+'px';}
}

const obs=new IntersectionObserver((entries)=>{
entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');}});
},{threshold:0.08});
document.querySelectorAll('.fade-s').forEach(el=>obs.observe(el));

document.querySelectorAll('ul.cl li').forEach(li=>{
li.addEventListener('click',()=>li.classList.toggle('done'));
});
