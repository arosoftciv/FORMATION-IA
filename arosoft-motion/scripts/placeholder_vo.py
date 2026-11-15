"""Voix-off PROVISOIRE (espeak-ng + mbrola fr1) calée sur les durées exactes
des prises ElevenLabs. Remplacer public/audio/vo/*.mp3 par les vraies prises
ElevenLabs (mêmes noms) puis relancer le rendu : le timing ne change pas."""
import json, subprocess, os, tempfile
segs = json.load(open("scripts/voiceover.json"))
out = "public/audio/vo"
for s in segs:
    t = tempfile.mktemp(suffix=".wav")
    subprocess.run(["espeak-ng", "-v", "mb-fr1", "-s", "150", "-p", "35", "-g", "4", "-w", t, s["text"]], check=True, stderr=subprocess.DEVNULL)
    d = float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","csv=p=0",t]))
    target = s["dur"] - 0.25
    tempo = max(0.5, min(2.0, d / target))
    subprocess.run(["ffmpeg","-y","-v","error","-i",t,"-af",
        f"atempo={tempo:.4f},highpass=f=80,lowpass=f=7000,acompressor=threshold=-18dB:ratio=3,loudnorm=I=-16:TP=-1.5,apad=whole_dur={s['dur']}",
        "-t",str(s["dur"]),"-ar","44100","-ac","2","-b:a","192k",f"{out}/{s['id']}.mp3"], check=True)
    os.remove(t)
    print(s["id"], round(d,2), "->", s["dur"], "tempo", round(tempo,2))
