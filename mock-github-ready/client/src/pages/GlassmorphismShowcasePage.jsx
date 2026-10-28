import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Sliders,
  Copy,
  Check,
  Terminal,
  Activity,
  Mic,
  Video,
  Shield,
  Layers,
  Cpu,
  Code,
  Zap,
  Play,
  RotateCcw,
} from 'lucide-react';

export const GlassmorphismShowcasePage = () => {
  // Interactive glass controls
  const [blur, setBlur] = useState(20);
  const [opacity, setOpacity] = useState(45);
  const [borderAlpha, setBorderAlpha] = useState(20);
  const [theme, setTheme] = useState('cyan'); // 'cyan', 'purple', 'emerald', 'sunset'
  const [copied, setCopied] = useState(false);

  // Simulated live interview room states
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [timerSeconds, setTimerSeconds] = useState(2670); // 44:30
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getThemeGlow = () => {
    switch (theme) {
      case 'purple':
        return {
          glow: 'rgba(168, 85, 247, 0.4)',
          accent: '#a855f7',
          gradient: 'linear-gradient(135deg, #7928ca 0%, #ff0080 100%)',
        };
      case 'emerald':
        return {
          glow: 'rgba(16, 185, 129, 0.4)',
          accent: '#10b981',
          gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        };
      case 'sunset':
        return {
          glow: 'rgba(245, 158, 11, 0.4)',
          accent: '#f59e0b',
          gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
        };
      default: // cyan
        return {
          glow: 'rgba(0, 242, 254, 0.4)',
          accent: '#00f2fe',
          gradient: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
        };
    }
  };

  const currentTheme = getThemeGlow();

  const generatedCss = `/* Next-Gen Glassmorphism Recipe */
.glass-tech-container {
  background: rgba(15, 23, 42, ${opacity / 100});
  backdrop-filter: blur(${blur}px);
  -webkit-backdrop-filter: blur(${blur}px);
  border: 1px solid rgba(255, 255, 255, ${borderAlpha / 100});
  border-radius: 20px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5),
              0 0 30px ${currentTheme.glow};
}`;

  const handleCopyCss = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-4 py-lg-5">
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-3 border border-purple border-opacity-30" style={{ background: 'rgba(121, 40, 202, 0.15)' }}>
            <Sparkles size={16} className="text-pink-400" style={{ color: '#f472b6' }} />
            <span className="font-mono small text-white fw-semibold">Client Presentation Suite</span>
            <span className="badge bg-white bg-opacity-20 text-white font-mono" style={{ fontSize: '0.65rem' }}>MINIMALIST FROST</span>
          </div>

          <h1 className="display-4 fw-bolder font-display text-white mb-3">
            Minimalism & <span className="text-gradient-purple">Glassmorphism</span> Showcase
          </h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: 680 }}>
            Precision-crafted frosted glass interfaces with real-time blur attenuation, dynamic ambient glow,
            and high-tech interview orchestration widgets.
          </p>
        </div>

        {/* Live Glass Customizer Toolbar */}
        <div className="glass-panel p-4 mb-5 border border-secondary border-opacity-25 shadow-lg">
          <div className="row align-items-center g-4">
            <div className="col-lg-3 col-md-6">
              <label className="form-label text-light font-mono text-xs text-uppercase d-flex justify-content-between mb-1">
                <span>Backdrop Blur</span>
                <span className="text-info">{blur}px</span>
              </label>
              <input
                type="range"
                className="form-range"
                min="4"
                max="40"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
              />
            </div>

            <div className="col-lg-3 col-md-6">
              <label className="form-label text-light font-mono text-xs text-uppercase d-flex justify-content-between mb-1">
                <span>Glass Opacity</span>
                <span className="text-info">{opacity}%</span>
              </label>
              <input
                type="range"
                className="form-range"
                min="10"
                max="80"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
              />
            </div>

            <div className="col-lg-3 col-md-6">
              <label className="form-label text-light font-mono text-xs text-uppercase d-flex justify-content-between mb-1">
                <span>Border Alpha</span>
                <span className="text-info">{borderAlpha}%</span>
              </label>
              <input
                type="range"
                className="form-range"
                min="5"
                max="45"
                value={borderAlpha}
                onChange={(e) => setBorderAlpha(Number(e.target.value))}
              />
            </div>

            <div className="col-lg-3 col-md-6">
              <label className="form-label text-light font-mono text-xs text-uppercase mb-1">
                Ambient Accent Aura
              </label>
              <div className="d-flex gap-2">
                {[
                  { id: 'cyan', color: '#00f2fe' },
                  { id: 'purple', color: '#a855f7' },
                  { id: 'emerald', color: '#10b981' },
                  { id: 'sunset', color: '#f59e0b' },
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setTheme(th.id)}
                    className="btn p-0 rounded-circle"
                    style={{
                      width: 28,
                      height: 28,
                      backgroundColor: th.color,
                      border: theme === th.id ? '2px solid #fff' : '2px solid transparent',
                      boxShadow: theme === th.id ? `0 0 10px ${th.color}` : 'none',
                    }}
                    title={`${th.id} aura`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Frosted Glass Grid */}
        <div className="row g-4 mb-5">
          {/* Card 1: Interactive Live Mock Room Terminal */}
          <div className="col-lg-7">
            <div
              className="p-4 p-md-5 h-100 position-relative overflow-hidden"
              style={{
                background: `rgba(15, 23, 42, ${opacity / 100})`,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                border: `1px solid rgba(255, 255, 255, ${borderAlpha / 100})`,
                borderRadius: 24,
                boxShadow: `0 20px 50px rgba(0, 0, 0, 0.5), 0 0 35px ${currentTheme.glow}`,
                transition: 'all 0.3s ease',
              }}
            >
              {/* Terminal Window Header */}
              <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-white border-opacity-10">
                <div className="d-flex align-items-center gap-2">
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }}></div>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }}></div>
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }}></div>
                  <span className="ms-2 font-mono text-muted small">interview-sandbox://google-l5/session</span>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <span className="pulse-dot pulse-dot-green"></span>
                  <span className="font-mono text-white text-xs">RECORDING • 1080P</span>
                </div>
              </div>

              {/* Whiteboard / Code Sandbox Simulation */}
              <div className="p-3 rounded-3 mb-4" style={{ background: 'rgba(5, 8, 16, 0.7)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted font-mono text-xs">// Distributed LRU Cache Implementation</span>
                  <span className="badge bg-primary bg-opacity-20 text-info font-mono" style={{ fontSize: '0.65rem' }}>Python 3.12</span>
                </div>
                <pre className="font-mono text-light mb-0" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                  <span className="text-secondary">class</span> <span className="text-warning">DistributedLRUCache</span>:<br />
                  &nbsp;&nbsp;<span className="text-secondary">def</span> <span className="text-info">__init__</span>(self, capacity: <span className="text-success">int</span>):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;self.capacity = capacity<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;self.cache = OrderedDict()<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;self.lock = asyncio.Lock()  <span className="text-muted"># Concurrency control</span><br />
                  <br />
                  &nbsp;&nbsp;<span className="text-secondary">async def</span> <span className="text-info">get</span>(self, key: <span className="text-success">str</span>) -&gt; <span className="text-success">Any</span>:<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-secondary">async with</span> self.lock:<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-secondary">if</span> key <span className="text-secondary">not in</span> self.cache: <span className="text-secondary">return</span> <span className="text-danger">None</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.cache.move_to_end(key)<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-secondary">return</span> self.cache[key]
                </pre>
              </div>

              {/* Audio Waveform Simulator */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center text-xs font-mono text-muted mb-2">
                  <span className="d-flex align-items-center gap-1.5 text-white">
                    <Activity size={14} className="text-info" /> Audio Stream: Candidate Speech
                  </span>
                  <span className="text-success">Clear • 48kHz</span>
                </div>
                <div className="d-flex align-items-center gap-1 justify-content-between py-2 px-3 rounded-2" style={{ background: 'rgba(255, 255, 255, 0.04)', height: 38 }}>
                  {[30, 65, 45, 80, 95, 60, 40, 75, 100, 85, 55, 70, 90, 45, 65, 85, 50, 75, 30, 60, 90, 70, 40, 80, 60].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        width: 3,
                        height: `${h}%`,
                        backgroundColor: currentTheme.accent,
                        borderRadius: 2,
                        opacity: 0.8,
                        transition: 'height 0.2s ease',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Interactive Room Action Bar */}
              <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 pt-3 border-top border-white border-opacity-10">
                <div className="d-flex align-items-center gap-2">
                  <button
                    onClick={() => setIsMicOn(!isMicOn)}
                    className={`btn btn-sm ${isMicOn ? 'btn-tech-secondary' : 'btn-danger'} px-3 py-1.5 d-flex align-items-center gap-1.5`}
                  >
                    <Mic size={15} />
                    <span className="text-xs">{isMicOn ? 'Mute' : 'Unmuted'}</span>
                  </button>
                  <button
                    onClick={() => setIsVideoOn(!isVideoOn)}
                    className={`btn btn-sm ${isVideoOn ? 'btn-tech-secondary' : 'btn-danger'} px-3 py-1.5 d-flex align-items-center gap-1.5`}
                  >
                    <Video size={15} />
                    <span className="text-xs">{isVideoOn ? 'Stop Video' : 'Start Video'}</span>
                  </button>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <span className="font-mono text-warning fw-bold fs-6">{formatTimer(timerSeconds)}</span>
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="btn btn-sm btn-outline-secondary p-1.5"
                    title={isTimerRunning ? 'Pause Session Timer' : 'Resume Timer'}
                  >
                    <Play size={14} />
                  </button>
                  <button
                    onClick={() => setTimerSeconds(2700)}
                    className="btn btn-sm btn-outline-secondary p-1.5"
                    title="Reset Session Timer"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Minimalist Glass Interview Session Pass */}
          <div className="col-lg-5">
            <div
              className="p-4 p-md-5 h-100 position-relative d-flex flex-column justify-content-between"
              style={{
                background: `rgba(15, 23, 42, ${opacity / 100})`,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                border: `1px solid rgba(255, 255, 255, ${borderAlpha / 100})`,
                borderRadius: 24,
                boxShadow: `0 20px 50px rgba(0, 0, 0, 0.5), 0 0 35px ${currentTheme.glow}`,
                transition: 'all 0.3s ease',
              }}
            >
              <div>
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div>
                    <span className="text-muted font-mono text-xs text-uppercase">VERIFIED SESSION PASS</span>
                    <h3 className="font-display text-white fw-bold mb-0">Google L5 System Design</h3>
                  </div>
                  <span className="badge font-mono" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                    CONFIRMED
                  </span>
                </div>

                {/* Candidate Info Frosted Block */}
                <div className="glass-panel p-3 mb-4" style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
                      alt="Alex Chen"
                      className="rounded-circle"
                      style={{ width: 48, height: 48, objectFit: 'cover', border: '2px solid rgba(0, 242, 254, 0.4)' }}
                    />
                    <div>
                      <div className="text-white fw-semibold">Alex Chen</div>
                      <div className="text-muted small">alex.chen@mockinterview.pro</div>
                      <div className="text-info font-mono" style={{ fontSize: '0.72rem' }}>Role: Entitled Candidate</div>
                    </div>
                  </div>
                </div>

                {/* Session Breakdown Details */}
                <div className="row g-2 mb-4 font-mono text-xs">
                  <div className="col-6">
                    <div className="p-2.5 rounded-2" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                      <span className="text-muted d-block">TARGET COMPANY</span>
                      <span className="text-white fw-bold fs-6">Google Cloud</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2.5 rounded-2" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                      <span className="text-muted d-block">SESSION PROTOCOL</span>
                      <span className="text-white fw-bold fs-6">WebRTC / 60 Min</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2.5 rounded-2" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                      <span className="text-muted d-block">INTERVIEWER</span>
                      <span className="text-white fw-bold">Marcus Vance</span>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2.5 rounded-2" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                      <span className="text-muted d-block">VERIFICATION</span>
                      <span className="text-success fw-bold">SHA-256 Valid</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Room Join Button */}
              <div>
                <a
                  href="#simulate-room"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('Connecting to WebRTC encrypted room: room-google-l5-sd...');
                  }}
                  className="btn btn-tech-primary w-100 py-3 d-flex align-items-center justify-content-center gap-2"
                >
                  <Zap size={18} />
                  <span>Enter Encrypted Interview Room</span>
                </a>
                <div className="text-center mt-2">
                  <span className="text-muted font-mono" style={{ fontSize: '0.68rem' }}>
                    Zero-latency end-to-end sandbox
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live CSS Export Card */}
        <div className="glass-panel p-4 position-relative">
          <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-3">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <Code size={18} className="text-info" />
                <h4 className="text-white font-display fw-bold mb-0">Export Glassmorphism Recipe</h4>
              </div>
              <p className="text-muted small mb-0">
                Live computed CSS variables matching the dynamic sliders above.
              </p>
            </div>

            <button
              onClick={handleCopyCss}
              className="btn btn-tech-secondary d-flex align-items-center gap-2"
            >
              {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Glass CSS'}</span>
            </button>
          </div>

          <pre className="font-mono text-info p-3 rounded-3 mb-0" style={{ background: 'rgba(7, 10, 19, 0.85)', fontSize: '0.82rem', overflowX: 'auto' }}>
            {generatedCss}
          </pre>
        </div>
      </div>
    </div>
  );
};
