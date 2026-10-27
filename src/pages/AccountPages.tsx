import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Heart,
  Leaf,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import AccountDashboard from "./AccountDashboard";
import { supabase } from "../lib/supabase";

type AccountPageProps = {
  onNavigateHome?: () => void;
};

const editorialSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=2000&q=90",
    eyebrow: "YOUR MOMENT, YOUR RITUAL",
    title: "Beauty in",
    emphasis: "your own",
    ending: "rhythm.",
    description:
      "Thoughtful essentials. Intentional rituals. A softer way to care for yourself, every single day.",
    signature: "CARE, CURATED.",
    background:
      "linear-gradient(125deg, rgba(75,22,92,.66), rgba(90,64,55,.18), rgba(185,154,98,.3))",
    accent: "#B99A62",
  },
  {
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=2000&q=90",
    eyebrow: "A SOFTER KIND OF GLOW",
    title: "Let your",
    emphasis: "natural",
    ending: "glow.",
    description:
      "Discover thoughtful skincare essentials that make caring for your skin feel like a beautiful ritual.",
    signature: "GLOW, GENTLY.",
    background:
      "linear-gradient(125deg, rgba(75,22,92,.62), rgba(125,135,104,.35), rgba(90,64,55,.2))",
    accent: "#D6BE8C",
  },
  {
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=2000&q=90",
    eyebrow: "SKINCARE, REIMAGINED",
    title: "Little rituals.",
    emphasis: "lovely",
    ending: "results.",
    description:
      "Make room for the small moments that leave your skin feeling cared for and your mind feeling calm.",
    signature: "YOUR DAILY EDIT.",
    background:
      "linear-gradient(125deg, rgba(75,22,92,.7), rgba(190,130,155,.3), rgba(185,154,98,.25))",
    accent: "#E0C39A",
  },
  {
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=2000&q=90",
    eyebrow: "THOUGHTFULLY CHOSEN",
    title: "Only what",
    emphasis: "feels",
    ending: "right.",
    description:
      "Explore considered beauty favourites selected to bring a little more intention to your everyday.",
    signature: "LESS, BUT LOVELIER.",
    background:
      "linear-gradient(125deg, rgba(75,22,92,.64), rgba(125,135,104,.38), rgba(247,242,234,.1))",
    accent: "#C9D0AB",
  },
  {
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2000&q=90",
    eyebrow: "YOUR SKIN, YOUR STORY",
    title: "Care that",
    emphasis: "feels like",
    ending: "you.",
    description:
      "Because your beauty routine should feel personal, effortless and entirely your own.",
    signature: "BEAUTIFULLY YOU.",
    background:
      "linear-gradient(125deg, rgba(75,22,92,.7), rgba(185,154,98,.3), rgba(201,157,175,.23))",
    accent: "#E2C3D4",
  },
  {
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=2000&q=90",
    eyebrow: "MAKE SPACE FOR YOU",
    title: "Come back",
    emphasis: "to",
    ending: "yourself.",
    description:
      "Pause, reset and rediscover the joy of caring for yourself, one thoughtful moment at a time.",
    signature: "A MOMENT JUST FOR YOU.",
    background:
      "linear-gradient(125deg, rgba(75,22,92,.67), rgba(90,64,55,.32), rgba(125,135,104,.3))",
    accent: "#D8C18B",
  },
];

const serif = {
  fontFamily: '"Canossa", "Bodoni MT", Didot, "Cormorant Garamond", Georgia, serif',
};

function BrandMark({ onClick }: { onClick: () => void }) {
  return (
    <a
      href="/"
      aria-label="The Soft Edit homepage"
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
      className="group inline-flex min-w-0 items-center gap-2.5 outline-none sm:gap-3"
    >
      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#B99A62]/60 bg-[#F7F2EA] p-1 shadow-[0_8px_30px_rgba(0,0,0,.18)] transition duration-700 group-hover:rotate-[-8deg] group-hover:scale-105 sm:h-14 sm:w-14">
        <img
          src="/images/real-logo.jpg"
          alt="The Soft Edit"
          className="h-full w-full rounded-full object-contain"
        />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="font-serif text-sm tracking-[.13em] text-[#F7F2EA] sm:text-lg">
          THE SOFT EDIT
        </span>
        <span className="mt-1 text-[7px] tracking-[.25em] text-[#E4D2AF] sm:text-[9px] sm:tracking-[.3em]">
          YOUR BEAUTY, YOUR WAY
        </span>
      </span>
    </a>
  );
}

function AccountLayout({
  children,
  onNavigateHome,
  mode,
}: {
  children: ReactNode;
  onNavigateHome: () => void;
  mode: "login" | "register";
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = editorialSlides[activeSlide];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % editorialSlides.length);
    }, 5200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#211525] text-[#F7F2EA] selection:bg-[#B99A62]/35 selection:text-white">
      {/* Full-screen cinematic skincare slideshow */}
      <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden" aria-hidden="true">
        {editorialSlides.map((item, index) => (
          <img
            key={item.image}
            src={item.image}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[2200ms] ease-in-out ${
              activeSlide === index
                ? "scale-100 opacity-100"
                : "scale-[1.1] opacity-0"
            }`}
          />
        ))}
        <div
          className="absolute inset-0 transition-[background] duration-[1800ms]"
          style={{ background: slide.background }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#211525]/90 via-[#211525]/65 to-[#211525]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#211525]/85 via-[#211525]/15 to-[#211525]/50" />
        <div className="absolute -left-40 -top-40 h-[460px] w-[460px] animate-[pulse_9s_ease-in-out_infinite] rounded-full bg-[#4B165C]/45 blur-[110px]" />
        <div className="absolute -right-40 top-[10%] h-[440px] w-[440px] animate-[pulse_11s_ease-in-out_infinite] rounded-full bg-[#B99A62]/25 blur-[110px]" />
        <div className="absolute -bottom-48 left-[20%] h-[470px] w-[470px] animate-[pulse_12s_ease-in-out_infinite] rounded-full bg-[#7D8768]/25 blur-[120px]" />
        <div className="absolute bottom-[8%] right-[6%] h-[330px] w-[330px] animate-[pulse_10s_ease-in-out_infinite] rounded-full bg-[#C99DAF]/20 blur-[100px]" />
        <div className="absolute left-[12%] top-[24%] h-2 w-2 animate-[bounce_4s_ease-in-out_infinite] rounded-full bg-[#D6BE8C] shadow-[0_0_26px_rgba(185,154,98,.95)]" />
        <div className="absolute right-[17%] top-[42%] h-2.5 w-2.5 animate-[pulse_3s_ease-in-out_infinite] rounded-full bg-white/80 shadow-[0_0_30px_rgba(247,242,234,.75)]" />
        <div className="absolute bottom-[22%] left-[47%] h-2 w-2 animate-ping rounded-full bg-[#B99A62]/70" />
        <div className="absolute right-[10%] top-[17%] hidden h-52 w-52 animate-[spin_42s_linear_infinite] rounded-full border border-[#D6BE8C]/25 lg:block" />
        <div className="absolute right-[calc(10%+25px)] top-[calc(17%+25px)] hidden h-[154px] w-[154px] animate-[spin_28s_linear_infinite_reverse] rounded-full border border-dashed border-white/15 lg:block" />
        <div className="absolute inset-0 opacity-[.09] [background-image:radial-gradient(rgba(255,255,255,.7)_0.6px,transparent_.6px)] [background-size:5px_5px]" />
      </div>

      <header className="relative z-30 mx-auto flex w-full max-w-[1900px] items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-5 lg:px-12">
        <BrandMark onClick={onNavigateHome} />
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            onNavigateHome();
          }}
          className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 bg-[#211525]/35 px-3.5 py-2.5 text-[11px] text-[#F7F2EA] shadow-lg backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:border-[#B99A62]/75 hover:bg-[#4B165C]/55 sm:px-5 sm:text-sm"
        >
          <ArrowLeft size={15} className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="hidden xs:inline">Back to the store</span>
          <span className="xs:hidden">Store</span>
        </a>
      </header>

      {/* Wide form column, editorial story column */}
      <section className="relative z-10 mx-auto grid w-full max-w-[1800px] grid-cols-1 items-center gap-8 px-4 pb-8 pt-2 sm:px-7 md:gap-10 lg:min-h-[calc(100svh-145px)] lg:grid-cols-[minmax(0,720px)_minmax(0,1fr)] lg:gap-12 lg:px-10 lg:pb-10 xl:gap-20 xl:px-14 2xl:gap-24">
        <section
          className={`group/panel relative mx-auto w-full max-w-[720px] overflow-hidden rounded-[26px] border border-white/65 bg-[#F7F2EA]/[.97] text-[#5A4037] shadow-[0_35px_120px_rgba(12,5,16,.48)] backdrop-blur-2xl transition duration-700 hover:shadow-[0_40px_140px_rgba(12,5,16,.58)] sm:rounded-[32px] lg:mx-0 ${
            mode === "register" ? "lg:my-4" : ""
          }`}
        >
          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#4B165C] via-[#D6BE8C] to-[#7D8768]" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#B99A62]/15 blur-[70px] transition-transform duration-1000 group-hover/panel:scale-125" />
          <div className="pointer-events-none absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-[#4B165C]/10 blur-[75px]" />

          <div className="relative z-10 px-5 pb-5 pt-7 sm:px-8 sm:pb-7 sm:pt-9 lg:px-10 lg:pb-7 lg:pt-8 xl:px-12">
            {/* Editorial intro is shown here only on smaller screens */}
            <div className="mb-6 lg:hidden">
              <div className="mb-2 flex items-center gap-2 text-[9px] font-semibold tracking-[.2em] text-[#7D8768]">
                <Sparkles size={13} className="text-[#B99A62]" />
                {slide.eyebrow}
              </div>
              <h1 className="text-3xl font-light leading-tight tracking-[-.035em] text-[#4B165C] sm:text-4xl" style={serif}>
                {slide.title}{" "}
                <em className="font-normal" style={{ color: slide.accent }}>{slide.emphasis}</em>{" "}
                {slide.ending}
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[#5A4037]/80">{slide.description}</p>
              <div className="mt-3 flex items-center gap-2">
                {editorialSlides.map((item, index) => (
                  <button
                    key={item.eyebrow}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={`Show editorial slide ${index + 1}`}
                    aria-pressed={activeSlide === index}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      activeSlide === index ? "w-8 bg-[#4B165C]" : "w-3 bg-[#B99A62]/40"
                    }`}
                  />
                ))}
              </div>
            </div>
            {children}
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 border-t border-[#5A4037]/10 bg-white/35 px-5 py-3 text-[10px] text-[#5A4037]/75 sm:px-8 lg:px-10 xl:px-12">
            <span>Made for your everyday rituals.</span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-[#7D8768]" />
              Your privacy matters
            </span>
          </div>
        </section>

        {/* Brand story */}
        <aside className="relative hidden max-w-2xl animate-[fadeIn_1s_ease-out_both] lg:block lg:justify-self-center">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[.08] px-4 py-2.5 text-[10px] font-medium tracking-[.22em] text-[#F7F2EA] shadow-lg backdrop-blur-xl">
            <Sparkles size={15} className="text-[#D6BE8C]" />
            THE SOFT EDIT · THOUGHTFUL BEAUTY
          </div>
          <div key={`editorial-${activeSlide}`} className="animate-[fadeIn_900ms_ease-out_both]">
            <h1 className="max-w-2xl text-5xl font-light leading-[1.08] tracking-[-.045em] text-[#F7F2EA] xl:text-7xl 2xl:text-8xl" style={serif}>
              {slide.title}
              <br />
              <em className="font-normal" style={{ color: slide.accent }}>{slide.emphasis}</em>
              <br />
              {slide.ending}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-[#F7F2EA]/85 xl:text-lg">{slide.description}</p>
            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-14 transition-colors duration-700" style={{ backgroundColor: slide.accent }} />
              <span className="h-1.5 w-1.5 rotate-45 bg-[#B99A62]" />
              <span className="text-[10px] tracking-[.25em] text-[#F7F2EA]/80">{slide.signature}</span>
            </div>
          </div>
          <div className="mt-9 flex items-center gap-3">
            {editorialSlides.map((item, index) => (
              <button
                key={item.eyebrow}
                type="button"
                onClick={() => setActiveSlide(index)}
                aria-label={`Show editorial slide ${index + 1}`}
                aria-pressed={activeSlide === index}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  activeSlide === index ? "w-12 bg-[#D6BE8C]" : "w-4 bg-white/40 hover:bg-white/80"
                }`}
              />
            ))}
            <span className="ml-2 text-[10px] tracking-[.2em] text-white/65">
              {String(activeSlide + 1).padStart(2, "0")} / {String(editorialSlides.length).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs text-white/80">
            <span className="inline-flex items-center gap-2"><Heart size={15} className="text-[#D6BE8C]" /> Beauty favourites</span>
            <span className="inline-flex items-center gap-2"><Leaf size={15} className="text-[#B9C4A0]" /> Intentional rituals</span>
          </div>
          <div className="pointer-events-none absolute -right-6 top-1/2 -z-10 hidden h-72 w-72 -translate-y-1/2 rounded-full border border-[#D6BE8C]/15 lg:block" />
        </aside>
      </section>

      <footer className="relative z-10 mx-auto flex w-full max-w-[1900px] flex-wrap items-center justify-between gap-3 px-5 pb-4 text-[10px] tracking-wide text-white/65 sm:px-8 lg:px-12">
        <span>© {new Date().getFullYear()} The Soft Edit</span>
        <span>Thoughtful beauty. Intentional living.</span>
      </footer>
    </main>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
  icon,
  required = true,
  minLength,
}: {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
  icon: "user" | "mail" | "lock";
  required?: boolean;
  minLength?: number;
}) {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const isPassword = type === "password";
  const Icon = icon === "user" ? UserRound : icon === "mail" ? Mail : LockKeyhole;

  return (
    <label className="block w-full">
      <span className="mb-2 block text-[11px] font-semibold tracking-[.08em] text-[#5A4037]/90 sm:text-xs">{label}</span>
      <span
        className={`relative flex min-h-[54px] w-full items-center gap-3 rounded-xl border bg-white/75 px-4 transition-all duration-300 sm:min-h-[58px] sm:rounded-2xl sm:px-5 ${
          focused
            ? "border-[#B99A62] bg-white shadow-[0_0_0_4px_rgba(185,154,98,.13),0_12px_28px_rgba(75,22,92,.07)]"
            : "border-[#5A4037]/15 shadow-[0_3px_12px_rgba(75,22,92,.025)] hover:border-[#B99A62]/70"
        }`}
      >
        <Icon size={18} strokeWidth={1.6} className={`shrink-0 transition-colors duration-300 ${focused ? "text-[#4B165C]" : "text-[#7D8768]"}`} aria-hidden="true" />
        <input
          type={isPassword && visible ? "text" : type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          minLength={minLength}
          className="min-w-0 flex-1 bg-transparent py-3 text-[13px] text-[#4B165C] outline-none placeholder:text-[#5A4037]/40 sm:text-sm"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#7D8768] transition-all duration-300 hover:bg-[#7D8768]/10 hover:text-[#4B165C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A62]"
          >
            {visible ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </span>
    </label>
  );
}

function FormIntro({
  kicker,
  title,
  emphasis,
  description,
}: {
  kicker: string;
  title: string;
  emphasis: string;
  description: string;
}) {
  return (
    <div className="mb-6 animate-[fadeIn_700ms_ease-out_both] sm:mb-7">
      <span className="mb-3 inline-flex items-center gap-2 text-[9px] font-semibold tracking-[.23em] text-[#7D8768] sm:text-[10px]">
        <span className="h-px w-7 bg-[#B99A62]" />
        {kicker}
      </span>
      <h2 className="text-[2.25rem] font-light leading-[1.03] tracking-[-.045em] text-[#4B165C] sm:text-5xl" style={serif}>
        {title}
        <br />
        <em className="font-normal text-[#9B7B43]">{emphasis}</em>
      </h2>
      <p className="mt-3 max-w-xl text-[13px] leading-6 text-[#5A4037]/75 sm:text-sm sm:leading-7">{description}</p>
    </div>
  );
}

function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="group relative mt-1 flex min-h-[54px] w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#4B165C] px-5 py-3.5 text-sm font-medium text-[#F7F2EA] shadow-[0_12px_28px_rgba(75,22,92,.22)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#381044] hover:shadow-[0_18px_38px_rgba(75,22,92,.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A62] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F2EA] active:translate-y-0 sm:min-h-[58px] sm:rounded-2xl"
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
      <ArrowRight size={18} strokeWidth={1.7} className="relative transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
}

function FormNotice({ children, error = false }: { children: ReactNode; error?: boolean }) {
  return (
    <p
      role={error ? "alert" : "status"}
      className={`mt-3 rounded-xl border px-4 py-3 text-xs leading-5 ${
        error
          ? "border-red-200 bg-red-50 text-red-700"
          : "border-[#7D8768]/25 bg-[#7D8768]/10 text-[#456044]"
      }`}
    >
      {children}
    </p>
  );
}

export function LoginPage({ onNavigateHome }: AccountPageProps) {
  const goHome = onNavigateHome ?? (() => { window.location.href = "/"; });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [notice, setNotice] = useState("");

//   function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     setNotice("Your sign-in form is ready. Connect the authentication service to sign in securely.");
//   }
async function handleSubmit(
  event: FormEvent<HTMLFormElement>,
) {
  event.preventDefault();
  setNotice("");

  const { error: signInError } =
    await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

  if (signInError) {
    setNotice(
      "We couldn't sign you in with those details. Please check your email and password.",
    );
    return;
  }

  window.location.assign("/account");
}

  return (
    <AccountLayout mode="login" onNavigateHome={goHome}>
      <FormIntro
        kicker="WELCOME BACK"
        title="Your beauty ritual"
        emphasis="awaits."
        description="Sign in to revisit your favourites and make your next ritual yours."
      />
      <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
        <Field label="Email address" type="email" placeholder="you@example.com" value={email} onChange={setEmail} autoComplete="email" icon="mail" />
        <Field label="Password" type="password" placeholder="Enter your password" value={password} onChange={setPassword} autoComplete="current-password" icon="lock" minLength={8} />

        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-0.5 text-xs">
          <label className="group inline-flex cursor-pointer items-center gap-2.5 text-[#5A4037]/80">
            <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} className="peer sr-only" />
            <span className="flex h-[17px] w-[17px] items-center justify-center rounded-[5px] border border-[#B99A62]/70 bg-white transition-all peer-checked:border-[#4B165C] peer-checked:bg-[#4B165C] peer-focus-visible:ring-2 peer-focus-visible:ring-[#B99A62]">
              {rememberMe && <Check size={12} strokeWidth={2.5} className="text-white" />}
            </span>
            <span className="transition-colors group-hover:text-[#4B165C]">Remember me</span>
          </label>
          <a
            href="/forgot-password"
            className="font-medium text-[#4B165C] underline decoration-[#B99A62]/60 underline-offset-4 transition-colors hover:text-[#8A6532]"
            onClick={async (event) => {
       event.preventDefault();
        setNotice("");

  if (!email.trim()) {
    setNotice(
      "Enter your email address first, then select Forgot password again.",
    );
    return;
  }

  const { error: resetError } =
    await supabase.auth.resetPasswordForEmail(
      email.trim(),
      {
        redirectTo: `${window.location.origin}/reset-password`,
      },
    );

  if (resetError) {
    setNotice(
      "We couldn't send a reset email. Please check your email address and try again.",
    );
    return;
  }

  setNotice(
    "If an account exists for that email, a password-reset link will be sent. Please check your inbox.",
  );
}}
          >
            Forgot password?
          </a>
        </div>

        <SubmitButton>Sign in to your account</SubmitButton>
        {notice && <FormNotice>{notice}</FormNotice>}
      </form>

      <div className="my-6 flex items-center gap-3 sm:my-7">
        <span className="h-px flex-1 bg-[#5A4037]/15" />
        <span className="text-[8px] tracking-[.2em] text-[#5A4037]/55 sm:text-[9px]">YOUR SPACE, YOUR PACE</span>
        <span className="h-px flex-1 bg-[#5A4037]/15" />
      </div>

      <p className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#5A4037]/75 sm:text-sm">
        <span>New to The Soft Edit?</span>
        <a href="/register" className="group inline-flex items-center gap-1.5 font-semibold text-[#4B165C] transition-colors hover:text-[#8A6532]">
          Create an account <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </a>
      </p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#5A4037]/10 pt-4 text-[10px] text-[#5A4037]/70 sm:text-[11px]">
        <span className="inline-flex items-center gap-2"><Heart size={15} className="text-[#9B7B43]" /> Save your favourites</span>
        <span className="inline-flex items-center gap-2"><Leaf size={15} className="text-[#7D8768]" /> Curate your rituals</span>
      </div>
    </AccountLayout>
  );
}

export function RegisterPage({ onNavigateHome }: AccountPageProps) {
  const goHome = onNavigateHome ?? (() => { window.location.href = "/"; });
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [joinCommunity, setJoinCommunity] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

//   function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     setError("");
//     setNotice("");

//     if (password.length < 8) {
//       setError("Please use a password with at least 8 characters.");
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError("Your passwords do not match. Please try again.");
//       return;
//     }
//     setNotice("Your account form is ready. Connect the authentication service to create your account securely.");
//   }
// async function handleSubmit(
//   event: FormEvent<HTMLFormElement>,
// ) {
//   event.preventDefault();
//   setError("");
//   setNotice("");

//   if (password.length < 8) {
//     setError(
//       "Please use a password with at least 8 characters.",
//     );
//     return;
//   }

//   if (password !== confirmPassword) {
//     setError(
//       "Your passwords do not match. Please try again.",
//     );
//     return;
//   }

//   const { data, error: signUpError } =
//     await supabase.auth.signUp({
//       email: email.trim(),
//       password,
//       options: {
//         data: {
//           full_name: fullName.trim(),
//           marketing_opt_in: joinCommunity,
//         },
//         emailRedirectTo: `${window.location.origin}/login`,
//       },
//     });

//   if (signUpError) {
//     setError(
//       "We couldn't create your account. Please check your details and try again.",
//     );
//     return;
//   }

//   if (data.session) {
//     window.location.assign("/account");
//     return;
//   }

//   setNotice(
//     "Your registration has been received. Please check your email for a confirmation link before signing in.",
//   );
// }


async function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  setError("");
  setNotice("");

  const cleanName = fullName.trim();
  const cleanEmail = email.trim();

  if (!cleanName) {
    setError("Please enter your full name.");
    return;
  }

  if (!cleanEmail) {
    setError("Please enter your email address.");
    return;
  }

  if (password.length < 8) {
    setError("Please use a password with at least 8 characters.");
    return;
  }

  if (password !== confirmPassword) {
    setError("Your passwords do not match. Please try again.");
    return;
  }

  try {
    const { data, error: signUpError } =
      await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: cleanName,
            marketing_opt_in: joinCommunity,
          },
        },
      });

    if (signUpError) {
      console.error("Supabase registration error:", {
        message: signUpError.message,
        code: signUpError.code,
        status: signUpError.status,
      });

      if (
        signUpError.message.toLowerCase().includes("already registered") ||
        signUpError.code === "user_already_exists"
      ) {
        setError(
          "An account with this email may already exist. Please sign in instead, or use another email address."
        );
      } else {
        setError(`Registration failed: ${signUpError.message}`);
      }

      return;
    }

    if (!data.user) {
      setError(
        "Supabase did not return a user. Please check your authentication settings."
      );
      return;
    }

    if (data.session) {
      window.location.assign("/account");
      return;
    }

    setNotice(
      "Your account was created. Please check your email for a confirmation link before signing in."
    );
  } catch (err: unknown) {
    console.error("Unexpected registration error:", err);

    const message =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred.";

    setError(`Registration failed: ${message}`);
  }
}


  return (
    <AccountLayout mode="register" onNavigateHome={goHome}>
      <FormIntro
        kicker="A LITTLE MORE YOU"
        title="Make space"
        emphasis="for yourself."
        description="Create your account for considered beauty, saved favourites and rituals that feel like you."
      />
      <form className="space-y-4 sm:space-y-[18px]" onSubmit={handleSubmit}>
        <Field label="Full name" placeholder="Your full name" value={fullName} onChange={setFullName} autoComplete="name" icon="user" />
        <Field label="Email address" type="email" placeholder="you@example.com" value={email} onChange={setEmail} autoComplete="email" icon="mail" />
        <Field label="Create password" type="password" placeholder="At least 8 characters" value={password} onChange={setPassword} autoComplete="new-password" icon="lock" minLength={8} />
        <Field label="Confirm password" type="password" placeholder="Enter your password again" value={confirmPassword} onChange={setConfirmPassword} autoComplete="new-password" icon="lock" minLength={8} />

        <p className="flex items-center gap-2 text-[10px] leading-5 text-[#5A4037]/65 sm:text-[11px]">
          <LockKeyhole size={14} className="shrink-0 text-[#7D8768]" />
          Use at least 8 characters for your password.
        </p>

        <label className="group flex cursor-pointer items-start gap-2.5 text-[11px] leading-5 text-[#5A4037]/75 sm:text-xs">
          <input type="checkbox" checked={joinCommunity} onChange={(event) => setJoinCommunity(event.target.checked)} className="peer sr-only" />
          <span className="mt-0.5 flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-[5px] border border-[#B99A62]/70 bg-white transition-all peer-checked:border-[#4B165C] peer-checked:bg-[#4B165C] peer-focus-visible:ring-2 peer-focus-visible:ring-[#B99A62]">
            {joinCommunity && <Check size={12} strokeWidth={2.5} className="text-white" />}
          </span>
          <span className="transition-colors group-hover:text-[#4B165C]">Keep me in the loop with beauty notes, new arrivals and thoughtful offers.</span>
        </label>

        <SubmitButton>Create my account</SubmitButton>
        {error && <FormNotice error>{error}</FormNotice>}
        {notice && <FormNotice>{notice}</FormNotice>}

        <p className="pt-1 text-[10px] leading-5 text-[#5A4037]/65 sm:text-[11px]">
          By creating an account, you agree to our{" "}
          <a href="/terms" className="font-medium text-[#4B165C] underline decoration-[#B99A62]/60 underline-offset-2 hover:text-[#8A6532]">Terms of Service</a>{" "}
          and{" "}
          <a href="/privacy" className="font-medium text-[#4B165C] underline decoration-[#B99A62]/60 underline-offset-2 hover:text-[#8A6532]">Privacy Policy</a>.
        </p>
      </form>

      <div className="my-5 flex items-center gap-3 sm:my-6">
        <span className="h-px flex-1 bg-[#5A4037]/15" />
        <span className="text-[8px] tracking-[.18em] text-[#5A4037]/55 sm:text-[9px]">YOUR SOFT EDIT STARTS HERE</span>
        <span className="h-px flex-1 bg-[#5A4037]/15" />
      </div>

      <p className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#5A4037]/75 sm:text-sm">
        <span>Already part of our world?</span>
        <a href="/login" className="group inline-flex items-center gap-1.5 font-semibold text-[#4B165C] transition-colors hover:text-[#8A6532]">
          Sign in <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </a>
      </p>
    </AccountLayout>
  );
}
export default function AccountPages({
  children,
}: {
  children: ReactNode;
}) {
  const path =
    typeof window !== "undefined"
      ? window.location.pathname.replace(/\/+$/, "") || "/"
      : "/";

  if (path === "/login") {
    return <LoginPage />;
  }

  if (path === "/register") {
    return <RegisterPage />;
  }

  if (path === "/account") {
    return <AccountDashboard  />;
  }

  return <>{children}</>;
}
