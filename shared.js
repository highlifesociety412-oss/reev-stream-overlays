(function(){
  const params = new URLSearchParams(location.search);
  window.OV = {
    param(name, fallback){
      const v = params.get(name);
      return (v === null || v === "") ? fallback : v;
    },
    isPreview(){ return params.get("preview") === "1" || params.get("preview") === "true"; },
    isDemo(){ return params.get("demo") === "1" || params.get("demo") === "true"; },
    lang(){ return (params.get("lang") || "both").toLowerCase(); }
  };
  document.documentElement.classList.add("ov");
  if (window.OV.isPreview()) document.body.classList.add("preview");
  const lang = window.OV.lang();
  if (lang === "en" || lang === "hi") document.body.classList.add("lang-" + lang);

  function tone(ctx, freq, type, start, dur, gain){
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(gain, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    o.connect(g); g.connect(ctx.destination);
    o.start(start); o.stop(start + dur + 0.02);
  }
  function noiseBurst(ctx, start, dur, gain, hpFreq){
    const buf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i=0;i<data.length;i++) data[i] = (Math.random()*2-1) * (1 - i/data.length);
    const src = ctx.createBufferSource(); src.buffer = buf;
    const hp = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = hpFreq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, start);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    src.connect(hp); hp.connect(g); g.connect(ctx.destination);
    src.start(start); src.stop(start + dur);
  }
  window.OV.play = function(kind){
    if (window.OV.isPreview()) return;
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const t = ctx.currentTime;
    const master = 0.32; // keep game audio primary; ~-10dB-ish peak
    if (kind === "p1"){
      tone(ctx, 1046.5, "sine", t, 0.08, 0.22*master);
      tone(ctx, 261.63, "sine", t+0.06, 0.7, 0.16*master);
      tone(ctx, 329.63, "triangle", t+0.06, 0.7, 0.12*master);
      noiseBurst(ctx, t+0.12, 0.2, 0.08*master, 200);
    } else if (kind === "p2"){
      tone(ctx, 261.63, "sine", t, 0.9, 0.14*master);
      tone(ctx, 392.00, "sine", t, 0.9, 0.12*master);
      tone(ctx, 659.25, "triangle", t+0.04, 0.14, 0.2*master);
      tone(ctx, 783.99, "triangle", t+0.18, 0.14, 0.18*master);
      noiseBurst(ctx, t+0.4, 0.3, 0.06*master, 4000);
    } else if (kind === "p3"){
      tone(ctx, 880, "square", t, 0.09, 0.08*master);
      tone(ctx, 220, "sine", t+0.02, 0.12, 0.1*master);
    } else if (kind === "p4"){
      tone(ctx, 800, "sine", t, 0.06, 0.08*master);
    } else if (kind === "heat-up"){
      tone(ctx, 120, "sine", t, 0.08, 0.16*master);
      noiseBurst(ctx, t, 0.08, 0.1*master, 80);
    } else if (kind === "heat-5"){
      for (let i=0;i<4;i++){
        tone(ctx, 440, "sine", t + i*0.16, 0.08, 0.1*master);
        tone(ctx, 520, "sine", t + 0.08 + i*0.16, 0.08, 0.1*master);
      }
    } else if (kind === "hype"){
      tone(ctx, 60, "sine", t, 0.25, 0.28*master);
      noiseBurst(ctx, t, 0.35, 0.16*master, 200);
    }
  };

  window.OV.ellipsis = function(str, n){
    str = String(str || "");
    return str.length > n ? str.slice(0, n-1) + "…" : str;
  };
})();
