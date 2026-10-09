// DSY Training — shared behaviour for walk-through scenario modules.
// Scroll progress bar, collapsible sections, fade-in, and tickable checklists.

const bar=document.getElementById('progBar');
window.addEventListener('scroll',()=>{
if(document.body.classList.contains('student'))return;
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

// ---------------------------------------------------------------------------
// Facilitator / Student modes. Only pages whose <body> has data-modes get the
// switch. Markup hooks:
//   data-only="facilitator|student"  shown in one mode only
//   data-student-text="..."          heading text used in student mode
//   .answer                          hidden until the student reveals it
//   .quiz[data-correct=n]            quick-check question (student mode)
//   ol[data-reflect]                 each item gets a reflection box
// Student answers and progress are kept in this browser only.
// ---------------------------------------------------------------------------
(function(){
if(!document.body.hasAttribute('data-modes'))return;

const KEY='dsy:'+location.pathname+':';
const store={
get(k,d){try{const v=localStorage.getItem(KEY+k);return v===null?d:JSON.parse(v);}catch(e){return d;}},
set(k,v){try{localStorage.setItem(KEY+k,JSON.stringify(v));}catch(e){}},
clear(){try{Object.keys(localStorage).filter(k=>k.indexOf(KEY)===0).forEach(k=>localStorage.removeItem(k));}catch(e){}}
};
const el=(tag,cls,html)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;};
const wrap=document.querySelector('.wrap');
const footer=wrap.querySelector('.mod-ft');

// mode switch in the back-nav bar
const nav=document.querySelector('.back-nav');
const sw=el('div','mode-switch');
sw.setAttribute('role','group');sw.setAttribute('aria-label','View');
sw.innerHTML='<button type="button" data-mode="facilitator">Facilitator</button><button type="button" data-mode="student">Student</button>';
nav.appendChild(sw);

// heading text swaps
document.querySelectorAll('[data-student-text]').forEach(h=>{h.dataset.facText=h.innerHTML;});

// reveal boxes before each answer
const responses=[];
document.querySelectorAll('.answer').forEach((ans,i)=>{
const bp=ans.closest('.bp');
const label=bp?bp.querySelector('.bp-label').textContent:'Response '+(i+1);
const title=bp&&bp.querySelector('h3')?bp.querySelector('h3').textContent:'';
const box=el('div','respond');box.dataset.only='student';
box.innerHTML='<label class="respond-label" for="resp'+i+'">Your answer</label>'+
'<textarea id="resp'+i+'" rows="4" placeholder="Jot down what you would do and why, then reveal the expected reasoning."></textarea>'+
'<button type="button" class="reveal-btn">Reveal expected reasoning</button>';
ans.parentNode.insertBefore(box,ans);
const ta=box.querySelector('textarea'),btn=box.querySelector('.reveal-btn');
ta.value=store.get('r'+i,'');
ta.addEventListener('input',()=>store.set('r'+i,ta.value));
const show=()=>{ans.classList.add('shown');btn.textContent='Expected reasoning shown below';btn.disabled=true;};
if(store.get('v'+i,false))show();
btn.addEventListener('click',()=>{store.set('v'+i,true);show();});
responses.push({label,title,ta});
});

// reflection boxes on debrief questions
document.querySelectorAll('ol[data-reflect] > li').forEach((li,i)=>{
const ta=el('textarea','reflect');ta.dataset.only='student';ta.rows=3;
ta.placeholder='Your reflection';ta.setAttribute('aria-label','Reflection '+(i+1));
ta.value=store.get('d'+i,'');
ta.addEventListener('input',()=>store.set('d'+i,ta.value));
li.appendChild(ta);
responses.push({label:'Debrief '+(i+1),title:li.firstChild.textContent.trim(),ta});
});

// quick checks
document.querySelectorAll('.quiz').forEach((q,qi)=>{
const opts=[...q.querySelectorAll('.quiz-opt')],right=+q.dataset.correct;
const mark=pick=>{opts.forEach((o,j)=>{o.disabled=true;o.classList.toggle('right',j===right);o.classList.toggle('wrong',j===pick&&pick!==right);});q.classList.add('answered');};
const saved=store.get('q'+qi,null);if(saved!==null)mark(saved);
opts.forEach((o,j)=>o.addEventListener('click',()=>{store.set('q'+qi,j);mark(j);}));
});

// student intro + finish summary
const intro=el('div','hl hl-blue student-intro',
'<strong>Self-paced walk-through.</strong> Work through one step at a time. At each break point, write down what you would do <em>before</em> revealing the expected reasoning. Your answers are saved in this browser only.');
intro.dataset.only='student';
const firstSec=wrap.querySelector('section');firstSec.insertBefore(intro,firstSec.children[1]);

const summary=el('section','fade-s vis summary');summary.dataset.only='student';
wrap.insertBefore(summary,footer);

// step navigation
const stepNav=el('div','step-nav');stepNav.dataset.only='student';
stepNav.innerHTML='<button type="button" class="step-prev">&larr; Back</button><span class="step-count"></span><button type="button" class="step-next">Next &rarr;</button>';
document.body.appendChild(stepNav);
const prev=stepNav.querySelector('.step-prev'),next=stepNav.querySelector('.step-next'),count=stepNav.querySelector('.step-count');

const steps=()=>[...wrap.querySelectorAll(':scope > section')].filter(s=>s.dataset.only!=='facilitator');
let step=store.get('step',0);

function buildSummary(){
const esc=t=>t.replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const done=responses.filter(r=>r.ta.value.trim());
const qs=[...document.querySelectorAll('.quiz')];
const right=qs.filter(q=>q.querySelector('.quiz-opt.right')&&!q.querySelector('.quiz-opt.wrong')&&q.classList.contains('answered')).length;
summary.innerHTML='<h2>Scenario Complete</h2>'+
'<div class="card"><p>You answered <strong>'+done.length+'</strong> of '+responses.length+' prompts'+
(qs.length?' and got <strong>'+right+'</strong> of '+qs.length+' quick checks right first time':'')+'.</p>'+
'<p>Compare your answers with the expected reasoning, then discuss anything you were unsure about with your clinical mentor.</p></div>'+
'<div class="card"><h3>My Answers</h3>'+(done.length?done.map(r=>'<div class="my-answer"><h4>'+esc(r.label)+(r.title?' &mdash; '+esc(r.title):'')+'</h4><p>'+esc(r.ta.value.trim()).replace(/\n/g,'<br>')+'</p></div>').join(''):'<p>No answers written yet.</p>')+'</div>'+
'<div class="summary-actions"><button type="button" class="print-btn">Print / save as PDF</button><button type="button" class="restart-btn">Start again</button></div>';
summary.querySelector('.print-btn').addEventListener('click',()=>window.print());
summary.querySelector('.restart-btn').addEventListener('click',()=>{
if(!confirm('Clear your answers and start this scenario again?'))return;
store.clear();location.href=location.pathname+'?mode=student';});
}

function showStep(n,scroll){
const all=steps();step=Math.max(0,Math.min(n,all.length-1));store.set('step',step);
all.forEach((s,i)=>{s.classList.toggle('current',i===step);s.classList.add('vis');});
if(all[step]===summary)buildSummary();
const last=all.length-1;
prev.disabled=step===0;
next.textContent=step===last-1?'Finish ✓':'Next →';
next.style.visibility=step===last?'hidden':'visible';
count.textContent=step===last?'Complete':'Step '+(step+1)+' of '+last;
bar.style.width=(step/last*100)+'%';
if(scroll)window.scrollTo(0,0);
}
prev.addEventListener('click',()=>showStep(step-1,true));
next.addEventListener('click',()=>showStep(step+1,true));

function setMode(m){
const student=m==='student';
document.body.classList.toggle('student',student);
sw.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===m)));
document.querySelectorAll('[data-student-text]').forEach(h=>{h.innerHTML=student?h.dataset.studentText:h.dataset.facText;});
store.set('mode',m);
const u=new URL(location.href);u.searchParams.set('mode',m);history.replaceState(null,'',u);
if(student)showStep(step,false);else window.dispatchEvent(new Event('scroll'));
}
sw.addEventListener('click',e=>{const b=e.target.closest('button');if(b)setMode(b.dataset.mode);});
const q=new URLSearchParams(location.search).get('mode');
setMode(q==='student'||q==='facilitator'?q:store.get('mode','facilitator'));
})();
