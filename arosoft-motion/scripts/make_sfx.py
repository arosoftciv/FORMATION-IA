"""Sound design procédural AroSoft (aucune banque externe, libre de droits).
Génère les effets dans public/audio/sfx/ et la nappe musicale."""
import numpy as np, wave, os
SR = 44100
OUT = "public/audio/sfx"
rng = np.random.default_rng(7)

def save(name, x, stereo_width=0.0):
    x = np.asarray(x, np.float64)
    pk = np.max(np.abs(x)) or 1
    x = x / pk * 0.89
    if x.ndim == 1:
        l = x; r = x
        if stereo_width:
            d = int(SR * 0.012)
            r = np.concatenate([np.zeros(d), x[:-d]])
            l, r = x*(1+stereo_width)/2 + r*(1-stereo_width)/2, r*(1+stereo_width)/2 + x*(1-stereo_width)/2
        x = np.stack([l, r], 1)
    with wave.open(os.path.join(OUT, name + ".wav"), "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())

def t(d): return np.arange(int(SR*d))/SR
def env(n, a, d_curve):
    e = np.ones(n); na = max(1, int(SR*a)); e[:na] = np.linspace(0,1,na)
    return e * d_curve
def lp(x, fc):  # filtre passe-bas simple (one-pole x2)
    a = np.exp(-2*np.pi*fc/SR); y = np.zeros_like(x); s = 0.0
    for _ in range(2):
        s = 0.0
        for i in range(len(x)):
            s = (1-a)*x[i] + a*s; y[i] = s
        x = y.copy()
    return y
def fft_band(x, lo, hi):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1/SR)
    X[(f<lo)|(f>hi)] = 0; return np.fft.irfft(X, len(x))

# BOOM : sweep grave + souffle
tt = t(1.4); f = 110*np.exp(-tt*3.2)+38
boom = np.sin(2*np.pi*np.cumsum(f)/SR) * np.exp(-tt*2.6)
boom += 0.35*fft_band(rng.normal(size=len(tt)), 30, 900)*np.exp(-tt*9)
boom[:int(SR*0.004)] *= np.linspace(0,1,int(SR*0.004))
save("boom", np.tanh(boom*1.6))

# IMPACT : coup sec court
tt = t(0.6); f = 160*np.exp(-tt*14)+50
imp = np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*7) + 0.5*fft_band(rng.normal(size=len(tt)),200,6000)*np.exp(-tt*40)
save("impact", np.tanh(imp*2))

# CLICK
tt = t(0.09)
clk = fft_band(rng.normal(size=len(tt)), 1800, 9000)*np.exp(-tt*120) + 0.6*np.sin(2*np.pi*2400*tt)*np.exp(-tt*90)
save("click", clk)

# TICK doux (UI)
tt = t(0.06); save("tick", np.sin(2*np.pi*1600*tt)*np.exp(-tt*110))

# POP
tt = t(0.18); f = 420+900*tt/0.18
save("pop", np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*28))

# WHOOSH : bruit filtré avec balayage
def whoosh(d, peak=0.45, lo=300, hi=5000):
    tt = t(d); n = rng.normal(size=len(tt))
    shape = np.exp(-((tt-peak*d)/(0.22*d))**2)
    bands = [fft_band(n, lo*(k+1), lo*(k+1)*1.8) for k in range(5)]
    pos = np.clip(tt/d, 0, 1)
    out = np.zeros_like(tt)
    for k, b in enumerate(bands):
        w = np.exp(-((pos*4.0 - k)**2)/1.2) if True else 1
        out += b * w
    return out*shape
save("whoosh", whoosh(0.7), 0.6)
save("whoosh_short", whoosh(0.35, 0.4), 0.6)

# RISER
tt = t(1.6); f = 200*np.exp(tt*1.4)
ris = 0.5*np.sin(2*np.pi*np.cumsum(f)/SR) + fft_band(rng.normal(size=len(tt)), 800, 9000)*0.6
ris *= (tt/1.6)**2.2
save("riser", ris, 0.5)

# SEND / notification (deux notes)
tt = t(0.5)
send = np.concatenate([np.sin(2*np.pi*880*t(0.11))*np.exp(-t(0.11)*25), np.sin(2*np.pi*1318.5*tt)*np.exp(-tt*9)])
save("send", send)

# SHIMMER (scintillement logo)
tt = t(2.2); sh = np.zeros_like(tt)
for k, fr in enumerate([1318.5, 1760, 2093, 2637, 3136]):
    st = int(SR*0.12*k); seg = tt[:len(tt)-st]
    sh[st:] += np.sin(2*np.pi*fr*seg)*np.exp(-seg*2.2)*0.4
save("shimmer", sh, 0.7)

# NAPPE MUSICALE : 100 BPM, Am–F–C–G, pad + kick + charley
BPM = 100; beat = 60/BPM; DUR = 200
N = int(SR*DUR); mus = np.zeros(N)
chords = [[57,60,64],[53,57,60],[48,52,55],[55,59,62]]
bar = beat*4
def midi(m): return 440*2**((m-69)/12)
tt_bar = t(bar)
padbar = []
for ch in chords:
    x = np.zeros_like(tt_bar)
    for m in ch + [ch[0]-12]:
        for det in (-0.12, 0.12):
            fr = midi(m)*2**(det/12)
            for h, a in ((1,1),(2,0.35),(3,0.15)):
                x += a*np.sin(2*np.pi*fr*h*tt_bar + rng.uniform(0,6))
    e = np.minimum(1, tt_bar/0.6) * np.minimum(1, (bar-tt_bar)/0.4)
    padbar.append(x*e)
i = 0; k = 0
while i < N:
    seg = padbar[k % 4]; n = min(len(seg), N-i); mus[i:i+n] += seg[:n]*0.05; i += len(seg); k += 1
kick_t = t(0.35); kick = np.sin(2*np.pi*np.cumsum(50+90*np.exp(-kick_t*30))/SR)*np.exp(-kick_t*9)
hat_t = t(0.05); hat = fft_band(rng.normal(size=len(hat_t)), 6000, 14000)*np.exp(-hat_t*80)
nb = int(DUR/beat)
for b in range(nb):
    p = int(b*beat*SR)
    if p+len(kick) < N: mus[p:p+len(kick)] += kick*0.5
    q = int((b+0.5)*beat*SR)
    if q+len(hat) < N: mus[q:q+len(hat)] += hat*0.12
# bass
bt = t(beat*2)
for b in range(nb//2):
    ch = chords[(b//2) % 4]; p = int(b*2*beat*SR)
    x = np.sin(2*np.pi*midi(ch[0]-24)*bt)*np.exp(-bt*1.2)
    if p+len(x) < N: mus[p:p+len(x)] += x*0.22
save("music_bed", mus, 0.4)
print("ok")
