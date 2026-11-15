import { useEffect, useState, type ReactNode } from "react";
import type { User } from "@supabase/supabase-js";
import { ArrowUpRight, Heart, Package, UserRound } from "lucide-react";
import { supabase } from "../lib/supabase";

/** Tracks the signed-in Supabase user for the account pages. */
export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (active) setUser(session?.user ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  return { user, loading };
}

type Section = "account" | "wishlist" | "orders";

const SECTIONS: { key: Section; label: string; href: string; icon: typeof Heart }[] = [
  { key: "account", label: "My Account", href: "/account", icon: UserRound },
  { key: "wishlist", label: "My Wish List", href: "/wishlist", icon: Heart },
  { key: "orders", label: "My Orders", href: "/orders", icon: Package },
];

type ShellProps = {
  active: Section;
  eyebrow: string;
  title: ReactNode;
  description: string;
  go: (path: string) => void;
  children: ReactNode;
};

/** Shared luxurious frame: sits below the fixed navbar, with a section switcher. */
export function AccountShell({ active, eyebrow, title, description, go, children }: ShellProps) {
  return (
    <section className="min-h-screen bg-[#F7F2EA] px-5 pb-24 pt-32 sm:px-10 sm:pt-40 lg:pt-44">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.24em] text-[#7D8768] sm:text-[10px]">
          <span className="h-px w-8 bg-[#B99A62]" />
          {eyebrow}
        </div>

        <h1 className="mt-5 font-serif text-4xl leading-[1.08] tracking-[-0.04em] text-[#4B165C] sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[#7A685E] sm:text-base sm:leading-8">
          {description}
        </p>

        <nav
          aria-label="Account sections"
          className="mt-9 flex gap-2 overflow-x-auto border-b border-[#E6D9CA] pb-5 [scrollbar-width:none]"
        >
          {SECTIONS.map(({ key, label, href, icon: Icon }) => (
            <button
              key={key}
              type="button"
              aria-current={active === key ? "page" : undefined}
              onClick={() => go(href)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-5 py-3 text-[11px] font-semibold tracking-[0.08em] transition-all duration-300 ${
                active === key
                  ? "border-[#4B165C] bg-[#4B165C] text-[#F7F2EA] shadow-md"
                  : "border-[#CDBBAA] bg-[#FBF7F0] text-[#6D594D] hover:border-[#4B165C] hover:text-[#4B165C]"
              }`}
            >
              <Icon size={15} strokeWidth={1.6} />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

/** Shown when a guest opens an account page. */
export function GuestGate({ message }: { message: string }) {
  return (
    <div className="mx-auto max-w-xl border border-[#E6D9CA] bg-[#FBF7F0] px-6 py-14 text-center sm:px-12">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#B99A62]/50 bg-[#EFE6DC] text-[#4B165C]">
        <UserRound size={26} strokeWidth={1.3} />
      </div>
      <h2 className="mt-6 font-serif text-3xl text-[#4B165C]">Please sign in</h2>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#89766A]">{message}</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <a
          href="/login"
          className="inline-flex items-center justify-center gap-3 bg-[#4B165C] px-7 py-4 text-[10px] font-semibold tracking-[0.14em] text-white transition-colors hover:bg-[#351043]"
        >
          LOGIN <ArrowUpRight size={15} />
        </a>
        <a
          href="/register"
          className="inline-flex items-center justify-center gap-3 border border-[#4B165C] px-7 py-4 text-[10px] font-semibold tracking-[0.14em] text-[#4B165C] transition-colors hover:bg-[#4B165C] hover:text-[#F7F2EA]"
        >
          CREATE ACCOUNT
        </a>
      </div>
    </div>
  );
}

export function PageSpinner() {
  return (
    <div className="flex justify-center py-24" role="status" aria-label="Loading">
      <span className="h-9 w-9 animate-spin rounded-full border-2 border-[#B99A62]/30 border-t-[#4B165C]" />
    </div>
  );
}
