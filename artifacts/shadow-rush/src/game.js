// ============================================================
//  SHADOW RUSH v2.0 — Full Game Engine
// ============================================================

// ================================================================
//  CONSTANTS & DATA
// ================================================================

const XP_BASE = 100;
function xpForLevel(lv) {
  return Math.floor(XP_BASE + (lv - 1) * 90 + Math.pow(lv - 1, 1.6) * 18);
}

function totalXpForLevel(lv) {
  let total = 0;
  for (let i = 1; i < lv; i++) total += xpForLevel(i);
  return total;
}

// ---- SKINS ----
const SKINS = [
  { id:'default',   name:'NEON CUBE',   color:'#00f5ff', glow:'#00f5ff', price:0,    gradient:['#00f5ff','#0099cc'], minLevel:1,  secret:false },
  { id:'fire',      name:'FIRE',        color:'#ff6b35', glow:'#ff4500', price:50,   gradient:['#ff6b35','#ff0000'], minLevel:1,  secret:false },
  { id:'ice',       name:'ICE',         color:'#a8e6ff', glow:'#00bfff', price:50,   gradient:['#a8e6ff','#0080ff'], minLevel:1,  secret:false },
  { id:'phantom',   name:'PHANTOM',     color:'#bf5af2', glow:'#8000ff', price:100,  gradient:['#bf5af2','#8000ff'], minLevel:5,  secret:false },
  { id:'gold',      name:'GOLD',        color:'#ffd60a', glow:'#ff9500', price:150,  gradient:['#ffd60a','#ff9500'], minLevel:5,  secret:false },
  { id:'matrix',    name:'MATRIX',      color:'#30d158', glow:'#00ff41', price:100,  gradient:['#30d158','#00ff00'], minLevel:10, secret:false },
  { id:'pink',      name:'NEON PINK',   color:'#ff2d78', glow:'#ff0066', price:150,  gradient:['#ff2d78','#ff0066'], minLevel:10, secret:false },
  { id:'rainbow',   name:'RAINBOW',     color:'#ffffff', glow:'#ffffff', price:300,  gradient:['#ff0000','#ff9900','#ffff00','#00ff00','#0099ff','#bf00ff'], minLevel:15, secret:false },
  { id:'lightning', name:'LIGHTNING',   color:'#ffe066', glow:'#ffdd00', price:250,  gradient:['#fff176','#ffd600'], minLevel:25, secret:false },
  { id:'crystal',   name:'CRYSTAL',     color:'#e0f7fa', glow:'#b2ebf2', price:300,  gradient:['#e0f7fa','#80deea'], minLevel:30, secret:false },
  { id:'cosmic',    name:'COSMIC',      color:'#ce93d8', glow:'#ab47bc', price:500,  gradient:['#ce93d8','#7b1fa2'], minLevel:50, secret:false },
  { id:'prism',     name:'PRISM',       color:'#f8bbd0', glow:'#f06292', price:800,  gradient:['#f8bbd0','#ce93d8','#80deea'], minLevel:75, secret:false },
  // SECRET skins
  { id:'void',      name:'VOID',        color:'#120024', glow:'#6200ea', price:0,    gradient:['#120024','#6200ea'], minLevel:20, secret:true, hint:'Survive 3 minutes in one run' },
  { id:'dark_matter',name:'DARK MATTER',color:'#1a1a2e', glow:'#e040fb', price:0,   gradient:['#1a1a2e','#e040fb'], minLevel:40, secret:true, hint:'Survive 60s in DARKNESS mode' },
  { id:'shadow',    name:'SHADOW LORD', color:'#090018', glow:'#ff2d78', price:0,    gradient:['#090018','#ff2d78'], minLevel:60, secret:true, hint:'Reach Level 60' },
  { id:'ultimate',  name:'ULTIMATE',    color:'#fff',    glow:'#fff',    price:0,    gradient:['#00f5ff','#bf5af2','#ffd60a','#ff2d78'], minLevel:100, secret:true, hint:'Reach Level 100' },
];

// ---- OBSTACLE THEMES ----
const OBS_THEMES = [
  { id:'neon',   name:'NEON',   minLevel:1,  colors:['#ff2d78','#cc0055'], glow:'#ff2d78' },
  { id:'fire',   name:'FIRE',   minLevel:10, colors:['#ff6b35','#cc2200'], glow:'#ff4500' },
  { id:'ice',    name:'ICE',    minLevel:20, colors:['#48cae4','#0077b6'], glow:'#00bfff' },
  { id:'void',   name:'VOID',   minLevel:35, colors:['#6200ea','#310052'], glow:'#6200ea' },
  { id:'cosmic', name:'COSMIC', minLevel:50, colors:null, glow:'#ce93d8' },
];

// ---- DAILY REWARDS (7-day cycle) ----
const DAILY_REWARDS = [
  { day:1, coins:50,  xp:0,   icon:'◈',  label:'50 COINS' },
  { day:2, coins:75,  xp:100, icon:'⭐', label:'75 COINS + 100 XP' },
  { day:3, coins:100, xp:0,   icon:'◈',  label:'100 COINS' },
  { day:4, coins:150, xp:0,   icon:'◈',  label:'150 COINS' },
  { day:5, coins:200, xp:200, icon:'🌟', label:'200 COINS + 200 XP' },
  { day:6, coins:250, xp:0,   icon:'◈',  label:'250 COINS' },
  { day:7, coins:500, xp:500, icon:'🏆', label:'500 COINS + 500 XP + SKIN' },
];

// ---- DAILY MISSIONS ----
const DAILY_MISSIONS = [
  { id:'dm_score',   title:'SCORE RUSH',   desc:'Reach 300 score',            goal:300, key:'score',  reward:15 },
  { id:'dm_coins',   title:'COIN GRAB',    desc:'Collect 20 coins in a run',  goal:20,  key:'coins',  reward:20 },
  { id:'dm_survive', title:'SURVIVOR',     desc:'Survive 30 seconds',         goal:30,  key:'time',   reward:25 },
  { id:'dm_combo',   title:'COMBO UP',     desc:'Get a x3 combo',             goal:3,   key:'combo',  reward:20 },
  { id:'dm_rules',   title:'RULE BENDER',  desc:'Survive 1 rule change',      goal:1,   key:'rules',  reward:15 },
];

// ---- WEEKLY MISSIONS ----
const WEEKLY_MISSIONS = [
  { id:'wm_score',   title:'SCORE HUNTER',  desc:'Score 5000 total across runs', goal:5000, key:'score_total', reward:200 },
  { id:'wm_coins',   title:'COIN COLLECTOR',desc:'Collect 200 coins total',       goal:200,  key:'coins_total', reward:150 },
  { id:'wm_time',    title:'IRON CUBE',     desc:'Survive 5 minutes total',       goal:300,  key:'time_total',  reward:100 },
  { id:'wm_games',   title:'DEDICATED',     desc:'Play 10 games',                 goal:10,   key:'games',       reward:75 },
  { id:'wm_combo',   title:'COMBO KING',    desc:'Reach x8 combo',               goal:8,    key:'combo',       reward:125 },
];

// ---- ACHIEVEMENTS ----
const ACHIEVEMENTS = [
  { id:'first_run',    title:'FIRST RUSH',      desc:'Play your first game',          icon:'🎮', secret:false },
  { id:'score1000',    title:'KILO RUSH',        desc:'Reach score 1000',              icon:'⭐', secret:false },
  { id:'score5000',    title:'MEGA RUSH',        desc:'Reach score 5000',              icon:'🌟', secret:false },
  { id:'score10000',   title:'ULTRA RUSH',       desc:'Reach score 10000',             icon:'💫', secret:false },
  { id:'coins100',     title:'COIN HOARDER',     desc:'Total 100 coins collected',     icon:'💰', secret:false },
  { id:'coins500',     title:'COIN KING',        desc:'Total 500 coins collected',     icon:'👑', secret:false },
  { id:'combo10',      title:'COMBO MANIAC',     desc:'Reach x10 combo',              icon:'🔥', secret:false },
  { id:'skin_unlock',  title:'STYLIST',          desc:'Unlock any skin',               icon:'🎨', secret:false },
  { id:'survive120',   title:'ENDURANCE',        desc:'Survive 2 minutes',            icon:'⏱', secret:false },
  { id:'level10',      title:'RISING STAR',      desc:'Reach Level 10',               icon:'⚡', secret:false },
  { id:'level25',      title:'VETERAN',          desc:'Reach Level 25',               icon:'🏅', secret:false },
  { id:'level50',      title:'ELITE',            desc:'Reach Level 50',               icon:'💎', secret:false },
  // Secret achievements
  { id:'speed_demon',  title:'SPEED DEMON',      desc:'Score 2000 during SPEED BOOST', icon:'🚀', secret:true },
  { id:'grav_master',  title:'GRAVITY MASTER',   desc:'Survive 30s in gravity flip',   icon:'⬆', secret:true },
  { id:'dark_survivor',title:'SHADOW WALKER',    desc:'Survive 60s in DARKNESS',       icon:'🌑', secret:true },
  { id:'combo_god',    title:'COMBO GOD',        desc:'Reach x15 combo',              icon:'🌪', secret:true },
  { id:'wheel_jackpot',title:'JACKPOT!',         desc:'Win 500 coins on the wheel',    icon:'🎡', secret:true },
  { id:'coin_rich',    title:'MILLIONAIRE',      desc:'Total 2000 coins collected',    icon:'💸', secret:true },
];

// ---- LUCKY WHEEL ----
const WHEEL_PRIZES = [
  { label:'20◈',       coins:20,   xp:0,    skinUnlock:null, prob:30 },
  { label:'50◈',       coins:50,   xp:0,    skinUnlock:null, prob:25 },
  { label:'100◈',      coins:100,  xp:0,    skinUnlock:null, prob:18 },
  { label:'50 XP',     coins:0,    xp:50,   skinUnlock:null, prob:12 },
  { label:'200◈',      coins:200,  xp:0,    skinUnlock:null, prob:8  },
  { label:'2x XP',     coins:0,    xp:0,    skinUnlock:null, prob:5,  effect:'xp2' },
  { label:'500◈',      coins:500,  xp:0,    skinUnlock:null, prob:1  },
  { label:'SKIN!',     coins:0,    xp:0,    skinUnlock:true, prob:1  },
];

// ---- RULES ----
const RULES = [
  { id:'normal',        name:'NORMAL',           desc:'' },
  { id:'gravity_flip',  name:'⬆ GRAVITY FLIP',   desc:'Gravity reversed!' },
  { id:'speed_boost',   name:'⚡ SPEED BOOST',    desc:'Everything faster!' },
  { id:'slow_motion',   name:'🐢 SLOW MOTION',    desc:'Time slows...' },
  { id:'tiny',          name:'🔬 TINY MODE',      desc:'Cube shrinks!' },
  { id:'big',           name:'🔭 BIG MODE',       desc:'Cube grows!' },
  { id:'dark',          name:'🌑 DARKNESS',       desc:'Lights out!' },
  { id:'inverted',      name:'↔ INVERTED',       desc:'Controls flipped!' },
  { id:'mirror',        name:'🪞 MIRROR',          desc:'Screen mirrored!' },
  { id:'magnetic',      name:'🧲 MAGNETIC',       desc:'Coins attracted!' },
  { id:'obstacle_fast', name:'🚀 FAST OBSTACLES', desc:'Obstacles speed up!' },
  { id:'screen_shake',  name:'🌊 EARTHQUAKE',     desc:'Hold on!' },
  { id:'ghost',         name:'👻 GHOST MODE',     desc:'Obstacles flicker!' },
];

// ---- SPECIAL EVENTS ----
const SPECIAL_EVENTS = [
  { id:'coin_rain',   name:'🌧 COIN RAIN!',    duration:8,  desc:'Coins everywhere!' },
  { id:'double_coins',name:'✕2 DOUBLE COINS!', duration:15, desc:'All coins worth 2x!' },
  { id:'shield',      name:'🛡 SHIELD!',        duration:5,  desc:'One hit protection!' },
  { id:'xp_boost',    name:'⭐ XP BOOST!',      duration:999, desc:'Double XP this run!' },
  { id:'score_rush',  name:'🔥 SCORE RUSH!',    duration:12, desc:'3x score multiplier!' },
];

// ================================================================
//  AUDIO MANAGER
// ================================================================
class AudioManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.bgNodes = [];
    this.bgGain = null;
    this.beatNodes = [];
    this.beatGain = null;
    this.intensity = 0;
    this._init();
  }

  _init() {
    try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch (e) { this.enabled = false; }
  }

  _resume() {
    if (this.ctx?.state === 'suspended') this.ctx.resume();
  }

  _tone(freq, type, dur, vol = 0.28, delay = 0) {
    if (!this.enabled || !this.ctx) return;
    this._resume();
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + dur);
      osc.start(this.ctx.currentTime + delay);
      osc.stop(this.ctx.currentTime + delay + dur + 0.01);
    } catch (e) {}
  }

  playJump()       { this._tone(200,'sine',0.1,0.22); this._tone(380,'sine',0.07,0.14,0.05); }
  playCoin()       { this._tone(880,'sine',0.08,0.22); this._tone(1320,'sine',0.06,0.18,0.07); }
  playBigCoin()    { [880,1100,1320,1760].forEach((f,i)=>this._tone(f,'sine',0.1,0.2,i*0.05)); }
  playDie()        { this._tone(180,'sawtooth',0.15,0.3); this._tone(90,'sawtooth',0.2,0.3,0.1); this._tone(55,'square',0.25,0.35,0.22); }
  playRuleChange() { [440,550,660,880].forEach((f,i)=>this._tone(f,'sine',0.1,0.18,i*0.06)); }
  playCombo(n)     { const f = 440 + n*40; this._tone(f,'sine',0.08,0.2); this._tone(f*1.5,'sine',0.06,0.14,0.04); }
  playAchievement(){ [523,659,784,1047].forEach((f,i)=>this._tone(f,'sine',0.14,0.2,i*0.07)); }
  playLevelUp()    { [262,330,392,523,659,784].forEach((f,i)=>this._tone(f,'sine',0.18,0.22,i*0.08)); }
  playEvent()      { [660,880,1100].forEach((f,i)=>this._tone(f,'triangle',0.12,0.25,i*0.06)); }
  playCountdown()  { this._tone(440,'sine',0.15,0.35); }
  playGo()         { [523,659,784].forEach((f,i)=>this._tone(f,'sine',0.15,0.3,i*0.04)); }
  playShield()     { this._tone(330,'square',0.08,0.15); }
  playSpin()       { this._tone(220,'sawtooth',0.05,0.1); }

  setIntensity(val) {
    this.intensity = Math.max(0, Math.min(1, val));
    if (this.bgGain) {
      const vol = 0.03 + this.intensity * 0.07;
      try { this.bgGain.gain.linearRampToValueAtTime(vol, this.ctx.currentTime + 1); } catch(e){}
    }
    if (this.beatGain) {
      const bvol = this.intensity * 0.06;
      try { this.beatGain.gain.linearRampToValueAtTime(bvol, this.ctx.currentTime + 1); } catch(e){}
    }
  }

  startBGM() {
    if (!this.enabled || !this.ctx || this.bgNodes.length) return;
    this._resume();
    try {
      this.bgGain = this.ctx.createGain();
      this.bgGain.gain.value = 0.04;
      this.bgGain.connect(this.ctx.destination);

      const freqs = [55, 82.4, 110, 164.8];
      freqs.forEach(f => {
        const osc = this.ctx.createOscillator();
        osc.type = 'sine'; osc.frequency.value = f;
        osc.connect(this.bgGain); osc.start();
        this.bgNodes.push(osc);
      });

      // LFO for movement
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 0.3; lfoGain.gain.value = 0.025;
      lfo.connect(lfoGain); lfoGain.connect(this.bgGain.gain);
      lfo.start(); this.bgNodes.push(lfo);

      // Beat / pulse
      this.beatGain = this.ctx.createGain();
      this.beatGain.gain.value = 0;
      this.beatGain.connect(this.ctx.destination);
      this._startBeat();
    } catch(e){}
  }

  _startBeat() {
    if (!this.enabled || !this.ctx || !this.beatGain) return;
    const beatInterval = Math.max(0.2, 0.5 - this.intensity * 0.25);
    try {
      const osc = this.ctx.createOscillator();
      const env = this.ctx.createGain();
      osc.type = 'square'; osc.frequency.value = 80 + this.intensity * 40;
      osc.connect(env); env.connect(this.beatGain);
      env.gain.setValueAtTime(1, this.ctx.currentTime);
      env.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.1);
    } catch(e){}
    this._beatTimer = setTimeout(() => this._startBeat(), beatInterval * 1000);
  }

  stopBGM() {
    clearTimeout(this._beatTimer);
    try { this.bgNodes.forEach(n => n.stop()); } catch(e){}
    this.bgNodes = [];
    try { this.bgGain?.disconnect(); } catch(e){}
    this.bgGain = null;
    try { this.beatGain?.disconnect(); } catch(e){}
    this.beatGain = null;
  }
}

// ================================================================
//  VIBRATION
// ================================================================
function vibrate(pattern) {
  try { if (navigator.vibrate) navigator.vibrate(pattern); } catch(e){}
}

// ================================================================
//  PARTICLE
// ================================================================
class Particle {
  constructor(x, y, vx, vy, color, life, shape = 'circle', size = null) {
    this.x = x; this.y = y;
    this.vx = vx; this.vy = vy;
    this.color = color;
    this.life = life; this.maxLife = life;
    this.size = size ?? (Math.random() * 4 + 2);
    this.shape = shape;
    this.rot = Math.random() * Math.PI * 2;
    this.rotV = (Math.random() - 0.5) * 6;
  }

  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vy += 150 * dt;
    this.vx *= 0.98;
    this.life -= dt;
    this.rot += this.rotV * dt;
  }

  draw(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife);
    const sz = this.size * (0.3 + 0.7 * alpha);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    if (this.shape === 'square') {
      ctx.translate(this.x, this.y); ctx.rotate(this.rot);
      ctx.fillRect(-sz/2, -sz/2, sz, sz);
    } else {
      ctx.beginPath();
      ctx.arc(this.x, this.y, sz, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

// ================================================================
//  FLOATING TEXT (score/coin pop labels)
// ================================================================
class FloatText {
  constructor(x, y, text, color) {
    this.x = x; this.y = y; this.text = text; this.color = color;
    this.life = 1.1; this.maxLife = 1.1;
    this.vy = -80;
  }
  update(dt) { this.y += this.vy * dt; this.vy *= 0.96; this.life -= dt; }
  draw(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = `bold 14px Orbitron, monospace`;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8; ctx.shadowColor = this.color;
    ctx.textAlign = 'center';
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}

// ================================================================
//  PERSISTENCE HELPERS
// ================================================================
function loadJSON(key, def) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') || def; }
  catch(e) { return def; }
}
function saveJSON(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

// ================================================================
//  LEVEL MANAGER
// ================================================================
class LevelManager {
  constructor() {
    const d = loadJSON('sr_level', { level:1, xp:0 });
    this.level = d.level;
    this.xp = d.xp;
    this.xpToNext = xpForLevel(this.level);
  }
  save() { saveJSON('sr_level', { level:this.level, xp:this.xp }); }

  addXP(amount) {
    const levelUps = [];
    this.xp += amount;
    while (this.xp >= xpForLevel(this.level) && this.level < 100) {
      this.xp -= xpForLevel(this.level);
      this.level++;
      this.xpToNext = xpForLevel(this.level);
      levelUps.push(this.level);
    }
    if (this.level >= 100) this.xp = Math.min(this.xp, xpForLevel(this.level) - 1);
    this.xpToNext = xpForLevel(this.level);
    this.save();
    return levelUps;
  }

  getProgressPct() {
    return this.level >= 100 ? 1 : this.xp / this.xpToNext;
  }
}

// ================================================================
//  SKIN MANAGER
// ================================================================
class SkinManager {
  constructor() {
    const d = loadJSON('sr_skins2', { unlocked:['default'], equipped:'default' });
    this.unlocked = d.unlocked;
    this.equipped = d.equipped;
  }
  save() { saveJSON('sr_skins2', { unlocked:this.unlocked, equipped:this.equipped }); }
  getSkin() { return SKINS.find(s => s.id === this.equipped) || SKINS[0]; }
  unlock(id) { if (!this.unlocked.includes(id)) { this.unlocked.push(id); this.save(); return true; } return false; }
  equip(id) { this.equipped = id; this.save(); }
  isUnlocked(id) { return this.unlocked.includes(id); }
  getObsTheme(level) {
    const d = loadJSON('sr_theme', { selected:'neon' });
    const theme = OBS_THEMES.find(t => t.id === d.selected && t.minLevel <= level) || OBS_THEMES[0];
    return theme;
  }
  setObsTheme(id) { saveJSON('sr_theme', { selected:id }); }
  getSelectedTheme() { return loadJSON('sr_theme', { selected:'neon' }).selected; }
}

// ================================================================
//  STATISTICS
// ================================================================
class StatsManager {
  constructor() {
    const d = loadJSON('sr_stats', {});
    this.gamesPlayed  = d.gamesPlayed  || 0;
    this.totalCoins   = d.totalCoins   || 0;
    this.totalCoinsSpent = d.totalCoinsSpent || 0;
    this.highScore    = d.highScore    || 0;
    this.longestRun   = d.longestRun   || 0;
    this.totalScore   = d.totalScore   || 0;
    this.highestCombo = d.highestCombo || 0;
    this.rulesLived   = d.rulesLived   || 0;
    this.totalXP      = d.totalXP      || 0;
    this.wheelSpins   = d.wheelSpins   || 0;
    this.achievementsUnlocked = d.achievementsUnlocked || 0;
  }
  save() {
    saveJSON('sr_stats', {
      gamesPlayed:this.gamesPlayed, totalCoins:this.totalCoins,
      totalCoinsSpent:this.totalCoinsSpent, highScore:this.highScore,
      longestRun:this.longestRun, totalScore:this.totalScore,
      highestCombo:this.highestCombo, rulesLived:this.rulesLived,
      totalXP:this.totalXP, wheelSpins:this.wheelSpins,
      achievementsUnlocked:this.achievementsUnlocked
    });
  }
  endRun({ score, coins, time, combo, rules, xp }) {
    this.gamesPlayed++;
    this.totalCoins += coins;
    this.totalScore += score;
    this.totalXP += xp;
    if (score > this.highScore) this.highScore = score;
    if (time  > this.longestRun) this.longestRun = time;
    if (combo > this.highestCombo) this.highestCombo = combo;
    this.rulesLived += rules;
    this.save();
  }
}

// ================================================================
//  MISSION MANAGER
// ================================================================
class MissionManager {
  constructor() {
    const d = loadJSON('sr_missions', {});
    this.daily   = d.daily   || {};
    this.weekly  = d.weekly  || {};
    this.lastDailyReset  = d.lastDailyReset  || 0;
    this.lastWeeklyReset = d.lastWeeklyReset || 0;
    this._maybeReset();
  }

  _maybeReset() {
    const now = Date.now();
    if (now - this.lastDailyReset > 24*60*60*1000) {
      this.daily = {};
      DAILY_MISSIONS.forEach(m => { this.daily[m.id] = { progress:0, completed:false }; });
      this.lastDailyReset = now;
    }
    if (now - this.lastWeeklyReset > 7*24*60*60*1000) {
      this.weekly = {};
      WEEKLY_MISSIONS.forEach(m => { this.weekly[m.id] = { progress:0, completed:false }; });
      this.lastWeeklyReset = now;
    }
    DAILY_MISSIONS.forEach(m => { if (!this.daily[m.id]) this.daily[m.id] = { progress:0, completed:false }; });
    WEEKLY_MISSIONS.forEach(m => { if (!this.weekly[m.id]) this.weekly[m.id] = { progress:0, completed:false }; });
    this.save();
  }

  save() {
    saveJSON('sr_missions', {
      daily:this.daily, weekly:this.weekly,
      lastDailyReset:this.lastDailyReset, lastWeeklyReset:this.lastWeeklyReset
    });
  }

  updateRun(session) {
    const hits = [];
    const update = (list, defs) => {
      defs.forEach(m => {
        const state = list[m.id];
        if (!state || state.completed) return;
        let val = 0;
        if (m.key === 'score')        val = session.score;
        else if (m.key === 'coins')   val = session.coins;
        else if (m.key === 'time')    val = session.time;
        else if (m.key === 'combo')   val = session.combo;
        else if (m.key === 'rules')   val = session.rules;
        else if (m.key === 'score_total') val = session.scoreCum;
        else if (m.key === 'coins_total') val = session.coinsCum;
        else if (m.key === 'time_total')  val = session.timeCum;
        else if (m.key === 'games')   val = session.games;
        state.progress = Math.max(state.progress, val);
        if (state.progress >= m.goal) { state.completed = true; hits.push({ ...m }); }
      });
    };
    update(this.daily, DAILY_MISSIONS);
    update(this.weekly, WEEKLY_MISSIONS);
    this.save();
    return hits;
  }
}

// ================================================================
//  DAILY LOGIN
// ================================================================
class DailyLogin {
  constructor() {
    const d = loadJSON('sr_daily2', {});
    this.lastClaim   = d.lastClaim   || 0;
    this.streak      = d.streak      || 0;
    this.todayIndex  = d.todayIndex  !== undefined ? d.todayIndex : -1;
  }
  isAvailable() { return Date.now() - this.lastClaim > 20*60*60*1000; }
  currentDayReward() { return DAILY_REWARDS[this.todayIndex] || DAILY_REWARDS[0]; }
  nextStreak() { return Math.min(this.streak + 1, 7); }
  claim() {
    const now = Date.now();
    const withinWindow = now - this.lastClaim < 48*60*60*1000;
    this.streak = withinWindow ? Math.min(this.streak + 1, 7) : 1;
    this.todayIndex = (this.streak - 1) % 7;
    this.lastClaim = now;
    saveJSON('sr_daily2', { lastClaim:this.lastClaim, streak:this.streak, todayIndex:this.todayIndex });
    return DAILY_REWARDS[this.todayIndex];
  }
}

// ================================================================
//  LUCKY WHEEL
// ================================================================
class LuckyWheel {
  constructor() {
    const d = loadJSON('sr_wheel', {});
    this.lastSpin = d.lastSpin || 0;
    this.xp2Active = false;
  }
  canSpin() { return Date.now() - this.lastSpin > 24*60*60*1000; }
  cooldownText() {
    const rem = Math.max(0, (24*60*60*1000) - (Date.now() - this.lastSpin));
    const h = Math.floor(rem/3600000);
    const m = Math.floor((rem%3600000)/60000);
    return `Next spin in ${h}h ${m}m`;
  }
  spin() {
    this.lastSpin = Date.now();
    saveJSON('sr_wheel', { lastSpin:this.lastSpin });
    const total = WHEEL_PRIZES.reduce((s,p) => s + p.prob, 0);
    let r = Math.random() * total;
    for (const p of WHEEL_PRIZES) { r -= p.prob; if (r <= 0) return p; }
    return WHEEL_PRIZES[0];
  }
}

// ================================================================
//  ACHIEVEMENT MANAGER
// ================================================================
class AchievementManager {
  constructor() {
    this.unlocked = loadJSON('sr_achievements', []);
  }
  save() { saveJSON('sr_achievements', this.unlocked); }
  isUnlocked(id) { return this.unlocked.includes(id); }
  unlock(id) {
    if (this.unlocked.includes(id)) return false;
    this.unlocked.push(id);
    this.save();
    return true;
  }
}

// ================================================================
//  WALLET
// ================================================================
class Wallet {
  constructor() { this._coins = parseInt(localStorage.getItem('sr_wallet2') || '0'); }
  get coins() { return this._coins; }
  add(n) { this._coins += n; localStorage.setItem('sr_wallet2', this._coins); }
  spend(n) {
    if (this._coins < n) return false;
    this._coins -= n; localStorage.setItem('sr_wallet2', this._coins); return true;
  }
}

// ================================================================
//  MAIN GAME
// ================================================================
class ShadowRush {
  constructor() {
    this.canvas  = document.getElementById('gameCanvas');
    this.ctx     = this.canvas.getContext('2d');
    this.audio   = new AudioManager();
    this.lvlMgr  = new LevelManager();
    this.skinMgr = new SkinManager();
    this.stats   = new StatsManager();
    this.missions= new MissionManager();
    this.daily   = new DailyLogin();
    this.wheel   = new LuckyWheel();
    this.achMgr  = new AchievementManager();
    this.wallet  = new Wallet();

    this.state = 'menu';
    this.score = 0; this.coins = 0;
    this.particles = []; this.floatTexts = [];
    this.obstacles = []; this.coinItems = [];
    this.player = null;

    this.combo = 0; this.maxCombo = 0; this.comboTimer = 0;
    this.elapsed = 0; this.ruleTimer = 0; this.ruleInterval = 10;
    this.currentRule = RULES[0]; this.ruleChangeCount = 0;
    this.difficultyLevel = 1;
    this.obstacleSpawnTimer = 0; this.coinSpawnTimer = 0;
    this.shakeStrength = 0; this.screenShakeX = 0; this.screenShakeY = 0;
    this.colorHue = 0;

    this.activeEvent = null; this.eventTimer = 0; this.eventCooldown = 0;
    this.shield = false; this.shieldHits = 0;
    this.xp2ThisRun = false; this.scoreMultiplier = 1;
    this.doubleCoins = false;
    this.coinRainTimer = 0;

    this.gravTimeInFlip = 0; this.darkTime = 0; this.speedBoostScore = 0;

    this.bgStars = [];
    this.lastTime = 0;
    this._initCanvas(); this._initBG(); this._bindEvents(); this._setupUI();
    this._updateMenuUI();
    requestAnimationFrame(ts => { this.lastTime = ts; this._loop(ts); });
  }

  // ---- Canvas & BG ----
  _initCanvas() {
    const resize = () => {
      this.canvas.width  = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.W = this.canvas.width;
      this.H = this.canvas.height;
    };
    window.addEventListener('resize', resize); resize();
  }

  _initBG() {
    this.bgStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * 3000, y: Math.random() * 1500,
      r: Math.random() * 1.5 + 0.2,
      speed: Math.random() * 0.6 + 0.1,
      alpha: Math.random() * 0.6 + 0.1,
      twinkle: Math.random() * Math.PI * 2,
    }));
  }

  _createPlayer() {
    return { x: this.W * 0.2, y: this.H / 2, vy: 0, size: 28, baseSize: 28, grounded: false, trail: [] };
  }

  // ---- Touch / Input ----
  _bindEvents() {
    const c = this.canvas;
    c.addEventListener('touchstart', e => {
      e.preventDefault();
      this._onDown(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });
    c.addEventListener('touchend', e => { e.preventDefault(); }, { passive: false });
    c.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
    c.addEventListener('mousedown', e => this._onDown(e.clientX, e.clientY));
    document.addEventListener('keydown', e => {
      if (e.code === 'Space' || e.code === 'ArrowUp') this._onDown(this.W/2, this.H/2);
      if (e.code === 'Escape') this._togglePause();
    });
  }

  _onDown(x, y) {
    if (this.state === 'countdown') return;
    if (this.state === 'menu') { this._beginCountdown(); return; }
    if (this.state === 'gameover' || this.state === 'paused') return;
    if (this.state === 'playing') this._playerJump();
  }

  // ---- Player ----
  _playerJump() {
    if (!this.player) return;
    const gravDir = this.currentRule.id === 'gravity_flip' ? -1 : 1;
    this.player.vy = -650 * gravDir;
    this.audio.playJump();
    const skin = this.skinMgr.getSkin();
    for (let i = 0; i < 6; i++) {
      this.particles.push(new Particle(
        this.player.x, this.player.y,
        (Math.random()-0.5)*180, (Math.random()-0.5)*180,
        skin.glow, 0.4, 'square'));
    }
  }

  // ---- COUNTDOWN ----
  _beginCountdown() {
    this.state = 'countdown';
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('countdown-overlay').classList.remove('hidden');
    const numEl = document.getElementById('countdown-number');
    const goEl  = document.getElementById('countdown-go');
    numEl.classList.remove('hidden'); goEl.classList.add('hidden');

    let count = 3;
    numEl.textContent = count;
    this.audio.playCountdown();

    const tick = setInterval(() => {
      count--;
      if (count > 0) {
        numEl.textContent = count;
        numEl.style.animation = 'none'; void numEl.offsetWidth;
        numEl.style.animation = 'countPop 0.5s cubic-bezier(0.175,0.885,0.32,1.275)';
        this.audio.playCountdown();
      } else {
        clearInterval(tick);
        numEl.classList.add('hidden');
        goEl.classList.remove('hidden');
        this.audio.playGo();
        setTimeout(() => {
          document.getElementById('countdown-overlay').classList.add('hidden');
          this._startGame();
        }, 600);
      }
    }, 900);
  }

  // ---- GAME START ----
  _startGame() {
    this.state = 'playing';
    this.score = 0; this.coins = 0;
    this.combo = 0; this.maxCombo = 0; this.comboTimer = 0;
    this.elapsed = 0; this.ruleTimer = 0; this.ruleChangeCount = 0;
    this.currentRule = RULES[0]; this.difficultyLevel = 1;
    this.obstacles = []; this.coinItems = [];
    this.particles = []; this.floatTexts = [];
    this.obstacleSpawnTimer = 0; this.coinSpawnTimer = 0;
    this.shakeStrength = 0; this.activeEvent = null; this.eventTimer = 0;
    this.eventCooldown = 25;
    this.shield = false; this.shieldHits = 0;
    this.xp2ThisRun = this.wheel.xp2Active; this.wheel.xp2Active = false;
    this.scoreMultiplier = 1; this.doubleCoins = false; this.coinRainTimer = 0;
    this.gravTimeInFlip = 0; this.darkTime = 0; this.speedBoostScore = 0;
    this.player = this._createPlayer();

    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('pause-menu').classList.add('hidden');
    document.getElementById('game-over').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');

    this._updateHUD();
    this._updateRuleLabel();
    this.audio.startBGM();
  }

  // ---- PAUSE ----
  _togglePause() {
    if (this.state === 'playing') {
      this.state = 'paused';
      document.getElementById('pause-menu').classList.remove('hidden');
      document.getElementById('pause-score-display').textContent = `SCORE: ${this.score}  COINS: ${this.coins}`;
      this.audio.stopBGM();
    } else if (this.state === 'paused') {
      this.state = 'playing';
      document.getElementById('pause-menu').classList.add('hidden');
      this.lastTime = performance.now();
      this.audio.startBGM();
    }
  }

  // ---- DEATH ----
  _die() {
    if (this.state !== 'playing') return;
    if (this.shield && this.shieldHits > 0) {
      this.shieldHits--;
      if (this.shieldHits <= 0) { this.shield = false; this._endEvent(); }
      this.shakeStrength = 10;
      vibrate([100]);
      this.audio.playShield();
      return;
    }
    this.state = 'gameover';
    this.audio.stopBGM();
    this.audio.playDie();
    vibrate([150, 80, 150]);

    const skin = this.skinMgr.getSkin();
    if (this.player) {
      for (let i = 0; i < 28; i++) {
        const angle = (i/28)*Math.PI*2;
        const spd = 200 + Math.random()*250;
        this.particles.push(new Particle(
          this.player.x, this.player.y,
          Math.cos(angle)*spd, Math.sin(angle)*spd,
          skin.glow, 1.0, 'square', Math.random()*6+3));
      }
    }

    const xpEarned = this._calcXP();
    this.wallet.add(this.coins);
    this.stats.endRun({
      score:this.score, coins:this.coins, time:this.elapsed,
      combo:this.maxCombo, rules:this.ruleChangeCount, xp:xpEarned
    });
    const isNew = this.score > 0 && this.score === this.stats.highScore;

    // Weekly running totals
    const missionSession = {
      score:this.score, coins:this.coins,
      time:this.elapsed, combo:this.maxCombo, rules:this.ruleChangeCount,
      scoreCum:this.stats.totalScore, coinsCum:this.stats.totalCoins,
      timeCum:this.stats.longestRun, games:this.stats.gamesPlayed,
    };
    this.missions.updateRun(missionSession);

    // XP & level up
    const levelUps = this.lvlMgr.addXP(xpEarned);
    if (levelUps.length) this._scheduleLevelUpModal(levelUps[levelUps.length - 1]);

    // Achievements
    this._checkAllAchievements();

    // Secret skins
    this._checkSecretSkins();

    // Show game over screen
    document.getElementById('hud').classList.add('hidden');
    document.getElementById('rule-notification').classList.add('hidden');
    document.getElementById('event-banner').classList.add('hidden');
    document.getElementById('special-event-toast').classList.add('hidden');

    document.getElementById('final-score').textContent  = this.score;
    document.getElementById('final-best').textContent   = this.stats.highScore;
    document.getElementById('final-coins').textContent  = this.coins;
    document.getElementById('final-xp').textContent     = '+' + xpEarned;

    document.getElementById('new-best-badge').classList.toggle('hidden', !isNew);

    const goLevel  = document.getElementById('go-level-text');
    const goXPText = document.getElementById('go-xp-text');
    const goFill   = document.getElementById('go-xp-fill');
    goLevel.textContent  = `LV ${this.lvlMgr.level}`;
    goXPText.textContent = `${this.lvlMgr.xp} / ${this.lvlMgr.xpToNext} XP`;
    requestAnimationFrame(() => {
      goFill.style.width = (this.lvlMgr.getProgressPct() * 100) + '%';
    });

    if (isNew) {
      this.shakeStrength = 15;
      for (let i = 0; i < 20; i++) {
        const angle = Math.random()*Math.PI*2, spd = 150+Math.random()*200;
        this.particles.push(new Particle(this.W/2, this.H/2, Math.cos(angle)*spd, Math.sin(angle)*spd, '#ffd60a', 1.5));
      }
      vibrate([50,50,50,50,200]);
    }

    this._renderMissionProgress();
    this._updateMenuUI();

    document.getElementById('game-over').classList.remove('hidden');
  }

  _calcXP() {
    let xp = Math.floor(this.score/8) + this.coins*8 +
             Math.floor(this.elapsed*1.5) + this.ruleChangeCount*15;
    if (this.maxCombo >= 5) xp += this.maxCombo * 5;
    if (this.xp2ThisRun) xp *= 2;
    return xp;
  }

  // ---- SCHEDULE LEVEL UP ----
  _scheduleLevelUpModal(newLevel) {
    clearTimeout(this._levelUpTimer);
    this._levelUpTimer = setTimeout(() => this._showLevelUpModal(newLevel), 1500);
  }

  _showLevelUpModal(newLevel) {
    const modal = document.getElementById('levelup-modal');
    document.getElementById('levelup-number').textContent = newLevel;
    const reward = this._getLevelReward(newLevel);
    document.getElementById('levelup-reward').textContent = reward.text;
    if (reward.coins) this.wallet.add(reward.coins);
    modal.classList.remove('hidden');
    modal.style.pointerEvents = 'all';
    this.audio.playLevelUp();
    vibrate([100, 50, 100, 50, 200]);

    // Auto-unlock level rewards
    if (reward.skinId) {
      this.skinMgr.unlock(reward.skinId);
      this._showToast('🎨', reward.skinId.toUpperCase() + ' SKIN UNLOCKED', 'NEW SKIN!');
    }
    this._checkAllAchievements();
  }

  _getLevelReward(lv) {
    const rewards = {
      5:   { text:'◈ 100 COINS + PHANTOM UNLOCKED', coins:100, skinId:'phantom' },
      10:  { text:'◈ 150 COINS + MATRIX UNLOCKED', coins:150, skinId:'matrix' },
      15:  { text:'◈ 200 COINS + RAINBOW UNLOCKED', coins:200, skinId:'rainbow' },
      20:  { text:'◈ 250 COINS + VOID SKIN AVAILABLE', coins:250, skinId:null },
      25:  { text:'◈ 300 COINS + LIGHTNING AVAILABLE', coins:300, skinId:null },
      30:  { text:'◈ 350 COINS + CRYSTAL AVAILABLE', coins:350, skinId:null },
      35:  { text:'◈ 400 COINS + NEW OBSTACLE THEME!', coins:400, skinId:null },
      50:  { text:'◈ 500 COINS + COSMIC AVAILABLE', coins:500, skinId:null },
      75:  { text:'◈ 700 COINS + PRISM AVAILABLE', coins:700, skinId:null },
      100: { text:'🏆 ULTIMATE SKIN UNLOCKED!', coins:1000, skinId:'ultimate' },
    };
    const milestone = rewards[lv];
    if (milestone) return milestone;
    if (lv % 5 === 0) return { text:`◈ ${lv * 10} COINS BONUS!`, coins: lv * 10, skinId:null };
    return { text:`Keep going! ◈ ${lv * 5} COINS`, coins: lv * 5, skinId:null };
  }

  // ---- ACHIEVEMENTS ----
  _checkAllAchievements() {
    const check = (id, cond, ach) => {
      if (!cond) return;
      if (this.achMgr.unlock(id)) {
        this.stats.achievementsUnlocked++;
        this.stats.save();
        const a = ACHIEVEMENTS.find(x => x.id === id);
        if (a) setTimeout(() => { this._showToast(a.icon, a.title, a.desc); this.audio.playAchievement(); }, 800);
      }
    };
    const s = this.stats;
    check('first_run',    s.gamesPlayed >= 1);
    check('score1000',    this.score >= 1000);
    check('score5000',    this.score >= 5000);
    check('score10000',   this.score >= 10000);
    check('coins100',     s.totalCoins >= 100);
    check('coins500',     s.totalCoins >= 500);
    check('coin_rich',    s.totalCoins >= 2000);
    check('combo10',      s.highestCombo >= 10);
    check('combo_god',    s.highestCombo >= 15);
    check('skin_unlock',  this.skinMgr.unlocked.length > 1);
    check('survive120',   this.elapsed >= 120);
    check('level10',      this.lvlMgr.level >= 10);
    check('level25',      this.lvlMgr.level >= 25);
    check('level50',      this.lvlMgr.level >= 50);
    check('speed_demon',  this.currentRule.id === 'speed_boost' && this.score >= 2000);
    check('grav_master',  this.gravTimeInFlip >= 30);
    check('dark_survivor',this.darkTime >= 60);
  }

  _checkSecretSkins() {
    if (this.elapsed >= 180 && this.lvlMgr.level >= 20) {
      if (this.skinMgr.unlock('void'))
        this._showToast('👁', 'VOID SKIN UNLOCKED', 'Secret skin revealed!');
    }
    if (this.darkTime >= 60 && this.lvlMgr.level >= 40) {
      if (this.skinMgr.unlock('dark_matter'))
        this._showToast('🌑', 'DARK MATTER UNLOCKED', 'Secret skin revealed!');
    }
    if (this.lvlMgr.level >= 60) {
      if (this.skinMgr.unlock('shadow'))
        this._showToast('🌚', 'SHADOW LORD UNLOCKED', 'Secret skin revealed!');
    }
  }

  // ---- SPECIAL EVENTS ----
  _triggerSpecialEvent() {
    const pool = SPECIAL_EVENTS.filter(e => e.id !== this.activeEvent?.id);
    const ev = pool[Math.floor(Math.random() * pool.length)];
    this.activeEvent = ev;
    this.eventTimer = ev.duration;
    this.eventCooldown = 30 + Math.random() * 30;

    this.audio.playEvent();
    vibrate([50, 30, 50]);

    if (ev.id === 'double_coins')  this.doubleCoins = true;
    if (ev.id === 'xp_boost')     this.xp2ThisRun = true;
    if (ev.id === 'score_rush')   this.scoreMultiplier = 3;
    if (ev.id === 'shield')       { this.shield = true; this.shieldHits = 1; }

    // Notification toast
    const toast = document.getElementById('special-event-toast');
    toast.textContent = ev.name + ' ' + ev.desc;
    toast.classList.remove('hidden');
    toast.style.animation = 'none'; void toast.offsetWidth;
    toast.style.animation = 'toastSlide 3s ease forwards';
    clearTimeout(this._eventToastTimer);
    this._eventToastTimer = setTimeout(() => toast.classList.add('hidden'), 3100);

    // HUD banner
    const banner = document.getElementById('event-banner');
    banner.textContent = ev.name;
    banner.classList.remove('hidden');
  }

  _endEvent() {
    if (!this.activeEvent) return;
    if (this.activeEvent.id === 'double_coins')  this.doubleCoins = false;
    if (this.activeEvent.id === 'score_rush')    this.scoreMultiplier = 1;
    this.activeEvent = null;
    document.getElementById('event-banner').classList.add('hidden');
  }

  // ---- RULES ----
  _triggerRuleChange() {
    const pool = RULES.filter(r => r.id !== 'normal' && r.id !== this.currentRule.id);
    this.currentRule = pool[Math.floor(Math.random() * pool.length)];
    this.ruleChangeCount++;
    this.ruleTimer = 0;
    this._applyRule(this.currentRule);
    this._showRuleNotification(this.currentRule);
    this.audio.playRuleChange();
    this.shakeStrength = this.currentRule.id === 'screen_shake' ? 14 : 5;
    vibrate([80]);
  }

  _applyRule(r) {
    if (!this.player) return;
    switch (r.id) {
      case 'tiny': this.player.size = this.player.baseSize * 0.52; break;
      case 'big':  this.player.size = this.player.baseSize * 1.65; break;
      default:     this.player.size = this.player.baseSize; break;
    }
  }

  _showRuleNotification(r) {
    const el  = document.getElementById('rule-notification');
    const txt = document.getElementById('rule-notification-text');
    txt.textContent = r.name + (r.desc ? '\n' + r.desc : '');
    el.classList.remove('hidden');
    el.style.animation = 'none'; void el.offsetWidth;
    el.style.animation = 'ruleShow 2.5s ease forwards';
    clearTimeout(this._ruleTimer2);
    this._ruleTimer2 = setTimeout(() => el.classList.add('hidden'), 2600);
  }

  _updateRuleLabel() {
    const lbl = document.getElementById('rule-label');
    if (this.currentRule.id === 'normal')
      lbl.textContent = 'CHANGE IN ' + Math.ceil(this.ruleInterval - this.ruleTimer) + 's';
    else
      lbl.textContent = this.currentRule.name;
  }

  // ---- MAIN LOOP ----
  _loop(ts) {
    requestAnimationFrame(t => this._loop(t));
    const rawDt = Math.min((ts - this.lastTime) / 1000, 0.05);
    this.lastTime = ts;

    let dt = rawDt;
    if (this.currentRule.id === 'slow_motion') dt *= 0.38;
    if (this.currentRule.id === 'speed_boost') dt *= 1.5;

    this.colorHue = (this.colorHue + 28 * rawDt) % 360;

    if (this.state === 'playing') this._update(dt, rawDt);
    this._render(rawDt);
  }

  // ---- UPDATE ----
  _update(dt, rawDt) {
    this.elapsed += rawDt;
    this.difficultyLevel = 1 + this.elapsed * 0.025;

    // Score
    const comboBonus = 1 + this.combo * 0.08;
    this.score += Math.floor(8 * dt * this.difficultyLevel * comboBonus * this.scoreMultiplier);

    // Rule timer
    this.ruleTimer += rawDt;
    const rulePct = Math.min(1, this.ruleTimer / this.ruleInterval);
    document.getElementById('rule-timer-fill').style.width = ((1 - rulePct) * 100) + '%';
    if (this.ruleTimer >= this.ruleInterval) this._triggerRuleChange();
    this._updateRuleLabel();

    // Track secret achievement timers
    if (this.currentRule.id === 'gravity_flip') this.gravTimeInFlip += rawDt;
    if (this.currentRule.id === 'dark')         this.darkTime += rawDt;
    if (this.currentRule.id === 'speed_boost')  this.speedBoostScore = Math.max(this.speedBoostScore, this.score);

    // Special events
    this.eventCooldown -= rawDt;
    if (this.activeEvent) {
      this.eventTimer -= rawDt;
      if (this.eventTimer <= 0) this._endEvent();
    } else if (this.eventCooldown <= 0) {
      this._triggerSpecialEvent();
    }

    // Coin rain
    if (this.activeEvent?.id === 'coin_rain') {
      this.coinRainTimer -= rawDt;
      if (this.coinRainTimer <= 0) {
        this.coinRainTimer = 0.35;
        for (let i = 0; i < 3; i++) {
          this.coinItems.push({
            x: this.W + 20 + Math.random() * 200,
            y: this.H * 0.1 + Math.random() * this.H * 0.75,
            r: 10, speed: 200, collected: false, glimmer: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    // Combo decay
    this.comboTimer += rawDt;
    if (this.comboTimer > 3.5) { this.combo = 0; this.comboTimer = 0; }

    // Screen shake
    if (this.shakeStrength > 0) {
      this.screenShakeX = (Math.random()-0.5) * this.shakeStrength * 2;
      this.screenShakeY = (Math.random()-0.5) * this.shakeStrength * 2;
      this.shakeStrength = Math.max(0, this.shakeStrength - 55*rawDt);
    } else if (this.currentRule.id === 'screen_shake') {
      this.screenShakeX = (Math.random()-0.5) * 7;
      this.screenShakeY = (Math.random()-0.5) * 7;
    } else {
      this.screenShakeX = 0; this.screenShakeY = 0;
    }

    // Audio intensity
    const intensity = Math.min(1, (this.difficultyLevel - 1) / 4);
    this.audio.setIntensity(intensity);

    this._updatePlayer(dt);
    this._spawnObstacles(dt);
    this._updateObstacles(dt);
    this._spawnCoins(dt);
    this._updateCoins(dt);
    this._updateParticles(rawDt);
    this._checkCollisions();
    this._updateHUD();
    this._checkAllAchievements();
  }

  _updatePlayer(dt) {
    const p = this.player;
    const gravDir = this.currentRule.id === 'gravity_flip' ? -1 : 1;
    p.vy += 1600 * gravDir * dt;
    p.y  += p.vy * dt;

    const floor = this.H - p.size, ceil = p.size;
    if (gravDir > 0) {
      if (p.y >= floor) { p.y = floor; p.vy = 0; }
      if (p.y <= ceil)  { p.y = ceil;  p.vy = 0; }
    } else {
      if (p.y <= ceil)  { p.y = ceil;  p.vy = 0; }
      if (p.y >= floor) { p.y = floor; p.vy = 0; }
    }

    // Glowing trail
    p.trail = p.trail || [];
    p.trail.push({ x: p.x, y: p.y });
    if (p.trail.length > 16) p.trail.shift();
  }

  // ---- OBSTACLES ----
  _spawnObstacles(dt) {
    const interval = Math.max(0.55, 2.0 - this.difficultyLevel * 0.12);
    this.obstacleSpawnTimer += dt;
    if (this.obstacleSpawnTimer < interval) return;
    this.obstacleSpawnTimer = 0;

    const W = this.W, H = this.H;
    const w = 20 + Math.random() * 14;
    const gap = H * 0.28 + Math.random() * H * 0.08;
    const topH = 30 + Math.random() * (H - gap - 60);

    const theme = this.skinMgr.getObsTheme(this.lvlMgr.level);
    const speedMult =
      (this.currentRule.id === 'obstacle_fast' ? 1.75 : 1) *
      (this.currentRule.id === 'speed_boost'   ? 1.4  : 1) *
      (this.currentRule.id === 'slow_motion'   ? 0.42 : 1);
    const speed = (190 + this.difficultyLevel * 28) * speedMult;

    this.obstacles.push({ x:W+w, y:0,          w, h:topH,           speed, theme, flicker:0 });
    this.obstacles.push({ x:W+w, y:topH+gap,   w, h:H-topH-gap,     speed, theme, flicker:0 });

    // Random middle barrier (rarer at high difficulty to keep it fair)
    if (Math.random() < 0.15 && gap > H * 0.32) {
      const mh = 18 + Math.random() * 22;
      const my = topH + gap * 0.35 + Math.random() * gap * 0.2;
      if (my + mh < topH + gap * 0.75)
        this.obstacles.push({ x:W+w, y:my, w:w*0.7, h:mh, speed:speed*1.1, theme, flicker:0 });
    }
  }

  _updateObstacles(dt) {
    for (const o of this.obstacles) {
      o.x += (this.currentRule.id === 'mirror' ? o.speed : -o.speed) * dt;
      // Ghost mode: obstacles flicker opacity
      if (this.currentRule.id === 'ghost') o.flicker = (o.flicker + dt*6) % (Math.PI*2);
    }
    this.obstacles = this.obstacles.filter(o => o.x + o.w > -80 && o.x < this.W + 80);
  }

  // ---- COINS ----
  _spawnCoins(dt) {
    if (this.activeEvent?.id === 'coin_rain') return; // handled separately
    this.coinSpawnTimer += dt;
    const interval = Math.max(1.0, 2.8 - this.difficultyLevel * 0.08);
    if (this.coinSpawnTimer < interval) return;
    this.coinSpawnTimer = 0;

    const count = 1 + (Math.random() < 0.35 ? 1 : 0);
    for (let i = 0; i < count; i++) {
      this.coinItems.push({
        x: this.W + 30 + i*45, y: this.H*0.15 + Math.random()*this.H*0.65,
        r: 10, speed: 170 + this.difficultyLevel*18,
        collected:false, glimmer: Math.random()*Math.PI*2,
      });
    }
  }

  _updateCoins(dt) {
    for (const c of this.coinItems) {
      c.x -= c.speed * dt;
      c.glimmer += dt * 4.5;
      if (this.currentRule.id === 'magnetic' && this.player) {
        const dx = this.player.x - c.x, dy = this.player.y - c.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 220) { c.x += (dx/dist)*320*dt; c.y += (dy/dist)*320*dt; }
      }
    }
    this.coinItems = this.coinItems.filter(c => !c.collected && c.x + c.r > -30);
  }

  // ---- PARTICLES ----
  _updateParticles(dt) {
    for (const p of this.particles) p.update(dt);
    for (const f of this.floatTexts) f.update(dt);
    this.particles = this.particles.filter(p => p.life > 0);
    this.floatTexts = this.floatTexts.filter(f => f.life > 0);
  }

  // ---- COLLISION ----
  _checkCollisions() {
    if (!this.player) return;
    const p = this.player, hs = p.size * 0.68;

    for (const c of this.coinItems) {
      if (c.collected) continue;
      const dx = p.x - c.x, dy = p.y - c.y;
      if (Math.sqrt(dx*dx + dy*dy) < hs + c.r) {
        c.collected = true;
        const coinVal = this.doubleCoins ? 2 : 1;
        this.coins += coinVal;
        this.combo++;
        this.maxCombo = Math.max(this.maxCombo, this.combo);
        this.comboTimer = 0;

        this.audio.playCoin();
        if (this.combo >= 5) { this.audio.playCombo(this.combo); vibrate([30]); }

        // Screen flash on high combo
        if (this.combo >= 10) this.shakeStrength = Math.max(this.shakeStrength, 3);

        // Particles
        const skin = this.skinMgr.getSkin();
        for (let i = 0; i < 8; i++) {
          this.particles.push(new Particle(c.x, c.y,
            (Math.random()-0.5)*200, (Math.random()-0.5)*200,
            '#ffd60a', 0.55));
        }
        // Float text
        const txt = this.combo >= 5 ? `x${this.combo} ◈+${coinVal}` : `◈+${coinVal}`;
        this.floatTexts.push(new FloatText(c.x, c.y - 10, txt, '#ffd60a'));

        this.missions.updateRun({ score:this.score, coins:this.coins, time:this.elapsed, combo:this.combo, rules:this.ruleChangeCount, scoreCum:this.stats.totalScore, coinsCum:this.stats.totalCoins+this.coins, timeCum:this.elapsed, games:this.stats.gamesPlayed });
      }
    }

    // Obstacle collision
    for (const o of this.obstacles) {
      const ghost = this.currentRule.id === 'ghost' && Math.sin(o.flicker) < 0;
      if (ghost) continue;
      if (p.x+hs > o.x && p.x-hs < o.x+o.w && p.y+hs > o.y && p.y-hs < o.y+o.h) {
        this._die(); return;
      }
    }

    if (p.y > this.H + 100 || p.y < -100) { this._die(); return; }
  }

  // ---- HUD UPDATE ----
  _updateHUD() {
    document.getElementById('score').textContent   = this.score;
    document.getElementById('hud-coins').textContent = this.coins;

    const combo = document.getElementById('combo-display');
    if (this.combo >= 2) {
      document.getElementById('combo-text').textContent = 'x' + this.combo;
      combo.style.display = 'flex';
    } else {
      combo.style.display = 'none';
    }

    const xpPct = this.lvlMgr.getProgressPct() * 100;
    document.getElementById('xp-bar-fill').style.width = xpPct + '%';
    document.getElementById('hud-level').textContent   = 'LV ' + this.lvlMgr.level;
    document.getElementById('hud-xp-text').textContent = this.lvlMgr.xp + '/' + this.lvlMgr.xpToNext;
  }

  _updateMenuUI() {
    document.getElementById('menu-level').textContent = this.lvlMgr.level;
    document.getElementById('best-score-val').textContent = this.stats.highScore;
    document.getElementById('player-xp-fill').style.width = (this.lvlMgr.getProgressPct()*100) + '%';

    const dailyBtn = document.getElementById('daily-reward-btn');
    dailyBtn.classList.toggle('hidden', !this.daily.isAvailable());

    // Wheel button highlight
    const wheelBtn = document.getElementById('wheel-btn');
    wheelBtn.style.borderColor = this.wheel.canSpin() ? 'rgba(255,214,10,0.6)' : 'rgba(255,255,255,0.12)';
  }

  // ---- RENDER ----
  _render(rawDt) {
    const ctx = this.ctx;
    const W = this.W, H = this.H;
    const isDark   = this.currentRule.id === 'dark';
    const isMirror = this.currentRule.id === 'mirror';

    ctx.save();
    ctx.translate(this.screenShakeX, this.screenShakeY);
    if (isMirror) { ctx.translate(W, 0); ctx.scale(-1,1); }

    // Background
    ctx.fillStyle = isDark ? '#000008' : '#050510';
    ctx.fillRect(0,0,W,H);

    // Grid
    if (!isDark) {
      ctx.strokeStyle = 'rgba(0,245,255,0.04)'; ctx.lineWidth = 1;
      const gs = 60, off = (this.elapsed*35) % gs;
      for (let x = -off; x < W+gs; x+=gs) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y+=gs)        { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
    }

    // Stars
    if (!isDark) {
      for (const s of this.bgStars) {
        s.twinkle += rawDt * 2;
        const spd = this.state === 'playing' ? (1 + (this.difficultyLevel-1)*0.2) : 0.15;
        s.x -= s.speed * spd;
        if (s.x < 0) { s.x = W + 10; s.y = Math.random() * H; }
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y % H, s.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      }
    }

    // Obstacles
    for (const o of this.obstacles) {
      const ghostAlpha = this.currentRule.id === 'ghost'
        ? 0.3 + 0.7 * ((Math.sin(o.flicker)+1)/2) : 1;
      ctx.save();
      ctx.globalAlpha = ghostAlpha;

      let topC, botC, glowC;
      if (o.theme?.id === 'fire') {
        topC='#ff6b35'; botC='#cc2200'; glowC='#ff4500';
      } else if (o.theme?.id === 'ice') {
        topC='#48cae4'; botC='#0077b6'; glowC='#00bfff';
      } else if (o.theme?.id === 'void') {
        topC='#6200ea'; botC='#310052'; glowC='#6200ea';
      } else if (o.theme?.id === 'cosmic') {
        const h2 = (this.colorHue + o.x*0.5) % 360;
        topC=`hsl(${h2},100%,60%)`; botC=`hsl(${(h2+60)%360},100%,40%)`; glowC=topC;
      } else {
        topC='#ff2d78'; botC='#cc0055'; glowC='#ff2d78';
      }

      const grd = ctx.createLinearGradient(o.x, o.y, o.x+o.w, o.y+o.h);
      grd.addColorStop(0, topC); grd.addColorStop(1, botC);
      ctx.fillStyle = grd;
      ctx.shadowBlur = 14; ctx.shadowColor = glowC;
      ctx.beginPath(); ctx.roundRect(o.x, o.y, o.w, o.h, 4); ctx.fill();

      // Shield tint on obstacle if player has shield
      if (this.shield) {
        ctx.globalAlpha *= 0.5;
        ctx.fillStyle = 'rgba(0,245,255,0.2)';
        ctx.beginPath(); ctx.roundRect(o.x,o.y,o.w,o.h,4); ctx.fill();
      }
      ctx.restore();
    }
    ctx.shadowBlur = 0;

    // Coins
    for (const c of this.coinItems) {
      if (c.collected) continue;
      const pulse = Math.sin(c.glimmer) * 0.3 + 0.7;
      ctx.save();
      ctx.shadowBlur = 16 * pulse; ctx.shadowColor = '#ffd60a';
      ctx.fillStyle = `rgba(255,214,10,${0.85*pulse+0.15})`;
      ctx.beginPath(); ctx.arc(c.x, c.y, c.r, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = `rgba(255,255,200,${0.5*pulse})`;
      ctx.beginPath(); ctx.arc(c.x-c.r*0.25, c.y-c.r*0.25, c.r*0.38, 0, Math.PI*2); ctx.fill();
      // Double coins indicator
      if (this.doubleCoins) {
        ctx.fillStyle = '#fff';
        ctx.font = `bold 8px Orbitron,monospace`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
        ctx.fillText('x2', c.x, c.y - c.r - 2);
      }
      ctx.restore();
    }

    // Player
    if (this.player && this.state !== 'gameover') this._renderPlayer(ctx);

    // Float texts
    for (const f of this.floatTexts) f.draw(ctx);

    // Particles
    for (const p of this.particles) p.draw(ctx);

    // Dark vignette
    if (isDark && this.player) {
      const grd = ctx.createRadialGradient(this.player.x, this.player.y, 55, this.player.x, this.player.y, 340);
      grd.addColorStop(0, 'rgba(0,0,0,0)');
      grd.addColorStop(1, 'rgba(0,0,8,0.98)');
      ctx.fillStyle = grd; ctx.fillRect(0,0,W,H);
    }

    if (isMirror) ctx.restore();
    ctx.restore();
  }

  _renderPlayer(ctx) {
    const p = this.player;
    const skin = this.skinMgr.getSkin();

    // Trail — unique per skin type
    for (let i = 0; i < p.trail.length - 1; i++) {
      const t = p.trail[i];
      const frac = i / p.trail.length;
      const sz = p.size * 0.55 * frac;
      ctx.save();
      ctx.globalAlpha = frac * 0.45;
      ctx.shadowBlur = 10;
      ctx.shadowColor = skin.id === 'rainbow'
        ? `hsl(${(this.colorHue + i*10) % 360},100%,65%)` : skin.glow;
      ctx.fillStyle = skin.id === 'rainbow'
        ? `hsl(${(this.colorHue + i*10) % 360},100%,65%)` : skin.glow;
      ctx.beginPath();
      ctx.roundRect(t.x - sz/2, t.y - sz/2, sz, sz, 3);
      ctx.fill();
      ctx.restore();
    }

    // Main cube
    const s = p.size;
    let topColor = skin.gradient[0], botColor = skin.gradient[1] || skin.gradient[0];
    let glowC = skin.glow;

    if (skin.id === 'rainbow') {
      topColor = `hsl(${this.colorHue % 360},100%,65%)`;
      botColor = `hsl(${(this.colorHue+60) % 360},100%,65%)`;
      glowC = topColor;
    } else if (skin.id === 'cosmic') {
      const h2 = (this.colorHue * 0.7) % 360;
      topColor = `hsl(${h2},80%,65%)`; botColor = `hsl(${(h2+120)%360},80%,50%)`;
    } else if (skin.id === 'ultimate') {
      topColor = `hsl(${this.colorHue%360},100%,70%)`;
      botColor = `hsl(${(this.colorHue+90)%360},100%,50%)`;
      glowC = topColor;
    } else if (skin.id === 'prism') {
      const h3 = (this.colorHue * 1.5) % 360;
      topColor = `hsl(${h3},100%,75%)`; botColor = `hsl(${(h3+180)%360},100%,55%)`;
      glowC = topColor;
    }

    ctx.save();
    ctx.shadowBlur = 28 + Math.sin(this.elapsed * 4) * 6;
    ctx.shadowColor = glowC;

    const grd = ctx.createLinearGradient(p.x-s/2, p.y-s/2, p.x+s/2, p.y+s/2);
    grd.addColorStop(0, topColor);
    grd.addColorStop(1, botColor);
    ctx.fillStyle = grd;
    ctx.beginPath(); ctx.roundRect(p.x-s/2, p.y-s/2, s, s, 6); ctx.fill();

    // Shield ring
    if (this.shield) {
      ctx.strokeStyle = 'rgba(0,245,255,0.7)';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 15; ctx.shadowColor = '#00f5ff';
      ctx.beginPath();
      ctx.arc(p.x, p.y, s * 0.85 + Math.sin(this.elapsed*6)*3, 0, Math.PI*2);
      ctx.stroke();
    }

    // Specular highlight
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = 'rgba(255,255,255,0.28)';
    ctx.beginPath(); ctx.roundRect(p.x-s/2+4, p.y-s/2+4, s*0.38, s*0.22, 3); ctx.fill();
    ctx.restore();
  }

  // ---- MISSION PROGRESS on gameover ----
  _renderMissionProgress() {
    const list = document.getElementById('mission-progress-list');
    list.innerHTML = '';
    const allMissions = [...DAILY_MISSIONS, ...WEEKLY_MISSIONS.slice(0,2)];
    allMissions.forEach(m => {
      const state = (this.missions.daily[m.id] || this.missions.weekly[m.id]) || { progress:0, completed:false };
      const prog = Math.min(state.progress ?? 0, m.goal);
      const pct = (prog / m.goal) * 100;
      const div = document.createElement('div');
      div.className = 'mission-progress-item' + (state.completed ? ' completed' : '');
      div.innerHTML = `<span>${m.title}</span><div class="mission-bar"><div class="mission-bar-fill" style="width:${pct}%"></div></div>`;
      list.appendChild(div);
    });
  }

  // ---- TOAST ----
  _showToast(icon, title, desc) {
    clearTimeout(this._toastChain);
    const toast = document.getElementById('achievement-toast');
    toast.querySelector('.achievement-icon').textContent = icon;
    toast.querySelector('.achievement-name').textContent = title;
    toast.querySelector('.achievement-desc').textContent = desc;
    toast.classList.remove('hidden');
    toast.style.animation = 'none'; void toast.offsetWidth;
    toast.style.animation = 'toastIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275)';
    this._toastChain = setTimeout(() => toast.classList.add('hidden'), 3500);
  }

  // ================================================================
  //  UI SETUP
  // ================================================================
  _setupUI() {
    // ---- Start Screen ----
    document.getElementById('play-btn').addEventListener('click', () => {
      if (this.state === 'menu') this._beginCountdown();
    });
    document.getElementById('shop-btn').addEventListener('click',     () => this._openShop());
    document.getElementById('missions-btn').addEventListener('click', () => this._openMissions());
    document.getElementById('wheel-btn').addEventListener('click',    () => this._openWheel());
    document.getElementById('stats-btn').addEventListener('click',    () => this._openStats());
    document.getElementById('daily-reward-btn').addEventListener('click', () => this._openDaily());

    // ---- Pause ----
    document.getElementById('pause-btn').addEventListener('click',    () => this._togglePause());
    document.getElementById('resume-btn').addEventListener('click',   () => this._togglePause());
    document.getElementById('restart-btn').addEventListener('click',  () => {
      document.getElementById('pause-menu').classList.add('hidden');
      this._beginCountdown();
    });
    document.getElementById('pause-shop-btn').addEventListener('click', () => {
      document.getElementById('pause-menu').classList.add('hidden');
      this._openShop('pause');
    });
    document.getElementById('home-btn').addEventListener('click', () => {
      this.state = 'menu';
      this.audio.stopBGM();
      document.getElementById('pause-menu').classList.add('hidden');
      document.getElementById('hud').classList.add('hidden');
      document.getElementById('start-screen').classList.remove('hidden');
      this._updateMenuUI();
    });

    // ---- Game Over ----
    document.getElementById('gameover-restart-btn').addEventListener('click', () => {
      document.getElementById('game-over').classList.add('hidden');
      this.state = 'menu';
      this._beginCountdown();
    });
    document.getElementById('gameover-shop-btn').addEventListener('click', () => {
      document.getElementById('game-over').classList.add('hidden');
      this._openShop('gameover');
    });
    document.getElementById('gameover-home-btn').addEventListener('click', () => {
      document.getElementById('game-over').classList.add('hidden');
      document.getElementById('start-screen').classList.remove('hidden');
      this.state = 'menu'; this._updateMenuUI();
    });

    // ---- Level Up ----
    document.getElementById('levelup-ok').addEventListener('click', () => {
      document.getElementById('levelup-modal').classList.add('hidden');
      this._updateMenuUI();
    });

    // ---- Shop ----
    document.getElementById('close-shop-btn').addEventListener('click', () => this._closeModal('shop-modal'));
    document.querySelectorAll('.shop-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.shop-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this._renderShop(btn.dataset.tab);
      });
    });

    // ---- Missions ----
    document.getElementById('close-missions-btn').addEventListener('click', () => this._closeModal('missions-modal'));
    document.querySelectorAll('.missions-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.missions-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelectorAll('.missions-panel').forEach(p => p.classList.remove('active-panel'));
        document.getElementById(btn.dataset.tab + '-missions-panel').classList.add('active-panel');
        if (btn.dataset.tab === 'achievements') document.getElementById('achievements-panel').classList.add('active-panel');
      });
    });

    // ---- Daily ----
    document.getElementById('claim-reward-btn').addEventListener('click', () => {
      const reward = this.daily.claim();
      this.wallet.add(reward.coins);
      if (reward.xp) this.lvlMgr.addXP(reward.xp);
      if (reward.day === 7) {
        // Day 7: unlock a random locked skin
        const locked = SKINS.filter(s => !s.secret && !this.skinMgr.isUnlocked(s.id));
        if (locked.length) {
          const pick = locked[Math.floor(Math.random()*locked.length)];
          this.skinMgr.unlock(pick.id);
          this._showToast('🎁', pick.name + ' UNLOCKED!', 'Day 7 reward!');
        }
      }
      this.audio.playAchievement();
      this._closeModal('daily-modal');
      this._updateMenuUI();
    });

    // ---- Wheel ----
    document.getElementById('close-wheel-btn').addEventListener('click', () => this._closeModal('wheel-modal'));
    document.getElementById('spin-btn').addEventListener('click', () => this._doSpin());

    // ---- Stats ----
    document.getElementById('close-stats-btn').addEventListener('click', () => this._closeModal('stats-modal'));
  }

  _closeModal(id, returnTo = null) {
    document.getElementById(id).classList.add('hidden');
    if (returnTo) {
      document.getElementById(returnTo).classList.remove('hidden');
    } else if (this.state === 'paused') {
      document.getElementById('pause-menu').classList.remove('hidden');
    } else if (this.state === 'gameover') {
      document.getElementById('game-over').classList.remove('hidden');
    } else {
      this.state = 'menu';
      document.getElementById('start-screen').classList.remove('hidden');
      this._updateMenuUI();
    }
  }

  // ---- SHOP ----
  _openShop(from = null) {
    this._hideAll();
    this._from = from;
    document.getElementById('shop-level').textContent = this.lvlMgr.level;
    document.getElementById('shop-coins').textContent = this.wallet.coins;
    this._renderShop('all');
    document.getElementById('shop-modal').classList.remove('hidden');
  }

  _renderShop(tab = 'all') {
    document.getElementById('shop-coins').textContent = this.wallet.coins;
    const grid = document.getElementById('skin-grid');
    grid.innerHTML = '';

    let skinList = SKINS;
    if (tab === 'owned')  skinList = SKINS.filter(s => this.skinMgr.isUnlocked(s.id));
    if (tab === 'locked') skinList = SKINS.filter(s => !this.skinMgr.isUnlocked(s.id));

    skinList.forEach(skin => {
      const unlocked = this.skinMgr.isUnlocked(skin.id);
      const equipped  = this.skinMgr.equipped === skin.id;
      const levelOk  = this.lvlMgr.level >= skin.minLevel;
      const canBuy   = !skin.secret && levelOk && !unlocked;

      const card = document.createElement('div');
      card.className = 'skin-card' +
        (equipped ? ' equipped' : '') +
        (!unlocked ? ' locked' : '') +
        (skin.secret ? ' secret' : '');

      // Preview canvas
      const cv = document.createElement('canvas');
      cv.className = 'skin-preview'; cv.width=88; cv.height=88;
      const pctx = cv.getContext('2d');
      pctx.fillStyle = '#0a0a20'; pctx.fillRect(0,0,88,88);
      pctx.shadowBlur = 20; pctx.shadowColor = skin.glow;
      if (skin.id === 'rainbow' || skin.id === 'ultimate' || skin.id === 'cosmic' || skin.id === 'prism') {
        const g = pctx.createLinearGradient(14,14,74,74);
        skin.gradient.forEach((c,i) => g.addColorStop(i/(skin.gradient.length-1), c));
        pctx.fillStyle = g;
      } else {
        const g = pctx.createLinearGradient(14,14,74,74);
        g.addColorStop(0, skin.gradient[0]); g.addColorStop(1, skin.gradient[1]||skin.gradient[0]);
        pctx.fillStyle = g;
      }
      pctx.beginPath(); pctx.roundRect(14,14,60,60,10); pctx.fill();
      card.appendChild(cv);

      const nameEl = document.createElement('div');
      nameEl.className = 'skin-name';
      nameEl.textContent = skin.secret && !unlocked ? '???' : skin.name;
      card.appendChild(nameEl);

      if (equipped) {
        const badge = document.createElement('span');
        badge.className = 'skin-equipped-badge'; badge.textContent = '✓';
        card.appendChild(badge);
      }
      if (skin.secret) {
        const sb = document.createElement('span');
        sb.className = 'skin-secret-badge'; sb.textContent = '🔒';
        if (unlocked) sb.textContent = '🔓';
        card.appendChild(sb);
      }

      if (!unlocked) {
        const info = document.createElement('div');
        info.className = 'skin-lock-info';
        if (skin.secret) {
          info.textContent = unlocked ? 'UNLOCKED' : skin.hint;
        } else if (!levelOk) {
          info.textContent = `LV ${skin.minLevel} REQUIRED`;
        } else {
          info.textContent = `◈ ${skin.price}`;
          info.style.color = this.wallet.coins >= skin.price ? '#ffd60a' : '#ff2d78';
        }
        card.appendChild(info);

        if (canBuy) {
          card.addEventListener('click', () => {
            if (this.wallet.spend(skin.price)) {
              this.stats.totalCoinsSpent += skin.price; this.stats.save();
              this.skinMgr.unlock(skin.id);
              this._checkAllAchievements();
              this._renderShop(tab);
              this.audio.playAchievement();
              vibrate([50, 30, 100]);
            } else {
              card.style.borderColor = 'rgba(255,45,120,0.7)';
              setTimeout(() => { card.style.borderColor = ''; }, 500);
            }
          });
        }
      } else if (!equipped) {
        const eq = document.createElement('div');
        eq.className = 'skin-price'; eq.style.color = 'rgba(255,255,255,0.4)';
        eq.textContent = 'TAP TO EQUIP';
        card.appendChild(eq);
        card.addEventListener('click', () => {
          this.skinMgr.equip(skin.id);
          this._renderShop(tab);
          vibrate([30]);
        });
      }

      // Obs theme selector (for equipped skins only, show theme row at top)
      grid.appendChild(card);
    });

    // Obstacle theme selector
    const avail = OBS_THEMES.filter(t => t.minLevel <= this.lvlMgr.level);
    if (avail.length > 1) {
      const heading = document.createElement('div');
      heading.style.cssText = 'grid-column:1/-1;font-family:Orbitron,monospace;font-size:10px;color:rgba(255,255,255,0.4);letter-spacing:2px;text-align:center;margin-top:8px';
      heading.textContent = '— OBSTACLE THEMES —';
      grid.appendChild(heading);

      avail.forEach(theme => {
        const tc = document.createElement('div');
        const sel = this.skinMgr.getSelectedTheme() === theme.id;
        tc.className = 'skin-card' + (sel ? ' equipped' : '');
        tc.style.cursor = 'pointer';

        const cv2 = document.createElement('canvas');
        cv2.className = 'skin-preview'; cv2.width=88; cv2.height=88;
        const pctx2 = cv2.getContext('2d');
        pctx2.fillStyle = '#0a0a20'; pctx2.fillRect(0,0,88,88);
        if (theme.colors) {
          const g = pctx2.createLinearGradient(14,14,74,74);
          g.addColorStop(0, theme.colors[0]); g.addColorStop(1, theme.colors[1]);
          pctx2.fillStyle = g;
        } else {
          pctx2.fillStyle = `hsl(${Date.now()/50 % 360},80%,55%)`;
        }
        pctx2.shadowBlur = 15; pctx2.shadowColor = theme.glow;
        pctx2.beginPath(); pctx2.roundRect(14,14,60,60,10); pctx2.fill();
        tc.appendChild(cv2);

        const tn = document.createElement('div'); tn.className='skin-name';
        tn.textContent = theme.name; tc.appendChild(tn);
        if (sel) { const b=document.createElement('span'); b.className='skin-equipped-badge'; b.textContent='✓'; tc.appendChild(b); }

        tc.addEventListener('click', () => { this.skinMgr.setObsTheme(theme.id); this._renderShop(tab); });
        grid.appendChild(tc);
      });
    }
  }

  // ---- MISSIONS MODAL ----
  _openMissions() {
    this._hideAll();
    this._renderMissionsModal();
    document.getElementById('missions-modal').classList.remove('hidden');
  }

  _renderMissionsModal() {
    // Daily
    const dp = document.getElementById('daily-missions-panel');
    dp.innerHTML = '';
    DAILY_MISSIONS.forEach(m => {
      const st = this.missions.daily[m.id] || { progress:0, completed:false };
      const prog = Math.min(st.progress??0, m.goal);
      const pct  = (prog/m.goal)*100;
      const div  = document.createElement('div');
      div.className = 'mission-item' + (st.completed ? ' completed' : '');
      div.innerHTML = `
        <div class="mission-title">${m.title} ${st.completed?'✓':''}</div>
        <div class="mission-desc-text">${m.desc}</div>
        <div class="mission-progress-bar"><div class="mission-progress-fill" style="width:${pct}%"></div></div>
        <div class="mission-reward-row">
          <span class="mission-reward">◈ ${m.reward}</span>
          <span class="mission-prog-text">${prog}/${m.goal}</span>
        </div>`;
      dp.appendChild(div);
    });

    // Weekly
    const wp = document.getElementById('weekly-missions-panel');
    wp.innerHTML = '';
    WEEKLY_MISSIONS.forEach(m => {
      const st = this.missions.weekly[m.id] || { progress:0, completed:false };
      const prog = Math.min(st.progress??0, m.goal);
      const pct  = (prog/m.goal)*100;
      const div  = document.createElement('div');
      div.className = 'mission-item weekly' + (st.completed ? ' completed' : '');
      div.innerHTML = `
        <div class="mission-title">${m.title} ${st.completed?'✓':''}</div>
        <div class="mission-desc-text">${m.desc}</div>
        <div class="mission-progress-bar"><div class="mission-progress-fill" style="width:${pct}%"></div></div>
        <div class="mission-reward-row">
          <span class="mission-reward">◈ ${m.reward}</span>
          <span class="mission-prog-text">${prog}/${m.goal}</span>
        </div>`;
      wp.appendChild(div);
    });

    // Achievements
    const ap = document.getElementById('achievements-panel');
    ap.innerHTML = '';
    ACHIEVEMENTS.forEach(a => {
      const un = this.achMgr.isUnlocked(a.id);
      const div = document.createElement('div');
      div.className = 'achievement-item' + (un ? ' unlocked' : '') + (a.secret ? ' secret' : '');
      div.innerHTML = `
        <div class="ach-icon">${un ? a.icon : (a.secret ? '❓' : a.icon)}</div>
        <div class="ach-body">
          <div class="ach-title">${un || !a.secret ? a.title : '???'} ${un?'✓':''}</div>
          <div class="ach-desc">${un || !a.secret ? a.desc : 'Secret achievement'}</div>
        </div>`;
      ap.appendChild(div);
    });
  }

  // ---- DAILY ----
  _openDaily() {
    this._hideAll();
    const streak = this.daily.streak;
    document.getElementById('streak-count').textContent = streak + ' DAY STREAK';
    document.getElementById('streak-fire').textContent = streak >= 7 ? '🔥🔥🔥' : '🔥';

    const cal = document.getElementById('daily-calendar');
    cal.innerHTML = '';
    const todayIdx = (streak % 7); // today's index (0-6)
    DAILY_REWARDS.forEach((r, i) => {
      const card = document.createElement('div');
      const claimed = i < (streak % 7);
      const isToday = i === (todayIdx === 0 && streak > 0 ? 6 : (streak%7 === 0 && streak > 0 ? -1 : streak%7 - (streak>0?1:0)));
      const isTodayAlt = i === ((streak - 1 + 7) % 7) && this.daily.isAvailable();
      card.className = 'day-card' + (claimed ? ' claimed' : (isTodayAlt ? ' today' : ' future'));
      card.innerHTML = `<div class="day-num">DAY ${r.day}</div><div class="day-icon">${r.icon}</div><div class="day-reward">${r.day===7?'★':('◈'+r.coins)}</div>`;
      cal.appendChild(card);
    });

    const reward = DAILY_REWARDS[Math.max(0,streak%7)];
    document.getElementById('daily-reward-amount').textContent = '+' + reward.coins + (reward.xp ? ' + ' + reward.xp + 'XP' : '');
    document.getElementById('claim-reward-btn').disabled = !this.daily.isAvailable();
    document.getElementById('daily-modal').classList.remove('hidden');
  }

  // ---- LUCKY WHEEL ----
  _openWheel() {
    this._hideAll();
    const coolEl = document.getElementById('wheel-cooldown-display');
    const spinBtn = document.getElementById('spin-btn');
    const resultEl = document.getElementById('wheel-result');
    resultEl.classList.add('hidden');

    if (this.wheel.canSpin()) {
      coolEl.classList.add('hidden');
      spinBtn.disabled = false;
      spinBtn.classList.add('btn-pulse');
    } else {
      coolEl.textContent = this.wheel.cooldownText();
      coolEl.classList.remove('hidden');
      spinBtn.disabled = true;
      spinBtn.classList.remove('btn-pulse');
    }
    this._drawWheel(0);
    document.getElementById('wheel-modal').classList.remove('hidden');
  }

  _drawWheel(rotOffset) {
    const cv = document.getElementById('wheel-canvas');
    const ctx = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    const cx = W/2, cy = H/2, r = W/2 - 8;
    const total = WHEEL_PRIZES.reduce((s,p) => s+p.prob, 0);
    const colors = ['#1a1a3e','#12122e','#1e1040','#0e0e28','#141428','#18183a','#0c0c22','#161632'];

    ctx.clearRect(0,0,W,H);
    let angle = rotOffset;
    WHEEL_PRIZES.forEach((prize, i) => {
      const sweep = (prize.prob/total) * Math.PI*2;
      ctx.beginPath();
      ctx.moveTo(cx,cy);
      ctx.arc(cx,cy,r,angle,angle+sweep);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,245,255,0.25)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Label
      ctx.save();
      ctx.translate(cx,cy);
      ctx.rotate(angle + sweep/2);
      ctx.textAlign = 'right';
      ctx.font = `bold 11px Orbitron,monospace`;
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 6; ctx.shadowColor = '#00f5ff';
      ctx.fillText(prize.label, r-10, 4);
      ctx.restore();
      angle += sweep;
    });

    // Center cap
    ctx.beginPath(); ctx.arc(cx,cy,22,0,Math.PI*2);
    const cg = ctx.createRadialGradient(cx,cy,0,cx,cy,22);
    cg.addColorStop(0,'#00f5ff'); cg.addColorStop(1,'#0044aa');
    ctx.fillStyle = cg;
    ctx.shadowBlur = 15; ctx.shadowColor = '#00f5ff';
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  _doSpin() {
    if (!this.wheel.canSpin()) return;
    const spinBtn = document.getElementById('spin-btn');
    spinBtn.disabled = true; spinBtn.classList.remove('btn-pulse');
    this.stats.wheelSpins++; this.stats.save();
    this.audio.playSpin();
    vibrate([50]);

    const prize = this.wheel.spin();
    const total = WHEEL_PRIZES.reduce((s,p) => s+p.prob, 0);
    const prizeIdx = WHEEL_PRIZES.indexOf(prize);

    // Calculate angle to land on prize
    let targetAngle = 0;
    for (let i = 0; i < prizeIdx; i++) targetAngle += (WHEEL_PRIZES[i].prob/total)*Math.PI*2;
    targetAngle += (prize.prob/total)*Math.PI*2 * 0.5;

    const spins = 6 + Math.random() * 3;
    const totalAngle = spins*Math.PI*2 + (Math.PI*2 - targetAngle % (Math.PI*2));
    const dur = 4000;
    const start = performance.now();
    let lastRot = 0;

    const animate = (now) => {
      const t = Math.min(1, (now - start) / dur);
      const ease = 1 - Math.pow(1-t, 4);
      const rot = ease * totalAngle;
      this._drawWheel(rot);
      if (t < 1) { requestAnimationFrame(animate); }
      else {
        // Show result
        this._handleWheelPrize(prize);
      }
      lastRot = rot;
    };
    requestAnimationFrame(animate);
  }

  _handleWheelPrize(prize) {
    const resultEl = document.getElementById('wheel-result');
    let msg = '';

    if (prize.coins) { this.wallet.add(prize.coins); msg = `◈ ${prize.coins} COINS!`; }
    if (prize.xp)    { this.lvlMgr.addXP(prize.xp); msg = `+${prize.xp} XP!`; }
    if (prize.effect === 'xp2') { this.wheel.xp2Active = true; msg = '2x XP NEXT GAME!'; }
    if (prize.skinUnlock) {
      const locked = SKINS.filter(s => !s.secret && !this.skinMgr.isUnlocked(s.id) && this.lvlMgr.level >= s.minLevel);
      if (locked.length) {
        const pick = locked[Math.floor(Math.random()*locked.length)];
        this.skinMgr.unlock(pick.id);
        msg = `${pick.name} SKIN UNLOCKED!`;
        this._checkAllAchievements();
      } else { this.wallet.add(200); msg = '◈ 200 COINS (alt)'; }
    }

    if (prize.coins >= 500) {
      this.achMgr.unlock('wheel_jackpot');
      this._showToast('🎡','JACKPOT!','500 coins from the wheel!');
      this.audio.playLevelUp();
      vibrate([100,50,100,50,200]);
    } else {
      this.audio.playAchievement();
      vibrate([80]);
    }

    resultEl.textContent = '🎁 ' + msg;
    resultEl.classList.remove('hidden');
    document.getElementById('wheel-cooldown-display').textContent = this.wheel.cooldownText();
    document.getElementById('wheel-cooldown-display').classList.remove('hidden');
    this._updateMenuUI();
  }

  // ---- STATS ----
  _openStats() {
    this._hideAll();
    const grid = document.getElementById('stats-grid');
    grid.innerHTML = '';
    const items = [
      { icon:'🎮', label:'GAMES PLAYED',    value: this.stats.gamesPlayed },
      { icon:'⭐', label:'HIGH SCORE',       value: this.stats.highScore },
      { icon:'◈',  label:'TOTAL COINS',      value: this.stats.totalCoins },
      { icon:'⏱',  label:'LONGEST RUN',      value: Math.floor(this.stats.longestRun) + 's' },
      { icon:'🔥', label:'BEST COMBO',       value: 'x' + this.stats.highestCombo },
      { icon:'🏆', label:'ACHIEVEMENTS',     value: this.stats.achievementsUnlocked + '/' + ACHIEVEMENTS.length },
      { icon:'⚡', label:'TOTAL XP',         value: this.stats.totalXP },
      { icon:'🌀', label:'RULES SURVIVED',   value: this.stats.rulesLived },
      { icon:'📦', label:'TOTAL SCORE',      value: this.stats.totalScore },
      { icon:'🎡', label:'WHEEL SPINS',      value: this.stats.wheelSpins },
      { icon:'🎯', label:'CURRENT LEVEL',    value: 'LV ' + this.lvlMgr.level },
      { icon:'🔓', label:'SKINS OWNED',      value: this.skinMgr.unlocked.length + '/' + SKINS.length },
    ];
    items.forEach(it => {
      const card = document.createElement('div');
      card.className = 'stat-card';
      card.innerHTML = `<div class="stat-card-icon">${it.icon}</div><div class="stat-card-value">${it.value}</div><div class="stat-card-label">${it.label}</div>`;
      grid.appendChild(card);
    });
    document.getElementById('stats-modal').classList.remove('hidden');
  }

  // ---- Helpers ----
  _hideAll() {
    ['start-screen','pause-menu','game-over','shop-modal','missions-modal',
     'daily-modal','wheel-modal','stats-modal'].forEach(id => {
      document.getElementById(id).classList.add('hidden');
    });
  }
}

// ================================================================
//  BOOT
// ================================================================
window.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
  new ShadowRush();
});
