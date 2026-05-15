import { useState, useEffect, useRef } from "react";

const C = {
  bg:      "#07101f",
  bgCard:  "#0d1b2e",
  bgDeep:  "#040c17",
  border:  "#1a2f47",
  gold:    "#d4a843",
  goldDim: "#8a6820",
  teal:    "#00d4b8",
  tealDim: "#007a6b",
  white:   "#f0f4f8",
  muted:   "#6b8099",
  green:   "#3ecf8e",
  amber:   "#e8a020",
  red:     "#e05252",
  text:    "#c8d8e8",
};

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${C.bg};
    color: ${C.white};
    font-family: 'Outfit', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app {
    max-width: 480px;
    margin: 0 auto;
    min-height: 100vh;
    background: ${C.bg};
    position: relative;
  }

  /* ANIMATIONS */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50%       { transform: scale(1.08); }
  }

  .fade-up { animation: fadeUp 0.5s ease forwards; }
  .fade-in { animation: fadeIn 0.4s ease forwards; }

  /* HEADER */
  .hdr {
    background: ${C.bgDeep};
    border-bottom: 1px solid ${C.border};
    padding: 44px 20px 18px;
    position: relative;
  }
  .hdr::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, ${C.gold}, ${C.teal}, ${C.gold});
  }
  .hdr-row { display: flex; justify-content: space-between; align-items: flex-start; }
  .wordmark { font-family: 'Playfair Display', serif; font-size: 24px; color: ${C.gold}; }
  .wordmark span { color: ${C.teal}; }
  .tagline { font-size: 11px; font-weight: 300; color: ${C.muted}; letter-spacing: 1px; margin-top: 2px; }
  .co-line { font-size: 9px; color: ${C.goldDim}; letter-spacing: 2px; text-transform: uppercase; margin-top: 2px; }

  .shield-badge {
    display: flex; align-items: center; gap: 5px;
    background: ${C.bgCard}; border: 1px solid rgba(0,212,184,0.35);
    border-radius: 20px; padding: 4px 10px; flex-shrink: 0;
  }
  .sdot { width: 6px; height: 6px; border-radius: 50%; background: ${C.teal}; animation: pulse 2s ease infinite; }
  .stext { font-size: 9px; font-weight: 600; letter-spacing: 1.2px; color: ${C.teal}; text-transform: uppercase; }

  /* NAV */
  .nav {
    display: flex; background: ${C.bgDeep};
    border-bottom: 1px solid ${C.border};
    overflow-x: auto; scrollbar-width: none;
  }
  .nav::-webkit-scrollbar { display: none; }
  .nav-btn {
    flex: 1; min-width: 58px; padding: 12px 4px;
    border: none; background: transparent;
    font-family: 'Outfit', sans-serif; font-size: 9.5px;
    font-weight: 500; letter-spacing: 1px; text-transform: uppercase;
    color: ${C.muted}; cursor: pointer;
    border-bottom: 2px solid transparent; transition: all .2s; white-space: nowrap;
  }
  .nav-btn.active { color: ${C.gold}; border-bottom-color: ${C.gold}; }

  /* CONTENT */
  .content { padding: 18px 14px 90px; }
  .sec-title { font-family: 'Playfair Display', serif; font-size: 21px; color: ${C.gold}; margin-bottom: 4px; }
  .sec-sub { font-size: 12.5px; color: ${C.muted}; font-weight: 300; margin-bottom: 18px; line-height: 1.5; }

  /* ONBOARDING */
  .ob-wrap {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 40px 24px; position: relative;
  }
  .ob-wrap::before {
    content: ''; position: fixed;
    top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, ${C.gold}, ${C.teal}, ${C.gold});
  }
  .ob-logo {
    font-family: 'Playfair Display', serif;
    font-size: 32px; color: ${C.gold}; text-align: center; margin-bottom: 6px;
  }
  .ob-logo span { color: ${C.teal}; }
  .ob-tagline { font-size: 13px; color: ${C.muted}; text-align: center; letter-spacing: 1px; margin-bottom: 32px; font-weight: 300; }

  .ob-card {
    background: ${C.bgCard}; border: 1px solid ${C.border};
    border-radius: 20px; padding: 28px 24px;
    width: 100%; max-width: 400px;
    position: relative; overflow: hidden;
  }
  .ob-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, ${C.gold}, ${C.teal});
  }

  .ob-step { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: ${C.muted}; margin-bottom: 16px; }
  .ob-q { font-family: 'Playfair Display', serif; font-size: 18px; color: ${C.white}; margin-bottom: 6px; line-height: 1.4; }
  .ob-sub { font-size: 12px; color: ${C.muted}; margin-bottom: 20px; line-height: 1.5; }

  .ob-input {
    width: 100%; padding: 13px 16px;
    border-radius: 12px; border: 1px solid ${C.border};
    background: ${C.bgDeep}; color: ${C.white};
    font-family: 'Outfit', sans-serif; font-size: 14px;
    outline: none; margin-bottom: 12px; transition: border-color .2s;
  }
  .ob-input:focus { border-color: rgba(212,168,67,0.5); }
  .ob-input::placeholder { color: ${C.muted}; }

  .ob-opts { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
  .ob-opt {
    padding: 12px 16px; border-radius: 12px;
    border: 1px solid ${C.border}; background: ${C.bgDeep};
    font-size: 13px; color: ${C.text}; cursor: pointer;
    text-align: left; font-family: 'Outfit', sans-serif;
    transition: all .15s; display: flex; align-items: center; gap: 10px;
  }
  .ob-opt:hover { border-color: rgba(212,168,67,0.4); color: ${C.gold}; }
  .ob-opt.selected { background: rgba(212,168,67,0.1); border-color: ${C.gold}; color: ${C.gold}; }
  .ob-opt-icon { font-size: 18px; flex-shrink: 0; }

  .ob-prog { height: 3px; background: ${C.border}; border-radius: 2px; margin-bottom: 20px; overflow: hidden; }
  .ob-prog-fill { height: 100%; background: linear-gradient(90deg, ${C.gold}, ${C.teal}); transition: width .4s ease; }

  /* BUTTONS */
  .btn {
    width: 100%; padding: 14px; border-radius: 12px; border: none;
    background: ${C.gold}; color: ${C.bgDeep};
    font-family: 'Outfit', sans-serif; font-size: 12px;
    font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase;
    cursor: pointer; transition: opacity .2s; margin-top: 4px;
  }
  .btn:hover { opacity: .9; }
  .btn:disabled { opacity: .4; cursor: not-allowed; }
  .btn-teal { background: ${C.teal}; }
  .btn-outline { background: transparent; border: 1px solid ${C.gold}; color: ${C.gold}; }
  .btn-sm { padding: 10px; font-size: 11px; margin-top: 8px; }

  /* CARDS */
  .card {
    background: ${C.bgCard}; border: 1px solid ${C.border};
    border-radius: 14px; padding: 16px; margin-bottom: 10px;
    position: relative; overflow: hidden;
  }
  .card-accent::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
  }

  /* DAILY INSIGHT */
  .insight-card {
    background: linear-gradient(135deg, ${C.bgDeep}, ${C.bgCard});
    border: 1px solid ${C.border}; border-radius: 16px;
    padding: 20px; margin-bottom: 14px; position: relative; overflow: hidden;
  }
  .insight-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, ${C.gold}, ${C.teal});
  }
  .insight-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: ${C.gold}; margin-bottom: 10px; font-weight: 600; }
  .insight-text { font-family: 'Playfair Display', serif; font-size: 15px; color: ${C.white}; line-height: 1.6; font-style: italic; }
  .insight-loading {
    height: 16px; border-radius: 8px; margin-bottom: 8px;
    background: linear-gradient(90deg, ${C.border} 25%, ${C.bgCard} 50%, ${C.border} 75%);
    background-size: 200% auto;
    animation: shimmer 1.5s linear infinite;
  }

  /* VITALS */
  .vitals-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 14px; }
  .vital-card {
    background: ${C.bgCard}; border: 1px solid ${C.border};
    border-radius: 12px; padding: 14px 12px; text-align: center;
  }
  .vital-icon { font-size: 20px; margin-bottom: 6px; }
  .vital-val {
    font-family: 'Playfair Display', serif; font-size: 24px;
    color: ${C.white}; margin-bottom: 2px; line-height: 1;
  }
  .vital-unit { font-size: 10px; color: ${C.muted}; }
  .vital-label { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: ${C.muted}; margin-top: 4px; }
  .vital-trend { font-size: 11px; margin-top: 4px; }

  /* WEARABLE */
  .wearable-row {
    display: flex; align-items: center; gap: 12px;
    background: ${C.bgCard}; border: 1px solid ${C.border};
    border-radius: 12px; padding: 14px; margin-bottom: 10px; cursor: pointer;
    transition: border-color .2s;
  }
  .wearable-row:hover { border-color: rgba(212,168,67,0.4); }
  .wearable-icon { font-size: 24px; flex-shrink: 0; }
  .wearable-name { font-size: 13px; font-weight: 500; color: ${C.white}; margin-bottom: 2px; }
  .wearable-status { font-size: 11px; color: ${C.muted}; }
  .wearable-badge {
    margin-left: auto; padding: 3px 10px; border-radius: 20px;
    font-size: 10px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;
    flex-shrink: 0;
  }
  .connected { background: rgba(62,207,142,0.15); color: ${C.green}; }
  .disconnected { background: rgba(107,128,153,0.15); color: ${C.muted}; }

  /* CULTURAL LAYER */
  .cultural-card {
    background: linear-gradient(135deg, rgba(232,160,32,0.08), ${C.bgCard});
    border: 1px solid rgba(232,160,32,0.3); border-radius: 16px;
    padding: 20px; margin-bottom: 14px;
  }
  .cultural-word { font-family: 'Playfair Display', serif; font-size: 28px; color: ${C.amber}; margin-bottom: 4px; }
  .cultural-pronunciation { font-size: 12px; color: ${C.muted}; font-style: italic; margin-bottom: 8px; }
  .cultural-meaning { font-size: 13px; color: ${C.text}; line-height: 1.6; }
  .cultural-label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: ${C.amber}; margin-bottom: 12px; font-weight: 600; }

  /* PILLAR ROWS */
  .pillar-row {
    background: ${C.bgCard}; border: 1px solid ${C.border};
    border-radius: 12px; padding: 14px; margin-bottom: 10px;
    display: flex; align-items: center; gap: 12px; cursor: pointer;
    transition: border-color .2s;
  }
  .pillar-row:hover { border-color: rgba(212,168,67,0.3); }
  .pillar-icon-wrap {
    width: 44px; height: 44px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0; border: 1px solid ${C.border};
    background: ${C.bgDeep};
  }
  .pillar-title { font-family: 'Playfair Display', serif; font-size: 15px; color: ${C.gold}; margin-bottom: 3px; }
  .pillar-desc { font-size: 11.5px; color: ${C.muted}; }
  .pillar-arrow { margin-left: auto; color: ${C.muted}; font-size: 16px; flex-shrink: 0; }
  .pillar-tag {
    display: inline-block; padding: 2px 8px; border-radius: 20px;
    font-size: 9px; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase; margin-top: 5px;
  }

  /* AILT SCORE */
  .score-row { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 14px; }
  .score-card {
    background: ${C.bgCard}; border: 1px solid ${C.border};
    border-radius: 12px; padding: 14px 8px; text-align: center;
  }
  .score-val { font-family: 'Playfair Display', serif; font-size: 22px; color: ${C.white}; margin-bottom: 3px; }
  .score-label { font-size: 9.5px; letter-spacing: 1px; text-transform: uppercase; color: ${C.muted}; }

  /* DIVIDER */
  .divider { height: 1px; background: ${C.border}; margin: 16px 0; }

  /* FOOTER */
  .enc-row { display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 14px; }
  .enc-dot { width: 5px; height: 5px; border-radius: 50%; background: ${C.teal}; }
  .enc-text { font-size: 9px; color: ${C.tealDim}; letter-spacing: 1px; text-transform: uppercase; }
  .footer-txt { text-align: center; font-size: 9px; color: ${C.muted}; letter-spacing: 1.5px; text-transform: uppercase; opacity: .5; margin-top: 6px; }

  /* CHAT */
  .chat-area { display: flex; flex-direction: column; gap: 10px; margin-bottom: 12px; min-height: 180px; }
  .msg { max-width: 86%; padding: 10px 14px; border-radius: 14px; font-size: 13px; line-height: 1.6; animation: fadeUp .25s ease; }
  .msg.ai { background: ${C.bgCard}; border: 1px solid ${C.border}; color: ${C.text}; border-radius: 4px 14px 14px 14px; align-self: flex-start; }
  .msg.user { background: rgba(212,168,67,0.12); border: 1px solid rgba(212,168,67,0.3); color: ${C.white}; border-radius: 14px 4px 14px 14px; align-self: flex-end; }
  .msg.thinking { background: ${C.bgCard}; border: 1px solid ${C.border}; color: ${C.muted}; font-style: italic; align-self: flex-start; border-radius: 4px 14px 14px 14px; }
  .chat-row { display: flex; gap: 8px; align-items: flex-end; }
  .chat-input { flex: 1; padding: 11px 14px; border-radius: 12px; border: 1px solid ${C.border}; background: ${C.bgCard}; font-family: 'Outfit', sans-serif; font-size: 13px; color: ${C.white}; resize: none; outline: none; min-height: 42px; max-height: 100px; transition: border-color .2s; }
  .chat-input::placeholder { color: ${C.muted}; }
  .chat-input:focus { border-color: rgba(212,168,67,0.5); }
  .chat-send { width: 42px; height: 42px; border-radius: 12px; border: none; background: ${C.gold}; color: ${C.bgDeep}; font-size: 17px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: opacity .2s; }
  .chat-send:hover { opacity: .88; }
  .chat-send:disabled { background: ${C.border}; color: ${C.muted}; cursor: not-allowed; }
`;

// ── DAILY CHICKASAW WORDS ─────────────────────
const CHIKASHA_WORDS = [
  { word: "Chitokaka", pronunciation: "chi-TOH-ka-ka", meaning: "The Great One above. Used in prayer and ceremony to address the Creator. A reminder that sovereignty begins with spiritual grounding." },
  { word: "Ishtaya", pronunciation: "ish-TAY-ya", meaning: "To be well, to be in good health. The goal of everything Sovereign Shield builds -- not just clinical health, but holistic sovereign wellness." },
  { word: "Hochafo", pronunciation: "hoh-CHA-foh", meaning: "To help, to assist one another. The governing principle behind CareCircle and the community care model." },
  { word: "Yakni", pronunciation: "YAK-nee", meaning: "Land, homeland, country. Sovereignty starts with the land. Our data infrastructure is the digital homeland." },
  { word: "Sipokni", pronunciation: "si-POK-nee", meaning: "Elder, wise one. The foundation of CareCircle -- honoring and protecting those who carry the knowledge." },
];

// ── ONBOARDING ────────────────────────────────
const OB_STEPS = [
  {
    id: "email",
    q: "Create your sovereign health identity",
    sub: "Your data is encrypted from the moment you enter. It never reaches a commercial AI server in readable form.",
    type: "email"
  },
  {
    id: "tribal",
    q: "Are you a citizen of a tribal nation?",
    sub: "This unlocks your cultural sovereignty layer -- language tools, governance resources, and culturally grounded health insights.",
    type: "choice",
    opts: [
      { icon: "🦅", label: "Yes -- Chickasaw Nation" },
      { icon: "🌿", label: "Yes -- other tribal nation" },
      { icon: "🌎", label: "No -- general public" },
    ]
  },
  {
    id: "wearable",
    q: "Do you have a wearable device?",
    sub: "Connect any wearable to stream live biometrics into your sovereign health dashboard.",
    type: "choice",
    opts: [
      { icon: "⌚", label: "Apple Watch" },
      { icon: "💍", label: "Oura Ring" },
      { icon: "📿", label: "Fitbit or Garmin" },
      { icon: "❌", label: "No wearable yet" },
    ]
  },
  {
    id: "care",
    q: "Do you have a primary care provider or FQHC?",
    sub: "If your clinic uses CareIQ your clinical records will sync securely to your dashboard.",
    type: "choice",
    opts: [
      { icon: "🏥", label: "Yes -- sync my clinical records" },
      { icon: "👤", label: "No -- self-directed health only" },
    ]
  },
];

// ── WEARABLE VITALS (simulated) ───────────────
function useVitals() {
  const [vitals, setVitals] = useState({ hr: 68, hrv: 52, spo2: 98, steps: 4821, sleep: 7.2, stress: 34 });
  useEffect(() => {
    const id = setInterval(() => {
      setVitals(v => ({
        hr:    Math.max(55, Math.min(95,  v.hr    + Math.round((Math.random()-.5)*3))),
        hrv:   Math.max(30, Math.min(90,  v.hrv   + Math.round((Math.random()-.5)*2))),
        spo2:  Math.max(95, Math.min(100, v.spo2  + Math.round((Math.random()-.5)*1))),
        steps: v.steps + Math.round(Math.random()*12),
        sleep: v.sleep,
        stress:Math.max(10, Math.min(80,  v.stress+ Math.round((Math.random()-.5)*3))),
      }));
    }, 2200);
    return () => clearInterval(id);
  }, []);
  return vitals;
}

// ── ONBOARDING SCREEN ─────────────────────────
function Onboarding({ onComplete }) {
  const [step, setStep]     = useState(0);
  const [email, setEmail]   = useState("");
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);

  const current = OB_STEPS[step];
  const pct = ((step) / OB_STEPS.length) * 100;

  function next() {
    if (current.type === "email" && !email.includes("@")) return;
    if (current.type === "choice" && selected === null) return;
    const newAnswers = { ...answers, [current.id]: current.type === "email" ? email : current.opts[selected].label };
    setAnswers(newAnswers);
    setSelected(null);
    if (step + 1 >= OB_STEPS.length) {
      onComplete(newAnswers);
    } else {
      setStep(step + 1);
    }
  }

  return (
    <div className="ob-wrap">
      <div className="ob-logo">Sovereign<span>One</span></div>
      <div className="ob-tagline">Your health. Your data. Your sovereignty.</div>

      <div className="ob-card fade-up">
        <div className="ob-prog">
          <div className="ob-prog-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="ob-step">Step {step + 1} of {OB_STEPS.length}</div>
        <div className="ob-q">{current.q}</div>
        <div className="ob-sub">{current.sub}</div>

        {current.type === "email" && (
          <input
            className="ob-input"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === "Enter" && next()}
          />
        )}

        {current.type === "choice" && (
          <div className="ob-opts">
            {current.opts.map((opt, i) => (
              <button
                key={opt.label}
                className={`ob-opt${selected === i ? " selected" : ""}`}
                onClick={() => setSelected(i)}
              >
                <span className="ob-opt-icon">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
        )}

        <button
          className="btn"
          onClick={next}
          disabled={current.type === "email" ? !email.includes("@") : selected === null}
        >
          {step + 1 >= OB_STEPS.length ? "Enter My Sovereign Dashboard" : "Continue"}
        </button>
      </div>

      <div style={{ marginTop: 16, textAlign: "center" }}>
        <div className="enc-row">
          <div className="enc-dot" />
          <span className="enc-text">AES-256-GCM · Zero-Knowledge · Sovereign Prompt Shield v5</span>
        </div>
        <div className="footer-txt" style={{ marginTop: 6 }}>Sovereign Shield Technologies LLC</div>
      </div>
    </div>
  );
}

// ── DAILY INSIGHT ─────────────────────────────
function DailyInsight({ vitals, isTribal }) {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInsight() {
      setLoading(true);
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 120,
            system: `You are a sovereign health AI advisor. Generate a single personalized morning health insight of 1-2 sentences based on the biometric data provided. Be warm, specific, and actionable. Never use em dashes. ${isTribal ? "The user is a Chickasaw Nation member -- weave in a brief culturally grounded perspective when natural." : "Keep it universally motivating."} Keep it under 40 words.`,
            messages: [{
              role: "user",
              content: `Heart rate: ${vitals.hr} bpm, HRV: ${vitals.hrv}ms, SpO2: ${vitals.spo2}%, Steps today: ${vitals.steps}, Sleep: ${vitals.sleep}hrs, Stress score: ${vitals.stress}/100. Generate my morning sovereign health insight.`
            }]
          })
        });
        const data = await res.json();
        const text = data.content?.find(b => b.type === "text")?.text || "Your vitals look strong today. Stay hydrated and move intentionally.";
        setInsight(text);
      } catch {
        setInsight("Your body is tracking well today. Focus on recovery and stay connected to what matters most.");
      } finally {
        setLoading(false);
      }
    }
    fetchInsight();
  }, []);

  return (
    <div className="insight-card">
      <div className="insight-label">Today's Sovereign Health Insight</div>
      {loading ? (
        <>
          <div className="insight-loading" style={{ width: "90%" }} />
          <div className="insight-loading" style={{ width: "70%" }} />
        </>
      ) : (
        <div className="insight-text fade-in">{insight}</div>
      )}
    </div>
  );
}

// ── VITALS TAB ────────────────────────────────
function VitalsTab({ vitals, answers }) {
  const isTribal = answers?.tribal?.includes("Chickasaw") || answers?.tribal?.includes("other tribal");
  const wearable = answers?.wearable || "No wearable yet";
  const connected = !wearable.includes("No");

  return (
    <div>
      <p className="sec-title">Vital Intelligence</p>
      <p className="sec-sub">Live biometric stream. Sovereign AI powered insights.</p>

      <DailyInsight vitals={vitals} isTribal={isTribal} />

      <div className="vitals-grid">
        {[
          { icon: "❤️", val: vitals.hr, unit: "bpm", label: "Heart Rate", trend: vitals.hr < 70 ? "↓ Resting" : "↑ Active", trendColor: vitals.hr < 70 ? C.green : C.amber },
          { icon: "💫", val: vitals.hrv, unit: "ms", label: "HRV", trend: vitals.hrv > 50 ? "↑ Recovered" : "↓ Fatigued", trendColor: vitals.hrv > 50 ? C.green : C.red },
          { icon: "🫁", val: vitals.spo2, unit: "%", label: "SpO2", trend: "Normal range", trendColor: C.green },
          { icon: "👟", val: vitals.steps.toLocaleString(), unit: "steps", label: "Today", trend: "Goal: 10,000", trendColor: C.muted },
          { icon: "😴", val: vitals.sleep, unit: "hrs", label: "Last Night", trend: vitals.sleep >= 7 ? "Optimal" : "Below target", trendColor: vitals.sleep >= 7 ? C.green : C.amber },
          { icon: "🧠", val: vitals.stress, unit: "/100", label: "Stress Load", trend: vitals.stress < 40 ? "Low" : "Elevated", trendColor: vitals.stress < 40 ? C.green : C.amber },
        ].map((v, i) => (
          <div className="vital-card" key={v.label} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="vital-icon">{v.icon}</div>
            <div className="vital-val">{v.val}<span className="vital-unit">{v.unit}</span></div>
            <div className="vital-label">{v.label}</div>
            <div className="vital-trend" style={{ color: v.trendColor }}>{v.trend}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 12 }}>
        <p style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: C.muted, marginBottom: 10, fontWeight: 600 }}>Connected Devices</p>
        {[
          { icon: "⌚", name: wearable.includes("No") ? "No Wearable Connected" : wearable, status: connected ? "Streaming live data" : "Tap to connect a device", connected },
          { icon: "🏥", name: "CareIQ Clinical Sync", status: answers?.care?.includes("sync") ? "Records synced" : "Not connected", connected: answers?.care?.includes("sync") },
        ].map(w => (
          <div className="wearable-row" key={w.name}>
            <div className="wearable-icon">{w.icon}</div>
            <div>
              <div className="wearable-name">{w.name}</div>
              <div className="wearable-status">{w.status}</div>
            </div>
            <span className={`wearable-badge ${w.connected ? "connected" : "disconnected"}`}>
              {w.connected ? "Live" : "Connect"}
            </span>
          </div>
        ))}
      </div>

      <div className="enc-row">
        <div className="enc-dot" />
        <span className="enc-text">All biometric data AES-256-GCM encrypted · Never sold</span>
      </div>
    </div>
  );
}

// ── CULTURAL TAB ──────────────────────────────
function CulturalTab({ answers }) {
  const isChickasaw = answers?.tribal?.includes("Chickasaw");
  const isTribal    = answers?.tribal && !answers.tribal.includes("general");
  const wordIdx     = new Date().getDay() % CHIKASHA_WORDS.length;
  const word        = CHIKASHA_WORDS[wordIdx];

  if (!isTribal) {
    return (
      <div>
        <p className="sec-title">Cultural Sovereignty</p>
        <p className="sec-sub">This layer is available for enrolled tribal nation citizens.</p>
        <div className="card" style={{ textAlign: "center", padding: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🦅</div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: C.gold, marginBottom: 8 }}>Tribal Nation Citizens Only</p>
          <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>Cultural sovereignty tools are available for enrolled citizens of federally recognized tribal nations. This layer connects language preservation, governance, and cultural wellness.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="sec-title">Cultural Sovereignty</p>
      <p className="sec-sub">{isChickasaw ? "Chikashshanompa · Chickasaw language and culture." : "Indigenous language and cultural sovereignty tools."}</p>

      <div className="cultural-card fade-up">
        <div className="cultural-label">Today's Word · Chikashshanompa'</div>
        <div className="cultural-word">{word.word}</div>
        <div className="cultural-pronunciation">/{word.pronunciation}/</div>
        <div className="cultural-meaning">{word.meaning}</div>
      </div>

      {[
        { icon: "📖", title: "Language Learning", desc: "Vocabulary, grammar, verb conjugations, ceremonial language", tag: "CFM Powered", tagColor: C.amber, tagBg: "rgba(232,160,32,0.12)" },
        { icon: "🏛️", title: "Governance & Sovereignty", desc: "Tribal law, treaty resources, data sovereignty rights", tag: "Legal", tagColor: C.teal, tagBg: "rgba(0,212,184,0.12)" },
        { icon: "🌿", title: "Traditional Wellness", desc: "Indigenous health practices, seasonal protocols, plant medicine knowledge", tag: "Cultural Health", tagColor: C.green, tagBg: "rgba(62,207,142,0.12)" },
        { icon: "🗺️", title: "Chickasaw History", desc: "Trail of Tears, removal history, resilience and reclamation", tag: "Heritage", tagColor: C.gold, tagBg: "rgba(212,168,67,0.15)" },
      ].map(p => (
        <div className="pillar-row" key={p.title}>
          <div className="pillar-icon-wrap">{p.icon}</div>
          <div>
            <div className="pillar-title">{p.title}</div>
            <div className="pillar-desc">{p.desc}</div>
            <span className="pillar-tag" style={{ background: p.tagBg, color: p.tagColor }}>{p.tag}</span>
          </div>
          <div className="pillar-arrow">›</div>
        </div>
      ))}

      <div className="enc-row">
        <div className="enc-dot" />
        <span className="enc-text">Powered by Chikashshanompa CFM · Sovereign Language Model</span>
      </div>
    </div>
  );
}

// ── CARE TAB ──────────────────────────────────
function CareTab({ answers }) {
  return (
    <div>
      <p className="sec-title">Care Network</p>
      <p className="sec-sub">Your family, your clinical team, and your community. All sovereign.</p>

      {[
        { icon: "👨‍👩‍👧", title: "CareCircle", desc: "Family care coordination, elder monitoring, emergency SMS alerts", tag: "Live", tagColor: C.green, tagBg: "rgba(62,207,142,0.12)", url: "carecircleos.vercel.app" },
        { icon: "🏥", title: "CareIQ Clinical Sync", desc: "FQHC and clinical records. Secure sync from your healthcare provider.", tag: answers?.care?.includes("sync") ? "Connected" : "Not Connected", tagColor: answers?.care?.includes("sync") ? C.green : C.muted, tagBg: answers?.care?.includes("sync") ? "rgba(62,207,142,0.12)" : "rgba(107,128,153,0.12)" },
        { icon: "📡", title: "RPM -- Remote Monitoring", desc: "Your biometric data shared securely with your care team in real time. CMS-reimbursable at $155/mo.", tag: "Beta", tagColor: C.teal, tagBg: "rgba(0,212,184,0.12)" },
        { icon: "🧠", title: "EduIQ", desc: "Child mental health early warning. School-adjacent behavioral health screening.", tag: "Live", tagColor: C.green, tagBg: "rgba(62,207,142,0.12)" },
      ].map(p => (
        <div className="pillar-row" key={p.title}>
          <div className="pillar-icon-wrap">{p.icon}</div>
          <div>
            <div className="pillar-title">{p.title}</div>
            <div className="pillar-desc">{p.desc}</div>
            <span className="pillar-tag" style={{ background: p.tagBg, color: p.tagColor }}>{p.tag}</span>
          </div>
          <div className="pillar-arrow">›</div>
        </div>
      ))}
    </div>
  );
}

// ── LONGEVITY TAB ─────────────────────────────
function LongevityTab() {
  return (
    <div>
      <p className="sec-title">Longevity Protocols</p>
      <p className="sec-sub">Evidence-based biological optimization. LongevityIQ Spa coming to Ada, Oklahoma.</p>

      <div className="card" style={{ background: "linear-gradient(135deg, rgba(212,168,67,0.08), #0d1b2e)", borderColor: "rgba(212,168,67,0.3)", marginBottom: 14 }}>
        <p style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: C.gold, marginBottom: 8, fontWeight: 600 }}>Bio Age Estimate</p>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, color: C.gold, lineHeight: 1 }}>34<span style={{ fontSize: 18, color: C.muted, marginLeft: 4 }}>yrs</span></p>
        <p style={{ fontSize: 12, color: C.muted, marginTop: 8 }}>1 year younger than your chronological age. Keep building.</p>
      </div>

      {[
        { icon: "🧊", title: "Cold Plunge Protocol", desc: "2-3 min at 50-55F. Norepinephrine boost, inflammation reduction", tag: "Recovery" },
        { icon: "🔴", title: "Red Light Therapy", desc: "660nm + 850nm, 10-20 min. Mitochondrial ATP + collagen", tag: "Cellular" },
        { icon: "🧖", title: "Infrared Sauna", desc: "40-60 min at 120-150F. Heat shock proteins, cardiovascular", tag: "Thermal" },
        { icon: "⚡", title: "NAD+ Infusion", desc: "IV NAD+ for DNA repair, sirtuin activation, mental clarity", tag: "Clinical" },
        { icon: "😴", title: "Sleep Restoration", desc: "HRV-guided protocol, magnesium glycinate, circadian anchoring", tag: "Recovery" },
      ].map(p => (
        <div className="pillar-row" key={p.title}>
          <div className="pillar-icon-wrap">{p.icon}</div>
          <div>
            <div className="pillar-title">{p.title}</div>
            <div className="pillar-desc">{p.desc}</div>
            <span className="pillar-tag" style={{ background: "rgba(0,212,184,0.1)", color: C.teal }}>{p.tag}</span>
          </div>
          <div className="pillar-arrow">›</div>
        </div>
      ))}

      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 14, padding: 16, marginTop: 4 }}>
        <p style={{ fontSize: 12, color: C.gold, fontWeight: 600, marginBottom: 6 }}>LongevityIQ Spa -- Coming to Ada, OK</p>
        <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>The first sovereign wellness franchise. Non-clinical launch -- no prescription needed. Franchise locations expanding across rural Oklahoma and Indian Country.</p>
      </div>
    </div>
  );
}

// ── AILT TAB ──────────────────────────────────
function AILTTab() {
  const [messages, setMessages] = useState([{ role: "ai", text: "Welcome. I am your AILT Leadership Advisor -- powered by Adaptive Inclusive Leadership Theory. Ask me about leadership health, psychological safety, sovereignty tension, or how your personal leadership profile connects to your physical wellness." }]);
  const [input, setInput]   = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setLoading(true);
    try {
      const history = messages.map(m => ({ role: m.role === "ai" ? "assistant" : "user", content: m.text }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are an AILT Leadership Advisor built on Adaptive Inclusive Leadership Theory developed by Matthew Culwell, an enrolled Chickasaw citizen and doctoral candidate in Strategic Leadership at Liberty University. AILT has three core constructs: IAC (Inclusive Adaptive Capacity at the organizational level), PS (Psychological Safety at the team level), and ECF (Empathetic Cultural Fluency as a cross-level mediator). You also apply the Sovereignty Tension and Cost of Consistency constructs. Connect leadership health to physical health where relevant. Keep responses to 2-4 sentences unless detail is requested. Never use em dashes.`,
          messages: [...history, { role: "user", content: msg }]
        })
      });
      const data = await res.json();
      const reply = data.content?.find(b => b.type === "text")?.text || "Unable to generate a response. Please try again.";
      setMessages(prev => [...prev, { role: "ai", text: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "Connection error. Please try again." }]);
    } finally { setLoading(false); }
  }

  return (
    <div>
      <p className="sec-title">Leadership Health</p>
      <p className="sec-sub">AILT-powered leadership coaching. Your mind and your mission.</p>

      <div className="score-row">
        {[
          { val: "82", label: "IAC Score" },
          { val: "74", label: "Psych Safety" },
          { val: "88", label: "ECF Score" },
        ].map(s => (
          <div className="score-card" key={s.label}>
            <div className="score-val">{s.val}</div>
            <div className="score-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="chat-area">
        {messages.map((m, i) => <div key={i} className={`msg ${m.role}`}>{m.text}</div>)}
        {loading && <div className="msg thinking">Analyzing...</div>}
        <div ref={bottomRef} />
      </div>
      <div className="chat-row">
        <textarea className="chat-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ask about leadership, sovereignty tension, team health..." rows={1} />
        <button className="chat-send" onClick={send} disabled={loading || !input.trim()}>↑</button>
      </div>
      <div className="enc-row" style={{ marginTop: 10 }}>
        <div className="enc-dot" />
        <span className="enc-text">Powered by AILT · Published · Doctoral Research</span>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────
const TABS = [
  { id: "vitals",    label: "Vitals"    },
  { id: "longevity", label: "Longevity" },
  { id: "cultural",  label: "Culture"   },
  { id: "care",      label: "Care"      },
  { id: "ailt",      label: "Leadership"},
];

export default function SovereignOne() {
  const [onboarded, setOnboarded] = useState(false);
  const [answers, setAnswers]     = useState({});
  const [tab, setTab]             = useState("vitals");
  const vitals = useVitals();

  function handleOnboardComplete(ans) {
    setAnswers(ans);
    setOnboarded(true);
  }

  if (!onboarded) return (
    <>
      <style>{STYLE}</style>
      <Onboarding onComplete={handleOnboardComplete} />
    </>
  );

  const isTribal = answers?.tribal && !answers.tribal.includes("general");

  return (
    <>
      <style>{STYLE}</style>
      <div className="app">
        <div className="hdr">
          <div className="hdr-row">
            <div>
              <div className="wordmark">Sovereign<span>One</span></div>
              <div className="tagline">Your sovereign health identity.</div>
              <div className="co-line">Sovereign Shield Technologies</div>
            </div>
            <div className="shield-badge">
              <div className="sdot" />
              <span className="stext">ZK Shield On</span>
            </div>
          </div>
        </div>

        <div className="nav">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`nav-btn${tab === t.id ? " active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
              {t.id === "cultural" && !isTribal && <span style={{ opacity: 0.4 }}> 🔒</span>}
            </button>
          ))}
        </div>

        <div className="content">
          {tab === "vitals"    && <VitalsTab    vitals={vitals} answers={answers} />}
          {tab === "longevity" && <LongevityTab />}
          {tab === "cultural"  && <CulturalTab  answers={answers} />}
          {tab === "care"      && <CareTab       answers={answers} />}
          {tab === "ailt"      && <AILTTab />}
        </div>
      </div>
    </>
  );
}
