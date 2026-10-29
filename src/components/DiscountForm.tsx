import { useState, type FormEvent } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import { DISCOUNT_PERCENT, isEmail, requestDiscountCode } from "../lib/api";

/** Name + email -> unique 10% code. Used by the welcome popup and the footer. */
export default function DiscountForm({ dark = false, onDone }: { dark?: boolean; onDone?: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Please tell us your name.");
    if (!isEmail(email)) return setError("Please enter a valid email address.");

    setBusy(true);
    try {
      const res = await requestDiscountCode({ name, email });
      setCode(res.code);
      try {
        window.localStorage.setItem("softEditDiscountCode", res.code);
      } catch {
        /* ignore */
      }
      onDone?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const input = dark
    ? "border-white/25 bg-white/[0.06] text-[#FFF9EF] placeholder:text-white/45 focus:border-[#D9BE8B]"
    : "border-[#D7C7D4] bg-[#F7F2EA] text-[#5A4037] placeholder:text-[#98877D] focus:border-[#4B165C]";

  if (code) {
    return (
      <div role="status" className={`border px-6 py-7 text-center ${dark ? "border-[#B99A62]/60 bg-white/[0.05]" : "border-[#B99A62] bg-[#F7F2EA]"}`}>
        <Check className={`mx-auto ${dark ? "text-[#D9BE8B]" : "text-[#4B165C]"}`} size={26} />
        <p className={`mt-3 font-serif text-xl italic ${dark ? "text-[#F7F2EA]" : "text-[#4B165C]"}`}>Your {DISCOUNT_PERCENT}% code is ready</p>
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard?.writeText(code);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
          }}
          className={`mx-auto mt-4 flex items-center gap-3 border border-dashed px-6 py-3 font-mono text-lg tracking-[0.18em] ${
            dark ? "border-[#D9BE8B] text-[#E9CDA0]" : "border-[#4B165C] text-[#4B165C]"
          }`}
        >
          {code} {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
        <p className={`mt-4 text-xs leading-6 ${dark ? "text-white/60" : "text-[#89766A]"}`}>
          We've also sent it to {email}. Enter it at checkout for {DISCOUNT_PERCENT}% off your first order.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-3">
      <input
        type="text"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        aria-label="Your name"
        className={`min-h-14 w-full border px-5 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#B99A62]/30 ${input}`}
      />
      <input
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        aria-label="Your email address"
        className={`min-h-14 w-full border px-5 text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-[#B99A62]/30 ${input}`}
      />
      {error && <p role="alert" className={`text-xs ${dark ? "text-[#F2B8B8]" : "text-[#9A3B3B]"}`}>{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className={`flex min-h-14 w-full items-center justify-center gap-3 px-7 text-[10px] font-semibold tracking-[0.16em] transition-all duration-500 hover:-translate-y-0.5 disabled:opacity-60 ${
          dark ? "bg-[#B99A62] text-[#30232F] hover:bg-[#D9BE8B]" : "bg-[#4B165C] text-white hover:bg-[#351043]"
        }`}
      >
        {busy && <Loader2 size={16} className="animate-spin" />}
        SEND MY {DISCOUNT_PERCENT}% CODE
      </button>
    </form>
  );
}
