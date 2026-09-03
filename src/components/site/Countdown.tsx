import { useEffect, useState } from "react";

const CYCLE_MS = 2 * 24 * 60 * 60 * 1000; // perpetual 2-day cycle
const KEY = "hs_offer_deadline";

function remaining() {
  const now = Date.now();
  let deadline = Number(localStorage.getItem(KEY));
  if (!deadline || Number.isNaN(deadline) || deadline <= now) {
    // Auto-reset: a fresh 2-day window starts the moment the timer hits zero.
    deadline = now + CYCLE_MS;
    localStorage.setItem(KEY, String(deadline));
  }
  return deadline - now;
}


function parts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        key={value}
        className="tick-animate surface-card min-w-14 rounded-lg px-3 py-2 text-center font-display text-2xl font-bold tabular-nums text-foreground sm:min-w-16 sm:text-3xl"
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="mt-1 text-[0.65rem] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ compact = false }: { compact?: boolean }) {
  const [ms, setMs] = useState(CYCLE_MS);

  useEffect(() => {
    setMs(remaining());
    const id = setInterval(() => setMs(remaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const t = parts(ms);

  return (
    <div className={compact ? "flex items-center gap-2" : "flex items-end gap-3"}>
      <Unit value={t.days} label="Days" />
      <Unit value={t.hours} label="Hours" />
      <Unit value={t.minutes} label="Mins" />
      <Unit value={t.seconds} label="Secs" />
    </div>
  );
}
