// import { useEffect, useState, type FormEvent } from "react";
// import {
//   ArrowLeft,
//   ArrowUpRight,
//   CheckCircle2,
//   LoaderCircle,
//   MapPin,
//   Pencil,
//   Phone,
//   Save,
//   ShieldCheck,
// } from "lucide-react";
// import { supabase } from "../lib/supabase";

// type CustomerProfile = {
//   full_name: string;
//   phone: string;
//   address: string;
//   city: string;
//   state: string;
//   postal_code: string;
//   country: string;
// };

// const emptyCustomerProfile: CustomerProfile = {
//   full_name: "",
//   phone: "",
//   address: "",
//   city: "",
//   state: "",
//   postal_code: "",
//   country: "Nigeria",
// };

// export default function ProfilePage({ onBack }: { onBack: () => void }) {
//   const [profile, setProfile] = useState<CustomerProfile>(emptyCustomerProfile);
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   useEffect(() => {
//     let active = true;

//     async function loadProfile() {
//       const { data, error } = await supabase.auth.getUser();

//       if (!active) return;

//       if (error || !data.user) {
//         setErrorMessage("Please sign in to view your account details.");
//         setLoading(false);
//         return;
//       }

//       const user = data.user;
//       const metadata = user.user_metadata ?? {};

//       const { data: profileRow } = await supabase
//         .from("profiles")
//         .select("full_name")
//         .eq("id", user.id)
//         .maybeSingle();

//       const fullName =
//         (typeof metadata.full_name === "string" && metadata.full_name) ||
//         (typeof metadata.name === "string" && metadata.name) ||
//         (typeof profileRow?.full_name === "string" && profileRow.full_name) ||
//         "";

//       setEmail(user.email ?? "");
//       setProfile({
//         full_name: fullName,
//         phone: typeof metadata.phone === "string" ? metadata.phone : "",
//         address: typeof metadata.address === "string" ? metadata.address : "",
//         city: typeof metadata.city === "string" ? metadata.city : "",
//         state: typeof metadata.state === "string" ? metadata.state : "",
//         postal_code: typeof metadata.postal_code === "string" ? metadata.postal_code : "",
//         country: typeof metadata.country === "string" ? metadata.country : "Nigeria",
//       });
//       setLoading(false);
//     }

//     void loadProfile();

//     return () => {
//       active = false;
//     };
//   }, []);

//   function updateField(field: keyof CustomerProfile, value: string) {
//     setProfile((current) => ({ ...current, [field]: value }));
//     setMessage("");
//     setErrorMessage("");
//   }

//   async function saveProfile(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     setSaving(true);
//     setMessage("");
//     setErrorMessage("");

//     const { data, error } = await supabase.auth.updateUser({
//       data: {
//         full_name: profile.full_name.trim(),
//         phone: profile.phone.trim(),
//         address: profile.address.trim(),
//         city: profile.city.trim(),
//         state: profile.state.trim(),
//         postal_code: profile.postal_code.trim(),
//         country: profile.country.trim(),
//       },
//     });

//     setSaving(false);

//     if (error) {
//       setErrorMessage(error.message || "We couldn't save your profile. Please try again.");
//       return;
//     }

//     const updatedName =
//       typeof data.user?.user_metadata?.full_name === "string"
//         ? data.user.user_metadata.full_name
//         : profile.full_name.trim();

//     setProfile((current) => ({ ...current, full_name: updatedName }));
//     setMessage("Your details have been saved successfully.");
//   }

//   const initials = profile.full_name.trim()
//     ? profile.full_name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()
//     : (email[0] ?? "S").toUpperCase();

//   const fieldClass =
//     "mt-2 w-full rounded-xl border border-[#D9CFC2] bg-white/75 px-4 py-3 text-sm text-[#49372F] outline-none transition focus:border-[#8A648F] focus:ring-2 focus:ring-[#4B165C]/10 placeholder:text-[#A89A8D]";

//   if (loading) {
//     return (
//       <section className="min-h-[65vh] bg-[#F7F2EA] px-5 pb-20 pt-36">
//         <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 py-28 text-sm text-[#6D5A50]">
//           <LoaderCircle className="animate-spin text-[#4B165C]" size={20} />
//           Preparing your personal space...
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="min-h-[70vh] bg-[#F7F2EA] px-4 pb-20 pt-32 sm:px-7 sm:pt-36 lg:px-10">
//       <div className="mx-auto max-w-6xl">
//         <button
//           type="button"
//           onClick={onBack}
//           className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#725E52] transition hover:text-[#4B165C]"
//         >
//           <ArrowLeft size={15} /> Back to the store
//         </button>

//         <div className="relative mb-8 overflow-hidden rounded-[28px] bg-[#30232F] px-6 py-9 text-[#FFF9EF] shadow-[0_22px_65px_rgba(48,35,47,0.12)] sm:px-10 sm:py-12">
//           <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border border-[#D9BE8B]/20" />
//           <div className="pointer-events-none absolute -right-2 -top-14 h-52 w-52 rounded-full border border-[#D9BE8B]/15" />
//           <p className="relative text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D9BE8B]">
//             THE SOFT EDIT · YOUR PERSONAL SPACE
//           </p>
//           <div className="relative mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
//             <div>
//               <h1 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">
//                 My account<span className="text-[#D9BE8B]">.</span>
//               </h1>
//               <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">
//                 A little space just for you. Keep your details close and make every future order feel effortless.
//               </p>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="flex h-[66px] w-[66px] shrink-0 items-center justify-center rounded-full border border-[#D9BE8B]/55 bg-[#F7F2EA]/10 font-serif text-2xl text-[#E9CDA0] shadow-inner">
//                 {initials}
//               </div>
//               <div className="min-w-0">
//                 <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D9BE8B]">Welcome back</p>
//                 <p className="mt-1 max-w-[220px] truncate font-serif text-xl text-[#FFF9EF]">
//                   {profile.full_name || "Lovely to have you here"}
//                 </p>
//                 <p className="mt-1 max-w-[220px] truncate text-xs text-white/55">{email}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {errorMessage && (
//           <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//             {errorMessage}
//           </div>
//         )}

//         <form onSubmit={saveProfile} className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.8fr)]">
//           <div className="rounded-[24px] border border-[#E4D9CC] bg-[#FFFCF7] p-5 shadow-[0_12px_35px_rgba(75,48,37,0.045)] sm:p-8">
//             <div className="flex items-start justify-between gap-4 border-b border-[#EAE1D7] pb-5">
//               <div>
//                 <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9A805F]">Your information</p>
//                 <h2 className="mt-2 font-serif text-2xl text-[#49372F]">Personal details</h2>
//                 <p className="mt-2 text-xs leading-6 text-[#8A7A6F]">Keep your contact details up to date for a smoother shopping experience.</p>
//               </div>
//               <span className="hidden rounded-full bg-[#F1EAE1] p-3 text-[#7D8768] sm:inline-flex"><Pencil size={17} /></span>
//             </div>

//             <div className="mt-7 grid gap-5 sm:grid-cols-2">
//               <label className="text-xs font-semibold text-[#665349] sm:col-span-2">
//                 Full name
//                 <input required value={profile.full_name} onChange={(event) => updateField("full_name", event.target.value)} placeholder="Enter your full name" autoComplete="name" className={fieldClass} />
//               </label>
//               <label className="text-xs font-semibold text-[#665349]">
//                 Email address
//                 <input value={email} readOnly type="email" className={`${fieldClass} cursor-not-allowed bg-[#F3EEE7] text-[#8B7D73]`} />
//                 <span className="mt-2 block text-[10px] font-normal text-[#9A8B80]">Your sign-in email address.</span>
//               </label>
//               <label className="text-xs font-semibold text-[#665349]">
//                 Phone number
//                 <input value={profile.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+234 800 000 0000" autoComplete="tel" className={fieldClass} />
//               </label>
//             </div>

//             <div className="mt-9 border-t border-[#EAE1D7] pt-7">
//               <div className="flex items-center gap-3">
//                 <MapPin size={18} className="text-[#9A805F]" />
//                 <div>
//                   <h3 className="font-serif text-xl text-[#49372F]">Delivery address</h3>
//                   <p className="mt-1 text-xs text-[#8A7A6F]">Add your preferred delivery details for convenience.</p>
//                 </div>
//               </div>
//               <div className="mt-6 grid gap-5 sm:grid-cols-2">
//                 <label className="text-xs font-semibold text-[#665349] sm:col-span-2">
//                   Street address
//                   <input value={profile.address} onChange={(event) => updateField("address", event.target.value)} placeholder="House number, street and area" autoComplete="street-address" className={fieldClass} />
//                 </label>
//                 <label className="text-xs font-semibold text-[#665349]">
//                   City
//                   <input value={profile.city} onChange={(event) => updateField("city", event.target.value)} placeholder="e.g. Lagos" autoComplete="address-level2" className={fieldClass} />
//                 </label>
//                 <label className="text-xs font-semibold text-[#665349]">
//                   State
//                   <input value={profile.state} onChange={(event) => updateField("state", event.target.value)} placeholder="e.g. Lagos State" autoComplete="address-level1" className={fieldClass} />
//                 </label>
//                 <label className="text-xs font-semibold text-[#665349]">
//                   Postal code
//                   <input value={profile.postal_code} onChange={(event) => updateField("postal_code", event.target.value)} placeholder="Postal code (optional)" autoComplete="postal-code" className={fieldClass} />
//                 </label>
//                 <label className="text-xs font-semibold text-[#665349]">
//                   Country
//                   <input value={profile.country} onChange={(event) => updateField("country", event.target.value)} placeholder="Country" autoComplete="country-name" className={fieldClass} />
//                 </label>
//               </div>
//             </div>

//             <div className="mt-8 flex flex-col gap-4 border-t border-[#EAE1D7] pt-6 sm:flex-row sm:items-center sm:justify-between">
//               <div aria-live="polite" className="min-h-5 text-xs">
//                 {message && <span className="inline-flex items-center gap-2 text-[#62724F]"><CheckCircle2 size={15} /> {message}</span>}
//               </div>
//               <button type="submit" disabled={saving} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#4B165C] px-7 text-xs font-semibold uppercase tracking-[0.14em] text-[#FFF9EF] shadow-[0_10px_25px_rgba(75,22,92,0.18)] transition hover:-translate-y-0.5 hover:bg-[#351043] disabled:cursor-not-allowed disabled:opacity-60">
//                 {saving ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />}
//                 {saving ? "Saving details..." : "Save my details"}
//               </button>
//             </div>
//           </div>

//           <aside className="space-y-6">
//             <div className="rounded-[24px] border border-[#E4D9CC] bg-[#F1EAE1] p-6 sm:p-7">
//               <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4B165C]/10 text-[#4B165C]"><ShieldCheck size={20} /></div>
//               <h3 className="mt-5 font-serif text-2xl text-[#49372F]">Your details, kept personal.</h3>
//               <p className="mt-3 text-xs leading-7 text-[#7C6A5F]">
//                 Your account information helps us prepare your orders and keep your shopping experience personal. We never display your private details publicly.
//               </p>
//             </div>
//             <div className="rounded-[24px] border border-[#E4D9CC] bg-[#FFFCF7] p-6 sm:p-7">
//               <div className="flex items-center gap-3 text-[#9A805F]"><Phone size={17} /><p className="text-[9px] font-semibold uppercase tracking-[0.2em]">A little help?</p></div>
//               <h3 className="mt-3 font-serif text-xl text-[#49372F]">We're happy to help.</h3>
//               <p className="mt-2 text-xs leading-6 text-[#8A7A6F]">Need to update something or have a question about an order? Our customer care team is here for you.</p>
//               <a href="#footer" onClick={() => window.setTimeout(() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" }), 0)} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#4B165C] underline decoration-[#B99A62] underline-offset-4 transition hover:text-[#8A648F]">
//                 Visit customer care <ArrowUpRight size={14} />
//               </a>
//             </div>
//           </aside>
//         </form>
//       </div>
//     </section>
//   );
// }
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  LoaderCircle,
  MapPin,
  Pencil,
  Phone,
  Save,
  ShieldCheck,
} from "lucide-react";
import { supabase } from "../lib/supabase";

type CustomerProfile = {
  full_name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};

const emptyCustomerProfile: CustomerProfile = {
  full_name: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postal_code: "",
  country: "Nigeria",
};

export default function ProfilePage({ onBack }: { onBack: () => void }) {
  const [profile, setProfile] = useState<CustomerProfile>(emptyCustomerProfile);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProfile() {
      const { data, error } = await supabase.auth.getUser();

      if (!active) return;

      if (error || !data.user) {
        setErrorMessage("Please sign in to view your account details.");
        setLoading(false);
        return;
      }

      const user = data.user;
      const metadata = user.user_metadata ?? {};

      const { data: profileRow } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      const fullName =
        (typeof metadata.full_name === "string" && metadata.full_name) ||
        (typeof metadata.name === "string" && metadata.name) ||
        (typeof profileRow?.full_name === "string" && profileRow.full_name) ||
        "";

      setEmail(user.email ?? "");
      setProfile({
        full_name: fullName,
        phone: typeof metadata.phone === "string" ? metadata.phone : "",
        address: typeof metadata.address === "string" ? metadata.address : "",
        city: typeof metadata.city === "string" ? metadata.city : "",
        state: typeof metadata.state === "string" ? metadata.state : "",
        postal_code: typeof metadata.postal_code === "string" ? metadata.postal_code : "",
        country: typeof metadata.country === "string" ? metadata.country : "Nigeria",
      });
      setLoading(false);
    }

    void loadProfile();

    return () => {
      active = false;
    };
  }, []);

  function updateField(field: keyof CustomerProfile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
    setMessage("");
    setErrorMessage("");
  }

  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setErrorMessage("");

    const { data, error } = await supabase.auth.updateUser({
      data: {
        full_name: profile.full_name.trim(),
        phone: profile.phone.trim(),
        address: profile.address.trim(),
        city: profile.city.trim(),
        state: profile.state.trim(),
        postal_code: profile.postal_code.trim(),
        country: profile.country.trim(),
      },
    });

    setSaving(false);

    if (error) {
      setErrorMessage(error.message || "We couldn't save your profile. Please try again.");
      return;
    }

    const updatedName =
      typeof data.user?.user_metadata?.full_name === "string"
        ? data.user.user_metadata.full_name
        : profile.full_name.trim();

    setProfile((current) => ({ ...current, full_name: updatedName }));
    setMessage("Your details have been saved successfully.");
  }

  const initials = profile.full_name.trim()
    ? profile.full_name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()
    : (email[0] ?? "S").toUpperCase();

  const fieldClass =
    "mt-2 w-full rounded-xl border border-[#D9CFC2] bg-white/75 px-4 py-3 text-sm text-[#49372F] outline-none transition focus:border-[#8A648F] focus:ring-2 focus:ring-[#4B165C]/10 placeholder:text-[#A89A8D]";

  if (loading) {
    return (
      <section className="min-h-[65vh] bg-[#F7F2EA] px-5 pb-20 pt-36">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 py-28 text-sm text-[#6D5A50]">
          <LoaderCircle className="animate-spin text-[#4B165C]" size={20} />
          Preparing your personal space...
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] bg-[#F7F2EA] px-4 pb-20 pt-32 sm:px-7 sm:pt-36 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#725E52] transition hover:text-[#4B165C]"
        >
          <ArrowLeft size={15} /> Back to the store
        </button>

        <div className="relative mb-8 overflow-hidden rounded-[28px] bg-[#30232F] px-6 py-9 text-[#FFF9EF] shadow-[0_22px_65px_rgba(48,35,47,0.12)] sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute -right-12 -top-24 h-72 w-72 rounded-full border border-[#D9BE8B]/20" />
          <div className="pointer-events-none absolute -right-2 -top-14 h-52 w-52 rounded-full border border-[#D9BE8B]/15" />
          <p className="relative text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D9BE8B]">
            THE SOFT EDIT · YOUR PERSONAL SPACE
          </p>
          <div className="relative mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-serif text-4xl font-normal leading-tight sm:text-5xl">
                My account<span className="text-[#D9BE8B]">.</span>
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">
                A little space just for you. Keep your details close and make every future order feel effortless.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-[66px] w-[66px] shrink-0 items-center justify-center rounded-full border border-[#D9BE8B]/55 bg-[#F7F2EA]/10 font-serif text-2xl text-[#E9CDA0] shadow-inner">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D9BE8B]">Welcome back</p>
                <p className="mt-1 max-w-[220px] truncate font-serif text-xl text-[#FFF9EF]">
                  {profile.full_name || "Lovely to have you here"}
                </p>
                <p className="mt-1 max-w-[220px] truncate text-xs text-white/55">{email}</p>
              </div>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <form onSubmit={saveProfile} className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.8fr)]">
          <div className="rounded-[24px] border border-[#E4D9CC] bg-[#FFFCF7] p-5 shadow-[0_12px_35px_rgba(75,48,37,0.045)] sm:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-[#EAE1D7] pb-5">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#9A805F]">Your information</p>
                <h2 className="mt-2 font-serif text-2xl text-[#49372F]">Personal details</h2>
                <p className="mt-2 text-xs leading-6 text-[#8A7A6F]">Keep your contact details up to date for a smoother shopping experience.</p>
              </div>
              <span className="hidden rounded-full bg-[#F1EAE1] p-3 text-[#7D8768] sm:inline-flex"><Pencil size={17} /></span>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="text-xs font-semibold text-[#665349] sm:col-span-2">
                Full name
                <input required value={profile.full_name} onChange={(event) => updateField("full_name", event.target.value)} placeholder="Enter your full name" autoComplete="name" className={fieldClass} />
              </label>
              <label className="text-xs font-semibold text-[#665349]">
                Email address
                <input value={email} readOnly type="email" className={`${fieldClass} cursor-not-allowed bg-[#F3EEE7] text-[#8B7D73]`} />
                <span className="mt-2 block text-[10px] font-normal text-[#9A8B80]">Your sign-in email address.</span>
              </label>
              <label className="text-xs font-semibold text-[#665349]">
                Phone number
                <input value={profile.phone} onChange={(event) => updateField("phone", event.target.value)} placeholder="+234 800 000 0000" autoComplete="tel" className={fieldClass} />
              </label>
            </div>

            <div className="mt-9 border-t border-[#EAE1D7] pt-7">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[#9A805F]" />
                <div>
                  <h3 className="font-serif text-xl text-[#49372F]">Delivery address</h3>
                  <p className="mt-1 text-xs text-[#8A7A6F]">Add your preferred delivery details for convenience.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="text-xs font-semibold text-[#665349] sm:col-span-2">
                  Street address
                  <input value={profile.address} onChange={(event) => updateField("address", event.target.value)} placeholder="House number, street and area" autoComplete="street-address" className={fieldClass} />
                </label>
                <label className="text-xs font-semibold text-[#665349]">
                  City
                  <input value={profile.city} onChange={(event) => updateField("city", event.target.value)} placeholder="e.g. Lagos" autoComplete="address-level2" className={fieldClass} />
                </label>
                <label className="text-xs font-semibold text-[#665349]">
                  State
                  <input value={profile.state} onChange={(event) => updateField("state", event.target.value)} placeholder="e.g. Lagos State" autoComplete="address-level1" className={fieldClass} />
                </label>
                <label className="text-xs font-semibold text-[#665349]">
                  Postal code
                  <input value={profile.postal_code} onChange={(event) => updateField("postal_code", event.target.value)} placeholder="Postal code (optional)" autoComplete="postal-code" className={fieldClass} />
                </label>
                <label className="text-xs font-semibold text-[#665349]">
                  Country
                  <input value={profile.country} onChange={(event) => updateField("country", event.target.value)} placeholder="Country" autoComplete="country-name" className={fieldClass} />
                </label>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-[#EAE1D7] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <div aria-live="polite" className="min-h-5 text-xs">
                {message && <span className="inline-flex items-center gap-2 text-[#62724F]"><CheckCircle2 size={15} /> {message}</span>}
              </div>
              <button type="submit" disabled={saving} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#4B165C] px-7 text-xs font-semibold uppercase tracking-[0.14em] text-[#FFF9EF] shadow-[0_10px_25px_rgba(75,22,92,0.18)] transition hover:-translate-y-0.5 hover:bg-[#351043] disabled:cursor-not-allowed disabled:opacity-60">
                {saving ? <LoaderCircle size={16} className="animate-spin" /> : <Save size={16} />}
                {saving ? "Saving details..." : "Save my details"}
              </button>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[24px] border border-[#E4D9CC] bg-[#F1EAE1] p-6 sm:p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4B165C]/10 text-[#4B165C]"><ShieldCheck size={20} /></div>
              <h3 className="mt-5 font-serif text-2xl text-[#49372F]">Your details, kept personal.</h3>
              <p className="mt-3 text-xs leading-7 text-[#7C6A5F]">
                Your account information helps us prepare your orders and keep your shopping experience personal. We never display your private details publicly.
              </p>
            </div>
            <div className="rounded-[24px] border border-[#E4D9CC] bg-[#FFFCF7] p-6 sm:p-7">
              <div className="flex items-center gap-3 text-[#9A805F]"><Phone size={17} /><p className="text-[9px] font-semibold uppercase tracking-[0.2em]">A little help?</p></div>
              <h3 className="mt-3 font-serif text-xl text-[#49372F]">We're happy to help.</h3>
              <p className="mt-2 text-xs leading-6 text-[#8A7A6F]">Need to update something or have a question about an order? Our customer care team is here for you.</p>
              <a
                href="#footer"
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById("footer")?.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                  });
                }}
                className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#4B165C] underline decoration-[#B99A62] underline-offset-4 transition hover:text-[#8A648F]"
              >
                Visit customer care <ArrowUpRight size={14} />
              </a>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}


