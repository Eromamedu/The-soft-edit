import { useState, type FormEvent } from "react";
import { Check, Loader2, Sparkles } from "lucide-react";
import { COLLECTIONS, QUOTES } from "../data/catalog";
import { isEmail, joinWaitlist } from "../lib/api";
import { Eyebrow, type Go } from "../components/ui";

export default function WaitlistPage({ go }: { go: Go }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<null | { already: boolean }>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim()) return setError("Please tell us your name.");
    if (!isEmail(email)) return setError("Please enter a valid email address.");
    setBusy(true);
    try {
      const r = await joinWaitlist({ name, email, interest });
      setDone({ already: r.alreadyJoined });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const field =
    "min-h-14 w-full border border-[#D7C7D4] bg-[#F7F2EA] px-5 text-sm text-[#5A4037] outline-none transition-all duration-300 placeholder:text-[#98877D] focus:border-[#4B165C] focus:ring-2 focus:ring-[#4B165C]/10";

  return (
    <section className="relative isolate min-h-screen overflow-hidden bg-[#2D1038]">
      <img
        src="https://loremflickr.com/2000/1200/interior,candles,cozy?lock=909"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#2D1038]/95 via-[#4B165C]/85 to-[#30232F]/90" />
      <div className="pointer-events-none absolute inset-4 border border-white/15 sm:inset-8" />
      <div className="pointer-events-none absolute -right-32 top-20 h-[28rem] w-[28rem] rounded-full border border-[#B99A62]/20" />

      <div className="mx-auto grid max-w-[1300px] items-center gap-12 px-6 pb-24 pt-40 sm:px-12 sm:pt-48 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <Eyebrow light>THE WAITLIST</Eyebrow>
          <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-[-0.04em] text-[#F7F2EA] sm:text-6xl lg:text-7xl">
            Be first through
            <br />
            <em className="text-[#E8D2A7]">the door.</em>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-8 text-white/80 sm:text-base">
            New arrivals, restocks and little surprises go to the waitlist first. Add your name and live beautifully
            before everyone else.
          </p>
          <p className="mt-8 font-serif text-xl italic text-[#E8D2A7]">{QUOTES[0]}</p>
        </div>

        <div className="bg-[#FBF7F0] p-7 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10">
          {done ? (
            <div role="status" className="py-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#B99A62] text-[#4B165C]">
                <Check size={28} />
              </div>
              <h2 className="mt-6 font-serif text-3xl italic text-[#4B165C]">
                {done.already ? "You're already on the list." : "You're on the list."}
              </h2>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-[#7A685E]">
                {done.already ? "We have you down already, lovely." : "We'll email you the moment something new arrives."}
              </p>
              <button
                type="button"
                onClick={() => go("/product-line")}
                className="mt-8 bg-[#4B165C] px-8 py-4 text-[10px] font-semibold tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#351043]"
              >
                EXPLORE THE EDIT
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-4">
              <div className="mb-2 flex items-center gap-3 text-[#4B165C]">
                <Sparkles size={20} strokeWidth={1.3} />
                <h2 className="font-serif text-3xl">Join the waitlist</h2>
              </div>

              <label className="block">
                <span className="sr-only">Your name</span>
                <input className={field} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" />
              </label>
              <label className="block">
                <span className="sr-only">Email address</span>
                <input className={field} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" autoComplete="email" />
              </label>
              <label className="block">
                <span className="sr-only">What are you most excited about?</span>
                <select className={field} value={interest} onChange={(e) => setInterest(e.target.value)}>
                  <option value="">What are you most excited about?</option>
                  {COLLECTIONS.map((c) => (
                    <option key={c.slug} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </label>

              {error && <p role="alert" className="text-xs text-[#9A3B3B]">{error}</p>}

              <button
                type="submit"
                disabled={busy}
                className="flex min-h-14 w-full items-center justify-center gap-3 bg-[#4B165C] px-7 text-[10px] font-semibold tracking-[0.16em] text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#351043] disabled:opacity-60"
              >
                {busy && <Loader2 size={16} className="animate-spin" />}
                JOIN THE WAITLIST
              </button>
              <p className="text-center text-[10px] text-[#89766A]">Thoughtful notes, never noise. Unsubscribe whenever you wish.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
