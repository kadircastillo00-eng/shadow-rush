// ============================================================
//  SHADOW RUSH — Complete Game Engine
// ============================================================

// ---- Audio Manager (Web Audio API) ----
class AudioManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.bgNodes = null;
    this.bgGain = null;
    this._init();
  }

  _init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) { this.enabled = false; }
  }

  _resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  _tone(freq, type, dur, vol = 0.3, delay = 0) {
    if (!this.enabled || !this.ctx) return;
    this._resume();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + delay);
    gain.gain.setValueAtTime(vol, this.ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + dur);
    osc.start(this.ctx.currentTime + delay);
    osc.stop(this.ctx.currentTime + delay + dur);
  }

  playJump() {
    this._tone(220, 'sine', 0.12, 0.25);
    this._tone(440, 'sine', 0.08, 0.15, 0.06);
  }

  playCoin() {
    this._tone(880, 'sine', 0.1, 0.25);
    this._tone(1320, 'sine', 0.08, 0.2, 0.08);
  }

  playDie() {
    this._tone(200, 'sawtooth', 0.15, 0.3);
    this._tone(100, 'sawtooth', 0.2, 0.3, 0.1);
    this._tone(60, 'square', 0.25, 0.4, 0.2);
  }

  playRuleChange() {
    [440, 550, 660, 880].forEach((f, i) => this._tone(f, 'sine', 0.1, 0.2, i * 0.07));
  }

  playCombo() {
    this._tone(660, 'sine', 0.08, 0.2);
    this._tone(880, 'sine', 0.08, 0.12, 0.05);
  }

  playAchievement() {
    [523, 659, 784, 1047].forEach((f, i) => this._tone(f, 'sine', 0.15, 0.2, i * 0.08));
  }

  startBGM() {
    if (!this.enabled || !this.ctx || this.bgNodes) return;
    this._resume();
    // Ambient pulsing drone
    this.bgGain = this.ctx.createGain();
    this.bgGain.gain.value = 0.05;
    this.bgGain.connect(this.ctx.destination);

    const freqs = [55, 82, 110];
    this.bgNodes = freqs.map(f => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f;
      osc.connect(this.bgGain);
      osc.start();
      return osc;
    });

    // Subtle LFO
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.value = 0.2;
    lfoGain.gain.value = 0.03;
    lfo.connect(lfoGain);
    lfoGain.connect(this.bgGain.gain);
    lfo.start();
    this.bgNodes.push(lfo);
  }

  stopBGM() {
    if (!this.bgNodes) return;
    try {
      this.bgNodes.forEach(n => n.stop());
    } catch (e) {}
    this.bgNodes = null;
    if (this.bgGain) { this.bgGain.disconnect(); this.bgGain = null; }
  }
}

// ---- Skin Manager ----
const SKINS = [
  { id: 'default',   name: 'NEON CUBE',  color: '#00f5ff', glow: '#00f5ff', price: 0,   gradient: ['#00f5ff','#0099cc'] },
  { id: 'fire',      name: 'FIRE',       color: '#ff6b35', glow: '#ff4500', price: 50,  gradient: ['#ff6b35','#ff0000'] },
  { id: 'ice',       name: 'ICE',        color: '#a8e6ff', glow: '#00bfff', price: 50,  gradient: ['#a8e6ff','#0080ff'] },
  { id: 'purple',    name: 'PHANTOM',    color: '#bf5af2', glow: '#8000ff', price: 100, gradient: ['#bf5af2','#8000ff'] },
  { id: 'gold',      name: 'GOLD',       color: '#ffd60a', glow: '#ff9500', price: 150, gradient: ['#ffd60a','#ff9500'] },
  { id: 'green',     name: 'MATRIX',     color: '#30d158', glow: '#00ff41', price: 100, gradient: ['#30d158','#00ff00'] },
  { id: 'pink',      name: 'NEON PINK',  color: '#ff2d78', glow: '#ff0066', price: 150, gradient: ['#ff2d78','#ff0066'] },
  { id: 'rainbow',   name: 'RAINBOW',    color: '#ffffff', glow: '#ffffff', price: 300, gradient: ['#ff0000','#ff9900','#ffff00','#00ff00','#0099ff','#bf00ff'] },
];

class SkinManager {
  constructor() {
    const saved = JSON.parse(localStorage.getItem('sr_skins') || '{}');
    this.unlocked = saved.unlocked || ['default'];
    this.equipped = saved.equipped || 'default';
    this.rainbowHue = 0;
  }

  save() {
    localStorage.setItem('sr_skins', JSON.stringify({ unlocked: this.unlocked, equipped: this.equipped }));
  }

  getSkin() { return SKINS.find(s => s.id === this.equipped) || SKINS[0]; }

  unlock(id) {
    if (!this.unlocked.includes(id)) { this.unlocked.push(id); this.save(); }
  }

  equip(id) { this.equipped = id; this.save(); }

  isUnlocked(id) { return this.unlocked.includes(id); }
}

// ---- Mission / Achievement Manager ----
const MISSIONS = [
  { id: 'score500',   title: 'HALF A K',       desc: 'Reach 500 score',          goal: 500,  key: 'score',  reward: 20 },
  { id: 'score2000',  title: 'TWO GRAND',       desc: 'Reach 2000 score',         goal: 2000, key: 'score',  reward: 50 },
  { id: 'coins50',    title: 'COIN HOARDER',    desc: 'Collect 50 coins in a run', goal: 50,  key: 'coins',  reward: 30 },
  { id: 'combo5',     title: 'ON FIRE',         desc: 'Get a x5 combo',           goal: 5,   key: 'combo',  reward: 25 },
  { id: 'survive60',  title: 'SURVIVOR',        desc: 'Survive 60 seconds',       goal: 60,  key: 'time',   reward: 40 },
  { id: 'rules3',     title: 'RULE BREAKER',    desc: 'Survive 3 rule changes',   goal: 3,   key: 'rules',  reward: 35 },
];

const ACHIEVEMENTS = [
  { id: 'first_run',    title: 'FIRST RUSH',    desc: 'Play your first game',      icon: '🎮' },
  { id: 'score1000',    title: 'KILO RUSH',     desc: 'Reach score 1000',          icon: '⭐' },
  { id: 'score5000',    title: 'MEGA RUSH',     desc: 'Reach score 5000',          icon: '🌟' },
  { id: 'coins100',     title: 'COIN MASTER',   desc: 'Total 100 coins collected', icon: '💰' },
  { id: 'coins500',     title: 'COIN KING',     desc: 'Total 500 coins collected', icon: '👑' },
  { id: 'combo10',      title: 'COMBO MANIAC',  desc: 'Reach x10 combo',          icon: '🔥' },
  { id: 'skin_buy',     title: 'STYLIST',       desc: 'Unlock any skin',           icon: '🎨' },
  { id: 'survive120',   title: 'IRON CUBE',     desc: 'Survive 2 minutes',        icon: '🏆' },
];

class ProgressManager {
  constructor() {
    const saved = JSON.parse(localStorage.getItem('sr_progress') || '{}');
    this.missions   = saved.missions || {};
    this.achievements = saved.achievements || {};
    this.totalCoins = saved.totalCoins || 0;
    this.totalGames = saved.totalGames || 0;
  }

  save() {
    localStorage.setItem('sr_progress', JSON.stringify({
      missions: this.missions,
      achievements: this.achievements,
      totalCoins: this.totalCoins,
      totalGames: this.totalGames
    }));
  }

  resetMissions() {
    MISSIONS.forEach(m => { this.missions[m.id] = { progress: 0, completed: false, claimed: false }; });
    this.save();
  }

  getMission(id) {
    if (!this.missions[id]) this.missions[id] = { progress: 0, completed: false, claimed: false };
    return this.missions[id];
  }

  updateMission(key, value) {
    const hits = [];
    MISSIONS.forEach(m => {
      if (m.key !== key) return;
      const state = this.getMission(m.id);
      if (state.completed) return;
      const prev = state.progress;
      state.progress = Math.max(state.progress, value);
      if (state.progress >= m.goal && !state.completed) {
        state.completed = true;
        hits.push(m);
      }
    });
    this.save();
    return hits;
  }

  checkAchievement(id) {
    if (this.achievements[id]) return false;
    this.achievements[id] = true;
    this.save();
    return true;
  }
}

// ---- Daily Reward ----
class DailyReward {
  constructor() {
    const saved = JSON.parse(localStorage.getItem('sr_daily') || '{}');
    this.lastClaim = saved.lastClaim || 0;
    this.streak = saved.streak || 0;
  }

  isAvailable() {
    const now = Date.now();
    const diff = now - this.lastClaim;
    return diff > 20 * 60 * 60 * 1000; // 20 hours
  }

  getAmount() {
    return 50 + this.streak * 10;
  }

  claim() {
    const now = Date.now();
    if (now - this.lastClaim < 48 * 60 * 60 * 1000) {
      this.streak++;
    } else {
      this.streak = 0;
    }
    this.lastClaim = now;
    localStorage.setItem('sr_daily', JSON.stringify({ lastClaim: this.lastClaim, streak: this.streak }));
    return this.getAmount();
  }
}

// ---- Particle System ----
class Particle {
  constructor(x, y, vx, vy, color, life) {
    this.x = x; this.y = y;
    this.vx = vx; this.vy = vy;
    this.color = color;
    this.life = life; this.maxLife = life;
    this.size = Math.random() * 4 + 2;
  }

  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vy += 200 * dt;
    this.life -= dt;
  }

  draw(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    const sz = this.size * alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, sz, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// ---- Rules ----
const RULES = [
  { id: 'normal',       name: 'NORMAL',           desc: '' },
  { id: 'gravity_flip', name: '⬆ GRAVITY FLIP',   desc: 'Gravity reversed!' },
  { id: 'speed_boost',  name: '⚡ SPEED BOOST',    desc: 'Everything faster!' },
  { id: 'slow_motion',  name: '🐢 SLOW MOTION',    desc: 'Time slows down...' },
  { id: 'tiny',         name: '🔬 TINY MODE',      desc: 'Cube shrinks!' },
  { id: 'big',          name: '🔭 BIG MODE',       desc: 'Cube grows!' },
  { id: 'dark',         name: '🌑 DARKNESS',       desc: 'Lights out!' },
  { id: 'inverted',     name: '↔ INVERTED CTRL',  desc: 'Controls inverted!' },
  { id: 'mirror',       name: '🪞 MIRROR',          desc: 'Screen mirrored!' },
  { id: 'magnetic',     name: '🧲 MAGNETIC',       desc: 'Coins attracted!' },
  { id: 'obstacle_fast',name: '🚀 FAST OBSTACLES', desc: 'Obstacles speed up!' },
  { id: 'screen_shake', name: '🌊 SCREEN SHAKE',   desc: 'Earthquake!' },
];

// ---- Main Game ----
class ShadowRush {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.audio = new AudioManager();
    this.skinMgr = new SkinManager();
    this.progress = new ProgressManager();
    this.daily = new DailyReward();

    this.state = 'menu'; // menu | playing | paused | gameover
    this.score = 0;
    this.coins = 0;
    this.highScore = parseInt(localStorage.getItem('sr_highscore') || '0');
    this.walletCoins = parseInt(localStorage.getItem('sr_wallet') || '0');

    this.player = null;
    this.obstacles = [];
    this.coinItems = [];
    this.particles = [];

    this.combo = 0;
    this.comboTimer = 0;
    this.lastTime = 0;
    this.elapsed = 0;
    this.ruleTimer = 0;
    this.ruleInterval = 10;
    this.currentRule = RULES[0];
    this.nextRuleIndex = 1;
    this.ruleChangeCount = 0;

    this.difficultyLevel = 1;
    this.obstacleSpawnTimer = 0;
    this.coinSpawnTimer = 0;

    this.screenShakeX = 0;
    this.screenShakeY = 0;
    this.shakeStrength = 0;

    this.bgStars = [];
    this.bgGrid = [];
    this.colorHue = 0;

    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchStartTime = 0;

    this.sessionMissionProgress = { score: 0, coins: 0, combo: 0, time: 0, rules: 0 };

    this._initCanvas();
    this._initBG();
    this._bindEvents();
    this._setupUI();
    this._updateBestScoreDisplay();
    this._checkDailyReward();

    // Reset missions each game session
    requestAnimationFrame(ts => { this.lastTime = ts; this._loop(ts); });
  }

  _initCanvas() {
    const resize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.W = this.canvas.width;
      this.H = this.canvas.height;
      if (this.player) {
        this.player.x = Math.min(this.player.x, this.W * 0.25);
      }
    };
    window.addEventListener('resize', resize);
    resize();
  }

  _initBG() {
    this.bgStars = Array.from({ length: 80 }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * 1200,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.5 + 0.1,
      alpha: Math.random() * 0.7 + 0.1,
    }));
  }

  _createPlayer() {
    const y = this.H / 2;
    return {
      x: this.W * 0.2,
      y,
      vy: 0,
      size: 28,
      baseSize: 28,
      grounded: false,
      trail: [],
    };
  }

  // ---- Events ----
  _bindEvents() {
    const canvas = this.canvas;

    canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      const t = e.touches[0];
      this.touchStartX = t.clientX;
      this.touchStartY = t.clientY;
      this.touchStartTime = Date.now();
      this._onTouchDown(t.clientX, t.clientY);
    }, { passive: false });

    canvas.addEventListener('touchend', e => {
      e.preventDefault();
      const t = e.changedTouches[0];
      const dx = t.clientX - this.touchStartX;
      const dy = t.clientY - this.touchStartY;
      const dt = Date.now() - this.touchStartTime;
      this._onTouchUp(dx, dy, dt);
    }, { passive: false });

    canvas.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

    // Mouse fallback for desktop testing
    canvas.addEventListener('mousedown', e => {
      this.touchStartX = e.clientX;
      this.touchStartY = e.clientY;
      this.touchStartTime = Date.now();
      this._onTouchDown(e.clientX, e.clientY);
    });
    canvas.addEventListener('mouseup', e => {
      const dx = e.clientX - this.touchStartX;
      const dy = e.clientY - this.touchStartY;
      const dt = Date.now() - this.touchStartTime;
      this._onTouchUp(dx, dy, dt);
    });

    document.addEventListener('keydown', e => {
      if (e.code === 'Space' || e.code === 'ArrowUp') this._onTouchDown(this.W / 2, this.H / 2);
      if (e.code === 'Escape') this._togglePause();
    });
  }

  _onTouchDown(x, y) {
    if (this.state === 'menu') { this._startGame(); return; }
    if (this.state === 'gameover') return;
    if (this.state === 'paused') return;
    if (this.state === 'playing') {
      this._playerJump();
    }
  }

  _onTouchUp(dx, dy, dt) {}

  // ---- Player Physics ----
  _playerJump() {
    if (!this.player) return;
    const gravDir = this.currentRule.id === 'gravity_flip' ? -1 : 1;
    const jumpForce = -650 * gravDir;
    const inverted = this.currentRule.id === 'inverted';

    // Jump = go opposite gravity
    this.player.vy = jumpForce;
    this.audio.playJump();

    // Spawn trail particles
    for (let i = 0; i < 5; i++) {
      const skin = this.skinMgr.getSkin();
      this.particles.push(new Particle(
        this.player.x, this.player.y,
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 150,
        skin.glow,
        0.4
      ));
    }
  }

  // ---- Game State ----
  _startGame() {
    this.state = 'playing';
    this.score = 0;
    this.coins = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.elapsed = 0;
    this.ruleTimer = 0;
    this.ruleChangeCount = 0;
    this.currentRule = RULES[0];
    this.nextRuleIndex = 1;
    this.difficultyLevel = 1;
    this.obstacles = [];
    this.coinItems = [];
    this.particles = [];
    this.obstacleSpawnTimer = 0;
    this.coinSpawnTimer = 0;
    this.shakeStrength = 0;
    this.sessionMissionProgress = { score: 0, coins: 0, combo: 0, time: 0, rules: 0 };

    this.player = this._createPlayer();

    // Reset daily missions per run
    this.progress.resetMissions();

    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('pause-menu').classList.add('hidden');
    document.getElementById('game-over').classList.add('hidden');
    document.getElementById('hud').classList.remove('hidden');

    this._updateHUD();
    this._updateRuleLabel();
    this.audio.startBGM();
  }

  _togglePause() {
    if (this.state === 'playing') {
      this.state = 'paused';
      document.getElementById('pause-menu').classList.remove('hidden');
      document.getElementById('pause-score-display').textContent = `SCORE: ${this.score}`;
      this.audio.stopBGM();
    } else if (this.state === 'paused') {
      this.state = 'playing';
      document.getElementById('pause-menu').classList.add('hidden');
      this.lastTime = performance.now();
      this.audio.startBGM();
    }
  }

  _die() {
    if (this.state !== 'playing') return;
    this.state = 'gameover';
    this.audio.stopBGM();
    this.audio.playDie();

    // Death particles
    if (this.player) {
      const skin = this.skinMgr.getSkin();
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const speed = 200 + Math.random() * 200;
        this.particles.push(new Particle(
          this.player.x, this.player.y,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          skin.glow,
          0.8
        ));
      }
    }

    // Add coins to wallet
    this.walletCoins += this.coins;
    localStorage.setItem('sr_wallet', this.walletCoins);

    // High score
    const isNew = this.score > this.highScore;
    if (isNew) {
      this.highScore = this.score;
      localStorage.setItem('sr_highscore', this.highScore);
    }

    // Mission final update
    this.progress.updateMission('score', this.score);
    this.progress.updateMission('coins', this.coins);
    this.progress.updateMission('time', Math.floor(this.elapsed));
    this.progress.updateMission('rules', this.ruleChangeCount);

    // Achievements
    this.progress.totalGames++;
    this.progress.totalCoins += this.coins;
    this.progress.save();

    this._checkAchievements();

    // Show game over
    document.getElementById('hud').classList.add('hidden');
    document.getElementById('final-score').textContent = this.score;
    document.getElementById('final-best').textContent = this.highScore;
    document.getElementById('final-coins').textContent = this.coins;

    const badge = document.getElementById('new-best-badge');
    if (isNew) badge.classList.remove('hidden');
    else badge.classList.add('hidden');

    this._renderMissionProgress();
    this._updateBestScoreDisplay();

    document.getElementById('game-over').classList.remove('hidden');
  }

  _checkAchievements() {
    const show = (id) => {
      const ach = ACHIEVEMENTS.find(a => a.id === id);
      if (!ach) return;
      if (this.progress.checkAchievement(id)) {
        this._showAchievementToast(ach);
        this.audio.playAchievement();
      }
    };

    if (this.progress.totalGames >= 1) show('first_run');
    if (this.score >= 1000) show('score1000');
    if (this.score >= 5000) show('score5000');
    if (this.progress.totalCoins >= 100) show('coins100');
    if (this.progress.totalCoins >= 500) show('coins500');
    if (this.combo >= 10) show('combo10');
    if (this.skinMgr.unlocked.length > 1) show('skin_buy');
    if (this.elapsed >= 120) show('survive120');
  }

  _showAchievementToast(ach) {
    const toast = document.getElementById('achievement-toast');
    toast.querySelector('.achievement-name').textContent = ach.title;
    toast.querySelector('.achievement-desc').textContent = ach.desc;
    toast.querySelector('.achievement-icon').textContent = ach.icon;
    toast.classList.remove('hidden');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
  }

  // ---- Rule System ----
  _triggerRuleChange() {
    const rulePool = RULES.filter(r => r.id !== 'normal' && r.id !== this.currentRule.id);
    this.currentRule = rulePool[Math.floor(Math.random() * rulePool.length)];
    this.ruleChangeCount++;
    this.ruleTimer = 0;
    this.progress.updateMission('rules', this.ruleChangeCount);
    this.sessionMissionProgress.rules = this.ruleChangeCount;

    this._applyRule(this.currentRule);
    this._showRuleNotification(this.currentRule);
    this.audio.playRuleChange();

    // Flash effect
    this.shakeStrength = this.currentRule.id === 'screen_shake' ? 12 : 4;
  }

  _applyRule(rule) {
    if (!this.player) return;
    switch (rule.id) {
      case 'tiny': this.player.size = this.player.baseSize * 0.55; break;
      case 'big':  this.player.size = this.player.baseSize * 1.6; break;
      default:     this.player.size = this.player.baseSize; break;
    }
  }

  _showRuleNotification(rule) {
    const el = document.getElementById('rule-notification');
    const text = document.getElementById('rule-notification-text');
    text.textContent = rule.name + (rule.desc ? '\n' + rule.desc : '');
    el.classList.remove('hidden');
    el.style.animation = 'none';
    void el.offsetWidth;
    el.style.animation = 'ruleShow 2.5s ease forwards';
    clearTimeout(this._ruleNotifTimer);
    this._ruleNotifTimer = setTimeout(() => el.classList.add('hidden'), 2600);
  }

  _updateRuleLabel() {
    const label = document.getElementById('rule-label');
    if (this.currentRule.id === 'normal') {
      label.textContent = 'NEXT CHANGE: ' + Math.ceil(this.ruleInterval - this.ruleTimer) + 's';
    } else {
      label.textContent = this.currentRule.name;
    }
  }

  // ---- Update Loop ----
  _loop(ts) {
    requestAnimationFrame(t => this._loop(t));
    const rawDt = Math.min((ts - this.lastTime) / 1000, 0.05);
    this.lastTime = ts;

    let dt = rawDt;
    if (this.currentRule.id === 'slow_motion') dt *= 0.4;
    if (this.currentRule.id === 'speed_boost') dt *= 1.5;

    this.colorHue = (this.colorHue + 30 * rawDt) % 360;

    if (this.state === 'playing') {
      this._update(dt, rawDt, ts);
    }

    // Always render particles (death effect on game over)
    this._render(rawDt);
  }

  _update(dt, rawDt, ts) {
    this.elapsed += rawDt;
    this.score += Math.floor(10 * dt * this.difficultyLevel * (1 + this.combo * 0.1));

    // Difficulty ramp
    this.difficultyLevel = 1 + this.elapsed * 0.03;

    // Rule timer
    this.ruleTimer += rawDt;
    const rulePct = this.ruleTimer / this.ruleInterval;
    document.getElementById('rule-timer-fill').style.width = ((1 - rulePct) * 100) + '%';
    if (this.ruleTimer >= this.ruleInterval) this._triggerRuleChange();
    this._updateRuleLabel();

    // Combo decay
    this.comboTimer += rawDt;
    if (this.comboTimer > 3) {
      this.combo = 0;
      this.comboTimer = 0;
    }

    // Screen shake
    if (this.shakeStrength > 0) {
      this.screenShakeX = (Math.random() - 0.5) * this.shakeStrength;
      this.screenShakeY = (Math.random() - 0.5) * this.shakeStrength;
      this.shakeStrength = Math.max(0, this.shakeStrength - 60 * rawDt);
    } else {
      this.screenShakeX = 0;
      this.screenShakeY = 0;
    }

    if (this.currentRule.id === 'screen_shake') {
      this.screenShakeX = (Math.random() - 0.5) * 6;
      this.screenShakeY = (Math.random() - 0.5) * 6;
    }

    this._updatePlayer(dt);
    this._spawnObstacles(dt);
    this._updateObstacles(dt);
    this._spawnCoins(dt);
    this._updateCoins(dt);
    this._updateParticles(rawDt);
    this._checkCollisions();
    this._updateHUD();

    // Mission progress
    this.sessionMissionProgress.score = this.score;
    this.sessionMissionProgress.time = this.elapsed;
    if (this.score % 100 < 10) { // roughly every 100 points
      this.progress.updateMission('score', this.score);
      this.progress.updateMission('time', Math.floor(this.elapsed));
    }
    this.progress.updateMission('combo', this.combo);
  }

  _updatePlayer(dt) {
    const p = this.player;
    const gravDir = this.currentRule.id === 'gravity_flip' ? -1 : 1;
    const gravity = 1600 * gravDir;

    p.vy += gravity * dt;
    p.y += p.vy * dt;

    // Floor / ceiling
    const floor = this.H - p.size;
    const ceil  = p.size;

    if (gravDir > 0) {
      if (p.y >= floor) { p.y = floor; p.vy = 0; p.grounded = true; }
      else p.grounded = false;
      if (p.y <= ceil) { p.y = ceil; p.vy = 0; }
    } else {
      if (p.y <= ceil) { p.y = ceil; p.vy = 0; p.grounded = true; }
      else p.grounded = false;
      if (p.y >= floor) { p.y = floor; p.vy = 0; }
    }

    // Trail
    p.trail.push({ x: p.x, y: p.y });
    if (p.trail.length > 12) p.trail.shift();
  }

  _spawnObstacles(dt) {
    const baseInterval = Math.max(0.7, 2.2 - this.difficultyLevel * 0.15);
    this.obstacleSpawnTimer += dt;
    if (this.obstacleSpawnTimer < baseInterval) return;
    this.obstacleSpawnTimer = 0;

    const W = this.W, H = this.H;
    const w = 22 + Math.random() * 12;
    const minH = 40, maxH = H * 0.55;
    const h1 = minH + Math.random() * (maxH - minH);
    const gap = H * 0.3 + Math.random() * H * 0.1;
    const topH = Math.random() * (H - h1 - gap - 40) + 20;

    const speed = (200 + this.difficultyLevel * 30) *
      (this.currentRule.id === 'obstacle_fast' ? 1.7 : 1) *
      (this.currentRule.id === 'speed_boost' ? 1.4 : 1) *
      (this.currentRule.id === 'slow_motion' ? 0.45 : 1);

    // Top obstacle
    this.obstacles.push({ x: W + w, y: 0, w, h: topH, speed });
    // Bottom obstacle
    this.obstacles.push({ x: W + w, y: topH + gap, w, h: H - topH - gap, speed });

    // Occasionally add middle obstacle
    if (Math.random() < 0.2) {
      const mh = 20 + Math.random() * 30;
      const my = topH + gap * 0.3 + Math.random() * gap * 0.2;
      if (my + mh < topH + gap * 0.9) {
        this.obstacles.push({ x: W + w, y: my, w: w * 0.8, h: mh, speed: speed * 1.1 });
      }
    }
  }

  _updateObstacles(dt) {
    for (const o of this.obstacles) {
      const dx = this.currentRule.id === 'mirror' ? o.speed : -o.speed;
      o.x += dx * dt;
    }
    this.obstacles = this.obstacles.filter(o => o.x + o.w > -50 && o.x < this.W + 50);
  }

  _spawnCoins(dt) {
    this.coinSpawnTimer += dt;
    const interval = Math.max(1.2, 3 - this.difficultyLevel * 0.1);
    if (this.coinSpawnTimer < interval) return;
    this.coinSpawnTimer = 0;

    const count = 1 + (Math.random() < 0.3 ? 1 : 0);
    for (let i = 0; i < count; i++) {
      this.coinItems.push({
        x: this.W + 40 + i * 40,
        y: this.H * 0.2 + Math.random() * this.H * 0.6,
        r: 10,
        speed: 180 + this.difficultyLevel * 20,
        collected: false,
        glimmer: Math.random() * Math.PI * 2,
      });
    }
  }

  _updateCoins(dt) {
    for (const c of this.coinItems) {
      c.x -= c.speed * dt;
      c.glimmer += dt * 4;

      if (this.currentRule.id === 'magnetic' && this.player) {
        const dx = this.player.x - c.x;
        const dy = this.player.y - c.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          c.x += (dx / dist) * 300 * dt;
          c.y += (dy / dist) * 300 * dt;
        }
      }
    }
    this.coinItems = this.coinItems.filter(c => !c.collected && c.x + c.r > -20);
  }

  _updateParticles(dt) {
    for (const p of this.particles) p.update(dt);
    this.particles = this.particles.filter(p => p.life > 0);
  }

  _checkCollisions() {
    if (!this.player) return;
    const p = this.player;
    const hs = p.size * 0.7; // hitbox smaller than visual

    // Coins
    for (const c of this.coinItems) {
      if (c.collected) continue;
      const dx = p.x - c.x, dy = p.y - c.y;
      if (Math.sqrt(dx * dx + dy * dy) < hs + c.r) {
        c.collected = true;
        this.coins++;
        this.combo++;
        this.comboTimer = 0;
        this.sessionMissionProgress.coins = this.coins;
        this.progress.updateMission('coins', this.coins);
        this.progress.updateMission('combo', this.combo);

        this.audio.playCoin();
        if (this.combo >= 3) this.audio.playCombo();

        // Coin particles
        for (let i = 0; i < 6; i++) {
          this.particles.push(new Particle(
            c.x, c.y,
            (Math.random() - 0.5) * 180,
            (Math.random() - 0.5) * 180,
            '#ffd60a',
            0.5
          ));
        }
      }
    }

    // Obstacles
    for (const o of this.obstacles) {
      if (
        p.x + hs > o.x &&
        p.x - hs < o.x + o.w &&
        p.y + hs > o.y &&
        p.y - hs < o.y + o.h
      ) {
        this._die();
        return;
      }
    }

    // Off screen
    if (p.y > this.H + 100 || p.y < -100) {
      this._die();
    }
  }

  // ---- Rendering ----
  _render(dt) {
    const ctx = this.ctx;
    const W = this.W, H = this.H;
    const isMirror = this.currentRule.id === 'mirror';
    const isDark = this.currentRule.id === 'dark';

    ctx.save();

    // Screen shake
    ctx.translate(this.screenShakeX, this.screenShakeY);

    if (isMirror) {
      ctx.save();
      ctx.translate(W, 0);
      ctx.scale(-1, 1);
    }

    // Background
    if (isDark) {
      ctx.fillStyle = '#000008';
    } else {
      ctx.fillStyle = '#050510';
    }
    ctx.fillRect(0, 0, W, H);

    // BG Grid lines
    if (!isDark) {
      ctx.strokeStyle = 'rgba(0,245,255,0.04)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      const offset = (this.elapsed * 40) % gridSize;
      for (let x = -offset; x < W + gridSize; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
    }

    // Stars
    if (!isDark) {
      for (const star of this.bgStars) {
        star.x -= star.speed * (this.state === 'playing' ? 1 : 0.2);
        if (star.x < 0) star.x = W + 10;
        ctx.beginPath();
        ctx.arc(star.x, star.y % H, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.fill();
      }
    }

    // Obstacles
    const skin = this.skinMgr.getSkin();
    ctx.shadowBlur = 0;
    for (const o of this.obstacles) {
      const grd = ctx.createLinearGradient(o.x, o.y, o.x + o.w, o.y + o.h);
      grd.addColorStop(0, 'rgba(255,45,120,0.9)');
      grd.addColorStop(1, 'rgba(180,0,80,0.9)');
      ctx.fillStyle = grd;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#ff2d78';
      const r = 4;
      ctx.beginPath();
      ctx.roundRect(o.x, o.y, o.w, o.h, r);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Coins
    for (const c of this.coinItems) {
      if (c.collected) continue;
      const pulse = Math.sin(c.glimmer) * 0.3 + 0.7;
      ctx.save();
      ctx.shadowBlur = 15 * pulse;
      ctx.shadowColor = '#ffd60a';
      ctx.fillStyle = `rgba(255, 214, 10, ${pulse})`;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fill();

      // Inner shine
      ctx.fillStyle = `rgba(255, 255, 200, ${pulse * 0.6})`;
      ctx.beginPath();
      ctx.arc(c.x - c.r * 0.25, c.y - c.r * 0.25, c.r * 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // ◈ symbol
      ctx.save();
      ctx.font = `${c.r * 1.2}px Orbitron, monospace`;
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('◈', c.x, c.y);
      ctx.restore();
    }

    // Player
    if (this.player && this.state !== 'gameover') {
      this._renderPlayer(ctx, skin);
    }

    // Particles
    for (const p of this.particles) p.draw(ctx);

    if (isMirror) ctx.restore();

    // Dark vignette for dark mode
    if (isDark && this.player) {
      const grd = ctx.createRadialGradient(
        this.player.x, this.player.y, 60,
        this.player.x, this.player.y, 350
      );
      grd.addColorStop(0, 'rgba(0,0,0,0)');
      grd.addColorStop(1, 'rgba(0,0,8,0.97)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
    }

    ctx.restore();
  }

  _renderPlayer(ctx, skin) {
    const p = this.player;

    // Trail
    for (let i = 0; i < p.trail.length - 1; i++) {
      const t = p.trail[i];
      const alpha = (i / p.trail.length) * 0.5;
      const sz = p.size * 0.5 * (i / p.trail.length);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = 8;
      ctx.shadowColor = skin.glow;
      ctx.fillStyle = skin.glow;
      ctx.beginPath();
      ctx.roundRect(t.x - sz / 2, t.y - sz / 2, sz, sz, 4);
      ctx.fill();
      ctx.restore();
    }

    // Rainbow color override
    let fillColor = skin.color;
    let glowColor = skin.glow;
    if (skin.id === 'rainbow') {
      const h = (this.colorHue) % 360;
      fillColor = `hsl(${h}, 100%, 65%)`;
      glowColor = `hsl(${h}, 100%, 65%)`;
    }

    // Glow layers
    ctx.save();
    ctx.shadowBlur = 30;
    ctx.shadowColor = glowColor;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    const s = p.size;
    const grd = ctx.createLinearGradient(p.x - s / 2, p.y - s / 2, p.x + s / 2, p.y + s / 2);
    if (skin.id === 'rainbow') {
      grd.addColorStop(0, fillColor);
      grd.addColorStop(1, `hsl(${(this.colorHue + 60) % 360}, 100%, 65%)`);
    } else {
      grd.addColorStop(0, skin.gradient[0]);
      grd.addColorStop(1, skin.gradient[1]);
    }
    ctx.fillStyle = grd;

    ctx.beginPath();
    ctx.roundRect(p.x - s / 2, p.y - s / 2, s, s, 6);
    ctx.fill();

    // Inner highlight
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.roundRect(p.x - s / 2 + 4, p.y - s / 2 + 4, s * 0.4, s * 0.25, 3);
    ctx.fill();

    ctx.restore();
  }

  _updateHUD() {
    document.getElementById('score').textContent = this.score;
    document.getElementById('hud-coins').textContent = this.coins;
    const comboEl = document.getElementById('combo-display');
    if (this.combo >= 2) {
      document.getElementById('combo-text').textContent = 'x' + this.combo;
      comboEl.style.display = 'flex';
    } else {
      comboEl.style.display = 'none';
    }
  }

  _updateBestScoreDisplay() {
    const el = document.getElementById('best-score-display');
    if (this.highScore > 0) el.textContent = 'BEST: ' + this.highScore;
  }

  _renderMissionProgress() {
    const list = document.getElementById('mission-progress-list');
    list.innerHTML = '';
    MISSIONS.forEach(m => {
      const state = this.progress.getMission(m.id);
      const prog = Math.min(state.progress, m.goal);
      const pct = (prog / m.goal) * 100;
      const div = document.createElement('div');
      div.className = 'mission-progress-item' + (state.completed ? ' completed' : '');
      div.innerHTML = `
        <span>${m.title}</span>
        <div class="mission-bar"><div class="mission-bar-fill" style="width:${pct}%"></div></div>
      `;
      list.appendChild(div);
    });
  }

  _checkDailyReward() {
    const btn = document.getElementById('daily-reward-btn');
    if (this.daily.isAvailable()) {
      btn.classList.remove('hidden');
    } else {
      btn.classList.add('hidden');
    }
  }

  // ---- UI Setup ----
  _setupUI() {
    // Start screen
    document.getElementById('play-btn').addEventListener('click', () => this._startGame());
    document.getElementById('shop-btn').addEventListener('click', () => this._openShop());
    document.getElementById('missions-btn').addEventListener('click', () => this._openMissions());
    document.getElementById('daily-reward-btn').addEventListener('click', () => this._openDailyReward());

    // Pause
    document.getElementById('pause-btn').addEventListener('click', () => this._togglePause());
    document.getElementById('resume-btn').addEventListener('click', () => this._togglePause());
    document.getElementById('restart-btn').addEventListener('click', () => {
      document.getElementById('pause-menu').classList.add('hidden');
      this._startGame();
    });
    document.getElementById('pause-shop-btn').addEventListener('click', () => this._openShop());
    document.getElementById('home-btn').addEventListener('click', () => {
      this.state = 'menu';
      document.getElementById('pause-menu').classList.add('hidden');
      document.getElementById('hud').classList.add('hidden');
      document.getElementById('start-screen').classList.remove('hidden');
      this.audio.stopBGM();
    });

    // Game over
    document.getElementById('gameover-restart-btn').addEventListener('click', () => {
      document.getElementById('game-over').classList.add('hidden');
      this._startGame();
    });
    document.getElementById('gameover-shop-btn').addEventListener('click', () => {
      document.getElementById('game-over').classList.add('hidden');
      this._openShop();
    });
    document.getElementById('gameover-home-btn').addEventListener('click', () => {
      document.getElementById('game-over').classList.add('hidden');
      document.getElementById('start-screen').classList.remove('hidden');
      this.state = 'menu';
    });

    // Shop
    document.getElementById('close-shop-btn').addEventListener('click', () => {
      document.getElementById('shop-modal').classList.add('hidden');
      if (this.state === 'paused') document.getElementById('pause-menu').classList.remove('hidden');
      else if (this.state === 'menu') document.getElementById('start-screen').classList.remove('hidden');
      else if (this.state === 'gameover') document.getElementById('game-over').classList.remove('hidden');
    });

    // Missions
    document.getElementById('close-missions-btn').addEventListener('click', () => {
      document.getElementById('missions-modal').classList.add('hidden');
      if (this.state === 'menu') document.getElementById('start-screen').classList.remove('hidden');
    });

    // Daily reward
    document.getElementById('claim-reward-btn').addEventListener('click', () => {
      const amt = this.daily.claim();
      this.walletCoins += amt;
      localStorage.setItem('sr_wallet', this.walletCoins);
      document.getElementById('daily-modal').classList.add('hidden');
      document.getElementById('daily-reward-btn').classList.add('hidden');
      document.getElementById('start-screen').classList.remove('hidden');
      this._updateShopCoins();
      this.audio.playAchievement();
    });
  }

  _openShop() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('pause-menu').classList.add('hidden');
    document.getElementById('game-over').classList.add('hidden');
    this._renderShop();
    document.getElementById('shop-modal').classList.remove('hidden');
  }

  _updateShopCoins() {
    document.getElementById('shop-coins').textContent = this.walletCoins;
  }

  _renderShop() {
    this._updateShopCoins();
    const grid = document.getElementById('skin-grid');
    grid.innerHTML = '';

    SKINS.forEach(skin => {
      const unlocked = this.skinMgr.isUnlocked(skin.id);
      const equipped = this.skinMgr.equipped === skin.id;

      const card = document.createElement('div');
      card.className = 'skin-card' + (equipped ? ' equipped' : '') + (!unlocked ? ' locked' : '');

      // Preview canvas
      const previewCanvas = document.createElement('canvas');
      previewCanvas.className = 'skin-preview';
      previewCanvas.width = 80; previewCanvas.height = 80;
      const pctx = previewCanvas.getContext('2d');
      pctx.fillStyle = '#0a0a1e';
      pctx.fillRect(0, 0, 80, 80);
      pctx.shadowBlur = 20;
      pctx.shadowColor = skin.glow;
      if (skin.id === 'rainbow') {
        const grd = pctx.createLinearGradient(10, 10, 70, 70);
        skin.gradient.forEach((c, i) => grd.addColorStop(i / (skin.gradient.length - 1), c));
        pctx.fillStyle = grd;
      } else {
        const grd = pctx.createLinearGradient(10, 10, 70, 70);
        grd.addColorStop(0, skin.gradient[0]);
        grd.addColorStop(1, skin.gradient[1]);
        pctx.fillStyle = grd;
      }
      pctx.beginPath();
      pctx.roundRect(15, 15, 50, 50, 8);
      pctx.fill();

      card.appendChild(previewCanvas);

      const nameEl = document.createElement('div');
      nameEl.className = 'skin-name';
      nameEl.textContent = skin.name;
      card.appendChild(nameEl);

      if (equipped) {
        const badge = document.createElement('span');
        badge.className = 'skin-equipped-badge';
        badge.textContent = '✓';
        card.appendChild(badge);
      }

      if (!unlocked) {
        const price = document.createElement('div');
        price.className = 'skin-price';
        price.textContent = `◈ ${skin.price}`;
        card.appendChild(price);

        card.addEventListener('click', () => {
          if (this.walletCoins >= skin.price) {
            this.walletCoins -= skin.price;
            localStorage.setItem('sr_wallet', this.walletCoins);
            this.skinMgr.unlock(skin.id);
            this.skinMgr.equip(skin.id);
            this._checkAchievements();
            this._renderShop();
          } else {
            card.style.animation = 'none';
            card.style.borderColor = 'rgba(255,45,120,0.6)';
            setTimeout(() => { card.style.borderColor = ''; }, 600);
          }
        });
      } else {
        const statusEl = document.createElement('div');
        statusEl.className = 'skin-price';
        statusEl.style.color = equipped ? '#00f5ff' : 'rgba(255,255,255,0.4)';
        statusEl.textContent = equipped ? 'EQUIPPED' : 'OWNED';
        card.appendChild(statusEl);

        if (!equipped) {
          card.addEventListener('click', () => {
            this.skinMgr.equip(skin.id);
            this._renderShop();
          });
        }
      }

      grid.appendChild(card);
    });
  }

  _openMissions() {
    document.getElementById('start-screen').classList.add('hidden');
    this._renderMissionsModal();
    document.getElementById('missions-modal').classList.remove('hidden');
  }

  _renderMissionsModal() {
    const mList = document.getElementById('missions-list');
    mList.innerHTML = '';
    MISSIONS.forEach(m => {
      const state = this.progress.getMission(m.id);
      const prog = Math.min(state.progress, m.goal);
      const pct = (prog / m.goal) * 100;
      const div = document.createElement('div');
      div.className = 'mission-item' + (state.completed ? ' completed' : '');
      div.innerHTML = `
        <div class="mission-title">${m.title} ${state.completed ? '✓' : ''}</div>
        <div class="mission-desc">${m.desc}</div>
        <div class="mission-progress-bar">
          <div class="mission-progress-fill" style="width:${pct}%"></div>
        </div>
        <div class="mission-reward">◈ ${m.reward} reward</div>
      `;
      mList.appendChild(div);
    });

    const aList = document.getElementById('achievements-list');
    aList.innerHTML = '';
    ACHIEVEMENTS.forEach(a => {
      const unlocked = !!this.progress.achievements[a.id];
      const div = document.createElement('div');
      div.className = 'achievement-item' + (unlocked ? ' unlocked' : '');
      div.innerHTML = `
        <div class="mission-title">${a.icon} ${a.title} ${unlocked ? '✓' : '🔒'}</div>
        <div class="achievement-desc-text">${a.desc}</div>
      `;
      aList.appendChild(div);
    });
  }

  _openDailyReward() {
    document.getElementById('start-screen').classList.add('hidden');
    const amt = this.daily.getAmount();
    document.getElementById('daily-reward-amount').textContent = '+' + amt;
    document.getElementById('daily-modal').classList.remove('hidden');
  }
}

// ---- Bootstrap ----
window.addEventListener('DOMContentLoaded', () => {
  // Prevent scroll bounce on iOS
  document.body.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
  new ShadowRush();
});
