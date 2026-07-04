// ═══════════════════════════════════════════════════════════
//  SHADOW RUSH — Full Engine with Real Synthesized Audio
// ═══════════════════════════════════════════════════════════

// ── CONSTANTS ────────────────────────────────────────────
const SKINS = [
  { id:'default',   name:'NEON CUBE',   glow:'#00f5ff', price:0,   gradient:['#00f5ff','#0099cc'], secret:false },
  { id:'fire',      name:'FIRE',        glow:'#ff4500', price:30,  gradient:['#ff6b35','#ff0000'], secret:false },
  { id:'ice',       name:'ICE',         glow:'#00bfff', price:30,  gradient:['#a8e6ff','#0080ff'], secret:false },
  { id:'phantom',   name:'PHANTOM',     glow:'#8000ff', price:50,  gradient:['#bf5af2','#8000ff'], secret:false },
  { id:'gold',      name:'GOLD',        glow:'#ff9500', price:60,  gradient:['#ffd60a','#ff9500'], secret:false },
  { id:'matrix',    name:'MATRIX',      glow:'#00ff41', price:50,  gradient:['#30d158','#00ff00'], secret:false },
  { id:'pink',      name:'NEON PINK',   glow:'#ff0066', price:60,  gradient:['#ff2d78','#ff0066'], secret:false },
  { id:'rainbow',   name:'RAINBOW',     glow:'#ffffff', price:120, gradient:['#ff0000','#ff9900','#ffff00','#00ff00','#0099ff','#bf00ff'], secret:false },
  { id:'lightning', name:'LIGHTNING',   glow:'#ffdd00', price:100, gradient:['#fff176','#ffd600'], secret:false },
  { id:'crystal',   name:'CRYSTAL',     glow:'#b2ebf2', price:120, gradient:['#e0f7fa','#80deea'], secret:false },
  { id:'cosmic',    name:'COSMIC',      glow:'#ab47bc', price:200, gradient:['#ce93d8','#7b1fa2'], secret:false },
  { id:'prism',     name:'PRISM',       glow:'#f06292', price:300, gradient:['#f8bbd0','#ce93d8','#80deea'], secret:false },
  { id:'void',      name:'VOID',        glow:'#6200ea', price:0,   gradient:['#120024','#6200ea'], secret:true, hint:'Reach Stage 5' },
  { id:'darkmatter',name:'DARK MATTER', glow:'#e040fb', price:0,   gradient:['#1a1a2e','#e040fb'], secret:true, hint:'Reach Stage 10' },
  { id:'shadow',    name:'SHADOW LORD', glow:'#ff2d78', price:0,   gradient:['#090018','#ff2d78'], secret:true, hint:'Reach Stage 20' },
  { id:'ultimate',  name:'ULTIMATE',    glow:'#ffffff', price:0,   gradient:['#00f5ff','#bf5af2','#ffd60a','#ff2d78'], secret:true, hint:'Reach Stage 50' },
];
const OBS_THEMES = [
  { id:'neon',   colors:['#ff2d78','#cc0055'], glow:'#ff2d78' },
  { id:'fire',   colors:['#ff6b35','#cc2200'], glow:'#ff4500' },
  { id:'ice',    colors:['#48cae4','#0077b6'], glow:'#00bfff' },
  { id:'void',   colors:['#6200ea','#310052'], glow:'#6200ea' },
  { id:'cosmic', colors:null,                  glow:'#ce93d8' },
];
const RULES = [
  { id:'normal',      name:'NORMAL',        desc:'' },
  { id:'gravity_flip',name:'⬆ GRAVITY FLIP',desc:'Gravity reversed!' },
  { id:'speed_boost', name:'⚡ SPEED BOOST', desc:'Everything faster!' },
  { id:'slow_motion', name:'🐢 SLOW MOTION', desc:'Time slows...' },
  { id:'tiny',        name:'🔬 TINY MODE',   desc:'Cube shrinks!' },
  { id:'big',         name:'🔭 BIG MODE',    desc:'Cube grows!' },
  { id:'dark',        name:'🌑 DARKNESS',    desc:'Lights out!' },
  { id:'magnetic',    name:'🧲 MAGNETIC',    desc:'Coins attracted!' },
  { id:'ghost',       name:'👻 GHOST MODE',  desc:'Obstacles flicker!' },
];
const MISSIONS = [
  { id:'m_score500',  title:'SCORE RUSH',   desc:'Reach 500 score in one run',    key:'score',  goal:500,  reward:20 },
  { id:'m_coins30',   title:'COIN GRAB',    desc:'Collect 30 coins in one run',   key:'coins',  goal:30,   reward:25 },
  { id:'m_stage5',    title:'STAGE FIVE',   desc:'Reach Stage 5 in one run',      key:'stage',  goal:5,    reward:30 },
  { id:'m_combo8',    title:'COMBO KING',   desc:'Get an x8 combo',              key:'combo',  goal:8,    reward:20 },
  { id:'m_survive60', title:'SURVIVOR',     desc:'Survive 60 seconds in one run', key:'time',   goal:60,   reward:30 },
  { id:'m_games10',   title:'DEDICATED',    desc:'Play 10 games',                key:'games',  goal:10,   reward:50 },
];
const ACHIEVEMENTS = [
  { id:'first_run', title:'FIRST RUSH',   desc:'Play your first game',       icon:'🎮', secret:false },
  { id:'score500',  title:'HALF K',       desc:'Score 500 in one run',       icon:'⭐', secret:false },
  { id:'score2000', title:'2K CLUB',      desc:'Score 2000 in one run',      icon:'🌟', secret:false },
  { id:'coins100',  title:'COIN KING',    desc:'Collect 100 total coins',    icon:'💰', secret:false },
  { id:'combo10',   title:'COMBO MASTER', desc:'Reach x10 combo',           icon:'🔥', secret:false },
  { id:'stage5',    title:'STAGE FIVE',   desc:'Reach Stage 5',              icon:'⚡', secret:false },
  { id:'stage10',   title:'STAGE TEN',    desc:'Reach Stage 10',             icon:'💎', secret:false },
  { id:'skin_own',  title:'STYLIST',      desc:'Unlock any skin',            icon:'🎨', secret:false },
  { id:'survive120',title:'IRON CUBE',    desc:'Survive 2 minutes',         icon:'⏱', secret:false },
  { id:'stage20',   title:'SHADOW RUSH',  desc:'Reach Stage 20',             icon:'🌑', secret:true },
  { id:'combo15',   title:'COMBO GOD',    desc:'Reach x15 combo',           icon:'🌪', secret:true },
  { id:'jackpot',   title:'JACKPOT!',     desc:'Win 200+ coins on the wheel',icon:'🎡', secret:true },
];
const WHEEL_PRIZES = [
  { label:'10◈',   coins:10,  xp2:false, prob:30 },
  { label:'25◈',   coins:25,  xp2:false, prob:25 },
  { label:'50◈',   coins:50,  xp2:false, prob:18 },
  { label:'100◈',  coins:100, xp2:false, prob:12 },
  { label:'2x RUN',coins:0,   xp2:true,  prob:8  },
  { label:'200◈',  coins:200, xp2:false, prob:5  },
  { label:'5◈',    coins:5,   xp2:false, prob:1  },
  { label:'500◈',  coins:500, xp2:false, prob:1  },
];
const EVENTS = [
  { id:'double_coins', name:'✕2 DOUBLE COINS!', duration:15 },
  { id:'coin_rain',    name:'🌧 COIN RAIN!',     duration:8  },
  { id:'shield',       name:'🛡 SHIELD!',         duration:8  },
  { id:'score_boost',  name:'🔥 SCORE RUSH!',    duration:10 },
];
const DAILY_DAYS = [
  { icon:'◈', label:'5◈',  coins:5  },
  { icon:'◈', label:'8◈',  coins:8  },
  { icon:'⭐', label:'10◈', coins:10 },
  { icon:'◈', label:'10◈', coins:10 },
  { icon:'🌟', label:'15◈', coins:15 },
  { icon:'◈', label:'15◈', coins:15 },
  { icon:'🏆', label:'25◈', coins:25 },
];
const STAGE_DURATION = 20;
function stageSpeed(s)         { return 190 + (s-1)*55; }
function stageSpawnInterval(s) { return Math.max(0.45, 2.0-(s-1)*.12); }
function stageCoinBonus(s)     { return s*3; }
function stageObsTheme(s) {
  if(s>=20) return OBS_THEMES[4];
  if(s>=10) return OBS_THEMES[3];
  if(s>=7)  return OBS_THEMES[2];
  if(s>=4)  return OBS_THEMES[1];
  return OBS_THEMES[0];
}
function loadJ(k,d){ try{return JSON.parse(localStorage.getItem(k)||'null')||d;}catch{return d;} }
function saveJ(k,v){ localStorage.setItem(k,JSON.stringify(v)); }
function vibrate(p){ try{navigator.vibrate?.(p);}catch{} }

// ═══════════════════════════════════════════════════════════
//  AUDIO MANAGER  — Real synthesized music + SFX
//  Mobile-safe: AudioContext created on first user gesture
// ═══════════════════════════════════════════════════════════
class AudioManager {
  constructor() {
    // Persisted prefs
    this._vol      = parseFloat(localStorage.getItem('sr_vol')       || '0.7');
    this._musicVol = parseFloat(localStorage.getItem('sr_music_vol') || '0.8');
    this._sfxVol   = parseFloat(localStorage.getItem('sr_sfx_vol')   || '0.85');
    this._muted    = localStorage.getItem('sr_muted')  === 'true';
    this._music    = localStorage.getItem('sr_music')  !== 'false';
    this._sfx      = localStorage.getItem('sr_sfx')    !== 'false';

    // Runtime state
    this.ctx        = null;   // AudioContext (created on first unlock)
    this._master    = null;   // master GainNode  (mute/unmute + overall vol)
    this._musicBus  = null;   // music GainNode   (music vol + fade transitions)
    this._unlocked  = false;
    this._mode      = 'off';  // 'off' | 'menu' | 'game' | 'gameover' | 'victory'
    this._seqTid    = null;
    this._step      = 0;
    this._nextT     = 0;
    this._stage     = 1;
    this._nodePool  = [];     // BGM sequencer nodes to stop on stopBGM
    this._jinglePool= [];     // jingle nodes
    this._fadeTid   = null;   // timeout for delayed node cleanup after fade
  }

  // ── MOBILE UNLOCK ──────────────────────────────────────
  // MUST be called directly inside a user gesture handler
  unlock() {
    if (this._unlocked) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();

      // Master gain: overall volume + mute
      this._master = this.ctx.createGain();
      this._master.gain.value = this._muted ? 0 : this._vol;
      this._master.connect(this.ctx.destination);

      // Music bus: sits between BGM nodes and master — used for
      // independent music volume and smooth fade transitions
      this._musicBus = this.ctx.createGain();
      this._musicBus.gain.value = this._music ? this._musicVol : 0;
      this._musicBus.connect(this._master);

      // iOS needs an explicit resume
      if (this.ctx.state === 'suspended') this.ctx.resume();
      this._unlocked = true;

      // Mobile optimization: suspend AudioContext when tab/app is hidden,
      // resume when it comes back — saves CPU and battery on mobile
      document.addEventListener('visibilitychange', () => {
        if (!this._ok()) return;
        if (document.hidden) {
          this.ctx.suspend().catch(() => {});
        } else {
          this.ctx.resume().catch(() => {});
          // Resync sequencer to now to avoid a flood of catch-up notes
          this._nextT = this.ctx.currentTime + 0.05;
        }
      });
    } catch(e) { console.warn('AudioContext failed:', e); }
  }

  _ok()  { return this._unlocked && this.ctx && this.ctx.state !== 'closed'; }
  _now() { return this.ctx.currentTime; }

  // ── SETTINGS ───────────────────────────────────────────
  setVolume(v) {
    this._vol = v; localStorage.setItem('sr_vol', v);
    if (this._master) this._master.gain.value = this._muted ? 0 : v;
  }
  setMuted(m) {
    this._muted = m; localStorage.setItem('sr_muted', m);
    if (this._master) this._master.gain.value = m ? 0 : this._vol;
  }
  setMusic(b) {
    this._music = b; localStorage.setItem('sr_music', b);
    if (!b) {
      this.stopBGM(0.3);
    } else if (this._musicBus && this._ok() && !this._muted) {
      this._musicBus.gain.cancelScheduledValues(this._now());
      this._musicBus.gain.setValueAtTime(this._musicVol, this._now());
    }
  }
  setSFX(b)   { this._sfx   = b; localStorage.setItem('sr_sfx',   b); }
  getMuted()  { return this._muted; }
  getVol()    { return this._vol; }
  getMusic()  { return this._music; }
  getSFX()    { return this._sfx; }

  // Separate music volume (0–1) — controls the music bus independently
  setMusicVol(v) {
    this._musicVol = v; localStorage.setItem('sr_music_vol', v);
    if (this._musicBus && this._ok() && !this._muted && this._music) {
      this._musicBus.gain.cancelScheduledValues(this._now());
      this._musicBus.gain.setValueAtTime(v, this._now());
    }
  }
  getMusicVol() { return this._musicVol; }

  // Separate SFX volume (0–1) — applied when SFX gain nodes are created
  setSfxVol(v) { this._sfxVol = v; localStorage.setItem('sr_sfx_vol', v); }
  getSfxVol()  { return this._sfxVol; }

  // ── GRAPH HELPERS ──────────────────────────────────────
  // SFX gain — connects to master (respects sfxVol multiplier)
  _g(vol = 1) {
    const g = this.ctx.createGain(); g.gain.value = vol * this._sfxVol;
    g.connect(this._master); return g;
  }
  // Music gain — connects to musicBus (faded/controlled independently)
  _mg(vol = 1) {
    const g = this.ctx.createGain(); g.gain.value = vol;
    g.connect(this._musicBus); return g;
  }
  _osc(freq, type, t, dur, vol, out) {
    const o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type; o.frequency.value = freq;
    o.connect(g); g.connect(out || this._master);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.02);
  }
  _noise(t, dur, vol, cutoff, out) {
    const len = Math.ceil(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for(let i=0;i<len;i++) d[i] = Math.random()*2-1;
    const src = this.ctx.createBufferSource();
    const flt = this.ctx.createBiquadFilter(), g = this.ctx.createGain();
    src.buffer = buf; flt.type = 'highpass'; flt.frequency.value = cutoff;
    src.connect(flt); flt.connect(g); g.connect(out || this._master);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.start(t); src.stop(t + dur + 0.02);
  }
  _track(node) { this._nodePool.push(node); return node; }

  // ── SOUND EFFECTS ──────────────────────────────────────
  play(name) {
    if (!this._ok() || !this._sfx) return;
    const t = this._now();
    try { this._sfx_dispatch(name, t); } catch(e) {}
  }

  _sfx_dispatch(name, t) {
    switch(name) {
      case 'button': {
        // Short click
        this._osc(660, 'sine', t, 0.04, 0.14);
        this._osc(1000,'sine', t+0.02, 0.025, 0.08);
        break;
      }
      case 'jump': {
        const g = this._g(0.18);
        const o = this.ctx.createOscillator(), eg = this.ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(160, t);
        o.frequency.exponentialRampToValueAtTime(560, t + 0.1);
        eg.gain.setValueAtTime(0.3, t);
        eg.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
        o.connect(eg); eg.connect(g);
        o.start(t); o.stop(t + 0.22);
        break;
      }
      case 'coin': {
        // Bright bling — two rising tones
        this._osc(880,  'sine', t,       0.07, 0.26);
        this._osc(1320, 'sine', t+0.05,  0.08, 0.22);
        this._osc(1760, 'sine', t+0.09,  0.06, 0.16);
        break;
      }
      case 'die': {
        const g = this._g(0.32);
        // Descending pitch crash
        const o = this.ctx.createOscillator(), eg = this.ctx.createGain();
        o.type = 'sawtooth';
        o.frequency.setValueAtTime(320, t);
        o.frequency.exponentialRampToValueAtTime(38, t + 0.55);
        eg.gain.setValueAtTime(0.45, t);
        eg.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
        o.connect(eg); eg.connect(g);
        o.start(t); o.stop(t + 0.6);
        // Noise burst
        this._noise(t, 0.28, 0.4, 80, g);
        // Low sub thud
        this._osc(55, 'sine', t, 0.35, 0.5, g);
        break;
      }
      case 'stage': {
        // Ascending victory arpeggio
        [262,330,392,523,659,784,1047].forEach((f,i) =>
          this._osc(f, 'sine', t + i*0.07, 0.18, 0.22));
        this._osc(1047, 'triangle', t+0.44, 0.32, 0.18);
        break;
      }
      case 'achieve': {
        [523,659,784,1047].forEach((f,i) => this._osc(f,'sine',t+i*0.07,0.14,0.2));
        break;
      }
      case 'purchase': {
        // Success sparkle
        [523,659,784,1047,1319].forEach((f,i) => this._osc(f,'sine',t+i*0.055,0.1,0.18));
        break;
      }
      case 'levelup': {
        [262,330,392,523,659,784,1047,1319].forEach((f,i) => this._osc(f,'sine',t+i*0.065,0.16,0.2));
        break;
      }
      case 'combo': {
        const f = 440 + this._stage * 22;
        this._osc(f, 'sine', t, 0.07, 0.18);
        this._osc(f*1.5, 'sine', t+0.035, 0.05, 0.13);
        break;
      }
      case 'rule': {
        [440,550,660,880].forEach((f,i) => this._osc(f,'sine',t+i*0.06,0.1,0.18));
        break;
      }
      case 'event': {
        [660,880,1100].forEach((f,i) => this._osc(f,'triangle',t+i*0.06,0.1,0.22));
        break;
      }
      case 'countdown': {
        this._osc(440,'sine',t,0.16,0.32);
        break;
      }
      case 'go': {
        [523,659,784].forEach((f,i) => this._osc(f,'sine',t+i*0.04,0.13,0.28));
        break;
      }
    }
  }

  // ── BACKGROUND MUSIC ───────────────────────────────────
  setStage(s) { this._stage = s; }

  // Smooth crossfade into menu BGM
  startMenuBGM() {
    if (!this._ok() || !this._music) return;
    const wasOff = this._mode === 'off';
    this._stopBGMNodes(wasOff ? 0 : 0.3, () => {
      if (!this._ok() || !this._music) return;
      this._mode = 'menu';
      this._step = 0;
      this._nextT = this._now() + 0.05;
      this._fadeInMusic(0.55);
      this._seqLoop();
    });
  }

  // Smooth crossfade into game BGM
  startGameBGM() {
    if (!this._ok() || !this._music) return;
    const wasOff = this._mode === 'off';
    this._stopBGMNodes(wasOff ? 0 : 0.25, () => {
      if (!this._ok() || !this._music) return;
      this._mode = 'game';
      this._step = 0;
      this._nextT = this._now() + 0.05;
      this._fadeInMusic(0.4);
      this._seqLoop();
    });
  }

  // Public stopBGM — fades out then clears nodes
  stopBGM(fadeTime = 0.35) {
    clearTimeout(this._fadeTid);
    this._stopBGMNodes(fadeTime);
  }

  // Internal: fade out music bus then stop nodes (optional callback when done)
  _stopBGMNodes(fadeTime = 0.35, onDone = null) {
    this._mode = 'off';
    clearTimeout(this._seqTid); this._seqTid = null;
    clearTimeout(this._fadeTid);

    if (this._musicBus && this._ok() && fadeTime > 0) {
      const t = this._now();
      this._musicBus.gain.cancelScheduledValues(t);
      this._musicBus.gain.setValueAtTime(this._musicBus.gain.value || 0.001, t);
      this._musicBus.gain.linearRampToValueAtTime(0.0001, t + fadeTime);
      this._fadeTid = setTimeout(() => {
        this._nodePool.forEach(n => { try { n.stop(); } catch {} });
        this._nodePool = [];
        if (onDone) onDone();
      }, (fadeTime + 0.08) * 1000);
    } else {
      this._nodePool.forEach(n => { try { n.stop(); } catch {} });
      this._nodePool = [];
      if (onDone) onDone();
    }
  }

  // Fade music bus gain UP to musicVol over `dur` seconds
  _fadeInMusic(dur = 0.4) {
    if (!this._musicBus || !this._ok()) return;
    const t = this._now();
    this._musicBus.gain.cancelScheduledValues(t);
    this._musicBus.gain.setValueAtTime(0.0001, t);
    this._musicBus.gain.linearRampToValueAtTime(this._musicVol, t + dur);
  }

  // ── GAME OVER JINGLE (~4.5 s) ──────────────────────────
  // A descending minor lament — played after player dies.
  // Returns total ms so callers know when to start menu BGM.
  playGameOverJingle() {
    if (!this._ok() || !this._music) return 0;
    // Stop any current BGM quickly
    this._stopBGMNodes(0.12);

    // Short delay so the die SFX isn't masked
    const DELAY = 0.30;
    const TOTAL_MS = 5200;

    setTimeout(() => {
      if (!this._ok()) return;
      const t = this._now() + 0.04;
      // Jingle bus (routed through musicBus)
      const bus = this._mg(0.0001);
      bus.gain.linearRampToValueAtTime(this._musicVol * 0.85, t + 0.35);

      // ── Descending melody in A-minor ──────────────────────
      // Notes: G4→F4→E♭4→D4→C4→A3  (slow, mournful)
      const melody = [
        [392.0, 0.00, 0.70, 0.22],  // G4
        [349.2, 0.62, 0.70, 0.20],  // F4
        [311.1, 1.22, 0.70, 0.19],  // Eb4
        [293.7, 1.82, 0.70, 0.18],  // D4
        [261.6, 2.40, 0.80, 0.18],  // C4
        [220.0, 3.10, 1.40, 0.22],  // A3 (hold + fade)
      ];
      melody.forEach(([freq, dt, dur, vol]) => {
        const o = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        o.type = 'sine'; o.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, t + dt);
        g.gain.linearRampToValueAtTime(vol, t + dt + 0.06);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dt + dur);
        o.connect(g); g.connect(bus);
        o.start(t + dt); o.stop(t + dt + dur + 0.06);
        this._jinglePool.push(o);
      });

      // ── Low mournful pad (Am chord: A2-C3-E3) ─────────────
      [[110.0, -3], [130.8, 0], [164.8, +4]].forEach(([freq, detune]) => {
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.type = 'sine'; o.frequency.value = freq;
        o.detune.value = detune;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(0.11, t + 0.7);
        g.gain.setValueAtTime(0.11, t + 3.5);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 5.0);
        o.connect(g); g.connect(bus);
        o.start(t); o.stop(t + 5.1);
        this._jinglePool.push(o);
      });

      // ── Subtle bass rumble ─────────────────────────────────
      const br = this.ctx.createOscillator(), bg = this.ctx.createGain();
      const bf = this.ctx.createBiquadFilter();
      br.type = 'sine'; br.frequency.value = 55;
      bf.type = 'lowpass'; bf.frequency.value = 140;
      bg.gain.setValueAtTime(0.0001, t);
      bg.gain.linearRampToValueAtTime(0.14, t + 0.5);
      bg.gain.setValueAtTime(0.14, t + 3.8);
      bg.gain.exponentialRampToValueAtTime(0.0001, t + 5.1);
      br.connect(bf); bf.connect(bg); bg.connect(bus);
      br.start(t); br.stop(t + 5.2);
      this._jinglePool.push(br);

      // Fade out the jingle bus at the end
      bus.gain.setValueAtTime(this._musicVol * 0.85, t + 4.0);
      bus.gain.linearRampToValueAtTime(0.0001, t + 5.1);
    }, DELAY * 1000);

    return TOTAL_MS;
  }

  // ── VICTORY JINGLE (~2.8 s) ────────────────────────────
  // A bright triumphant fanfare — played on new high score.
  // Returns total ms so callers know when to start menu BGM.
  playVictoryJingle() {
    if (!this._ok() || !this._music) return 0;
    this._stopBGMNodes(0.12);

    const DELAY = 0.20;
    const TOTAL_MS = 3800;

    setTimeout(() => {
      if (!this._ok()) return;
      const t = this._now() + 0.04;
      const bus = this._mg(0.0001);
      bus.gain.linearRampToValueAtTime(this._musicVol, t + 0.15);

      // ── Rising fanfare in C-major ─────────────────────────
      // C4→E4→G4→C5→E5 with harmonics
      const fanfare = [
        [261.6, 0.00, 0.22, 0.25],  // C4
        [329.6, 0.18, 0.22, 0.24],  // E4
        [392.0, 0.35, 0.22, 0.23],  // G4
        [523.3, 0.52, 0.28, 0.26],  // C5
        [659.3, 0.78, 0.55, 0.28],  // E5
        [784.0, 1.28, 0.90, 0.22],  // G5 (resolve)
      ];
      fanfare.forEach(([freq, dt, dur, vol]) => {
        // Main tone
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.type = 'sine'; o.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, t + dt);
        g.gain.linearRampToValueAtTime(vol, t + dt + 0.04);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dt + dur);
        o.connect(g); g.connect(bus);
        o.start(t + dt); o.stop(t + dt + dur + 0.06);
        this._jinglePool.push(o);
        // Octave shimmer
        const o2 = this.ctx.createOscillator(), g2 = this.ctx.createGain();
        o2.type = 'triangle'; o2.frequency.value = freq * 2;
        g2.gain.setValueAtTime(0.0001, t + dt + 0.02);
        g2.gain.linearRampToValueAtTime(vol * 0.3, t + dt + 0.07);
        g2.gain.exponentialRampToValueAtTime(0.0001, t + dt + dur * 0.7);
        o2.connect(g2); g2.connect(bus);
        o2.start(t + dt + 0.02); o2.stop(t + dt + dur + 0.06);
        this._jinglePool.push(o2);
      });

      // ── Chord pad — C-major (C3-E3-G3) ────────────────────
      [[130.8, -2], [164.8, 0], [196.0, +3]].forEach(([freq, detune]) => {
        const o = this.ctx.createOscillator(), g = this.ctx.createGain();
        o.type = 'sine'; o.frequency.value = freq;
        o.detune.value = detune;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(0.09, t + 0.3);
        g.gain.setValueAtTime(0.09, t + 2.3);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 3.5);
        o.connect(g); g.connect(bus);
        o.start(t); o.stop(t + 3.6);
        this._jinglePool.push(o);
      });

      // Fade out jingle bus
      bus.gain.setValueAtTime(this._musicVol, t + 2.5);
      bus.gain.linearRampToValueAtTime(0.0001, t + 3.5);
    }, DELAY * 1000);

    return TOTAL_MS;
  }

  // ── SEQUENCER LOOP ─────────────────────────────────────
  _seqLoop() {
    if (this._mode === 'off' || !this._ok()) return;
    const bpm  = this._mode === 'menu' ? 76 : Math.min(200, 96 + (this._stage-1)*8);
    const step = 60 / bpm / 4;   // 16th note duration in seconds
    const AHEAD = 0.13;

    // Guard: if we've fallen behind (tab backgrounded), resync
    if (this._nextT < this._now() - 1) this._nextT = this._now() + 0.05;

    while (this._nextT < this._now() + AHEAD) {
      const s16 = this._step % 16;
      const bar = Math.floor(this._step / 16);
      if (this._mode === 'menu') this._menuStep(s16, bar, this._nextT, step);
      else                        this._gameStep(s16, bar, this._nextT, step);
      this._nextT += step;
      this._step++;
    }
    this._seqTid = setTimeout(() => this._seqLoop(), 22);
  }

  // ── MENU MUSIC: calm Am-F-C-G chord pad + arpeggio ────
  // Note frequencies (Hz):
  // A2=110  C3=130.8  E3=164.8  F2=87.3  A3=220  C4=261.6
  // G2=98   B2=123.5  D3=146.8  G3=196   E4=329.6
  _menuStep(s16, bar, t, step) {
    const CHORDS = [
      [110, 164.8, 220],   // Am  – A2, E3, A3
      [87.3, 130.8, 174.6],// F   – F2, C3, F3
      [130.8, 196, 261.6], // C   – C3, G3, C4
      [98, 146.8, 196],    // G   – G2, D3, G3
    ];
    const ARPS = [
      [110, 130.8, 164.8, 220, 261.6, 220, 164.8, 130.8], // Am
      [87.3, 110, 130.8, 174.6, 220, 174.6, 130.8, 110],  // F
      [130.8, 164.8, 196, 261.6, 329.6, 261.6, 196, 164.8],// C
      [98, 123.5, 146.8, 196, 246.9, 196, 146.8, 123.5],  // G
    ];
    const ci = bar % 4;

    // Chord pad at start of each bar — routes through musicBus
    if (s16 === 0) {
      const dur = step * 16;
      const mix = this._mg(0.001); // starts silent, on music bus
      CHORDS[ci].forEach(freq => {
        // 3 slightly detuned voices per note for richness
        [-4, 0, 4].forEach(dt => {
          const o = this.ctx.createOscillator();
          o.type = 'sine';
          o.frequency.value = freq * Math.pow(2, dt/1200);
          o.connect(mix);
          o.start(t); o.stop(t + dur + 0.15);
          this._track(o);
        });
      });
      // Slow envelope — calm and peaceful
      mix.gain.setValueAtTime(0.001, t);
      mix.gain.linearRampToValueAtTime(0.028, t + 1.4);
      mix.gain.setValueAtTime(0.028, t + dur - 1.2);
      mix.gain.linearRampToValueAtTime(0.001, t + dur);
    }

    // Arpeggio on 8th-note positions (steps 0,2,4,6,8,10,12,14)
    if (s16 % 2 === 0) {
      const ai = (s16 / 2) % 8;
      const freq = ARPS[ci][ai];
      const dur  = step * 1.6;
      const g = this._mg(0.001); // music bus
      const o = this.ctx.createOscillator();
      o.type = 'triangle'; o.frequency.value = freq;
      o.connect(g);
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(0.038, t + 0.025);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.start(t); o.stop(t + dur + 0.04);
      this._track(o);
    }
  }

  // ── GAME MUSIC: drum + bass + melody (Am pentatonic) ──
  // Am pentatonic: A3=220, C4=261.6, D4=293.7, E4=329.6, G4=392
  _gameStep(s16, bar, t, step) {
    const st = this._stage;

    // KICK — every beat (step 0,4,8,12); at stage 3+ add up-beat (2,10)
    const kickSteps = new Set([0,4,8,12]);
    if (st >= 3) { kickSteps.add(2); kickSteps.add(10); }
    if (kickSteps.has(s16)) this._kick(t, st);

    // SNARE — beats 2 and 4 (steps 4 and 12)
    if (s16 === 4 || s16 === 12) this._snare(t, st);

    // HI-HAT — 8th notes (stage 2+), 16th notes (stage 5+)
    const hatDiv = st >= 5 ? 1 : st >= 2 ? 2 : 0;
    if (hatDiv > 0 && s16 % hatDiv === 0) this._hat(t, st);

    // BASS — root note on beats, bassline changes every 2 bars
    if (s16 % 4 === 0) {
      const bassMap = [110, 87.3, 110, 98]; // A2,F2,A2,G2 per beat of bar
      const beat = s16 / 4;
      this._bass(bassMap[beat], t, step * 3.5, st);
    }

    // MELODY — 2-bar pattern alternating
    const MELODY = [
      // bar A
      [220,  0, 261.6, 0,  329.6,  0,    0,    0,
       293.7, 0, 261.6, 0,  220,    0,    0,    0],
      // bar B
      [220,  0, 261.6, 0,  329.6,  0,  392,    0,
       329.6, 0, 261.6, 0,  220,    0, 293.7,   0],
    ];
    const melNote = MELODY[bar % 2][s16];
    if (melNote) this._melody(melNote, t, step * 1.75, st);
  }

  _kick(t, stage) {
    const vol = Math.min(0.55, 0.28 + (stage-1)*0.022);
    const g = this._mg(vol); // music bus
    const o = this.ctx.createOscillator(), eg = this.ctx.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(200, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.14);
    eg.gain.setValueAtTime(1, t);
    eg.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    o.connect(eg); eg.connect(g);
    o.start(t); o.stop(t + 0.32);
    this._track(o);
    // Attack click
    this._noise(t, 0.018, vol * 0.35, 3500, g);
  }

  _snare(t, stage) {
    const vol = Math.min(0.4, 0.16 + (stage-1)*0.016);
    const g = this._mg(vol); // music bus
    // Noise body
    this._noise(t, 0.14, 1.0, 1200, g);
    // Tone component
    this._osc(190, 'sine', t, 0.08, 0.5, g);
  }

  _hat(t, stage) {
    const vol = Math.min(0.22, 0.07 + (stage-1)*0.012);
    const g = this._mg(vol); // music bus
    this._noise(t, 0.04, 1.0, 9000, g);
  }

  _bass(freq, t, dur, stage) {
    const vol = Math.min(0.24, 0.09 + (stage-1)*0.012);
    const g = this._mg(vol); // music bus — gain already set to vol at creation
    const o = this.ctx.createOscillator();
    const flt = this.ctx.createBiquadFilter();
    o.type = 'square'; o.frequency.value = freq;
    flt.type = 'lowpass'; flt.frequency.value = 350 + stage * 20;
    flt.Q.value = 1.5;
    o.connect(flt); flt.connect(g);
    // g.gain is an AudioParam — no double-indirection
    g.gain.setValueAtTime(vol, t);
    g.gain.setValueAtTime(vol * 0.7, t + 0.06);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.04);
    this._track(o);
  }

  _melody(freq, t, dur, stage) {
    const vol = Math.min(0.2, 0.07 + (stage-1)*0.01);
    const g = this._mg(0.0001); // music bus — start silent, envelope ramps in
    const o = this.ctx.createOscillator();
    const flt = this.ctx.createBiquadFilter();
    o.type = 'sawtooth'; o.frequency.value = freq;
    flt.type = 'lowpass';
    flt.frequency.setValueAtTime(600 + stage*60, t);
    flt.frequency.linearRampToValueAtTime(2200 + stage*80, t + 0.04);
    flt.frequency.exponentialRampToValueAtTime(500, t + dur);
    flt.Q.value = 2;
    o.connect(flt); flt.connect(g);
    // g.gain is an AudioParam — correct envelope (no double-indirection)
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.04);
    this._track(o);
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
      const s=this.data[m.id]; if(s.done) return;
      let v=0;
      if(m.key==='score') v=session.score; else if(m.key==='coins') v=session.coins;
      else if(m.key==='stage') v=session.stage; else if(m.key==='combo') v=session.combo;
      else if(m.key==='time')  v=session.time; else if(m.key==='games') v=session.games;
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
    const now=Date.now(), within=now-this.lastClaim<48*60*60*1000;
    this.streak=within?Math.min(this.streak+1,7):1;
    this.lastClaim=now; saveJ('sr3_daily',{lastClaim:this.lastClaim,streak:this.streak});
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
    this.lastSpin=Date.now(); saveJ('sr3_wheel',{lastSpin:this.lastSpin,xp2:this.xp2});
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

    this.state  = 'menu';
    this._scoreF= 0; this.score=0; this.coins=0;
    this.stage=1; this.stageTimer=0; this.elapsed=0;
    this.combo=0; this.maxCombo=0; this.comboTimer=0;
    this.player=null;
    this.obstacles=[];this.coinItems=[];this.particles=[];this.floatTexts=[];
    this.obstSpawnT=0;this.coinSpawnT=0;
    this.shakeX=0;this.shakeY=0;this.shakeStr=0;
    this.colorHue=0;
    this.currentRule=RULES[0];this.ruleTimer=0;this.ruleChanges=0;
    this.activeEvent=null;this.eventTimer=0;this.eventCooldown=30;
    this.doubleCoins=false;this.shield=false;this.scoreBoost=false;
    this.coinRainT=0; this.doubleRun=false;
    this.bgStars=[]; this.lastTime=0;

    this._initCanvas(); this._initStars();
    this._bindEvents(); this._setupUI();
    this._updateMenuUI();
    this._updateAudioUI();
    requestAnimationFrame(ts=>{ this.lastTime=ts; this._loop(ts); });
  }

  _initCanvas(){
    const resize=()=>{this.canvas.width=window.innerWidth;this.canvas.height=window.innerHeight;this.W=this.canvas.width;this.H=this.canvas.height;};
    window.addEventListener('resize',resize);resize();
  }
  _initStars(){
    this.bgStars=Array.from({length:100},()=>({x:Math.random()*3000,y:Math.random()*1500,r:Math.random()*1.4+.2,speed:Math.random()*.6+.1,alpha:Math.random()*.6+.1,tw:Math.random()*Math.PI*2}));
  }
  _createPlayer(){return{x:this.W*.2,y:this.H/2,vy:0,size:28,baseSize:28,trail:[]};}

  _bindEvents(){
    const c=this.canvas;
    // Canvas touches / clicks — these are direct user gestures, unlock audio first
    c.addEventListener('touchstart',e=>{e.preventDefault();this.audio.unlock();this._onDown(e.touches[0].clientX,e.touches[0].clientY);},{passive:false});
    c.addEventListener('touchend',e=>{e.preventDefault();},{passive:false});
    c.addEventListener('touchmove',e=>e.preventDefault(),{passive:false});
    c.addEventListener('mousedown',e=>{this.audio.unlock();this._onDown(e.clientX,e.clientY);});
    document.addEventListener('keydown',e=>{
      if(e.code==='Space'||e.code==='ArrowUp'){this.audio.unlock();this._onDown(this.W/2,this.H/2);}
      if(e.code==='Escape')this._togglePause();
    });
  }

  _onDown(x,y){
    if(this.state==='countdown'||this.state==='stageclear') return;
    if(this.state==='menu')    { this._beginCountdown(); return; }
    if(this.state==='paused'||this.state==='gameover') return;
    if(this.state==='playing') this._playerJump();
  }

  _playerJump(){
    if(!this.player)return;
    const grav=this.currentRule.id==='gravity_flip'?-1:1;
    this.player.vy=-660*grav;
    this.audio.play('jump');
    const sk=this.skins.getSkin();
    for(let i=0;i<5;i++) this.particles.push(new Particle(this.player.x,this.player.y,(Math.random()-.5)*180,(Math.random()-.5)*180,sk.glow,.4,true));
  }

  _beginCountdown(){
    this.state='countdown';
    this._hideOverlays();
    // Start menu music fade during countdown; startGameBGM in _startGame
    const ov=document.getElementById('countdown-overlay');
    const numEl=document.getElementById('countdown-number');
    const goEl=document.getElementById('countdown-go');
    ov.classList.remove('hidden');numEl.classList.remove('hidden');goEl.classList.add('hidden');
    let c=3;numEl.textContent=c;this.audio.play('countdown');
    const tick=setInterval(()=>{
      c--;
      if(c>0){
        numEl.textContent=c;
        numEl.style.animation='none';void numEl.offsetWidth;
        numEl.style.animation='cPop .5s cubic-bezier(.175,.885,.32,1.275)';
        this.audio.play('countdown');
      } else {
        clearInterval(tick);
        numEl.classList.add('hidden');goEl.classList.remove('hidden');
        this.audio.play('go');
        setTimeout(()=>{ ov.classList.add('hidden'); this._startGame(); },600);
      }
    },900);
  }

  _startGame(){
    this.state='playing';
    this._scoreF=0;this.score=0;this.coins=0;
    this.stage=1;this.stageTimer=0;this.elapsed=0;
    this.combo=0;this.maxCombo=0;this.comboTimer=0;
    this.ruleTimer=0;this.ruleChanges=0;this.currentRule=RULES[0];
    this.obstacles=[];this.coinItems=[];this.particles=[];this.floatTexts=[];
    this.obstSpawnT=0;this.coinSpawnT=0;
    this.shakeStr=0;this.activeEvent=null;this.eventTimer=0;this.eventCooldown=30;
    this.doubleCoins=false;this.shield=false;this.scoreBoost=false;this.coinRainT=0;
    this.doubleRun=this.wheel.xp2;if(this.doubleRun)this.wheel.setXP2(false);
    this.player=this._createPlayer();
    document.getElementById('hud').classList.remove('hidden');
    this.audio.setStage(1);
    this.audio.startGameBGM();
    this._updateHUD();this._updateRuleBanner();
  }

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
      this.audio.startGameBGM();
    }
  }

  _stageClear(){
    this.state='stageclear';
    const bonus=stageCoinBonus(this.stage);this.coins+=bonus;
    this.audio.play('stage');vibrate([80,40,120]);
    const ov=document.getElementById('stage-clear-overlay');
    document.getElementById('stage-clear-number').textContent=this.stage;
    document.getElementById('stage-clear-bonus').textContent=`+${bonus} ◈ BONUS`;
    ov.classList.remove('hidden');
    for(let i=0;i<20;i++){const a=Math.random()*Math.PI*2,sp=150+Math.random()*200;this.particles.push(new Particle(this.W/2,this.H/2,Math.cos(a)*sp,Math.sin(a)*sp,'#ffd60a',1.2));}
    setTimeout(()=>{ ov.classList.add('hidden'); this._advanceStage(); },2200);
  }

  _advanceStage(){
    this.stage++;this.stageTimer=0;this.obstacles=[];
    this.currentRule=RULES[0];this.ruleTimer=0;
    this.activeEvent=null;this.eventTimer=0;this.eventCooldown=25;
    this.doubleCoins=false;this.shield=false;this.scoreBoost=false;
    this.audio.setStage(this.stage);
    this._hideEventBanners();this.state='playing';this._updateHUD();
    const lbl=document.getElementById('stage-label');
    lbl.style.color='#ffd60a';lbl.style.textShadow='0 0 14px #ffd60a';
    setTimeout(()=>{lbl.style.color='';lbl.style.textShadow='';},1000);
  }

  _die(){
    if(this.state!=='playing')return;
    if(this.shield){
      this.shield=false;this.shakeStr=12;
      this._hideEventBanners();this.audio.play('die');vibrate([100]);return;
    }
    this.state='gameover';
    // Die SFX (impact crunch — SFX bus, plays immediately)
    this.audio.play('die');
    vibrate([150,80,200]);

    const sk=this.skins.getSkin();
    if(this.player){
      for(let i=0;i<30;i++){const a=(i/30)*Math.PI*2,sp=180+Math.random()*260;this.particles.push(new Particle(this.player.x,this.player.y,Math.cos(a)*sp,Math.sin(a)*sp,sk.glow,1.1,true,Math.random()*6+3));}
    }

    this.wallet.add(this.coins);
    this.stats.gamesPlayed++;this.stats.totalCoins+=this.coins;
    const wasHighScore=this.score>0&&this.score>=(this.stats.highScore||0);
    if(this.score>this.stats.highScore)this.stats.highScore=this.score;
    if(this.stage>this.stats.bestStage)this.stats.bestStage=this.stage;
    if(this.elapsed>this.stats.longestRun)this.stats.longestRun=this.elapsed;
    if(this.maxCombo>this.stats.highestCombo)this.stats.highestCombo=this.maxCombo;
    this.stats.save();
    this.missions.update({score:this.score,coins:this.coins,stage:this.stage,combo:this.maxCombo,time:Math.floor(this.elapsed),games:this.stats.gamesPlayed});
    this._checkAchievements();this._checkSecretSkins();

    document.getElementById('hud').classList.add('hidden');
    document.getElementById('rule-notification').classList.add('hidden');
    this._hideEventBanners();
    const isNew=wasHighScore;
    document.getElementById('final-score').textContent=this.score;
    document.getElementById('final-best').textContent=this.stats.highScore;
    document.getElementById('final-stage').textContent=this.stage;
    document.getElementById('final-coins').textContent=this.coins;
    document.getElementById('new-best-badge').classList.toggle('hidden',!isNew);
    if(isNew){vibrate([50,50,50,50,200]);for(let i=0;i<16;i++){const a=Math.random()*Math.PI*2;this.particles.push(new Particle(this.W/2,this.H/2,Math.cos(a)*250,Math.sin(a)*250,'#ffd60a',1.5));}}
    document.getElementById('game-over').classList.remove('hidden');
    this._updateMenuUI();

    // Play appropriate jingle then cross-fade into menu BGM
    // New high score → triumphant victory jingle; otherwise → mournful game-over jingle
    const jingleMs = isNew
      ? this.audio.playVictoryJingle()
      : this.audio.playGameOverJingle();
    setTimeout(() => this.audio.startMenuBGM(), jingleMs + 600);
  }

  _checkAchievements(){
    const c=(id,cond)=>{
      if(!cond||this.achMgr.has(id))return;
      if(this.achMgr.unlock(id)){
        const a=ACHIEVEMENTS.find(x=>x.id===id);
        if(a)setTimeout(()=>{this._toast(a.icon,a.title,a.desc);this.audio.play('achieve');},600);
      }
    };
    c('first_run', this.stats.gamesPlayed>=1);
    c('score500',  this.score>=500);
    c('score2000', this.score>=2000);
    c('coins100',  this.stats.totalCoins>=100);
    c('combo10',   this.maxCombo>=10);
    c('combo15',   this.maxCombo>=15);
    c('stage5',    this.stage>=5);
    c('stage10',   this.stage>=10);
    c('stage20',   this.stage>=20);
    c('skin_own',  this.skins.unlocked.length>1);
    c('survive120',this.elapsed>=120);
  }
  _checkSecretSkins(){
    if(this.stage>=5  && this.skins.unlock('void'))       this._toast('👁','VOID UNLOCKED!','Secret skin!');
    if(this.stage>=10 && this.skins.unlock('darkmatter'))  this._toast('🌑','DARK MATTER UNLOCKED!','Secret skin!');
    if(this.stage>=20 && this.skins.unlock('shadow'))     this._toast('🌚','SHADOW LORD UNLOCKED!','Secret skin!');
    if(this.stage>=50 && this.skins.unlock('ultimate'))   this._toast('✨','ULTIMATE UNLOCKED!','Secret skin!');
  }

  _triggerRule(){
    const pool=RULES.filter(r=>r.id!=='normal'&&r.id!==this.currentRule.id);
    this.currentRule=pool[Math.floor(Math.random()*pool.length)];
    this.ruleTimer=0;this.ruleChanges++;
    this._applyRule();this._showRuleNotif();
    this.audio.play('rule');this.shakeStr=Math.max(this.shakeStr,4);vibrate([60]);
  }
  _applyRule(){
    if(!this.player)return;
    if(this.currentRule.id==='tiny')this.player.size=this.player.baseSize*.52;
    else if(this.currentRule.id==='big')this.player.size=this.player.baseSize*1.65;
    else this.player.size=this.player.baseSize;
  }
  _showRuleNotif(){
    const el=document.getElementById('rule-notification'),tx=document.getElementById('rule-notification-text');
    tx.textContent=this.currentRule.name+(this.currentRule.desc?'\n'+this.currentRule.desc:'');
    el.classList.remove('hidden');el.style.animation='none';void el.offsetWidth;
    el.style.animation='ruleShow 2.5s ease forwards';
    clearTimeout(this._ruleT);this._ruleT=setTimeout(()=>el.classList.add('hidden'),2600);
    this._updateRuleBanner();
  }
  _updateRuleBanner(){
    const b=document.getElementById('rule-banner');
    if(this.currentRule.id==='normal'){b.classList.add('hidden');return;}
    b.textContent=this.currentRule.name;b.classList.remove('hidden');
  }

  _triggerEvent(){
    const pool=EVENTS.filter(e=>e.id!==this.activeEvent?.id);
    const ev=pool[Math.floor(Math.random()*pool.length)];
    this.activeEvent=ev;this.eventTimer=ev.duration;this.eventCooldown=28+Math.random()*25;
    if(ev.id==='double_coins')this.doubleCoins=true;
    if(ev.id==='shield')this.shield=true;
    if(ev.id==='score_boost')this.scoreBoost=true;
    this.audio.play('event');vibrate([40,20,40]);
    document.getElementById('event-banner').textContent=ev.name;
    document.getElementById('event-banner').classList.remove('hidden');
    const xt=document.getElementById('special-event-toast');
    xt.querySelector('#special-event-text').textContent=ev.name;
    xt.classList.remove('hidden');xt.style.animation='none';void xt.offsetWidth;
    xt.style.animation='toastSlide 3s ease forwards';
    clearTimeout(this._evToastT);this._evToastT=setTimeout(()=>xt.classList.add('hidden'),3100);
  }
  _endEvent(){
    if(!this.activeEvent)return;
    if(this.activeEvent.id==='double_coins')this.doubleCoins=false;
    if(this.activeEvent.id==='score_boost')this.scoreBoost=false;
    this.activeEvent=null;document.getElementById('event-banner').classList.add('hidden');
  }
  _hideEventBanners(){
    document.getElementById('event-banner').classList.add('hidden');
    document.getElementById('rule-banner').classList.add('hidden');
    document.getElementById('special-event-toast').classList.add('hidden');
  }

  _loop(ts){
    requestAnimationFrame(t=>this._loop(t));
    const rawDt=Math.min((ts-this.lastTime)/1000,.05);this.lastTime=ts;
    let dt=rawDt;
    if(this.currentRule.id==='slow_motion')dt*=.38;
    if(this.currentRule.id==='speed_boost')dt*=1.5;
    this.colorHue=(this.colorHue+26*rawDt)%360;
    if(this.state==='playing')this._update(dt,rawDt);
    this._render(rawDt);
  }

  _update(dt,rawDt){
    this.elapsed+=rawDt;this.stageTimer+=rawDt;

    // SCORE (float accumulator — fixes the always-0 bug)
    const stageScore=this.stage*12,comboMult=1+this.combo*.08;
    const boostMult=this.scoreBoost?2.5:1,runBoost=this.doubleRun?2:1;
    this._scoreF+=stageScore*dt*comboMult*boostMult*runBoost;
    this.score=Math.floor(this._scoreF);

    if(this.stageTimer>=STAGE_DURATION){this._stageClear();return;}

    // Rule timer
    const ruleInt=Math.max(7,12-(this.stage-1)*.5);
    this.ruleTimer+=rawDt;
    if(this.ruleTimer>=ruleInt)this._triggerRule();

    // Special events
    this.eventCooldown-=rawDt;
    if(this.activeEvent){this.eventTimer-=rawDt;if(this.eventTimer<=0)this._endEvent();}
    else if(this.eventCooldown<=0&&this.stage>=2)this._triggerEvent();

    // Coin rain
    if(this.activeEvent?.id==='coin_rain'){
      this.coinRainT-=rawDt;
      if(this.coinRainT<=0){this.coinRainT=.35;for(let i=0;i<3;i++)this.coinItems.push({x:this.W+20+Math.random()*150,y:this.H*.1+Math.random()*this.H*.75,r:10,spd:220,coll:false,gl:Math.random()*Math.PI*2});}
    }

    // Combo decay
    this.comboTimer+=rawDt;
    if(this.comboTimer>3.5){this.combo=0;this.comboTimer=0;}

    // Screen shake
    if(this.shakeStr>0){this.shakeX=(Math.random()-.5)*this.shakeStr*2;this.shakeY=(Math.random()-.5)*this.shakeStr*2;this.shakeStr=Math.max(0,this.shakeStr-60*rawDt);}
    else{this.shakeX=0;this.shakeY=0;}

    this._updatePlayer(dt);this._spawnObstacles(rawDt);this._updateObstacles(dt);
    this._spawnCoins(rawDt);this._updateCoins(dt);this._updateParticles(rawDt);
    this._checkCollisions();this._updateHUD();this._checkAchievements();
  }

  _updatePlayer(dt){
    const p=this.player,grav=this.currentRule.id==='gravity_flip'?-1:1;
    p.vy+=1600*grav*dt;p.y+=p.vy*dt;
    const floor=this.H-p.size,ceil=p.size;
    if(grav>0){if(p.y>=floor){p.y=floor;p.vy=0;}if(p.y<=ceil){p.y=ceil;p.vy=0;}}
    else{if(p.y<=ceil){p.y=ceil;p.vy=0;}if(p.y>=floor){p.y=floor;p.vy=0;}}
    p.trail=p.trail||[];p.trail.push({x:p.x,y:p.y});
    if(p.trail.length>18)p.trail.shift();
  }
  _spawnObstacles(rawDt){
    const interval=stageSpawnInterval(this.stage);
    this.obstSpawnT+=rawDt;if(this.obstSpawnT<interval)return;this.obstSpawnT=0;
    const W=this.W,H=this.H,theme=stageObsTheme(this.stage);
    const w=18+Math.random()*14;const gap=H*.28+Math.random()*H*.08;const topH=30+Math.random()*(H-gap-60);
    const spd=stageSpeed(this.stage)*(this.currentRule.id==='speed_boost'?1.4:1)*(this.currentRule.id==='slow_motion'?.42:1);
    this.obstacles.push({x:W+w,y:0,w,h:topH,spd,theme,fl:0});
    this.obstacles.push({x:W+w,y:topH+gap,w,h:H-topH-gap,spd,theme,fl:0});
  }
  _updateObstacles(dt){
    for(const o of this.obstacles){o.x-=o.spd*dt;if(this.currentRule.id==='ghost')o.fl=(o.fl+dt*6)%(Math.PI*2);}
    this.obstacles=this.obstacles.filter(o=>o.x+o.w>-60);
  }
  _spawnCoins(rawDt){
    if(this.activeEvent?.id==='coin_rain')return;
    this.coinSpawnT+=rawDt;const interval=Math.max(.9,2.5-(this.stage-1)*.08);
    if(this.coinSpawnT<interval)return;this.coinSpawnT=0;
    const count=1+(Math.random()<.35?1:0);
    for(let i=0;i<count;i++)this.coinItems.push({x:this.W+30+i*45,y:this.H*.15+Math.random()*this.H*.65,r:10,spd:160+(this.stage-1)*18,coll:false,gl:Math.random()*Math.PI*2});
  }
  _updateCoins(dt){
    for(const c of this.coinItems){
      c.x-=c.spd*dt;c.gl+=dt*4.5;
      if(this.currentRule.id==='magnetic'&&this.player){
        const dx=this.player.x-c.x,dy=this.player.y-c.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<200){c.x+=dx/d*300*dt;c.y+=dy/d*300*dt;}
      }
    }
    this.coinItems=this.coinItems.filter(c=>!c.coll&&c.x+c.r>-30);
  }
  _updateParticles(dt){
    for(const p of this.particles)p.update(dt);for(const f of this.floatTexts)f.update(dt);
    this.particles=this.particles.filter(p=>p.life>0);this.floatTexts=this.floatTexts.filter(f=>f.life>0);
  }
  _checkCollisions(){
    if(!this.player)return;
    const p=this.player,hs=p.size*.68;
    for(const c of this.coinItems){
      if(c.coll)continue;
      const dx=p.x-c.x,dy=p.y-c.y;
      if(Math.sqrt(dx*dx+dy*dy)<hs+c.r){
        c.coll=true;const val=this.doubleCoins?2:1;
        this.coins+=val;this.combo++;this.maxCombo=Math.max(this.maxCombo,this.combo);this.comboTimer=0;
        this.audio.play('coin');
        if(this.combo>=5){this.audio.play('combo');vibrate([25]);}
        if(this.combo>=10)this.shakeStr=Math.max(this.shakeStr,3);
        for(let i=0;i<8;i++)this.particles.push(new Particle(c.x,c.y,(Math.random()-.5)*190,(Math.random()-.5)*190,'#ffd60a',.5));
        const txt=this.combo>=5?`x${this.combo} ◈+${val}`:`◈+${val}`;
        this.floatTexts.push(new FloatText(c.x,c.y-10,txt,'#ffd60a'));
      }
    }
    for(const o of this.obstacles){
      const ghost=this.currentRule.id==='ghost'&&Math.sin(o.fl)<0;if(ghost)continue;
      if(p.x+hs>o.x&&p.x-hs<o.x+o.w&&p.y+hs>o.y&&p.y-hs<o.y+o.h){this._die();return;}
    }
    if(p.y>this.H+100||p.y<-100){this._die();return;}
  }
  _updateHUD(){
    document.getElementById('score').textContent=this.score;
    document.getElementById('hud-coins').textContent=this.coins;
    const cd=document.getElementById('combo-display');
    if(this.combo>=2){document.getElementById('combo-text').textContent='x'+this.combo;cd.style.display='flex';}
    else cd.style.display='none';
    document.getElementById('stage-label').textContent='STAGE '+this.stage;
    document.getElementById('stage-timer-fill').style.width=Math.min(100,(this.stageTimer/STAGE_DURATION)*100)+'%';
    document.getElementById('stage-timer-text').textContent=Math.max(0,Math.ceil(STAGE_DURATION-this.stageTimer))+'s';
  }
  _updateMenuUI(){
    const bs=this.stats.bestStage||0;
    document.getElementById('menu-best-stage').textContent=bs?`STAGE ${bs}`:'—';
    document.getElementById('menu-highscore').textContent=this.stats.highScore||0;
    document.getElementById('daily-reward-btn').classList.toggle('hidden',!this.daily.canClaim());
    document.getElementById('wheel-btn').classList.toggle('highlight',this.wheel.canSpin());
  }
  _updateAudioUI(){
    // Master volume
    const vol = Math.round(this.audio.getVol()*100);
    const sl = document.getElementById('volume-slider');
    if (sl) sl.value = vol;
    const vd = document.getElementById('volume-val');
    if (vd) vd.textContent = vol + '%';

    // Music volume
    const mVol = Math.round(this.audio.getMusicVol()*100);
    const msl = document.getElementById('music-vol-slider');
    if (msl) msl.value = mVol;
    const mvd = document.getElementById('music-vol-val');
    if (mvd) mvd.textContent = mVol + '%';

    // SFX volume
    const sVol = Math.round(this.audio.getSfxVol()*100);
    const ssl = document.getElementById('sfx-vol-slider');
    if (ssl) ssl.value = sVol;
    const svd = document.getElementById('sfx-vol-val');
    if (svd) svd.textContent = sVol + '%';

    // HUD mute button
    const muteBtn = document.getElementById('hud-mute-btn');
    if (muteBtn) muteBtn.textContent = this.audio.getMuted() ? '🔇' : '🔊';

    // Settings toggles
    const muteAll = document.getElementById('mute-all-btn');
    if (muteAll) { muteAll.textContent = this.audio.getMuted() ? 'ON' : 'OFF'; muteAll.className='toggle-btn'+(this.audio.getMuted()?' red':''); }
    const musicTgl = document.getElementById('music-toggle');
    if (musicTgl) { musicTgl.textContent=this.audio.getMusic()?'ON':'OFF'; musicTgl.className='toggle-btn'+(this.audio.getMusic()?' on':''); }
    const sfxTgl = document.getElementById('sfx-toggle');
    if (sfxTgl) { sfxTgl.textContent=this.audio.getSFX()?'ON':'OFF'; sfxTgl.className='toggle-btn'+(this.audio.getSFX()?' on':''); }
  }

  // ── RENDER ───────────────────────────────────────────────
  _render(rawDt){
    const ctx=this.ctx,W=this.W,H=this.H,isDark=this.currentRule.id==='dark';
    ctx.save();ctx.translate(this.shakeX,this.shakeY);
    ctx.fillStyle=isDark?'#000008':'#050510';ctx.fillRect(0,0,W,H);
    if(!isDark){
      ctx.strokeStyle='rgba(0,245,255,.035)';ctx.lineWidth=1;
      const gs=60,off=(this.elapsed*30)%gs;
      for(let x=-off;x<W+gs;x+=gs){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<H;y+=gs){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    }
    for(const s of this.bgStars){
      s.tw+=rawDt*2;
      if(this.state==='playing')s.x-=s.speed*(1+(this.stage-1)*.15);
      if(s.x<0){s.x=W+10;s.y=Math.random()*H;}
      const a=s.alpha*(.6+.4*Math.sin(s.tw));
      ctx.beginPath();ctx.arc(s.x%W,s.y%H,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${a})`;ctx.fill();
    }
    for(const o of this.obstacles){
      const ghostA=this.currentRule.id==='ghost'?(.3+.7*((Math.sin(o.fl)+1)/2)):1;
      ctx.save();ctx.globalAlpha=ghostA;
      let topC,botC,glowC;const t=o.theme;
      if(t.colors){topC=t.colors[0];botC=t.colors[1];glowC=t.glow;}
      else{topC=`hsl(${this.colorHue%360},100%,60%)`;botC=`hsl(${(this.colorHue+60)%360},100%,40%)`;glowC=topC;}
      const grd=ctx.createLinearGradient(o.x,o.y,o.x+o.w,o.y+o.h);
      grd.addColorStop(0,topC);grd.addColorStop(1,botC);
      ctx.fillStyle=grd;ctx.shadowBlur=14;ctx.shadowColor=glowC;
      ctx.beginPath();if(ctx.roundRect)ctx.roundRect(o.x,o.y,o.w,o.h,4);else ctx.rect(o.x,o.y,o.w,o.h);
      ctx.fill();ctx.restore();
    }
    ctx.shadowBlur=0;
    for(const c of this.coinItems){
      if(c.coll)continue;
      const pulse=Math.sin(c.gl)*.3+.7;
      ctx.save();ctx.shadowBlur=16*pulse;ctx.shadowColor='#ffd60a';
      ctx.fillStyle=`rgba(255,214,10,${.85*pulse+.15})`;
      ctx.beginPath();ctx.arc(c.x,c.y,c.r,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`rgba(255,255,200,${.5*pulse})`;
      ctx.beginPath();ctx.arc(c.x-c.r*.25,c.y-c.r*.25,c.r*.38,0,Math.PI*2);ctx.fill();
      if(this.doubleCoins){ctx.fillStyle='#fff';ctx.font='bold 8px Orbitron,monospace';ctx.textAlign='center';ctx.textBaseline='bottom';ctx.fillText('x2',c.x,c.y-c.r-2);}
      ctx.restore();
    }
    if(this.player&&this.state!=='gameover')this._renderPlayer(ctx);
    for(const f of this.floatTexts)f.draw(ctx);
    for(const p of this.particles)p.draw(ctx);
    if(isDark&&this.player){
      const g=ctx.createRadialGradient(this.player.x,this.player.y,55,this.player.x,this.player.y,340);
      g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,8,.98)');
      ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    }
    ctx.restore();
  }
  _renderPlayer(ctx){
    const p=this.player,sk=this.skins.getSkin();
    for(let i=0;i<p.trail.length-1;i++){
      const t=p.trail[i],frac=i/p.trail.length,sz=p.size*.55*frac;
      let trailC=sk.glow;
      if(sk.id==='rainbow'||sk.id==='ultimate')trailC=`hsl(${(this.colorHue+i*12)%360},100%,65%)`;
      ctx.save();ctx.globalAlpha=frac*.42;ctx.shadowBlur=10;ctx.shadowColor=trailC;ctx.fillStyle=trailC;
      ctx.beginPath();if(ctx.roundRect)ctx.roundRect(t.x-sz/2,t.y-sz/2,sz,sz,3);else ctx.fillRect(t.x-sz/2,t.y-sz/2,sz,sz);
      ctx.fill();ctx.restore();
    }
    const s=p.size;
    let topC=sk.gradient[0],botC=sk.gradient[1]||sk.gradient[0],glowC=sk.glow;
    if(sk.id==='rainbow'||sk.id==='ultimate'||sk.id==='prism'){topC=`hsl(${this.colorHue%360},100%,65%)`;botC=`hsl(${(this.colorHue+80)%360},100%,55%)`;glowC=topC;}
    else if(sk.id==='cosmic'){topC=`hsl(${(this.colorHue*.7)%360},80%,65%)`;botC=`hsl(${((this.colorHue*.7)+120)%360},80%,50%)`;}
    ctx.save();
    ctx.shadowBlur=26+Math.sin(this.elapsed*4)*5;ctx.shadowColor=glowC;
    const grd=ctx.createLinearGradient(p.x-s/2,p.y-s/2,p.x+s/2,p.y+s/2);
    grd.addColorStop(0,topC);grd.addColorStop(1,botC);
    ctx.fillStyle=grd;
    ctx.beginPath();if(ctx.roundRect)ctx.roundRect(p.x-s/2,p.y-s/2,s,s,6);else ctx.fillRect(p.x-s/2,p.y-s/2,s,s);
    ctx.fill();
    if(this.shield){ctx.strokeStyle='rgba(0,245,255,.7)';ctx.lineWidth=2.5;ctx.shadowBlur=14;ctx.shadowColor='#00f5ff';ctx.beginPath();ctx.arc(p.x,p.y,s*.85+Math.sin(this.elapsed*6)*3,0,Math.PI*2);ctx.stroke();}
    ctx.globalAlpha=.36;ctx.fillStyle='rgba(255,255,255,.25)';
    ctx.beginPath();if(ctx.roundRect)ctx.roundRect(p.x-s/2+4,p.y-s/2+4,s*.36,s*.2,3);else ctx.fillRect(p.x-s/2+4,p.y-s/2+4,s*.36,s*.2);
    ctx.fill();ctx.restore();
  }

  _toast(icon,title,desc){
    clearTimeout(this._toastT);
    const el=document.getElementById('achievement-toast');
    el.querySelector('.achievement-icon').textContent=icon;
    el.querySelector('.achievement-name').textContent=title;
    el.querySelector('.achievement-desc').textContent=desc;
    el.classList.remove('hidden');el.style.animation='none';void el.offsetWidth;
    el.style.animation='toastIn .4s cubic-bezier(.175,.885,.32,1.275)';
    this._toastT=setTimeout(()=>el.classList.add('hidden'),3500);
  }

  // ═══════════════════════════════════════════════════════
  //  UI SETUP
  // ═══════════════════════════════════════════════════════
  _btn(id, fn) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', () => {
      this.audio.unlock();   // ensure context alive on every user click
      this.audio.play('button');
      fn();
    });
  }

  _setupUI(){
    // ── Play & menu ──
    this._btn('play-btn',     ()=>{ if(this.state==='menu') this._beginCountdown(); });
    this._btn('shop-btn',     ()=>this._openShop());
    this._btn('missions-btn', ()=>this._openMissions());
    this._btn('wheel-btn',    ()=>this._openWheel());
    this._btn('stats-btn',    ()=>this._openStats());
    this._btn('daily-reward-btn', ()=>this._openDaily());
    this._btn('settings-btn', ()=>this._openSettings());

    // ── HUD ──
    this._btn('pause-btn',    ()=>this._togglePause());
    this._btn('hud-mute-btn', ()=>{
      this.audio.setMuted(!this.audio.getMuted());
      this._updateAudioUI();
    });

    // ── Pause ──
    this._btn('resume-btn',       ()=>this._togglePause());
    this._btn('restart-btn',      ()=>{ this._closeAll(); this._beginCountdown(); });
    this._btn('pause-shop-btn',   ()=>{ document.getElementById('pause-menu').classList.add('hidden'); this._openShop('pause'); });
    this._btn('pause-settings-btn',()=>{ document.getElementById('pause-menu').classList.add('hidden'); this._openSettings('pause'); });
    this._btn('home-btn', ()=>{ this.state='menu'; this.audio.stopBGM(); this._closeAll(); document.getElementById('start-screen').classList.remove('hidden'); this._updateMenuUI(); this.audio.startMenuBGM(); });

    // ── Game Over ──
    this._btn('gameover-restart-btn', ()=>{ this._closeAll(); this._beginCountdown(); });
    this._btn('gameover-shop-btn',    ()=>{ document.getElementById('game-over').classList.add('hidden'); this._openShop('gameover'); });
    this._btn('gameover-home-btn',    ()=>{ this._closeAll(); document.getElementById('start-screen').classList.remove('hidden'); this.state='menu'; this._updateMenuUI(); this.audio.startMenuBGM(); });

    // ── Settings ──
    // Master volume slider
    const volSlider = document.getElementById('volume-slider');
    volSlider?.addEventListener('input', ()=>{
      this.audio.unlock();
      const v = parseInt(volSlider.value)/100;
      this.audio.setVolume(v);
      this._updateAudioUI();
    });
    // Music volume slider
    const musicVolSlider = document.getElementById('music-vol-slider');
    musicVolSlider?.addEventListener('input', ()=>{
      this.audio.unlock();
      const v = parseInt(musicVolSlider.value)/100;
      this.audio.setMusicVol(v);
      this._updateAudioUI();
    });
    // SFX volume slider
    const sfxVolSlider = document.getElementById('sfx-vol-slider');
    sfxVolSlider?.addEventListener('input', ()=>{
      this.audio.unlock();
      const v = parseInt(sfxVolSlider.value)/100;
      this.audio.setSfxVol(v);
      this._updateAudioUI();
    });
    this._btn('music-toggle',  ()=>{ this.audio.setMusic(!this.audio.getMusic()); this._updateAudioUI(); });
    this._btn('sfx-toggle',    ()=>{ this.audio.setSFX(!this.audio.getSFX()); this._updateAudioUI(); });
    this._btn('mute-all-btn',  ()=>{ this.audio.setMuted(!this.audio.getMuted()); this._updateAudioUI(); });
    this._btn('close-settings-btn', ()=>this._closeModal('settings-modal'));

    // ── Shop tabs ──
    document.querySelectorAll('.shop-tab').forEach(btn=>{
      btn.addEventListener('click',()=>{ this.audio.unlock(); this.audio.play('button'); document.querySelectorAll('.shop-tab').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); this._renderShop(btn.dataset.tab); });
    });
    this._btn('close-shop-btn', ()=>this._closeModal('shop-modal'));

    // ── Missions tabs ──
    document.querySelectorAll('.missions-tab').forEach(btn=>{
      btn.addEventListener('click',()=>{ this.audio.unlock(); this.audio.play('button'); document.querySelectorAll('.missions-tab').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); document.querySelectorAll('.missions-panel').forEach(p=>p.classList.remove('active-panel')); document.getElementById(btn.dataset.tab+'-panel').classList.add('active-panel'); });
    });
    this._btn('close-missions-btn', ()=>this._closeModal('missions-modal'));

    // ── Daily ──
    this._btn('claim-reward-btn', ()=>{
      if(!this.daily.canClaim())return;
      const r=this.daily.claim();this.wallet.add(r.coins);
      this.audio.play('achieve');this._toast('🎁','DAILY REWARD!',`+${r.coins} ◈ coins`);vibrate([50,30,100]);
      this._closeAll();document.getElementById('start-screen').classList.remove('hidden');this.state='menu';this._updateMenuUI();
    });
    this._btn('close-daily-btn', ()=>this._closeModal('daily-modal'));

    // ── Wheel ──
    this._btn('spin-btn',       ()=>this._doSpin());
    this._btn('close-wheel-btn',()=>this._closeModal('wheel-modal'));

    // ── Stats ──
    this._btn('close-stats-btn',()=>this._closeModal('stats-modal'));

    // Start menu BGM on first render (will be blocked until user gesture, which is fine)
    // The first user gesture will trigger unlock() and then the BGM will start
    this._pendingMenuBGM = true;
  }

  _closeAll(){
    ['start-screen','pause-menu','game-over','shop-modal','missions-modal',
     'daily-modal','wheel-modal','stats-modal','settings-modal',
     'stage-clear-overlay','countdown-overlay'].forEach(id=>{
      const el=document.getElementById(id);if(el)el.classList.add('hidden');
    });
    document.getElementById('hud')?.classList.add('hidden');
  }

  _closeModal(id){
    document.getElementById(id)?.classList.add('hidden');
    if(this.state==='paused')  { document.getElementById('pause-menu').classList.remove('hidden'); }
    else if(this.state==='gameover') { document.getElementById('game-over').classList.remove('hidden'); }
    else { document.getElementById('start-screen').classList.remove('hidden'); this.state='menu'; this._updateMenuUI(); }
  }

  _hideOverlays(){
    ['start-screen','pause-menu','game-over','shop-modal','missions-modal','daily-modal','wheel-modal','stats-modal','settings-modal'].forEach(id=>{
      document.getElementById(id)?.classList.add('hidden');
    });
  }

  // ── SETTINGS MODAL ──────────────────────────────────────
  _openSettings(from=null){
    this._from=from; this._hideOverlays();
    this._updateAudioUI();
    document.getElementById('settings-modal').classList.remove('hidden');
  }

  // ── SHOP ────────────────────────────────────────────────
  _openShop(from=null){ this._from=from; this._hideOverlays(); this._renderShop('all'); document.getElementById('shop-modal').classList.remove('hidden'); }
  _renderShop(tab='all'){
    document.getElementById('shop-coins').textContent=this.wallet.coins;
    const grid=document.getElementById('skin-grid');grid.innerHTML='';
    let list=SKINS;
    if(tab==='owned')  list=SKINS.filter(s=>this.skins.has(s.id));
    if(tab==='locked') list=SKINS.filter(s=>!this.skins.has(s.id));
    list.forEach(sk=>{
      const owned=this.skins.has(sk.id),equipped=this.skins.equipped===sk.id;
      const card=document.createElement('div');
      card.className='skin-card'+(equipped?' equipped':'')+(owned?'':' locked')+(sk.secret?' secret':'');
      const cv=document.createElement('canvas');cv.className='skin-preview';cv.width=88;cv.height=88;
      const pc=cv.getContext('2d');pc.fillStyle='#0a0a20';pc.fillRect(0,0,88,88);pc.shadowBlur=18;pc.shadowColor=sk.glow;
      if(sk.gradient.length>2){const g=pc.createLinearGradient(14,14,74,74);sk.gradient.forEach((c,i)=>g.addColorStop(i/(sk.gradient.length-1),c));pc.fillStyle=g;}
      else{const g=pc.createLinearGradient(14,14,74,74);g.addColorStop(0,sk.gradient[0]);g.addColorStop(1,sk.gradient[1]||sk.gradient[0]);pc.fillStyle=g;}
      pc.beginPath();if(pc.roundRect)pc.roundRect(14,14,60,60,10);else pc.fillRect(14,14,60,60);pc.fill();
      card.appendChild(cv);
      const nm=document.createElement('div');nm.className='skin-name';nm.textContent=(sk.secret&&!owned)?'???':sk.name;card.appendChild(nm);
      if(equipped){const b=document.createElement('span');b.className='skin-eq-badge';b.textContent='✓';card.appendChild(b);}
      if(sk.secret){const b=document.createElement('span');b.className='skin-sec-badge';b.textContent=owned?'🔓':'🔒';card.appendChild(b);}
      const sub=document.createElement('div');sub.className='skin-sub';
      if(owned&&!equipped){sub.textContent='TAP TO EQUIP';sub.style.color='rgba(255,255,255,.35)';}
      else if(!owned&&!sk.secret){sub.textContent='◈ '+sk.price;sub.style.color=this.wallet.coins>=sk.price?'#ffd60a':'#ff2d78';}
      else if(!owned&&sk.secret){sub.textContent=sk.hint;sub.style.color='rgba(255,255,255,.35)';sub.style.fontSize='7px';}
      else if(equipped){sub.textContent='EQUIPPED';sub.style.color='#00f5ff';}
      card.appendChild(sub);
      if(!owned&&!sk.secret){
        card.onclick=()=>{
          this.audio.unlock();
          if(this.wallet.spend(sk.price)){this.skins.unlock(sk.id);this._checkAchievements();this._renderShop(tab);this.audio.play('purchase');vibrate([50,30,100]);}
          else{card.style.borderColor='rgba(255,45,120,.7)';setTimeout(()=>card.style.borderColor='',500);this.audio.play('button');}
        };
      } else if(owned&&!equipped){
        card.onclick=()=>{ this.audio.unlock(); this.skins.equip(sk.id); this._renderShop(tab); this.audio.play('button'); vibrate([25]); };
      }
      grid.appendChild(card);
    });
  }

  // ── MISSIONS ────────────────────────────────────────────
  _openMissions(){ this._hideOverlays(); this._renderMissions(); document.getElementById('missions-modal').classList.remove('hidden'); }
  _renderMissions(){
    const mp=document.getElementById('missions-panel');mp.innerHTML='';
    MISSIONS.forEach(m=>{
      const st=this.missions.get(m.id),prog=Math.min(st.progress,m.goal);
      const div=document.createElement('div');div.className='mission-item'+(st.done?' done':'');
      div.innerHTML=`<div class="mission-title">${m.title} ${st.done?'✓':''}</div><div class="mission-desc-t">${m.desc}</div><div class="mission-prog-bar"><div class="mission-prog-fill" style="width:${(prog/m.goal)*100}%"></div></div><div class="mission-rew-row"><span class="mission-rew">◈ ${m.reward}</span><span class="mission-prog">${prog}/${m.goal}</span></div>`;
      mp.appendChild(div);
    });
    const ap=document.getElementById('achievements-panel');ap.innerHTML='';
    ACHIEVEMENTS.forEach(a=>{
      const un=this.achMgr.has(a.id);
      const div=document.createElement('div');div.className='ach-item'+(un?' done':'')+(a.secret?' secret':'');
      div.innerHTML=`<div class="ach-icon-el">${un?a.icon:(a.secret?'❓':a.icon)}</div><div class="ach-body"><div class="ach-title-el">${(un||!a.secret)?a.title:'???'} ${un?'✓':''}</div><div class="ach-desc-el">${(un||!a.secret)?a.desc:'Secret achievement'}</div></div>`;
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
      const claimed=i<(streak%7===0&&streak>0?7:streak%7);
      const isToday=i===(streak%7===0&&streak>0?6:Math.max(0,streak%7-1))&&this.daily.canClaim();
      const card=document.createElement('div');card.className='day-card'+(claimed?' claimed':(isToday?' today':' future'));
      card.innerHTML=`<div class="day-num">DAY ${i+1}</div><div class="day-icon">${d.icon}</div><div class="day-rew">${d.label}</div>`;
      cal.appendChild(card);
    });
    const todayR=DAILY_DAYS[Math.max(0,streak%7)];
    document.getElementById('daily-reward-amount').textContent='+'+todayR.coins;
    const claimBtn=document.getElementById('claim-reward-btn');
    claimBtn.disabled=!this.daily.canClaim();
    claimBtn.textContent=this.daily.canClaim()?`CLAIM ${todayR.coins} ◈`:'CLAIMED';
    document.getElementById('daily-reward-desc').textContent=this.daily.canClaim()?'Come back tomorrow for more!':this.daily.cooldownText();
    document.getElementById('daily-modal').classList.remove('hidden');
  }

  // ── WHEEL ────────────────────────────────────────────────
  _openWheel(){
    this._hideOverlays();
    const coolEl=document.getElementById('wheel-cooldown-display'),spinBtn=document.getElementById('spin-btn'),resEl=document.getElementById('wheel-result');
    resEl.classList.add('hidden');
    if(this.wheel.canSpin()){coolEl.classList.add('hidden');spinBtn.disabled=false;spinBtn.classList.add('btn-pulse');}
    else{coolEl.textContent=this.wheel.cooldownText();coolEl.classList.remove('hidden');spinBtn.disabled=true;spinBtn.classList.remove('btn-pulse');}
    this._drawWheel(0);document.getElementById('wheel-modal').classList.remove('hidden');
  }
  _drawWheel(rot){
    const cv=document.getElementById('wheel-canvas'),ctx=cv.getContext('2d'),cx=cv.width/2,r=cx-8;
    const total=WHEEL_PRIZES.reduce((s,p)=>s+p.prob,0);
    const pals=[['#1a1a3e','#2a2a5e'],['#12122e','#22224e'],['#1e1040','#2e2060'],['#0e0e28','#1e1e48'],['#141428','#242448'],['#18183a','#28285a'],['#0c0c22','#1c1c42'],['#161632','#262652']];
    ctx.clearRect(0,0,cv.width,cv.width);let angle=rot;
    WHEEL_PRIZES.forEach((prize,i)=>{
      const sweep=(prize.prob/total)*Math.PI*2;
      const g=ctx.createRadialGradient(cx,cx,r*.3,cx,cx,r);g.addColorStop(0,pals[i%pals.length][0]);g.addColorStop(1,pals[i%pals.length][1]);
      ctx.beginPath();ctx.moveTo(cx,cx);ctx.arc(cx,cx,r,angle,angle+sweep);ctx.closePath();ctx.fillStyle=g;ctx.fill();
      ctx.strokeStyle='rgba(0,245,255,.2)';ctx.lineWidth=1;ctx.stroke();
      ctx.save();ctx.translate(cx,cx);ctx.rotate(angle+sweep/2);ctx.textAlign='right';ctx.font='bold 10px Orbitron,monospace';ctx.fillStyle='#fff';ctx.shadowBlur=6;ctx.shadowColor='#00f5ff';ctx.fillText(prize.label,r-8,4);ctx.restore();
      angle+=sweep;
    });
    ctx.beginPath();ctx.arc(cx,cx,20,0,Math.PI*2);const cg=ctx.createRadialGradient(cx,cx,0,cx,cx,20);cg.addColorStop(0,'#00f5ff');cg.addColorStop(1,'#0044aa');ctx.fillStyle=cg;ctx.shadowBlur=12;ctx.shadowColor='#00f5ff';ctx.fill();ctx.shadowBlur=0;
  }
  _doSpin(){
    if(!this.wheel.canSpin())return;
    const spinBtn=document.getElementById('spin-btn');spinBtn.disabled=true;spinBtn.classList.remove('btn-pulse');
    this.stats.wheelSpins++;this.stats.save();vibrate([40]);
    const prize=this.wheel.spin();
    const total=WHEEL_PRIZES.reduce((s,p)=>s+p.prob,0);const prizeIdx=WHEEL_PRIZES.indexOf(prize);
    let targetAngle=0;for(let i=0;i<prizeIdx;i++)targetAngle+=(WHEEL_PRIZES[i].prob/total)*Math.PI*2;
    targetAngle+=(prize.prob/total)*Math.PI*2*.5;
    const totalAngle=(6+Math.random()*3)*Math.PI*2+(Math.PI*2-targetAngle%(Math.PI*2));
    const dur=4000,start=performance.now();
    const animate=now=>{const t=Math.min(1,(now-start)/dur),ease=1-Math.pow(1-t,4);this._drawWheel(ease*totalAngle);if(t<1)requestAnimationFrame(animate);else this._handleWheelResult(prize);};
    requestAnimationFrame(animate);
  }
  _handleWheelResult(prize){
    let msg='';
    if(prize.coins){this.wallet.add(prize.coins);msg=`◈ ${prize.coins} COINS!`;}
    if(prize.xp2){this.wheel.setXP2(true);msg='2x SCORE NEXT GAME!';}
    if(prize.coins>=200)this.achMgr.unlock('jackpot');
    this.audio.play('achieve');vibrate([80,40,100]);
    const el=document.getElementById('wheel-result');el.textContent='🎁 '+msg;el.classList.remove('hidden');
    document.getElementById('wheel-cooldown-display').textContent=this.wheel.cooldownText();
    document.getElementById('wheel-cooldown-display').classList.remove('hidden');
    this._updateMenuUI();
  }

  // ── STATS ────────────────────────────────────────────────
  _openStats(){
    this._hideOverlays();
    const grid=document.getElementById('stats-grid');grid.innerHTML='';
    [{icon:'🎮',label:'GAMES PLAYED',value:this.stats.gamesPlayed},{icon:'⭐',label:'HIGH SCORE',value:this.stats.highScore},{icon:'🏆',label:'BEST STAGE',value:this.stats.bestStage||'—'},{icon:'◈',label:'TOTAL COINS',value:this.stats.totalCoins},{icon:'⏱',label:'LONGEST RUN',value:Math.floor(this.stats.longestRun)+'s'},{icon:'🔥',label:'BEST COMBO',value:'x'+this.stats.highestCombo},{icon:'🔓',label:'SKINS OWNED',value:this.skins.unlocked.length+'/'+SKINS.length},{icon:'🎡',label:'WHEEL SPINS',value:this.stats.wheelSpins}]
    .forEach(it=>{const card=document.createElement('div');card.className='stat-card';card.innerHTML=`<div class="stat-card-icon">${it.icon}</div><div class="stat-card-value">${it.value}</div><div class="stat-card-label">${it.label}</div>`;grid.appendChild(card);});
    document.getElementById('stats-modal').classList.remove('hidden');
  }
}

// ═══════════════════════════════════════════════════════════
//  BOOT
// ═══════════════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
  const game = new ShadowRush();

  // Start menu BGM once user unlocks audio (on first interaction)
  const startMenu = () => {
    game.audio.unlock();
    game.audio.startMenuBGM();
    document.removeEventListener('click', startMenu);
    document.removeEventListener('touchstart', startMenu);
    document.removeEventListener('keydown', startMenu);
  };
  document.addEventListener('click', startMenu);
  document.addEventListener('touchstart', startMenu, { passive: true });
  document.addEventListener('keydown', startMenu);
});
