# Writes lyrics.txt (time stamps) and lyrics.srt (captions) from the list below.
# Times are from a speech-to-text pass (faster-whisper medium, word times), 14 Nov 2026.
L = [
("Intro",None,None,None),
(0.0,4.3,"Yeah, oh oh oh oh"),
(5.1,9.3,"Yeah, oh oh oh oh"),
("Verse 1",None,None,None),
(9.4,11.2,"It's three in the morning"),
(11.3,12.5,"Pager lights up the room"),
(12.6,14.6,"No questions asked, no hesitation"),
(14.7,16.2,"Leave the dinner on the table"),
(16.2,17.5,"Stepping into the night"),
(17.5,19.4,"That's what it means to be a dedication (?)"),
(19.5,21.1,"Out on the open road"),
(21.1,22.3,"Red dust under the wheels"),
(22.3,24.3,"Past the airstrip, past the edge of town"),
(24.4,27.2,"When somebody needs you, you already know"),
(27.3,29.0,"You never let your people down"),
("Pre-chorus",None,None,None),
(29.1,31.6,"It's not the big dramatic moment"),
(31.7,34.1,"It's every quiet time you came through"),
(34.2,37.7,"It's knowing when they call you'll be the one who shows up"),
(37.8,39.8,"That's what makes you something true"),
("Chorus",None,None,None),
(39.9,44.3,"You show up, show up, show up for everyone"),
(44.4,49.4,"Under the stars and the Eyre Peninsula sun (?)"),
(49.5,53.7,"You show up, show up, it's written in your bones"),
(53.7,58.0,"Every road you travel leads somebody home"),
(58.1,60.5,"Oh, you show up"),
(60.5,64.4,"Oh oh oh oh"),
("Verse 2",None,None,None),
(64.6,67.4,"Flying doctor, waiting at the strip in the early light"),
(67.5,69.6,"You've been there since before the sun was rising"),
(69.7,72.0,"The nurses know your name, the GPs know your face"),
(72.1,74.5,"The little things you do keep this whole region thriving"),
(74.6,77.1,"And back at home, someone's keeping everything warm"),
(77.2,78.7,"Holding it together while you're gone"),
(78.8,81.7,"To every family waiting by the door at night"),
(81.7,83.5,"This song is for your strength to carry on"),
("Pre-chorus",None,None,None),
(83.6,86.2,"It's not the big dramatic moment"),
(86.2,88.7,"It's every quiet time you came through"),
(88.7,92.3,"It's knowing when they call you'll be the one who shows up"),
(92.4,94.9,"Da da da da da"),
(95.0,96.8,"That's what makes you something true"),
("Chorus",None,None,None),
(96.8,100.3,"You show up, show up, show up for everyone"),
(100.4,105.0,"Under the stars and the Eyre Peninsula sun (?)"),
(105.2,109.5,"You show up, show up, it's written in your bones"),
(109.6,113.8,"Every road you travel leads somebody home"),
(113.9,116.7,"Oh, you show up"),
("Bridge",None,None,None),
(117.6,120.6,"You know these roads like the back of your hand"),
(120.7,122.9,"The distance and the people (?), this red and golden land"),
(122.9,125.3,"You don't do it for the glory, you don't need the lights"),
(125.3,127.7,"You just turn out, turn out into the night"),
(127.7,132.4,"And we see you, see you every single time"),
(132.5,135.6,"We see you, we see you"),
(135.7,139.9,"You're one of a kind"),
("Final chorus",None,None,None),
(140.1,143.9,"Show up, show up, show up for everyone"),
(144.0,147.9,"Under the stars and the Eyre Peninsula sun"),
(148.0,153.1,"Show up, show up, it's written in your bones"),
(153.2,157.1,"Every road you travel leads somebody home"),
("Outro",None,None,None),
(158.1,162.2,"Oh, you show up, show up, show up"),
(162.3,166.9,"Oh, this peninsula knows your name"),
(167.0,169.6,"Nothing here would be the same"),
(169.6,175.0,"Show up, show up, oh oh oh"),
(175.0,179.1,"Show up, show up, oh oh oh, yeah yeah"),
]
def mmss(t): return f"{int(t//60)}:{t%60:04.1f}"
def srt(t):
    ms=int(round(t*1000)); h,ms=divmod(ms,3600000); m,ms=divmod(ms,60000); s,ms=divmod(ms,1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"
txt=["Show Up For You - lyrics with time stamps (min:sec)",
     "Transcribed by speech-to-text, 14 Nov 2026. (?) = hard to hear, check by ear.",""]
out=[];n=0
for r in L:
    if r[1] is None: txt+=["",f"[{r[0]}]"]; continue
    a,b,t=r; txt.append(f"{mmss(a)} - {mmss(b)}  {t}")
    n+=1; out+= [str(n), f"{srt(a)} --> {srt(b)}", t.replace(" (?)",""), ""]
open("lyrics.txt","w").write("\n".join(txt).replace("\n\n\n","\n\n")+"\n")
open("lyrics.srt","w").write("\n".join(out))
