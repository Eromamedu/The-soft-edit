import { useState } from "react";
import { Check, Copy, MessageCircle } from "lucide-react";
import { supabase } from "../lib/supabase";
import { BANK, OWNER_WHATSAPP, getLastOrder } from "../lib/api";
import { ngn } from "../data/catalog";
import { Eyebrow, type Go } from "../components/ui";

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#E6D9CA] py-4">
      <div className="min-w-0">
        <p className="text-[10px] tracking-[0.18em] text-[#7D8768]">{label}</p>
        <p className="mt-1 break-all font-serif text-xl text-[#4B165C] sm:text-2xl">{value}</p>
      </div>
      <button
        type="button"
        onClick={() => {
          void navigator.clipboard?.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        }}
        aria-label={`Copy ${label}`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#B99A62] text-[#4B165C] transition-all hover:bg-[#4B165C] hover:text-white"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}

export default function TransferPage({ go }: { go: Go }) {
  const order = getLastOrder();
  const [reported, setReported] = useState(false);

  if (!order || order.method !== "transfer") {
    return (
      <section className="bg-[#FBF7F0] px-5 pb-32 pt-48 text-center">
        <h1 className="font-serif text-5xl italic text-[#4B165C]">No transfer order yet.</h1>
        <p className="mt-4 text-sm text-[#7A685E]">Choose "Direct bank transfer" at checkout to see your payment details.</p>
        <button type="button" onClick={() => go("/product-line")} className="mt-8 bg-[#4B165C] px-9 py-4 text-[10px] font-semibold tracking-[0.15em] text-white hover:bg-[#351043]">
          DISCOVER THE EDIT
        </button>
      </section>
    );
  }

  async function reportPaid() {
    setReported(true);
    try {
      await supabase.rpc("report_transfer", { p_reference: order!.reference });
    } catch {
      /* the WhatsApp message below is the backup */
    }
    const msg = `Hello The Soft Edit, I have made a transfer of ${ngn(order!.total)} for order ${order!.reference}. Name: ${order!.customer_name}.`;
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  }

  return (
    <section className="bg-[#FBF7F0] px-5 pb-28 pt-36 sm:px-10 sm:pt-44">
      <div className="mx-auto max-w-2xl">
        <Eyebrow>BANK TRANSFER</Eyebrow>
        <h1 className="mt-4 font-serif text-5xl tracking-[-0.04em] text-[#4B165C] sm:text-6xl">
          One last <em className="text-[#9A8061]">step.</em>
        </h1>
        <p className="mt-5 text-sm leading-8 text-[#7A685E]">
          Send exactly <strong className="text-[#4B165C]">{ngn(order.total)}</strong> to the account below, using your order reference as the
          narration. We'll confirm it and begin preparing your order.
        </p>

        <div className="mt-10 border border-[#D9C5A4] bg-[#F7F2EA] p-6 shadow-[0_15px_40px_rgba(75,22,92,0.08)] sm:p-9">
          <CopyRow label="BANK" value={BANK.bank} />
          <CopyRow label="ACCOUNT NUMBER" value={BANK.accountNumber} />
          <CopyRow label="ACCOUNT NAME" value={BANK.accountName} />
          <CopyRow label="AMOUNT" value={String(order.total)} />
          <CopyRow label="NARRATION / REFERENCE" value={order.reference} />
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => void reportPaid()}
            className="flex min-h-14 items-center justify-center gap-3 bg-[#4B165C] px-6 text-[10px] font-semibold tracking-[0.15em] text-white transition-all hover:-translate-y-0.5 hover:bg-[#351043]"
          >
            <MessageCircle size={17} /> I'VE MADE THE TRANSFER
          </button>
          <button type="button" onClick={() => go("/")} className="min-h-14 border border-[#4B165C] px-6 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C] hover:bg-[#4B165C] hover:text-white">
            BACK TO THE STORE
          </button>
        </div>

        {reported && (
          <p role="status" className="mt-6 flex items-center gap-2 text-sm text-[#7D8768]">
            <Check size={16} /> Thank you. We've been notified and will confirm your payment shortly.
          </p>
        )}
      </div>
    </section>
  );
}
