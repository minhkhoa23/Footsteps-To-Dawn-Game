// Quiet, synthesized wind / harbor ambience. No recordings or remote assets.
export function createAmbience(): { stop: () => void } | null {
  try {
    const context = new AudioContext();
    const buffer = context.createBuffer(1, context.sampleRate * 3, context.sampleRate);
    const channel = buffer.getChannelData(0); let last = 0;
    for (let i=0; i<channel.length; i++) { last = (last + (Math.random()*2-1)*.02)/1.02; channel[i] = last*3.5; }
    const noise = context.createBufferSource(); noise.buffer = buffer; noise.loop = true;
    const filter = context.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 650;
    const gain = context.createGain(); gain.gain.value = .075;
    noise.connect(filter).connect(gain).connect(context.destination); noise.start();
    void context.resume().catch(() => {});
    return { stop: () => { void context.close().catch(() => {}); } };
  } catch { return null; }
}
export function playChoiceSound() {
  try {
    const ctx = new AudioContext(); const osc = ctx.createOscillator(); const gain = ctx.createGain();
    osc.type='sine'; osc.frequency.setValueAtTime(440,ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(660,ctx.currentTime+.12);
    gain.gain.setValueAtTime(.035,ctx.currentTime); gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.2);
    osc.connect(gain).connect(ctx.destination); osc.start(); osc.stop(ctx.currentTime+.22); osc.onended=()=>{void ctx.close();};
  } catch { /* Sound is optional; text feedback always remains available. */ }
}
