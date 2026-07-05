// ═══════════════════════════════════════════════════════════
//  SHADOW RUSH — World Progression System
//  15 unique worlds, 3 stages each (stages 1-3 = world 0, etc.)
// ═══════════════════════════════════════════════════════════

export function getWorldIdx(stage) {
  return Math.min(14, Math.floor((stage - 1) / 3));
}

export const WORLDS = [
  { id:'neon_space',      name:'NEON SPACE',        num:1,
    skyTop:'#000008', skyMid:'#0d001e', skyBot:'#1a0033',
    gridColor:'rgba(255,0,255,0.045)', starTint:'#ff80ff',
    obsA:'#ff2d78', obsB:'#9900aa', obsGlow:'#ff2d78', obsStyle:'neon_rect',
    ambColor:'#ff00ff', ambStyle:'spark', bpmBase:120,
    titleColor:'#ff80ff', titleGlow:'#ff00ff' },
  { id:'inferno_volcano', name:'INFERNO VOLCANO',   num:2,
    skyTop:'#0a0000', skyMid:'#2d0000', skyBot:'#6a1000',
    gridColor:null, starTint:'#ff4400',
    obsA:'#ff5500', obsB:'#990000', obsGlow:'#ff4500', obsStyle:'lava_pillar',
    ambColor:'#ff6600', ambStyle:'ember', bpmBase:140,
    titleColor:'#ff6600', titleGlow:'#ff2200' },
  { id:'serpent_temple',  name:'SERPENT TEMPLE',    num:3,
    skyTop:'#020a02', skyMid:'#0a1a06', skyBot:'#142206',
    gridColor:'rgba(255,200,0,0.025)', starTint:null,
    obsA:'#5a4a2a', obsB:'#2a1e0a', obsGlow:'#c8a000', obsStyle:'stone_pillar',
    ambColor:'#ffa000', ambStyle:'ember', bpmBase:90,
    titleColor:'#c8a000', titleGlow:'#ff8000' },
  { id:'frozen_kingdom',  name:'FROZEN KINGDOM',    num:4,
    skyTop:'#050d1a', skyMid:'#0a1e36', skyBot:'#a8d8f0',
    gridColor:'rgba(180,230,255,0.035)', starTint:'#c0e8ff',
    obsA:'#a8e6ff', obsB:'#0080c0', obsGlow:'#00d4ff', obsStyle:'ice_crystal',
    ambColor:'#c0eeff', ambStyle:'snow', bpmBase:58,
    titleColor:'#c0eeff', titleGlow:'#00ccff' },
  { id:'electric_city',   name:'ELECTRIC CITY',     num:5,
    skyTop:'#000208', skyMid:'#000510', skyBot:'#000820',
    gridColor:'rgba(0,255,220,0.03)', starTint:'#00ccff',
    obsA:'#00ffcc', obsB:'#0066ff', obsGlow:'#00ffff', obsStyle:'elec_barrier',
    ambColor:'#00ffee', ambStyle:'lightning', bpmBase:160,
    titleColor:'#00ffee', titleGlow:'#00aaff' },
  { id:'deep_ocean',      name:'DEEP OCEAN',         num:6,
    skyTop:'#000510', skyMid:'#001030', skyBot:'#001855',
    gridColor:'rgba(0,100,200,0.04)', starTint:'#0088cc',
    obsA:'#ff6b9d', obsB:'#00a8cc', obsGlow:'#00d4ff', obsStyle:'coral',
    ambColor:'#80ddff', ambStyle:'bubble', bpmBase:65,
    titleColor:'#00d4ff', titleGlow:'#0088ff' },
  { id:'enchanted_forest','name':'ENCHANTED FOREST', num:7,
    skyTop:'#010501', skyMid:'#040d04', skyBot:'#081808',
    gridColor:null, starTint:'#88ff66',
    obsA:'#3d2200', obsB:'#1a0e00', obsGlow:'#88aa00', obsStyle:'tree_trunk',
    ambColor:'#aaff44', ambStyle:'firefly', bpmBase:88,
    titleColor:'#88ff44', titleGlow:'#44cc00' },
  { id:'lost_desert',     name:'LOST DESERT',        num:8,
    skyTop:'#1a1000', skyMid:'#3d2800', skyBot:'#c87820',
    gridColor:'rgba(200,150,50,0.035)', starTint:'#ffcc66',
    obsA:'#c87820', obsB:'#7a4400', obsGlow:'#ffaa00', obsStyle:'sand_column',
    ambColor:'#d4a050', ambStyle:'sand', bpmBase:100,
    titleColor:'#ffcc44', titleGlow:'#ff8800' },
  { id:'haunted_mansion', name:'HAUNTED MANSION',    num:9,
    skyTop:'#000000', skyMid:'#080010', skyBot:'#120020',
    gridColor:null, starTint:'#8040ff',
    obsA:'#222233', obsB:'#0a0010', obsGlow:'#8800cc', obsStyle:'dark_arch',
    ambColor:'#cc88ff', ambStyle:'wisp', bpmBase:52,
    titleColor:'#cc88ff', titleGlow:'#8800ff' },
  { id:'future_lab',      name:'FUTURE LABORATORY',  num:10,
    skyTop:'#000808', skyMid:'#001010', skyBot:'#001818',
    gridColor:'rgba(0,255,100,0.035)', starTint:'#00ff88',
    obsA:'#003322', obsB:'#001a11', obsGlow:'#00ff66', obsStyle:'laser_bar',
    ambColor:'#00ff88', ambStyle:'data', bpmBase:145,
    titleColor:'#00ff88', titleGlow:'#00cc55' },
  { id:'sky_kingdom',     name:'SKY KINGDOM',        num:11,
    skyTop:'#80c8ff', skyMid:'#c0e4ff', skyBot:'#fff0c8',
    gridColor:'rgba(255,220,100,0.04)', starTint:'#fff0c0',
    obsA:'#fff8e8', obsB:'#e0c060', obsGlow:'#ffd060', obsStyle:'cloud_pillar',
    ambColor:'#ffffff', ambStyle:'cloud_puff', bpmBase:72,
    titleColor:'#ffd060', titleGlow:'#ffaa00' },
  { id:'crystal_cave',    name:'CRYSTAL CAVE',       num:12,
    skyTop:'#020008', skyMid:'#080020', skyBot:'#100038',
    gridColor:'rgba(120,0,255,0.04)', starTint:'#cc80ff',
    obsA:'#cc44ff', obsB:'#00ccff', obsGlow:'#cc00ff', obsStyle:'crystal_shard',
    ambColor:'#cc44ff', ambStyle:'crystal_dust', bpmBase:78,
    titleColor:'#cc88ff', titleGlow:'#aa00ff' },
  { id:'sakura_garden',   name:'SAKURA GARDEN',      num:13,
    skyTop:'#180814', skyMid:'#2d1028', skyBot:'#6d2860',
    gridColor:'rgba(255,150,200,0.03)', starTint:'#ffb0d8',
    obsA:'#228822', obsB:'#115511', obsGlow:'#88ff66', obsStyle:'bamboo',
    ambColor:'#ffb0d8', ambStyle:'petal', bpmBase:62,
    titleColor:'#ffb0d8', titleGlow:'#ff80c0' },
  { id:'shadow_dimension','name':'SHADOW DIMENSION',  num:14,
    skyTop:'#000000', skyMid:'#050005', skyBot:'#100020',
    gridColor:null, starTint:'#6600cc',
    obsA:'#1a0030', obsB:'#000000', obsGlow:'#9900ff', obsStyle:'shadow_void',
    ambColor:'#7700cc', ambStyle:'shadow_wisp', bpmBase:105,
    titleColor:'#aa44ff', titleGlow:'#6600ff' },
  { id:'chaos_realm',     name:'CHAOS REALM',        num:15,
    skyTop:'#000000', skyMid:'#000000', skyBot:'#000000',
    gridColor:'rgba(255,255,255,0.02)', starTint:'#ffffff',
    obsA:'#ffffff', obsB:'#888888', obsGlow:'#ffffff', obsStyle:'chaos_mix',
    ambColor:'#ffffff', ambStyle:'chaos', bpmBase:185,
    titleColor:'#ffffff', titleGlow:'#ff00ff' },
];

// ═══════════════════════════════════════════════════════════
//  WORLD RENDERER
// ═══════════════════════════════════════════════════════════
export class WorldRenderer {

  // ── BACKGROUND ─────────────────────────────────────────
  drawBG(ctx, W, H, t, worldIdx, game) {
    const w = WORLDS[worldIdx] || WORLDS[0];
    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, w.skyTop);
    sky.addColorStop(0.5, w.skyMid);
    sky.addColorStop(1, w.skyBot);
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);

    // Grid overlay
    if (w.gridColor) {
      ctx.strokeStyle = w.gridColor; ctx.lineWidth = 1;
      const gs = 60, off = (t * 30) % gs;
      for (let x = -off; x < W + gs; x += gs) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,H); ctx.stroke(); }
      for (let y = 0; y < H; y += gs) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(W,y); ctx.stroke(); }
    }

    // Stars / background particles
    if (w.starTint && game.bgStars) {
      for (const s of game.bgStars) {
        s.tw += 0.016 * 2;
        if (game.state === 'playing') s.x -= s.speed * (1 + (game.stage - 1) * 0.15);
        if (s.x < 0) { s.x = W + 10; s.y = Math.random() * H; }
        const a = s.alpha * (0.6 + 0.4 * Math.sin(s.tw));
        ctx.beginPath(); ctx.arc(s.x % W, s.y % H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = this._tintAlpha(w.starTint, a); ctx.fill();
      }
    }

    // World-specific BG elements
    switch (worldIdx) {
      case 0:  this._bg0(ctx, W, H, t); break;
      case 1:  this._bg1(ctx, W, H, t); break;
      case 2:  this._bg2(ctx, W, H, t); break;
      case 3:  this._bg3(ctx, W, H, t); break;
      case 4:  this._bg4(ctx, W, H, t, game); break;
      case 5:  this._bg5(ctx, W, H, t); break;
      case 6:  this._bg6(ctx, W, H, t); break;
      case 7:  this._bg7(ctx, W, H, t); break;
      case 8:  this._bg8(ctx, W, H, t); break;
      case 9:  this._bg9(ctx, W, H, t); break;
      case 10: this._bg10(ctx, W, H, t); break;
      case 11: this._bg11(ctx, W, H, t); break;
      case 12: this._bg12(ctx, W, H, t); break;
      case 13: this._bg13(ctx, W, H, t); break;
      case 14: this._bg14(ctx, W, H, t, game); break;
    }
  }

  _tintAlpha(hex, a) {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return `rgba(${r},${g},${b},${a.toFixed(3)})`;
  }

  // 0 — Neon Space: planet + neon warp grid
  _bg0(ctx, W, H, t) {
    // Distant planet
    const pg = ctx.createRadialGradient(W*.75, H*.25, 0, W*.75, H*.25, 80);
    pg.addColorStop(0, 'rgba(120,0,200,0.5)'); pg.addColorStop(1, 'rgba(60,0,80,0)');
    ctx.fillStyle = pg; ctx.beginPath(); ctx.arc(W*.75, H*.25, 80, 0, Math.PI*2); ctx.fill();
    // Ring
    ctx.save(); ctx.translate(W*.75, H*.25); ctx.rotate(0.4); ctx.scale(1, 0.3);
    ctx.beginPath(); ctx.arc(0, 0, 100, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(255,0,200,0.25)'; ctx.lineWidth = 8; ctx.stroke(); ctx.restore();
    // Neon warp lines
    ctx.strokeStyle = 'rgba(255,0,255,0.12)'; ctx.lineWidth = 1.5;
    for (let i = 0; i < 8; i++) {
      const off = ((t * 60 + i * 40) % W);
      ctx.beginPath(); ctx.moveTo(W - off, 0); ctx.lineTo(W - off + 20, H); ctx.stroke();
    }
    // Nebula clouds
    for (let i = 0; i < 3; i++) {
      const ng = ctx.createRadialGradient(W*(0.2+i*0.3), H*(0.3+i*0.15), 0, W*(0.2+i*0.3), H*(0.3+i*0.15), 90);
      ng.addColorStop(0, 'rgba(100,0,160,0.08)'); ng.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = ng; ctx.fillRect(0, 0, W, H);
    }
  }

  // 1 — Inferno Volcano: lava pool + rock silhouettes
  _bg1(ctx, W, H, t) {
    // Lava glow at bottom
    const lg = ctx.createRadialGradient(W/2, H, 0, W/2, H, H*.5);
    lg.addColorStop(0, 'rgba(255,80,0,0.5)'); lg.addColorStop(0.5, 'rgba(180,20,0,0.2)'); lg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = lg; ctx.fillRect(0, 0, W, H);
    // Lava rocks (silhouettes) at bottom
    ctx.fillStyle = '#0a0000';
    for (let i = 0; i < 7; i++) {
      const rx = W*(i/7) + Math.sin(t*0.3+i)*20, rw = W/6, rh = H*(0.12+0.08*Math.sin(i*2.1));
      ctx.beginPath(); ctx.moveTo(rx, H); ctx.lineTo(rx, H-rh);
      ctx.quadraticCurveTo(rx+rw/2, H-rh*1.2, rx+rw, H-rh);
      ctx.lineTo(rx+rw, H); ctx.fill();
    }
    // Volcano peak silhouette center
    ctx.fillStyle = '#0d0000';
    ctx.beginPath(); ctx.moveTo(W*.3, H); ctx.lineTo(W*.5, H*.35); ctx.lineTo(W*.7, H); ctx.fill();
    // Lava glow from crater
    const cg = ctx.createRadialGradient(W*.5, H*.35, 0, W*.5, H*.35, 60+Math.sin(t*2)*10);
    cg.addColorStop(0, 'rgba(255,120,0,0.6)'); cg.addColorStop(1, 'rgba(255,40,0,0)');
    ctx.fillStyle = cg; ctx.fillRect(0, 0, W, H);
    // Smoke wisps
    ctx.strokeStyle = 'rgba(60,30,20,0.25)'; ctx.lineWidth = 20;
    for (let i = 0; i < 3; i++) {
      const sx = W*.45+i*20, sy = H*.35 - (t*40+i*80)%H*.5;
      ctx.beginPath(); ctx.moveTo(sx, H*.35); ctx.quadraticCurveTo(sx+30*Math.sin(t+i), sy+40, sx+20*Math.sin(t*0.5), sy);
      ctx.stroke();
    }
  }

  // 2 — Serpent Temple: stone walls + torches
  _bg2(ctx, W, H, t) {
    // Stone wall texture
    ctx.strokeStyle = 'rgba(100,80,40,0.15)'; ctx.lineWidth = 1;
    const bw = 80, bh = 40;
    for (let row = 0; row < H/bh+1; row++) {
      const off = row%2===0?0:bw/2;
      for (let col = -1; col < W/bw+1; col++) {
        ctx.strokeRect(col*bw-off, row*bh, bw, bh);
      }
    }
    // Serpent arch silhouette
    ctx.fillStyle = 'rgba(10,20,5,0.7)';
    ctx.beginPath(); ctx.arc(W*.5, 0, H*.55, 0, Math.PI); ctx.fill();
    ctx.fillStyle = 'rgba(8,15,4,0.9)';
    ctx.fillRect(0, 0, W*.08, H); ctx.fillRect(W*.92, 0, W*.08, H);
    // Torches (flame animated)
    [[W*.12, H*.5], [W*.88, H*.5], [W*.3, H*.2], [W*.7, H*.2]].forEach(([tx, ty]) => {
      const flicker = Math.sin(t*8+tx)*3;
      const fg = ctx.createRadialGradient(tx, ty, 0, tx, ty, 30+flicker);
      fg.addColorStop(0, 'rgba(255,200,0,0.6)'); fg.addColorStop(0.5, 'rgba(255,80,0,0.3)'); fg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = fg; ctx.fillRect(0, 0, W, H);
      // Torch body
      ctx.fillStyle = '#5a3800'; ctx.fillRect(tx-3, ty, 6, 20);
      // Flame
      ctx.fillStyle = `rgba(255,${150+flicker*10},0,0.9)`;
      ctx.beginPath(); ctx.moveTo(tx, ty);
      ctx.quadraticCurveTo(tx+8+flicker, ty-12, tx, ty-20);
      ctx.quadraticCurveTo(tx-8+flicker, ty-12, tx, ty); ctx.fill();
    });
    // Ancient serpent carvings (simplified)
    ctx.strokeStyle = 'rgba(200,160,50,0.12)'; ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(W*0.5, H*(0.1+i*0.18));
      ctx.quadraticCurveTo(W*0.5+80*Math.cos(i), H*(0.1+i*0.18)+20, W*0.5, H*(0.1+i*0.18)+40);
      ctx.stroke();
    }
  }

  // 3 — Frozen Kingdom: ice stalactites + aurora + snow ground
  _bg3(ctx, W, H, t) {
    // Aurora
    for (let i = 0; i < 3; i++) {
      const ag = ctx.createLinearGradient(0, H*.1+i*40, W, H*.25+i*40);
      ag.addColorStop(0, 'rgba(0,180,100,0)'); ag.addColorStop(0.3, `rgba(0,${150+i*30},200,${0.06+Math.sin(t+i)*0.03})`);
      ag.addColorStop(0.7, 'rgba(100,0,200,0.04)'); ag.addColorStop(1, 'rgba(0,200,150,0)');
      ctx.fillStyle = ag; ctx.fillRect(0, H*.05+i*30, W, 60);
    }
    // Ice stalactites at top
    ctx.fillStyle = 'rgba(160,220,255,0.7)';
    for (let i = 0; i < 9; i++) {
      const ix = W*(i+0.5)/9, ih = 40+Math.sin(i*1.7)*30;
      ctx.beginPath(); ctx.moveTo(ix-15, 0); ctx.lineTo(ix+15, 0); ctx.lineTo(ix, ih); ctx.closePath(); ctx.fill();
      ctx.fillStyle = 'rgba(200,240,255,0.4)';
    }
    // Ice stalactites at bottom
    ctx.fillStyle = 'rgba(160,220,255,0.5)';
    for (let i = 0; i < 7; i++) {
      const ix = W*(i+0.5)/7+20, ih = 30+Math.sin(i*2.3)*20;
      ctx.beginPath(); ctx.moveTo(ix-12, H); ctx.lineTo(ix+12, H); ctx.lineTo(ix, H-ih); ctx.closePath(); ctx.fill();
    }
    // Snow ground layer
    const snowG = ctx.createLinearGradient(0, H*.8, 0, H);
    snowG.addColorStop(0, 'rgba(200,235,255,0)'); snowG.addColorStop(1, 'rgba(220,245,255,0.4)');
    ctx.fillStyle = snowG; ctx.fillRect(0, H*.8, W, H*.2);
    // Blizzard haze
    ctx.fillStyle = `rgba(200,230,255,${0.02+Math.sin(t*0.5)*0.01})`;
    ctx.fillRect(0, 0, W, H);
  }

  // 4 — Electric City: skyline + neon signs + electric arcs
  _bg4(ctx, W, H, t, game) {
    // City skyline (silhouette)
    ctx.fillStyle = '#000510';
    const buildings = [0.05,0.18,0.1,0.28,0.14,0.22,0.08,0.2,0.16,0.12,0.25,0.09,0.19];
    let bx = 0;
    buildings.forEach((bh, i) => {
      const bw = W/buildings.length;
      ctx.fillRect(bx, H*(1-bh-0.1), bw-2, H*(bh+0.1)); bx += bw;
    });
    // Neon windows
    const winColors = ['#00ffcc','#00ccff','#ff00aa','#ffcc00'];
    bx = 0;
    buildings.forEach((bh, i) => {
      const bw = W/buildings.length;
      const topY = H*(1-bh-0.1);
      for (let wy = topY+10; wy < H*.9; wy += 18) {
        for (let wx = bx+4; wx < bx+bw-4; wx += 14) {
          if (Math.sin(wx*7.3+wy*3.1+t*0.2) > 0.5) {
            ctx.fillStyle = winColors[(i*3+Math.floor(wy/18))%4];
            ctx.globalAlpha = 0.4+Math.sin(t*2+wx)*0.1;
            ctx.fillRect(wx, wy, 8, 10);
          }
        }
      }
      ctx.globalAlpha = 1; bx += bw;
    });
    // Electric arcs
    ctx.strokeStyle = 'rgba(0,255,220,0.2)'; ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
      const ax = (t*40+i*W/4)%W;
      ctx.beginPath(); ctx.moveTo(ax, 0);
      ctx.lineTo(ax+Math.sin(t*3+i)*20, H*.3);
      ctx.lineTo(ax+Math.sin(t*5+i)*30, H*.6);
      ctx.stroke();
    }
    // Ground glow
    const gg = ctx.createLinearGradient(0, H*.8, 0, H);
    gg.addColorStop(0, 'rgba(0,50,80,0)'); gg.addColorStop(1, 'rgba(0,80,120,0.3)');
    ctx.fillStyle = gg; ctx.fillRect(0, H*.8, W, H*.2);
  }

  // 5 — Deep Ocean: caustics + kelp + floor
  _bg5(ctx, W, H, t) {
    // Caustic light rays from surface
    ctx.strokeStyle = 'rgba(0,150,220,0.08)'; ctx.lineWidth = 20;
    for (let i = 0; i < 8; i++) {
      const rx = W*(i/8) + Math.sin(t*0.5+i)*30, rw = 30+Math.sin(t+i)*15;
      ctx.beginPath(); ctx.moveTo(rx, 0); ctx.lineTo(rx+Math.sin(t*0.3+i)*40, H);
      ctx.stroke();
    }
    // Bioluminescent plankton dots
    for (let i = 0; i < 20; i++) {
      const px = W*(Math.sin(i*7.3)*0.5+0.5), py = H*(Math.cos(i*4.1)*0.4+0.5);
      const a = 0.15+0.1*Math.sin(t*2+i);
      ctx.fillStyle = `rgba(0,200,255,${a})`; ctx.beginPath(); ctx.arc(px, py, 2, 0, Math.PI*2); ctx.fill();
    }
    // Kelp/seaweed
    ctx.strokeStyle = 'rgba(0,120,80,0.6)'; ctx.lineWidth = 3;
    for (let i = 0; i < 8; i++) {
      const kx = W*(i+0.5)/8;
      const kh = H*(0.3+0.1*Math.sin(i*2.7));
      ctx.beginPath(); ctx.moveTo(kx, H);
      for (let seg = 0; seg < 6; seg++) {
        const ky = H - seg*(kh/6);
        ctx.quadraticCurveTo(kx+20*Math.sin(t*0.8+seg+i), ky-kh/12, kx+15*Math.sin(t*0.6+seg+i), ky-kh/6);
      }
      ctx.stroke();
    }
    // Ocean floor
    const of = ctx.createLinearGradient(0, H*.85, 0, H);
    of.addColorStop(0, 'rgba(0,40,60,0)'); of.addColorStop(1, 'rgba(10,60,80,0.7)');
    ctx.fillStyle = of; ctx.fillRect(0, H*.85, W, H*.15);
    // Surface glow at top
    const sg = ctx.createLinearGradient(0, 0, 0, H*.15);
    sg.addColorStop(0, 'rgba(0,100,200,0.15)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H*.15);
  }

  // 6 — Enchanted Forest: trees + moon + mushrooms
  _bg6(ctx, W, H, t) {
    // Moon glow
    const mg = ctx.createRadialGradient(W*.8, H*.15, 0, W*.8, H*.15, 80);
    mg.addColorStop(0, 'rgba(200,255,180,0.25)'); mg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = mg; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(220,255,200,0.6)'; ctx.beginPath(); ctx.arc(W*.8, H*.15, 22, 0, Math.PI*2); ctx.fill();
    // Distant tree silhouettes (back layer)
    ctx.fillStyle = 'rgba(5,15,5,0.7)';
    for (let i = 0; i < 12; i++) {
      const tx = W*(i/12), tw = W/10, th = H*(0.4+Math.sin(i*2.3)*0.12);
      ctx.beginPath(); ctx.moveTo(tx, H*.7); ctx.lineTo(tx+tw*.5, H*.7-th); ctx.lineTo(tx+tw, H*.7); ctx.fill();
    }
    // Fog layer
    const fg = ctx.createLinearGradient(0, H*.6, 0, H*.8);
    fg.addColorStop(0, 'rgba(0,20,0,0)'); fg.addColorStop(1, 'rgba(10,30,10,0.5)');
    ctx.fillStyle = fg; ctx.fillRect(0, H*.6, W, H*.2);
    // Front tree silhouettes
    ctx.fillStyle = '#010801';
    for (let i = 0; i < 6; i++) {
      const tx = W*(i/6)- (t*5)%80, tw = W/5, th = H*(0.55+Math.sin(i)*0.1);
      ctx.beginPath(); ctx.moveTo(tx, H); ctx.lineTo(tx+tw*.35, H-th);
      ctx.lineTo(tx+tw*.7, H); ctx.fill();
      // Trunk
      ctx.fillRect(tx+tw*.3, H-th*.25, tw*.1, th*.25);
    }
    // Mushrooms at ground level
    [[W*.15,H*.9],[W*.45,H*.88],[W*.75,H*.92]].forEach(([mx,my])=>{
      ctx.fillStyle = '#cc2200'; ctx.beginPath(); ctx.arc(mx, my, 18, Math.PI, 0); ctx.fill();
      ctx.fillStyle = '#ff4400'; ctx.beginPath(); ctx.arc(mx-6, my-3, 4, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#f8f8f8'; ctx.fillRect(mx-4, my, 8, 14);
    });
    // Spell glow at center
    const sg = ctx.createRadialGradient(W*.5, H*.5, 0, W*.5, H*.5, 200);
    sg.addColorStop(0, 'rgba(60,200,20,0.04)'); sg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
  }

  // 7 — Lost Desert: pyramids + sun + dunes
  _bg7(ctx, W, H, t) {
    // Sun
    const sun = ctx.createRadialGradient(W*.7, H*.2, 0, W*.7, H*.2, 60);
    sun.addColorStop(0, 'rgba(255,240,150,0.8)'); sun.addColorStop(0.4, 'rgba(255,180,50,0.4)'); sun.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = sun; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,230,100,0.7)'; ctx.beginPath(); ctx.arc(W*.7, H*.2, 28, 0, Math.PI*2); ctx.fill();
    // Pyramid silhouettes
    ctx.fillStyle = 'rgba(80,40,10,0.8)';
    [[W*.15,H*.65,H*.35],[W*.5,H*.7,H*.28],[W*.8,H*.68,H*.22]].forEach(([px,py,ph])=>{
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px+ph*0.7, py); ctx.lineTo(px+ph*.35, py-ph); ctx.closePath(); ctx.fill();
    });
    // Desert dunes
    const dune = ctx.createLinearGradient(0, H*.75, 0, H);
    dune.addColorStop(0, '#c87820'); dune.addColorStop(1, '#8a5010');
    ctx.fillStyle = dune;
    ctx.beginPath(); ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 40) {
      ctx.lineTo(x, H*.82+Math.sin(x*0.02+t*0.1)*H*.06);
    }
    ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    // Heat haze lines
    ctx.strokeStyle = 'rgba(255,180,80,0.06)'; ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      const hy = H*(0.5+i*0.07)+Math.sin(t*2+i)*3;
      ctx.beginPath(); ctx.moveTo(0, hy);
      for (let x = 0; x < W; x += 30) ctx.lineTo(x, hy+Math.sin(x*0.05+t*3)*4);
      ctx.stroke();
    }
    // Sandstorm haze
    ctx.fillStyle = `rgba(200,150,80,${0.04+Math.sin(t*0.4)*0.02})`;
    ctx.fillRect(0, 0, W, H);
  }

  // 8 — Haunted Mansion: dark mansion + bats + bare trees
  _bg8(ctx, W, H, t) {
    // Moon
    ctx.fillStyle = 'rgba(180,180,200,0.5)'; ctx.beginPath(); ctx.arc(W*.7, H*.12, 26, 0, Math.PI*2); ctx.fill();
    const mCloud = ctx.createRadialGradient(W*.7, H*.12, 20, W*.7, H*.12, 80);
    mCloud.addColorStop(0, 'rgba(0,0,0,0.3)'); mCloud.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = mCloud; ctx.fillRect(0, 0, W, H);
    // Mansion silhouette
    ctx.fillStyle = '#08000f';
    ctx.fillRect(W*.35, H*.3, W*.3, H*.5);
    ctx.fillRect(W*.38, H*.15, W*.08, H*.17); // tower left
    ctx.fillRect(W*.54, H*.1, W*.08, H*.22);  // tower right
    // Flickering windows
    const winFlicker = Math.floor(t*3)%3;
    [[W*.42,H*.38],[W*.53,H*.38],[W*.42,H*.52],[W*.53,H*.52]].forEach(([wx,wy],i)=>{
      const lit = Math.sin(t*0.7+i*2.3) > 0.1;
      if(lit){ ctx.fillStyle=`rgba(255,220,80,${0.3+Math.sin(t*4+i)*0.15})`;ctx.fillRect(wx-5,wy-8,10,14); }
    });
    // Bare trees
    ctx.strokeStyle = '#060010'; ctx.lineWidth = 5;
    [[W*.1,H*.9],[W*.25,H*.88],[W*.78,H*.9],[W*.9,H*.87]].forEach(([tx,ty])=>{
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(tx, ty-H*.25);
      ctx.moveTo(tx, ty-H*.12); ctx.lineTo(tx-40, ty-H*.2+Math.sin(t*0.5)*5);
      ctx.moveTo(tx, ty-H*.17); ctx.lineTo(tx+30, ty-H*.22);
      ctx.stroke();
    });
    // Fog at bottom
    const fog = ctx.createLinearGradient(0, H*.7, 0, H);
    fog.addColorStop(0, 'rgba(30,0,40,0)'); fog.addColorStop(1, 'rgba(20,0,30,0.6)');
    ctx.fillStyle = fog; ctx.fillRect(0, H*.7, W, H*.3);
    // Bats
    ctx.fillStyle = 'rgba(40,0,60,0.7)';
    [[W*.2,H*.35],[W*.6,H*.25],[W*.85,H*.4]].forEach(([bx,by],i)=>{
      const bfly = Math.sin(t*3+i);
      ctx.beginPath(); ctx.arc(bx,by+bfly*5,5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(bx,by+bfly*5); ctx.quadraticCurveTo(bx-15,by+bfly*5-8+Math.sin(t*6+i)*3,bx-20,by+bfly*5); ctx.fill();
      ctx.beginPath(); ctx.moveTo(bx,by+bfly*5); ctx.quadraticCurveTo(bx+15,by+bfly*5-8+Math.sin(t*6+i)*3,bx+20,by+bfly*5); ctx.fill();
    });
  }

  // 9 — Future Lab: circuit board + scanning line + hexagons
  _bg9(ctx, W, H, t) {
    // Circuit traces
    ctx.strokeStyle = 'rgba(0,255,100,0.1)'; ctx.lineWidth = 1;
    const traces = [[0.1,0.3,0.5,0.3],[0.5,0.3,0.5,0.7],[0.5,0.7,0.9,0.7],[0.2,0.6,0.2,0.9],[0.8,0.1,0.8,0.5],[0.3,0.1,0.7,0.1],[0.3,0.5,0.3,0.8]];
    traces.forEach(([x1,y1,x2,y2])=>{
      ctx.beginPath(); ctx.moveTo(W*x1, H*y1); ctx.lineTo(W*x2, H*y2); ctx.stroke();
    });
    // Circuit nodes
    ctx.fillStyle = 'rgba(0,255,100,0.3)';
    [[0.5,0.3],[0.5,0.7],[0.2,0.6],[0.8,0.5],[0.3,0.5]].forEach(([nx,ny])=>{
      ctx.beginPath(); ctx.arc(W*nx, H*ny, 4, 0, Math.PI*2); ctx.fill();
    });
    // Hexagonal holographic shapes
    ctx.strokeStyle = 'rgba(0,200,255,0.12)'; ctx.lineWidth = 1;
    [[W*.2,H*.4,40],[W*.75,H*.3,30],[W*.5,H*.65,50]].forEach(([hx,hy,hr])=>{
      ctx.beginPath();
      for(let a=0;a<6;a++){
        const angle = (a/6)*Math.PI*2+t*0.3;
        const mx = hx+hr*Math.cos(angle), my = hy+hr*Math.sin(angle);
        a===0 ? ctx.moveTo(mx,my) : ctx.lineTo(mx,my);
      }
      ctx.closePath(); ctx.stroke();
    });
    // Scanning line
    const scanY = (t*80)%H;
    const scanG = ctx.createLinearGradient(0, scanY-10, 0, scanY+10);
    scanG.addColorStop(0, 'rgba(0,255,100,0)'); scanG.addColorStop(0.5, 'rgba(0,255,100,0.15)'); scanG.addColorStop(1, 'rgba(0,255,100,0)');
    ctx.fillStyle = scanG; ctx.fillRect(0, scanY-10, W, 20);
    // Data flow particles (static dots)
    ctx.fillStyle = 'rgba(0,255,150,0.4)';
    for(let i=0;i<15;i++){
      const dpx = W*(Math.sin(i*7.3)*0.5+0.5), dpy = (H*(Math.cos(i*3.1)*0.5+0.5)+t*30)%H;
      ctx.beginPath(); ctx.arc(dpx, dpy, 2, 0, Math.PI*2); ctx.fill();
    }
  }

  // 10 — Sky Kingdom: clouds + golden rays + floating islands
  _bg10(ctx, W, H, t) {
    // Golden light rays from above
    for(let i=0;i<7;i++){
      const rx = W*(i+0.5)/7;
      const rg = ctx.createLinearGradient(rx, 0, rx+40, H);
      rg.addColorStop(0, 'rgba(255,220,100,0.12)'); rg.addColorStop(1, 'rgba(255,180,50,0)');
      ctx.fillStyle = rg;
      ctx.beginPath(); ctx.moveTo(rx-15, 0); ctx.lineTo(rx+15, 0); ctx.lineTo(rx+60, H); ctx.lineTo(rx+30, H); ctx.closePath();
      ctx.fill();
    }
    // Layered clouds (back)
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    for(let i=0;i<8;i++){
      const cx = (W*(i/8) - (t*15)%W + W)%W, cy = H*(0.15+Math.sin(i*2.1)*0.1);
      const cw = 80+i*15, ch = 30+i*5;
      ctx.beginPath(); ctx.ellipse(cx, cy, cw, ch, 0, 0, Math.PI*2); ctx.fill();
    }
    // Floating islands
    ctx.fillStyle = '#2d5a1b'; // Grass top
    [[W*.2,H*.5,120],[W*.75,H*.65,80]].forEach(([ix,iy,iw])=>{
      ctx.beginPath(); ctx.ellipse(ix,iy,iw,18,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle = '#8b5a2b';
      ctx.beginPath(); ctx.moveTo(ix-iw,iy); ctx.lineTo(ix-iw+20,iy+40); ctx.lineTo(ix+iw-20,iy+40); ctx.lineTo(ix+iw,iy); ctx.fill();
      ctx.fillStyle = '#2d5a1b';
    });
    // Front clouds
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    for(let i=0;i<5;i++){
      const cx = (W*(i/5+0.1) - (t*25)%W + W)%W, cy = H*(0.75+Math.sin(i*3.2)*0.08);
      ctx.beginPath(); ctx.ellipse(cx, cy, 70+i*20, 22, 0, 0, Math.PI*2); ctx.fill();
    }
    // Heaven glow from above
    const hg = ctx.createLinearGradient(0,0,0,H*.3);
    hg.addColorStop(0,'rgba(255,240,180,0.15)'); hg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle = hg; ctx.fillRect(0,0,W,H*.3);
  }

  // 11 — Crystal Cave: stalactites + crystals + refracted light
  _bg11(ctx, W, H, t) {
    // Cave ceiling and floor dark masses
    ctx.fillStyle = '#020010';
    ctx.fillRect(0, 0, W, H*.12);
    ctx.fillRect(0, H*.88, W, H*.12);
    // Crystal formations - ceiling
    const crystalColors = ['#cc44ff','#00ccff','#ff44cc','#4444ff'];
    for(let i=0;i<9;i++){
      const cx = W*(i+0.5)/9, ch = 60+Math.sin(i*2.7)*30;
      const cc = crystalColors[i%4];
      ctx.fillStyle = cc; ctx.globalAlpha = 0.6+Math.sin(t*1.5+i)*0.2;
      ctx.shadowColor = cc; ctx.shadowBlur = 22;
      ctx.beginPath();
      ctx.moveTo(cx-12, 0); ctx.lineTo(cx+12, 0); ctx.lineTo(cx+6, ch); ctx.lineTo(cx, ch+15); ctx.lineTo(cx-6, ch); ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    // Crystal formations - floor
    for(let i=0;i<7;i++){
      const cx = W*(i+0.5)/7+15, ch = 40+Math.sin(i*3.1)*25;
      const cc = crystalColors[(i+2)%4];
      ctx.fillStyle = cc; ctx.globalAlpha = 0.5+Math.sin(t*2+i)*0.2;
      ctx.beginPath();
      ctx.moveTo(cx-10, H); ctx.lineTo(cx+10, H); ctx.lineTo(cx+5, H-ch); ctx.lineTo(cx, H-ch-12); ctx.lineTo(cx-5, H-ch); ctx.closePath();
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    // Refracted light dots
    for(let i=0;i<20;i++){
      const rdx = W*(Math.sin(i*6.3)*0.5+0.5), rdy = H*(Math.cos(i*4.7)*0.4+0.5);
      const a = 0.2+0.15*Math.sin(t*3+i);
      ctx.fillStyle = `rgba(${150+i*5},${50+i*10},255,${a})`;
      ctx.beginPath(); ctx.arc(rdx, rdy, 1.5, 0, Math.PI*2); ctx.fill();
    }
  }

  // 12 — Sakura Garden: hills + torii gate + blossom trees
  _bg12(ctx, W, H, t) {
    // Rolling hills
    const hillG = ctx.createLinearGradient(0, H*.6, 0, H);
    hillG.addColorStop(0, '#3d1535'); hillG.addColorStop(1, '#1a0a14');
    ctx.fillStyle = hillG;
    ctx.beginPath(); ctx.moveTo(0, H);
    for(let x=0;x<=W;x+=20) ctx.lineTo(x, H*(0.65+Math.sin(x*0.01)*0.08+Math.cos(x*0.007)*0.05));
    ctx.lineTo(W, H); ctx.fill();
    // Distant hill silhouette
    ctx.fillStyle = 'rgba(60,20,55,0.6)';
    ctx.beginPath(); ctx.moveTo(0,H);
    for(let x=0;x<=W;x+=15) ctx.lineTo(x, H*(0.55+Math.sin(x*0.008+1)*0.1));
    ctx.lineTo(W,H); ctx.fill();
    // Torii gate
    ctx.strokeStyle = 'rgba(220,60,40,0.7)'; ctx.lineWidth = 8; ctx.fillStyle = 'rgba(180,40,30,0.7)';
    const gx = W*.6, gy = H*.42;
    ctx.beginPath(); ctx.moveTo(gx, gy+60); ctx.lineTo(gx, gy-80); ctx.stroke(); // pillar left
    ctx.beginPath(); ctx.moveTo(gx+70, gy+60); ctx.lineTo(gx+70, gy-80); ctx.stroke(); // pillar right
    ctx.lineWidth = 12;
    ctx.beginPath(); ctx.moveTo(gx-10, gy-80); ctx.lineTo(gx+80, gy-80); ctx.stroke(); // top crossbar
    ctx.lineWidth = 7;
    ctx.beginPath(); ctx.moveTo(gx-5, gy-60); ctx.lineTo(gx+75, gy-60); ctx.stroke(); // middle bar
    // Blossom tree silhouettes
    [[W*.15,H*.7,80],[W*.85,H*.72,60]].forEach(([tx,ty,tr])=>{
      ctx.fillStyle = '#180a14';
      ctx.fillRect(tx-6, ty, 12, H*.2);
      ctx.fillStyle = 'rgba(200,100,160,0.5)';
      ctx.beginPath(); ctx.arc(tx, ty, tr, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = 'rgba(220,130,180,0.3)';
      ctx.beginPath(); ctx.arc(tx-20, ty+20, tr*.6, 0, Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(tx+25, ty+15, tr*.5, 0, Math.PI*2); ctx.fill();
    });
    // Ground lanterns
    [[W*.3,H*.88],[W*.5,H*.87],[W*.7,H*.88]].forEach(([lx,ly])=>{
      const lg = ctx.createRadialGradient(lx,ly,0,lx,ly,20);
      lg.addColorStop(0,'rgba(255,150,50,0.5)'); lg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=lg; ctx.fillRect(0,0,W,H);
      ctx.fillStyle='rgba(255,120,30,0.8)'; ctx.fillRect(lx-8,ly-12,16,12);
      ctx.fillStyle='#333'; ctx.fillRect(lx-3,ly-18,6,8);
    });
  }

  // 13 — Shadow Dimension: vortex rings + dimensional rifts + void
  _bg13(ctx, W, H, t) {
    // Vortex rings
    for(let i=0;i<5;i++){
      const r = 80+i*60, a = t*0.5*(i%2?1:-1)+i;
      const vg = ctx.createRadialGradient(W*.5, H*.5, r-8, W*.5, H*.5, r+8);
      vg.addColorStop(0, 'rgba(100,0,200,0)'); vg.addColorStop(0.5, `rgba(${80+i*20},0,${180+i*15},${0.1-i*0.015})`); vg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = vg; ctx.fillRect(0,0,W,H);
    }
    // Dimensional rift lines
    ctx.strokeStyle = 'rgba(150,0,255,0.25)'; ctx.lineWidth = 2;
    for(let i=0;i<6;i++){
      const lx = W*(i+0.5)/6+Math.sin(t*0.7+i)*30;
      ctx.beginPath(); ctx.moveTo(lx, 0);
      for(let y=0;y<=H;y+=40) ctx.lineTo(lx+Math.sin(y*0.05+t*2+i)*20, y);
      ctx.stroke();
    }
    // Shadow blobs
    for(let i=0;i<4;i++){
      const bx = W*(0.2+i*0.2)+Math.sin(t*0.3+i)*50, by = H*(0.3+Math.cos(t*0.4+i*1.5)*0.2);
      const bg = ctx.createRadialGradient(bx,by,0,bx,by,80+Math.sin(t+i)*20);
      bg.addColorStop(0,'rgba(40,0,80,0.3)'); bg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    }
    // Reality cracks
    ctx.strokeStyle = 'rgba(200,100,255,0.2)'; ctx.lineWidth = 1.5;
    [[W*.3,H*.2,W*.4,H*.5],[W*.7,H*.3,W*.6,H*.6],[W*.2,H*.7,W*.35,H*.4]].forEach(([x1,y1,x2,y2])=>{
      ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2);
      ctx.lineTo(x2+20*Math.sin(t),y2+30); ctx.stroke();
    });
  }

  // 14 — Chaos Realm: all worlds blended, color cycle
  _bg14(ctx, W, H, t, game) {
    const h = game.colorHue;
    // Cycling color wash
    ctx.fillStyle = `hsla(${h},80%,15%,0.3)`; ctx.fillRect(0,0,W,H);
    // Draw elements from multiple worlds at low opacity
    ctx.globalAlpha = 0.15;
    this._bg0(ctx,W,H,t); // neon space warp
    ctx.globalAlpha = 0.1;
    this._bg1(ctx,W,H,t+100); // volcano embers
    ctx.globalAlpha = 0.08;
    this._bg4(ctx,W,H,t+50,game); // city
    ctx.globalAlpha = 0.08;
    this._bg13(ctx,W,H,t+200); // shadow vortex
    ctx.globalAlpha = 1;
    // Chaos lightning
    ctx.strokeStyle = `hsla(${(h+180)%360},100%,70%,0.4)`; ctx.lineWidth = 2;
    for(let i=0;i<6;i++){
      ctx.beginPath(); ctx.moveTo(Math.random()*W, 0);
      for(let y=0;y<H;y+=30) ctx.lineTo(Math.random()*W,y);
      ctx.stroke();
    }
    // Color vortex
    const cvg = ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,200);
    cvg.addColorStop(0,`hsla(${h},100%,50%,0.08)`); cvg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=cvg; ctx.fillRect(0,0,W,H);
  }

  // ── OBSTACLE DRAWING ───────────────────────────────────
  drawObstacle(ctx, o, t, ghostAlpha, worldIdx, colorHue) {
    ctx.save(); ctx.globalAlpha = ghostAlpha;
    switch(worldIdx) {
      case 0:  this._obs0(ctx, o, t); break;
      case 1:  this._obs1(ctx, o, t); break;
      case 2:  this._obs2(ctx, o, t); break;
      case 3:  this._obs3(ctx, o, t); break;
      case 4:  this._obs4(ctx, o, t); break;
      case 5:  this._obs5(ctx, o, t); break;
      case 6:  this._obs6(ctx, o, t); break;
      case 7:  this._obs7(ctx, o, t); break;
      case 8:  this._obs8(ctx, o, t); break;
      case 9:  this._obs9(ctx, o, t); break;
      case 10: this._obs10(ctx, o, t); break;
      case 11: this._obs11(ctx, o, t); break;
      case 12: this._obs12(ctx, o, t); break;
      case 13: this._obs13(ctx, o, t); break;
      case 14: this._obs14(ctx, o, t, colorHue); break;
      default: this._obs0(ctx, o, t);
    }
    ctx.restore();
  }

  // 0 — Neon Space: thin glowing neon bar
  _obs0(ctx, o, t) {
    const grd = ctx.createLinearGradient(o.x, o.y, o.x + o.w, o.y + o.h);
    grd.addColorStop(0, '#ff2d78'); grd.addColorStop(1, '#9900aa');
    ctx.shadowBlur = 20 + Math.sin(t * 3) * 6; ctx.shadowColor = '#ff2d78';
    ctx.fillStyle = grd;
    ctx.fillRect(o.x, o.y, o.w, o.h);
    // Neon edge highlights
    ctx.strokeStyle = 'rgba(255,150,220,0.7)'; ctx.lineWidth = 1.5;
    ctx.strokeRect(o.x + 1, o.y + 1, o.w - 2, o.h - 2);
    // Scan line
    const sl = (t * 80) % o.h;
    ctx.fillStyle = `rgba(255,200,255,${0.15 + Math.sin(t * 5) * 0.05})`;
    ctx.fillRect(o.x, o.y + sl, o.w, 2);
  }

  // 1 — Inferno: lava pillar with jagged edges
  _obs1(ctx, o, t) {
    const grd = ctx.createLinearGradient(o.x, o.y, o.x, o.y + o.h);
    grd.addColorStop(0, '#ff7700'); grd.addColorStop(0.4, '#cc3300'); grd.addColorStop(1, '#660000');
    ctx.shadowBlur = 18; ctx.shadowColor = '#ff4400';
    // Jagged silhouette path
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.moveTo(o.x, o.y);
    // Top jagged edge
    const jags = 5, jw = o.w / jags;
    for (let j = 0; j < jags; j++) {
      const jx = o.x + j * jw, jh = 8 + Math.sin(j * 2.1 + t) * 4;
      ctx.lineTo(jx + jw * 0.3, o.y + jh);
      ctx.lineTo(jx + jw * 0.5, o.y);
      ctx.lineTo(jx + jw * 0.7, o.y + jh * 0.7);
      ctx.lineTo(jx + jw, o.y);
    }
    ctx.lineTo(o.x + o.w, o.y + o.h);
    // Bottom jagged edge (mirror)
    for (let j = jags; j >= 0; j--) {
      const jx = o.x + j * jw, jh = 6 + Math.sin(j * 1.9 + t) * 3;
      ctx.lineTo(jx, o.y + o.h - (j < jags ? jh : 0));
    }
    ctx.closePath(); ctx.fill();
    // Lava cracks
    ctx.strokeStyle = 'rgba(255,200,0,0.5)'; ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo(o.x + o.w * 0.3 * (i + 1), o.y);
      ctx.quadraticCurveTo(o.x + o.w * 0.3 * i + 5, o.y + o.h * 0.5, o.x + o.w * 0.3 * (i + 0.5), o.y + o.h);
      ctx.stroke();
    }
  }

  // 2 — Serpent Temple: stone pillar with carvings
  _obs2(ctx, o, t) {
    const grd = ctx.createLinearGradient(o.x, 0, o.x + o.w, 0);
    grd.addColorStop(0, '#3a2a10'); grd.addColorStop(0.4, '#5a4a2a'); grd.addColorStop(1, '#2a1e0a');
    ctx.shadowBlur = 12; ctx.shadowColor = '#c8a000';
    ctx.fillStyle = grd; ctx.fillRect(o.x, o.y, o.w, o.h);
    // Stone blocks
    ctx.strokeStyle = 'rgba(80,60,20,0.5)'; ctx.lineWidth = 1;
    for (let y = o.y; y < o.y + o.h; y += 25) ctx.strokeRect(o.x, y, o.w, 25);
    // Carving marks (horizontal lines)
    ctx.strokeStyle = 'rgba(200,160,50,0.3)'; ctx.lineWidth = 1.5;
    for (let i = 1; i < Math.floor(o.h / 20); i++) {
      const cy = o.y + i * 20;
      ctx.beginPath(); ctx.moveTo(o.x + 3, cy); ctx.lineTo(o.x + o.w - 3, cy); ctx.stroke();
    }
    // Torch glow at mid-point
    if (o.h > 80) {
      const tg = ctx.createRadialGradient(o.x, o.y + o.h / 2, 0, o.x, o.y + o.h / 2, 30);
      tg.addColorStop(0, 'rgba(255,150,0,0.3)'); tg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = tg; ctx.fillRect(o.x - 30, o.y, 60, o.h);
    }
  }

  // 3 — Frozen Kingdom: ice crystal with pointed top
  _obs3(ctx, o, t) {
    const grd = ctx.createLinearGradient(o.x, o.y, o.x + o.w, o.y + o.h);
    grd.addColorStop(0, 'rgba(200,240,255,0.95)'); grd.addColorStop(0.5, 'rgba(100,200,255,0.85)'); grd.addColorStop(1, 'rgba(0,120,200,0.9)');
    ctx.shadowBlur = 18; ctx.shadowColor = '#00d4ff';
    // Ice shard path — pointed protrusion
    ctx.fillStyle = grd;
    const tip = o.h > 60 ? 20 : 10;
    ctx.beginPath();
    if (o.y < 100) { // top obstacle — spike goes DOWN
      ctx.moveTo(o.x, o.y); ctx.lineTo(o.x + o.w, o.y);
      ctx.lineTo(o.x + o.w, o.y + o.h);
      ctx.lineTo(o.x + o.w * 0.7, o.y + o.h + tip);
      ctx.lineTo(o.x + o.w * 0.5, o.y + o.h);
      ctx.lineTo(o.x + o.w * 0.3, o.y + o.h + tip * 0.7);
      ctx.lineTo(o.x, o.y + o.h);
    } else { // bottom obstacle — spike goes UP
      ctx.moveTo(o.x, o.y + o.h); ctx.lineTo(o.x + o.w, o.y + o.h);
      ctx.lineTo(o.x + o.w, o.y);
      ctx.lineTo(o.x + o.w * 0.65, o.y - tip);
      ctx.lineTo(o.x + o.w * 0.5, o.y);
      ctx.lineTo(o.x + o.w * 0.3, o.y - tip * 0.6);
      ctx.lineTo(o.x, o.y);
    }
    ctx.closePath(); ctx.fill();
    // Ice facets
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(o.x + o.w * 0.3, o.y); ctx.lineTo(o.x + o.w * 0.5, o.y + o.h); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(o.x + o.w * 0.7, o.y); ctx.lineTo(o.x + o.w * 0.4, o.y + o.h); ctx.stroke();
  }

  // 4 — Electric City: electric barrier with arcs
  _obs4(ctx, o, t) {
    // Dark body
    ctx.fillStyle = '#001a2a'; ctx.fillRect(o.x, o.y, o.w, o.h);
    ctx.shadowBlur = 20; ctx.shadowColor = '#00ffcc';
    // Electric strips
    const strips = Math.max(2, Math.floor(o.h / 15));
    for (let i = 0; i < strips; i++) {
      const sy = o.y + (i / strips) * o.h;
      const sw = o.h / strips - 2;
      const active = Math.sin(t * 6 + i * 1.5) > 0;
      if (active) {
        const eg = ctx.createLinearGradient(o.x, sy, o.x + o.w, sy);
        eg.addColorStop(0, 'rgba(0,255,200,0.8)'); eg.addColorStop(0.5, 'rgba(0,200,255,1)'); eg.addColorStop(1, 'rgba(0,255,200,0.8)');
        ctx.fillStyle = eg;
      } else {
        ctx.fillStyle = 'rgba(0,60,80,0.5)';
      }
      ctx.fillRect(o.x, sy, o.w, sw);
    }
    // Edge arc effects
    ctx.strokeStyle = `rgba(0,255,220,${0.3 + Math.sin(t * 8) * 0.2})`; ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const ay = o.y + o.h * (i / 3) + (t * 20) % (o.h / 3);
      ctx.beginPath(); ctx.moveTo(o.x, ay);
      ctx.quadraticCurveTo(o.x + o.w / 2, ay + Math.sin(t * 5 + i) * 10, o.x + o.w, ay);
      ctx.stroke();
    }
  }

  // 5 — Deep Ocean: coral cluster
  _obs5(ctx, o, t) {
    const grd = ctx.createLinearGradient(o.x, o.y, o.x + o.w, o.y + o.h);
    grd.addColorStop(0, '#ff6b9d'); grd.addColorStop(0.5, '#ff3399'); grd.addColorStop(1, '#00a8cc');
    ctx.shadowBlur = 15; ctx.shadowColor = '#00d4ff';
    // Main coral body (bumpy edges)
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.moveTo(o.x, o.y + o.h);
    // Bumpy left
    for (let y = o.y + o.h; y >= o.y; y -= 18) {
      ctx.quadraticCurveTo(o.x - 6, y - 9, o.x, y - 18);
    }
    // Bumpy top
    for (let x = o.x; x <= o.x + o.w; x += 18) {
      ctx.quadraticCurveTo(x + 9, o.y - 6, x + 18, o.y);
    }
    // Right side
    ctx.lineTo(o.x + o.w, o.y + o.h);
    ctx.closePath(); ctx.fill();
    // Polyp dots (anemone look)
    ctx.fillStyle = 'rgba(255,200,255,0.6)';
    for (let dy = o.y + 10; dy < o.y + o.h - 10; dy += 20) {
      for (let dx = o.x + 4; dx < o.x + o.w - 4; dx += 14) {
        if ((dx + dy) % 28 < 14) { ctx.beginPath(); ctx.arc(dx, dy, 4, 0, Math.PI * 2); ctx.fill(); }
      }
    }
  }

  // 6 — Enchanted Forest: tree trunk with roots
  _obs6(ctx, o, t) {
    const grd = ctx.createLinearGradient(o.x, 0, o.x + o.w, 0);
    grd.addColorStop(0, '#1a0a00'); grd.addColorStop(0.4, '#3d2200'); grd.addColorStop(1, '#1a0800');
    ctx.shadowBlur = 12; ctx.shadowColor = '#44aa00';
    ctx.fillStyle = grd; ctx.fillRect(o.x, o.y, o.w, o.h);
    // Bark texture (vertical lines)
    ctx.strokeStyle = 'rgba(80,40,10,0.4)'; ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      const bx = o.x + (o.w / 4) * i;
      ctx.beginPath(); ctx.moveTo(bx, o.y);
      for (let y = o.y; y < o.y + o.h; y += 30) ctx.lineTo(bx + Math.sin(y * 0.2) * 2, y + 30);
      ctx.stroke();
    }
    // Moss stripe
    ctx.fillStyle = 'rgba(60,120,20,0.35)';
    ctx.fillRect(o.x, o.y, o.w * 0.25, o.h);
    // Mushrooms on trunk
    if (o.h > 60) {
      [[o.x, o.y + o.h * 0.4], [o.x + o.w, o.y + o.h * 0.6]].forEach(([mx, my]) => {
        ctx.fillStyle = '#cc2200'; ctx.beginPath(); ctx.arc(mx, my, 10, Math.PI, 0); ctx.fill();
        ctx.fillStyle = '#f0f0e8'; ctx.fillRect(mx - 4, my, 8, 8);
      });
    }
    // Root extensions at ground
    if (o.y + o.h > 400) {
      ctx.strokeStyle = '#2a1400'; ctx.lineWidth = 4;
      for (let r = 0; r < 3; r++) {
        ctx.beginPath(); ctx.moveTo(o.x + (r + 1) * o.w / 4, o.y + o.h);
        ctx.quadraticCurveTo(o.x + o.w * (r * 0.3), o.y + o.h + 20, o.x - 10 + r * 15, o.y + o.h + 15);
        ctx.stroke();
      }
    }
  }

  // 7 — Lost Desert: sandstone column
  _obs7(ctx, o, t) {
    const grd = ctx.createLinearGradient(o.x, 0, o.x + o.w, 0);
    grd.addColorStop(0, '#7a4400'); grd.addColorStop(0.5, '#c87820'); grd.addColorStop(1, '#8a5010');
    ctx.shadowBlur = 10; ctx.shadowColor = '#ffaa00';
    ctx.fillStyle = grd; ctx.fillRect(o.x, o.y, o.w, o.h);
    // Sandstone layers (horizontal)
    ctx.strokeStyle = 'rgba(100,60,20,0.4)'; ctx.lineWidth = 1;
    for (let i = 1; i * 20 < o.h; i++) {
      ctx.beginPath(); ctx.moveTo(o.x, o.y + i * 20 + Math.sin(i) * 2); ctx.lineTo(o.x + o.w, o.y + i * 20 + Math.sin(i + 1) * 2); ctx.stroke();
    }
    // Hieroglyph markings
    ctx.strokeStyle = 'rgba(255,180,50,0.3)'; ctx.lineWidth = 1.5;
    if (o.h > 50) {
      const hx = o.x + o.w / 2, hy = o.y + o.h / 2;
      ctx.beginPath(); ctx.moveTo(hx, hy - 12); ctx.lineTo(hx, hy + 12); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(hx - 8, hy); ctx.lineTo(hx + 8, hy); ctx.stroke();
      ctx.beginPath(); ctx.arc(hx, hy - 8, 5, 0, Math.PI * 2); ctx.stroke();
    }
    // Sand erosion on edges
    ctx.fillStyle = 'rgba(200,140,60,0.2)';
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(o.x + (Math.sin(i * 3.7) * 0.5 + 0.5) * o.w * 0.8, o.y + i * (o.h / 4), 3, 8);
    }
  }

  // 8 — Haunted Mansion: dark wrought-iron fence
  _obs8(ctx, o, t) {
    ctx.shadowBlur = 14; ctx.shadowColor = '#8800cc';
    // Dark body
    const grd = ctx.createLinearGradient(o.x, o.y, o.x + o.w, o.y + o.h);
    grd.addColorStop(0, '#1a0030'); grd.addColorStop(1, '#0a0010');
    ctx.fillStyle = grd; ctx.fillRect(o.x, o.y, o.w, o.h);
    // Iron bars
    ctx.strokeStyle = '#333344'; ctx.lineWidth = 3;
    for (let i = 0; i <= 2; i++) {
      const bx = o.x + (o.w / 3) * i + o.w / 6;
      ctx.beginPath(); ctx.moveTo(bx, o.y); ctx.lineTo(bx, o.y + o.h); ctx.stroke();
      // Spear tip
      ctx.fillStyle = '#444455';
      ctx.beginPath(); ctx.moveTo(bx - 4, o.y + 2); ctx.lineTo(bx, o.y - 10); ctx.lineTo(bx + 4, o.y + 2); ctx.closePath(); ctx.fill();
    }
    // Cross brace
    ctx.strokeStyle = '#222233'; ctx.lineWidth = 2;
    ctx.strokeRect(o.x, o.y + o.h / 2 - 3, o.w, 6);
    // Purple edge glow
    ctx.strokeStyle = `rgba(136,0,204,${0.3 + Math.sin(t * 2) * 0.15})`; ctx.lineWidth = 2;
    ctx.strokeRect(o.x, o.y, o.w, o.h);
  }

  // 9 — Future Lab: laser panel
  _obs9(ctx, o, t) {
    ctx.shadowBlur = 20; ctx.shadowColor = '#00ff66';
    // Dark tech body
    ctx.fillStyle = '#001811'; ctx.fillRect(o.x, o.y, o.w, o.h);
    // Panel lines
    ctx.strokeStyle = 'rgba(0,100,50,0.4)'; ctx.lineWidth = 1;
    ctx.strokeRect(o.x, o.y, o.w, o.h);
    ctx.beginPath(); ctx.moveTo(o.x, o.y + o.h / 2); ctx.lineTo(o.x + o.w, o.y + o.h / 2); ctx.stroke();
    // Laser beams (horizontal)
    const beamCount = Math.max(2, Math.floor(o.h / 20));
    for (let i = 0; i < beamCount; i++) {
      const by = o.y + (i / beamCount) * o.h + 5;
      const phase = Math.sin(t * 4 + i * 1.2);
      const intensity = 0.5 + phase * 0.4;
      const beamG = ctx.createLinearGradient(o.x, by, o.x + o.w, by);
      beamG.addColorStop(0, 'rgba(0,255,100,0)');
      beamG.addColorStop(0.2, `rgba(0,255,100,${intensity})`);
      beamG.addColorStop(0.8, `rgba(0,255,100,${intensity})`);
      beamG.addColorStop(1, 'rgba(0,255,100,0)');
      ctx.fillStyle = beamG; ctx.fillRect(o.x, by - 1, o.w, 3);
    }
    // Warning chevron
    ctx.fillStyle = `rgba(0,255,100,${0.15 + Math.abs(Math.sin(t * 3)) * 0.1})`;
    ctx.font = `bold ${Math.min(o.w * 0.7, 14)}px monospace`; ctx.textAlign = 'center';
    if (o.h > 40) ctx.fillText('⚡', o.x + o.w / 2, o.y + o.h / 2 + 5);
    ctx.textAlign = 'left';
  }

  // 10 — Sky Kingdom: marble pillar with capitals
  _obs10(ctx, o, t) {
    const grd = ctx.createLinearGradient(o.x, 0, o.x + o.w, 0);
    grd.addColorStop(0, '#c0b080'); grd.addColorStop(0.4, '#fff8e8'); grd.addColorStop(0.7, '#e8d890'); grd.addColorStop(1, '#b09860');
    ctx.shadowBlur = 16; ctx.shadowColor = '#ffd060';
    ctx.fillStyle = grd; ctx.fillRect(o.x, o.y, o.w, o.h);
    // Column fluting (vertical lines)
    ctx.strokeStyle = 'rgba(120,100,40,0.25)'; ctx.lineWidth = 1;
    for (let i = 1; i < 5; i++) ctx.beginPath(), ctx.moveTo(o.x + (o.w / 5) * i, o.y), ctx.lineTo(o.x + (o.w / 5) * i, o.y + o.h), ctx.stroke();
    // Capital at top edge
    ctx.fillStyle = '#e8c860';
    ctx.fillRect(o.x - 4, o.y, o.w + 8, Math.min(12, o.h));
    ctx.fillRect(o.x - 2, o.y + Math.min(12, o.h), o.w + 4, Math.min(6, Math.max(0, o.h - 12)));
    // Base at bottom edge
    ctx.fillRect(o.x - 4, o.y + Math.max(0, o.h - 12), o.w + 8, Math.min(12, o.h));
    // Golden shimmer
    ctx.strokeStyle = `rgba(255,220,80,${0.2 + Math.sin(t * 2) * 0.08})`; ctx.lineWidth = 1;
    ctx.strokeRect(o.x, o.y, o.w, o.h);
  }

  // 11 — Crystal Cave: hexagonal crystal formation
  _obs11(ctx, o, t) {
    const grd = ctx.createLinearGradient(o.x, o.y, o.x + o.w, o.y + o.h);
    grd.addColorStop(0, '#cc44ff'); grd.addColorStop(0.5, '#6644ff'); grd.addColorStop(1, '#00ccff');
    ctx.shadowBlur = 22; ctx.shadowColor = '#cc00ff';
    // Crystal facets using polygon paths
    ctx.fillStyle = grd;
    const facetW = Math.max(o.w, 12);
    ctx.beginPath();
    ctx.moveTo(o.x + facetW * 0.15, o.y);
    ctx.lineTo(o.x + facetW * 0.85, o.y);
    ctx.lineTo(o.x + facetW, o.y + o.h * 0.2);
    ctx.lineTo(o.x + facetW, o.y + o.h * 0.8);
    ctx.lineTo(o.x + facetW * 0.85, o.y + o.h);
    ctx.lineTo(o.x + facetW * 0.15, o.y + o.h);
    ctx.lineTo(o.x, o.y + o.h * 0.8);
    ctx.lineTo(o.x, o.y + o.h * 0.2);
    ctx.closePath(); ctx.fill();
    // Internal facet lines
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(o.x + facetW * 0.5, o.y); ctx.lineTo(o.x + facetW, o.y + o.h * 0.5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(o.x + facetW * 0.5, o.y); ctx.lineTo(o.x, o.y + o.h * 0.5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(o.x + facetW * 0.5, o.y); ctx.lineTo(o.x + facetW * 0.5, o.y + o.h); ctx.stroke();
    // Prismatic shimmer
    const shimmer = 0.3 + Math.sin(t * 4) * 0.2;
    ctx.strokeStyle = `rgba(200,100,255,${shimmer})`; ctx.lineWidth = 2;
    ctx.strokeRect(o.x, o.y, facetW, o.h);
  }

  // 12 — Sakura Garden: bamboo segment
  _obs12(ctx, o, t) {
    const grd = ctx.createLinearGradient(o.x, 0, o.x + o.w, 0);
    grd.addColorStop(0, '#115511'); grd.addColorStop(0.4, '#228822'); grd.addColorStop(0.7, '#336633'); grd.addColorStop(1, '#0e4411');
    ctx.shadowBlur = 10; ctx.shadowColor = '#88ff66';
    ctx.fillStyle = grd; ctx.fillRect(o.x, o.y, o.w, o.h);
    // Bamboo joints
    ctx.strokeStyle = 'rgba(20,80,20,0.6)'; ctx.lineWidth = 3;
    for (let y = o.y + 40; y < o.y + o.h; y += 40) {
      ctx.beginPath(); ctx.moveTo(o.x - 2, y); ctx.lineTo(o.x + o.w + 2, y); ctx.stroke();
      // Joint ring detail
      ctx.fillStyle = 'rgba(30,100,30,0.5)'; ctx.fillRect(o.x - 2, y - 3, o.w + 4, 6);
    }
    // Highlight stripe
    ctx.fillStyle = 'rgba(100,200,100,0.15)';
    ctx.fillRect(o.x + 2, o.y, 4, o.h);
    // Leaf detail near joints
    ctx.fillStyle = 'rgba(60,160,60,0.5)';
    for (let y = o.y + 40; y < o.y + o.h; y += 80) {
      ctx.beginPath(); ctx.ellipse(o.x - 8, y, 15, 5, -0.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(o.x + o.w + 8, y + 20, 15, 5, 0.5, 0, Math.PI * 2); ctx.fill();
    }
  }

  // 13 — Shadow Dimension: shadow void with energy tendrils
  _obs13(ctx, o, t) {
    ctx.shadowBlur = 24; ctx.shadowColor = '#9900ff';
    // Near-void body
    ctx.fillStyle = '#08000f'; ctx.fillRect(o.x, o.y, o.w, o.h);
    // Purple energy outline
    ctx.strokeStyle = `rgba(153,0,255,${0.6 + Math.sin(t * 4) * 0.3})`; ctx.lineWidth = 2;
    ctx.strokeRect(o.x, o.y, o.w, o.h);
    // Tendrils on edges
    ctx.strokeStyle = 'rgba(180,0,255,0.3)'; ctx.lineWidth = 1.5;
    const numTend = Math.floor(o.h / 20);
    for (let i = 0; i < numTend; i++) {
      const ty = o.y + (i / numTend) * o.h;
      // Left tendril
      ctx.beginPath(); ctx.moveTo(o.x, ty);
      ctx.quadraticCurveTo(o.x - 15, ty + Math.sin(t * 3 + i) * 10, o.x - 20 - Math.abs(Math.sin(t * 2 + i)) * 10, ty + Math.cos(t * 4 + i) * 15);
      ctx.stroke();
      // Right tendril
      ctx.beginPath(); ctx.moveTo(o.x + o.w, ty);
      ctx.quadraticCurveTo(o.x + o.w + 15, ty + Math.sin(t * 3 + i + 1) * 10, o.x + o.w + 20 + Math.abs(Math.sin(t * 2 + i)) * 10, ty + Math.cos(t * 4 + i + 1) * 15);
      ctx.stroke();
    }
    // Inner void pulse
    const vpg = ctx.createRadialGradient(o.x + o.w / 2, o.y + o.h / 2, 0, o.x + o.w / 2, o.y + o.h / 2, Math.max(o.w, o.h) * 0.5);
    vpg.addColorStop(0, `rgba(80,0,120,${0.2 + Math.sin(t * 2) * 0.1})`); vpg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = vpg; ctx.fillRect(o.x, o.y, o.w, o.h);
  }

  // 14 — Chaos Realm: shape morphs by time/colorHue
  _obs14(ctx, o, t, colorHue) {
    const style = Math.floor((t * 0.5 + o.x * 0.01) % 5);
    const h = (colorHue + o.x) % 360;
    ctx.shadowBlur = 20; ctx.shadowColor = `hsl(${h},100%,60%)`;
    const grd = ctx.createLinearGradient(o.x, o.y, o.x + o.w, o.y + o.h);
    grd.addColorStop(0, `hsl(${h},100%,65%)`); grd.addColorStop(1, `hsl(${(h + 60) % 360},100%,40%)`);
    ctx.fillStyle = grd;
    switch(style % 3) {
      case 0: ctx.fillRect(o.x, o.y, o.w, o.h); break;
      case 1: // diamond cuts
        ctx.beginPath();
        ctx.moveTo(o.x + o.w * 0.2, o.y); ctx.lineTo(o.x + o.w * 0.8, o.y);
        ctx.lineTo(o.x + o.w, o.y + o.h * 0.15);
        ctx.lineTo(o.x + o.w, o.y + o.h * 0.85);
        ctx.lineTo(o.x + o.w * 0.8, o.y + o.h);
        ctx.lineTo(o.x + o.w * 0.2, o.y + o.h);
        ctx.lineTo(o.x, o.y + o.h * 0.85);
        ctx.lineTo(o.x, o.y + o.h * 0.15);
        ctx.closePath(); ctx.fill(); break;
      case 2: // jagged
        ctx.fillRect(o.x, o.y, o.w, o.h);
        break;
    }
    // Chaos energy lines
    ctx.strokeStyle = `hsla(${(h + 180) % 360},100%,80%,0.5)`; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(o.x, o.y + o.h / 2);
    for (let x = o.x; x <= o.x + o.w; x += 8) ctx.lineTo(x, o.y + o.h / 2 + Math.sin(x * 0.3 + t * 5) * 8);
    ctx.stroke();
  }

  // ── AMBIENT PARTICLE EFFECTS ───────────────────────────
  spawnAmbient(game, dt, worldIdx) {
    switch(worldIdx) {
      case 0:  this._amb0(game, dt); break;
      case 1:  this._amb1(game, dt); break;
      case 2:  this._amb2(game, dt); break;
      case 3:  this._amb3(game, dt); break;
      case 4:  this._amb4(game, dt); break;
      case 5:  this._amb5(game, dt); break;
      case 6:  this._amb6(game, dt); break;
      case 7:  this._amb7(game, dt); break;
      case 8:  this._amb8(game, dt); break;
      case 9:  this._amb9(game, dt); break;
      case 10: this._amb10(game, dt); break;
      case 11: this._amb11(game, dt); break;
      case 12: this._amb12(game, dt); break;
      case 13: this._amb13(game, dt); break;
      case 14: this._amb14(game, dt); break;
    }
  }

  _P(game, x, y, vx, vy, color, life, sq=false, sz=null) {
    // Push via the Particle class — game.particles is the live array
    game.particles.push({ x, y, vx, vy, color, life, maxLife:life, size:sz??(Math.random()*4+2), sq, rot:Math.random()*Math.PI*2, rotV:(Math.random()-.5)*6,
      update(dt){ this.x+=this.vx*dt;this.y+=this.vy*dt;this.vy+=140*dt;this.vx*=.985;this.life-=dt;this.rot+=this.rotV*dt; },
      draw(ctx){ const a=Math.max(0,this.life/this.maxLife),sz=this.size*(0.3+0.7*a);ctx.save();ctx.globalAlpha=a;ctx.fillStyle=this.color;ctx.shadowBlur=10;ctx.shadowColor=this.color;if(this.sq){ctx.translate(this.x,this.y);ctx.rotate(this.rot);ctx.fillRect(-sz/2,-sz/2,sz,sz);}else{ctx.beginPath();ctx.arc(this.x,this.y,sz,0,Math.PI*2);ctx.fill();}ctx.restore(); }
    });
  }

  // 0 — Neon Space: pink/cyan sparks drifting sideways
  _amb0(game, dt) {
    if (Math.random() < 3 * dt) {
      const color = Math.random() < 0.5 ? '#ff80ff' : '#00ffff';
      this._P(game, Math.random() * game.W, Math.random() * game.H, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 20, color, 1.5 + Math.random(), false, Math.random() * 2 + 1);
    }
  }

  // 1 — Inferno: embers rising from bottom
  _amb1(game, dt) {
    const rate = 8 + game.stage;
    if (Math.random() < rate * dt) {
      const color = Math.random() < 0.6 ? '#ff6600' : '#ffaa00';
      this._P(game, Math.random() * game.W, game.H + 10, (Math.random() - 0.5) * 60, -150 - Math.random() * 200, color, 2 + Math.random(), false, Math.random() * 3 + 1);
      game.particles[game.particles.length-1].vy *= -1; // force upward
    }
    // Also occasional smoke puff
    if (Math.random() < 1 * dt) {
      this._P(game, game.W * 0.4 + Math.random() * game.W * 0.2, game.H * 0.35, (Math.random() - 0.5) * 30, -40, 'rgba(60,30,20,0.3)', 3, false, 8 + Math.random() * 6);
    }
  }

  // 2 — Serpent Temple: golden torch sparks
  _amb2(game, dt) {
    if (Math.random() < 4 * dt) {
      const tx = Math.random() < 0.5 ? game.W * 0.12 : game.W * 0.88;
      const color = Math.random() < 0.7 ? '#ffa000' : '#ffcc00';
      this._P(game, tx + (Math.random() - 0.5) * 10, game.H * 0.5, (Math.random() - 0.5) * 40, -80 - Math.random() * 80, color, 1 + Math.random(), false, Math.random() * 2 + 1);
    }
  }

  // 3 — Frozen Kingdom: snowflakes falling
  _amb3(game, dt) {
    if (Math.random() < 6 * dt) {
      const size = Math.random() * 3 + 1;
      this._P(game, Math.random() * game.W, -10, (Math.random() - 0.5) * 20, 30 + Math.random() * 40, '#c0eeff', 4 + Math.random() * 3, false, size);
      const p = game.particles[game.particles.length - 1];
      p.vy = 30; // slow fall
      const origUpd = p.update.bind(p);
      p.update = function(dt) { this.x += this.vx * dt + Math.sin(this.rot) * 15 * dt; this.y += this.vy * dt; this.vy = 30; this.life -= dt; this.rot += 1 * dt; };
    }
  }

  // 4 — Electric City: blue/cyan sparks near edges
  _amb4(game, dt) {
    if (Math.random() < 5 * dt) {
      const color = Math.random() < 0.5 ? '#00ffcc' : '#ffff00';
      const y = Math.random() * game.H;
      this._P(game, Math.random() < 0.5 ? 0 : game.W, y, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 120, color, 0.4 + Math.random() * 0.4, true, Math.random() * 2 + 1);
    }
  }

  // 5 — Deep Ocean: bubbles rising
  _amb5(game, dt) {
    if (Math.random() < 5 * dt) {
      const size = Math.random() * 5 + 2;
      const p = { x: Math.random() * game.W, y: game.H + 10, vx: (Math.random() - 0.5) * 15, vy: -60 - Math.random() * 80, color: 'rgba(150,220,255,0.6)', life: 3 + Math.random() * 2, maxLife: 5, size, sq: false, rot: 0, rotV: 0,
        update(dt){ this.x += this.vx * dt + Math.sin(this.y * 0.05) * 0.5; this.y += this.vy * dt; this.vy = Math.max(-100, this.vy); this.life -= dt; },
        draw(ctx){ const a = Math.max(0, this.life / this.maxLife) * 0.5; ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = this.color; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.stroke(); ctx.restore(); }
      };
      game.particles.push(p);
    }
  }

  // 6 — Enchanted Forest: fireflies
  _amb6(game, dt) {
    if (Math.random() < 2 * dt) {
      const p = { x: Math.random() * game.W, y: game.H * 0.3 + Math.random() * game.H * 0.5, vx: (Math.random() - 0.5) * 20, vy: (Math.random() - 0.5) * 20, color: '#aaff44', life: 4 + Math.random() * 3, maxLife: 7, size: 2.5, sq: false, rot: 0, rotV: 0, phase: Math.random() * Math.PI * 2,
        update(dt){ this.vx += (Math.random()-0.5)*10*dt; this.vy += (Math.random()-0.5)*10*dt; this.vx*=0.98; this.vy*=0.98; this.x+=this.vx*dt; this.y+=this.vy*dt; this.life-=dt; this.phase+=dt*3; },
        draw(ctx){ const a = Math.max(0, this.life/this.maxLife) * (0.5+0.5*Math.sin(this.phase)); ctx.save(); ctx.globalAlpha=a; ctx.shadowBlur=12; ctx.shadowColor='#88ff44'; ctx.fillStyle='#ccff88'; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); ctx.restore(); }
      };
      game.particles.push(p);
    }
  }

  // 7 — Lost Desert: sand particles drifting
  _amb7(game, dt) {
    if (Math.random() < 8 * dt) {
      const color = Math.random() < 0.5 ? '#d4a050' : '#c88030';
      this._P(game, game.W + 10, game.H * 0.3 + Math.random() * game.H * 0.6, -80 - Math.random() * 60, (Math.random() - 0.5) * 30, color, 1 + Math.random() * 2, false, Math.random() * 2 + 0.5);
      const p = game.particles[game.particles.length - 1];
      p.update = function(dt){ this.x+=this.vx*dt; this.y+=this.vy*dt; this.vy*=0.99; this.life-=dt; };
    }
  }

  // 8 — Haunted Mansion: ghost wisps
  _amb8(game, dt) {
    if (Math.random() < 1.5 * dt) {
      const p = { x: Math.random() * game.W, y: Math.random() * game.H, vx: (Math.random()-0.5)*25, vy: -15-Math.random()*20, color: 'rgba(180,120,255,0.6)', life: 5+Math.random()*4, maxLife:9, size:12+Math.random()*8, sq:false, rot:0, rotV:0,
        update(dt){ this.vx+=(Math.random()-0.5)*15*dt; this.vy-=5*dt; this.vx*=0.97; this.x+=this.vx*dt; this.y+=this.vy*dt; this.life-=dt; },
        draw(ctx){ const a=Math.max(0,this.life/this.maxLife)*0.25; ctx.save(); ctx.globalAlpha=a; ctx.shadowBlur=20; ctx.shadowColor='#8800cc'; ctx.fillStyle=this.color; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); ctx.restore(); }
      };
      game.particles.push(p);
    }
  }

  // 9 — Future Lab: green data sparks
  _amb9(game, dt) {
    if (Math.random() < 4 * dt) {
      const color = Math.random() < 0.7 ? '#00ff88' : '#00ddff';
      this._P(game, Math.random() * game.W, Math.random() * game.H, (Math.random()-0.5)*80, (Math.random()-0.5)*80, color, 0.5+Math.random()*0.8, true, Math.random()*2+1);
    }
  }

  // 10 — Sky Kingdom: cloud puffs drifting
  _amb10(game, dt) {
    if (Math.random() < 1 * dt) {
      const p = { x:game.W+20, y:Math.random()*game.H*0.6, vx:-20-Math.random()*15, vy:(Math.random()-0.5)*5, color:'rgba(255,255,255,0.4)', life:8+Math.random()*5, maxLife:13, size:15+Math.random()*10, sq:false, rot:0, rotV:0,
        update(dt){ this.x+=this.vx*dt; this.y+=this.vy*dt; this.life-=dt; },
        draw(ctx){ const a=Math.max(0,this.life/this.maxLife)*0.4; ctx.save(); ctx.globalAlpha=a; ctx.shadowBlur=15; ctx.shadowColor='rgba(255,255,200,0.5)'; ctx.fillStyle=this.color; ctx.beginPath(); ctx.ellipse(this.x,this.y,this.size*1.5,this.size*0.7,0,0,Math.PI*2); ctx.fill(); ctx.restore(); }
      };
      game.particles.push(p);
    }
  }

  // 11 — Crystal Cave: crystal dust
  _amb11(game, dt) {
    if (Math.random() < 5 * dt) {
      const colors = ['#cc44ff','#00ccff','#ff44cc','#8844ff'];
      const color = colors[Math.floor(Math.random()*colors.length)];
      this._P(game, Math.random()*game.W, Math.random()*game.H*0.2, (Math.random()-0.5)*30, 20+Math.random()*40, color, 2+Math.random(), true, Math.random()*2+1);
    }
  }

  // 12 — Sakura Garden: cherry blossom petals
  _amb12(game, dt) {
    if (Math.random() < 4 * dt) {
      const color = Math.random() < 0.6 ? '#ffb0d8' : '#ff80c0';
      const p = { x:game.W+10, y:Math.random()*game.H*0.7, vx:-30-Math.random()*20, vy:10+Math.random()*25, color, life:5+Math.random()*4, maxLife:9, size:4+Math.random()*3, sq:true, rot:Math.random()*Math.PI*2, rotV:(Math.random()-0.5)*3,
        update(dt){ this.x+=this.vx*dt; this.y+=this.vy*dt+Math.sin(this.rot)*5*dt; this.rot+=this.rotV*dt; this.life-=dt; },
        draw(ctx){ const a=Math.max(0,this.life/this.maxLife)*0.8; ctx.save(); ctx.globalAlpha=a; ctx.translate(this.x,this.y); ctx.rotate(this.rot); ctx.fillStyle=this.color; ctx.beginPath(); ctx.ellipse(0,0,this.size,this.size*0.5,0,0,Math.PI*2); ctx.fill(); ctx.restore(); }
      };
      game.particles.push(p);
    }
  }

  // 13 — Shadow Dimension: purple shadow wisps
  _amb13(game, dt) {
    if (Math.random() < 3 * dt) {
      const p = { x:Math.random()*game.W, y:Math.random()*game.H, vx:(Math.random()-0.5)*30, vy:(Math.random()-0.5)*30, color:'rgba(120,0,200,0.5)', life:3+Math.random()*3, maxLife:6, size:8+Math.random()*8, sq:false, rot:0, rotV:0,
        update(dt){ this.vx+=(Math.random()-0.5)*20*dt; this.vy+=(Math.random()-0.5)*20*dt; this.vx*=0.95; this.vy*=0.95; this.x+=this.vx*dt; this.y+=this.vy*dt; this.life-=dt; },
        draw(ctx){ const a=Math.max(0,this.life/this.maxLife)*0.3; ctx.save(); ctx.globalAlpha=a; ctx.shadowBlur=25; ctx.shadowColor='#9900ff'; ctx.fillStyle=this.color; ctx.beginPath(); ctx.arc(this.x,this.y,this.size,0,Math.PI*2); ctx.fill(); ctx.restore(); }
      };
      game.particles.push(p);
    }
  }

  // 14 — Chaos Realm: ALL ambient types
  _amb14(game, dt) {
    this._amb0(game, dt * 0.4);
    this._amb1(game, dt * 0.3);
    this._amb3(game, dt * 0.3);
    this._amb5(game, dt * 0.3);
    this._amb12(game, dt * 0.3);
    this._amb13(game, dt * 0.4);
    // Chaos lightning sparks
    if (Math.random() < 8 * dt) {
      const h = (game.colorHue + Math.random() * 180) % 360;
      this._P(game, Math.random()*game.W, Math.random()*game.H, (Math.random()-0.5)*200, (Math.random()-0.5)*200, `hsl(${h},100%,70%)`, 0.3+Math.random()*0.4, true, Math.random()*3+1);
    }
  }

  // ── WORLD TRANSITION TITLE ANIMATION ──────────────────
  // transition = { worldIdx, name, subtitle, t, phase:'in'/'hold'/'out', duration }
  // ── CINEMATIC HELPERS ────────────────────────────────────
  // Seeded deterministic 0-1 (no per-frame jitter)
  _r(i)      { const x=Math.sin(i*9301+49297)*233280; return x-Math.floor(x); }
  // Progress 0→1 in window [a,b]
  _p(t,a,b)  { return t<=a?0:t>=b?1:(t-a)/(b-a); }
  // Ease in-out
  _eio(p)    { return p<.5?2*p*p:-1+(4-2*p)*p; }

  // Title badge + world name
  _cinTitle(ctx,W,H,tr,alpha,opts={}) {
    if(alpha<=0)return;
    const wd=WORLDS[tr.worldIdx]||WORLDS[0];
    const {color=wd.titleColor,glow=wd.titleGlow,y=0,sub=null}=opts;
    ctx.save();ctx.globalAlpha=alpha;ctx.textAlign='center';
    ctx.font='bold 11px Orbitron,monospace';
    ctx.fillStyle=glow;ctx.shadowColor=glow;ctx.shadowBlur=14;
    ctx.fillText(`— WORLD ${wd.num} —`,W/2,H/2-50+y);
    const fs=Math.min(54,W/Math.max(1,tr.name.length*0.62));
    ctx.font=`900 ${fs}px Orbitron,monospace`;
    ctx.fillStyle=color;ctx.shadowBlur=36;ctx.shadowColor=glow;
    ctx.fillText(tr.name,W/2,H/2+8+y);
    if(sub){
      ctx.font='italic 16px Georgia,serif';
      ctx.fillStyle='rgba(255,255,255,0.7)';ctx.shadowBlur=8;
      ctx.fillText(sub,W/2,H/2+38+y);
    }
    ctx.restore();
  }
  // Italic voice line
  _cinVoice(ctx,W,H,text,alpha,y=72) {
    if(alpha<=0)return;
    ctx.save();ctx.globalAlpha=alpha;ctx.textAlign='center';
    ctx.font='italic 19px Georgia,serif';
    ctx.fillStyle='rgba(255,255,255,0.9)';
    ctx.shadowColor='rgba(255,255,255,0.45)';ctx.shadowBlur=10;
    ctx.fillText(text,W/2,H/2+y);
    ctx.restore();
  }
  // Flat color overlay
  _cinOverlay(ctx,W,H,color,alpha) {
    if(alpha<=0)return;
    ctx.save();ctx.globalAlpha=alpha;
    ctx.fillStyle=color;ctx.fillRect(0,0,W,H);
    ctx.restore();
  }

  // ── TRANSITION DISPATCHER ────────────────────────────────
  drawTransition(ctx,W,H,tr) {
    ctx.save();
    const t=tr.t,w=WORLDS[tr.worldIdx]||WORLDS[0];
    switch(tr.worldIdx){
      case 0:  this._cin0(ctx,W,H,t,tr,w);  break;
      case 1:  this._cin1(ctx,W,H,t,tr,w);  break;
      case 2:  this._cin2(ctx,W,H,t,tr,w);  break;
      case 3:  this._cin3(ctx,W,H,t,tr,w);  break;
      case 4:  this._cin4(ctx,W,H,t,tr,w);  break;
      case 5:  this._cin5(ctx,W,H,t,tr,w);  break;
      case 6:  this._cin6(ctx,W,H,t,tr,w);  break;
      case 7:  this._cin7(ctx,W,H,t,tr,w);  break;
      case 8:  this._cin8(ctx,W,H,t,tr,w);  break;
      case 9:  this._cin9(ctx,W,H,t,tr,w);  break;
      case 10: this._cin10(ctx,W,H,t,tr,w); break;
      case 11: this._cin11(ctx,W,H,t,tr,w); break;
      case 12: this._cin12(ctx,W,H,t,tr,w); break;
      case 13: this._cin13(ctx,W,H,t,tr,w); break;
      case 14: this._cin14(ctx,W,H,t,tr,w); break;
      default: this._cin0(ctx,W,H,t,tr,w);
    }
    ctx.restore();
  }

  // ── 0 — NEON SPACE (4.5 s) ──────────────────────────────
  // Stars appear one by one → neon grid powers on → planet zooms in → title flickers
  _cin0(ctx,W,H,t,tr,w){
    ctx.fillStyle='#000004';ctx.fillRect(0,0,W,H);
    // Stars appear progressively
    const nS=Math.floor(this._p(t,0,0.9)*80);
    for(let i=0;i<80;i++){
      if(i>=nS)continue;
      ctx.fillStyle=`rgba(255,255,255,${0.6+0.4*Math.sin(t*4+i)})`;
      ctx.beginPath();ctx.arc(this._r(i*3)*W,this._r(i*3+1)*H,this._r(i*3+2)*2+0.5,0,Math.PI*2);ctx.fill();
    }
    // Neon grid powers on line by line
    const gP=this._p(t,0.9,2.2),gs=58;
    const nG=Math.floor(gP*Math.ceil(Math.max(W,H)/gs));
    ctx.strokeStyle=`rgba(0,245,255,${0.12+gP*0.08})`;ctx.lineWidth=1;
    for(let i=0;i<nG;i++){
      if(i===nG-1){ctx.strokeStyle=`rgba(0,245,255,${0.6+0.4*Math.sin(t*20)})`;}
      ctx.beginPath();ctx.moveTo(i*gs,0);ctx.lineTo(i*gs,H);ctx.stroke();
      ctx.beginPath();ctx.moveTo(0,i*gs);ctx.lineTo(W,i*gs);ctx.stroke();
      if(i===nG-1)ctx.strokeStyle=`rgba(0,245,255,${0.12+gP*0.08})`;
    }
    // Planet zooms in
    const pP=this._eio(this._p(t,2.0,3.0));
    if(pP>0){
      const px=W*0.72,py=H*0.28,pr=42*pP;
      ctx.save();ctx.globalAlpha=pP;
      const pg=ctx.createRadialGradient(px-12,py-12,0,px,py,pr);
      pg.addColorStop(0,'#6020c0');pg.addColorStop(1,'#100030');
      ctx.beginPath();ctx.arc(px,py,pr,0,Math.PI*2);ctx.fillStyle=pg;ctx.fill();
      ctx.strokeStyle='rgba(0,245,255,0.5)';ctx.lineWidth=2;
      ctx.beginPath();ctx.ellipse(px,py,pr*1.55,pr*0.28,-0.3,0,Math.PI*2);ctx.stroke();
      ctx.restore();
    }
    // Title flickers in
    const flicker=(t>3.0&&t<3.25)?(Math.sin(t*80)>0?1:0):1;
    this._cinTitle(ctx,W,H,tr,this._p(t,3.0,3.6)*(1-this._p(t,4.1,4.5))*flicker,{color:'#e0ffff',glow:'#00f5ff'});
    this._cinVoice(ctx,W,H,'Welcome... to Neon Space.',this._p(t,3.4,4.0)*(1-this._p(t,4.1,4.5)));
    this._cinOverlay(ctx,W,H,'#000',this._p(t,4.1,4.5));
  }

  // ── 1 — INFERNO VOLCANO (5.0 s) ─────────────────────────
  // Earthquake shaking → ground cracks → lava eruption → smoke → title in fire
  _cin1(ctx,W,H,t,tr,w){
    const shk=this._p(t,0,1.2);
    const sx=shk?(this._r(Math.floor(t*30))-.5)*16*shk:0,sy=shk?(this._r(Math.floor(t*30)+1)-.5)*10*shk:0;
    ctx.save();ctx.translate(sx,sy);
    ctx.fillStyle='#0a0000';ctx.fillRect(-20,-20,W+40,H+40);
    // Ground fissures
    const crP=this._p(t,0.4,1.5);
    if(crP>0){
      for(let i=0;i<6;i++){
        const bx=W*(i+0.3)/6+(this._r(i*5)-.5)*40;
        const crH=crP*H*(0.3+this._r(i*5+1)*0.4);
        const grad=ctx.createLinearGradient(bx,H,bx,H-crH);
        grad.addColorStop(0,`rgba(255,60,0,${crP})`);grad.addColorStop(0.4,`rgba(255,160,0,${crP*.7})`);grad.addColorStop(1,'rgba(0,0,0,0)');
        ctx.strokeStyle=grad;ctx.lineWidth=3+this._r(i*7)*4;
        ctx.beginPath();ctx.moveTo(bx,H);
        let cy=H;
        for(let s=0;s<8;s++){cy-=crH/8;ctx.lineTo(bx+(this._r(i*11+s)-.5)*30,cy);}
        ctx.stroke();
      }
    }
    // Lava fountains
    const lavP=this._p(t,1.2,2.8);
    if(lavP>0){
      for(let i=0;i<8;i++){
        const bx=W*(i+0.5)/8+(this._r(i*3)-.5)*30;
        const ht=lavP*H*(0.5+this._r(i*3+1)*0.4)*Math.sin(lavP*Math.PI);
        for(let d=0;d<12;d++){
          const dp=(t*2+d/12+i*0.37)%1;
          const dx=bx+(this._r(i*20+d)-.5)*80*dp;
          const dy=H-ht*dp*(1-dp*0.5);
          ctx.fillStyle=`hsl(${20+this._r(i*20+d+2)*30},100%,${50+dp*20}%)`;
          ctx.beginPath();ctx.arc(dx,dy,(3+this._r(i*20+d+1)*4)*(1-dp*.3),0,Math.PI*2);ctx.fill();
        }
      }
      const lg=ctx.createLinearGradient(0,H-40,0,H);
      lg.addColorStop(0,`rgba(255,100,0,${lavP*.8})`);lg.addColorStop(1,`rgba(200,30,0,${lavP*.8})`);
      ctx.fillStyle=lg;ctx.fillRect(0,H-40,W,40);
    }
    // Smoke
    const smokeP=this._p(t,2.0,3.5);
    if(smokeP>0){
      for(let i=0;i<12;i++){
        const smx=this._r(i*7)*W,smy=H-smokeP*(H+150)*(0.3+this._r(i*7+1)*0.7);
        const sr=60+this._r(i*7+2)*100;
        const sg=ctx.createRadialGradient(smx,smy,0,smx,smy,sr*smokeP);
        sg.addColorStop(0,`rgba(40,20,10,${smokeP*.35})`);sg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=sg;ctx.beginPath();ctx.arc(smx,smy,sr*smokeP,0,Math.PI*2);ctx.fill();
      }
    }
    ctx.restore();
    this._cinTitle(ctx,W,H,tr,this._p(t,3.2,3.9)*(1-this._p(t,4.5,5.0)),{color:'#ff8800',glow:'#ff4400'});
    this._cinVoice(ctx,W,H,'Welcome to the Volcano Realm.',this._p(t,3.7,4.3)*(1-this._p(t,4.5,5.0)));
    this._cinOverlay(ctx,W,H,'#000',this._p(t,4.5,5.0));
  }

  // ── 2 — SERPENT TEMPLE (5.5 s) ──────────────────────────
  // Darkness → two giant snake eyes open slowly → temple silhouette → eyes part → title
  _cin2(ctx,W,H,t,tr,w){
    ctx.fillStyle='#000200';ctx.fillRect(0,0,W,H);
    const eyeP=this._eio(this._p(t,0.8,2.0));
    const eyeY=H/2,eyeR=55*eyeP;
    [-1,1].forEach(side=>{
      const ex=W/2+side*(80+eyeR*0.4);
      const eg=ctx.createRadialGradient(ex,eyeY,0,ex,eyeY,eyeR+2);
      eg.addColorStop(0,`rgba(255,220,0,${eyeP})`);eg.addColorStop(0.7,`rgba(180,140,0,${eyeP*.8})`);eg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.beginPath();ctx.ellipse(ex,eyeY,eyeR,eyeR*.6,0,0,Math.PI*2);ctx.fillStyle=eg;ctx.fill();
      ctx.fillStyle=`rgba(0,0,0,${eyeP})`;
      ctx.beginPath();ctx.ellipse(ex,eyeY,eyeR*.12,eyeR*.55,0,0,Math.PI*2);ctx.fill();
      ctx.shadowColor='#80ff00';ctx.shadowBlur=30*eyeP;
      ctx.strokeStyle=`rgba(100,255,0,${eyeP*.5})`;ctx.lineWidth=2;
      ctx.beginPath();ctx.ellipse(ex,eyeY,eyeR,eyeR*.6,0,0,Math.PI*2);ctx.stroke();
      ctx.shadowBlur=0;
    });
    // Temple columns
    const tempP=this._p(t,2.0,3.5);
    if(tempP>0){
      ctx.save();ctx.globalAlpha=tempP*0.7;ctx.fillStyle='#1a0a00';
      for(let i=0;i<6;i++){
        const cx2=W*(i+0.5)/6,cw=22,ch=H*0.55;
        ctx.fillRect(cx2-cw/2,H-ch,cw,ch);ctx.fillRect(cx2-cw*.7,H-ch,cw*1.4,12);
      }
      ctx.fillRect(W*.05,H*.44,W*.9,18);
      ctx.beginPath();ctx.moveTo(W*.05,H*.44);ctx.lineTo(W/2,H*.22);ctx.lineTo(W*.95,H*.44);ctx.closePath();ctx.fill();
      ctx.restore();
    }
    // Eyes part
    if(eyeP>0.5){
      const partP=this._eio(this._p(t,3.2,4.2));
      [-1,1].forEach(side=>{
        const ex=W/2+side*(80+eyeR*.4+partP*W*.45);
        const eg=ctx.createRadialGradient(ex,eyeY,0,ex,eyeY,eyeR);
        eg.addColorStop(0,`rgba(255,220,0,${(1-partP)*.8})`);eg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.beginPath();ctx.ellipse(ex,eyeY,eyeR,eyeR*.6,0,0,Math.PI*2);ctx.fillStyle=eg;ctx.fill();
      });
    }
    this._cinTitle(ctx,W,H,tr,this._p(t,3.5,4.1)*(1-this._p(t,5.0,5.5)),{color:'#80ff60',glow:'#40cc00'});
    this._cinVoice(ctx,W,H,'Welcome... to the Serpent Temple.',this._p(t,3.9,4.6)*(1-this._p(t,5.0,5.5)));
    this._cinOverlay(ctx,W,H,'#000',this._p(t,5.0,5.5));
  }

  // ── 3 — FROZEN KINGDOM (4.5 s) ──────────────────────────
  // Blue wash → ice spikes grow from all edges → snowstorm → shatter → title
  _cin3(ctx,W,H,t,tr,w){
    ctx.fillStyle='#000814';ctx.fillRect(0,0,W,H);
    this._cinOverlay(ctx,W,H,`rgba(10,40,120,${this._p(t,0,0.5)*.6})`,1);
    // Ice spikes from 4 edges
    const icP=this._p(t,0.3,2.0);
    if(icP>0){
      for(let edge=0;edge<4;edge++){
        for(let i=0;i<8;i++){
          const frac=this._r(edge*50+i*3);
          const len=icP*(H*0.25+this._r(edge*50+i*3+1)*H*0.2);
          const wid=12+this._r(edge*50+i*3+2)*20;
          let x0,y0,dx,dy;
          if(edge===0){x0=frac*W;y0=0;dx=0;dy=1;}
          else if(edge===1){x0=frac*W;y0=H;dx=0;dy=-1;}
          else if(edge===2){x0=0;y0=frac*H;dx=1;dy=0;}
          else{x0=W;y0=frac*H;dx=-1;dy=0;}
          ctx.fillStyle=`rgba(160,220,255,${icP*.7})`;
          ctx.shadowColor='#80d0ff';ctx.shadowBlur=12;
          ctx.beginPath();
          ctx.moveTo(x0-wid/2*(1-Math.abs(dx)),y0-wid/2*(1-Math.abs(dy)));
          ctx.lineTo(x0+dx*len,y0+dy*len);
          ctx.lineTo(x0+wid/2*(1-Math.abs(dx)),y0+wid/2*(1-Math.abs(dy)));
          ctx.closePath();ctx.fill();ctx.shadowBlur=0;
        }
      }
    }
    // Snowstorm
    const snowP=this._p(t,1.2,3.0);
    if(snowP>0){
      for(let i=0;i<60;i++){
        const sx=(this._r(i*4)*W+t*80*(0.5+this._r(i*4+1)))%W;
        const sy=(this._r(i*4+2)*H+t*120*(0.5+this._r(i*4+3)*.5))%H;
        ctx.fillStyle=`rgba(220,240,255,${snowP*.7})`;
        ctx.beginPath();ctx.arc(sx,sy,1.5+this._r(i*4+4),0,Math.PI*2);ctx.fill();
      }
    }
    // Shatter lines
    const shtP=this._p(t,2.8,3.5);
    if(shtP>0){
      for(let i=0;i<16;i++){
        const ang=(i/16)*Math.PI*2+this._r(i*3)*.4;
        const len=shtP*(W*.4+this._r(i*3+1)*W*.2);
        ctx.strokeStyle=`rgba(255,255,255,${shtP*(1-this._r(i*3+2)*.5)})`;ctx.lineWidth=2-shtP;
        ctx.beginPath();ctx.moveTo(W/2,H/2);
        ctx.lineTo(W/2+Math.cos(ang)*len,H/2+Math.sin(ang)*len);ctx.stroke();
      }
    }
    this._cinTitle(ctx,W,H,tr,this._p(t,3.2,3.8)*(1-this._p(t,4.0,4.5)),{color:'#c0eeff',glow:'#60b8ff'});
    this._cinVoice(ctx,W,H,'Welcome to the Frozen Kingdom.',this._p(t,3.5,4.0)*(1-this._p(t,4.0,4.5)));
    this._cinOverlay(ctx,W,H,'#001428',this._p(t,4.0,4.5));
  }

  // ── 4 — ELECTRIC CITY (4.0 s) ───────────────────────────
  // Static glitch → lightning bolts → city skyline lights up → RGB-split title
  _cin4(ctx,W,H,t,tr,w){
    ctx.fillStyle='#050008';ctx.fillRect(0,0,W,H);
    // Glitch scan lines
    const glP=this._p(t,0,0.6);
    if(glP>0){
      for(let i=0;i<H;i+=3){
        if(this._r(i+Math.floor(t*40))>0.5){
          const shift=(this._r(i*3+1)-.5)*30*glP;
          ctx.fillStyle=`rgba(0,255,255,${this._r(i*3+2)*.4*glP})`;
          ctx.fillRect(shift,i,W,2);
        }
      }
    }
    // City skyline
    const bldP=this._eio(this._p(t,0.8,2.0));
    if(bldP>0){
      const bH=[0.08,0.2,0.12,0.35,0.18,0.28,0.09,0.22,0.32,0.15,0.25,0.13,0.3];
      bH.forEach((bh,i)=>{
        const bx=i*(W/bH.length),bw=W/bH.length-2,bHpx=H*bh*bldP;
        ctx.fillStyle='#0a000f';ctx.fillRect(bx,H-bHpx,bw,bHpx);
        const winP=this._p(t,1.2,2.5);
        if(winP>0){
          for(let wy=H-bHpx+8;wy<H-8;wy+=10){
            for(let wx=bx+4;wx<bx+bw-4;wx+=8){
              if(this._r(i*100+wy+wx)<winP*.7){
                ctx.fillStyle=`rgba(255,200,60,${0.6+this._r(i*50+wy)*.4})`;ctx.fillRect(wx,wy,4,5);
              }
            }
          }
        }
      });
    }
    // Lightning bolts
    const ltP=this._p(t,0.4,1.5);
    if(ltP>0){
      const nB=Math.floor(ltP*5);
      for(let i=0;i<nB;i++){
        const fa=Math.max(0,1-(t-0.4-i*.18)*4);if(fa<=0)continue;
        ctx.save();ctx.globalAlpha=fa;ctx.strokeStyle='#fff';ctx.lineWidth=2;
        ctx.shadowColor='#00ffff';ctx.shadowBlur=20;
        const bx2=this._r(i*7)*W;ctx.beginPath();ctx.moveTo(bx2,0);
        let cy=0;while(cy<H){cy+=20+this._r(i*7+cy)*30;ctx.lineTo(bx2+(this._r(i*7+cy+1)-.5)*60,cy);}
        ctx.stroke();ctx.restore();
      }
    }
    // RGB-split glitch title
    const tA=this._p(t,2.5,3.0)*(1-this._p(t,3.5,4.0));
    if(tA>0){
      const gOff=t<3.0?(this._r(Math.floor(t*30))-.5)*10:0;
      const fs2=Math.min(54,W/Math.max(1,tr.name.length*0.62));
      ctx.save();ctx.textAlign='center';ctx.font=`900 ${fs2}px Orbitron,monospace`;
      ctx.globalAlpha=tA*.35;ctx.fillStyle='rgba(255,0,0,1)';ctx.fillText(tr.name,W/2+gOff,H/2+8);
      ctx.fillStyle='rgba(0,255,255,1)';ctx.fillText(tr.name,W/2-gOff,H/2+8);
      ctx.restore();
    }
    this._cinTitle(ctx,W,H,tr,tA,{color:'#ffffa0',glow:'#ffdd00'});
    this._cinVoice(ctx,W,H,'Welcome to Electric City.',this._p(t,2.9,3.5)*(1-this._p(t,3.5,4.0)));
    this._cinOverlay(ctx,W,H,'#000',this._p(t,3.5,4.0));
  }

  // ── 5 — OCEAN DEPTHS (5.0 s) ────────────────────────────
  // Water floods from top → bubbles rise → whale passes → caustics → title
  _cin5(ctx,W,H,t,tr,w){
    ctx.fillStyle='#000510';ctx.fillRect(0,0,W,H);
    // Water floods from top
    const waterY=this._eio(this._p(t,0,1.2))*H;
    if(waterY>0){
      const wg=ctx.createLinearGradient(0,0,0,waterY);
      wg.addColorStop(0,'rgba(0,30,80,0.95)');wg.addColorStop(1,'rgba(0,80,120,0.7)');
      ctx.fillStyle=wg;ctx.fillRect(0,0,W,waterY);
      // Surface ripple
      ctx.strokeStyle='rgba(100,200,255,0.4)';ctx.lineWidth=2;ctx.beginPath();
      for(let x=0;x<=W;x+=10){const ry=waterY+Math.sin(x*.05+t*3)*6;x===0?ctx.moveTo(x,ry):ctx.lineTo(x,ry);}
      ctx.stroke();
    }
    if(this._p(t,1.0,1.3)>0){
      const dg=ctx.createLinearGradient(0,0,0,H);
      dg.addColorStop(0,'rgba(0,20,60,0.9)');dg.addColorStop(1,'rgba(0,5,20,0.9)');
      ctx.fillStyle=dg;ctx.fillRect(0,0,W,H);
    }
    // Bubbles rising
    const bblP=this._p(t,0.8,4.5);
    if(bblP>0){
      for(let i=0;i<30;i++){
        const bx=this._r(i*5)*W;
        const by=H-((this._r(i*5+1)*H+t*(60+this._r(i*5+2)*80))%H);
        ctx.strokeStyle=`rgba(150,220,255,${bblP*.5})`;ctx.lineWidth=1;
        ctx.beginPath();ctx.arc(bx,by,3+this._r(i*5+3)*6,0,Math.PI*2);ctx.stroke();
      }
    }
    // Giant whale passes right to left
    const whaleP=this._p(t,1.5,4.0);
    if(whaleP>0&&whaleP<1){
      const wx=W*1.3-whaleP*W*1.8,wy=H*.42;
      ctx.save();ctx.globalAlpha=Math.min(1,Math.min(whaleP,1-whaleP)*4);
      ctx.fillStyle='#061830';
      ctx.beginPath();ctx.ellipse(wx,wy,140,40,-0.1,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.moveTo(wx-130,wy);ctx.lineTo(wx-170,wy-40);ctx.lineTo(wx-150,wy);ctx.lineTo(wx-170,wy+40);ctx.closePath();ctx.fill();
      ctx.fillStyle='rgba(255,255,255,0.4)';ctx.beginPath();ctx.arc(wx+100,wy-8,5,0,Math.PI*2);ctx.fill();
      ctx.restore();
    }
    // Caustic light shafts
    const causP=this._p(t,1.5,4.5);
    if(causP>0){
      for(let i=0;i<8;i++){
        const lcx=W*(i+.5)/8+Math.sin(t+i)*20;
        const lg=ctx.createLinearGradient(lcx,0,lcx+20,H*.6);
        lg.addColorStop(0,`rgba(100,200,255,${causP*.1})`);lg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=lg;ctx.fillRect(lcx,0,20,H*.6);
      }
    }
    this._cinTitle(ctx,W,H,tr,this._p(t,3.8,4.4)*(1-this._p(t,4.5,5.0)),{color:'#80eeff',glow:'#00aacc'});
    this._cinVoice(ctx,W,H,'Welcome to the Ocean Depths.',this._p(t,4.1,4.6)*(1-this._p(t,4.5,5.0)));
    this._cinOverlay(ctx,W,H,'#000',this._p(t,4.5,5.0));
  }

  // ── 6 — ENCHANTED FOREST (4.5 s) ────────────────────────
  // Leaves fall → trees grow from below → fireflies glow → sparkle burst → title
  _cin6(ctx,W,H,t,tr,w){
    ctx.fillStyle='#010a01';ctx.fillRect(0,0,W,H);
    // Falling leaves
    for(let i=0;i<40;i++){
      const lx=(this._r(i*4)*W+Math.sin(t*1.5+i)*30)%W;
      const ly=((this._r(i*4+1)*H+t*(30+this._r(i*4+2)*40))%H)*this._p(t,0,4.0);
      ctx.save();ctx.globalAlpha=this._p(t,0,4.0)*.7*(0.5+.5*Math.sin(t+i));
      ctx.translate(lx,ly);ctx.rotate(t*1.5+i*1.1);
      ctx.fillStyle=`hsl(${80+this._r(i*4+3)*60},80%,35%)`;
      ctx.beginPath();ctx.ellipse(0,0,7,4,0,0,Math.PI*2);ctx.fill();ctx.restore();
    }
    // Trees growing from bottom
    const treeP=this._eio(this._p(t,0.5,2.0));
    if(treeP>0){
      for(let i=0;i<5;i++){
        const tx=W*(i+.5)/5+(this._r(i*9)-.5)*60;
        const tH=treeP*H*(0.35+this._r(i*9+1)*.25),tw=16+this._r(i*9+2)*12;
        ctx.fillStyle='#1a0d00';ctx.fillRect(tx-tw/2,H-tH,tw,tH);
        for(let layer=0;layer<3;layer++){
          const cr=(60+this._r(i*9+layer+3)*40)*treeP,cy2=H-tH-layer*cr*.6;
          const cg2=ctx.createRadialGradient(tx,cy2,0,tx,cy2,cr);
          cg2.addColorStop(0,'rgba(20,90,10,0.9)');cg2.addColorStop(1,'rgba(5,40,0,0)');
          ctx.fillStyle=cg2;ctx.beginPath();ctx.arc(tx,cy2,cr,0,Math.PI*2);ctx.fill();
        }
      }
    }
    // Fireflies
    const ffP=this._p(t,1.8,4.0);
    if(ffP>0){
      for(let i=0;i<25;i++){
        const ffx=this._r(i*6)*W+Math.sin(t*.7+i*2.1)*40;
        const ffy=this._r(i*6+1)*H*.7+Math.sin(t*1.1+i*1.7)*25;
        const pulse=(Math.sin(t*3+i*2.3)+1)/2,fa=ffP*pulse*.8;
        const fg=ctx.createRadialGradient(ffx,ffy,0,ffx,ffy,12*pulse);
        fg.addColorStop(0,`rgba(255,255,100,${fa})`);fg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=fg;ctx.beginPath();ctx.arc(ffx,ffy,12*pulse,0,Math.PI*2);ctx.fill();
        ctx.fillStyle=`rgba(255,255,200,${fa})`;ctx.beginPath();ctx.arc(ffx,ffy,2,0,Math.PI*2);ctx.fill();
      }
    }
    // Sparkle burst
    const spkP=this._p(t,2.5,3.2);
    if(spkP>0){
      for(let i=0;i<20;i++){
        const ang=(i/20)*Math.PI*2+t;
        const len=spkP*(W*.3+this._r(i*4)*W*.1)*Math.sin(spkP*Math.PI);
        ctx.strokeStyle=`hsla(${80+this._r(i*4+1)*60},100%,70%,${spkP*.7})`;ctx.lineWidth=2;
        ctx.beginPath();ctx.moveTo(W/2,H/2);ctx.lineTo(W/2+Math.cos(ang)*len,H/2+Math.sin(ang)*len);ctx.stroke();
      }
    }
    this._cinTitle(ctx,W,H,tr,this._p(t,3.0,3.6)*(1-this._p(t,4.0,4.5)),{color:'#a0ff80',glow:'#40cc00'});
    this._cinVoice(ctx,W,H,'Welcome to the Enchanted Forest.',this._p(t,3.3,3.9)*(1-this._p(t,4.0,4.5)));
    this._cinOverlay(ctx,W,H,'#010a01',this._p(t,4.0,4.5));
  }

  // ── 7 — DESERT KINGDOM (4.5 s) ──────────────────────────
  // Sandstorm sweeps in from left → ancient ruins emerge → sand settles → carved title
  _cin7(ctx,W,H,t,tr,w){
    ctx.fillStyle='#100800';ctx.fillRect(0,0,W,H);
    const skyG=ctx.createLinearGradient(0,0,0,H*.6);
    skyG.addColorStop(0,'rgba(60,30,5,0.8)');skyG.addColorStop(1,'rgba(150,80,20,0.4)');
    ctx.fillStyle=skyG;ctx.fillRect(0,0,W,H*.6);
    // Ruins emerge
    const ruinP=this._eio(this._p(t,1.5,3.0));
    if(ruinP>0){
      ctx.save();ctx.globalAlpha=ruinP;ctx.fillStyle='#1a0e00';
      ctx.beginPath();ctx.moveTo(W*.5,H*.25);ctx.lineTo(W*.2,H*.7);ctx.lineTo(W*.8,H*.7);ctx.closePath();ctx.fill();
      [0.1,0.15,0.85,0.9].forEach(fx=>{
        ctx.fillRect(fx*W-8,H*.45,16,H*.25);ctx.fillRect(fx*W-14,H*.44,28,12);
      });
      ctx.beginPath();ctx.arc(W/2,H*.6,28,Math.PI,0);ctx.rect(W/2-28,H*.6,56,40);ctx.fill();
      ctx.fillStyle='#050200';
      ctx.beginPath();ctx.arc(W/2,H*.6,22,Math.PI,0);ctx.rect(W/2-22,H*.6,44,35);ctx.fill();
      ctx.restore();
    }
    // Sandstorm particles sweeping from left
    const sandDensity=this._p(t,0,2.5)*(1-this._p(t,2.0,3.5));
    if(sandDensity>0){
      for(let i=0;i<80;i++){
        const speed=180+this._r(i*3)*200;
        const sx=(this._r(i*3+1)*W+t*speed)%(W+60)-30;
        const sy=this._r(i*3+2)*H;
        ctx.strokeStyle=`hsla(${30+this._r(i*3+5)*20},70%,60%,${sandDensity*(0.3+this._r(i*3+3)*.5)})`;
        ctx.lineWidth=1+this._r(i*3+6);
        ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+10+this._r(i*3+4)*30,sy+(this._r(i*3+7)-.5)*4);ctx.stroke();
      }
    }
    this._cinTitle(ctx,W,H,tr,this._p(t,3.2,3.8)*(1-this._p(t,4.0,4.5)),{color:'#d4a060',glow:'#ff8800'});
    this._cinVoice(ctx,W,H,'Welcome to the Desert Kingdom.',this._p(t,3.5,4.0)*(1-this._p(t,4.0,4.5)));
    this._cinOverlay(ctx,W,H,'#100800',this._p(t,4.0,4.5));
  }

  // ── 8 — HAUNTED MANSION (5.5 s) ─────────────────────────
  // Lightning flash → thunder shake → 3 ghosts fly through → mansion materializes → title flickers
  _cin8(ctx,W,H,t,tr,w){
    const flashA=Math.max(0,1-t*5);
    if(flashA>0){ctx.fillStyle=`rgba(255,255,255,${flashA})`;ctx.fillRect(0,0,W,H);return;}
    const shk=Math.max(0,1-(t-.2)*2);
    const sx=shk?(this._r(Math.floor(t*40))-.5)*20*shk:0,sy=shk?(this._r(Math.floor(t*40)+1)-.5)*14*shk:0;
    ctx.save();ctx.translate(sx,sy);
    ctx.fillStyle='#000000';ctx.fillRect(-20,-20,W+40,H+40);
    // Mansion
    const mansP=this._eio(this._p(t,1.5,3.5));
    if(mansP>0){
      ctx.save();ctx.globalAlpha=mansP;ctx.fillStyle='#070003';
      ctx.fillRect(W*.25,H*.35,W*.5,H*.45);
      ctx.fillRect(W*.25,H*.2,W*.1,H*.2);ctx.fillRect(W*.65,H*.18,W*.1,H*.22);
      ctx.beginPath();ctx.moveTo(W*.25,H*.2);ctx.lineTo(W*.3,H*.1);ctx.lineTo(W*.35,H*.2);ctx.fill();
      ctx.beginPath();ctx.moveTo(W*.65,H*.18);ctx.lineTo(W*.7,H*.07);ctx.lineTo(W*.75,H*.18);ctx.fill();
      const winAlpha=this._p(t,2.0,3.5)*mansP;
      [[0.33,0.45],[0.45,0.45],[0.57,0.45],[0.39,0.58],[0.51,0.58]].forEach(([wx,wy])=>{
        ctx.fillStyle=`rgba(255,140,0,${winAlpha*(0.6+0.4*Math.sin(t*3+wx*10))})`;
        ctx.fillRect(wx*W-6,wy*H-8,12,16);
      });
      ctx.fillStyle=`rgba(60,20,0,${mansP})`;
      ctx.beginPath();ctx.arc(W*.5,H*.72,16,Math.PI,0);ctx.rect(W*.5-16,H*.72,32,25);ctx.fill();
      ctx.restore();
    }
    // 3 Ghosts
    for(let i=0;i<3;i++){
      const gS=0.8+i*.6,gP=this._p(t,gS,gS+1.2);if(gP<=0||gP>=1)continue;
      const gx=i%2===0?-100+gP*(W+200):W+100-gP*(W+200),gy=H*(0.25+i*.2);
      ctx.save();ctx.globalAlpha=Math.min(gP,1-gP)*4*.7;
      const ghg=ctx.createRadialGradient(gx,gy,0,gx,gy,35);
      ghg.addColorStop(0,'rgba(220,220,255,0.9)');ghg.addColorStop(1,'rgba(180,180,255,0)');
      ctx.fillStyle=ghg;
      ctx.beginPath();ctx.arc(gx,gy-5,30,Math.PI,0);ctx.lineTo(gx+30,gy+20);
      for(let j=3;j>=0;j--)ctx.lineTo(gx+30-j*15-7,gy+20+(j%2===0?-8:8));
      ctx.lineTo(gx-30,gy+20);ctx.closePath();ctx.fill();
      ctx.fillStyle='rgba(0,0,50,0.8)';
      ctx.beginPath();ctx.ellipse(gx-10,gy-8,6,8,0,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(gx+10,gy-8,6,8,0,0,Math.PI*2);ctx.fill();
      ctx.restore();
    }
    // Second lightning flash
    if(t>3.8&&t<4.0){
      const f2=Math.max(0,1-(t-3.8)*8);
      ctx.fillStyle=`rgba(255,255,255,${f2*.6})`;ctx.fillRect(0,0,W,H);
    }
    ctx.restore();
    const flicker2=(t>4.0&&t<4.3)?(Math.sin(t*50)>0?1:0):1;
    this._cinTitle(ctx,W,H,tr,this._p(t,4.0,4.6)*(1-this._p(t,5.0,5.5))*flicker2,{color:'#cc80ff',glow:'#8800ff'});
    this._cinVoice(ctx,W,H,'Welcome... to the Haunted Mansion.',this._p(t,4.3,4.9)*(1-this._p(t,5.0,5.5)));
    this._cinOverlay(ctx,W,H,'#000',this._p(t,5.0,5.5));
  }

  // ── 9 — FUTURE LABORATORY (4.0 s) ───────────────────────
  // Scan line sweeps → wireframe grid → holographic panels → robots power on → HUD title
  _cin9(ctx,W,H,t,tr,w){
    ctx.fillStyle='#000508';ctx.fillRect(0,0,W,H);
    // Scan line
    const scanY=this._p(t,0,0.8)*H;
    ctx.fillStyle='rgba(0,255,200,0.15)';ctx.fillRect(0,scanY-4,W,8);
    ctx.strokeStyle='rgba(0,255,200,0.6)';ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(0,scanY);ctx.lineTo(W,scanY);ctx.stroke();
    for(let y=0;y<scanY;y+=4){
      if(this._r(y)>.7){ctx.fillStyle=`rgba(0,200,150,${this._r(y+1)*.08})`;ctx.fillRect(0,y,W,2);}
    }
    // Wireframe grid
    const wireP=this._p(t,0.6,1.8);
    if(wireP>0){
      ctx.strokeStyle=`rgba(0,255,180,${wireP*.15})`;ctx.lineWidth=1;
      for(let x=0;x<=W;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
      for(let y=0;y<=H;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    }
    // Holographic panels
    const holP=this._p(t,1.4,2.5);
    if(holP>0){
      [[0.05,0.15,0.25,0.6],[0.73,0.15,0.22,0.55]].forEach(([px,py,pw,ph])=>{
        ctx.save();ctx.globalAlpha=holP*.6;ctx.strokeStyle='#00ffcc';ctx.lineWidth=1.5;
        ctx.strokeRect(px*W,py*H,pw*W,ph*H);
        for(let i=0;i<6;i++){
          ctx.fillStyle=`rgba(0,255,200,${0.3+this._r(i*7+1)*.4})`;
          ctx.fillRect(px*W+pw*W*.1,(py*H+ph*H*.15)+i*ph*H*.12,this._r(i*7)*pw*W*.8*holP,6);
        }
        ctx.restore();
      });
    }
    // Robot silhouettes power on
    const robP=this._p(t,1.8,3.0);
    if(robP>0){
      [-0.22,0.22].forEach(side=>{
        const rx=W/2+side*W*.5,ry=H*.55;
        ctx.save();ctx.globalAlpha=robP*.7;ctx.fillStyle='#040a12';
        ctx.fillRect(rx-20,ry-40,40,35);ctx.fillRect(rx-25,ry-5,50,55);
        ctx.fillRect(rx-40,ry-5,14,45);ctx.fillRect(rx+26,ry-5,14,45);
        const eyeA=this._eio(robP);ctx.fillStyle=`rgba(0,255,200,${eyeA})`;
        ctx.fillRect(rx-12,ry-30,8,8);ctx.fillRect(rx+4,ry-30,8,8);
        ctx.restore();
      });
    }
    // HUD corners
    const tA=this._p(t,2.8,3.3)*(1-this._p(t,3.5,4.0));
    if(tA>0){
      ctx.save();ctx.globalAlpha=tA*.6;ctx.strokeStyle='#00ffcc';ctx.lineWidth=2;
      [[W/2-160,H/2-60,20,0,0,20],[W/2+160,H/2-60,-20,0,0,20],
       [W/2-160,H/2+55,20,0,0,-20],[W/2+160,H/2+55,-20,0,0,-20]].forEach(([cx2,cy2,dx2,dy2,ex2,ey2])=>{
        ctx.beginPath();ctx.moveTo(cx2,cy2);ctx.lineTo(cx2+dx2,cy2+dy2);ctx.moveTo(cx2,cy2);ctx.lineTo(cx2+ex2,cy2+ey2);ctx.stroke();
      });
      ctx.restore();
    }
    this._cinTitle(ctx,W,H,tr,tA,{color:'#80ffee',glow:'#00ffcc'});
    this._cinVoice(ctx,W,H,'Welcome to the Future Laboratory.',this._p(t,3.1,3.6)*(1-this._p(t,3.5,4.0)));
    this._cinOverlay(ctx,W,H,'#000',this._p(t,3.5,4.0));
  }

  // ── 10 — SKY KINGDOM (4.5 s) ────────────────────────────
  // Clouds rush in → sunburst breaks through → floating islands rise → birds → golden title
  _cin10(ctx,W,H,t,tr,w){
    ctx.fillStyle='#040010';ctx.fillRect(0,0,W,H);
    // Blue sky
    const skyA=this._p(t,0.5,1.5);
    if(skyA>0){
      const sg=ctx.createLinearGradient(0,0,0,H);
      sg.addColorStop(0,`rgba(30,120,220,${skyA})`);sg.addColorStop(1,`rgba(100,180,255,${skyA*.5})`);
      ctx.fillStyle=sg;ctx.fillRect(0,0,W,H);
    }
    // Sunburst
    const sunP=this._eio(this._p(t,0.8,2.0));
    if(sunP>0){
      const sg2=ctx.createRadialGradient(W/2,H*.3,0,W/2,H*.3,W*.6);
      sg2.addColorStop(0,`rgba(255,255,200,${sunP*.9})`);sg2.addColorStop(0.2,`rgba(255,220,50,${sunP*.4})`);sg2.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg2;ctx.fillRect(0,0,W,H);
      for(let i=0;i<16;i++){
        const ang2=(i/16)*Math.PI*2;
        ctx.save();ctx.globalAlpha=sunP*.15;ctx.strokeStyle='#ffffa0';ctx.lineWidth=8+this._r(i*3+1)*15;
        ctx.beginPath();ctx.moveTo(W/2,H*.3);
        ctx.lineTo(W/2+Math.cos(ang2)*W*(0.3+this._r(i*3)*.3)*sunP,H*.3+Math.sin(ang2)*H*(0.3+this._r(i*3)*.2)*sunP);
        ctx.stroke();ctx.restore();
      }
    }
    // Clouds rush in from both sides
    const cloudP=this._p(t,0,1.5);
    if(cloudP>0){
      for(let i=0;i<8;i++){
        const cx2=i%2===0?-200+cloudP*(this._r(i*5)*W*.4+50):W+200-cloudP*(this._r(i*5)*W*.4+50);
        const cy2=this._r(i*5+1)*H*.6,cr2=60+this._r(i*5+2)*80;
        const cg2=ctx.createRadialGradient(cx2,cy2,0,cx2,cy2,cr2);
        cg2.addColorStop(0,'rgba(255,255,255,0.9)');cg2.addColorStop(1,'rgba(200,220,255,0)');
        ctx.fillStyle=cg2;ctx.beginPath();ctx.arc(cx2,cy2,cr2,0,Math.PI*2);ctx.fill();
      }
    }
    // Floating islands rise
    const islandP=this._eio(this._p(t,2.0,3.2));
    if(islandP>0){
      [[W*.2,H*.65],[W*.5,H*.55],[W*.8,H*.7]].forEach(([ix,iy],i)=>{
        const iy2=iy+(1-islandP)*H*.4;
        ctx.save();ctx.globalAlpha=islandP;ctx.fillStyle='#2a5020';
        ctx.beginPath();ctx.ellipse(ix,iy2,60+i*20,18,0,0,Math.PI*2);ctx.fill();
        ctx.fillStyle='#1a3010';
        ctx.beginPath();ctx.ellipse(ix,iy2+5,60+i*20,12,0,Math.PI,false);ctx.fill();
        ctx.restore();
      });
    }
    // Birds (V shapes)
    const birdP=this._p(t,2.5,4.5);
    if(birdP>0){
      for(let i=0;i<8;i++){
        const bx2=(this._r(i*5)*W+t*80)%W,by=H*(0.15+this._r(i*5+1)*.35);
        ctx.save();ctx.globalAlpha=birdP*.7;ctx.strokeStyle='#1a3060';ctx.lineWidth=1.5;
        ctx.beginPath();ctx.moveTo(bx2-8,by);ctx.lineTo(bx2,by-4);ctx.lineTo(bx2+8,by);ctx.stroke();
        ctx.restore();
      }
    }
    this._cinTitle(ctx,W,H,tr,this._p(t,3.2,3.8)*(1-this._p(t,4.0,4.5)),{color:'#ffd700',glow:'#ffaa00'});
    this._cinVoice(ctx,W,H,'Welcome to the Sky Kingdom.',this._p(t,3.5,4.0)*(1-this._p(t,4.0,4.5)));
    this._cinOverlay(ctx,W,H,'#001',this._p(t,4.0,4.5));
  }

  // ── 11 — CRYSTAL CAVE (4.5 s) ───────────────────────────
  // Single crystal glows → spikes radiate from center → rainbow light → wall crystals → prismatic title
  _cin11(ctx,W,H,t,tr,w){
    ctx.fillStyle='#000208';ctx.fillRect(0,0,W,H);
    const cols=['#cc44ff','#00ccff','#ff44cc','#4444ff','#44ffcc'];
    // Seed crystal glows
    const seedP=this._p(t,0,0.5);
    if(seedP>0){
      const sg3=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,40*seedP);
      sg3.addColorStop(0,`rgba(200,100,255,${seedP})`);sg3.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=sg3;ctx.beginPath();ctx.arc(W/2,H/2,40*seedP,0,Math.PI*2);ctx.fill();
    }
    // Crystals grow radially
    const crysP=this._p(t,0.3,2.2);
    if(crysP>0){
      const nC=Math.floor(crysP*24);
      for(let i=0;i<nC;i++){
        const ang3=(i/24)*Math.PI*2+this._r(i*5)*.2;
        const len2=crysP*(W*.3+this._r(i*5+1)*W*.2);
        const wid=8+this._r(i*5+2)*12;
        const col=cols[i%cols.length];
        ctx.save();ctx.globalAlpha=.7;ctx.fillStyle=col;ctx.shadowColor=col;ctx.shadowBlur=15;
        ctx.beginPath();
        ctx.moveTo(W/2+Math.cos(ang3-.15)*wid,H/2+Math.sin(ang3-.15)*wid);
        ctx.lineTo(W/2+Math.cos(ang3)*len2,H/2+Math.sin(ang3)*len2);
        ctx.lineTo(W/2+Math.cos(ang3+.15)*wid,H/2+Math.sin(ang3+.15)*wid);
        ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.restore();
      }
    }
    // Rainbow light
    const rainP=this._p(t,1.8,3.2);
    if(rainP>0){
      for(let i=0;i<8;i++){
        const ang4=(i/8)*Math.PI*2+Math.PI*.15;
        const rg=ctx.createLinearGradient(W/2,H/2,W/2+Math.cos(ang4)*W,H/2+Math.sin(ang4)*H);
        rg.addColorStop(0,`hsla(${(i/8)*360},100%,60%,${rainP*.4})`);rg.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=rg;ctx.fillRect(0,0,W,H);
      }
    }
    // Wall crystals top+bottom
    const wallP=this._p(t,1.5,3.0);
    if(wallP>0){
      for(let i=0;i<10;i++){
        const wx=this._r(i*6)*W,col=cols[i%cols.length];
        const wh=wallP*(30+this._r(i*6+1)*40);
        ctx.save();ctx.globalAlpha=.6*wallP;ctx.fillStyle=col;ctx.shadowColor=col;ctx.shadowBlur=10;
        ctx.beginPath();ctx.moveTo(wx-10,0);ctx.lineTo(wx+10,0);ctx.lineTo(wx+5,wh);ctx.lineTo(wx,wh+10);ctx.lineTo(wx-5,wh);ctx.closePath();ctx.fill();
        ctx.beginPath();ctx.moveTo(wx-10,H);ctx.lineTo(wx+10,H);ctx.lineTo(wx+5,H-wh);ctx.lineTo(wx,H-wh-10);ctx.lineTo(wx-5,H-wh);ctx.closePath();ctx.fill();
        ctx.shadowBlur=0;ctx.restore();
      }
    }
    this._cinTitle(ctx,W,H,tr,this._p(t,3.2,3.8)*(1-this._p(t,4.0,4.5)),{color:'#ee88ff',glow:'#cc44ff'});
    this._cinVoice(ctx,W,H,'Welcome to the Crystal Cave.',this._p(t,3.5,4.0)*(1-this._p(t,4.0,4.5)));
    this._cinOverlay(ctx,W,H,'#000',this._p(t,4.0,4.5));
  }

  // ── 12 — SAKURA GARDEN (4.5 s) ──────────────────────────
  // First petal falls → petals flood → wind sweep → sakura tree blooms → calligraphic title
  _cin12(ctx,W,H,t,tr,w){
    ctx.fillStyle='#0a0208';ctx.fillRect(0,0,W,H);
    const dawnA=this._p(t,0,1.5);
    if(dawnA>0){
      const dg=ctx.createLinearGradient(0,0,0,H);
      dg.addColorStop(0,`rgba(80,20,40,${dawnA*.6})`);dg.addColorStop(1,`rgba(20,5,15,${dawnA*.8})`);
      ctx.fillStyle=dg;ctx.fillRect(0,0,W,H);
    }
    // Sakura tree grows
    const sakP=this._eio(this._p(t,1.0,2.8));
    if(sakP>0){
      ctx.fillStyle='#2a1008';
      ctx.fillRect(W/2-8,H*.35+(1-sakP)*H*.5,16,H*.5*sakP+H*.15);
      [[-0.6,-1],[0.6,-1],[-1,-0.3],[1,-0.3]].forEach(([bdx,bdy])=>{
        ctx.beginPath();ctx.moveTo(W/2,H*.5-H*.1*sakP);
        ctx.lineTo(W/2+bdx*70*sakP,H*.5-H*.1*sakP+bdy*60*sakP);
        ctx.strokeStyle='#2a1008';ctx.lineWidth=4;ctx.stroke();
      });
      for(let i=0;i<30;i++){
        const bx=W/2+(this._r(i*4)-.5)*200*sakP,by=H*.3+(this._r(i*4+1)-.5)*160*sakP;
        const br2=(12+this._r(i*4+2)*20)*sakP;
        const bc=['rgba(255,182,193,','rgba(255,150,170,','rgba(255,200,210,'][i%3];
        const bg=ctx.createRadialGradient(bx,by,0,bx,by,br2);
        bg.addColorStop(0,bc+'0.8)');bg.addColorStop(1,bc+'0)');
        ctx.fillStyle=bg;ctx.beginPath();ctx.arc(bx,by,br2,0,Math.PI*2);ctx.fill();
      }
    }
    // Petals with wind sweep
    const petalP=this._p(t,0.3,4.5);
    for(let i=0;i<50;i++){
      const windOff=Math.sin(t*1.2+i)*(this._p(t,1.5,2.8)>0?100:20);
      const px=(this._r(i*5)*W+t*(15+this._r(i*5+1)*25)+windOff+i*30)%W;
      const py=(this._r(i*5+2)*H+t*(30+this._r(i*5+3)*40))%H;
      ctx.save();ctx.globalAlpha=petalP*(0.5+.5*this._r(i*5+4));
      ctx.translate(px,py);ctx.rotate(t*2+i);
      ctx.fillStyle=`rgba(255,${150+Math.floor(this._r(i*5+5)*50)},${170+Math.floor(this._r(i*5+6)*40)},0.8)`;
      ctx.beginPath();ctx.ellipse(0,0,6,3,0,0,Math.PI*2);ctx.fill();ctx.restore();
    }
    this._cinTitle(ctx,W,H,tr,this._p(t,3.2,3.8)*(1-this._p(t,4.0,4.5)),{color:'#ffb0c8',glow:'#ff6090'});
    this._cinVoice(ctx,W,H,'Welcome to the Sakura Garden.',this._p(t,3.5,4.0)*(1-this._p(t,4.0,4.5)));
    this._cinOverlay(ctx,W,H,'#000',this._p(t,4.0,4.5));
  }

  // ── 13 — SHADOW DIMENSION (5.5 s) ───────────────────────
  // Reality cracks → void shows through → portals open → energy arcs → corrupted glitch title
  _cin13(ctx,W,H,t,tr,w){
    ctx.fillStyle='#050005';ctx.fillRect(0,0,W,H);
    // Reality cracks
    const crackP=this._p(t,0.1,1.2);
    if(crackP>0){
      for(let i=0;i<12;i++){
        const sx2=this._r(i*6)*W,sy2=this._r(i*6+1)*H;
        const len3=crackP*(50+this._r(i*6+2)*120);
        ctx.strokeStyle=`rgba(${200+i*4},${80-i*5},255,${crackP*.8})`;ctx.lineWidth=1.5;
        ctx.shadowColor='#aa00ff';ctx.shadowBlur=8;
        ctx.beginPath();ctx.moveTo(sx2,sy2);
        let cx4=sx2,cy4=sy2;
        for(let s2=0;s2<6;s2++){cx4+=(this._r(i*30+s2)-.5)*len3/3;cy4+=(this._r(i*30+s2+1)-.5)*len3/3;ctx.lineTo(cx4,cy4);}
        ctx.stroke();ctx.shadowBlur=0;
      }
    }
    // Void overlay
    const voidP=this._p(t,0.8,2.0);
    if(voidP>0){ctx.fillStyle=`rgba(0,0,0,${voidP*.7})`;ctx.fillRect(0,0,W,H);}
    // Portals
    const portalP=this._p(t,1.5,3.0);
    if(portalP>0){
      for(let i=0;i<4;i++){
        const px=this._r(i*7)*W*.8+W*.1,py=this._r(i*7+1)*H*.7+H*.15;
        const pr2=portalP*(30+this._r(i*7+2)*40)*(1+.15*Math.sin(t*4+i));
        ctx.save();ctx.globalAlpha=portalP;
        ctx.fillStyle='#000000';ctx.beginPath();ctx.arc(px,py,pr2,0,Math.PI*2);ctx.fill();
        const pg2=ctx.createRadialGradient(px,py,pr2*.7,px,py,pr2*1.3);
        pg2.addColorStop(0,'rgba(150,0,255,0.6)');pg2.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=pg2;ctx.beginPath();ctx.arc(px,py,pr2*1.3,0,Math.PI*2);ctx.fill();
        ctx.restore();
      }
    }
    // Energy arcs
    const arcP=this._p(t,2.5,4.0);
    if(arcP>0){
      for(let i=0;i<8;i++){
        ctx.strokeStyle=`rgba(200,0,255,${arcP*this._r(i*3+4)*.6})`;ctx.lineWidth=1.5;
        ctx.shadowColor='#ff00ff';ctx.shadowBlur=12;
        const ex1=W*.2+this._r(i*3)*W*.6,ey1=H*.2+this._r(i*3+1)*H*.6;
        const ex2=W*.2+this._r(i*3+2)*W*.6,ey2=H*.2+this._r(i*3+3)*H*.6;
        ctx.beginPath();ctx.moveTo(ex1,ey1);
        ctx.quadraticCurveTo((ex1+ex2)/2+(this._r(i*10)-.5)*80,(ey1+ey2)/2+(this._r(i*10+1)-.5)*80,ex2,ey2);
        ctx.stroke();ctx.shadowBlur=0;
      }
    }
    // Corrupted title
    const tA=this._p(t,3.8,4.4)*(1-this._p(t,5.0,5.5));
    if(tA>0){
      const gOff=(Math.random()-.5)*12*(t<4.2?1:0);
      const fs2=Math.min(54,W/Math.max(1,tr.name.length*.62));
      ctx.save();ctx.textAlign='center';ctx.font=`900 ${fs2}px Orbitron,monospace`;
      ctx.globalAlpha=tA*.35;ctx.fillStyle='rgba(255,0,200,0.8)';ctx.fillText(tr.name,W/2+gOff,H/2+8);
      ctx.restore();
    }
    this._cinTitle(ctx,W,H,tr,tA,{color:'#cc00ff',glow:'#8800ff'});
    this._cinVoice(ctx,W,H,'You have entered... the Shadow Dimension.',this._p(t,4.2,4.8)*(1-this._p(t,5.0,5.5)));
    this._cinOverlay(ctx,W,H,'#000',this._p(t,5.0,5.5));
  }

  // ── 14 — THE FINAL REALM (8.0 s) ────────────────────────
  // White implosion → planets explode → black hole opens → space cracks →
  // "YOU HAVE REACHED THE END..." → "PREPARE TO FACE THE SHADOW KING." → Shadow King silhouette
  _cin14(ctx,W,H,t,tr,w){
    ctx.fillStyle='#000000';ctx.fillRect(0,0,W,H);
    // Implosion flash
    const flashP=Math.max(0,1-t*4);
    if(flashP>0){ctx.fillStyle=`rgba(255,255,255,${flashP})`;ctx.fillRect(0,0,W,H);}
    // Stars (pulled toward center by black hole)
    const starA=this._p(t,0.3,1.5);
    if(starA>0){
      const pull=this._p(t,1.5,3.0);
      for(let i=0;i<100;i++){
        const sx2=this._r(i*3)*W,sy2=this._r(i*3+1)*H;
        const px2=sx2+(W/2-sx2)*pull*pull*.5,py2=sy2+(H/2-sy2)*pull*pull*.5;
        ctx.fillStyle=`rgba(255,255,255,${starA*(0.5+this._r(i*3+2)*.5)})`;
        ctx.beginPath();ctx.arc(px2,py2,1+this._r(i*3+2),0,Math.PI*2);ctx.fill();
      }
    }
    // Planets appear then explode
    [[W*.2,H*.25,'#4060a0'],[W*.8,H*.3,'#a04020'],[W*.15,H*.75,'#206040'],[W*.85,H*.7,'#806000']].forEach(([px,py,pc],i)=>{
      const pS=0.5+i*.25,pA=this._p(t,pS,pS+.3),pE=this._p(t,pS+.3,pS+.8);
      if(pA>0&&pE<0.1){
        ctx.save();ctx.globalAlpha=pA;ctx.beginPath();ctx.arc(px,py,20*pA,0,Math.PI*2);ctx.fillStyle=pc;ctx.fill();ctx.restore();
      }
      if(pE>0){
        const eR=pE*80;
        ctx.save();ctx.globalAlpha=(1-pE)*.8;
        const eg2=ctx.createRadialGradient(px,py,0,px,py,eR);
        eg2.addColorStop(0,'rgba(255,200,50,1)');eg2.addColorStop(.5,'rgba(255,60,0,0.6)');eg2.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=eg2;ctx.beginPath();ctx.arc(px,py,eR,0,Math.PI*2);ctx.fill();ctx.restore();
      }
    });
    // Black hole
    const bhP=this._eio(this._p(t,2.0,3.5));
    if(bhP>0){
      const bhR=bhP*70;
      for(let ring=3;ring>=0;ring--){
        const rR=bhR*(1.2+ring*.35);
        ctx.save();ctx.globalAlpha=(1-ring/4)*.6*bhP;
        ctx.beginPath();ctx.ellipse(W/2,H/2,rR,rR*.2,t*.3,0,Math.PI*2);
        ctx.strokeStyle=`hsl(${20+ring*30},100%,60%)`;ctx.lineWidth=6-ring;ctx.stroke();ctx.restore();
      }
      const bhg=ctx.createRadialGradient(W/2,H/2,0,W/2,H/2,bhR);
      bhg.addColorStop(0,'rgba(0,0,0,1)');bhg.addColorStop(.8,'rgba(0,0,0,0.9)');bhg.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=bhg;ctx.beginPath();ctx.arc(W/2,H/2,bhR,0,Math.PI*2);ctx.fill();
    }
    // Space cracks
    const spcP=this._p(t,3.5,5.0);
    if(spcP>0){
      for(let i=0;i<20;i++){
        const ang5=(i/20)*Math.PI*2+this._r(i*4)*.3;
        const len4=spcP*(W*.25+this._r(i*4+1)*W*.25);
        ctx.strokeStyle=`rgba(255,255,255,${spcP*(0.4+this._r(i*4+2)*.5)})`;ctx.lineWidth=1+this._r(i*4+3);
        ctx.shadowColor='#fff';ctx.shadowBlur=6;
        ctx.beginPath();ctx.moveTo(W/2,H/2);
        let cx5=W/2,cy5=H/2;
        for(let s3=0;s3<4;s3++){
          cx5+=Math.cos(ang5)*len4/4+(this._r(i*40+s3)-.5)*30;
          cy5+=Math.sin(ang5)*len4/4+(this._r(i*40+s3+1)-.5)*30;
          ctx.lineTo(cx5,cy5);
        }
        ctx.stroke();ctx.shadowBlur=0;
      }
    }
    // Line 1
    const l1A=this._p(t,4.5,5.2)*(1-this._p(t,6.5,7.0));
    if(l1A>0){
      ctx.save();ctx.globalAlpha=l1A;ctx.textAlign='center';
      ctx.font='bold 28px Orbitron,monospace';ctx.fillStyle='#ffffff';
      ctx.shadowColor='#8800ff';ctx.shadowBlur=20;
      ctx.fillText('YOU HAVE REACHED THE END...',W/2,H/2-30);ctx.restore();
    }
    // Line 2
    const l2A=this._p(t,5.5,6.2)*(1-this._p(t,7.2,7.8));
    if(l2A>0){
      ctx.save();ctx.globalAlpha=l2A;ctx.textAlign='center';
      ctx.font='bold 22px Orbitron,monospace';ctx.fillStyle='#ff2200';
      ctx.shadowColor='#ff2200';ctx.shadowBlur=25;
      ctx.fillText('PREPARE TO FACE THE SHADOW KING.',W/2,H/2+20);ctx.restore();
    }
    // Shadow King silhouette
    const kingA=this._p(t,6.5,7.2)*(1-this._p(t,7.5,8.0));
    if(kingA>0){
      ctx.save();ctx.globalAlpha=kingA;ctx.fillStyle='#080000';
      ctx.beginPath();
      ctx.moveTo(W*.5,H*.05);ctx.lineTo(W*.42,H*.14);ctx.lineTo(W*.46,H*.14);
      ctx.lineTo(W*.44,H*.22);ctx.lineTo(W*.56,H*.22);ctx.lineTo(W*.54,H*.14);ctx.lineTo(W*.58,H*.14);
      ctx.lineTo(W*.62,H*.28);ctx.lineTo(W*.72,H*.35);ctx.lineTo(W*.65,H*.7);
      ctx.lineTo(W*.55,H*.7);ctx.lineTo(W*.52,H*.9);ctx.lineTo(W*.48,H*.9);ctx.lineTo(W*.45,H*.7);
      ctx.lineTo(W*.35,H*.7);ctx.lineTo(W*.28,H*.35);ctx.lineTo(W*.38,H*.28);ctx.closePath();ctx.fill();
      const eyeGlow=.7+.3*Math.sin(t*6);
      ctx.fillStyle=`rgba(255,0,0,${eyeGlow})`;ctx.shadowColor='#ff0000';ctx.shadowBlur=15*eyeGlow;
      ctx.beginPath();ctx.ellipse(W*.47,H*.28,5,4,0,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(W*.53,H*.28,5,4,0,0,Math.PI*2);ctx.fill();
      ctx.shadowBlur=0;ctx.restore();
    }
    this._cinOverlay(ctx,W,H,'#000',this._p(t,7.5,8.0));
  }
}
