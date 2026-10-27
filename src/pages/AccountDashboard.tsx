
// import { supabase } from "../lib/supabase";
// import { FaWhatsapp } from "react-icons/fa";
// import SerumCollectionPage from "./SerumCollectionPage";
// import {
//   useCallback,
//   useEffect,
//   useRef,
//   useState,
//   type FormEvent,
//   type ReactNode,
// } from "react";
// import {
//   ArrowDown,
//   ArrowLeft,
//   ArrowRight,
//   ArrowUpRight,
//   Check,
//   ChevronDown,
//   Heart,
//   Menu,
//   Search,
//   ShoppingBag,
//   CreditCard,
//   Sparkles,
//   UserRound,
//   X,
//     Flower2,
//   Minus,
//   Plus,
//   Mail,
//   ShieldCheck,
//   Truck,
// } from "lucide-react";
// import { FaInstagram } from "react-icons/fa";

// const logo = "/images/real-logo.jpg";

// const BRAND = {
//   purple: "#4B165C",
//   ivory: "#F7F2EA",
//   cocoa: "#5A4037",
//   leaf: "#7D8768",
//   gold: "#B99A62",
//   dark: "#30232F",
// } as const;

// type Product = {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   image: string;
//   tag: string;
//   color: string;
// };

// type BagItem = {
//   product: Product;
//   quantity: number;
// };

// type Customer = {
//   id: string;
//   email?: string;
//   user_metadata?: Record<string, unknown>;
// };

// const categories = [
//   {
//     name: "Cleansers",
//     description: "A fresh start for your skin",
//     image:
//       "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85",
//   },
//   {
//     name: "Serums",
//     description: "Targeted care, thoughtful formulas",
//     image:
//       "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
//   },
//   {
//     name: "Moisturisers",
//     description: "Your daily dose of comfort",
//     image:
//       "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85",
//   },
//   {
//     name: "Sun care",
//     description: "Everyday protection, made simple",
//     image:
//       "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85",
//   },
// ];

// const products: Product[] = [
//   {
//     id: 1,
//     name: "The Daily Glow Serum",
//     category: "BRIGHTENING · 30ML",
//     price: 28,
//     image:
//       "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85",
//     tag: "BESTSELLER",
//     color: "#E8DCD1",
//   },
//   {
//     id: 2,
//     name: "Cloud Nine Moisturiser",
//     category: "HYDRATION · 50ML",
//     price: 32,
//     image:
//       "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
//     tag: "SKIN FAVOURITE",
//     color: "#E7E0E9",
//   },
//   {
//     id: 3,
//     name: "The Reset Cleanser",
//     category: "GENTLE CLEANSING · 150ML",
//     price: 22,
//     image:
//       "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85",
//     tag: "DAILY ESSENTIAL",
//     color: "#E5E6DA",
//   },
//   {
//     id: 4,
//     name: "Soft Focus Face Cream",
//     category: "NOURISHING · 50ML",
//     price: 35,
//     image:
//       "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85",
//     tag: "THE EDIT",
//     color: "#EEDFD9",
//   },
// ];

// const accountLinks = [
//   { label: "Account Home", href: "/account" },
//   { label: "My Wishlist", href: "/account/wishlist" },
//   { label: "My Orders", href: "/account/orders" },
//   { label: "My Subscriptions", href: "/account/subscriptions" },
//   { label: "My Referrals", href: "/account/referrals" },
// ];

// const primaryLinks = [
//   { label: "Christmas", href: "#shop" },
//   { label: "Skincare", href: "#categories" },
//   { label: "Makeup", href: "#shop" },
//   { label: "Offers", href: "#shop" },
//   { label: "Future Renew", href: "#shop" },
//   { label: "Prime Forever", href: "#categories" },
//   { label: "Good Intent", href: "#categories" },
//   { label: "Pro Artist", href: "#shop" },
//   { label: "Advice", href: "#our-story" },
//   { label: "Virtual Tools", href: "#our-story" },
// ];

// const promotionalLinks = [
//   { label: "Build Your Routine", href: "#categories" },
//   { label: "Bestsellers", href: "#shop" },
//   { label: "The Edit Sets", href: "#shop" },
//   { label: "Subscribe & Save", href: "#newsletter" },
//   { label: "Gifts & Offers", href: "#shop" },
// ];

// const promises = [
//   {
//     number: "01",
//     title: "THOUGHTFULLY CHOSEN",
//     description: "Less noise, more meaning.",
//   },
//   {
//     number: "02",
//     title: "SKIN FIRST",
//     description: "Care that starts with you.",
//   },
//   {
//     number: "03",
//     title: "EVERYDAY RITUALS",
//     description: "Little moments, just for you.",
//   },
//   {
//     number: "04",
//     title: "BEAUTY FOR EVERYONE",
//     description: "Your skin, your story.",
//   },
// ];

// const heroSlides = [
//   {
//     image:
//       "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=2200&q=90",
//     alt: "Glowing skin in a luxury beauty campaign",
//     eyebrow: "A MORE THOUGHTFUL BEAUTY RITUAL",
//     title: ["Your skin,", "your kind", "of beautiful."],
//     description:
//       "Thoughtfully chosen skincare for slower mornings, softer evenings, and feeling good in the skin you're in.",
//     button: "DISCOVER THE EDIT",
//     signature: "Simply, beautifully you.",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2200&q=90",
//     alt: "A relaxing facial skincare treatment",
//     eyebrow: "YOUR MOMENT OF SELF-CARE",
//     title: ["Make room", "for your", "glow."],
//     description:
//       "Turn your everyday routine into a little luxury, with thoughtful essentials that make caring for yourself feel special.",
//     button: "FIND YOUR RITUAL",
//     signature: "A softer kind of self-care.",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=2200&q=90",
//     alt: "Beautifully presented skincare products",
//     eyebrow: "LESS NOISE. MORE GLOW.",
//     title: ["Good skin", "starts with", "good care."],
//     description:
//       "Discover considered beauty essentials selected to make your routine simpler, more enjoyable, and uniquely yours.",
//     button: "SHOP SKINCARE",
//     signature: "Care that feels like you.",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=2200&q=90",
//     alt: "Elegant skincare products for a daily beauty ritual",
//     eyebrow: "THE BEAUTY OF SIMPLICITY",
//     title: ["A little", "care goes", "a long way."],
//     description:
//       "From the first cleanse to your final touch, find the little things that make your skin ritual feel beautifully complete.",
//     button: "EXPLORE THE EDIT",
//     signature: "Small rituals. Softer days.",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=2200&q=90",
//     alt: "Minimal, elegant skincare and beauty essentials",
//     eyebrow: "BEAUTY, WITH INTENTION",
//     title: ["Thoughtful", "care. Natural", "confidence."],
//     description:
//       "Meet a more considered approach to beauty, with skincare favourites chosen to complement your everyday routine.",
//     button: "MEET YOUR FAVOURITES",
//     signature: "Beauty on your own terms.",
//   },
//   {
//     image:
//       "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
//     alt: "Premium beauty products in a refined skincare setting",
//     eyebrow: "YOUR GLOW, YOUR WAY",
//     title: ["Feel good", "in your", "own skin."],
//     description:
//       "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//     button: "SHOP THE COLLECTION",
//     signature: "Always beautifully you.",
//   },
// ];

// function formatPrice(price: number) {
//   return new Intl.NumberFormat("en-GB", {
//     style: "currency",
//     currency: "GBP",
//   }).format(price);
// }

// function scrollToSection(id: string) {
//   document.getElementById(id)?.scrollIntoView({
//     behavior: "smooth",
//     block: "start",
//   });
// }

// function SectionIntro({
//   eyebrow,
//   title,
//   description,
// }: {
//   eyebrow: string;
//   title: ReactNode;
//   description: string;
// }) {
//   return (
//     <div>
//       <p className="text-[9px] font-semibold tracking-[0.22em] text-[#7D8768] sm:text-[10px]">
//         {eyebrow}
//       </p>
//       <h2
//         className="mt-4 font-serif text-3xl font-normal leading-tight tracking-[-0.035em] text-[#4B165C] sm:text-4xl lg:text-5xl"
//         style={{ fontFamily: '"Canosa", Georgia, serif' }}
//       >
//         {title}
//       </h2>
//       <p className="mt-4 max-w-md text-sm leading-7 text-[#7A685E]">
//         {description}
//       </p>
//     </div>
//   );
// }

// type HeaderProps = {
//   bagCount: number;
//   onOpenBag: () => void;
//   userName: string | null;
//   onSignOut: () => void;
// };

// // function Header({
// //   bagCount,
// //   onOpenBag,
// //   userName,
// //   onSignOut,
// // }: HeaderProps) {
// //   const [accountOpen, setAccountOpen] = useState(false);
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [searchFocused, setSearchFocused] = useState(false);
// //   const accountRef = useRef<HTMLDivElement>(null);

// //   const isSignedIn = Boolean(userName);

// //   useEffect(() => {
// //     function handleOutsideClick(event: MouseEvent) {
// //       if (
// //         accountRef.current &&
// //         !accountRef.current.contains(event.target as Node)
// //       ) {
// //         setAccountOpen(false);
// //       }
// //     }

// //     function handleEscape(event: KeyboardEvent) {
// //       if (event.key === "Escape") {
// //         setAccountOpen(false);
// //         setMenuOpen(false);
// //         setSearchFocused(false);
// //       }
// //     }

// //     document.addEventListener("mousedown", handleOutsideClick);
// //     document.addEventListener("keydown", handleEscape);

// //     return () => {
// //       document.removeEventListener("mousedown", handleOutsideClick);
// //       document.removeEventListener("keydown", handleEscape);
// //     };
// //   }, []);

// //   function handleSearch(event: FormEvent<HTMLFormElement>) {
// //     event.preventDefault();

// //     const query = searchQuery.trim().toLowerCase();
// //     setSearchFocused(false);

// //     scrollToSection("shop");

// //     if (!query) return;

// //     const matchingProduct = products.find((product) =>
// //       `${product.name} ${product.category}`.toLowerCase().includes(query),
// //     );

// //     if (matchingProduct) {
// //       window.setTimeout(() => {
// //         document
// //           .getElementById(`product-${matchingProduct.id}`)
// //           ?.scrollIntoView({
// //             behavior: "smooth",
// //             block: "center",
// //           });
// //       }, 350);
// //     }
// //   }

// //   const firstName = userName?.trim().split(/\s+/)[0] || "";

// //   return (
// //     <header className="sticky top-0 z-50 bg-[#F7F2EA]">
// //       {searchFocused && (
// //         <button
// //           type="button"
// //           aria-label="Close search"
// //           className="fixed inset-0 z-[55] cursor-default bg-[#30232F]/40 backdrop-blur-[1px]"
// //           onClick={() => setSearchFocused(false)}
// //         />
// //       )}

// //       {/* Top header */}
// //       <div className="relative z-[56] border-b border-[#E4D9CB]">
// //         <div className="mx-auto grid min-h-[70px] max-w-[1800px] grid-cols-[1fr_auto] items-center gap-x-3 gap-y-3 px-4 py-2 sm:px-7 lg:min-h-[82px] lg:grid-cols-[minmax(160px,1fr)_minmax(260px,450px)_minmax(250px,1fr)] lg:gap-6 lg:px-8 xl:px-12">
// //           <a
// //             href="#home"
// //             aria-label="The Soft Edit homepage"
// //             className="group relative flex w-fit shrink-0 items-center"
// //           >
// //             <span className="pointer-events-none absolute -inset-3 rounded-full bg-[#B99A62]/10 opacity-0 blur-xl transition duration-700 group-hover:opacity-100" />
// //             <img
// //               src={logo}
// //               alt="The Soft Edit"
// //               className="relative h-auto w-[65px] object-contain transition-transform duration-500 group-hover:scale-[1.04] sm:w-[78px] lg:w-[92px]"
// //             />
// //           </a>

// //           {/* Search */}
// //           <form
// //             role="search"
// //             onSubmit={handleSearch}
// //             className={`relative order-3 col-span-2 w-full rounded-full transition-all duration-300 lg:order-none lg:col-span-1 ${
// //               searchFocused
// //                 ? "shadow-[0_0_0_3px_rgba(185,154,98,0.18),0_8px_24px_rgba(75,22,92,0.10)]"
// //                 : "shadow-[0_3px_12px_rgba(90,64,55,0.05)]"
// //             }`}
// //           >
// //             <div
// //               className={`flex items-center overflow-hidden rounded-full border bg-[#F7F2EA] transition-colors ${
// //                 searchFocused
// //                   ? "border-[#B99A62]"
// //                   : "border-[#B99A62]/60 hover:border-[#B99A62]"
// //               }`}
// //             >
// //               <Search
// //                 size={16}
// //                 className="ml-3 shrink-0 text-[#7D8768]"
// //                 strokeWidth={1.7}
// //               />
// //               <input
// //                 type="search"
// //                 value={searchQuery}
// //                 onChange={(event) => setSearchQuery(event.target.value)}
// //                 onFocus={() => setSearchFocused(true)}
// //                 placeholder="Discover your next skin ritual..."
// //                 aria-label="Search products"
// //                 className="h-10 min-w-0 flex-1 border-0 bg-transparent px-2.5 text-[12px] text-[#5A4037] outline-none ring-0 placeholder:text-[#5A4037]/60 focus:border-0 focus:outline-none focus:ring-0 sm:h-11 sm:text-[13px]"
// //               />
// //               <button
// //                 type="submit"
// //                 aria-label="Search"
// //                 className="group/search relative mr-1 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#4B165C] text-[#F7F2EA] transition-all duration-300 hover:scale-105 hover:bg-[#5A4037] active:scale-95 sm:h-9 sm:w-9"
// //               >
// //                 <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-[#B99A62]/40 to-transparent transition-transform duration-700 group-hover/search:translate-x-full" />
// //                 <ArrowUpRight
// //                   size={17}
// //                   className="relative transition-transform duration-300 group-hover/search:rotate-12"
// //                 />
// //               </button>
// //             </div>
// //           </form>

// //           {/* Right controls */}
// //           <div className="flex min-w-0 items-center justify-end gap-1 sm:gap-2.5 lg:gap-3 xl:gap-4">
// //             <button
// //               type="button"
// //               aria-label="Prices displayed in British pounds"
// //               title="Prices displayed in British pounds"
// //               className="group hidden items-center gap-1.5 rounded-full px-2 py-1.5 text-[#5A4037] transition hover:bg-[#B99A62]/10 hover:text-[#4B165C] sm:flex"
// //             >
// //               <span className="text-xs">🇬🇧</span>
// //               <span className="text-[12px] font-medium tracking-[0.08em]">
// //                 GBP
// //               </span>
// //               <ChevronDown
// //                 size={13}
// //                 className="transition-transform group-hover:translate-y-0.5"
// //               />
// //             </button>

// //             {/* Account */}
// //             <div
// //               ref={accountRef}
// //               className="relative"
// //               onMouseEnter={() => {
// //                 if (window.matchMedia("(hover: hover)").matches) {
// //                   setAccountOpen(true);
// //                 }
// //               }}
// //               onMouseLeave={() => setAccountOpen(false)}
// //             >
// //               <button
// //                 type="button"
// //                 aria-expanded={accountOpen}
// //                 aria-haspopup="true"
// //                 onClick={() => setAccountOpen((current) => !current)}
// //                 className={`group flex items-center gap-1.5 whitespace-nowrap rounded-full border px-1.5 py-1 transition-all duration-300 sm:gap-2 sm:px-2 ${
// //                   accountOpen
// //                     ? "border-[#B99A62]/50 bg-[#B99A62]/10 text-[#4B165C]"
// //                     : "border-transparent text-[#5A4037] hover:border-[#B99A62]/40 hover:bg-[#B99A62]/10 hover:text-[#4B165C]"
// //                 }`}
// //               >
// //                 <span
// //                   className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
// //                     accountOpen
// //                       ? "rotate-[-6deg] border-[#4B165C] bg-[#4B165C] text-[#F7F2EA]"
// //                       : "border-[#B99A62]/40 bg-[#B99A62]/10 text-[#4B165C] group-hover:-rotate-6 group-hover:bg-[#4B165C] group-hover:text-[#F7F2EA]"
// //                   }`}
// //                 >
// //                   <UserRound size={18} strokeWidth={1.6} />
// //                 </span>

// //                 <span className="hidden max-w-[145px] truncate text-[12px] font-medium sm:inline sm:text-[13px]">
// //                   {isSignedIn ? `Welcome, ${firstName}` : "Account"}
// //                 </span>

// //                 <ChevronDown
// //                   size={13}
// //                   className={`hidden transition-transform duration-300 sm:block ${
// //                     accountOpen ? "rotate-180 text-[#B99A62]" : ""
// //                   }`}
// //                 />
// //               </button>

// //               {/* Account dropdown */}
// //               <div
// //                 className={`absolute right-0 top-full z-[70] w-[min(310px,calc(100vw-24px))] pt-2 transition-all duration-300 ${
// //                   accountOpen
// //                     ? "visible translate-y-0 scale-100 opacity-100"
// //                     : "invisible pointer-events-none translate-y-2 scale-[0.98] opacity-0"
// //                 }`}
// //               >
// //                 <div className="overflow-hidden rounded-2xl border border-[#B99A62]/40 bg-[#F7F2EA] text-[#5A4037] shadow-[0_15px_45px_rgba(75,22,92,0.16)]">
// //                   <div className="relative overflow-hidden border-b border-[#B99A62]/30 bg-gradient-to-br from-[#B99A62]/10 via-[#F7F2EA] to-[#7D8768]/10 p-5">
// //                     <span className="pointer-events-none absolute -right-8 -top-12 h-32 w-32 rounded-full border border-[#B99A62]/25 bg-[#B99A62]/10" />

// //                     <span className="relative mb-3 flex items-center gap-2 text-[9px] tracking-[0.16em] text-[#7D8768]">
// //                       <span className="h-1.5 w-1.5 rounded-full bg-[#7D8768]" />
// //                       YOUR PERSONAL BEAUTY SPACE
// //                     </span>

// //                     <p
// //                       className="relative text-[22px] leading-tight text-[#4B165C]"
// //                       style={{ fontFamily: '"Canosa", Georgia, serif' }}
// //                     >
// //                       {isSignedIn
// //                         ? `Welcome, ${firstName}`
// //                         : "Welcome to The Soft Edit"}
// //                     </p>

// //                     <p className="relative mt-2 text-[13px] leading-5 text-[#5A4037]/85">
// //                       {isSignedIn
// //                         ? "Your favourites, orders and everyday rituals, all in one place."
// //                         : "Sign in to keep your favourites and shopping bag close."}
// //                     </p>

// //                     {!isSignedIn ? (
// //                       <div className="relative mt-4 grid grid-cols-2 gap-2.5">
// //                         <a
// //                           href="/login"
// //                           onClick={() => setAccountOpen(false)}
// //                           className="group/login flex min-h-10 items-center justify-center gap-1 rounded-full border border-[#4B165C] bg-[#4B165C] px-3 py-2 text-sm font-semibold text-[#F7F2EA] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5A4037] hover:bg-[#5A4037]"
// //                         >
// //                           Login
// //                           <ArrowUpRight
// //                             size={14}
// //                             className="transition-transform group-hover/login:translate-x-0.5 group-hover/login:-translate-y-0.5"
// //                           />
// //                         </a>
// //                         <a
// //                           href="/register"
// //                           onClick={() => setAccountOpen(false)}
// //                           className="group/register flex min-h-10 items-center justify-center gap-1 rounded-full border border-[#B99A62]/60 px-3 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B99A62]/15"
// //                         >
// //                           Register
// //                           <ArrowUpRight
// //                             size={14}
// //                             className="transition-transform group-hover/register:translate-x-0.5 group-hover/register:-translate-y-0.5"
// //                           />
// //                         </a>
// //                       </div>
// //                     ) : (
// //                       <button
// //                         type="button"
// //                         onClick={() => {
// //                           setAccountOpen(false);
// //                           onSignOut();
// //                         }}
// //                         className="relative mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-full border border-[#B99A62]/60 px-4 py-2 text-sm font-semibold text-[#4B165C] transition hover:border-[#4B165C] hover:bg-[#B99A62]/15"
// //                       >
// //                         Sign out
// //                       </button>
// //                     )}
// //                   </div>

// //                   <nav aria-label="Account navigation" className="p-2">
// //                     {accountLinks.map((item, index) => (
// //                       <a
// //                         key={item.label}
// //                         href={item.href}
// //                         onClick={() => setAccountOpen(false)}
// //                         className="group/link flex items-center justify-between rounded-xl px-3.5 py-3 text-[13px] text-[#5A4037] transition-all duration-300 hover:translate-x-1 hover:bg-[#B99A62]/10 hover:text-[#4B165C]"
// //                         style={{
// //                           animation: accountOpen
// //                             ? `seAccountEnter 350ms ${index * 45}ms both`
// //                             : "none",
// //                         }}
// //                       >
// //                         {item.label}
// //                         <ArrowUpRight
// //                           size={15}
// //                           className="text-[#7D8768] opacity-0 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-100"
// //                         />
// //                       </a>
// //                     ))}
// //                   </nav>

// //                   <div className="border-t border-[#B99A62]/30 bg-[#7D8768]/[0.04] px-3 py-3 text-center">
// //                     <span className="mx-auto block h-px w-8 bg-gradient-to-r from-transparent via-[#B99A62] to-transparent" />
// //                     <p className="mt-2 text-[9px] tracking-[0.14em] text-[#7D8768]">
// //                       YOUR SKIN. YOUR RITUAL. YOUR EDIT.
// //                     </p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Basket */}
// //             <button
// //               type="button"
// //               onClick={onOpenBag}
// //               aria-label={`Basket containing ${bagCount} items`}
// //               className="group/basket flex items-center gap-1.5 border-l border-[#B99A62]/40 pl-2 text-[#5A4037] transition-all duration-300 hover:text-[#4B165C] sm:gap-2 sm:pl-3 lg:pl-4"
// //             >
// //               <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#B99A62]/10 text-[#4B165C] transition-all duration-300 group-hover/basket:-translate-y-0.5 group-hover/basket:rotate-[-4deg] group-hover/basket:bg-[#4B165C] group-hover/basket:text-[#F7F2EA] group-hover/basket:shadow-[0_4px_12px_rgba(75,22,92,0.16)]">
// //                 <ShoppingBag
// //                   size={19}
// //                   strokeWidth={1.7}
// //                   className="transition-transform duration-300 group-hover/basket:rotate-[8deg]"
// //                 />
// //                 <span
// //                   key={bagCount}
// //                   className="absolute -right-0.5 -top-0.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full border border-[#F7F2EA] bg-[#4B165C] px-1 text-[9px] font-bold text-[#F7F2EA]"
// //                 >
// //                   {bagCount}
// //                 </span>
// //               </span>
// //               <span className="hidden text-[12px] font-medium sm:inline">
// //                 Basket
// //               </span>
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main navigation */}
// //       <nav
// //         aria-label="Main navigation"
// //         className="hidden border-b border-[#B99A62]/40 bg-[#4B165C] text-[#F7F2EA] lg:block"
// //       >
// //         <div className="mx-auto flex min-h-[50px] max-w-[1800px] items-center justify-between gap-3 px-8 xl:px-12">
// //           {primaryLinks.map((item) => (
// //             <a
// //               key={item.label}
// //               href={item.href}
// //               className="group relative whitespace-nowrap py-4 text-[11px] font-medium transition-colors duration-300 hover:text-[#D9BE8B] xl:text-[12px]"
// //             >
// //               {item.label}
// //               <span className="absolute bottom-2 left-0 h-px w-0 bg-[#B99A62] transition-all duration-300 group-hover:w-full" />
// //             </a>
// //           ))}
// //         </div>
// //       </nav>

// //       {/* Promotional navigation */}
// //       <nav
// //         aria-label="Featured shopping links"
// //         className="hidden border-b border-[#B99A62] bg-[#F7F2EA] lg:block"
// //       >
// //         <div className="mx-auto grid min-h-[48px] max-w-[1800px] grid-cols-5 items-center px-6 xl:px-12">
// //           {promotionalLinks.map((item, index) => (
// //             <a
// //               key={item.label}
// //               href={item.href}
// //               className={`flex min-h-[30px] items-center justify-center px-2 text-center text-[11px] font-medium text-[#5A4037] transition-colors duration-300 hover:text-[#4B165C] xl:text-[12px] ${
// //                 index > 0 ? "border-l border-[#B99A62]" : ""
// //               }`}
// //             >
// //               {item.label}
// //             </a>
// //           ))}
// //         </div>
// //       </nav>

// //       {/* Mobile navigation */}
// //       <div className="border-b border-[#E4D9CB] bg-[#F7F2EA] lg:hidden">
// //         <div className="flex items-center justify-between px-4 py-2">
// //           <button
// //             type="button"
// //             aria-expanded={menuOpen}
// //             aria-controls="soft-edit-mobile-menu"
// //             onClick={() => setMenuOpen((current) => !current)}
// //             className="flex items-center gap-2 py-2 text-[10px] font-semibold tracking-[0.12em] text-[#4B165C]"
// //           >
// //             {menuOpen ? <X size={17} /> : <Menu size={17} />}
// //             {menuOpen ? "CLOSE MENU" : "EXPLORE"}
// //           </button>
// //           <span className="font-serif text-sm italic text-[#7D8768]">
// //             Your everyday ritual
// //           </span>
// //         </div>

// //         <div
// //           id="soft-edit-mobile-menu"
// //           className={`grid transition-all duration-300 ${
// //             menuOpen
// //               ? "grid-rows-[1fr] opacity-100"
// //               : "pointer-events-none grid-rows-[0fr] opacity-0"
// //           }`}
// //         >
// //           <div className="overflow-hidden">
// //             <nav className="border-t border-[#E4D9CB] px-4 py-2">
// //               {[...primaryLinks, ...promotionalLinks].map((item, index) => (
// //                 <a
// //                   key={`${item.label}-${index}`}
// //                   href={item.href}
// //                   onClick={() => setMenuOpen(false)}
// //                   className="flex items-center justify-between border-b border-[#E4D9CB]/70 py-3 text-sm text-[#5A4037] transition-colors last:border-0 hover:text-[#4B165C]"
// //                 >
// //                   {item.label}
// //                   <ArrowUpRight size={15} className="text-[#B99A62]" />
// //                 </a>
// //               ))}
// //             </nav>
// //           </div>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }

// function Header({
//   bagCount,
//   onOpenBag,
//   userName,
//   onSignOut,
// }: HeaderProps) {
//   const [accountOpen, setAccountOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchFocused, setSearchFocused] = useState(false);

//   const accountRef = useRef<HTMLDivElement>(null);
//   const searchRef = useRef<HTMLInputElement>(null);

//   const isSignedIn = Boolean(userName?.trim());
//   const firstName = userName?.trim().split(/\s+/)[0] || "";

//   const primaryLinks = [
//     { label: "New & Noteworthy", href: "#shop" },
//     { label: "Skincare", href: "#categories" },
//     { label: "Makeup", href: "#shop" },
//     { label: "The Edit", href: "#our-story" },
//     { label: "Bestsellers", href: "#shop" },
//     { label: "Offers", href: "#shop", special: true },
//   ];

//   const promotionalLinks = [
//     { label: "Build Your Routine", href: "#categories" },
//     { label: "The Soft Edit Sets", href: "#shop" },
//     { label: "Gifts & Little Luxuries", href: "#shop" },
//   ];

//   const searchResults = searchQuery.trim()
//     ? products
//         .filter((product) =>
//           `${product.name} ${product.category}`
//             .toLowerCase()
//             .includes(searchQuery.trim().toLowerCase()),
//         )
//         .slice(0, 4)
//     : [];

//   useEffect(() => {
//     function handleOutsideClick(event: MouseEvent) {
//       if (
//         accountRef.current &&
//         !accountRef.current.contains(event.target as Node)
//       ) {
//         setAccountOpen(false);
//       }
//     }

//     function handleEscape(event: KeyboardEvent) {
//       if (event.key === "Escape") {
//         setAccountOpen(false);
//         setMenuOpen(false);
//         setSearchFocused(false);
//       }
//     }

//     document.addEventListener("mousedown", handleOutsideClick);
//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   function closeHeaderPanels() {
//     setAccountOpen(false);
//     setMenuOpen(false);
//     setSearchFocused(false);
//   }

//   function goToSection(sectionId: string) {
//     closeHeaderPanels();

//     document.getElementById(sectionId)?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   }

//   function handleSearch(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     const query = searchQuery.trim().toLowerCase();

//     if (!query) {
//       searchRef.current?.focus();
//       return;
//     }

//     const matchingProduct = products.find((product) =>
//       `${product.name} ${product.category}`.toLowerCase().includes(query),
//     );

//     closeHeaderPanels();

//     if (matchingProduct) {
//       window.setTimeout(() => {
//         const productElement = document.getElementById(
//           `product-${matchingProduct.id}`,
//         );

//         if (productElement) {
//           productElement.scrollIntoView({
//             behavior: "smooth",
//             block: "center",
//           });
//         } else {
//           document.getElementById("shop")?.scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           });
//         }
//       }, 100);
//     } else {
//       document.getElementById("shop")?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   }

//   function openSearchResult(productId: string | number) {
//     closeHeaderPanels();

//     const productElement = document.getElementById(`product-${productId}`);

//     if (productElement) {
//       productElement.scrollIntoView({
//         behavior: "smooth",
//         block: "center",
//       });
//     } else {
//       document.getElementById("shop")?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   }

//   return (
//     <header className="group/header sticky top-0 z-[60] isolate w-full overflow-visible border-b border-[#B99A62]/60 bg-[#FAF7F1]/95 text-[#4B165C] shadow-[0_8px_35px_rgba(48,35,47,0.13)] backdrop-blur-2xl">
//       {/* LUMINOUS TOP EDGE */}
//       <div className="relative h-[2px] overflow-hidden bg-gradient-to-r from-[#7D8768] via-[#B99A62] via-40% to-[#4B165C]">
//         <div className="absolute inset-y-0 left-0 w-1/3 animate-[pulse_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
//         <div className="absolute right-[15%] top-0 h-full w-16 bg-[#F0D6ED] blur-sm" />
//       </div>

//       {/* AMBIENT BACKGROUND */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-[linear-gradient(112deg,#FFF9EF_0%,#F0E1D5_24%,#EAD9EC_49%,#DDE4D4_73%,#F9E8DF_100%)] opacity-90" />

//         <div className="absolute -left-12 top-0 h-28 w-28 animate-[spin_28s_linear_infinite] rounded-full bg-[conic-gradient(from_20deg,#B99A62_0%,#EAD9EC_22%,#7D8768_48%,#F1D5C7_72%,#B99A62_100%)] opacity-20 blur-2xl" />

//         <div className="absolute -right-8 -top-8 h-32 w-32 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-[#4B165C]/25 blur-2xl" />

//         <div className="absolute left-[35%] top-0 h-20 w-40 animate-[pulse_9s_ease-in-out_infinite] rounded-full bg-[#D9BE8B]/35 blur-2xl" />

//         <div className="absolute bottom-0 right-[25%] h-16 w-32 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-[#7D8768]/20 blur-2xl" />

//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(255,255,255,0.85),transparent_32%),radial-gradient(ellipse_at_90%_100%,rgba(185,154,98,0.13),transparent_35%)]" />
//       </div>

//       {/* SEARCH BACKDROP */}
//       {searchFocused && (
//         <button
//           type="button"
//           aria-label="Close search suggestions"
//           className="fixed inset-0 z-[55] cursor-default bg-[#30232F]/20 backdrop-blur-[2px]"
//           onClick={() => setSearchFocused(false)}
//         />
//       )}

//       {/* ANNOUNCEMENT BAR */}
//       <div className="group/announcement relative isolate h-[27px] overflow-hidden bg-gradient-to-r from-[#30232F] via-[#4B165C] via-55% to-[#30232F] text-[#FAF7F1] sm:h-[29px]">
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-[25deg] bg-gradient-to-r from-transparent via-[#E9D7B5]/35 to-transparent transition-transform duration-[1600ms] group-hover/announcement:translate-x-[450%]"
//         />

//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute left-[12%] top-1/2 h-14 w-14 -translate-y-1/2 rounded-full bg-[#B99A62]/20 blur-xl transition-all duration-700 group-hover/announcement:scale-150"
//         />

//         <div className="relative mx-auto flex h-full max-w-[1800px] items-center justify-center gap-2 px-3 text-center">
//           <Sparkles
//             size={11}
//             className="shrink-0 animate-[pulse_2s_ease-in-out_infinite] text-[#F2D9A4]"
//             strokeWidth={1.8}
//           />

//           <p className="bg-gradient-to-r from-[#FFF9EF] via-[#E9CDA0] to-[#FFF9EF] bg-clip-text text-[8px] font-semibold uppercase tracking-[0.14em] text-transparent sm:text-[9px] sm:tracking-[0.22em]">
//             A little luxury, thoughtfully chosen
//           </p>

//           <span className="hidden text-[#D9BE8B] sm:inline">✳</span>

//           <a
//             href="#shop"
//             onClick={closeHeaderPanels}
//             className="hidden text-[8px] font-medium uppercase tracking-[0.12em] text-[#F0DDBA] underline decoration-[#B99A62]/60 underline-offset-2 transition-all duration-300 hover:text-white sm:inline"
//           >
//             Discover the edit
//           </a>
//         </div>
//       </div>

//       {/* MAIN HEADER ROW */}
//       <div className="soft-header relative border-b border-[#B99A62]/35">
//         <div className="soft-header-inner mx-auto grid min-h-[57px] max-w-[1800px] grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 px-3 py-1.5 sm:px-6 lg:min-h-[64px] lg:grid-cols-[minmax(180px,1fr)_minmax(240px,440px)_minmax(280px,1fr)] lg:gap-5 lg:px-8 xl:px-12">
//           {/* LOGO AND BRAND */}
//           <a
//             href="#home"
//             aria-label="The Soft Edit homepage"
//             onClick={closeHeaderPanels}
//             className="soft-logo group relative flex w-fit shrink-0 items-center gap-2 sm:gap-3"
//           >
//             <span>
//               <img
//                 src={logo}
//                 alt=""
//                 aria-hidden="true"
//                 className="relative z-10 h-auto w-[66px] border-none object-contain sm:w-[78px] lg:w-[88px]"
//               />
//             </span>

//             <span className="relative z-10 hidden flex-col justify-center sm:flex">
//               <span
//                 className="whitespace-nowrap bg-gradient-to-r from-[#4B165C] via-[#81528A] to-[#4B165C] bg-clip-text font-serif text-[16px] leading-none tracking-[0.045em] text-transparent transition-all duration-500 group-hover/logo:tracking-[0.085em]"
//                 style={{ fontFamily: '"Canosa", Georgia, serif' }}
//               >
//                 THE SOFT EDIT
//               </span>

//               <span className="mt-1.5 flex items-center gap-1.5">
//                 <span className="h-px w-3 bg-gradient-to-r from-[#B99A62] to-[#E8D8EA] transition-all duration-500 group-hover/logo:w-6" />

//                 <span className="whitespace-nowrap text-[7px] font-semibold uppercase tracking-[0.14em] text-[#657052]">
//                   BEAUTY, WITH INTENTION
//                 </span>
//               </span>
//             </span>
//           </a>

//           {/* SEARCH */}
//           <form
//             role="search"
//             onSubmit={handleSearch}
//             className={`relative z-[60] order-3 col-span-2 w-full rounded-full transition-all duration-300 lg:order-none lg:col-span-1 ${
//               searchFocused
//                 ? "bg-white/80 shadow-[0_0_0_2px_rgba(185,154,98,0.35),0_8px_28px_rgba(75,22,92,0.17)]"
//                 : "shadow-[0_4px_18px_rgba(75,22,92,0.07)] hover:shadow-[0_5px_22px_rgba(75,22,92,0.13)]"
//             }`}
//           >
//             <div
//               className={`relative flex min-w-0 items-center overflow-hidden rounded-full border bg-[#FFFDF9]/90 transition-all duration-300 ${
//                 searchFocused
//                   ? "border-[#B99A62]"
//                   : "border-[#B99A62]/50 hover:border-[#4B165C]/50"
//               }`}
//             >
//               <span className="ml-3 flex shrink-0 items-center text-[#7D8768] transition-colors duration-300">
//                 <Search
//                   size={14}
//                   strokeWidth={1.8}
//                   className={searchFocused ? "text-[#4B165C]" : ""}
//                 />
//               </span>

//               <input
//                 ref={searchRef}
//                 type="search"
//                 value={searchQuery}
//                 onChange={(event) => setSearchQuery(event.target.value)}
//                 onFocus={() => setSearchFocused(true)}
//                 placeholder="Discover your next skin ritual..."
//                 aria-label="Search for a product"
//                 aria-expanded={searchFocused && searchResults.length > 0}
//                 className="h-[35px] min-w-0 flex-1 border-0 bg-transparent px-2.5 text-[11px] tracking-[0.01em] text-[#4B165C] outline-none ring-0 placeholder:text-[#7B6A72]/75 focus:border-0 focus:outline-none focus:ring-0 sm:h-[38px] sm:px-3 sm:text-[12px]"
//               />

//               <button
//                 type="submit"
//                 aria-label="Search products"
//                 className="group/search relative mr-1 flex h-[28px] w-[28px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#5D2A69] via-[#4B165C] to-[#30232F] text-[#FFF9EF] shadow-[0_3px_8px_rgba(75,22,92,0.20)] transition-all duration-300 hover:scale-105 hover:shadow-[0_4px_14px_rgba(75,22,92,0.35)] active:scale-90 sm:h-[31px] sm:w-[31px]"
//               >
//                 <span
//                   aria-hidden="true"
//                   className="pointer-events-none absolute inset-y-0 -left-full w-full skew-x-[-25deg] bg-gradient-to-r from-transparent via-[#F4DDAA]/70 to-transparent transition-transform duration-700 group-hover/search:translate-x-[220%]"
//                 />

//                 <Search
//                   size={15}
//                   strokeWidth={1.9}
//                   className="relative transition-transform duration-300 group-hover/search:rotate-[-12deg] group-hover/search:scale-110"
//                 />
//               </button>

//               <span
//                 aria-hidden="true"
//                 className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-gradient-to-r from-[#7D8768] via-[#D9BE8B] to-[#4B165C] transition-all duration-300 ${
//                   searchFocused ? "w-2/5 opacity-100" : "w-0 opacity-0"
//                 }`}
//               />
//             </div>

//             {/* SEARCH SUGGESTIONS */}
//             {searchFocused && searchResults.length > 0 && (
//               <div className="absolute left-0 right-0 top-full z-[90] mt-2 overflow-hidden rounded-2xl border border-[#B99A62]/45 bg-[#FFFCF7] p-2 shadow-[0_18px_45px_rgba(48,35,47,0.23)]">
//                 <div className="flex items-center justify-between px-3 pb-2 pt-2">
//                   <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-[#7D8768]">
//                     Your discoveries
//                   </p>
//                   <Sparkles size={12} className="text-[#B99A62]" />
//                 </div>

//                 {searchResults.map((product) => (
//                   <button
//                     key={product.id}
//                     type="button"
//                     onMouseDown={(event) => event.preventDefault()}
//                     onClick={() => openSearchResult(product.id)}
//                     className="group/result flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-[12px] text-[#5A4037] transition-all duration-200 hover:translate-x-0.5 hover:bg-gradient-to-r hover:from-[#E8D8EA]/70 hover:to-[#F7F2EA] hover:text-[#4B165C]"
//                   >
//                     <span className="min-w-0 truncate">{product.name}</span>

//                     <ArrowUpRight
//                       size={14}
//                       className="shrink-0 text-[#B99A62] transition-transform duration-200 group-hover/result:-translate-y-0.5 group-hover/result:translate-x-0.5"
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}

//             {searchFocused &&
//               searchQuery.trim().length > 0 &&
//               searchResults.length === 0 && (
//                 <div className="absolute left-0 right-0 top-full z-[90] mt-2 rounded-2xl border border-[#B99A62]/40 bg-[#FFFCF7] p-4 shadow-[0_15px_40px_rgba(48,35,47,0.18)]">
//                   <p className="text-[12px] text-[#5A4037]">
//                     No exact match yet. Try another product name or category.
//                   </p>
//                 </div>
//               )}
//           </form>

//           {/* RIGHT-SIDE CONTROLS */}
//           <div className="flex min-w-0 items-center justify-end gap-1 sm:gap-2 lg:gap-3 xl:gap-4">
//             {/* CURRENCY */}
//             <button
//               type="button"
//               aria-label="Currency: British pounds"
//               title="Prices displayed in British pounds"
//               className="group/currency hidden items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-1.5 text-[#5A4037] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/60 hover:text-[#4B165C] sm:flex"
//             >
//               <span className="text-[12px] transition-transform duration-500 group-hover/currency:rotate-[-12deg] group-hover/currency:scale-110">
//                 🇬🇧
//               </span>

//               <span className="text-[11px] font-semibold tracking-[0.08em]">
//                 GBP
//               </span>

//               <ChevronDown
//                 size={12}
//                 className="transition-transform duration-300 group-hover/currency:translate-y-0.5 group-hover/currency:text-[#B99A62]"
//               />
//             </button>

//             {/* ACCOUNT */}
//             <div
//               ref={accountRef}
//               className="relative"
//               onMouseEnter={() => {
//                 if (window.matchMedia("(hover: hover)").matches) {
//                   setAccountOpen(true);
//                 }
//               }}
//               onMouseLeave={() => setAccountOpen(false)}
//             >
//               <button
//                 type="button"
//                 aria-expanded={accountOpen}
//                 aria-haspopup="true"
//                 onClick={() => setAccountOpen((current) => !current)}
//                 className={`group flex items-center gap-1.5 whitespace-nowrap rounded-full border px-1.5 py-1 transition-all duration-300 sm:gap-2 sm:px-2 ${
//                   accountOpen
//                     ? "border-[#B99A62]/50 bg-[#B99A62]/10 text-[#4B165C]"
//                     : "border-transparent text-[#5A4037] hover:border-[#B99A62]/40 hover:bg-[#B99A62]/10 hover:text-[#4B165C]"
//                 }`}
//               >
//                 <span
//                   className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
//                     accountOpen
//                       ? "rotate-[-6deg] border-[#4B165C] bg-[#4B165C] text-[#F7F2EA]"
//                       : "border-[#B99A62]/40 bg-[#B99A62]/10 text-[#4B165C] group-hover:-rotate-6 group-hover:bg-[#4B165C] group-hover:text-[#F7F2EA]"
//                   }`}
//                 >
//                   <UserRound size={18} strokeWidth={1.6} />
//                 </span>

//                 <span className="hidden max-w-[145px] truncate text-[12px] font-medium sm:inline">
//                   {isSignedIn ? `Welcome, ${firstName}` : "Account"}
//                 </span>

//                 <ChevronDown
//                   size={13}
//                   className={`hidden transition-transform duration-300 sm:block ${
//                     accountOpen ? "rotate-180 text-[#B99A62]" : ""
//                   }`}
//                 />
//               </button>

//               {/* ACCOUNT DROPDOWN */}
//               <div
//                 className={`absolute right-0 top-full z-[70] w-[min(300px,calc(100vw-24px))] pt-2 transition-all duration-300 ${
//                   accountOpen
//                     ? "visible translate-y-0 scale-100 opacity-100"
//                     : "invisible pointer-events-none translate-y-2 scale-[0.98] opacity-0"
//                 }`}
//               >
//                 <div className="overflow-hidden rounded-2xl border border-[#B99A62]/40 bg-[#F7F2EA] text-[#5A4037] shadow-[0_15px_45px_rgba(75,22,92,0.14)]">
//                   {/* WELCOME */}
//                   <div className="relative overflow-hidden border-b border-[#B99A62]/30 bg-gradient-to-br from-[#B99A62]/10 via-[#F7F2EA] to-[#7D8768]/10 p-5">
//                     <span className="pointer-events-none absolute -right-8 -top-12 h-32 w-32 rounded-full border border-[#B99A62]/25 bg-[#B99A62]/10 transition-transform duration-700 group-hover:scale-125" />

//                     <span className="relative mb-3 flex items-center gap-2 text-[10px] tracking-[0.16em] text-[#7D8768]">
//                       <span className="h-1.5 w-1.5 rounded-full bg-[#535A43]" />
//                       YOUR PERSONAL BEAUTY SPACE
//                     </span>

//                     <p
//                       className="relative text-[20px] leading-tight text-[#4B165C]"
//                       style={{ fontFamily: '"Canosa", Georgia, serif' }}
//                     >
//                       {isSignedIn
//                         ? `Welcome, ${firstName}`
//                         : "Welcome to The Soft Edit"}
//                     </p>

//                     <p className="relative mt-2 text-[13px] leading-5 text-[#5A4037]/85">
//                       {isSignedIn
//                         ? "Your favourites, orders and everyday rituals, all in one place."
//                         : "Your personal space for skincare and everyday rituals."}
//                     </p>

//                     {!isSignedIn ? (
//                       <div className="relative mt-4 grid grid-cols-2 gap-2.5">
//                         <a
//                           href="/login"
//                           onClick={() => setAccountOpen(false)}
//                           className="group/login flex min-h-10 items-center justify-center gap-1 rounded-full border border-[#4B165C] bg-[#4B165C] px-3 py-2 font-bold text-[#F7F2EA] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#5A4037] hover:bg-[#5A4037] hover:shadow-md"
//                         >
//                           Login
//                           <ArrowUpRight
//                             size={14}
//                             className="transition-transform duration-300 group-hover/login:translate-x-0.5 group-hover/login:-translate-y-0.5"
//                           />
//                         </a>

//                         <a
//                           href="/register"
//                           onClick={() => setAccountOpen(false)}
//                           className="group/register flex min-h-10 items-center justify-center gap-1 rounded-full border border-[#B99A62]/60 bg-transparent px-3 py-2 font-bold text-[#4B165C] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#B99A62]/15 hover:shadow-sm"
//                         >
//                           Register
//                           <ArrowUpRight
//                             size={14}
//                             className="transition-transform duration-300 group-hover/register:translate-x-0.5 group-hover/register:-translate-y-0.5"
//                           />
//                         </a>
//                       </div>
//                     ) : (
//                       <button
//                         type="button"
//                         onClick={() => {
//                           setAccountOpen(false);
//                           onSignOut();
//                         }}
//                         className="relative mt-4 inline-flex min-h-10 w-full items-center justify-center rounded-full border border-[#B99A62]/60 px-4 py-2 text-sm font-semibold text-[#4B165C] transition-all duration-300 hover:border-[#4B165C] hover:bg-[#B99A62]/15"
//                       >
//                         Sign out
//                         <ArrowUpRight size={14} className="ml-1" />
//                       </button>
//                     )}
//                   </div>

//                   {/* ACCOUNT LINKS */}
//                   <nav aria-label="Account navigation" className="p-2">
//                     {accountLinks.map((item, index) => (
//                       <a
//                         key={item.label}
//                         href={item.href}
//                         onClick={() => setAccountOpen(false)}
//                         className="group/link flex items-center justify-between rounded-xl px-3.5 py-2.5 text-[13px] text-[#5A4037] transition-all duration-300 hover:translate-x-1 hover:bg-[#B99A62]/10 hover:pl-4 hover:text-[#4B165C]"
//                         style={{
//                           animation: accountOpen
//                             ? `seAccountEnter 350ms ${index * 50}ms both`
//                             : "none",
//                         }}
//                       >
//                         <span>{item.label}</span>

//                         <ArrowUpRight
//                           size={15}
//                           className="text-[#7D8768] opacity-0 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:opacity-100"
//                         />
//                       </a>
//                     ))}
//                   </nav>

//                   {/* BRAND SIGNATURE */}
//                   <div className="border-t border-[#B99A62]/30 bg-[#7D8768]/[0.04] px-3 py-3 text-center">
//                     <span className="mx-auto block h-px w-8 bg-gradient-to-r from-transparent via-[#B99A62] to-transparent" />

//                     <p className="mt-2 text-[10px] tracking-[0.14em] text-[#7D8768]">
//                       YOUR SKIN. YOUR RITUAL. YOUR EDIT.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* BASKET */}
//             <button
//               type="button"
//               onClick={onOpenBag}
//               aria-label={`Basket containing ${bagCount} items`}
//               className="group/basket flex items-center gap-1.5 border-l border-[#B99A62]/40 pl-2 text-[#5A4037] transition-all duration-300 hover:text-[#4B165C] sm:gap-2 sm:pl-3 lg:pl-4"
//             >
//               <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#B99A62]/10 text-[#4B165C] transition-all duration-300 group-hover/basket:-translate-y-0.5 group-hover/basket:rotate-[-4deg] group-hover/basket:bg-[#4B165C] group-hover/basket:text-[#F7F2EA] group-hover/basket:shadow-[0_4px_12px_rgba(75,22,92,0.16)]">
//                 <ShoppingBag
//                   size={19}
//                   strokeWidth={1.7}
//                   className="transition-transform duration-300 group-hover/basket:rotate-[8deg]"
//                 />

//                 <span
//                   key={bagCount}
//                   className="absolute -right-0.5 -top-0.5 flex h-[16px] min-w-[16px] animate-[seBagPop_400ms_ease-out] items-center justify-center rounded-full border border-[#F7F2EA] bg-[#4B165C] px-1 text-[10px] font-extrabold text-[#F7F2EA]"
//                 >
//                   {bagCount}
//                 </span>
//               </span>

//               <span className="hidden text-[12px] font-medium sm:inline">
//                 Basket
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* COMPACT DESKTOP NAVIGATION */}
//       <div className="relative isolate overflow-hidden border-t border-[#B99A62]/40 bg-gradient-to-r from-[#FFF9EF] via-[#F0E3EB] to-[#EDF0E4]">
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_12%_50%,rgba(185,154,98,0.20),transparent_38%),radial-gradient(ellipse_at_85%_50%,rgba(75,22,92,0.11),transparent_40%),radial-gradient(ellipse_at_50%_100%,rgba(125,135,104,0.13),transparent_48%)]"
//         />

//         <nav
//           aria-label="Main navigation"
//           className="mx-auto hidden min-h-[36px] max-w-[1800px] items-center justify-center gap-x-6 px-5 py-1 md:flex lg:gap-x-10 xl:gap-x-14"
//         >
//           {primaryLinks.map((link, index) => (
//             <a
//               key={link.label}
//               href={link.href}
//               onClick={closeHeaderPanels}
//               className={`group/nav relative inline-flex min-h-[29px] items-center whitespace-nowrap py-1.5 text-[9px] uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-0.5 lg:text-[10px] lg:tracking-[0.16em] ${
//                 link.special
//                   ? "font-bold text-[#805C23] hover:text-[#4B165C]"
//                   : "font-semibold text-[#5A4037] hover:text-[#4B165C]"
//               }`}
//             >
//               {link.special && (
//                 <Sparkles
//                   size={10}
//                   className="mr-1.5 text-[#B99A62] transition-transform duration-500 group-hover/nav:rotate-45 group-hover/nav:scale-125"
//                 />
//               )}

//               <span className="relative">
//                 {link.label}

//                 <span
//                   aria-hidden="true"
//                   className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-gradient-to-r from-[#7D8768] via-[#D9BE8B] to-[#4B165C] transition-all duration-300 ${
//                     link.special
//                       ? "w-1/2 group-hover/nav:w-full"
//                       : "w-0 group-hover/nav:w-full"
//                   }`}
//                 />
//               </span>

//               <span
//                 aria-hidden="true"
//                 className="pointer-events-none absolute inset-x-[-7px] inset-y-0 -z-10 rounded-md bg-white/55 opacity-0 shadow-[0_2px_10px_rgba(255,255,255,0.5)] transition-opacity duration-300 group-hover/nav:opacity-100"
//               />

//               <span className="sr-only">
//                 {index === 0 ? "Browse " : ""}
//               </span>
//             </a>
//           ))}
//         </nav>

//         {/* MOBILE NAVIGATION */}
//         <div className="mx-auto flex min-h-[39px] max-w-[1800px] items-center justify-between gap-2 px-3 py-1.5 sm:px-6 md:hidden">
//           <button
//             type="button"
//             aria-expanded={menuOpen}
//             aria-controls="soft-edit-mobile-menu"
//             onClick={() => setMenuOpen((open) => !open)}
//             className="group/mobile-toggle flex items-center gap-1.5 rounded-full border border-[#B99A62]/55 bg-white/55 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#4B165C] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4B165C]/45 hover:bg-[#EAD9EC]/60"
//           >
//             <span className="relative flex h-4 w-4 items-center justify-center">
//               {menuOpen ? (
//                 <X size={14} />
//               ) : (
//                 <Menu
//                   size={14}
//                   className="transition-transform duration-300 group-hover/mobile-toggle:rotate-12"
//                 />
//               )}
//             </span>

//             {menuOpen ? "Close" : "Explore"}
//           </button>

//           <p className="flex items-center gap-1.5 font-serif text-[11px] italic text-[#6A5149]">
//             <Sparkles
//               size={11}
//               className="animate-[pulse_2s_ease-in-out_infinite] text-[#B99A62]"
//             />
//             The art of everyday
//           </p>

//           <button
//             type="button"
//             onClick={() => goToSection("shop")}
//             className="group/mobile-shop flex items-center gap-1 rounded-full px-1 py-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-[#4B165C] transition-all duration-300 hover:text-[#805C23]"
//           >
//             Shop
//             <ArrowUpRight
//               size={12}
//               className="transition-transform duration-300 group-hover/mobile-shop:translate-x-0.5 group-hover/mobile-shop:-translate-y-0.5"
//             />
//           </button>
//         </div>

//         {/* MOBILE MENU */}
//         {menuOpen && (
//           <div
//             id="soft-edit-mobile-menu"
//             className="border-t border-[#B99A62]/35 bg-gradient-to-br from-[#FFF9EF] via-[#F7F2EA] to-[#EAD9EC]/60 px-3 pb-4 pt-3 shadow-[0_16px_35px_rgba(48,35,47,0.14)] sm:px-6 md:hidden"
//           >
//             <p className="mb-2.5 text-[8px] font-semibold uppercase tracking-[0.21em] text-[#7D8768]">
//               Find your next favourite
//             </p>

//             <nav
//               aria-label="Mobile main navigation"
//               className="grid grid-cols-2 gap-2"
//             >
//               {primaryLinks.map((link, index) => (
//                 <a
//                   key={link.label}
//                   href={link.href}
//                   onClick={closeHeaderPanels}
//                   className={`group/mobile-link flex min-h-[42px] items-center justify-between gap-2 rounded-xl border px-3 py-2.5 transition-all duration-300 hover:-translate-y-0.5 ${
//                     link.special
//                       ? "border-[#D9BE8B] bg-gradient-to-r from-[#F6EBD8] to-[#EAD9EC] text-[#805C23]"
//                       : "border-[#E5D8C7] bg-white/75 text-[#5A4037] hover:border-[#B99A62] hover:bg-white hover:text-[#4B165C]"
//                   }`}
//                   style={{ transitionDelay: `${index * 20}ms` }}
//                 >
//                   <span className="text-[9px] font-semibold uppercase tracking-[0.06em]">
//                     {link.label}
//                   </span>

//                   <ArrowUpRight
//                     size={13}
//                     className="shrink-0 text-[#B99A62] transition-transform duration-300 group-hover/mobile-link:-translate-y-0.5 group-hover/mobile-link:translate-x-0.5"
//                   />
//                 </a>
//               ))}
//             </nav>

//             <div className="my-3 border-t border-[#B99A62]/30" />

//             <p className="mb-2.5 text-[8px] font-semibold uppercase tracking-[0.21em] text-[#7D8768]">
//               Thoughtfully curated
//             </p>

//             <div className="flex flex-wrap gap-2">
//               {promotionalLinks.map((link) => (
//                 <a
//                   key={link.label}
//                   href={link.href}
//                   onClick={closeHeaderPanels}
//                   className="rounded-full border border-[#DCCDBB] bg-white/50 px-3 py-2 text-[9px] text-[#6A5149] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B99A62] hover:bg-[#EAD9EC]/50 hover:text-[#4B165C]"
//                 >
//                   {link.label}
//                 </a>
//               ))}
//             </div>

//             <div className="relative isolate mt-3 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-[#30232F] via-[#4B165C] to-[#5B3761] px-4 py-3 text-[#FAF7F1] shadow-[0_5px_18px_rgba(75,22,92,0.16)]">
//               <div
//                 aria-hidden="true"
//                 className="pointer-events-none absolute -right-5 -top-9 -z-10 h-24 w-24 animate-[spin_25s_linear_infinite] rounded-full border border-[#D9BE8B]/45 bg-[conic-gradient(from_20deg,rgba(217,190,139,0.25),transparent,rgba(125,135,104,0.25),transparent)]"
//               />

//               <div className="flex items-start justify-between gap-3">
//                 <div>
//                   <p className="text-[8px] uppercase tracking-[0.19em] text-[#E9D7B5]">
//                     A moment for yourself
//                   </p>

//                   <p className="mt-1 font-serif text-[18px]">
//                     Find your everyday favourite.
//                   </p>
//                 </div>

//                 <Sparkles
//                   size={17}
//                   className="mt-1 shrink-0 animate-[pulse_3s_ease-in-out_infinite] text-[#E9D7B5]"
//                 />
//               </div>

//               <a
//                 href="#categories"
//                 onClick={closeHeaderPanels}
//                 className="mt-2 inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-white/90 transition-colors hover:text-[#E9D7B5]"
//               >
//                 Explore our world
//                 <ArrowUpRight size={13} />
//               </a>
//             </div>

//             {/* MOBILE AUTHENTICATION */}
//             <div className="mt-3 grid grid-cols-2 gap-2">
//               {isSignedIn ? (
//                 <>
//                   <a
//                     href="/account"
//                     onClick={closeHeaderPanels}
//                     className="flex items-center justify-center gap-1.5 rounded-full border border-[#4B165C]/65 bg-white/50 px-3 py-2.5 text-[10px] font-semibold text-[#4B165C] transition-all duration-300 hover:bg-[#EAD9EC]/60"
//                   >
//                     <UserRound size={14} />
//                     My Account
//                   </a>

//                   <button
//                     type="button"
//                     onClick={() => {
//                       closeHeaderPanels();
//                       onSignOut();
//                     }}
//                     className="flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#4B165C] to-[#30232F] px-3 py-2.5 text-[10px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(75,22,92,0.24)]"
//                   >
//                     Sign out
//                     <ArrowUpRight size={13} />
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <a
//                     href="/login"
//                     onClick={closeHeaderPanels}
//                     className="flex items-center justify-center gap-1.5 rounded-full border border-[#4B165C]/65 bg-white/50 px-3 py-2.5 text-[10px] font-semibold text-[#4B165C] transition-all duration-300 hover:bg-[#EAD9EC]/60"
//                   >
//                     <UserRound size={14} />
//                     Sign in
//                   </a>

//                   <a
//                     href="/register"
//                     onClick={closeHeaderPanels}
//                     className="flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#4B165C] to-[#30232F] px-3 py-2.5 text-[10px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(75,22,92,0.24)]"
//                   >
//                     Join The Soft Edit
//                     <ArrowUpRight size={13} />
//                   </a>
//                 </>
//               )}
//             </div>
//           </div>
//         )}

//         {/* GOLDEN BASELINE */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#B99A62]/80 to-transparent"
//         />
//       </div>
//     </header>
//   );
// }


// // function Hero() {
// //   const [activeSlide, setActiveSlide] = useState(0);
// //   const [paused, setPaused] = useState(false);
// //   const currentSlide = heroSlides[activeSlide];

// //   useEffect(() => {
// //     if (paused) return;

// //     const timer = window.setInterval(() => {
// //       setActiveSlide((current) => (current + 1) % heroSlides.length);
// //     }, 5000);

// //     return () => window.clearInterval(timer);
// //   }, [paused]);

// //   function showNext() {
// //     setActiveSlide((current) => (current + 1) % heroSlides.length);
// //   }

// //   function showPrevious() {
// //     setActiveSlide(
// //       (current) => (current - 1 + heroSlides.length) % heroSlides.length,
// //     );
// //   }

// //   return (
// //     <section id="home" className="px-3 pt-3 sm:px-5 sm:pt-5">
// //       <div
// //         className="group relative mx-auto min-h-[570px] max-w-[1600px] overflow-hidden bg-[#30232F] sm:min-h-[650px] lg:min-h-[700px]"
// //         onMouseEnter={() => setPaused(true)}
// //         onMouseLeave={() => setPaused(false)}
// //         onFocus={() => setPaused(true)}
// //         onBlur={(event) => {
// //           if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
// //             setPaused(false);
// //           }
// //         }}
// //         aria-roledescription="carousel"
// //         aria-label="The Soft Edit beauty campaigns"
// //       >
// //         {heroSlides.map((slide, index) => (
// //           <img
// //             key={slide.image}
// //             src={slide.image}
// //             alt={index === activeSlide ? slide.alt : ""}
// //             aria-hidden={index !== activeSlide}
// //             loading={index === 0 ? "eager" : "lazy"}
// //             className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-[1200ms] ${
// //               index === activeSlide
// //                 ? "scale-100 opacity-100"
// //                 : "scale-[1.04] opacity-0"
// //             }`}
// //           />
// //         ))}

// //         <div className="absolute inset-0 bg-gradient-to-r from-[#30232F]/85 via-[#30232F]/45 to-[#30232F]/10" />
// //         <div className="absolute inset-0 bg-gradient-to-t from-[#30232F]/50 via-transparent to-[#30232F]/10" />

// //         <div
// //           key={activeSlide}
// //           className="relative flex min-h-[570px] max-w-[790px] flex-col items-start justify-center px-7 pb-24 pt-16 text-white sm:min-h-[650px] sm:px-14 sm:pb-28 lg:min-h-[700px] lg:px-20"
// //         >
// //           <div className="mb-7 flex items-center gap-3">
// //             <span className="h-px w-9 bg-[#B99A62]" />
// //             <p className="text-[9px] font-medium tracking-[0.22em] sm:text-xs">
// //               {currentSlide.eyebrow}
// //             </p>
// //           </div>

// //           <h1
// //             className="max-w-[700px] font-serif text-5xl font-normal leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[86px]"
// //             style={{ fontFamily: '"Canosa", Georgia, serif' }}
// //           >
// //             {currentSlide.title.map((line, index) => (
// //               <span
// //                 key={`${activeSlide}-${index}`}
// //                 className="block animate-[seTitleIn_700ms_ease_both]"
// //                 style={{ animationDelay: `${index * 130}ms` }}
// //               >
// //                 {line}
// //               </span>
// //             ))}
// //           </h1>

// //           <p className="mt-6 max-w-[390px] text-sm leading-7 text-white/90 sm:text-base">
// //             {currentSlide.description}
// //           </p>

// //           <a
// //             href="#shop"
// //             className="group/hero mt-9 inline-flex items-center gap-8 bg-[#F7F2EA] px-7 py-4 text-[10px] font-semibold tracking-[0.16em] text-[#5A4037] transition-all duration-500 hover:-translate-y-1 hover:bg-[#B99A62] hover:text-[#30232F] sm:text-xs"
// //           >
// //             {currentSlide.button}
// //             <ArrowUpRight
// //               size={17}
// //               className="transition-transform duration-300 group-hover/hero:translate-x-1 group-hover/hero:-translate-y-1"
// //             />
// //           </a>

// //           <a
// //             href="#categories"
// //             className="absolute bottom-8 left-7 flex items-center gap-3 text-[9px] tracking-[0.14em] text-white/90 transition-colors duration-300 hover:text-[#B99A62] sm:left-14 lg:left-20"
// //           >
// //             <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 transition-all duration-300 hover:border-[#B99A62] hover:bg-[#B99A62]/15">
// //               <ArrowDown size={15} />
// //             </span>
// //             A MOMENT FOR YOURSELF
// //           </a>

// //           <div className="absolute bottom-8 right-7 hidden text-right text-white md:block lg:right-10">
// //             <p className="font-serif text-2xl italic">
// //               {currentSlide.signature}
// //             </p>
// //             <p className="mt-2 text-[9px] tracking-[0.2em]">THE SOFT EDIT</p>
// //           </div>
// //         </div>

// //         <div className="absolute bottom-[90px] right-7 z-20 flex items-center gap-3 sm:right-14 lg:right-20">
// //           <button
// //             type="button"
// //             onClick={showPrevious}
// //             aria-label="Previous campaign"
// //             className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white transition-all duration-300 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#30232F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A62]"
// //           >
// //             <ArrowLeft size={15} />
// //           </button>

// //           <div className="flex items-center gap-2">
// //             {heroSlides.map((slide, index) => (
// //               <button
// //                 key={slide.image}
// //                 type="button"
// //                 onClick={() => setActiveSlide(index)}
// //                 aria-label={`Show campaign ${index + 1}`}
// //                 aria-current={activeSlide === index ? "true" : undefined}
// //                 className={`h-[3px] rounded-full transition-all duration-500 ${
// //                   activeSlide === index
// //                     ? "w-7 bg-[#B99A62]"
// //                     : "w-3 bg-white/55 hover:bg-white"
// //                 }`}
// //               />
// //             ))}
// //           </div>

// //           <button
// //             type="button"
// //             onClick={showNext}
// //             aria-label="Next campaign"
// //             className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white transition-all duration-300 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#30232F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A62]"
// //           >
// //             <ArrowRight size={15} />
// //           </button>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// function Hero() {
//   const [activeSlide, setActiveSlide] = useState(0);
//   const currentSlide = heroSlides[activeSlide];

//   useEffect(() => {
//     const timer = window.setInterval(() => {
//       setActiveSlide((current) => (current + 1) % heroSlides.length);
//     }, 5000);

//     return () => window.clearInterval(timer);
//   }, []);

//   const showNext = () => {
//     setActiveSlide((current) => (current + 1) % heroSlides.length);
//   };

//   const showPrevious = () => {
//     setActiveSlide(
//       (current) => (current - 1 + heroSlides.length) % heroSlides.length,
//     );
//   };

//   return (
//     <section id="home" className="px-3 pt-3 sm:px-5 sm:pt-5">
//       <div
//         className="hero-frame group relative mx-auto min-h-[570px] max-w-[1600px] overflow-hidden bg-[#5A4037] sm:min-h-[650px] lg:min-h-[700px]"
//         onBlur={(event) => {
//           if (
//             !event.currentTarget.contains(
//               event.relatedTarget as Node | null,
//             )
//           ) {
//             // Keep the carousel available for keyboard users.
//           }
//         }}
//         aria-roledescription="carousel"
//         aria-label="The Soft Edit beauty campaigns"
//       >
//         {/* BACKGROUND SLIDES */}
//         {heroSlides.map((slide, index) => (
//           <img
//             key={slide.image}
//             src={slide.image}
//             alt={index === activeSlide ? slide.alt : ""}
//             aria-hidden={index !== activeSlide}
//             fetchPriority={index === 0 ? "high" : "auto"}
//             loading={index === 0 ? "eager" : "lazy"}
//             className={`hero-slide-image absolute inset-0 h-full w-full object-cover object-center ${
//               index === activeSlide
//                 ? "hero-slide-active"
//                 : "hero-slide-inactive"
//             }`}
//           />
//         ))}

//         {/* LUXURY DARK OVERLAY */}
//         <div className="hero-slide-overlay absolute inset-0 bg-gradient-to-r from-[#30232F]/80 via-[#30232F]/40 to-[#30232F]/5" />

//         <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#30232F]/45 via-transparent to-[#30232F]/10" />

//         {/* MAIN CONTENT */}
//         <div
//           key={activeSlide}
//           className="hero-copy relative flex min-h-[570px] max-w-[790px] flex-col items-start justify-center px-7 pb-24 pt-16 text-white sm:min-h-[650px] sm:px-14 sm:pb-28 lg:min-h-[700px] lg:px-20"
//         >
//           {/* EYEBROW */}
//           <div className="hero-copy-item mb-7 flex items-center gap-3">
//             <span className="hero-gold-line h-px w-9 bg-[#B99A62]" />

//             <p className="text-[10px] font-medium tracking-[0.23em] sm:text-xs">
//               {currentSlide.eyebrow}
//             </p>
//           </div>

//           {/* ANIMATED HEADLINE */}
//           <h1
//             className="hero-copy-item hero-headline max-w-[700px] font-serif text-5xl font-normal leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[86px]"
//             style={{
//               animationDelay: "120ms",
//             }}
//           >
//             {currentSlide.title.map((line, index) => (
//               <span
//                 key={`${activeSlide}-${index}`}
//                 className="hero-title-line block"
//                 style={{
//                   animationDelay: `${180 + index * 140}ms`,
//                 }}
//               >
//                 {line}
//               </span>
//             ))}
//           </h1>

//           {/* SLIDE DESCRIPTION */}
//           <p
//             className="hero-copy-item mt-6 max-w-[390px] text-sm leading-7 text-white/90 sm:text-base"
//             style={{
//               animationDelay: "430ms",
//             }}
//           >
//             {currentSlide.description}
//           </p>

//           {/* PRIMARY CTA */}
//           <a
//             href="#shop"
//             className="hero-copy-item hero-cta group/hero mt-9 inline-flex items-center gap-8 bg-[#F7F2EA] px-7 py-4 text-[10px] font-semibold tracking-[0.16em] transition-all duration-500 hover:-translate-y-1 hover:bg-[#B99A62] sm:text-xs"
//             style={{
//               color: BRAND.cocoa,
//             }}
//             onMouseEnter={(event) => {
//               event.currentTarget.style.color = "#F7F2EA";
//             }}
//             onMouseLeave={(event) => {
//               event.currentTarget.style.color = BRAND.cocoa;
//             }}
//           >
//             {currentSlide.button}

//             <ArrowUpRight
//               size={17}
//               className="transition-transform duration-500 group-hover/hero:translate-x-1 group-hover/hero:-translate-y-1"
//             />
//           </a>

//           {/* BOTTOM LEFT LINK */}
//           <a
//             href="#categories"
//             className="hero-copy-item absolute bottom-8 left-7 flex items-center gap-3 text-[9px] tracking-[0.14em] text-white/90 transition-colors duration-300 hover:text-[#B99A62] sm:left-14 lg:left-20"
//             style={{
//               animationDelay: "650ms",
//             }}
//           >
//             <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 transition-all duration-500 hover:border-[#B99A62] hover:bg-[#B99A62]/15">
//               <ArrowDown size={15} />
//             </span>

//             A MOMENT FOR YOURSELF
//           </a>

//           {/* BOTTOM RIGHT SIGNATURE */}
//           <div
//             className="hero-copy-item absolute bottom-8 right-7 hidden text-right text-white md:block lg:right-10"
//             style={{
//               animationDelay: "700ms",
//             }}
//           >
//             <p className="font-serif text-2xl italic">
//               {currentSlide.signature}
//             </p>

//             <p className="mt-2 text-[9px] tracking-[0.2em]">
//               THE SOFT EDIT
//             </p>
//           </div>
//         </div>

//         {/* SLIDE CONTROLS */}
//         <div className="absolute bottom-[90px] right-7 z-20 flex items-center gap-3 sm:right-14 lg:right-20">
//           <button
//             type="button"
//             onClick={showPrevious}
//             aria-label="Previous campaign"
//             className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white transition-all duration-300 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#30232F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A62]"
//           >
//             <ArrowLeft size={15} />
//           </button>

//           <div
//             className="flex items-center gap-2"
//             aria-label={`Slide ${activeSlide + 1} of ${heroSlides.length}`}
//           >
//             {heroSlides.map((slide, index) => (
//               <button
//                 key={slide.image}
//                 type="button"
//                 onClick={() => setActiveSlide(index)}
//                 aria-label={`Show campaign ${index + 1}`}
//                 aria-current={activeSlide === index ? "true" : undefined}
//                 className={`hero-indicator ${
//                   activeSlide === index
//                     ? "hero-indicator-active"
//                     : "hero-indicator-inactive"
//                 }`}
//               >
//                 <span className="sr-only">
//                   Campaign {index + 1}
//                 </span>
//               </button>
//             ))}
//           </div>

//           <button
//             type="button"
//             onClick={showNext}
//             aria-label="Next campaign"
//             className="flex h-9 w-9 items-center justify-center rounded-full border border-white/35 text-white transition-all duration-300 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#30232F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B99A62]"
//           >
//             <ArrowRight size={15} />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// // function BrandPromises() {
// //   return (
// //     <section className="border-b border-[#E5DACE] bg-[#F7F2EA]">
// //       <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-x-4 gap-y-7 px-5 py-10 sm:grid-cols-4 sm:px-10 lg:py-12">
// //         {promises.map((promise) => (
// //           <div key={promise.number} className="flex gap-3">
// //             <span className="font-serif text-sm italic text-[#B99A62]">
// //               {promise.number}
// //             </span>
// //             <div>
// //               <p className="text-[9px] font-semibold tracking-[0.1em] sm:text-[10px]">
// //                 {promise.title}
// //               </p>
// //               <p className="mt-1.5 text-xs leading-5 text-[#7A685E]">
// //                 {promise.description}
// //               </p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }

// // function Categories() {
// //   return (
// //     <section
// //       id="categories"
// //       className="scroll-mt-36 mx-auto max-w-[1440px] px-5 py-20 sm:px-10 sm:py-28"
// //     >
// //       <div className="mb-9 flex flex-col justify-between gap-5 sm:mb-12 sm:flex-row sm:items-end">
// //         <SectionIntro
// //           eyebrow="A LITTLE CARE GOES A LONG WAY"
// //           title={
// //             <>
// //               Your skin, <em>your way.</em>
// //             </>
// //           }
// //           description="Start with what your skin needs. Find the little essentials that make your everyday routine feel a little more special."
// //         />

// //         <a
// //           href="#shop"
// //           className="inline-flex items-center gap-3 self-start border-b border-[#4B165C] pb-2 text-[10px] tracking-[0.12em] text-[#4B165C] transition-colors hover:text-[#7D8768] sm:self-auto"
// //         >
// //           EXPLORE ALL SKINCARE
// //           <ArrowRight size={15} />
// //         </a>
// //       </div>

// //       <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
// //         {categories.map((category, index) => (
// //           <a key={category.name} href="#shop" className="group">
// //             <div className="relative aspect-[4/5] overflow-hidden bg-[#E8DCD2]">
// //               <img
// //                 src={category.image}
// //                 alt={category.name}
// //                 loading="lazy"
// //                 className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-[#30232F]/40 via-transparent to-transparent" />

// //               <span className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F2EA]/95 text-[#4B165C] transition-all duration-300 group-hover:bg-[#4B165C] group-hover:text-white sm:bottom-5 sm:left-5">
// //                 <ArrowUpRight size={17} />
// //               </span>

// //               <span className="absolute right-4 top-4 font-serif text-sm italic text-white">
// //                 0{index + 1}
// //               </span>
// //             </div>

// //             <h3
// //               className="mt-4 font-serif text-xl text-[#4B165C] sm:text-2xl"
// //               style={{ fontFamily: '"Canosa", Georgia, serif' }}
// //             >
// //               {category.name}
// //             </h3>
// //             <p className="mt-1 text-xs leading-5 text-[#7A685E]">
// //               {category.description}
// //             </p>
// //           </a>
// //         ))}
// //       </div>
// //     </section>
// //   );
// // }

// // type ProductGridProps = {
// //   onAddToBag: (product: Product) => void;
// //   saved: number[];
// //   onToggleSaved: (id: number) => void;
// // };

// // function ProductGrid({
// //   onAddToBag,
// //   saved,
// //   onToggleSaved,
// // }: ProductGridProps) {
// //   return (
// //     <section
// //       id="shop"
// //       className="scroll-mt-36 bg-[#F0E8DE] px-5 py-20 sm:px-10 sm:py-28"
// //     >
// //       <div className="mx-auto max-w-[1440px]">
// //         <div className="mb-10 flex items-end justify-between gap-4 sm:mb-14">
// //           <SectionIntro
// //             eyebrow="THE ONES WE KEEP COMING BACK TO"
// //             title={
// //               <>
// //                 The <em>edit</em> of essentials.
// //               </>
// //             }
// //             description="Meet your new bathroom-shelf favourites. Simple staples for a routine you'll love."
// //           />

// //           <a
// //             href="#categories"
// //             className="hidden items-center gap-2 border-b border-[#4B165C] pb-2 text-[10px] tracking-[0.1em] text-[#4B165C] transition-colors hover:text-[#7D8768] sm:flex"
// //           >
// //             VIEW EVERYTHING
// //             <ArrowRight size={15} />
// //           </a>
// //         </div>

// //         <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
// //           {products.map((product) => {
// //             const isSaved = saved.includes(product.id);

// //             return (
// //               <article
// //                 key={product.id}
// //                 id={`product-${product.id}`}
// //                 className="group min-w-0 scroll-mt-40"
// //               >
// //                 <div
// //                   className="relative aspect-[4/4.8] overflow-hidden"
// //                   style={{ backgroundColor: product.color }}
// //                 >
// //                   <img
// //                     src={product.image}
// //                     alt={product.name}
// //                     loading="lazy"
// //                     className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
// //                   />

// //                   <span className="absolute left-2 top-2 bg-[#F7F2EA] px-2 py-2 text-[8px] tracking-[0.06em] sm:left-3 sm:top-3 sm:px-3 sm:text-[9px]">
// //                     {product.tag}
// //                   </span>

// //                   <button
// //                     type="button"
// //                     onClick={() => onToggleSaved(product.id)}
// //                     aria-label={
// //                       isSaved
// //                         ? `Remove ${product.name} from wishlist`
// //                         : `Add ${product.name} to wishlist`
// //                     }
// //                     aria-pressed={isSaved}
// //                     className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F2EA]/95 transition-all duration-300 hover:scale-110 hover:bg-white sm:right-3 sm:top-3"
// //                   >
// //                     <Heart
// //                       size={17}
// //                       fill={isSaved ? BRAND.purple : "none"}
// //                       color={isSaved ? BRAND.purple : BRAND.cocoa}
// //                     />
// //                   </button>

// //                   <button
// //                     type="button"
// //                     onClick={() => onAddToBag(product)}
// //                     className="absolute inset-x-2 bottom-2 flex items-center justify-center gap-2 bg-[#F7F2EA] px-2 py-3 text-[9px] font-semibold tracking-[0.08em] text-[#4B165C] transition-all duration-300 hover:bg-[#4B165C] hover:text-white sm:inset-x-3 sm:bottom-3 sm:py-4 sm:text-[10px]"
// //                   >
// //                     ADD TO BAG
// //                     <ShoppingBag size={15} />
// //                   </button>
// //                 </div>

// //                 <div className="pt-4">
// //                   <p className="text-[8px] tracking-[0.1em] text-[#7A685E] sm:text-[9px]">
// //                     {product.category}
// //                   </p>
// //                   <h3
// //                     className="mt-2 font-serif text-base leading-snug text-[#4B165C] sm:text-xl"
// //                     style={{ fontFamily: '"Canosa", Georgia, serif' }}
// //                   >
// //                     {product.name}
// //                   </h3>
// //                   <div className="mt-3 flex items-center justify-between gap-2">
// //                     <p className="text-sm font-medium text-[#5A4037]">
// //                       {formatPrice(product.price)}
// //                     </p>
// //                     <span className="hidden items-center gap-1 text-[9px] text-[#7D8768] sm:flex">
// //                       <Sparkles size={12} />
// //                       THE EDIT
// //                     </span>
// //                   </div>
// //                 </div>
// //               </article>
// //             );
// //           })}
// //         </div>

// //         <a
// //           href="#categories"
// //           className="mx-auto mt-10 flex w-fit items-center gap-3 border border-[#4B165C] px-5 py-4 text-center text-[10px] tracking-[0.12em] text-[#4B165C] transition-all duration-300 hover:bg-[#4B165C] hover:text-white sm:mt-14 sm:px-7"
// //         >
// //           FIND YOUR SKINCARE ESSENTIALS
// //           <ArrowRight size={16} />
// //         </a>
// //       </div>
// //     </section>
// //   );
// // }

// // function BrandStory() {
// //   return (
// //     <section
// //       id="our-story"
// //       className="scroll-mt-36 mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-20 sm:px-10 sm:py-28 lg:grid-cols-2 lg:gap-20"
// //     >
// //       <div className="relative">
// //         <img
// //           src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=85"
// //           alt="A considered arrangement of skincare essentials"
// //           loading="lazy"
// //           className="aspect-[5/4] w-full object-cover"
// //         />
// //         <div className="absolute -bottom-5 -right-3 hidden bg-[#E8DCD1] px-7 py-6 sm:block">
// //           <p className="font-serif text-xl italic text-[#4B165C]">
// //             Beauty, but make it you.
// //           </p>
// //         </div>
// //       </div>

// //       <div className="lg:py-8">
// //         <p className="text-[10px] font-semibold tracking-[0.22em] text-[#7D8768]">
// //           A NOTE FROM US
// //         </p>

// //         <h2
// //           className="mt-5 font-serif text-4xl leading-tight tracking-[-0.035em] text-[#4B165C] sm:text-5xl"
// //           style={{ fontFamily: '"Canosa", Georgia, serif' }}
// //         >
// //           Not more.
// //           <br />
// //           Just <em>what matters.</em>
// //         </h2>

// //         <p className="mt-6 text-sm leading-7 text-[#7A685E] sm:text-base sm:leading-8">
// //           We believe skincare should feel like a little kindness to yourself,
// //           not another thing on your to-do list.
// //         </p>

// //         <p className="mt-4 text-sm leading-7 text-[#7A685E] sm:text-base sm:leading-8">
// //           The Soft Edit is about making thoughtful choices, finding what works
// //           for you, and leaving the noise behind. A considered collection of
// //           everyday essentials, chosen to help you create a ritual that feels
// //           entirely your own.
// //         </p>

// //         <a
// //           href="#newsletter"
// //           className="mt-8 inline-flex items-center gap-4 border-b border-[#4B165C] pb-3 text-.[10px] font-medium tracking-[0.15em] text-[#4B165C] transition-colors hover:text-[#7D8768]"
// //         >
// //           GET TO KNOW US
// //           <ArrowUpRight size={17} />
// //         </a>
// //       </div>
// //     </section>
// //   );
// // }

// // function Newsletter() {
// //   const [email, setEmail] = useState("");
// //   const [subscribed, setSubscribed] = useState(false);

// //   function handleSubscribe(event: FormEvent<HTMLFormElement>) {
// //     event.preventDefault();

// //     if (email.trim()) {
// //       setSubscribed(true);
// //       setEmail("");
// //     }
// //   }

// //   return (
// //     <section
// //       id="newsletter"
// //       className="scroll-mt-36 bg-[#EDE3E9] px-5 py-20 text-center sm:px-10 sm:py-24"
// //     >
// //       <div className="mx-auto max-w-xl">
// //         <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#D4BDD3] text-[#4B165C]">
// //           <Sparkles size={21} />
// //         </span>

// //         <p className="mt-6 text-[10px] font-semibold tracking-[0.22em] text-[#7D8768]">
// //           A NOTE FROM THE SOFT SIDE
// //         </p>

// //         <h2
// //           className="mt-4 font-serif text-3xl leading-tight text-[#4B165C] sm:text-4xl"
// //           style={{ fontFamily: '"Canosa", Georgia, serif' }}
// //         >
// //           A little love for <em>your inbox.</em>
// //         </h2>

// //         <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#7A685E]">
// //           Skincare notes, thoughtful recommendations, and little treats. Only
// //           the good stuff.
// //         </p>

// //         {subscribed ? (
// //           <div
// //             role="status"
// //             className="mt-8 flex items-center justify-center gap-2 text-sm text-[#4B165C]"
// //           >
// //             <Check size={19} />
// //             Thank you! Your sign-up has been received.
// //           </div>
// //         ) : (
// //           <form
// //             onSubmit={handleSubscribe}
// //             className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
// //           >
// //             <label className="sr-only" htmlFor="newsletter-email">
// //               Your email address
// //             </label>
// //             <input
// //               id="newsletter-email"
// //               type="email"
// //               required
// //               autoComplete="email"
// //               value={email}
// //               onChange={(event) => setEmail(event.target.value)}
// //               placeholder="Your email address"
// //               className="min-w-0 flex-1 border border-[#D7C7D4] bg-[#F7F2EA] px-5 py-4 text-sm text-[#5A4037] outline-none transition focus:border-[#4B165C] placeholder:text-[#98877D]"
// //             />
// //             <button
// //               type="submit"
// //               className="flex items-center justify-center gap-3 bg-[#4B165C] px-7 py-4 text-[10px] font-semibold tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#351043]"
// //             >
// //               JOIN THE EDIT
// //               <ArrowRight size={16} />
// //             </button>
// //           </form>
// //         )}

// //         <p className="mt-5 text-[10px] leading-5 text-[#7A685E]">
// //           By subscribing, you agree to receive our emails. You can unsubscribe
// //           at any time.
// //         </p>
// //       </div>
// //     </section>
// //   );
// // }

// function Reveal({
//   children,
//   className = "",
//   delay = 0,
//   direction = "up",
// }: {
//   children: React.ReactNode;
//   className?: string;
//   delay?: number;
//   direction?: "up" | "left" | "right" | "none";
// }) {
//   const elementRef = useRef<HTMLDivElement>(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const element = elementRef.current;
//     if (!element) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         // Animate IN when entering the viewport.
//         // Animate OUT when leaving it.
//         // This works while scrolling both up and down.
//         setVisible(entry.isIntersecting);
//       },
//       {
//         threshold: 0.08,
//         rootMargin: "0px 0px -25px 0px",
//       },
//     );

//     observer.observe(element);

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   const hiddenTransform = {
//     up: "translate3d(0, 38px, 0)",
//     left: "translate3d(-38px, 0, 0)",
//     right: "translate3d(38px, 0, 0)",
//     none: "scale(0.97)",
//   }[direction];

//   return (
//     <div
//       ref={elementRef}
//       className={className}
//       style={{
//         opacity: visible ? 1 : 0,
//         transform: visible
//           ? "translate3d(0, 0, 0) scale(1)"
//           : hiddenTransform,
//         transition: `opacity 850ms ease ${visible ? delay : 0}ms, transform 1000ms cubic-bezier(0.2, 0.7, 0.2, 1) ${visible ? delay : 0}ms`,
//         willChange: "opacity, transform",
//       }}
//     >
//       {children}
//     </div>
//   );
// }




// function EditorialLabel({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.24em] text-[#7D8768] sm:text-[10px]">
//       <span className="h-px w-8 bg-[#B99A62]" />
//       {children}
//     </div>
//   );
// }

// // function SectionIntro({
// //   eyebrow,
// //   title,
// //   description,
// // }: {
// //   eyebrow: string;
// //   title: React.ReactNode;
// //   description: string;
// // }) {
// //   return (
// //     <div className="max-w-2xl">
// //       <EditorialLabel>{eyebrow}</EditorialLabel>
// //       <h2 className="mt-6 font-serif text-4xl font-normal leading-[1.08] tracking-[-0.045em] text-[#4B165C] sm:text-5xl md:text-6xl">
// //         {title}
// //       </h2>
// //       <p className="mt-5 max-w-lg text-sm leading-7 text-[#7A685E] sm:text-base sm:leading-8">
// //         {description}
// //       </p>
// //     </div>
// //   );
// // }


// /* 01 — BRAND PROMISES */

// function BrandPromises() {
//   const items = [
//     {
//       icon: Flower2,
//       title: "Beauty with intention",
//       detail: "Thoughtful choices, always.",
//     },
//     {
//       icon: ShieldCheck,
//       title: "Carefully considered",
//       detail: "A more personal approach.",
//     },
//     {
//       icon: Truck,
//       title: "A lovely delivery",
//       detail: "From our edit to your door.",
//     },
//     {
//       icon: Heart,
//       title: "Made to feel good",
//       detail: "Little rituals, more joy.",
//     },
//   ];

//   return (
//     <section className="relative overflow-hidden border-b border-[#E6D9CA] bg-[#FBF7F0]">
//       <div className="mx-auto grid max-w-[1600px] grid-cols-2 lg:grid-cols-4">
//         {items.map((item, index) => {
//           const Icon = item.icon;

//           return (
//             <Reveal
//               key={item.title}
//               delay={index * 100}
//               className={`group relative px-5 py-9 sm:px-8 sm:py-11 lg:px-10 ${
//                 index % 2 === 0 ? "border-r border-[#E6D9CA]" : ""
//               } ${
//                 index < 2
//                   ? "border-b border-[#E6D9CA] lg:border-b-0"
//                   : ""
//               } ${
//                 index !== 3 ? "lg:border-r lg:border-[#E6D9CA]" : ""
//               }`}
//             >
//               <div className="flex items-start gap-3 sm:gap-5">
//                 <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#B99A62]/40 text-[#4B165C] transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-[-8deg] group-hover:border-[#4B165C] group-hover:bg-[#4B165C] group-hover:text-[#F7F2EA] sm:h-12 sm:w-12">
//                   <Icon size={20} strokeWidth={1.3} />
//                 </div>

//                 <div>
//                   <p className="font-serif text-lg leading-tight text-[#4B165C] sm:text-xl">
//                     {item.title}
//                   </p>

//                   <p className="mt-2 text-xs leading-5 text-[#89766A] sm:text-sm">
//                     {item.detail}
//                   </p>
//                 </div>
//               </div>

//               <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#B99A62] transition-all duration-700 group-hover:w-full" />
//             </Reveal>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// /* 02 — EDITORIAL CATEGORY EXPERIENCE */

// function Categories() {
//   return (
//     <section
//       id="categories"
//       className="scroll-mt-36 overflow-hidden bg-[#F7F2EA] px-5 py-20 sm:px-10 sm:py-28 lg:py-36"
//     >
//       <div className="mx-auto max-w-[1500px]">
//         <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
//           <Reveal>
//             <SectionIntro
//               eyebrow="A MORE PERSONAL KIND OF BEAUTY"
//               title={
//                 <>
//                   Your ritual.
//                   <br />
//                   <em className="font-normal text-[#9A8061]">
//                     Your own rules.
//                   </em>
//                 </>
//               }
//               description="Discover the little things that make looking after yourself feel less like a routine and more like a moment you can call your own."
//             />
//           </Reveal>

//           <Reveal
//             direction="right"
//             delay={160}
//             className="lg:justify-self-end"
//           >
//             <a
//               href="#shop"
//               className="group inline-flex items-center gap-4 border-b border-[#B99A62] pb-3 text-[10px] font-semibold tracking-[0.17em] text-[#4B165C] transition-colors hover:text-[#7D8768]"
//             >
//               DISCOVER THE COLLECTION

//               <ArrowUpRight
//                 size={17}
//                 className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//               />
//             </a>
//           </Reveal>
//         </div>

//         <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-5 lg:grid-cols-4">
//           {categories.map((category, index) => (
//             <Reveal
//               key={category.name}
//               delay={index * 110}
//               className={index % 2 === 1 ? "lg:translate-y-8" : ""}
//             >
//               <a href="#shop" className="group block">
//                 <div className="relative aspect-[3/4] overflow-hidden bg-[#E8DCD1]">
//                   <img
//                     src={category.image}
//                     alt={category.name}
//                     loading="lazy"
//                     className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.09]"
//                   />

//                   <div className="absolute inset-0 bg-gradient-to-t from-[#30232F]/75 via-[#30232F]/5 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />

//                   <span className="absolute left-4 top-4 font-serif text-sm italic text-white/90 sm:left-6 sm:top-6">
//                     0{index + 1}
//                   </span>

//                   <div className="absolute inset-x-4 bottom-5 text-white sm:inset-x-6 sm:bottom-7">
//                     <p className="mb-2 text-[8px] uppercase tracking-[0.2em] text-[#E7CE9B] sm:text-[9px]">
//                       THE SOFT EDIT
//                     </p>

//                     <h3 className="font-serif text-2xl leading-tight sm:text-3xl">
//                       {category.name}
//                     </h3>

//                     <p className="mt-2 max-w-[220px] text-[10px] leading-5 text-white/80 sm:text-xs">
//                       {category.description}
//                     </p>

//                     <span className="mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 transition-all duration-500 group-hover:translate-x-1 group-hover:border-[#B99A62] group-hover:bg-[#B99A62] group-hover:text-[#30232F]">
//                       <ArrowUpRight size={17} />
//                     </span>
//                   </div>
//                 </div>
//               </a>
//             </Reveal>
//           ))}
//         </div>

//         <Reveal delay={200}>
//           <div className="mt-16 flex items-center justify-center gap-4 text-center sm:mt-24">
//             <span className="h-px w-10 bg-[#B99A62]/70" />

//             <p className="font-serif text-base italic text-[#7D8768] sm:text-lg">
//               A little care goes a long way.
//             </p>

//             <span className="h-px w-10 bg-[#B99A62]/70" />
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// /* 03 — THE PRODUCT EDIT */

// type ProductGridProps = {
//   onAddToBag: (product: Product) => void;
//   saved: number[];
//   onToggleSaved: (id: number) => void;
// };

// function ProductGrid({
//   onAddToBag,
//   saved,
//   onToggleSaved,
// }: ProductGridProps) {
//   const [activeCategory, setActiveCategory] = useState("All");

//   const filters = [
//     "All",
//     "Brightening",
//     "Hydration",
//     "Cleansing",
//     "Nourishing",
//   ];

//   const filteredProducts = products.filter((product) => {
//     if (activeCategory === "All") return true;

//     return product.category
//       .toLowerCase()
//       .includes(activeCategory.toLowerCase());
//   });

//   return (
//     <section
//       id="shop"
//       className="scroll-mt-36 relative overflow-hidden bg-[#EFE6DC] px-5 py-20 sm:px-10 sm:py-28 lg:py-36"
//     >
//       <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full border border-[#B99A62]/20" />

//       <div className="pointer-events-none absolute -right-28 top-[88px] h-72 w-72 rounded-full border border-[#B99A62]/20" />

//       <div className="relative mx-auto max-w-[1500px]">
//         <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
//           <Reveal>
//             <SectionIntro
//               eyebrow="CONSIDER THIS YOUR BEAUTY SHELF"
//               title={
//                 <>
//                   The art of
//                   <br />
//                   <em className="text-[#9A8061]">the everyday.</em>
//                 </>
//               }
//               description="A thoughtful edit of everyday favourites, chosen to bring a little more pleasure to your beauty ritual."
//             />
//           </Reveal>

//           <Reveal direction="right" delay={180}>
//             <div className="flex max-w-full flex-wrap gap-2">
//               {filters.map((filter) => (
//                 <button
//                   key={filter}
//                   type="button"
//                   onClick={() => setActiveCategory(filter)}
//                   aria-pressed={activeCategory === filter}
//                   className={`rounded-full border px-4 py-2.5 text-[10px] transition-all duration-300 sm:text-xs ${
//                     activeCategory === filter
//                       ? "border-[#4B165C] bg-[#4B165C] text-[#F7F2EA] shadow-md"
//                       : "border-[#CDBBAA] bg-[#F7F2EA]/60 text-[#6D594D] hover:border-[#4B165C] hover:text-[#4B165C]"
//                   }`}
//                 >
//                   {filter}
//                 </button>
//               ))}
//             </div>
//           </Reveal>
//         </div>

//         <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:mt-16 sm:gap-x-5 sm:gap-y-14 lg:grid-cols-4">
//           {filteredProducts.map((product, index) => {
//             const isSaved = saved.includes(product.id);

//             return (
//               <Reveal key={product.id} delay={index * 100}>
//                 <article
//                   id={`product-${product.id}`}
//                   className="group min-w-0 scroll-mt-40"
//                 >
//                   <div
//                     className="relative aspect-[4/5] overflow-hidden"
//                     style={{ backgroundColor: product.color }}
//                   >
//                     <img
//                       src={product.image}
//                       alt={product.name}
//                       loading="lazy"
//                       className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.08]"
//                     />

//                     <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#30232F]/15 via-transparent to-white/10 opacity-60" />

//                     <span className="absolute left-2 top-2 bg-[#F7F2EA]/95 px-2.5 py-2 text-[7px] font-medium tracking-[0.12em] text-[#4B165C] sm:left-4 sm:top-4 sm:px-3 sm:text-[9px]">
//                       {product.tag}
//                     </span>

//                     <button
//                       type="button"
//                       onClick={() => onToggleSaved(product.id)}
//                       aria-label={
//                         isSaved
//                           ? `Remove ${product.name} from wishlist`
//                           : `Add ${product.name} to wishlist`
//                       }
//                       aria-pressed={isSaved}
//                       className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F2EA]/95 text-[#4B165C] shadow-sm transition-all duration-300 hover:scale-110 hover:bg-white sm:right-4 sm:top-4 sm:h-10 sm:w-10"
//                     >
//                       <Heart
//                         size={17}
//                         strokeWidth={1.5}
//                         fill={isSaved ? BRAND.purple : "none"}
//                         className={
//                           isSaved
//                             ? "scale-110"
//                             : "transition-transform duration-300"
//                         }
//                       />
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() => onAddToBag(product)}
//                       className="absolute inset-x-2 bottom-2 flex translate-y-2 items-center justify-center gap-2 bg-[#F7F2EA] px-2 py-3 text-[9px] font-semibold tracking-[0.1em] text-[#4B165C] opacity-100 shadow-sm transition-all duration-500 hover:bg-[#4B165C] hover:text-white sm:inset-x-4 sm:bottom-4 sm:translate-y-3 sm:py-4 sm:text-[10px] sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100"
//                     >
//                       ADD TO BAG
//                       <Plus size={15} />
//                     </button>
//                   </div>

//                   <div className="pt-4 sm:pt-5">
//                     <p className="text-[8px] tracking-[0.12em] text-[#89766A] sm:text-[9px]">
//                       {product.category}
//                     </p>

//                     <h3 className="mt-2 font-serif text-lg leading-snug text-[#4B165C] transition-colors duration-300 group-hover:text-[#896B48] sm:text-xl lg:text-2xl">
//                       {product.name}
//                     </h3>

//                     <div className="mt-3 flex items-center justify-between gap-2">
//                       <p className="text-sm font-medium text-[#5A4037]">
//                         {formatPrice(product.price)}
//                       </p>

//                       <span className="hidden items-center gap-1 text-[8px] tracking-[0.1em] text-[#7D8768] sm:flex">
//                         <Sparkles size={12} />
//                         THE EDIT
//                       </span>
//                     </div>

//                     <div className="mt-4 h-px w-full bg-[#D8C8B7]">
//                       <div className="h-px w-0 bg-[#4B165C] transition-all duration-700 group-hover:w-full" />
//                     </div>
//                   </div>
//                 </article>
//               </Reveal>
//             );
//           })}
//         </div>

//         {filteredProducts.length === 0 && (
//           <p className="py-12 text-center font-serif text-xl text-[#4B165C]">
//             More lovely things are on their way.
//           </p>
//         )}

//         <Reveal delay={180}>
//           <div className="mt-16 text-center sm:mt-20">
//             <a
//               href="#categories"
//               className="group inline-flex items-center gap-5 border border-[#4B165C] px-7 py-4 text-[10px] font-semibold tracking-[0.14em] text-[#4B165C] transition-all duration-500 hover:bg-[#4B165C] hover:text-[#F7F2EA] sm:px-9"
//             >
//               FIND YOUR NEXT FAVOURITE

//               <ArrowUpRight
//                 size={16}
//                 className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//               />
//             </a>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// /* 04 — EDITORIAL BRAND STORY */

// function BrandStory() {
//   return (
//     <section
//       id="our-story"
//       className="scroll-mt-36 overflow-hidden bg-[#FBF7F0] px-5 py-20 sm:px-10 sm:py-28 lg:py-36"
//     >
//       <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
//         <Reveal direction="left">
//           <div className="relative mx-auto w-full max-w-2xl">
//             <div className="relative overflow-hidden bg-[#E6D9CA]">
//               <img
//                 src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1400&q=90"
//                 alt="A carefully composed collection of skincare essentials"
//                 loading="lazy"
//                 className="aspect-[4/5] w-full object-cover transition-transform duration-1000 hover:scale-[1.035]"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-[#30232F]/30 via-transparent to-white/10" />

//               <div className="absolute left-5 top-5 flex h-20 w-20 flex-col items-center justify-center rounded-full border border-white/60 bg-[#F7F2EA]/15 text-white backdrop-blur-sm sm:left-8 sm:top-8 sm:h-24 sm:w-24">
//                 <Sparkles size={18} strokeWidth={1.2} />

//                 <span className="mt-2 text-[7px] tracking-[0.17em] sm:text-[8px]">
//                   LESS, BUT BETTER
//                 </span>
//               </div>
//             </div>

//             <div className="absolute -bottom-7 right-0 max-w-[230px] border border-[#D9C5A4] bg-[#F7F2EA] px-5 py-5 shadow-[0_15px_40px_rgba(75,22,92,0.08)] sm:-right-5 sm:max-w-[290px] sm:px-7 sm:py-7">
//               <p className="font-serif text-xl italic leading-snug text-[#4B165C] sm:text-2xl">
//                 Beauty should feel like a kindness.
//               </p>

//               <span className="mt-4 block h-px w-10 bg-[#B99A62]" />
//             </div>
//           </div>
//         </Reveal>

//         <Reveal direction="right" delay={180}>
//           <div className="pt-8 lg:pt-0">
//             <EditorialLabel>A NOTE FROM THE SOFT SIDE</EditorialLabel>

//             <h2 className="mt-7 font-serif text-4xl leading-[1.08] tracking-[-0.045em] text-[#4B165C] sm:text-5xl lg:text-6xl">
//               A little less noise.
//               <br />
//               <em className="text-[#9A8061]">A lot more you.</em>
//             </h2>

//             <p className="mt-7 text-sm leading-8 text-[#7A685E] sm:text-base">
//               We believe looking after yourself should feel like a small act
//               of love, not another thing on an endless to-do list.
//             </p>

//             <p className="mt-5 text-sm leading-8 text-[#7A685E] sm:text-base">
//               The Soft Edit is a more considered approach to beauty.
//               Thoughtful choices, everyday essentials and little rituals
//               that give you permission to slow down and enjoy the moment.
//             </p>

//             <div className="mt-9 grid grid-cols-2 gap-5 border-y border-[#E6D9CA] py-6">
//               <div>
//                 <p className="font-serif text-2xl text-[#4B165C] sm:text-3xl">
//                   Thoughtful
//                 </p>

//                 <p className="mt-2 text-[9px] tracking-[0.13em] text-[#7D8768]">
//                   IN EVERY DETAIL
//                 </p>
//               </div>

//               <div>
//                 <p className="font-serif text-2xl text-[#4B165C] sm:text-3xl">
//                   Personal
//                 </p>

//                 <p className="mt-2 text-[9px] tracking-[0.13em] text-[#7D8768]">
//                   ALWAYS ABOUT YOU
//                 </p>
//               </div>
//             </div>

//             <a
//               href="#newsletter"
//               className="group mt-9 inline-flex items-center gap-4 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C]"
//             >
//               COME A LITTLE CLOSER

//               <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B99A62] transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#4B165C] group-hover:text-white">
//                 <ArrowUpRight size={17} />
//               </span>
//             </a>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// /* 05 — A MOMENT TO PAUSE */

// function RitualInterlude() {
//   return (
//     <section className="relative isolate overflow-hidden bg-[#4B165C]">
//       <div
//         aria-hidden="true"
//         className="absolute inset-0 -z-20 bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=2200&q=90')",
//         }}
//       />

//       <div
//         aria-hidden="true"
//         className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2D1038]/95 via-[#4B165C]/80 to-[#4B165C]/45"
//       />

//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute inset-4 border border-white/15 sm:inset-7 lg:inset-10"
//       />

//       <div className="mx-auto flex min-h-[420px] max-w-[1440px] items-center px-8 py-20 sm:min-h-[480px] sm:px-14 sm:py-24 lg:min-h-[540px] lg:px-24">
//         <Reveal>
//           <div className="max-w-2xl">
//             <div className="mb-6 flex items-center gap-3">
//               <span className="h-px w-10 bg-[#B99A62]" />

//               <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#E8D2A7] sm:text-[10px]">
//                 A little reminder, just for you
//               </p>
//             </div>

//             <h2 className="font-serif text-4xl font-normal leading-[1.12] tracking-[-0.035em] text-[#F7F2EA] sm:text-5xl lg:text-7xl">
//               You deserve a
//               <br />
//               <em className="font-normal text-[#E8D2A7]">
//                 softer moment.
//               </em>
//             </h2>

//             <p className="mt-6 max-w-md text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
//               Let the little things bring you back to yourself.
//               Discover thoughtful skincare and everyday essentials
//               that make caring for you feel like a beautiful ritual.
//             </p>

//             <a
//               href="#shop"
//               className="group mt-9 inline-flex min-h-[54px] items-center justify-center gap-6 border border-[#F7F2EA] bg-[#F7F2EA] px-7 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#4B165C] shadow-[0_8px_28px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#32103D] hover:shadow-[0_14px_35px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F2EA] focus-visible:ring-offset-4 focus-visible:ring-offset-[#4B165C]"
//             >
//               Find your ritual

//               <ArrowUpRight
//                 size={17}
//                 strokeWidth={1.7}
//                 className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//               />
//             </a>

//             <p className="mt-7 font-serif text-sm italic text-white/65">
//               Thoughtfully chosen. Beautifully you.
//             </p>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// /* 06 — NEWSLETTER */

// function Newsletter() {
//   const [email, setEmail] = useState("");
//   const [subscribed, setSubscribed] = useState(false);

//   function handleSubscribe(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();

//     if (!email.trim()) return;

//     // This updates the interface only.
//     // Connect your mailing-list service or Supabase before
//     // treating this as a real newsletter subscription.
//     setSubscribed(true);
//     setEmail("");
//   }

//   return (
//     <section
//       id="newsletter"
//       className="scroll-mt-36 relative overflow-hidden bg-[#EDE3E9] px-5 py-20 sm:px-10 sm:py-28 lg:py-32"
//     >
//       <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border border-[#4B165C]/10 sm:h-96 sm:w-96" />

//       <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border border-[#4B165C]/10 sm:h-72 sm:w-72" />

//       <Reveal>
//         <div className="relative mx-auto max-w-3xl text-center">
//           <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#B99A62]/60 bg-[#F7F2EA]/60 text-[#4B165C] transition-transform duration-700 hover:rotate-12">
//             <Sparkles size={22} strokeWidth={1.2} />
//           </div>

//           <div className="mt-6 flex justify-center">
//             <EditorialLabel>A LITTLE NOTE FROM US</EditorialLabel>
//           </div>

//           <h2 className="mt-6 font-serif text-4xl leading-tight tracking-[-0.04em] text-[#4B165C] sm:text-5xl md:text-6xl">
//             Lovely things,
//             <br />
//             <em className="text-[#9A8061]">delivered softly.</em>
//           </h2>

//           <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#7A685E] sm:text-base">
//             Thoughtful beauty notes, new discoveries, little treats and
//             inspiration for making more of your everyday rituals.
//           </p>

//           {subscribed ? (
//             <div
//               role="status"
//               className="mx-auto mt-9 inline-flex items-center gap-3 border border-[#B99A62] bg-[#F7F2EA]/70 px-6 py-4 text-sm text-[#4B165C]"
//             >
//               <Check size={19} />
//               Thank you. Your sign-up has been received.
//             </div>
//           ) : (
//             <form
//               onSubmit={handleSubscribe}
//               className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row"
//             >
//               <label className="sr-only" htmlFor="newsletter-email">
//                 Your email address
//               </label>

//               <input
//                 id="newsletter-email"
//                 type="email"
//                 required
//                 autoComplete="email"
//                 value={email}
//                 onChange={(event) => setEmail(event.target.value)}
//                 placeholder="Your email address"
//                 className="min-h-14 min-w-0 flex-1 border border-[#D7C7D4] bg-[#F7F2EA] px-5 text-sm text-[#5A4037] outline-none transition-all duration-300 placeholder:text-[#98877D] focus:border-[#4B165C] focus:ring-2 focus:ring-[#4B165C]/10"
//               />

//               <button
//                 type="submit"
//                 className="group flex min-h-14 items-center justify-center gap-4 bg-[#4B165C] px-7 text-[10px] font-semibold tracking-[0.15em] text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#351043]"
//               >
//                 JOIN THE EDIT

//                 <ArrowUpRight
//                   size={16}
//                   className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//                 />
//               </button>
//             </form>
//           )}

//           <p className="mt-5 text-[10px] leading-5 text-[#89766A]">
//             Thoughtful notes, never noise. Unsubscribe whenever you wish.
//           </p>
//         </div>
//       </Reveal>
//     </section>
//   );
// }


// type ShoppingBagDrawerProps = {
//   open: boolean;
//   items: BagItem[];
//   onClose: () => void;
//   onUpdateQuantity: (productId: number, change: number) => void;
// };


// function ShoppingBagDrawer({
//   open,
//   items,
//   onClose,
//   onUpdateQuantity,
// }: ShoppingBagDrawerProps) {
//   useEffect(() => {
//     if (!open) return;

//     const previousOverflow = document.body.style.overflow;

//     function handleEscape(event: KeyboardEvent) {
//       if (event.key === "Escape") onClose();
//     }

//     document.body.style.overflow = "hidden";
//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.body.style.overflow = previousOverflow;
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, [open, onClose]);

//   const itemCount = items.reduce(
//     (total, item) => total + item.quantity,
//     0,
//   );

//   const subtotal = items.reduce(
//     (total, item) => total + item.product.price * item.quantity,
//     0,
//   );

//   return (
//     <div
//       className={`fixed inset-0 z-[100] ${
//         open ? "pointer-events-auto" : "pointer-events-none"
//       }`}
//       aria-hidden={!open}
//     >
//       {/* BACKDROP */}
//       <button
//         type="button"
//         aria-label="Close shopping bag"
//         tabIndex={open ? 0 : -1}
//         onClick={onClose}
//         className={`absolute inset-0 h-full w-full bg-[#211625]/55 backdrop-blur-[3px] transition-opacity duration-500 ${
//           open ? "opacity-100" : "opacity-0"
//         }`}
//       />

//       {/* DRAWER */}
//       <aside
//         role="dialog"
//         aria-modal={open ? "true" : undefined}
//         aria-label="Your shopping bag"
//         className={`absolute right-0 top-0 flex h-full w-full max-w-[470px] flex-col border-l border-[#B99A62]/30 bg-[#FBF7F0] shadow-2xl transition-transform duration-500 ease-out ${
//           open ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* HEADER */}
//         <div className="flex items-center justify-between border-b border-[#E6D9CA] px-6 py-6 sm:px-8">
//           <div>
//             <p className="text-[9px] tracking-[0.2em] text-[#7D8768]">
//               YOUR LITTLE COLLECTION
//             </p>

//             <h2 className="mt-2 font-serif text-3xl text-[#4B165C]">
//               Your bag
//             </h2>

//             <p className="mt-1 text-xs text-[#89766A]">
//               {itemCount}{" "}
//               {itemCount === 1 ? "lovely find" : "lovely finds"}
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close shopping bag"
//             className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E6D9CA] text-[#4B165C] transition-all duration-300 hover:rotate-90 hover:border-[#B99A62] hover:bg-[#EFE6DC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A62]"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* BAG CONTENT */}
//         <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
//           {items.length === 0 ? (
//             <div className="flex h-full flex-col items-center justify-center text-center">
//               <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#B99A62]/50 bg-[#EFE6DC] text-[#4B165C]">
//                 <ShoppingBag size={30} strokeWidth={1.2} />
//               </div>

//               <h3 className="mt-7 max-w-xs font-serif text-3xl leading-tight text-[#4B165C]">
//                 Something lovely belongs here.
//               </h3>

//               <p className="mt-4 max-w-xs text-sm leading-7 text-[#89766A]">
//                 Your next skincare favourite is waiting to be discovered.
//               </p>

//               <button
//                 type="button"
//                 onClick={() => {
//                   onClose();
//                   scrollToSection("shop");
//                 }}
//                 className="group mt-7 inline-flex items-center gap-3 bg-[#4B165C] px-7 py-4 text-[10px] font-semibold tracking-[0.13em] text-white transition-all duration-300 hover:bg-[#351043]"
//               >
//                 DISCOVER THE EDIT

//                 <ArrowUpRight
//                   size={16}
//                   className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//                 />
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               {items.map(({ product, quantity }) => (
//                 <article
//                   key={product.id}
//                   className="flex gap-4 border-b border-[#E6D9CA] pb-6"
//                 >
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="h-32 w-24 shrink-0 bg-[#EFE6DC] object-cover sm:w-28"
//                   />

//                   <div className="flex min-w-0 flex-1 flex-col">
//                     <p className="text-[8px] tracking-[0.13em] text-[#7D8768]">
//                       {product.category}
//                     </p>

//                     <h3 className="mt-2 font-serif text-xl leading-snug text-[#4B165C]">
//                       {product.name}
//                     </h3>

//                     <p className="mt-2 text-sm font-medium text-[#5A4037]">
//                       {formatPrice(product.price * quantity)}
//                     </p>

//                     <div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
//                       <div className="flex items-center border border-[#D8C8B7]">
//                         <button
//                           type="button"
//                           aria-label={`Decrease ${product.name} quantity`}
//                           onClick={() =>
//                             onUpdateQuantity(product.id, -1)
//                           }
//                           className="flex h-9 w-9 items-center justify-center transition hover:bg-[#EFE6DC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B99A62]"
//                         >
//                           <Minus size={13} />
//                         </button>

//                         <span className="min-w-8 text-center text-xs tabular-nums">
//                           {quantity}
//                         </span>

//                         <button
//                           type="button"
//                           aria-label={`Increase ${product.name} quantity`}
//                           onClick={() =>
//                             onUpdateQuantity(product.id, 1)
//                           }
//                           className="flex h-9 w-9 items-center justify-center transition hover:bg-[#EFE6DC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#B99A62]"
//                         >
//                           <Plus size={13} />
//                         </button>
//                       </div>

//                       <span className="text-[9px] tracking-[0.1em] text-[#7D8768]">
//                         THE SOFT EDIT
//                       </span>
//                     </div>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* SUBTOTAL AND CHECKOUT */}
//         {items.length > 0 && (
//           <div className="border-t border-[#E6D9CA] bg-[#F7F2EA] px-6 py-6 sm:px-8">
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-[#5A4037]">
//                 Subtotal
//               </span>

//               <span className="font-serif text-2xl text-[#4B165C]">
//                 {formatPrice(subtotal)}
//               </span>
//             </div>

//             <p className="mt-3 text-xs leading-6 text-[#89766A]">
//               Delivery and applicable taxes are calculated at checkout.
//             </p>

//             <button
//               type="button"
//               onClick={() =>
//                 window.alert(
//                   "Checkout is not connected yet. The basket is currently a front-end demonstration.",
//                 )
//               }
//               className="group mt-5 flex w-full items-center justify-center gap-4 bg-[#4B165C] px-5 py-5 text-[10px] font-semibold tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#351043] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B99A62] focus-visible:ring-offset-2"
//             >
//               CONTINUE TO CHECKOUT

//               <ArrowUpRight
//                 size={17}
//                 className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//               />
//             </button>

//             <p className="mt-4 text-center text-[9px] tracking-[0.1em] text-[#7D8768]">
//               A LITTLE CARE, FROM US TO YOU.
//             </p>
//           </div>
//         )}
//       </aside>
//     </div>
//   );
// }


// // function ShoppingBagDrawer({
// //   open,
// //   items,
// //   onClose,
// //   onUpdateQuantity,
// // }: ShoppingBagDrawerProps) {
// //   useEffect(() => {
// //     if (!open) return;

// //     function handleEscape(event: KeyboardEvent) {
// //       if (event.key === "Escape") onClose();
// //     }

// //     document.addEventListener("keydown", handleEscape);
// //     const previousOverflow = document.body.style.overflow;
// //     document.body.style.overflow = "hidden";

// //     return () => {
// //       document.removeEventListener("keydown", handleEscape);
// //       document.body.style.overflow = previousOverflow;
// //     };
// //   }, [open, onClose]);

// //   const itemCount = items.reduce((total, item) => total + item.quantity, 0);
// //   const subtotal = items.reduce(
// //     (total, item) => total + item.product.price * item.quantity,
// //     0,
// //   );

// //   return (
// //     <div
// //       className={`fixed inset-0 z-[100] ${
// //         open ? "pointer-events-auto" : "pointer-events-none"
// //       }`}
// //       aria-hidden={!open}
// //     >
// //       <button
// //         type="button"
// //         aria-label="Close shopping bag"
// //         tabIndex={open ? 0 : -1}
// //         onClick={onClose}
// //         className={`absolute inset-0 h-full w-full bg-[#30232F]/50 transition-opacity duration-300 ${
// //           open ? "opacity-100" : "opacity-0"
// //         }`}
// //       />

// //       <aside
// //         role="dialog"
// //         aria-modal={open ? "true" : undefined}
// //         aria-label="Your shopping bag"
// //         className={`absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-[#F7F2EA] shadow-2xl transition-transform duration-300 ${
// //           open ? "translate-x-0" : "translate-x-full"
// //         }`}
// //       >
// //         <div className="flex items-center justify-between border-b border-[#E5DACE] px-6 py-5">
// //           <div>
// //             <h2
// //               className="font-serif text-2xl text-[#4B165C]"
// //               style={{ fontFamily: '"Canosa", Georgia, serif' }}
// //             >
// //               Your bag
// //             </h2>
// //             <p className="mt-1 text-xs text-[#7A685E]">
// //               {itemCount} {itemCount === 1 ? "item" : "items"}
// //             </p>
// //           </div>
// //           <button
// //             type="button"
// //             onClick={onClose}
// //             aria-label="Close shopping bag"
// //             className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white"
// //           >
// //             <X size={21} />
// //           </button>
// //         </div>

// //         <div className="flex-1 overflow-y-auto px-6 py-5">
// //           {items.length === 0 ? (
// //             <div className="flex h-full flex-col items-center justify-center text-center">
// //               <ShoppingBag
// //                 size={38}
// //                 strokeWidth={1.2}
// //                 className="text-[#B99A62]"
// //               />
// //               <h3
// //                 className="mt-5 font-serif text-2xl text-[#4B165C]"
// //                 style={{ fontFamily: '"Canosa", Georgia, serif' }}
// //               >
// //                 A little room for something lovely.
// //               </h3>
// //               <p className="mt-3 max-w-xs text-sm leading-6 text-[#7A685E]">
// //                 Your bag is waiting for your next skincare favourite.
// //               </p>
// //               <button
// //                 type="button"
// //                 onClick={() => {
// //                   onClose();
// //                   scrollToSection("shop");
// //                 }}
// //                 className="mt-6 bg-[#4B165C] px-6 py-4 text-xs font-semibold tracking-[0.1em] text-white transition hover:bg-[#351043]"
// //               >
// //                 DISCOVER THE EDIT
// //               </button>
// //             </div>
// //           ) : (
// //             <div className="space-y-5">
// //               {items.map(({ product, quantity }) => (
// //                 <article
// //                   key={product.id}
// //                   className="flex gap-4 border-b border-[#E5DACE] pb-5"
// //                 >
// //                   <img
// //                     src={product.image}
// //                     alt={product.name}
// //                     className="h-28 w-24 bg-white object-cover"
// //                   />

// //                   <div className="flex min-w-0 flex-1 flex-col">
// //                     <h3
// //                       className="font-serif text-lg text-[#4B165C]"
// //                       style={{ fontFamily: '"Canosa", Georgia, serif' }}
// //                     >
// //                       {product.name}
// //                     </h3>
// //                     <p className="mt-1 text-xs text-[#7A685E]">
// //                       {product.category}
// //                     </p>
// //                     <p className="mt-2 text-sm font-semibold text-[#5A4037]">
// //                       {formatPrice(product.price * quantity)}
// //                     </p>

// //                     <div className="mt-auto flex items-center gap-3 pt-3">
// //                       <button
// //                         type="button"
// //                         aria-label={`Decrease ${product.name} quantity`}
// //                         onClick={() => onUpdateQuantity(product.id, -1)}
// //                         className="flex h-8 w-8 items-center justify-center border border-[#D8C9BC] transition hover:bg-white"
// //                       >
// //                         {quantity === 1 ? <X size={13} /> : <Minus size={13} />}
// //                       </button>
// //                       <span className="min-w-4 text-center text-sm">
// //                         {quantity}
// //                       </span>
// //                       <button
// //                         type="button"
// //                         aria-label={`Increase ${product.name} quantity`}
// //                         onClick={() => onUpdateQuantity(product.id, 1)}
// //                         className="flex h-8 w-8 items-center justify-center border border-[#D8C9BC] transition hover:bg-white"
// //                       >
// //                         <Plus size={13} />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </article>
// //               ))}
// //             </div>
// //           )}
// //         </div>

// //         {items.length > 0 && (
// //           <div className="border-t border-[#E5DACE] bg-[#F7F2EA] px-6 py-6">
// //             <div className="flex items-center justify-between">
// //               <span className="text-sm text-[#5A4037]">Subtotal</span>
// //               <span
// //                 className="font-serif text-xl text-[#4B165C]"
// //                 style={{ fontFamily: '"Canosa", Georgia, serif' }}
// //               >
// //                 {formatPrice(subtotal)}
// //               </span>
// //             </div>

// //             <p className="mt-2 text-xs leading-5 text-[#7A685E]">
// //               Delivery and applicable taxes are calculated at checkout.
// //             </p>

// //             <button
// //               type="button"
// //               onClick={() =>
// //                 window.alert(
// //                   "Checkout is not connected yet. Connect your payment provider and checkout flow before accepting real orders.",
// //                 )
// //               }
// //               className="mt-5 flex w-full items-center justify-center gap-3 bg-[#4B165C] px-5 py-4 text-xs font-semibold tracking-[0.12em] text-white transition hover:bg-[#351043]"
// //             >
// //               CONTINUE TO CHECKOUT
// //               <ArrowRight size={17} />
// //             </button>
// //           </div>
// //         )}
// //       </aside>
// //     </div>
// //   );
// // }

// // function Footer() {
// //   return (
// //     <footer className="relative overflow-hidden bg-[#30232F] px-5 pb-7 pt-14 text-[#F7F2EA] sm:px-10 sm:pt-16">
// //       <div className="pointer-events-none absolute -right-28 -top-28 h-80 w-80 rounded-full border border-[#B99A62]/10" />
// //       <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-[#B99A62]/10" />

// //       <div className="relative mx-auto max-w-[1440px]">
// //         <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
// //           <div className="sm:col-span-2">
// //             <a href="#home" aria-label="The Soft Edit homepage" className="group inline-flex">
// //               <img
// //                 src={logo}
// //                 alt="The Soft Edit"
// //                 className="h-auto w-[125px] rounded-md object-contain transition-transform duration-500 group-hover:scale-[1.03] sm:w-[150px] lg:w-[180px]"
// //               />
// //             </a>

// //             <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
// //               Thoughtfully chosen skincare. Everyday rituals. A little more
// //               softness in everything you do.
// //             </p>

// //             <div className="mt-6 flex items-center gap-3 text-[#B99A62]">
// //               <Sparkles size={16} />
// //               <span className="text-[9px] tracking-[0.14em] sm:text-[10px]">
// //                 YOUR SKIN. YOUR RITUAL. YOUR EDIT.
// //               </span>
// //             </div>

// //             <div className="mt-6 flex items-center gap-3">
// //               <a
// //                 href="https://www.instagram.com/"
// //                 target="_blank"
// //                 rel="noreferrer"
// //                 aria-label="Instagram"
// //                 className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/75 transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#30232F]"
// //               >
// //                 <FaInstagram size={17} />
// //               </a>
// //               <a
// //                 href="mailto:hello@thesoftedit.com"
// //                 aria-label="Email The Soft Edit"
// //                 className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/75 transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#30232F]"
// //               >
// //                 <Mail size={17} />
// //               </a>
// //             </div>
// //           </div>

// //           <div>
// //             <h3 className="text-[10px] font-semibold tracking-[0.2em] text-[#B99A62]">
// //               EXPLORE
// //             </h3>
// //             <div className="mt-5 flex flex-col gap-4 text-sm text-white/65">
// //               <a className="transition-colors hover:text-[#B99A62]" href="#shop">
// //                 Shop all
// //               </a>
// //               <a className="transition-colors hover:text-[#B99A62]" href="#categories">
// //                 Skincare
// //               </a>
// //               <a className="transition-colors hover:text-[#B99A62]" href="#our-story">
// //                 Our story
// //               </a>
// //               <a className="transition-colors hover:text-[#B99A62]" href="#newsletter">
// //                 The newsletter
// //               </a>
// //             </div>
// //           </div>

// //           <div>
// //             <h3 className="text-[10px] font-semibold tracking-[0.2em] text-[#B99A62]">
// //               HERE TO HELP
// //             </h3>
// //             <div className="mt-5 flex flex-col gap-4 text-sm text-white/65">
// //               <a className="transition-colors hover:text-[#B99A62]" href="mailto:hello@thesoftedit.com">
// //                 Contact us
// //               </a>
// //               <a className="transition-colors hover:text-[#B99A62]" href="/delivery-returns">
// //                 Delivery &amp; returns
// //               </a>
// //               <a className="transition-colors hover:text-[#B99A62]" href="/faqs">
// //                 FAQs
// //               </a>
// //               <a className="transition-colors hover:text-[#B99A62]" href="/privacy">
// //                 Privacy policy
// //               </a>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="mt-12 grid gap-4 border-t border-white/15 pt-6 sm:mt-14 sm:grid-cols-2">
// //           <div className="flex items-center gap-3 text-white/60">
// //             <ShieldCheck size={18} className="shrink-0 text-[#B99A62]" />
// //             <span className="text-xs">A considered approach to your everyday care.</span>
// //           </div>
// //           <div className="flex items-center gap-3 text-white/60 sm:justify-end">
// //             <Truck size={18} className="shrink-0 text-[#B99A62]" />
// //             <span className="text-xs">Delivery information available at checkout.</span>
// //           </div>
// //         </div>

// //         <div className="mt-8 flex flex-col gap-4 border-t border-white/15 pt-6 text-[10px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
// //           <p>© {new Date().getFullYear()} The Soft Edit. All rights reserved.</p>
// //           <p>MADE WITH CARE, ALWAYS.</p>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // }

// function Footer() {
//   const exploreLinks = [
//     ["Shop all", "#shop"],
//     ["Skincare", "#categories"],
//     ["Body care", "#categories"],
//     ["Our story", "#our-story"],
//     ["Our philosophy", "#our-story"],
//     ["Newsletter", "#newsletter"],
//   ];

//   const supportLinks = [
//     ["Contact us", "mailto:hello@thesoftedit.com"],
//     ["FAQs", "/faqs"],
//     ["Delivery & shipping", "/delivery-returns"],
//     ["Returns & exchanges", "/delivery-returns"],
//     ["Track your order", "/account"],
//     ["My account", "/account"],
//   ];

//   const legalLinks = [
//     ["Privacy policy", "/privacy"],
//     ["Terms & conditions", "/terms"],
//     ["Cookie policy", "/cookies"],
//   ];

//   return (
//     <footer className="relative isolate overflow-hidden bg-[#30232F] text-[#F7F2EA]">
//       {/* DECORATIVE BACKGROUND */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -right-32 -top-28 -z-10 h-96 w-96 rounded-full border border-[#B99A62]/15"
//       />

//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-96 w-96 rounded-full border border-[#B99A62]/10"
//       />

//       <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
//         {/* BRAND INVITATION */}
//         <div className="grid gap-8 border-b border-white/15 py-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:py-20">
//           <div className="max-w-2xl">
//             <div className="mb-5 flex items-center gap-3">
//               <span className="h-px w-8 bg-[#B99A62]" />

//               <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#D9BE8B]">
//                 A little note from us
//               </span>
//             </div>

//             <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#F7F2EA] sm:text-4xl lg:text-5xl">
//               Make room for
//               <br />
//               <em className="text-[#D9BE8B]">
//                 a softer kind of beauty.
//               </em>
//             </h2>

//             <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">
//               Thoughtful finds, little rituals and considered essentials
//               for the life you want to live. Because the everyday deserves
//               a little more care.
//             </p>
//           </div>

//           <a
//             href="#newsletter"
//             className="group inline-flex min-h-[54px] w-fit items-center justify-center gap-5 border border-[#B99A62] bg-[#B99A62] px-7 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#30232F] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D9BE8B] hover:shadow-[0_12px_35px_rgba(185,154,98,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F2EA] focus-visible:ring-offset-4 focus-visible:ring-offset-[#30232F]"
//           >
//             Discover your edit

//             <ArrowUpRight
//               size={16}
//               className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
//             />
//           </a>
//         </div>

//         {/* MAIN FOOTER CONTENT */}
//         <div className="grid gap-x-10 gap-y-12 border-b border-white/15 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.9fr_1.1fr] lg:gap-x-12 lg:py-16">
//           {/* BRAND COLUMN */}
//           <div>
//             <a
//               href="#home"
//               aria-label="The Soft Edit homepage"
//               className="group inline-block"
//             >
//               <img
//                 src={logo}
//                 alt="The Soft Edit"
//                 className="h-auto w-[155px] rounded-sm object-contain transition-transform duration-500 group-hover:scale-[1.03] sm:w-[175px]"
//               />
//             </a>

//             <p className="mt-7 max-w-sm font-serif text-2xl leading-relaxed text-white/95 sm:text-3xl">
//               A softer approach
//               <br />
//               to <em className="text-[#D9BE8B]">everyday beauty.</em>
//             </p>

//             <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
//               Thoughtfully chosen skincare. Everyday rituals. A little more
//               softness in everything you do.
//             </p>

//             {/* SOCIAL MEDIA */}
//             <div className="mt-8">
//               <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D9BE8B]">
//                 A little more of us
//               </p>

//               <div className="flex flex-wrap items-center gap-3">
//                 <a
//                   href="https://wa.me/234XXXXXXXXXX"
//                   target="_blank"
//                   rel="noreferrer"
//                   aria-label="Chat with The Soft Edit on WhatsApp"
//                   title="WhatsApp"
//                   className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/75 transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#30232F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9BE8B]"
//                 >
//                   <FaWhatsapp size={18} />
//                 </a>

//                 <a
//                   href="mailto:hello@thesoftedit.com"
//                   aria-label="Email The Soft Edit"
//                   title="Email us"
//                   className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/75 transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#30232F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9BE8B]"
//                 >
//                   <Mail size={18} strokeWidth={1.6} />
//                 </a>

//                 <a
//                   href="https://www.instagram.com/"
//                   target="_blank"
//                   rel="noreferrer"
//                   aria-label="Follow The Soft Edit on Instagram"
//                   title="Instagram"
//                   className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/75 transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#30232F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9BE8B]"
//                 >
//                   <FaInstagram size={18} />
//                 </a>
//               </div>

//               <p className="mt-4 text-xs leading-6 text-white/45">
//                 Have a question, a thought or a little beauty discovery to
//                 share? We'd love to hear from you.
//               </p>
//             </div>
//           </div>

//           {/* EXPLORE */}
//           <div>
//             <h3 className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D9BE8B]">
//               Explore
//               <span className="h-px flex-1 bg-white/10" />
//             </h3>

//             <div className="mt-7 flex flex-col items-start gap-4">
//               {exploreLinks.map(([label, href]) => (
//                 <a
//                   key={label}
//                   href={href}
//                   className="group flex items-center gap-2 text-sm text-white/60 transition-colors duration-300 hover:text-white"
//                 >
//                   <span className="h-px w-0 bg-[#B99A62] transition-all duration-300 group-hover:w-4" />
//                   {label}
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* CUSTOMER CARE */}
//           <div>
//             <h3 className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D9BE8B]">
//               Here to help
//               <span className="h-px flex-1 bg-white/10" />
//             </h3>

//             <div className="mt-7 flex flex-col items-start gap-4">
//               {supportLinks.map(([label, href]) => (
//                 <a
//                   key={label}
//                   href={href}
//                   className="group flex items-center gap-2 text-sm text-white/60 transition-colors duration-300 hover:text-white"
//                 >
//                   <span className="h-px w-0 bg-[#B99A62] transition-all duration-300 group-hover:w-4" />
//                   {label}
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* PHILOSOPHY AND TRUST */}
//           <div>
//             <h3 className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D9BE8B]">
//               Our philosophy
//               <span className="h-px flex-1 bg-white/10" />
//             </h3>

//             <p className="mt-7 font-serif text-2xl leading-snug text-white/90">
//               Your skin.
//               <br />
//               Your ritual.
//               <br />
//               <em className="text-[#D9BE8B]">Your edit.</em>
//             </p>

//             <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
//               <div className="flex items-start gap-3">
//                 <Heart
//                   size={17}
//                   className="mt-0.5 shrink-0 text-[#D9BE8B]"
//                   strokeWidth={1.5}
//                 />

//                 <div>
//                   <p className="text-xs font-medium text-white/85">
//                     Thoughtfully selected
//                   </p>
//                   <p className="mt-1 text-xs leading-5 text-white/45">
//                     Products chosen with care.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <Truck
//                   size={17}
//                   className="mt-0.5 shrink-0 text-[#D9BE8B]"
//                   strokeWidth={1.5}
//                 />

//                 <div>
//                   <p className="text-xs font-medium text-white/85">
//                     Delivery information
//                   </p>
//                   <a
//                     href="/delivery-returns"
//                     className="mt-1 inline-block text-xs leading-5 text-white/45 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#D9BE8B]"
//                   >
//                     View shipping details
//                   </a>
//                 </div>
//               </div>

//               <div className="flex items-start gap-3">
//                 <ShieldCheck
//                   size={17}
//                   className="mt-0.5 shrink-0 text-[#D9BE8B]"
//                   strokeWidth={1.5}
//                 />

//                 <div>
//                   <p className="text-xs font-medium text-white/85">
//                     Shop with confidence
//                   </p>
//                   <p className="mt-1 text-xs leading-5 text-white/45">
//                     Review our policies before you shop.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8 flex items-center gap-3 text-[#D9BE8B]">
//               <span className="h-px w-7 bg-[#B99A62]" />
//               <Sparkles size={14} strokeWidth={1.4} />
//               <span className="text-[8px] font-medium uppercase tracking-[0.17em]">
//                 Beauty, with intention
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* PAYMENT METHODS */}
//         <div className="grid gap-8 border-b border-white/15 py-9 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
//           <div>
//             <div className="flex items-center gap-3">
//               <CreditCard
//                 size={17}
//                 className="text-[#D9BE8B]"
//                 strokeWidth={1.5}
//               />

//               <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85">
//                 Payment options
//               </h3>
//             </div>

//             <p className="mt-3 max-w-md text-xs leading-6 text-white/45">
//               Choose from the payment methods available at checkout. Available
//               options will depend on your payment provider.
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-2.5 lg:justify-end">
//             <div
//               aria-label="Visa"
//               className="flex h-10 min-w-[65px] items-center justify-center rounded-md border border-white/15 bg-white px-3 shadow-sm"
//             >
//               <span className="text-lg font-black italic tracking-tight text-[#1A1F71]">
//                 VISA
//               </span>
//             </div>

//             <div
//               aria-label="Mastercard"
//               className="flex h-10 min-w-[65px] items-center justify-center rounded-md border border-white/15 bg-white px-3 shadow-sm"
//             >
//               <span className="flex items-center">
//                 <span className="-mr-2.5 h-5 w-5 rounded-full bg-[#EB001B]" />
//                 <span className="h-5 w-5 rounded-full bg-[#F79E1B]/95" />
//               </span>
//             </div>

//             <div
//               aria-label="Verve"
//               className="flex h-10 min-w-[65px] items-center justify-center rounded-md border border-white/15 bg-white px-3 shadow-sm"
//             >
//               <span className="text-base font-black italic tracking-tight text-[#542583]">
//                 verve
//               </span>
//             </div>

//             <div
//               aria-label="OPay"
//               className="flex h-10 min-w-[65px] items-center justify-center rounded-md border border-white/15 bg-white px-3 shadow-sm"
//             >
//               <span className="text-sm font-extrabold tracking-tight text-[#00A651]">
//                 OPay
//               </span>
//             </div>

//             <div
//               aria-label="Bank transfer"
//               className="flex h-10 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.06] px-3"
//             >
//               <span className="text-[10px] font-semibold text-white/85">
//                 BANK TRANSFER
//               </span>
//             </div>

//             <div
//               aria-label="USSD payment"
//               className="flex h-10 items-center justify-center rounded-md border border-white/15 bg-white/[0.06] px-3"
//             >
//               <span className="text-[10px] font-semibold text-white/85">
//                 USSD
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* COPYRIGHT AND POLICIES */}
//         <div className="flex flex-col gap-6 py-7 lg:flex-row lg:items-center lg:justify-between">
//           <p className="text-[10px] leading-6 tracking-wide text-white/40">
//             © {new Date().getFullYear()} The Soft Edit. All rights reserved.
//           </p>

//           <nav
//             aria-label="Legal information"
//             className="flex flex-wrap items-center gap-x-5 gap-y-3"
//           >
//             {legalLinks.map(([label, href]) => (
//               <a
//                 key={label}
//                 href={href}
//                 className="text-[10px] text-white/45 transition-colors hover:text-[#D9BE8B]"
//               >
//                 {label}
//               </a>
//             ))}
//           </nav>

//           <a
//             href="#home"
//             className="group inline-flex items-center gap-2 self-start text-[9px] font-semibold tracking-[0.15em] text-white/65 transition-colors hover:text-[#D9BE8B] lg:self-auto"
//           >
//             BACK TO THE TOP

//             <ArrowUpRight
//               size={14}
//               className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
//             />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }


// export default function AccountDashboard() {
//   const [bagItems, setBagItems] = useState<BagItem[]>([]);
//   const [saved, setSaved] = useState<number[]>([]);
//   const [bagOpen, setBagOpen] = useState(false);
//   const [currentUserId, setCurrentUserId] = useState<string | null>(null);
//   const [userName, setUserName] = useState<string | null>(null);
//   const [cartReady, setCartReady] = useState(false);
//   const [customerLoading, setCustomerLoading] = useState(true);

//   /*
//    * Restore the real Supabase session.
//    * Load the signed-in customer's profile, favourites and saved basket.
//    */
//   useEffect(() => {
//     let active = true;
//     let loadSequence = 0;

//     async function loadCustomer(user: Customer | null) {
//       const sequence = ++loadSequence;

//       if (!user) {
//         if (!active || sequence !== loadSequence) return;

//         setCurrentUserId(null);
//         setUserName(null);
//         setSaved([]);
//         setBagItems([]);
//         setCartReady(false);
//         setCustomerLoading(false);
//         return;
//       }

//       if (!active) return;

//       setCurrentUserId(user.id);
//       setCartReady(false);
//       setCustomerLoading(true);

//       const metadataName =
//         typeof user.user_metadata?.full_name === "string"
//           ? user.user_metadata.full_name
//           : typeof user.user_metadata?.name === "string"
//             ? user.user_metadata.name
//             : "";

//       const [
//         { data: profile, error: profileError },
//         { data: favouriteRows, error: favouriteError },
//         { data: cart, error: cartError },
//       ] = await Promise.all([
//         supabase
//           .from("profiles")
//           .select("full_name")
//           .eq("id", user.id)
//           .maybeSingle(),

//         supabase
//           .from("favourites")
//           .select("product_id")
//           .eq("customer_id", user.id),

//         supabase
//           .from("customer_carts")
//           .select("items")
//           .eq("customer_id", user.id)
//           .maybeSingle(),
//       ]);

//       if (!active || sequence !== loadSequence) return;

//       if (profileError) {
//         console.error("Unable to load customer profile:", profileError.message);
//       }

//       if (favouriteError) {
//         console.error("Unable to load favourites:", favouriteError.message);
//       }

//       if (cartError) {
//         console.error("Unable to load shopping bag:", cartError.message);
//       }

//       const resolvedName =
//         profile?.full_name?.trim() ||
//         metadataName.trim() ||
//         user.email?.split("@")[0] ||
//         "there";

//       setUserName(resolvedName);

//       setSaved(
//         (favouriteRows ?? [])
//           .map((row: { product_id: string | number }) =>
//             Number(row.product_id),
//           )
//           .filter(Number.isFinite),
//       );

//       const storedItems = Array.isArray(cart?.items)
//         ? (cart.items as Array<{
//             product_id: string | number;
//             quantity: number;
//           }>)
//         : [];

//       const restoredItems: BagItem[] = storedItems.flatMap((stored) => {
//         const product = products.find(
//           (item) => item.id === Number(stored.product_id),
//         );
//         const quantity = Number(stored.quantity);

//         if (
//           !product ||
//           !Number.isInteger(quantity) ||
//           quantity < 1
//         ) {
//           return [];
//         }

//         return [{ product, quantity }];
//       });

//       setBagItems(restoredItems);
//       setCartReady(true);
//       setCustomerLoading(false);
//     }

//     void supabase.auth
//       .getSession()
//       .then(({ data: { session }, error }) => {
//         if (error) {
//           console.error("Unable to restore session:", error.message);
//         }

//         if (active) {
//           void loadCustomer(session?.user ?? null);
//         }
//       });

//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) => {
//       // Defer Supabase database queries until the auth callback completes.
//       window.setTimeout(() => {
//         if (active) {
//           void loadCustomer(session?.user ?? null);
//         }
//       }, 0);
//     });

//     return () => {
//       active = false;
//       subscription.unsubscribe();
//     };
//   }, []);

//   /*
//    * Persist basket changes to the currently signed-in customer's cart.
//    * Guest baskets remain local to this page session.
//    */
//   useEffect(() => {
//     if (!currentUserId || !cartReady) return;

//     const items = bagItems.map(({ product, quantity }) => ({
//       product_id: product.id,
//       quantity,
//     }));

//     const timeout = window.setTimeout(() => {
//       void supabase
//         .from("customer_carts")
//         .upsert(
//           {
//             customer_id: currentUserId,
//             items,
//             updated_at: new Date().toISOString(),
//           },
//           { onConflict: "customer_id" },
//         )
//         .then(({ error }) => {
//           if (error) {
//             console.error("Unable to save shopping bag:", error.message);
//           }
//         });
//     }, 300);

//     return () => window.clearTimeout(timeout);
//   }, [bagItems, currentUserId, cartReady]);

//   const handleSignOut = useCallback(async () => {
//     const { error } = await supabase.auth.signOut();

//     if (error) {
//       console.error("Unable to sign out:", error.message);
//       window.alert("We couldn't sign you out just yet. Please try again.");
//       return;
//     }

//     setBagOpen(false);
//     window.location.href = "/";
//   }, []);

//   const bagCount = bagItems.reduce(
//     (total, item) => total + item.quantity,
//     0,
//   );

//   function addToBag(product: Product) {
//     setBagItems((current) => {
//       const existing = current.find(
//         (item) => item.product.id === product.id,
//       );

//       if (existing) {
//         return current.map((item) =>
//           item.product.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item,
//         );
//       }

//       return [...current, { product, quantity: 1 }];
//     });

//     setBagOpen(true);
//   }

//   function updateQuantity(productId: number, change: number) {
//     setBagItems((current) =>
//       current
//         .map((item) =>
//           item.product.id === productId
//             ? { ...item, quantity: item.quantity + change }
//             : item,
//         )
//         .filter((item) => item.quantity > 0),
//     );
//   }

//   async function toggleSaved(productId: number) {
//     const wasSaved = saved.includes(productId);

//     // Update the interface immediately for a responsive feel.
//     setSaved((current) =>
//       current.includes(productId)
//         ? current.filter((id) => id !== productId)
//         : [...current, productId],
//     );

//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser();

//     // Guests may use the wishlist temporarily, but the changes are
//     // not stored in a customer's database row.
//     if (userError || !user) return;

//     if (wasSaved) {
//       const { error } = await supabase
//         .from("favourites")
//         .delete()
//         .eq("customer_id", user.id)
//         .eq("product_id", String(productId));

//       if (error) {
//         console.error("Unable to remove favourite:", error.message);

//         setSaved((current) =>
//           current.includes(productId)
//             ? current
//             : [...current, productId],
//         );
//       }

//       return;
//     }

//     const { error } = await supabase
//       .from("favourites")
//       .upsert(
//         {
//           customer_id: user.id,
//           product_id: String(productId),
//         },
//         { onConflict: "customer_id,product_id" },
//       );

//     if (error) {
//       console.error("Unable to save favourite:", error.message);

//       setSaved((current) =>
//         current.filter((id) => id !== productId),
//       );
//     }
//   }

//   return (
//     <div className="min-h-screen bg-[#F7F2EA] text-[#5A4037]">
//       <Header
//         bagCount={bagCount}
//         onOpenBag={() => setBagOpen(true)}
//         userName={userName}
//         onSignOut={handleSignOut}
//       />

      
//         <main>
//           {/* Keep the existing header on both pages */}
         
// {currentPage === "serum" ? (
//   <SerumCollectionPage
//     onAddToBag={addToBag}
//     saved={saved}
//     onToggleSaved={toggleSaved}
//   />
// ) : (
//   <>
//     <BrandPromises />
//     <Categories />
//     <ProductGrid
//       onAddToBag={addToBag}
//       saved={saved}
//       onToggleSaved={toggleSaved}
//     />
//     <BrandStory />
//     <RitualInterlude />
//     <Newsletter />
//   </>
// )}

//         </main>


//       <Footer />

//       <ShoppingBagDrawer
//         open={bagOpen}
//         items={bagItems}
//         onClose={() => setBagOpen(false)}
//         onUpdateQuantity={updateQuantity}
//       />
//     </div>
//   );
// }