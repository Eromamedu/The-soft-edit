import { useEffect, useState } from "react";
import { X } from "lucide-react";
import DiscountForm from "./DiscountForm";
import { DISCOUNT_PERCENT } from "../lib/api";

const SEEN_KEY = "softEditWelcomeSeen";

export default function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (seen) return;
    const t = window.setTimeout(() => setOpen(true), 1200);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    try {
      window.localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10050] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Get ${DISCOUNT_PERCENT}% off your first order`}>
      <button type="button" aria-label="Close" onClick={close} className="absolute inset-0 h-full w-full bg-[#211625]/70 backdrop-blur-[4px]" />

      <div className="relative grid max-h-[92vh] w-full max-w-3xl overflow-y-auto bg-[#FBF7F0] shadow-2xl md:grid-cols-[0.9fr_1.1fr]" style={{ animation: "softPopIn 700ms cubic-bezier(0.2,0.7,0.2,1) both" }}>
        <div className="relative hidden min-h-[460px] md:block">
          <img src="https://loremflickr.com/800/1000/candles,interior,cozy?lock=777" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D1038]/85 via-[#4B165C]/30 to-transparent" />
          <p className="absolute inset-x-8 bottom-8 font-serif text-3xl italic leading-snug text-[#F7F2EA]">Live beautifully.</p>
        </div>

        <div className="p-7 sm:p-10">
          <button type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#E6D9CA] text-[#4B165C] transition-all duration-300 hover:rotate-90 hover:bg-[#EFE6DC]">
            <X size={18} />
          </button>

          <div className="flex items-center gap-3 text-[10px] tracking-[0.24em] text-[#7D8768]">
            <span className="h-px w-8 bg-[#B99A62]" /> WELCOME TO THE SOFT EDIT
          </div>
          <h2 className="mt-5 font-serif text-4xl leading-[1.08] tracking-[-0.03em] text-[#4B165C] sm:text-5xl">
            Get {DISCOUNT_PERCENT}% off
            <br />
            <em className="text-[#9A8061]">your first order.</em>
          </h2>
          <p className="mb-6 mt-4 text-sm leading-7 text-[#7A685E]">
            It's literally The Soft Edit. Join us and we'll send your code straight away.
          </p>

          <DiscountForm />

          <button type="button" onClick={close} className="mt-5 text-[11px] text-[#98877D] underline underline-offset-4 hover:text-[#4B165C]">
            No thanks, I'll just browse
          </button>
        </div>
      </div>

      <style>{`@keyframes softPopIn { from { opacity: 0; transform: translateY(24px) scale(.97); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}
