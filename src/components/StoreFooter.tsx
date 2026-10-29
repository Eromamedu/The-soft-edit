import { ArrowUpRight, CreditCard, Mail } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import logo from "../images/the-soft-edit-logo-b99a62.svg";
import DiscountForm from "./DiscountForm";
import { INSTAGRAM_URL, WHATSAPP_URL } from "./HomeSections";
import { DISCOUNT_PERCENT } from "../lib/api";
import type { Go } from "./ui";

export default function StoreFooter({ go }: { go: Go }) {
  const link = "group flex items-center gap-2 text-sm text-white/60 transition-colors duration-300 hover:text-white";
  const bar = <span className="h-px w-0 bg-[#B99A62] transition-all duration-300 group-hover:w-4" />;

  const shop: [string, string][] = [
    ["The full edit", "/product-line"],
    ["Collections", "/#collections"],
    ["Join the waitlist", "/waitlist"],
    ["My account", "/account"],
  ];
  const help: [string, string][] = [
    ["Contact us", "mailto:hello@thesoftedit.com"],
    ["FAQs", "/faqs"],
    ["Delivery & returns", "/delivery-returns"],
    ["Track your order", "/account"],
  ];
  const legal: [string, string][] = [
    ["Privacy policy", "/privacy"],
    ["Terms & conditions", "/terms"],
    ["Cookie policy", "/cookies"],
  ];

  function open(e: React.MouseEvent, href: string) {
    if (href.startsWith("mailto:")) return;
    e.preventDefault();
    if (href === "/#collections") {
      go("/");
      window.setTimeout(() => document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" }), 120);
      return;
    }
    go(href);
  }

  return (
    <footer className="relative isolate overflow-hidden bg-[#30232F] text-[#F7F2EA]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-28 -z-10 h-96 w-96 rounded-full border border-[#B99A62]/15" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-96 w-96 rounded-full border border-[#B99A62]/10" />

      <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">
        {/* 10% OFF */}
        <div className="grid gap-10 border-b border-white/15 py-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16 lg:py-16">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B99A62]" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#D9BE8B]">A little note from us</span>
            </div>
            <h2 className="font-serif text-3xl leading-tight text-[#F7F2EA] sm:text-4xl lg:text-5xl">
              Get {DISCOUNT_PERCENT}% off
              <br />
              <em className="text-[#D9BE8B]">your first order.</em>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
              Join The Soft Edit and we'll send your code straight to your inbox. Self-care starts with a little treat.
            </p>
          </div>
          <DiscountForm dark />
        </div>

        {/* LINKS */}
        <div className="grid gap-x-10 gap-y-10 border-b border-white/15 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
          <div>
            <a href="/" onClick={(e) => open(e, "/")} aria-label="The Soft Edit home" className="inline-block">
              <img src={logo} alt="The Soft Edit" className="h-auto w-[160px] object-contain sm:w-[180px]" />
            </a>
            <p className="mt-6 max-w-sm font-serif text-2xl leading-relaxed text-white/95">
              Live beautifully,
              <br />
              <em className="text-[#D9BE8B]">the soft way.</em>
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { href: WHATSAPP_URL, label: "WhatsApp", icon: <FaWhatsapp size={18} /> },
                { href: "mailto:hello@thesoftedit.com", label: "Email", icon: <Mail size={18} strokeWidth={1.6} /> },
                { href: INSTAGRAM_URL, label: "Instagram", icon: <FaInstagram size={18} /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/75 transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#30232F]"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D9BE8B]">Explore <span className="h-px flex-1 bg-white/10" /></h3>
            <div className="mt-6 flex flex-col items-start gap-4">
              {shop.map(([l, h]) => (
                <a key={l} href={h} onClick={(e) => open(e, h)} className={link}>{bar}{l}</a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D9BE8B]">Here to help <span className="h-px flex-1 bg-white/10" /></h3>
            <div className="mt-6 flex flex-col items-start gap-4">
              {help.map(([l, h]) => (
                <a key={l} href={h} onClick={(e) => open(e, h)} className={link}>{bar}{l}</a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D9BE8B]">Pay your way <span className="h-px flex-1 bg-white/10" /></h3>
            <div className="mt-6 flex items-start gap-3 text-xs leading-6 text-white/55">
              <CreditCard size={17} className="mt-0.5 shrink-0 text-[#D9BE8B]" strokeWidth={1.5} />
              <p>Card, bank transfer, USSD and more through Paystack, or send a direct bank transfer.</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["VISA", "Mastercard", "Verve", "Transfer", "USSD"].map((m) => (
                <span key={m} className="rounded-md border border-white/15 px-2.5 py-1.5 text-[10px] text-white/70">{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* BASE */}
        <div className="flex flex-col gap-5 py-7 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[10px] tracking-wide text-white/40">© {new Date().getFullYear()} The Soft Edit. All rights reserved.</p>
          <nav aria-label="Legal information" className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {legal.map(([l, h]) => (
              <a key={l} href={h} onClick={(e) => open(e, h)} className="text-[10px] text-white/45 transition-colors hover:text-[#D9BE8B]">{l}</a>
            ))}
          </nav>
          <a href="#home" className="group inline-flex items-center gap-2 self-start text-[9px] font-semibold tracking-[0.15em] text-white/65 transition-colors hover:text-[#D9BE8B] lg:self-auto">
            BACK TO THE TOP
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}
