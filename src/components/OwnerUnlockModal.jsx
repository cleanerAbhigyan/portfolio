import React, { useState, useEffect, useRef } from 'react';
import { Lock, KeyRound, X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function OwnerUnlockModal({
  isOpen,
  onClose,
  onSuccess,
  darkMode = true
}) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(null);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctPin = import.meta.env.VITE_CMS_PIN || '2026';

    if (pin.trim() === correctPin) {
      setError(null);
      onSuccess();
      onClose();
    } else {
      setError('Invalid Owner PIN. Access denied.');
      setPin('');
      inputRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div
        className={`relative w-full max-w-sm rounded-2xl border p-6 shadow-2xl transition-all ${
          darkMode
            ? 'bg-zinc-950 border-zinc-800 text-zinc-100 shadow-[0_0_50px_rgba(0,0,0,0.8)]'
            : 'bg-white border-zinc-200 text-zinc-900 shadow-xl'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-200 transition-colors p-1 rounded-lg"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-1">
            <Lock className="w-6 h-6 stroke-[2]" />
          </div>
          <h3 className="text-lg font-bold tracking-tight">Owner CMS Authentication</h3>
          <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
            Enter your secret security PIN to unlock full write access, article editing, and codebase synchronization.
          </p>
        </div>

        {/* PIN Input Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                ref={inputRef}
                type="password"
                inputMode="numeric"
                maxLength={12}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Enter Security PIN (e.g. 2026)"
                className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-sm font-mono tracking-widest text-center focus:outline-none transition-all ${
                  error
                    ? 'border-red-500/80 bg-red-500/10 text-red-200 focus:border-red-500'
                    : darkMode
                      ? 'bg-zinc-900 border-zinc-800 text-zinc-100 focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30'
                      : 'bg-zinc-50 border-zinc-300 text-zinc-900 focus:border-emerald-500'
                }`}
              />
            </div>

            {error && (
              <div className="flex items-center gap-1.5 text-xs text-red-400 pt-1 font-mono">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-2.5 rounded-xl border text-xs font-medium transition-colors ${
                darkMode
                  ? 'border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-300'
                  : 'border-zinc-200 bg-zinc-100 hover:bg-zinc-200 text-zinc-700'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs font-mono transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)]"
            >
              Unlock Access
            </button>
          </div>

          <div className="text-[11px] font-mono text-center text-zinc-500 pt-1">
            Tip: Press <kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">Shift + A</kbd> anytime
          </div>
        </form>
      </div>
    </div>
  );
}
