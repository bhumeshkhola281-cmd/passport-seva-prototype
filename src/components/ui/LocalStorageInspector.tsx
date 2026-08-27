import React, { useState, useEffect } from 'react';
import { useApplication } from '../../context/ApplicationContext';
import { 
  Database, 
  ChevronUp, 
  ChevronDown, 
  Copy, 
  Check, 
  Download, 
  Trash2, 
  ShieldCheck, 
  WifiOff, 
  RefreshCw, 
  ExternalLink,
  Code2
} from 'lucide-react';

export function LocalStorageInspector() {
  const { draft, dispatch, savedStatus } = useApplication();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liveRawStorage, setLiveRawStorage] = useState<string>('');
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString());
  const [activeTab, setActiveTab] = useState<'json' | 'stats'>('json');

  const STORAGE_KEY = 'safar-ledger-draft';

  // Read directly from browser window.localStorage to prove mechanically it's in storage
  const refreshFromStorage = () => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      setLiveRawStorage(raw || '{}');
      setLastSyncTime(new Date().toLocaleTimeString());
    } catch {
      setLiveRawStorage('{}');
    }
  };

  useEffect(() => {
    refreshFromStorage();
  }, [draft, savedStatus]);

  // Listen for custom open event if triggered from About page
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-storage-inspector', handleOpenEvent);
    return () => window.removeEventListener('open-storage-inspector', handleOpenEvent);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(liveRawStorage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([liveRawStorage], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `passport-seva-draft-${draft.id || 'export'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to reset your local draft storage?')) {
      dispatch({ type: 'RESET' });
      refreshFromStorage();
    }
  };

  const byteSize = new Blob([liveRawStorage]).size;
  const formattedSize = byteSize > 1024 ? `${(byteSize / 1024).toFixed(2)} KB` : `${byteSize} B`;

  return (
    <aside
      aria-label="Local Data Vault Inspector"
      className="fixed bottom-4 right-4 z-50 transition-all duration-300 font-ui"
      style={{ maxWidth: 'calc(100vw - 32px)' }}
    >
      {/* ── Collapsed Pill Trigger ── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 px-4 py-2.5 rounded-full shadow-2xl transition-all duration-200 hover:scale-105"
          style={{
            background: 'rgba(18, 18, 20, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(6, 182, 212, 0.35)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(6, 182, 212, 0.2)',
          }}
          title="Inspect real-time browser storage (Mechanical Trust Proof)"
        >
          <div className="relative flex items-center justify-center">
            <Database className="w-4 h-4" style={{ color: '#06b6d4' }} />
            <span
              className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${
                savedStatus === 'saving' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'
              }`}
            />
          </div>

          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold tracking-wide" style={{ color: '#ffffff' }}>
                Local Data Vault
              </span>
              <span 
                className="text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold"
                style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#38bdf8' }}
              >
                LIVE
              </span>
            </div>
            <span className="text-[10px]" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {formattedSize} &middot; Inspect raw JSON
            </span>
          </div>

          <ChevronUp className="w-4 h-4 ml-1 transition-transform group-hover:-translate-y-0.5" style={{ color: '#06b6d4' }} />
        </button>
      )}

      {/* ── Expanded Inspector Drawer Panel ── */}
      {isOpen && (
        <div
          className="rounded-2xl overflow-hidden shadow-2xl flex flex-col animate-fadeInUp"
          style={{
            width: '460px',
            maxWidth: 'calc(100vw - 32px)',
            height: '520px',
            maxHeight: 'calc(100vh - 40px)',
            background: 'rgba(14, 14, 17, 0.95)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(6, 182, 212, 0.15)',
          }}
        >
          {/* Header */}
          <div
            className="px-4 py-3 border-b flex items-center justify-between"
            style={{ borderColor: 'rgba(255, 255, 255, 0.08)', background: 'rgba(255, 255, 255, 0.02)' }}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg" style={{ background: 'rgba(6, 182, 212, 0.12)' }}>
                <Database className="w-4 h-4" style={{ color: '#06b6d4' }} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold tracking-tight text-white">
                    Live Client Storage Vault
                  </h2>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    MECHANICALLY VERIFIABLE
                  </span>
                </div>
                <p className="text-[11px]" style={{ color: 'rgba(255, 255, 255, 0.45)' }}>
                  Read directly from <code className="font-mono text-cyan-300">window.localStorage</code>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              title="Collapse Inspector"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Verification Proof Banner */}
          <div
            className="px-4 py-2 border-b flex items-center justify-between text-xs"
            style={{ 
              background: 'linear-gradient(90deg, rgba(6, 182, 212, 0.08) 0%, rgba(56, 189, 248, 0.04) 100%)',
              borderColor: 'rgba(255, 255, 255, 0.06)' 
            }}
          >
            <div className="flex items-center gap-2" style={{ color: '#38bdf8' }}>
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-[11px] font-medium">0 bytes transmitted to any server</span>
            </div>
            <div className="flex items-center gap-1 text-[11px]" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              <WifiOff className="w-3 h-3 text-emerald-400" />
              <span>Offline Sandbox</span>
            </div>
          </div>

          {/* Sub-Header Toolbar / Tabs */}
          <div
            className="px-4 py-2 flex items-center justify-between border-b text-xs"
            style={{ borderColor: 'rgba(255, 255, 255, 0.06)', background: 'rgba(0, 0, 0, 0.2)' }}
          >
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('json')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  activeTab === 'json' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Raw JSON ({formattedSize})
              </button>
              <button
                onClick={() => setActiveTab('stats')}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                  activeTab === 'stats' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Verification Guide
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={refreshFromStorage}
                className="p-1 rounded transition-colors hover:bg-white/10 text-zinc-400 hover:text-cyan-300"
                title="Force re-read from localStorage"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold transition-colors bg-white/5 hover:bg-white/10 text-zinc-200"
                title="Copy raw JSON"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="p-1 rounded transition-colors hover:bg-white/10 text-zinc-400 hover:text-cyan-300"
                title="Export JSON file"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleClear}
                className="p-1 rounded transition-colors hover:bg-red-500/20 text-zinc-400 hover:text-red-400"
                title="Clear local storage draft"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-auto p-3 font-mono text-xs">
            {activeTab === 'json' ? (
              <div className="relative">
                <pre
                  className="p-3 rounded-xl overflow-x-auto leading-relaxed text-zinc-300 select-text"
                  style={{
                    background: '#09090b',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    fontSize: '11px',
                  }}
                >
                  <code>{JSON.stringify(JSON.parse(liveRawStorage || '{}'), null, 2)}</code>
                </pre>
              </div>
            ) : (
              <div className="font-ui p-2 space-y-3 text-zinc-300 text-xs">
                <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40">
                  <h3 className="font-bold text-cyan-300 flex items-center gap-1.5 mb-1 text-xs">
                    <Code2 className="w-3.5 h-3.5" /> How to independently verify this in DevTools
                  </h3>
                  <p className="text-[11px] leading-relaxed text-zinc-300">
                    Don't take our code's word for it. Open your browser's developer console right now:
                  </p>
                  <ol className="list-decimal list-inside text-[11px] mt-1.5 space-y-1 text-zinc-300">
                    <li>Press <kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-mono">F12</kbd> or <kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-mono">Ctrl+Shift+I</kbd></li>
                    <li>Navigate to the <strong>Application</strong> tab (or <strong>Storage</strong> in Firefox)</li>
                    <li>Expand <strong>Local Storage</strong> &rarr; <span className="font-mono text-cyan-300">{window.location.origin}</span></li>
                    <li>Look for key <span className="font-mono text-amber-300">{STORAGE_KEY}</span></li>
                    <li>Type in the form and watch the value update in DevTools in real time!</li>
                  </ol>
                </div>

                <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-zinc-400">Storage Key:</span>
                    <span className="font-mono text-cyan-400">{STORAGE_KEY}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-zinc-400">Total Payload Size:</span>
                    <span className="text-zinc-200">{formattedSize} ({byteSize} bytes)</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-zinc-400">Last Synced to Disk:</span>
                    <span className="text-zinc-200">{lastSyncTime}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-zinc-400">Active Journey ID:</span>
                    <span className="font-mono text-zinc-200">{draft.id || 'None'}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-zinc-400">Completed Stages:</span>
                    <span className="font-mono text-emerald-400">[{draft.completedStages.join(', ')}]</span>
                  </div>
                </div>

                <p className="text-[10px] text-zinc-400 italic text-center">
                  All state manipulation uses immutable React reducers synced atomically to client disk.
                </p>
              </div>
            )}
          </div>

          {/* Footer Status Bar */}
          <div
            className="px-4 py-2 border-t flex items-center justify-between text-[10px]"
            style={{ borderColor: 'rgba(255, 255, 255, 0.08)', background: 'rgba(0, 0, 0, 0.3)' }}
          >
            <div className="flex items-center gap-1.5 text-zinc-400">
              <span className={`w-1.5 h-1.5 rounded-full ${savedStatus === 'saving' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
              <span>Storage Status: {savedStatus === 'saving' ? 'Writing...' : 'Synchronized'}</span>
            </div>
            <span className="text-zinc-400">
              Updated at {lastSyncTime}
            </span>
          </div>
        </div>
      )}
    </aside>
  );
}
