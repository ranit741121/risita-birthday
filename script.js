const $ = (s) => document.querySelector(s);
const typing = $("#typing");
const phrase = "Dear Risita, today the world is a little brighter because you are celebrating another beautiful year. 💖";
let i = 0;

function typeText(){
  if(i < phrase.length){
    typing.textContent += phrase[i++];
    setTimeout(typeText, 38);
  }
}
setTimeout(typeText, 700);

$("#year").textContent = new Date().getFullYear();

const sparkleBox = $("#sparkles");
for(let n=0;n<45;n++){
  const s=document.createElement("span");
  s.className="spark";
  s.textContent="✦";
  s.style.left=Math.random()*100+"%";
  s.style.top=Math.random()*100+"%";
  s.style.fontSize=(8+Math.random()*15)+"px";
  s.style.animationDelay=(Math.random()*3)+"s";
  sparkleBox.appendChild(s);
}

const observer = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

function confetti(){
  const symbols=["♥","✦","●","★","🎉"];
  for(let n=0;n<90;n++){
    const c=document.createElement("div");
    c.className="confetti";
    c.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    c.style.left=Math.random()*100+"vw";
    c.style.fontSize=(10+Math.random()*20)+"px";
    c.style.animationDelay=(Math.random()*1.2)+"s";
    c.style.transform=`rotate(${Math.random()*360}deg)`;
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),4500);
  }
}

$("#surpriseBtn").addEventListener("click",()=>{
  $("#surpriseModal").classList.add("show");
  confetti();
});
$("#closeModal").addEventListener("click",()=>$("#surpriseModal").classList.remove("show"));
$("#surpriseModal").addEventListener("click",(e)=>{
  if(e.target.id==="surpriseModal") $("#surpriseModal").classList.remove("show");
});

$("#wishBtn").addEventListener("click",()=>{
  confetti();
  $("#wishResult").textContent="✨ Your wish has been sent to the stars. May it come true! ✨";
});

document.addEventListener("keydown",e=>{
  if(e.key==="Escape") $("#surpriseModal").classList.remove("show");
});

/* Browser-generated Happy Birthday melody.
   It works without an external MP3 file. */
let audioCtx=null, playing=false, timer=null;
const notes={
  C4:261.63,D4:293.66,E4:329.63,F4:349.23,G4:392.00,A4:440.00,
  B4:493.88,C5:523.25,D5:587.33,E5:659.25,F5:698.46,G5:783.99
};
const song=[
  ["G4",.45],["G4",.25],["A4",.7],["G4",.7],["C5",.7],["B4",1.2],
  ["G4",.45],["G4",.25],["A4",.7],["G4",.7],["D5",.7],["C5",1.2],
  ["G4",.45],["G4",.25],["G5",.7],["E5",.7],["C5",.7],["B4",.7],["A4",1.1],
  ["F5",.45],["F5",.25],["E5",.7],["C5",.7],["D5",.7],["C5",1.5]
];

function playNote(freq,start,duration){
  const osc=audioCtx.createOscillator();
  const gain=audioCtx.createGain();
  osc.type="sine";
  osc.frequency.value=freq;
  gain.gain.setValueAtTime(0.0001,start);
  gain.gain.exponentialRampToValueAtTime(.22,start+.025);
  gain.gain.exponentialRampToValueAtTime(.0001,start+duration-.03);
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.start(start); osc.stop(start+duration);
}

function playBirthdaySong(){
  if(playing) return;
  playing=true;
  const btn=$("#musicBtn");
  btn.textContent="🎵 Playing Birthday Song...";
  audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  let t=audioCtx.currentTime+.08;
  for(const [name,len] of song){
    playNote(notes[name],t,len*.55);
    t += len*.55 + .035;
  }
  timer=setTimeout(()=>{
    playing=false;
    btn.textContent="🎵 Play Birthday Song";
  },(t-audioCtx.currentTime)*1000+100);
}
$("#musicBtn").addEventListener("click",playBirthdaySong);
$("#modalMusic").addEventListener("click",playBirthdaySong);
