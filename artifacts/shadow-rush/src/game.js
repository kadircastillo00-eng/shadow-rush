// ═══════════════════════════════════════════════════════════
//  SHADOW RUSH v3 — Fixed & Polished
// ═══════════════════════════════════════════════════════════

// ── SKINS (no level lock — just coins + secrets) ──────────
const SKINS = [
  { id:'default',  name:'NEON CUBE',  glow:'#00f5ff', price:0,   gradient:['#00f5ff','#0099cc'], secret:false },
  { id:'fire',     name:'FIRE',       glow:'#ff4500', price:30,  gradient:['#ff6b35','#ff0000'], secret:false },
  { id:'ice',      name:'ICE',        glow:'#00bfff', price:30,  gradient:['#a8e6ff','#0080ff'], secret:false },
  { id:'phantom',  name:'PHANTOM',    glow:'#8000ff', price:50,  gradient:['#bf5af2','#8000ff'], secret:false },
  { id:'gold',     name:'GOLD',       glow:'#ff9500', price:60,  gradient:['#ffd60a','#ff9500'], secret:false },
  { id:'matrix',   name:'MATRIX',     glow:'#00ff41', price:50,  gradient:['#30d158','#00ff00'], secret:false },
  { id:'pink',     name:'NEON PINK',  glow:'#ff0066', price:60,  gradient:['#ff2d78','#ff0066'], secret:false },
  { id:'rainbow',  name:'RAINBOW',    glow:'#ffffff', price:120, gradient:['#ff0000','#ff9900','#ffff00','#00ff00','#0099ff','#bf00ff'], secret:false },
  { id:'lightning',name:'LIGHTNING',  glow:'#ffdd00', price:100, gradient:['#fff176','#ffd600'], secret:false },
  { id:'crystal',  name:'CRYSTAL',    glow:'#b2ebf2', price:120, gradient:['#e0f7fa','#80deea'], secret:false },
  { id:'cosmic',   name:'COSMIC',     glow:'#ab47bc', price:200, gradient:['#ce93d8','#7b1fa2'], secret:false },
  { id:'prism',    name:'PRISM',      glow:'#f06292', price:300, gradient:['#f8bbd0','#ce93d8','#80deea'], secret:false },
  // Secrets — unlocked by stage milestones
  { id:'void',     name:'VOID',       glow:'#6200ea', price:0,   gradient:['#120024','#6200ea'], secret:true, hint:'Reach Stage 5' },
  { id:'darkmatter',name:'DARK MATTER',glow:'#e040fb',price:0,  gradient:['#1a1a2e','#e040fb'], secret:true, hint:'Reach Stage 10' },
  { id:'shadow',   name:'SHADOW LORD',glow:'#ff2d78', price:0,   gradient:['#090018','#ff2d78'], secret:true, hint:'Reach Stage 20' },
  { id:'ultimate', name:'ULTIMATE',   glow:'#ffffff', price:0,   gradient:['#00f5ff','#bf5af2','#ffd60a','#ff2d78'], secret:true, hint:'Reach Stage 50' },
];

// ── OBSTACLE THEMES ───────────────────────────────────────
const OBS_THEMES = [
  { id:'neon',   colors:['#ff2d78','#cc0055'], glow:'#ff2d78' },
  { id:'fire',   colors:['#ff6b35','#cc2200'], glow:'#ff4500' },
  { id:'ice',    colors:['#48cae4','#0077b6'], glow:'#00bfff' },
  { id:'void',   colors:['#6200ea','#310052'], glow:'#6200ea' },
  { id:'cosmic', colors:null,                  glow:'#ce93d8' },
];

// ── RULES ─────────────────────────────────────────────────
const RULES = [
  { id:'normal',       name:'NORMAL',          desc:'' },
  { id:'gravity_flip', name:'⬆ GRAVITY FLIP',  desc:'Gravity reversed!' },
  { id:'speed_boost',  name:'⚡ SPEED BOOST',   desc:'Everything faster!' },
  { id:'slow_motion',  name:'🐢 SLOW MOTION',   desc:'Time slows...' },
  { id:'tiny',         name:'🔬 TINY MODE',     desc:'Cube shrinks!' },
  { id:'big',          name:'🔭 BIG MODE',      desc:'Cube grows!' },
  { id:'dark',         name:'🌑 DARKNESS',      desc:'Lights out!' },
  { id:'inverted',     name:'↔ INVERTED',      desc:'Controls flipped!' },
  { id:'magnetic',     name:'🧲 MAGNETIC',      desc:'Coins attracted!' },
  { id:'ghost',        name:'👻 GHOST MODE',    desc:'Obstacles flicker!' },
];

// ── MISSIONS ──────────────────────────────────────────────
const MISSIONS = [
  { id:'m_score500',  title:'SCORE RUSH',   desc:'Reach 500 score in one run',    key:'score',  goal:500,  reward:20 },
  { id:'m_coins30',   title:'COIN GRAB',    desc:'Collect 30 coins in one run',   key:'coins',  goal:30,   reward:25 },
  { id:'m_stage5',    title:'STAGE FIVE',   desc:'Reach Stage 5 in one run',      key:'stage',  goal:5,    reward:30 },
  { id:'m_combo8',    title:'COMBO KING',   desc:'Get an x8 combo',              key:'combo',  goal:8,    reward:20 },
  { id:'m_survive60', title:'SURVIVOR',     desc:'Survive 60 seconds in one run', key:'time',   goal:60,   reward:30 },
  { id:'m_games10',   title:'DEDICATED',    desc:'Play 10 games',                key:'games',  goal:10,   reward:50 },
];

// ── ACHIEVEMENTS ──────────────────────────────────────────
const ACHIEVEMENTS = [
  { id:'first_run',  title:'FIRST RUSH',    desc:'Play your first game',          icon:'🎮', secret:false },
  { id:'score500',   title:'HALF K',        desc:'Score 500 in one run',          icon:'⭐', secret:false },
  { id:'score2000',  title:'2K CLUB',       desc:'Score 2000 in one run',         icon:'🌟', secret:false },
  { id:'coins100',   title:'COIN KING',     desc:'Collect 100 total coins',       icon:'💰', secret:false },
  { id:'combo10',    title:'COMBO MASTER',  desc:'Reach x10 combo',              icon:'🔥', secret:false },
  { id:'stage5',     title:'STAGE FIVE',    desc:'Reach Stage 5',                 icon:'⚡', secret:false },
  { id:'stage10',    title:'STAGE TEN',     desc:'Reach Stage 10',                icon:'💎', secret:false },
  { id:'skin_own',   title:'STYLIST',       desc:'Unlock any skin',               icon:'🎨', secret:false },
  { id:'survive120', title:'IRON CUBE',     desc:'Survive 2 minutes',            icon:'⏱', secret:false },
  // Secrets
  { id:'stage20',    title:'SHADOW RUSH',   desc:'Reach Stage 20',                icon:'🌑', secret:true },
  { id:'combo15',    title:'COMBO GOD',     desc:'Reach x15 combo',              icon:'🌪', secret:true },
  { id:'jackpot',    title:'JACKPOT!',      desc:'Win 200+ coins on the wheel',   icon:'🎡', secret:true },
];

// ── WHEEL PRIZES ──────────────────────────────────────────
const WHEEL_PRIZES = [
  { label:'10◈',   coins:10,  xp2:false, prob:30 },
  { label:'25◈',   coins:25,  xp2:false, prob:25 },
  { label:'50◈',   coins:50,  xp2:false, prob:18 },
  { label:'100◈',  coins:100, xp2:false, prob:12 },
  { label:'2x RUN',coins:0,   xp2:true,  prob:8  },
  { label:'200◈',  coins:200, xp2:false, prob:5  },
  { label:'5◈',    coins:5,   xp2:false, prob:1  }, // bad luck slot
  { label:'500◈',  coins:500, xp2:false, prob:1  },
];

// ── SPECIAL EVENTS ────────────────────────────────────────
const EVENTS = [
  { id:'double_coins', name:'✕2 DOUBLE COINS!', duration:15 },
  { id:'coin_rain',    name:'🌧 COIN RAIN!',     duration:8  },
  { id:'shield',       name:'🛡 SHIELD!',         duration:8  },
  { id:'score_boost',  name:'🔥 SCORE RUSH!',    duration:10 },
];

// ── DAILY REWARDS (7-day streak calendar) ─────────────────
const DAILY_DAYS = [
  { icon:'◈', label:'5◈',  coins:5  },
  { icon:'◈', label:'8◈',  coins:8  },
  { icon:'⭐', label:'10◈', coins:10 },
  { icon:'◈', label:'10◈', coins:10 },
  { icon:'🌟', label:'15◈', coins:15 },
  { icon:'◈', label:'15◈', coins:15 },
  { icon:'🏆', label:'25◈', coins:25 },
];

// ── STAGE CONFIG ──────────────────────────────────────────
const STAGE_DURATION = 20; // seconds per stage
function stageSpeed(s)        { return 190 + (s - 1) * 55; }
function stageSpawnInterval(s){ return Math.max(0.45, 2.0 - (s - 1) * 0.12); }
function stageCoinBonus(s)    { return s * 3; }
function stageObsTheme(s) {
  if (s >= 20) return OBS_THEMES[4];
  if (s >= 10) return OBS_THEMES[3];
  if (s >= 7)  return OBS_THEMES[2];
  if (s >= 4)  return OBS_THEMES[1];
  return OBS_THEMES[0];
}

// ── UTILITIES ─────────────────────────────────────────────
function loadJ(k, d) { try { return JSON.parse(localStorage.getItem(k) || 'null') || d; } catch { return d; } }
function saveJ(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
function vibrate(p)  { try { navigator.vibrate?.(p); } catch {} }

// ═══════════════════════════════════════════════════════════
//  AUDIO MANAGER  (dynamic tempo)
// ═══════════════════════════════════════════════════════════
class AudioManager {
  constructor() {
    this.ctx = null; this.enabled = true;
    this.bgOscs = []; this.bgGain = null;
    this.beatGain = null; this._beatTid = null;
    this.stage = 1;
    try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch { this.enabled = false; }
  }
  _resume() { this.ctx?.state === 'suspended' && this.ctx.resume(); }
  _tone(freq, type, dur, vol = 0.25, delay = 0) {
    if (!this.enabled || !this.ctx) return;
    this._resume();
    try {
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.connect(g); g.connect(this.ctx.destination);
      o.type = type;
      o.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
      g.gain.setValueAtTime(vol, this.ctx.currentTime + delay);
      g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + delay + dur);
      o.start(this.ctx.currentTime + delay);
      o.stop(this.ctx.currentTime + delay + dur + 0.01);
    } catch {}
  }
  playJump()       { this._tone(200,'sine',.1,.22); this._tone(380,'sine',.07,.14,.05); }
  playCoin()       { this._tone(880,'sine',.08,.22); this._tone(1320,'sine',.06,.16,.07); }
  playDie()        { [200,110,65].forEach((f,i)=>this._tone(f,'sawtooth',.18,.28,i*.1)); }
  playRuleChange() { [440,550,660,880].forEach((f,i)=>this._tone(f,'sine',.1,.18,i*.06)); }
  playCombo(n)     { const f=420+n*35; this._tone(f,'sine',.08,.2); this._tone(f*1.5,'sine',.06,.14,.04); }
  playAchieve()    { [523,659,784,1047].forEach((f,i)=>this._tone(f,'sine',.14,.2,i*.07)); }
  playStageClear() { [262,330,392,523,659,784,1047].forEach((f,i)=>this._tone(f,'sine',.18,.22,i*.07)); }
  playCountdown()  { this._tone(440,'sine',.15,.32); }
  playGo()         { [523,659,784].forEach((f,i)=>this._tone(f,'sine',.14,.28,i*.04)); }
  playEvent()      { [660,880,1100].forEach((f,i)=>this._tone(f,'triangle',.1,.22,i*.06)); }

  setStage(s) {
    this.stage = s;
    if (this.bgGain) {
      const vol = Math.min(0.12, 0.04 + (s-1)*0.008);
      try { this.bgGain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 0.8); } catch {}
    }
    // Restart beat at new tempo
    clearTimeout(this._beatTid);
    if (this.beatGain) this._scheduleBeat();
  }

  startBGM() {
    if (!this.enabled || !this.ctx || this.bgOscs.length) return;
    this._resume();
    try {
      this.bgGain = this.ctx.createGain(); this.bgGain.gain.value = 0.04;
      this.bgGain.connect(this.ctx.destination);
      [55, 82.4, 110].forEach(f => {
        const o = this.ctx.createOscillator(); o.type = 'sine'; o.frequency.value = f;
        o.connect(this.bgGain); o.start(); this.bgOscs.push(o);
      });
      // LFO
      const lfo = this.ctx.createOscillator(), lfoG = this.ctx.createGain();
      lfo.frequency.value = 0.25; lfoG.gain.value = 0.022;
      lfo.connect(lfoG); lfoG.connect(this.bgGain.gain); lfo.start(); this.bgOscs.push(lfo);
      // Beat layer
      this.beatGain = this.ctx.createGain(); this.beatGain.gain.value = 0;
      this.beatGain.connect(this.ctx.destination);
      this._scheduleBeat();
    } catch {}
  }

  _scheduleBeat() {
    if (!this.enabled || !this.ctx || !this.beatGain) return;
    // Interval shrinks with stage: stage 1 = 500ms, stage 10 = 280ms, stage 20 = 180ms
    const interval = Math.max(160, 500 - (this.stage - 1) * 22);
    const freq = 70 + (this.stage - 1) * 5;
    // Volume increases with stage
    const vol = Math.min(0.18, 0.03 + (this.stage - 1) * 0.012);
    try {
      const o = this.ctx.createOscillator(), e = this.ctx.createGain();
      o.type = 'square'; o.frequency.value = freq;
      o.connect(e); e.connect(this.beatGain);
      e.gain.setValueAtTime(vol, this.ctx.currentTime);
      e.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.07);
      o.start(this.ctx.currentTime); o.stop(this.ctx.currentTime + 0.09);
      // Snare-like on beat 3 (half interval)
      if (this.stage >= 3) {
        const s2 = this.ctx.createOscillator(), s2g = this.ctx.createGain();
        s2.type = 'sawtooth'; s2.frequency.value = 200;
        s2.connect(s2g); s2g.connect(this.beatGain);
        const snareT = this.ctx.currentTime + interval/2000;
        s2g.gain.setValueAtTime(vol * 0.6, snareT);
        s2g.gain.exponentialRampToValueAtTime(0.0001, snareT + 0.06);
        s2.start(snareT); s2.stop(snareT + 0.08);
      }
      // Add high hat at stage 5+
      if (this.stage >= 5 && Math.random() < 0.5) {
        const ht = this.ctx.createOscillator(), htg = this.ctx.createGain();
        ht.type = 'square'; ht.frequency.value = 800 + Math.random()*400;
        ht.connect(htg); htg.connect(this.beatGain);
        const htT = this.ctx.currentTime + (interval/4000);
        htg.gain.setValueAtTime(vol * 0.3, htT);
        htg.gain.exponentialRampToValueAtTime(0.0001, htT + 0.03);
        ht.start(htT); ht.stop(htT + 0.04);
      }
    } catch {}
    this._beatTid = setTimeout(() => this._scheduleBeat(), interval);
  }

  stopBGM() {
    clearTimeout(this._beatTid); this._beatTid = null;
    try { this.bgOscs.forEach(o => o.stop()); } catch {}
    this.bgOscs = [];
    try { this.bgGain?.disconnect(); } catch {}; this.bgGain = null;
    try { this.beatGain?.disconnect(); } catch {}; this.beatGain = null;
  }
}

// ═══════════════════════════════════════════════════════════
//  PARTICLE & FLOAT TEXT
// ═══════════════════════════════════════════════════════════
class Particle {
  constructor(x,y,vx,vy,color,life,sq=false,sz=null) {
    this.x=x;this.y=y;this.vx=vx;this.vy=vy;this.color=color;
    this.life=life;this.maxLife=life;this.size=sz??(Math.random()*4+2);
    this.sq=sq;this.rot=Math.random()*Math.PI*2;this.rotV=(Math.random()-.5)*6;
  }
  update(dt){ this.x+=this.vx*dt;this.y+=this.vy*dt;this.vy+=140*dt;this.vx*=.985;this.life-=dt;this.rot+=this.rotV*dt; }
  draw(ctx){
    const a=Math.max(0,this.life/this.maxLife),sz=this.size*(0.3+0.7*a);
    ctx.save();ctx.globalAlpha=a;ctx.fillStyle=this.color;ctx.shadowBlur=10;ctx.shadowColor=this.color;
    if(this.sq){ctx.translate(this.x,this.y);ctx.rotate(this.rot);ctx.fillRect(-sz/2,-sz/2,sz,sz);}
    else{ctx.beginPath();ctx.arc(this.x,this.y,sz,0,Math.PI*2);ctx.fill();}
    ctx.restore();
  }
}
class FloatText {
  constructor(x,y,text,color){this.x=x;this.y=y;this.text=text;this.color=color;this.life=1.1;this.maxLife=1.1;this.vy=-75;}
  update(dt){this.y+=this.vy*dt;this.vy*=.96;this.life-=dt;}
  draw(ctx){
    const a=Math.max(0,this.life/this.maxLife);
    ctx.save();ctx.globalAlpha=a;ctx.font='bold 13px Orbitron,monospace';
    ctx.fillStyle=this.color;ctx.shadowBlur=7;ctx.shadowColor=this.color;ctx.textAlign='center';
    ctx.fillText(this.text,this.x,this.y);ctx.restore();
  }
}

// ═══════════════════════════════════════════════════════════
//  MANAGERS
// ═══════════════════════════════════════════════════════════
class Wallet {
  constructor(){ this._v=parseInt(localStorage.getItem('sr3_wallet')||'0'); }
  get coins(){ return this._v; }
  add(n){ this._v+=n; localStorage.setItem('sr3_wallet',this._v); }
  spend(n){ if(this._v<n)return false; this._v-=n; localStorage.setItem('sr3_wallet',this._v); return true; }
}

class SkinManager {
  constructor(){
    const d=loadJ('sr3_skins',{unlocked:['default'],equipped:'default'});
    this.unlocked=d.unlocked; this.equipped=d.equipped;
  }
  save(){ saveJ('sr3_skins',{unlocked:this.unlocked,equipped:this.equipped}); }
  getSkin(){ return SKINS.find(s=>s.id===this.equipped)||SKINS[0]; }
  unlock(id){ if(!this.unlocked.includes(id)){this.unlocked.push(id);this.save();return true;} return false; }
  equip(id){ this.equipped=id; this.save(); }
  has(id){ return this.unlocked.includes(id); }
}

class StatsManager {
  constructor(){
    const d=loadJ('sr3_stats',{});
    this.gamesPlayed  = d.gamesPlayed  || 0;
    this.totalCoins   = d.totalCoins   || 0;
    this.highScore    = d.highScore    || 0;
    this.bestStage    = d.bestStage    || 0;
    this.longestRun   = d.longestRun   || 0;
    this.highestCombo = d.highestCombo || 0;
    this.wheelSpins   = d.wheelSpins   || 0;
  }
  save(){
    saveJ('sr3_stats',{gamesPlayed:this.gamesPlayed,totalCoins:this.totalCoins,
      highScore:this.highScore,bestStage:this.bestStage,
      longestRun:this.longestRun,highestCombo:this.highestCombo,wheelSpins:this.wheelSpins});
  }
}

class MissionManager {
  constructor(){
    const d=loadJ('sr3_missions',{data:{},lastReset:0});
    // Reset daily missions each day
    const now=Date.now();
    if(now-d.lastReset>24*60*60*1000){ d.data={}; d.lastReset=now; }
    this.data=d.data; this.lastReset=d.lastReset;
    MISSIONS.forEach(m=>{ if(!this.data[m.id]) this.data[m.id]={progress:0,done:false}; });
    this.save();
  }
  save(){ saveJ('sr3_missions',{data:this.data,lastReset:this.lastReset}); }
  get(id){ return this.data[id]||{progress:0,done:false}; }
  update(session){
    MISSIONS.forEach(m=>{
      const s=this.data[m.id];
      if(s.done) return;
      let v=0;
      if(m.key==='score') v=session.score;
      else if(m.key==='coins') v=session.coins;
      else if(m.key==='stage') v=session.stage;
      else if(m.key==='combo') v=session.combo;
      else if(m.key==='time')  v=session.time;
      else if(m.key==='games') v=session.games;
      s.progress=Math.max(s.progress,v);
      if(s.progress>=m.goal) s.done=true;
    });
    this.save();
  }
}

class AchievementManager {
  constructor(){ this.done=loadJ('sr3_ach',[]); }
  save(){ saveJ('sr3_ach',this.done); }
  has(id){ return this.done.includes(id); }
  unlock(id){ if(this.done.includes(id))return false; this.done.push(id); this.save(); return true; }
}

class DailyReward {
  constructor(){
    const d=loadJ('sr3_daily',{lastClaim:0,streak:0});
    this.lastClaim=d.lastClaim; this.streak=d.streak;
  }
  canClaim(){ return Date.now()-this.lastClaim>24*60*60*1000; }
  cooldownText(){
    const rem=Math.max(0,(24*60*60*1000)-(Date.now()-this.lastClaim));
    const h=Math.floor(rem/3600000), m=Math.floor((rem%3600000)/60000);
    return `Next reward in ${h}h ${m}m`;
  }
  claim(){
    const now=Date.now();
    const withinWindow=now-this.lastClaim<48*60*60*1000;
    this.streak=withinWindow?Math.min(this.streak+1,7):1;
    this.lastClaim=now;
    saveJ('sr3_daily',{lastClaim:this.lastClaim,streak:this.streak});
    return DAILY_DAYS[(this.streak-1)%7];
  }
}

class LuckyWheel {
  constructor(){
    const d=loadJ('sr3_wheel',{lastSpin:0,xp2:false});
    this.lastSpin=d.lastSpin; this.xp2=d.xp2;
  }
  canSpin(){ return Date.now()-this.lastSpin>24*60*60*1000; }
  cooldownText(){
    const rem=Math.max(0,(24*60*60*1000)-(Date.now()-this.lastSpin));
    const h=Math.floor(rem/3600000), m=Math.floor((rem%3600000)/60000);
    return `Next spin in ${h}h ${m}m`;
  }
  spin(){
    this.lastSpin=Date.now();
    saveJ('sr3_wheel',{lastSpin:this.lastSpin,xp2:this.xp2});
    const total=WHEEL_PRIZES.reduce((s,p)=>s+p.prob,0);
    let r=Math.random()*total;
    for(const p of WHEEL_PRIZES){ r-=p.prob; if(r<=0)return p; }
    return WHEEL_PRIZES[0];
  }
  setXP2(v){ this.xp2=v; saveJ('sr3_wheel',{lastSpin:this.lastSpin,xp2:this.xp2}); }
}

// ═══════════════════════════════════════════════════════════
//  MAIN GAME
// ═══════════════════════════════════════════════════════════
class ShadowRush {
  constructor(){
    this.canvas = document.getElementById('gameCanvas');
    this.ctx    = this.canvas.getContext('2d');
    this.audio  = new AudioManager();
    this.wallet = new Wallet();
    this.skins  = new SkinManager();
    this.stats  = new StatsManager();
    this.missions= new MissionManager();
    this.achMgr = new AchievementManager();
    this.daily  = new DailyReward();
    this.wheel  = new LuckyWheel();

    this.state  = 'menu'; // menu|countdown|playing|stageclear|paused|gameover
    this._scoreF= 0;      // float accumulator — KEY BUG FIX
    this.score  = 0;
    this.coins  = 0;
    this.stage  = 1;
    this.stageTimer = 0;
    this.elapsed    = 0;
    this.combo      = 0;
    this.maxCombo   = 0;
    this.comboTimer = 0;
    this.player = null;
    this.obstacles=[];this.coinItems=[];this.particles=[];this.floatTexts=[];
    this.obstSpawnT=0; this.coinSpawnT=0;
    this.shakeX=0; this.shakeY=0; this.shakeStr=0;
    this.colorHue=0;
    this.currentRule = RULES[0];
    this.ruleTimer=0; this.ruleInterval=12; this.ruleChanges=0;
    this.activeEvent=null; this.eventTimer=0; this.eventCooldown=30;
    this.doubleCoins=false; this.shield=false; this.scoreBoost=false;
    this.coinRainT=0;
    this.doubleRun=false; // from wheel
    this.bgStars=[];
    this.lastTime=0;

    this._initCanvas();
    this._initStars();
    this._bindEvents();
    this._setupUI();
    this._updateMenuUI();
    requestAnimationFrame(ts=>{ this.lastTime=ts; this._loop(ts); });
  }

  // ── Canvas ──────────────────────────────────────────────
  _initCanvas(){
    const resize=()=>{ this.canvas.width=window.innerWidth; this.canvas.height=window.innerHeight; this.W=this.canvas.width; this.H=this.canvas.height; };
    window.addEventListener('resize',resize); resize();
  }
  _initStars(){
    this.bgStars=Array.from({length:100},()=>({
      x:Math.random()*3000,y:Math.random()*1500,r:Math.random()*1.4+.2,
      speed:Math.random()*.6+.1,alpha:Math.random()*.6+.1,tw:Math.random()*Math.PI*2
    }));
  }
  _createPlayer(){
    return {x:this.W*.2,y:this.H/2,vy:0,size:28,baseSize:28,trail:[]};
  }

  // ── Events ───────────────────────────────────────────────
  _bindEvents(){
    const c=this.canvas;
    c.addEventListener('touchstart',e=>{e.preventDefault();this._onDown(e.touches[0].clientX,e.touches[0].clientY);},{passive:false});
    c.addEventListener('touchend',  e=>{e.preventDefault();},{passive:false});
    c.addEventListener('touchmove', e=>e.preventDefault(),{passive:false});
    c.addEventListener('mousedown', e=>this._onDown(e.clientX,e.clientY));
    document.addEventListener('keydown',e=>{
      if(e.code==='Space'||e.code==='ArrowUp') this._onDown(this.W/2,this.H/2);
      if(e.code==='Escape') this._togglePause();
    });
  }
  _onDown(x,y){
    if(this.state==='countdown'||this.state==='stageclear') return;
    if(this.state==='menu')     { this._beginCountdown(); return; }
    if(this.state==='paused'||this.state==='gameover') return;
    if(this.state==='playing')  this._playerJump();
  }

  // ── Player jump ──────────────────────────────────────────
  _playerJump(){
    if(!this.player) return;
    const grav = this.currentRule.id==='gravity_flip' ? -1 : 1;
    this.player.vy = -660 * grav;
    this.audio.playJump();
    const sk=this.skins.getSkin();
    for(let i=0;i<5;i++) this.particles.push(new Particle(this.player.x,this.player.y,(Math.random()-.5)*180,(Math.random()-.5)*180,sk.glow,.4,true));
  }

  // ── Countdown ────────────────────────────────────────────
  _beginCountdown(){
    this.state='countdown';
    this._hideOverlays();
    const ov=document.getElementById('countdown-overlay');
    const numEl=document.getElementById('countdown-number');
    const goEl =document.getElementById('countdown-go');
    ov.classList.remove('hidden'); numEl.classList.remove('hidden'); goEl.classList.add('hidden');
    let c=3; numEl.textContent=c; this.audio.playCountdown();
    const tick=setInterval(()=>{
      c--;
      if(c>0){
        numEl.textContent=c;
        numEl.style.animation='none'; void numEl.offsetWidth;
        numEl.style.animation='cPop .5s cubic-bezier(.175,.885,.32,1.275)';
        this.audio.playCountdown();
      } else {
        clearInterval(tick);
        numEl.classList.add('hidden'); goEl.classList.remove('hidden');
        this.audio.playGo();
        setTimeout(()=>{ ov.classList.add('hidden'); this._startGame(); },600);
      }
    },900);
  }

  // ── Start game ───────────────────────────────────────────
  _startGame(){
    this.state='playing';
    this._scoreF=0; this.score=0; this.coins=0;
    this.stage=1; this.stageTimer=0; this.elapsed=0;
    this.combo=0; this.maxCombo=0; this.comboTimer=0;
    this.ruleTimer=0; this.ruleChanges=0; this.currentRule=RULES[0];
    this.obstacles=[]; this.coinItems=[]; this.particles=[]; this.floatTexts=[];
    this.obstSpawnT=0; this.coinSpawnT=0;
    this.shakeStr=0; this.activeEvent=null; this.eventTimer=0; this.eventCooldown=30;
    this.doubleCoins=false; this.shield=false; this.scoreBoost=false; this.coinRainT=0;
    this.doubleRun=this.wheel.xp2; if(this.doubleRun) this.wheel.setXP2(false);
    this.player=this._createPlayer();

    document.getElementById('hud').classList.remove('hidden');
    this.audio.startBGM();
    this.audio.setStage(1);
    this._updateHUD();
    this._updateRuleBanner();
  }

  // ── Pause ────────────────────────────────────────────────
  _togglePause(){
    if(this.state==='playing'){
      this.state='paused';
      document.getElementById('pause-info').textContent=`STAGE ${this.stage}  SCORE: ${this.score}  ◈ ${this.coins}`;
      document.getElementById('pause-menu').classList.remove('hidden');
      this.audio.stopBGM();
    } else if(this.state==='paused'){
      this.state='playing';
      document.getElementById('pause-menu').classList.add('hidden');
      this.lastTime=performance.now();
      this.audio.startBGM();
    }
  }

  // ── Stage Clear ──────────────────────────────────────────
  _stageClear(){
    this.state='stageclear';
    const bonus=stageCoinBonus(this.stage);
    this.coins+=bonus;
    this.audio.playStageClear();
    vibrate([80,40,120]);

    const ov=document.getElementById('stage-clear-overlay');
    document.getElementById('stage-clear-number').textContent=this.stage;
    document.getElementById('stage-clear-bonus').textContent=`+${bonus} ◈ BONUS`;
    ov.classList.remove('hidden');

    // Add gold particles
    for(let i=0;i<20;i++){
      const a=Math.random()*Math.PI*2,sp=150+Math.random()*200;
      this.particles.push(new Particle(this.W/2,this.H/2,Math.cos(a)*sp,Math.sin(a)*sp,'#ffd60a',1.2));
    }

    setTimeout(()=>{
      ov.classList.add('hidden');
      this._advanceStage();
    },2200);
  }

  _advanceStage(){
    this.stage++;
    this.stageTimer=0;
    this.obstacles=[];
    this.currentRule=RULES[0]; this.ruleTimer=0;
    this.activeEvent=null; this.eventTimer=0; this.eventCooldown=25;
    this.doubleCoins=false; this.shield=false; this.scoreBoost=false;
    this.audio.setStage(this.stage);
    this._hideEventBanners();
    this.state='playing';
    this._updateHUD();

    // Flash stage label
    const lbl=document.getElementById('stage-label');
    lbl.style.color='#ffd60a'; lbl.style.textShadow='0 0 14px #ffd60a';
    setTimeout(()=>{ lbl.style.color=''; lbl.style.textShadow=''; },1000);
  }

  // ── Die ──────────────────────────────────────────────────
  _die(){
    if(this.state!=='playing') return;
    if(this.shield){
      this.shield=false; this.shakeStr=12;
      this._hideEventBanners();
      document.getElementById('event-banner').classList.add('hidden');
      this.audio.playDie(); vibrate([100]); return;
    }
    this.state='gameover';
    this.audio.stopBGM(); this.audio.playDie();
    vibrate([150,80,200]);

    const sk=this.skins.getSkin();
    if(this.player){
      for(let i=0;i<30;i++){
        const a=(i/30)*Math.PI*2,sp=180+Math.random()*260;
        this.particles.push(new Particle(this.player.x,this.player.y,Math.cos(a)*sp,Math.sin(a)*sp,sk.glow,1.1,true,Math.random()*6+3));
      }
    }

    // Persist stats
    this.wallet.add(this.coins);
    this.stats.gamesPlayed++;
    this.stats.totalCoins+=this.coins;
    if(this.score>this.stats.highScore) this.stats.highScore=this.score;
    if(this.stage>this.stats.bestStage) this.stats.bestStage=this.stage;
    if(this.elapsed>this.stats.longestRun) this.stats.longestRun=this.elapsed;
    if(this.maxCombo>this.stats.highestCombo) this.stats.highestCombo=this.maxCombo;
    this.stats.save();

    this.missions.update({score:this.score,coins:this.coins,stage:this.stage,combo:this.maxCombo,time:Math.floor(this.elapsed),games:this.stats.gamesPlayed});
    this._checkAchievements();
    this._checkSecretSkins();

    // Show game over screen
    document.getElementById('hud').classList.add('hidden');
    document.getElementById('rule-notification').classList.add('hidden');
    this._hideEventBanners();
    const isNew=this.score>0 && this.score===this.stats.highScore;
    document.getElementById('final-score').textContent=this.score;
    document.getElementById('final-best').textContent =this.stats.highScore;
    document.getElementById('final-stage').textContent=this.stage;
    document.getElementById('final-coins').textContent=this.coins;
    document.getElementById('new-best-badge').classList.toggle('hidden',!isNew);
    if(isNew){ vibrate([50,50,50,50,200]); for(let i=0;i<16;i++){const a=Math.random()*Math.PI*2;this.particles.push(new Particle(this.W/2,this.H/2,Math.cos(a)*250,Math.sin(a)*250,'#ffd60a',1.5));} }
    document.getElementById('game-over').classList.remove('hidden');
    this._updateMenuUI();
  }

  // ── Achievements ─────────────────────────────────────────
  _checkAchievements(){
    const c=(id,cond)=>{
      if(!cond||this.achMgr.has(id)) return;
      if(this.achMgr.unlock(id)){
        const a=ACHIEVEMENTS.find(x=>x.id===id);
        if(a) setTimeout(()=>{this._toast(a.icon,a.title,a.desc);this.audio.playAchieve();},600);
      }
    };
    c('first_run',  this.stats.gamesPlayed>=1);
    c('score500',   this.score>=500);
    c('score2000',  this.score>=2000);
    c('coins100',   this.stats.totalCoins>=100);
    c('combo10',    this.maxCombo>=10);
    c('combo15',    this.maxCombo>=15);
    c('stage5',     this.stage>=5);
    c('stage10',    this.stage>=10);
    c('stage20',    this.stage>=20);
    c('skin_own',   this.skins.unlocked.length>1);
    c('survive120', this.elapsed>=120);
  }
  _checkSecretSkins(){
    if(this.stage>=5  && this.skins.unlock('void'))       this._toast('👁','VOID UNLOCKED!','Secret skin!');
    if(this.stage>=10 && this.skins.unlock('darkmatter'))  this._toast('🌑','DARK MATTER UNLOCKED!','Secret skin!');
    if(this.stage>=20 && this.skins.unlock('shadow'))     this._toast('🌚','SHADOW LORD UNLOCKED!','Secret skin!');
    if(this.stage>=50 && this.skins.unlock('ultimate'))   this._toast('✨','ULTIMATE UNLOCKED!','Secret skin!');
  }

  // ── Rules ─────────────────────────────────────────────────
  _triggerRule(){
    const pool=RULES.filter(r=>r.id!=='normal'&&r.id!==this.currentRule.id);
    this.currentRule=pool[Math.floor(Math.random()*pool.length)];
    this.ruleTimer=0; this.ruleChanges++;
    this._applyRule();
    this._showRuleNotif();
    this.audio.playRuleChange();
    this.shakeStr=Math.max(this.shakeStr,4);
    vibrate([60]);
  }
  _applyRule(){
    if(!this.player) return;
    if(this.currentRule.id==='tiny') this.player.size=this.player.baseSize*.52;
    else if(this.currentRule.id==='big') this.player.size=this.player.baseSize*1.65;
    else this.player.size=this.player.baseSize;
  }
  _showRuleNotif(){
    const el=document.getElementById('rule-notification'), tx=document.getElementById('rule-notification-text');
    tx.textContent=this.currentRule.name+(this.currentRule.desc?'\n'+this.currentRule.desc:'');
    el.classList.remove('hidden');
    el.style.animation='none'; void el.offsetWidth;
    el.style.animation='ruleShow 2.5s ease forwards';
    clearTimeout(this._ruleT);
    this._ruleT=setTimeout(()=>el.classList.add('hidden'),2600);
    // Update rule banner in HUD
    this._updateRuleBanner();
  }
  _updateRuleBanner(){
    const b=document.getElementById('rule-banner');
    if(this.currentRule.id==='normal'){ b.classList.add('hidden'); return; }
    b.textContent=this.currentRule.name;
    b.classList.remove('hidden');
  }

  // ── Special Events ────────────────────────────────────────
  _triggerEvent(){
    const pool=EVENTS.filter(e=>e.id!==this.activeEvent?.id);
    const ev=pool[Math.floor(Math.random()*pool.length)];
    this.activeEvent=ev; this.eventTimer=ev.duration;
    this.eventCooldown=28+Math.random()*25;
    if(ev.id==='double_coins')  this.doubleCoins=true;
    if(ev.id==='shield')        this.shield=true;
    if(ev.id==='score_boost')   this.scoreBoost=true;
    this.audio.playEvent(); vibrate([40,20,40]);
    const et=document.getElementById('event-banner');
    et.textContent=ev.name; et.classList.remove('hidden');
    const xt=document.getElementById('special-event-toast');
    xt.querySelector('#special-event-text').textContent=ev.name;
    xt.classList.remove('hidden');
    xt.style.animation='none'; void xt.offsetWidth;
    xt.style.animation='toastSlide 3s ease forwards';
    clearTimeout(this._evToastT);
    this._evToastT=setTimeout(()=>xt.classList.add('hidden'),3100);
  }
  _endEvent(){
    if(!this.activeEvent) return;
    if(this.activeEvent.id==='double_coins') this.doubleCoins=false;
    if(this.activeEvent.id==='score_boost')  this.scoreBoost=false;
    this.activeEvent=null;
    document.getElementById('event-banner').classList.add('hidden');
  }
  _hideEventBanners(){
    document.getElementById('event-banner').classList.add('hidden');
    document.getElementById('rule-banner').classList.add('hidden');
    document.getElementById('special-event-toast').classList.add('hidden');
  }

  // ── Main Loop ─────────────────────────────────────────────
  _loop(ts){
    requestAnimationFrame(t=>this._loop(t));
    const rawDt=Math.min((ts-this.lastTime)/1000,.05);
    this.lastTime=ts;
    let dt=rawDt;
    if(this.currentRule.id==='slow_motion') dt*=.38;
    if(this.currentRule.id==='speed_boost') dt*=1.5;
    this.colorHue=(this.colorHue+26*rawDt)%360;
    if(this.state==='playing') this._update(dt,rawDt);
    this._render(rawDt);
  }

  // ── Update ────────────────────────────────────────────────
  _update(dt,rawDt){
    this.elapsed+=rawDt;
    this.stageTimer+=rawDt;

    // ── SCORE FIX: accumulate as float, display as floor ──
    const stageScore = this.stage * 12;
    const comboMult  = 1 + this.combo * 0.08;
    const boostMult  = this.scoreBoost ? 2.5 : 1;
    const runBoost   = this.doubleRun  ? 2   : 1;
    this._scoreF += stageScore * dt * comboMult * boostMult * runBoost;
    this.score = Math.floor(this._scoreF);

    // Stage completion
    if(this.stageTimer>=STAGE_DURATION){
      this._stageClear(); return;
    }

    // Rule timer (interval shrinks per stage)
    const ruleInt=Math.max(7, this.ruleInterval - (this.stage-1)*0.5);
    this.ruleTimer+=rawDt;
    if(this.ruleTimer>=ruleInt) this._triggerRule();

    // Special events
    this.eventCooldown-=rawDt;
    if(this.activeEvent){
      this.eventTimer-=rawDt;
      if(this.eventTimer<=0) this._endEvent();
    } else if(this.eventCooldown<=0 && this.stage>=2){
      this._triggerEvent();
    }

    // Coin rain extra spawns
    if(this.activeEvent?.id==='coin_rain'){
      this.coinRainT-=rawDt;
      if(this.coinRainT<=0){
        this.coinRainT=.35;
        for(let i=0;i<3;i++) this.coinItems.push({x:this.W+20+Math.random()*150,y:this.H*.1+Math.random()*this.H*.75,r:10,spd:220,coll:false,gl:Math.random()*Math.PI*2});
      }
    }

    // Combo decay
    this.comboTimer+=rawDt;
    if(this.comboTimer>3.5){this.combo=0;this.comboTimer=0;}

    // Screen shake
    if(this.shakeStr>0){
      this.shakeX=(Math.random()-.5)*this.shakeStr*2;
      this.shakeY=(Math.random()-.5)*this.shakeStr*2;
      this.shakeStr=Math.max(0,this.shakeStr-60*rawDt);
    } else {this.shakeX=0;this.shakeY=0;}

    this._updatePlayer(dt);
    this._spawnObstacles(rawDt);
    this._updateObstacles(dt);
    this._spawnCoins(rawDt);
    this._updateCoins(dt);
    this._updateParticles(rawDt);
    this._checkCollisions();
    this._updateHUD();
    this._checkAchievements();
  }

  // ── Player ────────────────────────────────────────────────
  _updatePlayer(dt){
    const p=this.player;
    const grav=this.currentRule.id==='gravity_flip'?-1:1;
    p.vy+=1600*grav*dt; p.y+=p.vy*dt;
    const floor=this.H-p.size, ceil=p.size;
    if(grav>0){if(p.y>=floor){p.y=floor;p.vy=0;} if(p.y<=ceil){p.y=ceil;p.vy=0;}}
    else       {if(p.y<=ceil){p.y=ceil;p.vy=0;}  if(p.y>=floor){p.y=floor;p.vy=0;}}
    p.trail=p.trail||[]; p.trail.push({x:p.x,y:p.y});
    if(p.trail.length>18) p.trail.shift();
  }

  // ── Obstacles ─────────────────────────────────────────────
  _spawnObstacles(rawDt){
    const interval=stageSpawnInterval(this.stage)*
      (this.currentRule.id==='obstacle_fast'?.6:1);
    this.obstSpawnT+=rawDt;
    if(this.obstSpawnT<interval) return;
    this.obstSpawnT=0;
    const W=this.W,H=this.H,theme=stageObsTheme(this.stage);
    const w=18+Math.random()*14;
    const gap=H*.28+Math.random()*H*.08;
    const topH=30+Math.random()*(H-gap-60);
    const spd=stageSpeed(this.stage)
      *(this.currentRule.id==='speed_boost'?1.4:1)
      *(this.currentRule.id==='slow_motion'?.42:1);
    this.obstacles.push({x:W+w,y:0,      w,h:topH,       spd,theme,fl:0});
    this.obstacles.push({x:W+w,y:topH+gap,w,h:H-topH-gap,spd,theme,fl:0});
  }
  _updateObstacles(dt){
    for(const o of this.obstacles){ o.x-=o.spd*dt; if(this.currentRule.id==='ghost') o.fl=(o.fl+dt*6)%(Math.PI*2); }
    this.obstacles=this.obstacles.filter(o=>o.x+o.w>-60);
  }

  // ── Coins ─────────────────────────────────────────────────
  _spawnCoins(rawDt){
    if(this.activeEvent?.id==='coin_rain') return;
    this.coinSpawnT+=rawDt;
    const interval=Math.max(.9,2.5-(this.stage-1)*.08);
    if(this.coinSpawnT<interval) return;
    this.coinSpawnT=0;
    const count=1+(Math.random()<.35?1:0);
    for(let i=0;i<count;i++) this.coinItems.push({x:this.W+30+i*45,y:this.H*.15+Math.random()*this.H*.65,r:10,spd:160+(this.stage-1)*18,coll:false,gl:Math.random()*Math.PI*2});
  }
  _updateCoins(dt){
    for(const c of this.coinItems){
      c.x-=c.spd*dt; c.gl+=dt*4.5;
      if(this.currentRule.id==='magnetic'&&this.player){
        const dx=this.player.x-c.x,dy=this.player.y-c.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<200){c.x+=dx/d*300*dt;c.y+=dy/d*300*dt;}
      }
    }
    this.coinItems=this.coinItems.filter(c=>!c.coll&&c.x+c.r>-30);
  }

  // ── Particles ─────────────────────────────────────────────
  _updateParticles(dt){
    for(const p of this.particles) p.update(dt);
    for(const f of this.floatTexts) f.update(dt);
    this.particles=this.particles.filter(p=>p.life>0);
    this.floatTexts=this.floatTexts.filter(f=>f.life>0);
  }

  // ── Collision ─────────────────────────────────────────────
  _checkCollisions(){
    if(!this.player) return;
    const p=this.player,hs=p.size*.68;
    // Coins
    for(const c of this.coinItems){
      if(c.coll) continue;
      const dx=p.x-c.x,dy=p.y-c.y;
      if(Math.sqrt(dx*dx+dy*dy)<hs+c.r){
        c.coll=true;
        const val=this.doubleCoins?2:1;
        this.coins+=val; this.combo++; this.maxCombo=Math.max(this.maxCombo,this.combo); this.comboTimer=0;
        this.audio.playCoin();
        if(this.combo>=5){this.audio.playCombo(this.combo);vibrate([25]);}
        if(this.combo>=10) this.shakeStr=Math.max(this.shakeStr,3);
        const sk=this.skins.getSkin();
        for(let i=0;i<8;i++) this.particles.push(new Particle(c.x,c.y,(Math.random()-.5)*190,(Math.random()-.5)*190,'#ffd60a',.5));
        const txt=this.combo>=5?`x${this.combo} ◈+${val}`:`◈+${val}`;
        this.floatTexts.push(new FloatText(c.x,c.y-10,txt,'#ffd60a'));
      }
    }
    // Obstacles
    for(const o of this.obstacles){
      const ghost=this.currentRule.id==='ghost'&&Math.sin(o.fl)<0;
      if(ghost) continue;
      if(p.x+hs>o.x&&p.x-hs<o.x+o.w&&p.y+hs>o.y&&p.y-hs<o.y+o.h){this._die();return;}
    }
    if(p.y>this.H+100||p.y<-100){this._die();return;}
  }

  // ── HUD ───────────────────────────────────────────────────
  _updateHUD(){
    document.getElementById('score').textContent=this.score;
    document.getElementById('hud-coins').textContent=this.coins;
    const cdisp=document.getElementById('combo-display');
    if(this.combo>=2){ document.getElementById('combo-text').textContent='x'+this.combo; cdisp.style.display='flex'; }
    else cdisp.style.display='none';
    document.getElementById('stage-label').textContent='STAGE '+this.stage;
    const pct=(this.stageTimer/STAGE_DURATION)*100;
    document.getElementById('stage-timer-fill').style.width=Math.min(100,pct)+'%';
    const rem=Math.max(0,Math.ceil(STAGE_DURATION-this.stageTimer));
    document.getElementById('stage-timer-text').textContent=rem+'s';
  }

  _updateMenuUI(){
    const bs=this.stats.bestStage||0;
    document.getElementById('menu-best-stage').textContent=bs?`STAGE ${bs}`:'—';
    document.getElementById('menu-highscore').textContent=this.stats.highScore||0;
    const db=document.getElementById('daily-reward-btn');
    db.classList.toggle('hidden',!this.daily.canClaim());
    const wb=document.getElementById('wheel-btn');
    wb.classList.toggle('highlight',this.wheel.canSpin());
  }

  // ── RENDER ────────────────────────────────────────────────
  _render(rawDt){
    const ctx=this.ctx,W=this.W,H=this.H;
    const isDark=this.currentRule.id==='dark';

    ctx.save();
    ctx.translate(this.shakeX,this.shakeY);

    // BG
    ctx.fillStyle=isDark?'#000008':'#050510';
    ctx.fillRect(0,0,W,H);

    // Grid
    if(!isDark){
      ctx.strokeStyle='rgba(0,245,255,.035)';ctx.lineWidth=1;
      const gs=60,off=(this.elapsed*30)%gs;
      for(let x=-off;x<W+gs;x+=gs){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<H;y+=gs){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    }

    // Stars
    for(const s of this.bgStars){
      s.tw+=rawDt*2;
      if(this.state==='playing') s.x-=s.speed*(1+(this.stage-1)*.15);
      if(s.x<0){s.x=W+10;s.y=Math.random()*H;}
      const a=s.alpha*(.6+.4*Math.sin(s.tw));
      ctx.beginPath();ctx.arc(s.x%W,s.y%H,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${a})`;ctx.fill();
    }

    // Obstacles
    for(const o of this.obstacles){
      const ghostA=this.currentRule.id==='ghost'?(.3+.7*((Math.sin(o.fl)+1)/2)):1;
      ctx.save();ctx.globalAlpha=ghostA;
      let topC,botC,glowC;
      const t=o.theme;
      if(t.colors){
        topC=t.colors[0];botC=t.colors[1];glowC=t.glow;
      } else {
        topC=`hsl(${this.colorHue%360},100%,60%)`;botC=`hsl(${(this.colorHue+60)%360},100%,40%)`;glowC=topC;
      }
      const grd=ctx.createLinearGradient(o.x,o.y,o.x+o.w,o.y+o.h);
      grd.addColorStop(0,topC);grd.addColorStop(1,botC);
      ctx.fillStyle=grd;ctx.shadowBlur=14;ctx.shadowColor=glowC;
      ctx.beginPath();if(ctx.roundRect)ctx.roundRect(o.x,o.y,o.w,o.h,4);else ctx.rect(o.x,o.y,o.w,o.h);
      ctx.fill();
      if(this.shield){ctx.globalAlpha*=.4;ctx.fillStyle='rgba(0,245,255,.2)';ctx.beginPath();ctx.rect(o.x,o.y,o.w,o.h);ctx.fill();}
      ctx.restore();
    }
    ctx.shadowBlur=0;

    // Coins
    for(const c of this.coinItems){
      if(c.coll) continue;
      const pulse=Math.sin(c.gl)*.3+.7;
      ctx.save();ctx.shadowBlur=16*pulse;ctx.shadowColor='#ffd60a';
      ctx.fillStyle=`rgba(255,214,10,${.85*pulse+.15})`;
      ctx.beginPath();ctx.arc(c.x,c.y,c.r,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(255,255,200,${.5*pulse})`;
      ctx.beginPath();ctx.arc(c.x-c.r*.25,c.y-c.r*.25,c.r*.38,0,Math.PI*2);ctx.fill();
      if(this.doubleCoins){ctx.fillStyle='#fff';ctx.font='bold 8px Orbitron,monospace';ctx.textAlign='center';ctx.textBaseline='bottom';ctx.fillText('x2',c.x,c.y-c.r-2);}
      ctx.restore();
    }

    // Player + trail
    if(this.player&&this.state!=='gameover') this._renderPlayer(ctx);

    // Floats + particles
    for(const f of this.floatTexts) f.draw(ctx);
    for(const p of this.particles)  p.draw(ctx);

    // Darkness vignette
    if(isDark&&this.player){
      const g=ctx.createRadialGradient(this.player.x,this.player.y,55,this.player.x,this.player.y,340);
      g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,8,.98)');
      ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    }
    ctx.restore();
  }

  _renderPlayer(ctx){
    const p=this.player,sk=this.skins.getSkin();
    // Trail
    for(let i=0;i<p.trail.length-1;i++){
      const t=p.trail[i],frac=i/p.trail.length,sz=p.size*.55*frac;
      let trailC=sk.glow;
      if(sk.id==='rainbow'||sk.id==='ultimate') trailC=`hsl(${(this.colorHue+i*12)%360},100%,65%)`;
      ctx.save();ctx.globalAlpha=frac*.42;ctx.shadowBlur=10;ctx.shadowColor=trailC;ctx.fillStyle=trailC;
      ctx.beginPath();if(ctx.roundRect)ctx.roundRect(t.x-sz/2,t.y-sz/2,sz,sz,3);else ctx.fillRect(t.x-sz/2,t.y-sz/2,sz,sz);
      ctx.fill();ctx.restore();
    }
    // Cube
    const s=p.size;
    let topC=sk.gradient[0],botC=sk.gradient[1]||sk.gradient[0],glowC=sk.glow;
    if(sk.id==='rainbow'||sk.id==='ultimate'||sk.id==='prism'){
      topC=`hsl(${this.colorHue%360},100%,65%)`;
      botC=`hsl(${(this.colorHue+80)%360},100%,55%)`;
      glowC=topC;
    } else if(sk.id==='cosmic'){
      topC=`hsl(${(this.colorHue*.7)%360},80%,65%)`;
      botC=`hsl(${((this.colorHue*.7)+120)%360},80%,50%)`;
    }
    ctx.save();
    ctx.shadowBlur=26+Math.sin(this.elapsed*4)*5;ctx.shadowColor=glowC;
    const grd=ctx.createLinearGradient(p.x-s/2,p.y-s/2,p.x+s/2,p.y+s/2);
    grd.addColorStop(0,topC);grd.addColorStop(1,botC);
    ctx.fillStyle=grd;
    ctx.beginPath();if(ctx.roundRect)ctx.roundRect(p.x-s/2,p.y-s/2,s,s,6);else ctx.fillRect(p.x-s/2,p.y-s/2,s,s);
    ctx.fill();
    // Shield ring
    if(this.shield){
      ctx.strokeStyle='rgba(0,245,255,.7)';ctx.lineWidth=2.5;ctx.shadowBlur=14;ctx.shadowColor='#00f5ff';
      ctx.beginPath();ctx.arc(p.x,p.y,s*.85+Math.sin(this.elapsed*6)*3,0,Math.PI*2);ctx.stroke();
    }
    // Highlight
    ctx.globalAlpha=.36;ctx.fillStyle='rgba(255,255,255,.25)';
    ctx.beginPath();if(ctx.roundRect)ctx.roundRect(p.x-s/2+4,p.y-s/2+4,s*.36,s*.2,3);else ctx.fillRect(p.x-s/2+4,p.y-s/2+4,s*.36,s*.2);
    ctx.fill();
    ctx.restore();
  }

  // ── Toast ─────────────────────────────────────────────────
  _toast(icon,title,desc){
    clearTimeout(this._toastT);
    const el=document.getElementById('achievement-toast');
    el.querySelector('.achievement-icon').textContent=icon;
    el.querySelector('.achievement-name').textContent=title;
    el.querySelector('.achievement-desc').textContent=desc;
    el.classList.remove('hidden');
    el.style.animation='none';void el.offsetWidth;
    el.style.animation='toastIn .4s cubic-bezier(.175,.885,.32,1.275)';
    this._toastT=setTimeout(()=>el.classList.add('hidden'),3500);
  }

  // ═══════════════════════════════════════════════════════
  //  UI SETUP
  // ═══════════════════════════════════════════════════════
  _setupUI(){
    // ── Start ────────────────────────────────────────────
    document.getElementById('play-btn').onclick = ()=>{ if(this.state==='menu') this._beginCountdown(); };
    document.getElementById('shop-btn').onclick     = ()=>this._openShop();
    document.getElementById('missions-btn').onclick = ()=>this._openMissions();
    document.getElementById('wheel-btn').onclick    = ()=>this._openWheel();
    document.getElementById('stats-btn').onclick    = ()=>this._openStats();
    document.getElementById('daily-reward-btn').onclick = ()=>this._openDaily();

    // ── Pause ────────────────────────────────────────────
    document.getElementById('pause-btn').onclick  = ()=>this._togglePause();
    document.getElementById('resume-btn').onclick = ()=>this._togglePause();
    document.getElementById('restart-btn').onclick= ()=>{ this._closeAll(); this._beginCountdown(); };
    document.getElementById('pause-shop-btn').onclick = ()=>{ document.getElementById('pause-menu').classList.add('hidden'); this._openShop('pause'); };
    document.getElementById('home-btn').onclick   = ()=>{ this.state='menu'; this.audio.stopBGM(); this._closeAll(); document.getElementById('start-screen').classList.remove('hidden'); this._updateMenuUI(); };

    // ── Game Over ────────────────────────────────────────
    document.getElementById('gameover-restart-btn').onclick = ()=>{ this._closeAll(); this._beginCountdown(); };
    document.getElementById('gameover-shop-btn').onclick    = ()=>{ document.getElementById('game-over').classList.add('hidden'); this._openShop('gameover'); };
    document.getElementById('gameover-home-btn').onclick    = ()=>{ this._closeAll(); document.getElementById('start-screen').classList.remove('hidden'); this.state='menu'; this._updateMenuUI(); };

    // ── Shop tabs ────────────────────────────────────────
    document.querySelectorAll('.shop-tab').forEach(btn=>{
      btn.onclick=()=>{ document.querySelectorAll('.shop-tab').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); this._renderShop(btn.dataset.tab); };
    });
    document.getElementById('close-shop-btn').onclick = ()=>this._closeModal('shop-modal');

    // ── Missions tabs ────────────────────────────────────
    document.querySelectorAll('.missions-tab').forEach(btn=>{
      btn.onclick=()=>{
        document.querySelectorAll('.missions-tab').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.missions-panel').forEach(p=>p.classList.remove('active-panel'));
        document.getElementById(btn.dataset.tab+'-panel').classList.add('active-panel');
      };
    });
    document.getElementById('close-missions-btn').onclick = ()=>this._closeModal('missions-modal');

    // ── Daily ────────────────────────────────────────────
    document.getElementById('claim-reward-btn').onclick = ()=>{
      if(!this.daily.canClaim()) return;
      const r=this.daily.claim();
      this.wallet.add(r.coins);
      this.audio.playAchieve();
      this._toast('🎁','DAILY REWARD!',`+${r.coins} ◈ coins`);
      vibrate([50,30,100]);
      // Return to menu immediately
      this._closeAll();
      document.getElementById('start-screen').classList.remove('hidden');
      this.state='menu';
      this._updateMenuUI();
    };
    document.getElementById('close-daily-btn').onclick = ()=>this._closeModal('daily-modal');

    // ── Wheel ────────────────────────────────────────────
    document.getElementById('spin-btn').onclick      = ()=>this._doSpin();
    document.getElementById('close-wheel-btn').onclick = ()=>this._closeModal('wheel-modal');

    // ── Stats ────────────────────────────────────────────
    document.getElementById('close-stats-btn').onclick = ()=>this._closeModal('stats-modal');
  }

  _closeAll(){
    ['start-screen','pause-menu','game-over','shop-modal','missions-modal',
     'daily-modal','wheel-modal','stats-modal','stage-clear-overlay',
     'countdown-overlay'].forEach(id=>document.getElementById(id).classList.add('hidden'));
    document.getElementById('hud').classList.add('hidden');
  }

  _closeModal(id){
    document.getElementById(id).classList.add('hidden');
    // Return to correct screen based on state
    if(this.state==='paused')   document.getElementById('pause-menu').classList.remove('hidden');
    else if(this.state==='gameover') document.getElementById('game-over').classList.remove('hidden');
    else { document.getElementById('start-screen').classList.remove('hidden'); this.state='menu'; this._updateMenuUI(); }
  }

  _hideOverlays(){
    ['start-screen','pause-menu','game-over','shop-modal','missions-modal',
     'daily-modal','wheel-modal','stats-modal'].forEach(id=>document.getElementById(id).classList.add('hidden'));
  }

  // ── SHOP ─────────────────────────────────────────────────
  _openShop(from=null){ this._from=from; this._hideOverlays(); this._renderShop('all'); document.getElementById('shop-modal').classList.remove('hidden'); }

  _renderShop(tab='all'){
    document.getElementById('shop-coins').textContent=this.wallet.coins;
    const grid=document.getElementById('skin-grid'); grid.innerHTML='';
    let list=SKINS;
    if(tab==='owned')  list=SKINS.filter(s=>this.skins.has(s.id));
    if(tab==='locked') list=SKINS.filter(s=>!this.skins.has(s.id));

    list.forEach(sk=>{
      const owned=this.skins.has(sk.id), equipped=this.skins.equipped===sk.id;
      const card=document.createElement('div');
      card.className='skin-card'+(equipped?' equipped':'')+(owned?'':' locked')+(sk.secret?' secret':'');

      const cv=document.createElement('canvas');
      cv.className='skin-preview';cv.width=88;cv.height=88;
      const pc=cv.getContext('2d');
      pc.fillStyle='#0a0a20';pc.fillRect(0,0,88,88);
      pc.shadowBlur=18;pc.shadowColor=sk.glow;
      if(sk.gradient.length>2){
        const g=pc.createLinearGradient(14,14,74,74);
        sk.gradient.forEach((c,i)=>g.addColorStop(i/(sk.gradient.length-1),c));
        pc.fillStyle=g;
      } else {
        const g=pc.createLinearGradient(14,14,74,74);
        g.addColorStop(0,sk.gradient[0]);g.addColorStop(1,sk.gradient[1]||sk.gradient[0]);
        pc.fillStyle=g;
      }
      pc.beginPath();if(pc.roundRect)pc.roundRect(14,14,60,60,10);else pc.fillRect(14,14,60,60);
      pc.fill();
      card.appendChild(cv);

      const nm=document.createElement('div');nm.className='skin-name';
      nm.textContent=(sk.secret&&!owned)?'???':sk.name;card.appendChild(nm);

      if(equipped){const b=document.createElement('span');b.className='skin-eq-badge';b.textContent='✓';card.appendChild(b);}
      if(sk.secret){const b=document.createElement('span');b.className='skin-sec-badge';b.textContent=owned?'🔓':'🔒';card.appendChild(b);}

      const sub=document.createElement('div');sub.className='skin-sub';
      if(owned&&!equipped){sub.textContent='TAP TO EQUIP';sub.style.color='rgba(255,255,255,.35)';}
      else if(!owned&&!sk.secret){sub.textContent='◈ '+sk.price;sub.style.color=this.wallet.coins>=sk.price?'#ffd60a':'#ff2d78';}
      else if(!owned&&sk.secret){sub.textContent=sk.hint;sub.style.color='rgba(255,255,255,.35)';sub.style.fontSize='7px';}
      else if(equipped){sub.textContent='EQUIPPED';sub.style.color='#00f5ff';}
      card.appendChild(sub);

      // Click handler
      if(!owned&&!sk.secret){
        card.onclick=()=>{
          if(this.wallet.spend(sk.price)){
            this.skins.unlock(sk.id);
            this._checkAchievements();
            this._renderShop(tab);
            this.audio.playAchieve();
            vibrate([50,30,100]);
          } else {
            card.style.borderColor='rgba(255,45,120,.7)';
            setTimeout(()=>card.style.borderColor='',500);
          }
        };
      } else if(owned&&!equipped){
        card.onclick=()=>{ this.skins.equip(sk.id); this._renderShop(tab); vibrate([25]); };
      }
      grid.appendChild(card);
    });
  }

  // ── MISSIONS ─────────────────────────────────────────────
  _openMissions(){
    this._hideOverlays();
    this._renderMissions();
    document.getElementById('missions-modal').classList.remove('hidden');
  }
  _renderMissions(){
    const mp=document.getElementById('missions-panel');mp.innerHTML='';
    MISSIONS.forEach(m=>{
      const st=this.missions.get(m.id);
      const prog=Math.min(st.progress,m.goal);
      const div=document.createElement('div');
      div.className='mission-item'+(st.done?' done':'');
      div.innerHTML=`<div class="mission-title">${m.title} ${st.done?'✓':''}</div>
        <div class="mission-desc-t">${m.desc}</div>
        <div class="mission-prog-bar"><div class="mission-prog-fill" style="width:${(prog/m.goal)*100}%"></div></div>
        <div class="mission-rew-row"><span class="mission-rew">◈ ${m.reward}</span><span class="mission-prog">${prog}/${m.goal}</span></div>`;
      mp.appendChild(div);
    });
    const ap=document.getElementById('achievements-panel');ap.innerHTML='';
    ACHIEVEMENTS.forEach(a=>{
      const un=this.achMgr.has(a.id);
      const div=document.createElement('div');
      div.className='ach-item'+(un?' done':'')+(a.secret?' secret':'');
      div.innerHTML=`<div class="ach-icon-el">${un?a.icon:(a.secret?'❓':a.icon)}</div>
        <div class="ach-body">
          <div class="ach-title-el">${(un||!a.secret)?a.title:'???'} ${un?'✓':''}</div>
          <div class="ach-desc-el">${(un||!a.secret)?a.desc:'Secret achievement'}</div>
        </div>`;
      ap.appendChild(div);
    });
  }

  // ── DAILY ────────────────────────────────────────────────
  _openDaily(){
    this._hideOverlays();
    const streak=this.daily.streak;
    document.getElementById('daily-streak-display').textContent=streak>0?`🔥 ${streak} DAY STREAK`:'New streak!';
    const cal=document.getElementById('daily-calendar');cal.innerHTML='';
    DAILY_DAYS.forEach((d,i)=>{
      const idx=i;
      const claimed=idx<(streak%7===0&&streak>0?7:streak%7);
      const isToday=idx===(streak%7===0&&streak>0?6:Math.max(0,streak%7-1))&&this.daily.canClaim();
      const card=document.createElement('div');
      card.className='day-card'+(claimed?' claimed':(isToday?' today':' future'));
      card.innerHTML=`<div class="day-num">DAY ${i+1}</div><div class="day-icon">${d.icon}</div><div class="day-rew">${d.label}</div>`;
      cal.appendChild(card);
    });
    const todayReward=DAILY_DAYS[Math.max(0,streak%7)];
    document.getElementById('daily-reward-amount').textContent='+'+todayReward.coins;
    const claimBtn=document.getElementById('claim-reward-btn');
    const closeBtn=document.getElementById('close-daily-btn');
    if(this.daily.canClaim()){
      claimBtn.disabled=false; claimBtn.textContent=`CLAIM ${todayReward.coins} ◈`;
      document.getElementById('daily-reward-desc').textContent='Come back tomorrow for more!';
    } else {
      claimBtn.disabled=true;
      document.getElementById('daily-reward-desc').textContent=this.daily.cooldownText();
    }
    document.getElementById('daily-modal').classList.remove('hidden');
  }

  // ── WHEEL ────────────────────────────────────────────────
  _openWheel(){
    this._hideOverlays();
    const coolEl=document.getElementById('wheel-cooldown-display');
    const spinBtn=document.getElementById('spin-btn');
    const resEl=document.getElementById('wheel-result');
    resEl.classList.add('hidden');
    if(this.wheel.canSpin()){
      coolEl.classList.add('hidden');spinBtn.disabled=false;spinBtn.classList.add('btn-pulse');
    } else {
      coolEl.textContent=this.wheel.cooldownText();coolEl.classList.remove('hidden');
      spinBtn.disabled=true;spinBtn.classList.remove('btn-pulse');
    }
    this._drawWheel(0);
    document.getElementById('wheel-modal').classList.remove('hidden');
  }

  _drawWheel(rot){
    const cv=document.getElementById('wheel-canvas'),ctx=cv.getContext('2d');
    const W=cv.width,cx=W/2,r=W/2-8;
    const total=WHEEL_PRIZES.reduce((s,p)=>s+p.prob,0);
    const palettes=[['#1a1a3e','#2a2a5e'],['#12122e','#22224e'],['#1e1040','#2e2060'],['#0e0e28','#1e1e48'],['#141428','#242448'],['#18183a','#28285a'],['#0c0c22','#1c1c42'],['#161632','#262652']];
    ctx.clearRect(0,0,W,W);
    let angle=rot;
    WHEEL_PRIZES.forEach((prize,i)=>{
      const sweep=(prize.prob/total)*Math.PI*2;
      const grad=ctx.createRadialGradient(cx,cx,r*.3,cx,cx,r);
      grad.addColorStop(0,palettes[i%palettes.length][0]);
      grad.addColorStop(1,palettes[i%palettes.length][1]);
      ctx.beginPath();ctx.moveTo(cx,cx);ctx.arc(cx,cx,r,angle,angle+sweep);ctx.closePath();
      ctx.fillStyle=grad;ctx.fill();
      ctx.strokeStyle='rgba(0,245,255,.2)';ctx.lineWidth=1;ctx.stroke();
      ctx.save();ctx.translate(cx,cx);ctx.rotate(angle+sweep/2);
      ctx.textAlign='right';ctx.font='bold 10px Orbitron,monospace';
      ctx.fillStyle='#fff';ctx.shadowBlur=6;ctx.shadowColor='#00f5ff';
      ctx.fillText(prize.label,r-8,4);ctx.restore();
      angle+=sweep;
    });
    // Center
    ctx.beginPath();ctx.arc(cx,cx,20,0,Math.PI*2);
    const cg=ctx.createRadialGradient(cx,cx,0,cx,cx,20);
    cg.addColorStop(0,'#00f5ff');cg.addColorStop(1,'#0044aa');
    ctx.fillStyle=cg;ctx.shadowBlur=12;ctx.shadowColor='#00f5ff';ctx.fill();ctx.shadowBlur=0;
  }

  _doSpin(){
    if(!this.wheel.canSpin()) return;
    const spinBtn=document.getElementById('spin-btn');
    spinBtn.disabled=true;spinBtn.classList.remove('btn-pulse');
    this.stats.wheelSpins++;this.stats.save();
    vibrate([40]);
    const prize=this.wheel.spin();
    const total=WHEEL_PRIZES.reduce((s,p)=>s+p.prob,0);
    const prizeIdx=WHEEL_PRIZES.indexOf(prize);
    let targetAngle=0;
    for(let i=0;i<prizeIdx;i++) targetAngle+=(WHEEL_PRIZES[i].prob/total)*Math.PI*2;
    targetAngle+=(prize.prob/total)*Math.PI*2*.5;
    const spins=6+Math.random()*3;
    const total2=spins*Math.PI*2+(Math.PI*2-targetAngle%(Math.PI*2));
    const dur=4000,start=performance.now();
    const animate=(now)=>{
      const t=Math.min(1,(now-start)/dur);
      const ease=1-Math.pow(1-t,4);
      this._drawWheel(ease*total2);
      if(t<1) requestAnimationFrame(animate);
      else this._handleWheelResult(prize);
    };
    requestAnimationFrame(animate);
  }

  _handleWheelResult(prize){
    let msg='';
    if(prize.coins){ this.wallet.add(prize.coins); msg=`◈ ${prize.coins} COINS!`; }
    if(prize.xp2)  { this.wheel.setXP2(true); msg='2x SCORE NEXT GAME!'; }
    if(prize.coins>=200) this.achMgr.unlock('jackpot');
    this.audio.playAchieve();
    vibrate([80,40,100]);
    const el=document.getElementById('wheel-result');
    el.textContent='🎁 '+msg; el.classList.remove('hidden');
    document.getElementById('wheel-cooldown-display').textContent=this.wheel.cooldownText();
    document.getElementById('wheel-cooldown-display').classList.remove('hidden');
    this._updateMenuUI();
  }

  // ── STATS ────────────────────────────────────────────────
  _openStats(){
    this._hideOverlays();
    const grid=document.getElementById('stats-grid');grid.innerHTML='';
    const items=[
      {icon:'🎮',label:'GAMES PLAYED',  value:this.stats.gamesPlayed},
      {icon:'⭐',label:'HIGH SCORE',     value:this.stats.highScore},
      {icon:'🏆',label:'BEST STAGE',     value:this.stats.bestStage||'—'},
      {icon:'◈', label:'TOTAL COINS',    value:this.stats.totalCoins},
      {icon:'⏱', label:'LONGEST RUN',    value:Math.floor(this.stats.longestRun)+'s'},
      {icon:'🔥',label:'BEST COMBO',     value:'x'+this.stats.highestCombo},
      {icon:'🔓',label:'SKINS OWNED',    value:this.skins.unlocked.length+'/'+SKINS.length},
      {icon:'🎡',label:'WHEEL SPINS',    value:this.stats.wheelSpins},
    ];
    items.forEach(it=>{
      const card=document.createElement('div');card.className='stat-card';
      card.innerHTML=`<div class="stat-card-icon">${it.icon}</div><div class="stat-card-value">${it.value}</div><div class="stat-card-label">${it.label}</div>`;
      grid.appendChild(card);
    });
    document.getElementById('stats-modal').classList.remove('hidden');
  }
}

// ═══════════════════════════════════════════════════════════
//  BOOT
// ═══════════════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded',()=>{
  document.body.addEventListener('touchmove',e=>e.preventDefault(),{passive:false});
  new ShadowRush();
});
