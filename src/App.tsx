
import { supabase } from "./lib/supabase";
import AccountPages from "./pages/AccountPages";
import { createPortal } from "react-dom";
import FaceCreamCollectionPage from "../src/pages/Facepage";
import SerumCollectionPage from "./pages/SerumCollectionPage";
import BodyCreamCollectionPage from "./pages/creampage";
import AllProductsPage from "./pages/AllProductsPage";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  // ArrowUpRight,
   ArrowUpRight,
   
  // Instagram,
  Mail,
  // MessageCircle,
  // Sparkles,
  // ShieldCheck,
  // Truck,
  CreditCard,
  // Heart,
  ArrowDownRight,
  CircleArrowRight,
  Flower2,
  // Instagram,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  Check,
  ChevronDown,
  Heart,
  // Menu,
    Leaf,
  Search,
  ShoppingBag,
  Sparkles,
  ShoppingCart,
  UserRound,
  // MailIcon
  // Insta,
  X,
} from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
// import realogo from "../"
// import { SiOpay, SiVisa, SiVerve } from "react-icons/si";
// import {Fa}

import logo from "../src/images/the-soft-edit-logo-b99a62.svg"
// import promo1 from "../public/images/promo1-.mp4"

const BRAND = {
  purple: "#4B165C",
  ivory: "#F7F2EA",
  cocoa: "#5A4037",
  leaf: "#7D8768",
  gold: "#B99A62",
} as const;

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  tag: string;
  color: string;
};

const categories = [
  {
    name: "Cleansers",
    description: "A fresh start for your skin",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Serums",
    description: "Targeted care, thoughtful formulas",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Moisturisers",
    description: "Your daily dose of comfort",
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Sun care",
    description: "Everyday protection, made simple",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85",
  },
];

const products: Product[] = [
  {
    id: 1,
    name: "The Daily Glow Serum",
    category: "BRIGHTENING · 30ML",
    price: 28,
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85",
    tag: "BESTSELLER",
    color: "#E8DCD1",
  },
  {
    id: 2,
    name: "Cloud Nine Moisturiser",
    category: "HYDRATION · 50ML",
    price: 32,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    tag: "SKIN FAVOURITE",
    color: "#E7E0E9",
  },
  {
    id: 3,
    name: "The Reset Cleanser",
    category: "GENTLE CLEANSING · 150ML",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85",
    tag: "DAILY ESSENTIAL",
    color: "#E5E6DA",
  },
  {
    id: 4,
    name: "Soft Focus Face Cream",
    category: "NOURISHING · 50ML",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85",
    tag: "THE EDIT",
    color: "#EEDFD9",
  },
];

const accountLinks = [
  { label: "Account Home", href: "/account" },
  { label: "My Wishlist", href: "/account/wishlist" },
  { label: "My Orders", href: "/account/orders" },
  { label: "My Subscriptions", href: "/account/subscriptions" },
  { label: "My Referrals", href: "/account/referrals" },
];

const promises = [
  {
    number: "01",
    title: "THOUGHTFULLY CHOSEN",
    description: "Less noise, more meaning.",
  },
  {
    number: "02",
    title: "SKIN FIRST",
    description: "Care that starts with you.",
  },
  {
    number: "03",
    title: "EVERYDAY RITUALS",
    description: "Little moments, just for you.",
  },
  {
    number: "04",
    title: "BEAUTY FOR EVERYONE",
    description: "Your skin, your story.",
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(price);
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

// const heroImageSlides = [
//   // {
//   //   image:
//   //     "../src/images/imagea.jpg",
//   //   alt: "Glowing skin in a luxury beauty campaign",
//   //   eyebrow: "A MORE THOUGHTFUL BEAUTY RITUAL",
//   //   title: ["Your skin,", "your kind", "of beautiful."],
//   //   description:
//   //     "Thoughtfully chosen skincare for slower mornings, softer evenings, and feeling good in the skin you're in.",
//   //   button: "DISCOVER THE EDIT",
//   //   signature: "Simply, beautifully you.",
//   // },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imageb.jpg",
//     alt: "Relaxing facial skincare treatment",
//     eyebrow: "YOUR MOMENT OF SELF-CARE",
//     title: ["Make room", "for your", "glow."],
//     description:
//       "Turn your everyday routine into a little luxury, with thoughtful essentials that make caring for yourself feel special.",
//     button: "FIND YOUR RITUAL",
//     signature: "A softer kind of self-care.",
//   },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imagec.jpg",
//     alt: "Beautifully presented skincare products",
//     eyebrow: "LESS NOISE. MORE GLOW.",
//     title: ["Good skin", "starts with", "good care."],
//     description:
//       "Discover considered beauty essentials selected to make your routine simpler, more enjoyable, and uniquely yours.",
//     button: "SHOP SKINCARE",
//     signature: "Care that feels like you.",
//   },
//   // {
//   //   image:
//   //     // "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=2200&q=90",
//   //       // "../src/images/imaged.jpg",
//   //   alt: "Elegant skincare products for a daily beauty ritual",
//   //   eyebrow: "THE BEAUTY OF SIMPLICITY",
//   //   title: ["A little", "care goes", "a long way."],
//   //   description:
//   //     "From the first cleanse to your final touch, find the little things that make your skin ritual feel beautifully complete.",
//   //   button: "EXPLORE THE EDIT",
//   //   signature: "Small rituals. Softer days.",
//   // },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imagee.jpg",
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
//         // "../src/images/imagef.jpg",
//     alt: "Premium beauty products in a refined skincare setting",
//     eyebrow: "YOUR GLOW, YOUR WAY",
//     title: ["Feel good", "in your", "own skin."],
//     description:
//       "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//     button: "SHOP THE COLLECTION",
//     signature: "Always beautifully you.",
//   },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imageh.jpg",
//     alt: "Premium beauty products in a refined skincare setting",
//     eyebrow: "YOUR GLOW, YOUR WAY",
//     title: ["Feel good", "in your", "own skin."],
//     description:
//       "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//     button: "SHOP THE COLLECTION",
//     signature: "Always beautifully you.",
//   },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imageh.jpg",
//     alt: "Premium beauty products in a refined skincare setting",
//     eyebrow: "YOUR GLOW, YOUR WAY",
//     title: ["Feel good", "in your", "own skin."],
//     description:
//       "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//     button: "SHOP THE COLLECTION",
//     signature: "Always beautifully you.",
//   },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imagei.jpg",
//     alt: "Premium beauty products in a refined skincare setting",
//     eyebrow: "YOUR GLOW, YOUR WAY",
//     title: ["Feel good", "in your", "own skin."],
//     description:
//       "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//     button: "SHOP THE COLLECTION",
//     signature: "Always beautifully you.",
//   },
// ];


// type HeaderProps = {
//   bagCount: number;
//   onOpenBag: () => void;
//   onNavigate: (path: string) => void;
//   showHeroBanner?: boolean;
//   headerVariant?: "home" | "serum" | "face-creams" | "body-creams" | "all-products" ;
// };


// const heroNavigation = [
//   {
//     label: "Serum",
//     href: "/serum",
//     items: [
//       { label: "All Serums", href: "#shop" },
//       { label: "Hydrating Serums", href: "#shop" },
//       { label: "Brightening Serums", href: "#shop" },
//     ],
//   },
//   {
//     label: "Face Cream",
//     href: "/face-creams",
//     items: [
//       { label: "All Face Creams", href: "#shop" },
//       { label: "Day Creams", href: "#shop" },
//       { label: "Night Creams", href: "#shop" },
//     ],
//   },
//   {
//     label: "Body Cream",
//     href: "/body-creams",
//     items: [
//       { label: "All Body Creams", href: "#shop" },
//       { label: "Body Butters", href: "#shop" },
//       { label: "Body Lotions", href: "#shop" },
//     ],
//   },
//   {
//     label: "See More",
//     href: "/all-products",
//     items: [
//       { label: "All Products", href: "#shop" },
//       { label: "Our Story", href: "#our-story" },
//       { label: "Contact Us", href: "#footer" },
//     ],
//   },
// ];


// function Hero({ bagCount, onOpenBag, onNavigate, showHeroBanner = true,
//   headerVariant = "home", }: HeaderProps) {
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [videoFinished, setVideoFinished] = useState(false);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchFocused, setSearchFocused] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
// const activePathByVariant: Record<NonNullable<HeaderProps["headerVariant"]>, string> = {
//     home: "/",
//     serum: "/serum",
//     "face-creams": "/face-creams",
//     "body-creams": "/body-creams",
//     "all-products": "/all-products",
//   };
//   const searchContainerRef = useRef<HTMLDivElement>(null);
//   const searchRef = useRef<HTMLInputElement>(null);

//   const currentSlide = {
//     eyebrow: "THE ART OF EVERYDAY SKINCARE",
//     title: ["Your skin,", "your soft ritual."],
//     description:
//       "Thoughtful skincare for the moments that are just for you. Discover your next everyday essential with The Soft Edit.",
//     button: "DISCOVER THE COLLECTION",
//     signature: "A softer kind of glow",
//   };

//   const searchResults = searchQuery.trim()
//     ? products
//         .filter((product) =>
//           `${product.name} ${product.category}`
//             .toLowerCase()
//             .includes(searchQuery.trim().toLowerCase()),
//         )
//         .slice(0, 4)
//     : [];

//   // Change the navigation appearance as the page scrolls.
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 40);
//     };

//     handleScroll();

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Let the campaign video lead for six seconds, then begin the image story.
//   useEffect(() => {
//     if (!showHeroBanner || !videoFinished) return;

//     const slideshowInterval = window.setInterval(() => {
//       setActiveImageIndex((current) => (current + 1) % heroImageSlides.length);
//     }, 5600);

//     return () => window.clearInterval(slideshowInterval);
//   }, [showHeroBanner, videoFinished]);

//   useEffect(() => {
//     if (showHeroBanner) {
//       setVideoFinished(false);
//       setActiveImageIndex(0);
//     }
//   }, [showHeroBanner]);

//   useEffect(() => {
//     function handleEscape(event: KeyboardEvent) {
//       if (event.key === "Escape") {
//         setOpenDropdown(null);
//         setSearchFocused(false);
//         setSearchOpen(false);
//         setSearchQuery("");
//       }
//     }

//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       const searchContainer = searchContainerRef.current;

//       if (
//         searchOpen &&
//         searchContainer &&
//         !searchContainer.contains(event.target as Node)
//       ) {
//         setSearchOpen(false);
//         setSearchFocused(false);
//       }
//     };

//     document.addEventListener("click", handleOutsideClick, true);

//     return () => {
//       document.removeEventListener("click", handleOutsideClick, true);
//     };
//   }, [searchOpen]);

//   function closeNavigation() {
//     setOpenDropdown(null);
//     setSearchFocused(false);
//   }

//   function openProduct(productId: string | number) {
//     closeNavigation();
//     setSearchOpen(false);

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

//     setSearchFocused(false);

//     if (matchingProduct) {
//       openProduct(matchingProduct.id);
//     } else {
//       closeNavigation();
//       setSearchOpen(false);

//       document.getElementById("shop")?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   }

//   return (
//     <section id="home" className="relative w-full">
//       {/* <div
//         className="hero-frame group relative isolate min-h-[650px] w-full overflow-hidden bg-[#30232F] sm:min-h-[720px] lg:min-h-[800px]"
//         aria-label="The Soft Edit skincare campaign video"
//       > */}
//       <div
//   className={`group relative w-full ${
//     showHeroBanner
//       ? "hero-frame isolate min-h-[650px] overflow-hidden bg-[#30232F] sm:min-h-[720px] lg:min-h-[800px]"
//       : "h-0 overflow-visible"
//   }`}
//   aria-label={
//     showHeroBanner
//       ? "The Soft Edit skincare campaign video"
//       : "The Soft Edit navigation"
//   }
// >
//         {/* FULL-WIDTH HERO: VIDEO FIRST, THEN THE FULL-BLEED IMAGE STORY */}
//         {showHeroBanner && (
//           <>
//             {/* The video leads for six seconds before the image sequence takes over. */}
//             <video
//               autoPlay
//               muted
//               playsInline
//               preload="auto"
//               aria-label="The Soft Edit luxury skincare campaign"
//               onTimeUpdate={(event) => {
//                 if (event.currentTarget.currentTime >= 6) {
//                   event.currentTarget.pause();
//                   setVideoFinished(true);
//                 }
//               }}
//               onEnded={() => setVideoFinished(true)}
//               onError={() => setVideoFinished(true)}
//               className={`absolute inset-0 z-0 h-full w-full object-cover object-center transition-opacity duration-[1400ms] ease-in-out ${
//                 videoFinished ? "pointer-events-none opacity-0" : "opacity-100"
//               }`}
//             >
//               <source src="/images/promo1-.mp4" type="video/mp4" />
//               Your browser does not support video playback.
//             </video>

//             {/* Full-bleed photographs gently drift and crossfade after the video. */}
//             {heroImageSlides.map((slide, index) => (
//               <img
//                 key={`${slide.image}-${index}`}
//                 src={slide.image}
//                 alt={slide.alt}
//                 aria-hidden={!videoFinished || index !== activeImageIndex}
//                 className={`soft-edit-hero-image absolute inset-0 z-0 h-full w-full object-cover object-center transition-[opacity,transform,filter] duration-[2200ms] ease-in-out ${
//                   videoFinished && index === activeImageIndex
//                     ? "scale-100 opacity-100"
//                     : "pointer-events-none scale-[1.06] opacity-0"
//                 }`}
//                 style={{
//                   filter: "saturate(0.91) contrast(1.02)",
//                   animation:
//                     videoFinished && index === activeImageIndex
//                       ? "softEditHeroImageDrift 7s cubic-bezier(0.2, 0.65, 0.25, 1) both"
//                       : "none",
//                 }}
//               />
//             ))}

//             <style>{`
//               @keyframes softEditHeroImageDrift {
//                 0% { transform: scale(1.055) translate3d(0.8%, 0.3%, 0); }
//                 100% { transform: scale(1) translate3d(-0.4%, 0, 0); }
//               }
//               @media (prefers-reduced-motion: reduce) {
//                 .soft-edit-hero-image { animation: none !important; transition-duration: 400ms !important; }
//               }
//             `}</style>

//             {/* Gentle overall shade, with extra protection behind the copy on the left. */}
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute inset-0 z-[1]"
//               style={{
//                 background:
//                   "linear-gradient(90deg, rgba(28, 18, 29, 0.68) 0%, rgba(33, 22, 37, 0.54) 22%, rgba(48, 35, 47, 0.26) 46%, rgba(33, 22, 37, 0.08) 72%, rgba(33, 22, 37, 0.12) 100%)",
//               }}
//             />
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute inset-0 z-[1]"
//               style={{
//                 background:
//                   "linear-gradient(0deg, rgba(33, 22, 37, 0.42) 0%, rgba(33, 22, 37, 0.08) 34%, rgba(33, 22, 37, 0.12) 100%)",
//               }}
//             />
//           </>
//         )}

//         {/* STICKY LUXURY HEADER */}
//         {/* <header
//           className={`fixed inset-x-0 top-0 z-[100] w-full text-[#FFF9EF] transition-all duration-500 ${
//             isScrolled
//               ? "border-b border-[#D9BE8B]/40 bg-[#30232F]/95 shadow-[0_8px_30px_rgba(20,12,20,0.22)] backdrop-blur-xl"
//               : "border-b border-transparent bg-transparent"
//           }`}
//         > */}
//         {createPortal(
//         <header

// className={`fixed inset-x-0 top-0 z-[9999] w-full border-x-0 border-t-0 border-b text-[#FFF9EF] shadow-none transition-[background-color,border-color,backdrop-filter] duration-500 ease-in-out ${
//   headerVariant === "home"
//     ? isScrolled
//       ? "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
//       : "border-b-transparent bg-transparent backdrop-blur-none"
//     : "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
// }`}

//   // className={`fixed inset-x-0 top-0 z-[9999] w-full border-x-0 border-t-0 border-b text-[#FFF9EF] shadow-none transition-[background-color,border-color] duration-500 ease-in-out ${
//   //   isScrolled
//   //     ? "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
//   //     : "border-b-transparent bg-transparent backdrop-blur-none"

// >
//           <nav
//             aria-label="Main navigation"
//             className="relative mx-auto flex min-h-[88px] w-full items-center justify-between gap-3 px-4 py-4 sm:min-h-[94px] sm:px-7 lg:min-h-[108px] lg:px-10 2xl:px-14"
//           >
//             {/* LEFT NAVIGATION */}
//             <div className="flex min-w-0 flex-1 items-center justify-start gap-4 lg:gap-5">
//               {/* HOME: active only on the homepage */}
//               <a
//                 href="/"
//                 onClick={(event) => {
//                   event.preventDefault();
//                   closeNavigation();
//                   if (headerVariant !== "home") {
//                     onNavigate("/");
//                   } else {
//                     window.scrollTo({ top: 0, behavior: "smooth" });
//                   }
//                 }}
//                 aria-current={headerVariant === "home" ? "page" : undefined}
//                 className={`group/nav relative whitespace-nowrap py-3 text-[14px] font-semibold transition-colors duration-300 ${
//                   headerVariant === "home"
//                     ? "text-[#E9CDA0]"
//                     : "text-[#FFF9EF] hover:text-[#E9CDA0]"
//                 }`}
//               >
//                 Home
//                 <span
//                   className={`absolute inset-x-0 bottom-1 h-[1.5px] origin-left bg-[#D9BE8B] transition-transform duration-300 ${
//                     headerVariant === "home"
//                       ? "scale-x-100"
//                       : "scale-x-0 group-hover/nav:scale-x-100"
//                   }`}
//                 />
//               </a>

//               {heroNavigation.map((item) => {
//                 const isOpen = openDropdown === item.label;
//                 const isActive = item.href === activePathByVariant[headerVariant];

//                 return (
//                   <div
//                     key={item.label}
//                     className="relative"
//                     onMouseEnter={() => setOpenDropdown(item.label)}
//                     onMouseLeave={() => setOpenDropdown(null)}
//                   >
//                     <button
//                       type="button"
//                       aria-expanded={isOpen}
//                       aria-haspopup="true"
//                       // onClick={() =>
//                       //   setOpenDropdown((current) =>
//                       //     current === item.label ? null : item.label,
//                       //   )
//                       // }
//                       onClick={() => {
//                         closeNavigation();
//                         onNavigate(item.href);
//                       }}
//                       onFocus={() => setOpenDropdown(item.label)}
//                       className={`group/nav relative flex items-center gap-0 whitespace-nowrap py-3 text-[14px] font-semibold transition-colors duration-300 ${
//                         isActive || isOpen
//                           ? "text-[#E9CDA0]"
//                           : "text-[#FFF9EF] hover:text-[#E9CDA0]"
//                       }`}
//                     >
//                       {item.label}

//                       <ChevronDown
//                         size={14}
//                         strokeWidth={1.6}
//                         className={`-ml-[1px] text-[#D9BE8B]/70 transition-transform duration-300 ${
//                           isOpen ? "rotate-180 text-[#E9CDA0]" : ""
//                         }`}
//                       />

//                       <span
//                         className={`absolute inset-x-0 bottom-1 h-[1.5px] origin-left bg-[#D9BE8B] transition-transform duration-300 ${
//                           isActive || isOpen
//                             ? "scale-x-100"
//                             : "scale-x-0 group-hover/nav:scale-x-100"
//                         }`}
//                       />
//                     </button>

//                     {/* DROPDOWN */}
//                     <div
//                       className={`absolute left-0 top-full w-56 pt-2 transition-all duration-200 ${
//                         isOpen
//                           ? "visible translate-y-0 opacity-100"
//                           : "invisible pointer-events-none -translate-y-1 opacity-0"
//                       }`}
//                     >
//                       <div className="border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] py-2 shadow-xl backdrop-blur-xl">
//                         {item.items.map((subItem) => (
//                           <a
//   key={subItem.label}
//   href={subItem.href}
//   onClick={(event) => {
//                               closeNavigation();
//                               if (item.label !== "See More") {
//                                 event.preventDefault();
//                                 onNavigate(item.href);
//                               }
//                             }}
//   className="block px-5 py-3 text-[13px] text-[#FFF9EF] transition-colors duration-200 hover:bg-white/10 hover:text-[#E9CDA0]"
// >
//   {subItem.label}
// </a>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* BRAND WORDMARK — LEAF BESIDE THE NAME */}
//             <a
//               href="/"
//               aria-label="The Soft Edit home"
//               onClick={(event) => {
//                 event.preventDefault();
//                 closeNavigation();
//                 if (headerVariant !== "home") {
//                   onNavigate("/");
//                 } else {
//                   window.scrollTo({ top: 0, behavior: "smooth" });
//                 }
//               }}
//               className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 whitespace-nowrap transition-opacity duration-300 hover:opacity-90 sm:gap-2.5"
//             >
//               {/* BOTANICAL LEAF ICON */}
//               <Leaf
//                 size={23}
//                 strokeWidth={1.4}
//                 className="shrink-0 text-[#E9CDA0] transition-transform duration-500 hover:rotate-[-12deg] sm:h-[27px] sm:w-[27px]"
//               />

//               {/* BRAND NAME */}
//               <span
//                 className="flex items-baseline justify-center gap-1 whitespace-nowrap font-serif text-[27px] italic sm:gap-1.5 sm:text-[29px] lg:text-[34px] 2xl:text-[36px]"
//                 style={{
//                   fontFamily: '"Canosa", Georgia, serif',
//                   fontWeight: 535,
//                   letterSpacing: "-0.045em",
//                   textShadow: "0 2px 14px rgba(20, 12, 20, 0.45)",
//                 }}
//               >
//                 <span className="text-[#FFF9EF]">The</span>
//                 <span className="text-[#E9CDA0]">Soft</span>
//                 <span className="text-[#E0E7D6]">Edit</span>
//               </span>
//             </a>

//             {/* RIGHT CONTROLS: LOGIN, SEARCH, CART */}
//             <div className="ml-auto flex min-w-0 items-center justify-end gap-3 sm:gap-4 lg:gap-5">
//               {/* LOGIN / REGISTER */}
//               <div className="flex shrink-0 items-center gap-0 whitespace-nowrap text-[15px] font-medium">
//                 <a
//                   href="/login"
//                   className="group/account relative py-2 text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0]"
//                 >
//                   Login
//                   <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-[#D9BE8B] transition-transform duration-300 group-hover/account:scale-x-100" />
//                 </a>

//                 <span className="px-1 text-[#D9BE8B]/80">/</span>

//                 <a
//                   href="/register"
//                   className="group/account relative py-2 text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0]"
//                 >
//                   Register
//                   <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-[#D9BE8B] transition-transform duration-300 group-hover/account:scale-x-100" />
//                 </a>
//               </div>

//               {/* COLLAPSIBLE SEARCH */}
//               <div
//                 ref={searchContainerRef}
//                 className="relative flex shrink-0 items-center justify-end"
//               >
//                 <form
//                   role="search"
//                   onSubmit={handleSearch}
//                   className={`relative flex items-center transition-all duration-300 ease-in-out ${
//                     searchOpen
//                       ? "w-[155px] sm:w-[185px] lg:w-[205px]"
//                       : "w-9"
//                   }`}
//                 >
//                   <div
//                     className={`flex h-10 w-full items-center overflow-hidden rounded-full border transition-all duration-300 sm:h-11 ${
//                       searchOpen
//                         ? "border-[#D9BE8B] bg-[#30232F]/80 pl-3 pr-2 shadow-[0_0_0_3px_rgba(217,190,139,0.10)]"
//                         : "justify-end border-transparent bg-transparent"
//                     }`}
//                   >
//                     {searchOpen && (
//                       <input
//                         ref={searchRef}
//                         type="search"
//                         value={searchQuery}
//                         onChange={(event) =>
//                           setSearchQuery(event.target.value)
//                         }
//                         onFocus={() => setSearchFocused(true)}
//                         onBlur={() => {
//                           window.setTimeout(() => {
//                             setSearchFocused(false);
//                           }, 180);
//                         }}
//                         placeholder="Search products..."
//                         aria-label="Search products"
//                         aria-expanded={
//                           searchFocused && searchResults.length > 0
//                         }
//                         className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-[12px] text-[#FFF9EF] outline-none ring-0 placeholder:text-[#FFF9EF]/65 focus:border-0 focus:outline-none focus:ring-0 sm:text-[13px]"
//                       />
//                     )}

//                     {searchOpen && searchQuery && (
//                       <button
//                         type="button"
//                         aria-label="Clear search"
//                         onMouseDown={(event) => event.preventDefault()}
//                         onClick={() => {
//                           setSearchQuery("");
//                           searchRef.current?.focus();
//                         }}
//                         className="ml-1 shrink-0 text-[#AAA39D] transition-colors hover:text-[#E9CDA0]"
//                       >
//                         <X size={14} />
//                       </button>
//                     )}

//                     <button
//                       type={searchOpen ? "submit" : "button"}
//                       aria-label={
//                         searchOpen ? "Submit product search" : "Open search"
//                       }
//                       onClick={() => {
//                         if (!searchOpen) {
//                           setSearchOpen(true);
//                           window.setTimeout(() => {
//                             searchRef.current?.focus();
//                           }, 180);
//                         }
//                       }}
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
//                         searchOpen
//                           ? "text-[#E9CDA0] hover:text-[#FFF9EF]"
//                           : "text-[#E9CDA0] hover:bg-white/10 hover:text-[#FFF9EF]"
//                       }`}
//                     >
//                       <Search size={19} strokeWidth={1.7} />
//                     </button>
//                   </div>

//                   {/* SEARCH SUGGESTIONS */}
//                   {searchOpen &&
//                     searchFocused &&
//                     searchResults.length > 0 && (
//                       <div className="absolute right-0 top-full z-[110] mt-3 w-[min(320px,calc(100vw-24px))] overflow-hidden rounded-xl border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] p-2 shadow-[0_20px_55px_rgba(20,12,20,0.38)] backdrop-blur-xl">
//                         <p className="px-3 pb-2 pt-3 text-[10px] tracking-[0.18em] text-[#D9BE8B]">
//                           DISCOVER YOUR NEXT FAVOURITE
//                         </p>

//                         {searchResults.map((product) => (
//                           <button
//                             key={product.id}
//                             type="button"
//                             onMouseDown={(event) => event.preventDefault()}
//                             onClick={() => openProduct(product.id)}
//                             className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-[13px] text-[#FFF9EF] transition-colors duration-200 hover:bg-white/[0.08] hover:text-[#E9CDA0]"
//                           >
//                             <span className="min-w-0 truncate">
//                               {product.name}
//                             </span>

//                             <ArrowUpRight
//                               size={15}
//                               className="shrink-0 text-[#D9BE8B]"
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     )}

//                   {searchOpen &&
//                     searchFocused &&
//                     searchQuery.trim().length > 0 &&
//                     searchResults.length === 0 && (
//                       <div className="absolute right-0 top-full z-[110] mt-3 w-[min(320px,calc(100vw-24px))] rounded-xl border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] p-5 shadow-xl backdrop-blur-xl">
//                         <p className="text-[13px] leading-6 text-[#FFF9EF]">
//                           We couldn't find a match. Try another product name
//                           or category.
//                         </p>
//                       </div>
//                     )}
//                 </form>
//               </div>

//               {/* CART */}
//               <button
//                 type="button"
//                 onClick={onOpenBag}
//                 aria-label={`Open cart, ${bagCount} items`}
//                 title="Cart"
//                 className="group/cart relative flex h-10 w-9 shrink-0 items-center justify-center text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0] sm:w-10"
//               >
//                 <ShoppingCart
//                   size={22}
//                   strokeWidth={1.7}
//                   className="transition-transform duration-300 group-hover/cart:-translate-y-0.5"
//                 />

//                 {bagCount > 0 && (
//                   <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#E9CDA0] px-1 text-[10px] font-semibold text-[#30232F]">
//                     {bagCount}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </nav>
//         </header>,
//         document.body,
//         )}

//         {/* HERO COPY */}
//         {showHeroBanner && (
//         <div className="hero-copy relative z-20 flex min-h-[650px] w-[55%] flex-col items-start justify-center px-4 pb-24 pt-36 text-white sm:min-h-[720px] sm:px-8 sm:pb-28 sm:pt-40 lg:min-h-[800px] lg:px-12 lg:pt-44 xl:px-16">
//           <div className="hero-copy-item mb-6 flex items-center gap-3 sm:mb-7">
//             <span className="hero-gold-line h-px w-9 bg-[#B99A62]" />

//             <p className="text-[9px] font-medium tracking-[0.18em] text-[#E4C99B] sm:text-xs sm:tracking-[0.23em]">
//               {currentSlide.eyebrow}
//             </p>
//           </div>

//           <h1
//             className="hero-copy-item hero-headline max-w-full font-serif text-3xl font-normal leading-[1.08] tracking-[-0.045em] sm:text-4xl lg:text-6xl xl:text-[76px]"
//             style={{ animationDelay: "120ms" }}
//           >
//             {currentSlide.title.map((line, index) => (
//               <span
//                 key={`${line}-${index}`}
//                 className={`hero-title-line block ${
//                   index === 1
//                     ? "italic text-[#DCC09A]"
//                     : "text-[#FBF6EF]"
//                 }`}
//                 style={{ animationDelay: `${180 + index * 140}ms` }}
//               >
//                 {line}
//               </span>
//             ))}
//           </h1>

//           <p
//             className="hero-copy-item mt-5 max-w-[340px] text-xs leading-6 text-white/90 sm:mt-6 sm:text-sm sm:leading-7 lg:text-base"
//             style={{ animationDelay: "430ms" }}
//           >
//             {currentSlide.description}
//           </p>

//           <a
//             href="#shop"
//             className="hero-copy-item hero-cta group/cta mb-5 mt-8 inline-flex items-center gap-8 border border-[#F7F2EA] bg-[#F7F2EA] px-6 py-4 text-[10px] font-semibold tracking-[0.16em] text-[#30232F] transition-all duration-500 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#211820] sm:mt-9 sm:px-7 sm:text-xs"
//             style={{ animationDelay: "520ms" }}
//           >
//             <span className="text-[#30232F] transition-colors duration-500 group-hover/cta:text-[#211820]">
//               {currentSlide.button}
//             </span>

//             <ArrowUpRight
//               size={17}
//               className="shrink-0 text-[#30232F] transition-all duration-500 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 group-hover/cta:text-[#211820]"
//             />
//           </a>

//           <a
//             href="#categories"
//             className="hero-copy-item absolute bottom-7 left-6 flex items-center gap-3 text-[8px] tracking-[0.12em] text-white/90 transition-colors duration-300 hover:text-[#B99A62] sm:bottom-8 sm:left-12 sm:text-[9px] sm:tracking-[0.14em] lg:left-20"
//             style={{ animationDelay: "650ms" }}
//           >
//             <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 transition-all duration-500 hover:border-[#B99A62] hover:bg-[#B99A62]/15">
//               <ArrowDown size={15} />
//             </span>

//             A MOMENT FOR YOURSELF
//           </a>

//           {/* EXISTING SIGNATURE */}
//           <div style={{ animationDelay: "700ms" }}>
//             <p className="font-serif text-xl italic sm:text-2xl">
//               {currentSlide.signature}
//             </p>

//             <p className="mt-2 text-[22px] tracking-[0.2em]">
//               THE SOFT EDIT
//             </p>
//           </div>
//         </div>
//          )}
//       </div>
//     </section>
//   );
// }
// const heroImageSlides = [
//   // {
//   //   image:
//   //     "../src/images/imagea.jpg",
//   //   alt: "Glowing skin in a luxury beauty campaign",
//   //   eyebrow: "A MORE THOUGHTFUL BEAUTY RITUAL",
//   //   title: ["Your skin,", "your kind", "of beautiful."],
//   //   description:
//   //     "Thoughtfully chosen skincare for slower mornings, softer evenings, and feeling good in the skin you're in.",
//   //   button: "DISCOVER THE EDIT",
//   //   signature: "Simply, beautifully you.",
//   // },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imageb.jpg",
//     alt: "Relaxing facial skincare treatment",
//     eyebrow: "YOUR MOMENT OF SELF-CARE",
//     title: ["Make room", "for your", "glow."],
//     description:
//       "Turn your everyday routine into a little luxury, with thoughtful essentials that make caring for yourself feel special.",
//     button: "FIND YOUR RITUAL",
//     signature: "A softer kind of self-care.",
//   },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imagec.jpg",
//     alt: "Beautifully presented skincare products",
//     eyebrow: "LESS NOISE. MORE GLOW.",
//     title: ["Good skin", "starts with", "good care."],
//     description:
//       "Discover considered beauty essentials selected to make your routine simpler, more enjoyable, and uniquely yours.",
//     button: "SHOP SKINCARE",
//     signature: "Care that feels like you.",
//   },
//   // {
//   //   image:
//   //     // "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=2200&q=90",
//   //       "../src/images/imaged.jpg",
//   //   alt: "Elegant skincare products for a daily beauty ritual",
//   //   eyebrow: "THE BEAUTY OF SIMPLICITY",
//   //   title: ["A little", "care goes", "a long way."],
//   //   description:
//   //     "From the first cleanse to your final touch, find the little things that make your skin ritual feel beautifully complete.",
//   //   button: "EXPLORE THE EDIT",
//   //   signature: "Small rituals. Softer days.",
//   // },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imagee.jpg",
//     alt: "Minimal, elegant skincare and beauty essentials",
//     eyebrow: "BEAUTY, WITH INTENTION",
//     title: ["Thoughtful", "care. Natural", "confidence."],
//     description:
//       "Meet a more considered approach to beauty, with skincare favourites chosen to complement your everyday routine.",
//     button: "MEET YOUR FAVOURITES",
//     signature: "Beauty on your own terms.",
//   },
//   // {
//   //   image:
//   //     // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
//   //       "../src/images/imagef.jpg",
//   //   alt: "Premium beauty products in a refined skincare setting",
//   //   eyebrow: "YOUR GLOW, YOUR WAY",
//   //   title: ["Feel good", "in your", "own skin."],
//   //   description:
//   //     "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//   //   button: "SHOP THE COLLECTION",
//   //   signature: "Always beautifully you.",
//   // },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imageh.jpg",
//     alt: "Premium beauty products in a refined skincare setting",
//     eyebrow: "YOUR GLOW, YOUR WAY",
//     title: ["Feel good", "in your", "own skin."],
//     description:
//       "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//     button: "SHOP THE COLLECTION",
//     signature: "Always beautifully you.",
//   },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imageh.jpg",
//     alt: "Premium beauty products in a refined skincare setting",
//     eyebrow: "YOUR GLOW, YOUR WAY",
//     title: ["Feel good", "in your", "own skin."],
//     description:
//       "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//     button: "SHOP THE COLLECTION",
//     signature: "Always beautifully you.",
//   },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imagei.jpg",
//     alt: "Premium beauty products in a refined skincare setting",
//     eyebrow: "YOUR GLOW, YOUR WAY",
//     title: ["Feel good", "in your", "own skin."],
//     description:
//       "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//     button: "SHOP THE COLLECTION",
//     signature: "Always beautifully you.",
//   },
// ];


// type HeaderProps = {
//   bagCount: number;
//   onOpenBag: () => void;
//   onNavigate: (path: string) => void;
//   showHeroBanner?: boolean;
//   headerVariant?: "home" | "serum" | "face-creams" | "body-creams" | "all-products" ;
// };


// const heroNavigation = [
//   {
//     label: "Serum",
//     href: "/serum",
//     items: [
//       { label: "All Serums", href: "#shop" },
//       { label: "Hydrating Serums", href: "#shop" },
//       { label: "Brightening Serums", href: "#shop" },
//     ],
//   },
//   {
//     label: "Face Cream",
//     href: "/face-creams",
//     items: [
//       { label: "All Face Creams", href: "#shop" },
//       { label: "Day Creams", href: "#shop" },
//       { label: "Night Creams", href: "#shop" },
//     ],
//   },
//   {
//     label: "Body Cream",
//     href: "/body-creams",
//     items: [
//       { label: "All Body Creams", href: "#shop" },
//       { label: "Body Butters", href: "#shop" },
//       { label: "Body Lotions", href: "#shop" },
//     ],
//   },
//   {
//     label: "See More",
//     href: "/all-products",
//     items: [
//       { label: "All Products", href: "#shop" },
//       { label: "Our Story", href: "#our-story" },
//       { label: "Contact Us", href: "#footer" },
//     ],
//   },
// ];


// function Hero({ bagCount, onOpenBag, onNavigate, showHeroBanner = true,
//   headerVariant = "home", }: HeaderProps) {
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [videoFinished, setVideoFinished] = useState(false);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchFocused, setSearchFocused] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
// const activePathByVariant: Record<NonNullable<HeaderProps["headerVariant"]>, string> = {
//     home: "/",
//     serum: "/serum",
//     "face-creams": "/face-creams",
//     "body-creams": "/body-creams",
//     "all-products": "/all-products",
//   };
//   const searchContainerRef = useRef<HTMLDivElement>(null);
//   const searchRef = useRef<HTMLInputElement>(null);

//   const currentSlide = {
//     eyebrow: "THE ART OF EVERYDAY SKINCARE",
//     title: ["Your skin,", "your soft ritual."],
//     description:
//       "Thoughtful skincare for the moments that are just for you. Discover your next everyday essential with The Soft Edit.",
//     button: "DISCOVER THE COLLECTION",
//     signature: "A softer kind of glow",
//   };

//   const searchResults = searchQuery.trim()
//     ? products
//         .filter((product) =>
//           `${product.name} ${product.category}`
//             .toLowerCase()
//             .includes(searchQuery.trim().toLowerCase()),
//         )
//         .slice(0, 4)
//     : [];

//   // Change the navigation appearance as the page scrolls.
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 40);
//     };

//     handleScroll();

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Let the campaign video lead for six seconds, then begin the image story.
//   useEffect(() => {
//     if (!showHeroBanner || !videoFinished) return;

//     const slideshowInterval = window.setInterval(() => {
//       setActiveImageIndex((current) => (current + 1) % heroImageSlides.length);
//     }, 5600);

//     return () => window.clearInterval(slideshowInterval);
//   }, [showHeroBanner, videoFinished]);

//   useEffect(() => {
//     if (showHeroBanner) {
//       setVideoFinished(false);
//       setActiveImageIndex(0);
//     }
//   }, [showHeroBanner]);

//   useEffect(() => {
//     function handleEscape(event: KeyboardEvent) {
//       if (event.key === "Escape") {
//         setOpenDropdown(null);
//         setSearchFocused(false);
//         setSearchOpen(false);
//         setSearchQuery("");
//       }
//     }

//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       const searchContainer = searchContainerRef.current;

//       if (
//         searchOpen &&
//         searchContainer &&
//         !searchContainer.contains(event.target as Node)
//       ) {
//         setSearchOpen(false);
//         setSearchFocused(false);
//       }
//     };

//     document.addEventListener("click", handleOutsideClick, true);

//     return () => {
//       document.removeEventListener("click", handleOutsideClick, true);
//     };
//   }, [searchOpen]);

//   function closeNavigation() {
//     setOpenDropdown(null);
//     setSearchFocused(false);
//   }

//   function openProduct(productId: string | number) {
//     closeNavigation();
//     setSearchOpen(false);

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

//     setSearchFocused(false);

//     if (matchingProduct) {
//       openProduct(matchingProduct.id);
//     } else {
//       closeNavigation();
//       setSearchOpen(false);

//       document.getElementById("shop")?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   }

//   return (
//     <section id="home" className="relative w-full">
//       {/* <div
//         className="hero-frame group relative isolate min-h-[650px] w-full overflow-hidden bg-[#30232F] sm:min-h-[720px] lg:min-h-[800px]"
//         aria-label="The Soft Edit skincare campaign video"
//       > */}
//       <div
//   className={`group relative w-full ${
//     showHeroBanner
//       ? "hero-frame isolate min-h-[650px] overflow-hidden bg-[#30232F] sm:min-h-[720px] lg:min-h-[800px]"
//       : "h-0 overflow-visible"
//   }`}
//   aria-label={
//     showHeroBanner
//       ? "The Soft Edit skincare campaign video"
//       : "The Soft Edit navigation"
//   }
// >
//         {/* FULL-WIDTH HERO: VIDEO FIRST, THEN THE FULL-BLEED IMAGE STORY */}
//         {showHeroBanner && (
//           <>
//             {/* The video leads for six seconds before the image sequence takes over. */}
//             <video
//               autoPlay
//               muted
//               playsInline
//               preload="auto"
//               aria-label="The Soft Edit luxury skincare campaign"
//               onTimeUpdate={(event) => {
//                 if (event.currentTarget.currentTime >= 6) {
//                   event.currentTarget.pause();
//                   setVideoFinished(true);
//                 }
//               }}
//               onEnded={() => setVideoFinished(true)}
//               onError={() => setVideoFinished(true)}
//               className={`absolute inset-0 z-0 h-full w-full object-cover object-center transition-opacity duration-[1400ms] ease-in-out ${
//                 videoFinished ? "pointer-events-none opacity-0" : "opacity-100"
//               }`}
//             >
//               <source src="/images/promo1-.mp4" type="video/mp4" />
//               Your browser does not support video playback.
//             </video>

//             {/* Full-bleed photographs gently drift and crossfade after the video. */}
//             {heroImageSlides.map((slide, index) => (
//               <img
//                 key={`${slide.image}-${index}`}
//                 src={slide.image}
//                 alt={slide.alt}
//                 aria-hidden={!videoFinished || index !== activeImageIndex}
//                 className={`soft-edit-hero-image absolute inset-0 z-0 h-full w-full object-cover object-center transition-[opacity,transform,filter] duration-[2200ms] ease-in-out ${
//                   videoFinished && index === activeImageIndex
//                     ? "scale-100 opacity-100"
//                     : "pointer-events-none scale-[1.06] opacity-0"
//                 }`}
//                 style={{
//                   filter: "saturate(0.91) contrast(1.02)",
//                   animation:
//                     videoFinished && index === activeImageIndex
//                       ? "softEditHeroImageDrift 7s cubic-bezier(0.2, 0.65, 0.25, 1) both"
//                       : "none",
//                 }}
//               />
//             ))}

//             <style>{`
//               @keyframes softEditHeroImageDrift {
//                 0% { transform: scale(1.055) translate3d(0.8%, 0.3%, 0); }
//                 100% { transform: scale(1) translate3d(-0.4%, 0, 0); }
//               }
//               @media (prefers-reduced-motion: reduce) {
//                 .soft-edit-hero-image { animation: none !important; transition-duration: 400ms !important; }
//               }
//             `}</style>

//             {/* Keep the video treatment subtle; strengthen the shadow only during the image slideshow. */}
//             {!videoFinished ? (
//               <>
//                 <div
//                   aria-hidden="true"
//                   className="pointer-events-none absolute inset-0 z-[1]"
//                   style={{
//                     background:
//                       "linear-gradient(90deg, rgba(28, 18, 29, 0.24) 0%, rgba(33, 22, 37, 0.13) 34%, rgba(33, 22, 37, 0.04) 68%, rgba(33, 22, 37, 0.06) 100%)",
//                   }}
//                 />
//                 <div
//                   aria-hidden="true"
//                   className="pointer-events-none absolute inset-0 z-[1]"
//                   style={{
//                     background:
//                       "linear-gradient(0deg, rgba(33, 22, 37, 0.18) 0%, rgba(33, 22, 37, 0.03) 38%, rgba(33, 22, 37, 0.05) 100%)",
//                   }}
//                 />
//               </>
//             ) : (
//               <>
//                 {/* A cinematic plum-black shadow protects the copy on the left, while the images stay vivid on the right. */}
//                 <div
//                   aria-hidden="true"
//                   className="pointer-events-none absolute inset-0 z-[1]"
//                   style={{
//                     background:
//                       "linear-gradient(90deg, rgba(18, 12, 22, 0.88) 0%, rgba(24, 16, 28, 0.78) 18%, rgba(33, 22, 37, 0.58) 34%, rgba(33, 22, 37, 0.30) 49%, rgba(33, 22, 37, 0.08) 68%, rgba(33, 22, 37, 0.02) 100%)",
//                   }}
//                 />
//                 <div
//                   aria-hidden="true"
//                   className="pointer-events-none absolute inset-0 z-[1]"
//                   style={{
//                     background:
//                       "linear-gradient(0deg, rgba(25, 16, 28, 0.30) 0%, rgba(33, 22, 37, 0.05) 36%, rgba(33, 22, 37, 0.04) 100%)",
//                   }}
//                 />
//               </>
//             )}
//           </>
//         )}

//         {/* STICKY LUXURY HEADER */}
//         {/* <header
//           className={`fixed inset-x-0 top-0 z-[100] w-full text-[#FFF9EF] transition-all duration-500 ${
//             isScrolled
//               ? "border-b border-[#D9BE8B]/40 bg-[#30232F]/95 shadow-[0_8px_30px_rgba(20,12,20,0.22)] backdrop-blur-xl"
//               : "border-b border-transparent bg-transparent"
//           }`}
//         > */}
//         {createPortal(
//         <header

// className={`fixed inset-x-0 top-0 z-[9999] w-full border-x-0 border-t-0 border-b text-[#FFF9EF] shadow-none transition-[background-color,border-color,backdrop-filter] duration-500 ease-in-out ${
//   headerVariant === "home"
//     ? isScrolled
//       ? "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
//       : "border-b-transparent bg-transparent backdrop-blur-none"
//     : "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
// }`}

//   // className={`fixed inset-x-0 top-0 z-[9999] w-full border-x-0 border-t-0 border-b text-[#FFF9EF] shadow-none transition-[background-color,border-color] duration-500 ease-in-out ${
//   //   isScrolled
//   //     ? "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
//   //     : "border-b-transparent bg-transparent backdrop-blur-none"

// >
//           <nav
//             aria-label="Main navigation"
//             className="relative mx-auto flex min-h-[88px] w-full items-center justify-between gap-3 px-4 py-4 sm:min-h-[94px] sm:px-7 lg:min-h-[108px] lg:px-10 2xl:px-14"
//           >
//             {/* LEFT NAVIGATION */}
//             <div className="flex min-w-0 flex-1 items-center justify-start gap-4 lg:gap-5">
//               {/* HOME: active only on the homepage */}
//               <a
//                 href="/"
//                 onClick={(event) => {
//                   event.preventDefault();
//                   closeNavigation();
//                   if (headerVariant !== "home") {
//                     onNavigate("/");
//                   } else {
//                     window.scrollTo({ top: 0, behavior: "smooth" });
//                   }
//                 }}
//                 aria-current={headerVariant === "home" ? "page" : undefined}
//                 className={`group/nav relative whitespace-nowrap py-3 text-[14px] font-semibold transition-colors duration-300 ${
//                   headerVariant === "home"
//                     ? "text-[#E9CDA0]"
//                     : "text-[#FFF9EF] hover:text-[#E9CDA0]"
//                 }`}
//               >
//                 Home
//                 <span
//                   className={`absolute inset-x-0 bottom-1 h-[1.5px] origin-left bg-[#D9BE8B] transition-transform duration-300 ${
//                     headerVariant === "home"
//                       ? "scale-x-100"
//                       : "scale-x-0 group-hover/nav:scale-x-100"
//                   }`}
//                 />
//               </a>

//               {heroNavigation.map((item) => {
//                 const isOpen = openDropdown === item.label;
//                 const isActive = item.href === activePathByVariant[headerVariant];

//                 return (
//                   <div
//                     key={item.label}
//                     className="relative"
//                     onMouseEnter={() => setOpenDropdown(item.label)}
//                     onMouseLeave={() => setOpenDropdown(null)}
//                   >
//                     <button
//                       type="button"
//                       aria-expanded={isOpen}
//                       aria-haspopup="true"
//                       // onClick={() =>
//                       //   setOpenDropdown((current) =>
//                       //     current === item.label ? null : item.label,
//                       //   )
//                       // }
//                       onClick={() => {
//                         closeNavigation();
//                         onNavigate(item.href);
//                       }}
//                       onFocus={() => setOpenDropdown(item.label)}
//                       className={`group/nav relative flex items-center gap-0 whitespace-nowrap py-3 text-[14px] font-semibold transition-colors duration-300 ${
//                         isActive || isOpen
//                           ? "text-[#E9CDA0]"
//                           : "text-[#FFF9EF] hover:text-[#E9CDA0]"
//                       }`}
//                     >
//                       {item.label}

//                       <ChevronDown
//                         size={14}
//                         strokeWidth={1.6}
//                         className={`-ml-[1px] text-[#D9BE8B]/70 transition-transform duration-300 ${
//                           isOpen ? "rotate-180 text-[#E9CDA0]" : ""
//                         }`}
//                       />

//                       <span
//                         className={`absolute inset-x-0 bottom-1 h-[1.5px] origin-left bg-[#D9BE8B] transition-transform duration-300 ${
//                           isActive || isOpen
//                             ? "scale-x-100"
//                             : "scale-x-0 group-hover/nav:scale-x-100"
//                         }`}
//                       />
//                     </button>

//                     {/* DROPDOWN */}
//                     <div
//                       className={`absolute left-0 top-full w-56 pt-2 transition-all duration-200 ${
//                         isOpen
//                           ? "visible translate-y-0 opacity-100"
//                           : "invisible pointer-events-none -translate-y-1 opacity-0"
//                       }`}
//                     >
//                       <div className="border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] py-2 shadow-xl backdrop-blur-xl">
//                         {item.items.map((subItem) => (
//                           <a
//   key={subItem.label}
//   href={subItem.href}
//   onClick={(event) => {
//                               closeNavigation();
//                               if (item.label !== "See More") {
//                                 event.preventDefault();
//                                 onNavigate(item.href);
//                               }
//                             }}
//   className="block px-5 py-3 text-[13px] text-[#FFF9EF] transition-colors duration-200 hover:bg-white/10 hover:text-[#E9CDA0]"
// >
//   {subItem.label}
// </a>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* BRAND WORDMARK — LEAF BESIDE THE NAME */}
//             <a
//               href="/"
//               aria-label="The Soft Edit home"
//               onClick={(event) => {
//                 event.preventDefault();
//                 closeNavigation();
//                 if (headerVariant !== "home") {
//                   onNavigate("/");
//                 } else {
//                   window.scrollTo({ top: 0, behavior: "smooth" });
//                 }
//               }}
//               className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 whitespace-nowrap transition-opacity duration-300 hover:opacity-90 sm:gap-2.5"
//             >
//               {/* BOTANICAL LEAF ICON */}
//               <Leaf
//                 size={23}
//                 strokeWidth={1.4}
//                 className="shrink-0 text-[#E9CDA0] transition-transform duration-500 hover:rotate-[-12deg] sm:h-[27px] sm:w-[27px]"
//               />

//               {/* BRAND NAME */}
//               <span
//                 className="flex items-baseline justify-center gap-1 whitespace-nowrap font-serif text-[27px] italic sm:gap-1.5 sm:text-[29px] lg:text-[34px] 2xl:text-[36px]"
//                 style={{
//                   fontFamily: '"Canosa", Georgia, serif',
//                   fontWeight: 535,
//                   letterSpacing: "-0.045em",
//                   textShadow: "0 2px 14px rgba(20, 12, 20, 0.45)",
//                 }}
//               >
//                 <span className="text-[#FFF9EF]">The</span>
//                 <span className="text-[#E9CDA0]">Soft</span>
//                 <span className="text-[#E0E7D6]">Edit</span>
//               </span>
//             </a>

//             {/* RIGHT CONTROLS: LOGIN, SEARCH, CART */}
//             <div className="ml-auto flex min-w-0 items-center justify-end gap-3 sm:gap-4 lg:gap-5">
//               {/* LOGIN / REGISTER */}
//               <div className="flex shrink-0 items-center gap-0 whitespace-nowrap text-[15px] font-medium">
//                 <a
//                   href="/login"
//                   className="group/account relative py-2 text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0]"
//                 >
//                   Login
//                   <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-[#D9BE8B] transition-transform duration-300 group-hover/account:scale-x-100" />
//                 </a>

//                 <span className="px-1 text-[#D9BE8B]/80">/</span>

//                 <a
//                   href="/register"
//                   className="group/account relative py-2 text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0]"
//                 >
//                   Register
//                   <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-[#D9BE8B] transition-transform duration-300 group-hover/account:scale-x-100" />
//                 </a>
//               </div>

//               {/* COLLAPSIBLE SEARCH */}
//               <div
//                 ref={searchContainerRef}
//                 className="relative flex shrink-0 items-center justify-end"
//               >
//                 <form
//                   role="search"
//                   onSubmit={handleSearch}
//                   className={`relative flex items-center transition-all duration-300 ease-in-out ${
//                     searchOpen
//                       ? "w-[155px] sm:w-[185px] lg:w-[205px]"
//                       : "w-9"
//                   }`}
//                 >
//                   <div
//                     className={`flex h-10 w-full items-center overflow-hidden rounded-full border transition-all duration-300 sm:h-11 ${
//                       searchOpen
//                         ? "border-[#D9BE8B] bg-[#30232F]/80 pl-3 pr-2 shadow-[0_0_0_3px_rgba(217,190,139,0.10)]"
//                         : "justify-end border-transparent bg-transparent"
//                     }`}
//                   >
//                     {searchOpen && (
//                       <input
//                         ref={searchRef}
//                         type="search"
//                         value={searchQuery}
//                         onChange={(event) =>
//                           setSearchQuery(event.target.value)
//                         }
//                         onFocus={() => setSearchFocused(true)}
//                         onBlur={() => {
//                           window.setTimeout(() => {
//                             setSearchFocused(false);
//                           }, 180);
//                         }}
//                         placeholder="Search products..."
//                         aria-label="Search products"
//                         aria-expanded={
//                           searchFocused && searchResults.length > 0
//                         }
//                         className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-[12px] text-[#FFF9EF] outline-none ring-0 placeholder:text-[#FFF9EF]/65 focus:border-0 focus:outline-none focus:ring-0 sm:text-[13px]"
//                       />
//                     )}

//                     {searchOpen && searchQuery && (
//                       <button
//                         type="button"
//                         aria-label="Clear search"
//                         onMouseDown={(event) => event.preventDefault()}
//                         onClick={() => {
//                           setSearchQuery("");
//                           searchRef.current?.focus();
//                         }}
//                         className="ml-1 shrink-0 text-[#AAA39D] transition-colors hover:text-[#E9CDA0]"
//                       >
//                         <X size={14} />
//                       </button>
//                     )}

//                     <button
//                       type={searchOpen ? "submit" : "button"}
//                       aria-label={
//                         searchOpen ? "Submit product search" : "Open search"
//                       }
//                       onClick={() => {
//                         if (!searchOpen) {
//                           setSearchOpen(true);
//                           window.setTimeout(() => {
//                             searchRef.current?.focus();
//                           }, 180);
//                         }
//                       }}
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
//                         searchOpen
//                           ? "text-[#E9CDA0] hover:text-[#FFF9EF]"
//                           : "text-[#E9CDA0] hover:bg-white/10 hover:text-[#FFF9EF]"
//                       }`}
//                     >
//                       <Search size={19} strokeWidth={1.7} />
//                     </button>
//                   </div>

//                   {/* SEARCH SUGGESTIONS */}
//                   {searchOpen &&
//                     searchFocused &&
//                     searchResults.length > 0 && (
//                       <div className="absolute right-0 top-full z-[110] mt-3 w-[min(320px,calc(100vw-24px))] overflow-hidden rounded-xl border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] p-2 shadow-[0_20px_55px_rgba(20,12,20,0.38)] backdrop-blur-xl">
//                         <p className="px-3 pb-2 pt-3 text-[10px] tracking-[0.18em] text-[#D9BE8B]">
//                           DISCOVER YOUR NEXT FAVOURITE
//                         </p>

//                         {searchResults.map((product) => (
//                           <button
//                             key={product.id}
//                             type="button"
//                             onMouseDown={(event) => event.preventDefault()}
//                             onClick={() => openProduct(product.id)}
//                             className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-[13px] text-[#FFF9EF] transition-colors duration-200 hover:bg-white/[0.08] hover:text-[#E9CDA0]"
//                           >
//                             <span className="min-w-0 truncate">
//                               {product.name}
//                             </span>

//                             <ArrowUpRight
//                               size={15}
//                               className="shrink-0 text-[#D9BE8B]"
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     )}

//                   {searchOpen &&
//                     searchFocused &&
//                     searchQuery.trim().length > 0 &&
//                     searchResults.length === 0 && (
//                       <div className="absolute right-0 top-full z-[110] mt-3 w-[min(320px,calc(100vw-24px))] rounded-xl border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] p-5 shadow-xl backdrop-blur-xl">
//                         <p className="text-[13px] leading-6 text-[#FFF9EF]">
//                           We couldn't find a match. Try another product name
//                           or category.
//                         </p>
//                       </div>
//                     )}
//                 </form>
//               </div>

//               {/* CART */}
//               <button
//                 type="button"
//                 onClick={onOpenBag}
//                 aria-label={`Open cart, ${bagCount} items`}
//                 title="Cart"
//                 className="group/cart relative flex h-10 w-9 shrink-0 items-center justify-center text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0] sm:w-10"
//               >
//                 <ShoppingCart
//                   size={22}
//                   strokeWidth={1.7}
//                   className="transition-transform duration-300 group-hover/cart:-translate-y-0.5"
//                 />

//                 {bagCount > 0 && (
//                   <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#E9CDA0] px-1 text-[10px] font-semibold text-[#30232F]">
//                     {bagCount}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </nav>
//         </header>,
//         document.body,
//         )}

//         {/* HERO COPY */}
//         {showHeroBanner && (
//         <div className="hero-copy relative z-20 flex min-h-[650px] w-[55%] flex-col items-start justify-center px-4 pb-24 pt-36 text-white sm:min-h-[720px] sm:px-8 sm:pb-28 sm:pt-40 lg:min-h-[800px] lg:px-12 lg:pt-44 xl:px-16">
//           <div className="hero-copy-item mb-6 flex items-center gap-3 sm:mb-7">
//             <span className="hero-gold-line h-px w-9 bg-[#B99A62]" />

//             <p className="text-[9px] font-medium tracking-[0.18em] text-[#E4C99B] sm:text-xs sm:tracking-[0.23em]">
//               {currentSlide.eyebrow}
//             </p>
//           </div>

//           <h1
//             className="hero-copy-item hero-headline max-w-full font-serif text-3xl font-normal leading-[1.08] tracking-[-0.045em] sm:text-4xl lg:text-6xl xl:text-[76px]"
//             style={{ animationDelay: "120ms" }}
//           >
//             {currentSlide.title.map((line, index) => (
//               <span
//                 key={`${line}-${index}`}
//                 className={`hero-title-line block ${
//                   index === 1
//                     ? "italic text-[#DCC09A]"
//                     : "text-[#FBF6EF]"
//                 }`}
//                 style={{ animationDelay: `${180 + index * 140}ms` }}
//               >
//                 {line}
//               </span>
//             ))}
//           </h1>

//           <p
//             className="hero-copy-item mt-5 max-w-[340px] text-xs leading-6 text-white/90 sm:mt-6 sm:text-sm sm:leading-7 lg:text-base"
//             style={{ animationDelay: "430ms" }}
//           >
//             {currentSlide.description}
//           </p>

//           <a
//             href="#shop"
//             className="hero-copy-item hero-cta group/cta mb-5 mt-8 inline-flex items-center gap-8 border border-[#F7F2EA] bg-[#F7F2EA] px-6 py-4 text-[10px] font-semibold tracking-[0.16em] text-[#30232F] transition-all duration-500 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#211820] sm:mt-9 sm:px-7 sm:text-xs"
//             style={{ animationDelay: "520ms" }}
//           >
//             <span className="text-[#30232F] transition-colors duration-500 group-hover/cta:text-[#211820]">
//               {currentSlide.button}
//             </span>

//             <ArrowUpRight
//               size={17}
//               className="shrink-0 text-[#30232F] transition-all duration-500 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 group-hover/cta:text-[#211820]"
//             />
//           </a>

//           <a
//             href="#categories"
//             className="hero-copy-item absolute bottom-7 left-6 flex items-center gap-3 text-[8px] tracking-[0.12em] text-white/90 transition-colors duration-300 hover:text-[#B99A62] sm:bottom-8 sm:left-12 sm:text-[9px] sm:tracking-[0.14em] lg:left-20"
//             style={{ animationDelay: "650ms" }}
//           >
//             <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 transition-all duration-500 hover:border-[#B99A62] hover:bg-[#B99A62]/15">
//               <ArrowDown size={15} />
//             </span>

//             A MOMENT FOR YOURSELF
//           </a>

//           {/* EXISTING SIGNATURE */}
//           <div style={{ animationDelay: "700ms" }}>
//             <p className="font-serif text-xl italic sm:text-2xl">
//               {currentSlide.signature}
//             </p>

//             <p className="mt-2 text-[22px] tracking-[0.2em]">
//               THE SOFT EDIT
//             </p>
//           </div>
//         </div>
//          )}
//       </div>
//     </section>
//   );
// }
const heroImageSlides = [
  // {
  //   image:
  //     "../src/images/imagea.jpg",
  //   alt: "Glowing skin in a luxury beauty campaign",
  //   eyebrow: "A MORE THOUGHTFUL BEAUTY RITUAL",
  //   title: ["Your skin,", "your kind", "of beautiful."],
  //   description:
  //     "Thoughtfully chosen skincare for slower mornings, softer evenings, and feeling good in the skin you're in.",
  //   button: "DISCOVER THE EDIT",
  //   signature: "Simply, beautifully you.",
  // },
  {
    image:
      // "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2200&q=90",
        "../src/images/imageb.jpg",
    alt: "Relaxing facial skincare treatment",
    eyebrow: "YOUR MOMENT OF SELF-CARE",
    title: ["Make room", "for your", "glow."],
    description:
      "Turn your everyday routine into a little luxury, with thoughtful essentials that make caring for yourself feel special.",
    button: "FIND YOUR RITUAL",
    signature: "A softer kind of self-care.",
  },

  {
    image:
      // "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2200&q=90",
        "../src/images/image3.jpg",
    alt: "Relaxing facial skincare treatment",
    eyebrow: "YOUR MOMENT OF SELF-CARE",
    title: ["Make room", "for your", "glow."],
    description:
      "Turn your everyday routine into a little luxury, with thoughtful essentials that make caring for yourself feel special.",
    button: "FIND YOUR RITUAL",
    signature: "A softer kind of self-care.",
  },
   {
    image:
      // "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2200&q=90",
        "../src/images/IMG-20261026-WA0004.jpg",
    alt: "Relaxing facial skincare treatment",
    eyebrow: "YOUR MOMENT OF SELF-CARE",
    title: ["Make room", "for your", "glow."],
    description:
      "Turn your everyday routine into a little luxury, with thoughtful essentials that make caring for yourself feel special.",
    button: "FIND YOUR RITUAL",
    signature: "A softer kind of self-care.",
  },
   {
    image:
      // "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2200&q=90",
        "../src/images/IMG-20261026-WA0006.jpg",
    alt: "Relaxing facial skincare treatment",
    eyebrow: "YOUR MOMENT OF SELF-CARE",
    title: ["Make room", "for your", "glow."],
    description:
      "Turn your everyday routine into a little luxury, with thoughtful essentials that make caring for yourself feel special.",
    button: "FIND YOUR RITUAL",
    signature: "A softer kind of self-care.",
  },
   {
    image:
      // "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2200&q=90",
        "../src/images/IMG-20261026-WA0007.jpg",
    alt: "Relaxing facial skincare treatment",
    eyebrow: "YOUR MOMENT OF SELF-CARE",
    title: ["Make room", "for your", "glow."],
    description:
      "Turn your everyday routine into a little luxury, with thoughtful essentials that make caring for yourself feel special.",
    button: "FIND YOUR RITUAL",
    signature: "A softer kind of self-care.",
  },
   {
    image:
      // "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2200&q=90",
        "../src/images/IMG-20261026-WA0008.jpg",
    alt: "Relaxing facial skincare treatment",
    eyebrow: "YOUR MOMENT OF SELF-CARE",
    title: ["Make room", "for your", "glow."],
    description:
      "Turn your everyday routine into a little luxury, with thoughtful essentials that make caring for yourself feel special.",
    button: "FIND YOUR RITUAL",
    signature: "A softer kind of self-care.",
  },
  {
    image:
      // "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=2200&q=90",
        "../src/images/imagec.jpg",
    alt: "Beautifully presented skincare products",
    eyebrow: "LESS NOISE. MORE GLOW.",
    title: ["Good skin", "starts with", "good care."],
    description:
      "Discover considered beauty essentials selected to make your routine simpler, more enjoyable, and uniquely yours.",
    button: "SHOP SKINCARE",
    signature: "Care that feels like you.",
  },
  // {
  //   image:
  //     // "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=2200&q=90",
  //       "../src/images/imaged.jpg",
  //   alt: "Elegant skincare products for a daily beauty ritual",
  //   eyebrow: "THE BEAUTY OF SIMPLICITY",
  //   title: ["A little", "care goes", "a long way."],
  //   description:
  //     "From the first cleanse to your final touch, find the little things that make your skin ritual feel beautifully complete.",
  //   button: "EXPLORE THE EDIT",
  //   signature: "Small rituals. Softer days.",
  // },
  {
    image:
      // "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=2200&q=90",
        "../src/images/imagee.jpg",
    alt: "Minimal, elegant skincare and beauty essentials",
    eyebrow: "BEAUTY, WITH INTENTION",
    title: ["Thoughtful", "care. Natural", "confidence."],
    description:
      "Meet a more considered approach to beauty, with skincare favourites chosen to complement your everyday routine.",
    button: "MEET YOUR FAVOURITES",
    signature: "Beauty on your own terms.",
  },
  // {
  //   image:
  //     // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
  //       "../src/images/imagef.jpg",
  //   alt: "Premium beauty products in a refined skincare setting",
  //   eyebrow: "YOUR GLOW, YOUR WAY",
  //   title: ["Feel good", "in your", "own skin."],
  //   description:
  //     "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
  //   button: "SHOP THE COLLECTION",
  //   signature: "Always beautifully you.",
  // },
  {
    image:
      // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
        "../src/images/imageh.jpg",
    alt: "Premium beauty products in a refined skincare setting",
    eyebrow: "YOUR GLOW, YOUR WAY",
    title: ["Feel good", "in your", "own skin."],
    description:
      "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
    button: "SHOP THE COLLECTION",
    signature: "Always beautifully you.",
  },
  
  {
    image:
      // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
        "../src/images/imag1.jpg",
    alt: "Premium beauty products in a refined skincare setting",
    eyebrow: "YOUR GLOW, YOUR WAY",
    title: ["Feel good", "in your", "own skin."],
    description:
      "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
    button: "SHOP THE COLLECTION",
    signature: "Always beautifully you.",
  },
];


type HeaderProps = {
  bagCount: number;
  onOpenBag: () => void;
  onNavigate: (path: string) => void;
  showHeroBanner?: boolean;
  headerVariant?: "home" | "serum" | "face-creams" | "body-creams" | "all-products" ;
};


const heroNavigation = [
  {
    label: "Serum",
    href: "/serum",
    items: [
      { label: "All Serums", href: "#shop" },
      { label: "Hydrating Serums", href: "#shop" },
      { label: "Brightening Serums", href: "#shop" },
    ],
  },
  {
    label: "Face Cream",
    href: "/face-creams",
    items: [
      { label: "All Face Creams", href: "#shop" },
      { label: "Day Creams", href: "#shop" },
      { label: "Night Creams", href: "#shop" },
    ],
  },
  {
    label: "Body Cream",
    href: "/body-creams",
    items: [
      { label: "All Body Creams", href: "#shop" },
      { label: "Body Butters", href: "#shop" },
      { label: "Body Lotions", href: "#shop" },
    ],
  },
  {
    label: "See More",
    href: "/all-products",
    items: [
      { label: "All Products", href: "#shop" },
      { label: "Our Story", href: "#our-story" },
      { label: "Contact Us", href: "#footer" },
    ],
  },
];


function Hero({ bagCount, onOpenBag, onNavigate, showHeroBanner = true,
  headerVariant = "home", }: HeaderProps) {
  const [videoFinished, setVideoFinished] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");
  
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
const activePathByVariant: Record<NonNullable<HeaderProps["headerVariant"]>, string> = {
    home: "/",
    serum: "/serum",
    "face-creams": "/face-creams",
    "body-creams": "/body-creams",
    "all-products": "/all-products",
  };
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoFailedRef = useRef(false);

  // The nav link for the page you are on keeps its gold underline.
  // Every link you click becomes the active one immediately, and it is
  // remembered so it survives the page changing underneath the header.
  const navHrefs = ["/", ...heroNavigation.map((item) => item.href)];

  const [activeHref, setActiveHref] = useState<string>(() => {
    try {
      const path = window.location.pathname.replace(/\/+$/, "") || "/";

      if (path !== "/" && navHrefs.includes(path)) return path;

      const stored = window.sessionStorage.getItem("softEditActiveNav");

      if (stored && navHrefs.includes(stored)) return stored;
    } catch {
      // Storage or window can be unavailable; fall back to the page variant.
    }

    return activePathByVariant[headerVariant];
  });

  useEffect(() => {
    try {
      window.sessionStorage.setItem("softEditActiveNav", activeHref);
    } catch {
      // Ignore storage errors.
    }
  }, [activeHref]);

  // Browser back / forward buttons move the underline too.
  useEffect(() => {
    function handlePopState() {
      const path = window.location.pathname.replace(/\/+$/, "") || "/";

      if (navHrefs.includes(path)) setActiveHref(path);
    }

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const currentSlide = {
    eyebrow: "THE ART OF EVERYDAY SKINCARE",
    title: ["Your skin,", "your soft ritual."],
    description:
      "Thoughtful skincare for the moments that are just for you. Discover your next everyday essential with The Soft Edit.",
    button: "DISCOVER THE COLLECTION",
    signature: "A softer kind of glow",
  };

  const searchResults = searchQuery.trim()
    ? products
        .filter((product) =>
          `${product.name} ${product.category}`
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase()),
        )
        .slice(0, 4)
    : [];

  // Change the navigation appearance as the page scrolls.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // The video leads for six seconds, then every image shows one after the other,
  // then the video plays again — and the whole story repeats continuously.
  useEffect(() => {
    if (!showHeroBanner || !videoFinished) return;

    const slideTimeout = window.setTimeout(() => {
      const isLastImage = activeImageIndex >= heroImageSlides.length - 1;

      if (isLastImage && !videoFailedRef.current) {
        // All images have shown: bring the video back from the start.
        const video = videoRef.current;

        if (video) {
          video.currentTime = 0;
          video.play().catch(() => {});
        }

        setActiveImageIndex(0);
        setVideoFinished(false);
      } else {
        setActiveImageIndex((current) => (current + 1) % heroImageSlides.length);
      }
    }, 3200);

    return () => window.clearTimeout(slideTimeout);
  }, [showHeroBanner, videoFinished, activeImageIndex]);

  useEffect(() => {
    if (showHeroBanner) {
      setVideoFinished(false);
      setActiveImageIndex(0);
    }
  }, [showHeroBanner]);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSearchFocused(false);
        setSearchOpen(false);
        setSearchQuery("");
      }
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const searchContainer = searchContainerRef.current;

      if (
        searchOpen &&
        searchContainer &&
        !searchContainer.contains(event.target as Node)
      ) {
        setSearchOpen(false);
        setSearchFocused(false);
      }
    };

    document.addEventListener("click", handleOutsideClick, true);

    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
  }, [searchOpen]);

  function closeNavigation() {
    setSearchFocused(false);
  }

  function openProduct(productId: string | number) {
    closeNavigation();
    setSearchOpen(false);

    const productElement = document.getElementById(`product-${productId}`);

    if (productElement) {
      productElement.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else {
      document.getElementById("shop")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      searchRef.current?.focus();
      return;
    }

    const matchingProduct = products.find((product) =>
      `${product.name} ${product.category}`.toLowerCase().includes(query),
    );

    setSearchFocused(false);

    if (matchingProduct) {
      openProduct(matchingProduct.id);
    } else {
      closeNavigation();
      setSearchOpen(false);

      document.getElementById("shop")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  return (
    <section id="home" className="relative w-full">
      {/* <div
        className="hero-frame group relative isolate min-h-[650px] w-full overflow-hidden bg-[#30232F] sm:min-h-[720px] lg:min-h-[800px]"
        aria-label="The Soft Edit skincare campaign video"
      > */}
      <div
  className={`group relative w-full ${
    showHeroBanner
      ? "hero-frame isolate min-h-[650px] overflow-hidden bg-[#30232F] sm:min-h-[720px] lg:min-h-[800px]"
      : "h-0 overflow-visible"
  }`}
  aria-label={
    showHeroBanner
      ? "The Soft Edit skincare campaign video"
      : "The Soft Edit navigation"
  }
>
        {/* FULL-WIDTH HERO: VIDEO FIRST, THEN THE FULL-BLEED IMAGE STORY */}
        {showHeroBanner && (
          <>
            {/* The video leads for six seconds before the image sequence takes over. */}
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              aria-label="The Soft Edit luxury skincare campaign"
              onTimeUpdate={(event) => {
                if (event.currentTarget.currentTime >= 6) {
                  event.currentTarget.pause();
                  setVideoFinished(true);
                }
              }}
              onEnded={() => setVideoFinished(true)}
              onError={() => {
                videoFailedRef.current = true;
                setVideoFinished(true);
              }}
              className={`absolute inset-0 z-0 h-full w-full object-cover object-center transition-opacity duration-[1400ms] ease-in-out ${
                videoFinished ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            >
              <source src="/images/promo1-.mp4" type="video/mp4" />
              Your browser does not support video playback.
            </video>

            {/* Full-bleed photographs gently drift and crossfade after the video. */}
            {heroImageSlides.map((slide, index) => (
              <img
                key={`${slide.image}-${index}`}
                src={slide.image}
                alt={slide.alt}
                aria-hidden={!videoFinished || index !== activeImageIndex}
                className={`soft-edit-hero-image absolute inset-0 z-0 h-full w-full object-cover object-center transition-[opacity,transform,filter] duration-[2200ms] ease-in-out ${
                  videoFinished && index === activeImageIndex
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-[1.06] opacity-0"
                }`}
                style={{
                  filter: "saturate(0.91) contrast(1.02)",
                  animation:
                    videoFinished && index === activeImageIndex
                      ? "softEditHeroImageDrift 7s cubic-bezier(0.2, 0.65, 0.25, 1) both"
                      : "none",
                }}
              />
            ))}

            <style>{`
              @keyframes softEditHeroImageDrift {
                0% { transform: scale(1.055) translate3d(0.8%, 0.3%, 0); }
                100% { transform: scale(1) translate3d(-0.4%, 0, 0); }
              }
              @media (prefers-reduced-motion: reduce) {
                .soft-edit-hero-image { animation: none !important; transition-duration: 400ms !important; }
              }
            `}</style>

            {/* Restore the original cinematic overlay on the video; keep the stronger image-only shadow below. */}
            {!videoFinished ? (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-[1]"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(28, 18, 29, 0.68) 0%, rgba(33, 22, 37, 0.54) 22%, rgba(48, 35, 47, 0.26) 46%, rgba(33, 22, 37, 0.08) 72%, rgba(33, 22, 37, 0.12) 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-[1]"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(33, 22, 37, 0.42) 0%, rgba(33, 22, 37, 0.08) 34%, rgba(33, 22, 37, 0.12) 100%)",
                  }}
                />
              </>
            ) : (
              <>
                {/* A cinematic plum-black shadow protects the copy on the left, while the images stay vivid on the right. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-[1]"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(18, 12, 22, 0.88) 0%, rgba(24, 16, 28, 0.78) 18%, rgba(33, 22, 37, 0.58) 34%, rgba(33, 22, 37, 0.30) 49%, rgba(33, 22, 37, 0.08) 68%, rgba(33, 22, 37, 0.02) 100%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-[1]"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(25, 16, 28, 0.30) 0%, rgba(33, 22, 37, 0.05) 36%, rgba(33, 22, 37, 0.04) 100%)",
                  }}
                />
              </>
            )}
          </>
        )}

        {/* STICKY LUXURY HEADER */}
        {/* <header
          className={`fixed inset-x-0 top-0 z-[100] w-full text-[#FFF9EF] transition-all duration-500 ${
            isScrolled
              ? "border-b border-[#D9BE8B]/40 bg-[#30232F]/95 shadow-[0_8px_30px_rgba(20,12,20,0.22)] backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          }`}
        > */}
        {createPortal(
        <header

className={`fixed inset-x-0 top-0 z-[9999] w-full border-x-0 border-t-0 border-b text-[#FFF9EF] shadow-none transition-[background-color,border-color,backdrop-filter] duration-500 ease-in-out ${
  headerVariant === "home"
    ? isScrolled
      ? "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
      : "border-b-transparent bg-transparent backdrop-blur-none"
    : "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
}`}

  // className={`fixed inset-x-0 top-0 z-[9999] w-full border-x-0 border-t-0 border-b text-[#FFF9EF] shadow-none transition-[background-color,border-color] duration-500 ease-in-out ${
  //   isScrolled
  //     ? "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
  //     : "border-b-transparent bg-transparent backdrop-blur-none"

>
          <nav
            aria-label="Main navigation"
            className="relative mx-auto flex min-h-[88px] w-full items-center justify-between gap-3 px-4 py-4 sm:min-h-[94px] sm:px-7 lg:min-h-[108px] lg:px-10 2xl:px-14"
          >
            {/* LEFT NAVIGATION */}
            <div className="flex min-w-0 flex-1 items-center justify-start gap-4 lg:gap-5">
              {/* HOME: active only on the homepage */}
              <a
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  closeNavigation();
                  setActiveHref("/");
                  if (headerVariant !== "home") {
                    onNavigate("/");
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                aria-current={activeHref === "/" ? "page" : undefined}
                className={`group/nav relative whitespace-nowrap py-3 text-[14px] font-semibold transition-colors duration-300 ${
                  activeHref === "/"
                    ? "text-[#E9CDA0]"
                    : "text-[#FFF9EF] hover:text-[#E9CDA0]"
                }`}
              >
                Home
                <span
                  className={`absolute inset-x-0 bottom-1 h-[1.5px] origin-left bg-[#D9BE8B] transition-transform duration-300 ${
                    activeHref === "/"
                      ? "scale-x-100"
                      : "scale-x-0 group-hover/nav:scale-x-100"
                  }`}
                />
              </a>

              {heroNavigation.map((item) => {
                const isActive = item.href === activeHref;

                return (
                  <button
                    key={item.label}
                    type="button"
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => {
                      closeNavigation();
                      setActiveHref(item.href);
                      onNavigate(item.href);
                    }}
                    className={`group/nav relative flex items-center whitespace-nowrap py-3 text-[14px] font-semibold transition-colors duration-300 ${
                      isActive
                        ? "text-[#E9CDA0]"
                        : "text-[#FFF9EF] hover:text-[#E9CDA0]"
                    }`}
                  >
                    {item.label}

                    <span
                      className={`absolute inset-x-0 bottom-1 h-[1.5px] origin-left bg-[#D9BE8B] transition-transform duration-300 ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover/nav:scale-x-100"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* BRAND WORDMARK — LEAF BESIDE THE NAME */}
            <a
              href="/"
              aria-label="The Soft Edit home"
              onClick={(event) => {
                event.preventDefault();
                closeNavigation();
                setActiveHref("/");
                if (headerVariant !== "home") {
                  onNavigate("/");
                } else {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 ml-10  items-center justify-center gap-2 whitespace-nowrap transition-opacity duration-300 hover:opacity-90 sm:gap-2.5"
            >
              {/* BOTANICAL LEAF ICON */}
              {/* <Leaf
                size={23}
                strokeWidth={1.4}
                className="shrink-0 text-[#E9CDA0] transition-transform duration-500 hover:rotate-[-12deg] sm:h-[27px] sm:w-[27px]"
              /> */}

              {/* BRAND NAME */}
              <span
                className="flex items-baseline justify-center gap-1 whitespace-nowrap font-serif text-[27px] italic sm:gap-1.5 sm:text-[29px] lg:text-[34px] 2xl:text-[36px]"
                style={{
                  fontFamily: '"Canosa", Georgia, serif',
                  fontWeight: 535,
                  letterSpacing: "-0.045em",
                  textShadow: "0 2px 14px rgba(20, 12, 20, 0.45)",
                }}
              >
                <img src={logo}                 className="h-auto w-[150px] max-w-[34vw] object-contain sm:w-[205px] md:w-[245px] lg:w-[285px] xl:w-[310px]"
                style={{
                  mixBlendMode: "screen",
                  filter: "brightness(1.65) saturate(1.12)",
                  imageRendering: "auto",
                }} ></img>
                {/* <span className="text-[#FFF9EF]">The</span>
                <span className="text-[#E9CDA0]">Soft</span>
                <span className="text-[#E0E7D6]">Edit</span> */}
              </span>
            </a>

            {/* RIGHT CONTROLS: LOGIN, SEARCH, CART */}
            <div className="ml-auto flex min-w-0 items-center justify-end gap-3 sm:gap-4 lg:gap-5">
              {/* LOGIN / REGISTER */}
              <div className="flex shrink-0 items-center gap-0 whitespace-nowrap text-[15px] font-medium">
                <a
                  href="/login"
                  className="group/account relative py-2 text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0]"
                >
                  Login
                  <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-[#D9BE8B] transition-transform duration-300 group-hover/account:scale-x-100" />
                </a>

                <span className="px-1 text-[#D9BE8B]/80">/</span>

                <a
                  href="/register"
                  className="group/account relative py-2 text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0]"
                >
                  Register
                  <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-[#D9BE8B] transition-transform duration-300 group-hover/account:scale-x-100" />
                </a>
              </div>

              {/* COLLAPSIBLE SEARCH */}
              <div
                ref={searchContainerRef}
                className="relative flex shrink-0 items-center justify-end"
              >
                <form
                  role="search"
                  onSubmit={handleSearch}
                  className={`relative flex items-center transition-all duration-300 ease-in-out ${
                    searchOpen
                      ? "w-[155px] sm:w-[185px] lg:w-[205px]"
                      : "w-9"
                  }`}
                >
                  <div
                    className={`flex h-10 w-full items-center overflow-hidden rounded-full border transition-all duration-300 sm:h-11 ${
                      searchOpen
                        ? "border-[#D9BE8B] bg-[#30232F]/80 pl-3 pr-2 shadow-[0_0_0_3px_rgba(217,190,139,0.10)]"
                        : "justify-end border-transparent bg-transparent"
                    }`}
                  >
                    {searchOpen && (
                      <input
                        ref={searchRef}
                        type="search"
                        value={searchQuery}
                        onChange={(event) =>
                          setSearchQuery(event.target.value)
                        }
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => {
                          window.setTimeout(() => {
                            setSearchFocused(false);
                          }, 180);
                        }}
                        placeholder="Search products..."
                        aria-label="Search products"
                        aria-expanded={
                          searchFocused && searchResults.length > 0
                        }
                        className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-[12px] text-[#FFF9EF] outline-none ring-0 placeholder:text-[#FFF9EF]/65 focus:border-0 focus:outline-none focus:ring-0 sm:text-[13px]"
                      />
                    )}

                    {searchOpen && searchQuery && (
                      <button
                        type="button"
                        aria-label="Clear search"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => {
                          setSearchQuery("");
                          searchRef.current?.focus();
                        }}
                        className="ml-1 shrink-0 text-[#AAA39D] transition-colors hover:text-[#E9CDA0]"
                      >
                        <X size={14} />
                      </button>
                    )}

                    <button
                      type={searchOpen ? "submit" : "button"}
                      aria-label={
                        searchOpen ? "Submit product search" : "Open search"
                      }
                      onClick={() => {
                        if (!searchOpen) {
                          setSearchOpen(true);
                          window.setTimeout(() => {
                            searchRef.current?.focus();
                          }, 180);
                        }
                      }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                        searchOpen
                          ? "text-[#E9CDA0] hover:text-[#FFF9EF]"
                          : "text-[#E9CDA0] hover:bg-white/10 hover:text-[#FFF9EF]"
                      }`}
                    >
                      <Search size={19} strokeWidth={1.7} />
                    </button>
                  </div>

                  {/* SEARCH SUGGESTIONS */}
                  {searchOpen &&
                    searchFocused &&
                    searchResults.length > 0 && (
                      <div className="absolute right-0 top-full z-[110] mt-3 w-[min(320px,calc(100vw-24px))] overflow-hidden rounded-xl border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] p-2 shadow-[0_20px_55px_rgba(20,12,20,0.38)] backdrop-blur-xl">
                        <p className="px-3 pb-2 pt-3 text-[10px] tracking-[0.18em] text-[#D9BE8B]">
                          DISCOVER YOUR NEXT FAVOURITE
                        </p>

                        {searchResults.map((product) => (
                          <button
                            key={product.id}
                            type="button"
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => openProduct(product.id)}
                            className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-[13px] text-[#FFF9EF] transition-colors duration-200 hover:bg-white/[0.08] hover:text-[#E9CDA0]"
                          >
                            <span className="min-w-0 truncate">
                              {product.name}
                            </span>

                            <ArrowUpRight
                              size={15}
                              className="shrink-0 text-[#D9BE8B]"
                            />
                          </button>
                        ))}
                      </div>
                    )}

                  {searchOpen &&
                    searchFocused &&
                    searchQuery.trim().length > 0 &&
                    searchResults.length === 0 && (
                      <div className="absolute right-0 top-full z-[110] mt-3 w-[min(320px,calc(100vw-24px))] rounded-xl border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] p-5 shadow-xl backdrop-blur-xl">
                        <p className="text-[13px] leading-6 text-[#FFF9EF]">
                          We couldn't find a match. Try another product name
                          or category.
                        </p>
                      </div>
                    )}
                </form>
              </div>

              {/* CART */}
              <button
                type="button"
                onClick={onOpenBag}
                aria-label={`Open cart, ${bagCount} items`}
                title="Cart"
                className="group/cart relative flex h-10 w-9 shrink-0 items-center justify-center text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0] sm:w-10"
              >
                <ShoppingCart
                  size={22}
                  strokeWidth={1.7}
                  className="transition-transform duration-300 group-hover/cart:-translate-y-0.5"
                />

                {bagCount > 0 && (
                  <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#E9CDA0] px-1 text-[10px] font-semibold text-[#30232F]">
                    {bagCount}
                  </span>
                )}
              </button>
            </div>
          </nav>
        </header>,
        document.body,
        )}

        {/* HERO COPY */}
        {showHeroBanner && (
        <div className="hero-copy relative z-20 flex min-h-[650px] w-[55%] flex-col items-start justify-center px-4 pb-24 pt-36 text-white sm:min-h-[720px] sm:px-8 sm:pb-28 sm:pt-40 lg:min-h-[800px] lg:px-12 lg:pt-44 xl:px-16">
          <div className="hero-copy-item mb-6 flex items-center gap-3 sm:mb-7">
            <span className="hero-gold-line h-px w-9 bg-[#B99A62]" />

            <p className="text-[9px] font-medium tracking-[0.18em] text-[#E4C99B] sm:text-xs sm:tracking-[0.23em]">
              {currentSlide.eyebrow}
            </p>
          </div>

          <h1
            className="hero-copy-item hero-headline max-w-full font-serif text-3xl font-normal leading-[1.08] tracking-[-0.045em] sm:text-4xl lg:text-6xl xl:text-[76px]"
            style={{ animationDelay: "120ms" }}
          >
            {currentSlide.title.map((line, index) => (
              <span
                key={`${line}-${index}`}
                className={`hero-title-line block ${
                  index === 1
                    ? "italic text-[#DCC09A]"
                    : "text-[#FBF6EF]"
                }`}
                style={{ animationDelay: `${180 + index * 140}ms` }}
              >
                {line}
              </span>
            ))}
          </h1>

          <p
            className="hero-copy-item mt-5 max-w-[340px] text-xs leading-6 text-white/90 sm:mt-6 sm:text-sm sm:leading-7 lg:text-base"
            style={{ animationDelay: "430ms" }}
          >
            {currentSlide.description}
          </p>

          <a
            href="#shop"
            className="hero-copy-item hero-cta group/cta mb-5 mt-8 inline-flex items-center gap-8 border border-[#F7F2EA] bg-[#F7F2EA] px-6 py-4 text-[10px] font-semibold tracking-[0.16em] text-[#30232F] transition-all duration-500 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#211820] sm:mt-9 sm:px-7 sm:text-xs"
            style={{ animationDelay: "520ms" }}
          >
            <span className="text-[#30232F] transition-colors duration-500 group-hover/cta:text-[#211820]">
              {currentSlide.button}
            </span>

            <ArrowUpRight
              size={17}
              className="shrink-0 text-[#30232F] transition-all duration-500 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 group-hover/cta:text-[#211820]"
            />
          </a>

          <a
            href="#categories"
            className="hero-copy-item absolute bottom-7 left-6 flex items-center gap-3 text-[8px] tracking-[0.12em] text-white/90 transition-colors duration-300 hover:text-[#B99A62] sm:bottom-8 sm:left-12 sm:text-[9px] sm:tracking-[0.14em] lg:left-20"
            style={{ animationDelay: "650ms" }}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 transition-all duration-500 hover:border-[#B99A62] hover:bg-[#B99A62]/15">
              <ArrowDown size={15} />
            </span>

            A MOMENT FOR YOURSELF
          </a>

          {/* EXISTING SIGNATURE */}
          <div style={{ animationDelay: "700ms" }}>
            <p className="font-serif text-xl italic sm:text-2xl">
              {currentSlide.signature}
            </p>

            <p className="mt-2 text-[22px] tracking-[0.2em]">
              THE SOFT EDIT
            </p>
          </div>
        </div>
         )}
      </div>
    </section>
  );
}
// function Hero({ bagCount, onOpenBag, onNavigate, showHeroBanner = true,
//   headerVariant = "home", }: HeaderProps) {
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);
//   const [videoFinished, setVideoFinished] = useState(false);
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   const [searchQuery, setSearchQuery] = useState("");
  
//   const [searchFocused, setSearchFocused] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
// const activePathByVariant: Record<NonNullable<HeaderProps["headerVariant"]>, string> = {
//     home: "/",
//     serum: "/serum",
//     "face-creams": "/face-creams",
//     "body-creams": "/body-creams",
//     "all-products": "/all-products",
//   };
//   const searchContainerRef = useRef<HTMLDivElement>(null);
//   const searchRef = useRef<HTMLInputElement>(null);

//   const currentSlide = {
//     eyebrow: "THE ART OF EVERYDAY SKINCARE",
//     title: ["Your skin,", "your soft ritual."],
//     description:
//       "Thoughtful skincare for the moments that are just for you. Discover your next everyday essential with The Soft Edit.",
//     button: "DISCOVER THE COLLECTION",
//     signature: "A softer kind of glow",
//   };

//   const searchResults = searchQuery.trim()
//     ? products
//         .filter((product) =>
//           `${product.name} ${product.category}`
//             .toLowerCase()
//             .includes(searchQuery.trim().toLowerCase()),
//         )
//         .slice(0, 4)
//     : [];

//   // Change the navigation appearance as the page scrolls.
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 40);
//     };

//     handleScroll();

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Let the campaign video lead for six seconds, then begin the image story.
//   useEffect(() => {
//     if (!showHeroBanner || !videoFinished) return;

//     const slideshowInterval = window.setInterval(() => {
//       setActiveImageIndex((current) => (current + 1) % heroImageSlides.length);
//     }, 3200);

//     return () => window.clearInterval(slideshowInterval);
//   }, [showHeroBanner, videoFinished]);

//   useEffect(() => {
//     if (showHeroBanner) {
//       setVideoFinished(false);
//       setActiveImageIndex(0);
//     }
//   }, [showHeroBanner]);

//   useEffect(() => {
//     function handleEscape(event: KeyboardEvent) {
//       if (event.key === "Escape") {
//         setOpenDropdown(null);
//         setSearchFocused(false);
//         setSearchOpen(false);
//         setSearchQuery("");
//       }
//     }

//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       const searchContainer = searchContainerRef.current;

//       if (
//         searchOpen &&
//         searchContainer &&
//         !searchContainer.contains(event.target as Node)
//       ) {
//         setSearchOpen(false);
//         setSearchFocused(false);
//       }
//     };

//     document.addEventListener("click", handleOutsideClick, true);

//     return () => {
//       document.removeEventListener("click", handleOutsideClick, true);
//     };
//   }, [searchOpen]);

//   function closeNavigation() {
//     setOpenDropdown(null);
//     setSearchFocused(false);
//   }

//   function openProduct(productId: string | number) {
//     closeNavigation();
//     setSearchOpen(false);

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

//     setSearchFocused(false);

//     if (matchingProduct) {
//       openProduct(matchingProduct.id);
//     } else {
//       closeNavigation();
//       setSearchOpen(false);

//       document.getElementById("shop")?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   }

//   return (
//     <section id="home" className="relative w-full">
//       {/* <div
//         className="hero-frame group relative isolate min-h-[650px] w-full overflow-hidden bg-[#30232F] sm:min-h-[720px] lg:min-h-[800px]"
//         aria-label="The Soft Edit skincare campaign video"
//       > */}
//       <div
//   className={`group relative w-full ${
//     showHeroBanner
//       ? "hero-frame isolate min-h-[650px] overflow-hidden bg-[#30232F] sm:min-h-[720px] lg:min-h-[800px]"
//       : "h-0 overflow-visible"
//   }`}
//   aria-label={
//     showHeroBanner
//       ? "The Soft Edit skincare campaign video"
//       : "The Soft Edit navigation"
//   }
// >
//         {/* FULL-WIDTH HERO: VIDEO FIRST, THEN THE FULL-BLEED IMAGE STORY */}
//         {showHeroBanner && (
//           <>
//             {/* The video leads for six seconds before the image sequence takes over. */}
//             <video
//               autoPlay
//               muted
//               playsInline
//               preload="auto"
//               aria-label="The Soft Edit luxury skincare campaign"
//               onTimeUpdate={(event) => {
//                 if (event.currentTarget.currentTime >= 6) {
//                   event.currentTarget.pause();
//                   setVideoFinished(true);
//                 }
//               }}
//               onEnded={() => setVideoFinished(true)}
//               onError={() => setVideoFinished(true)}
//               className={`absolute inset-0 z-0 h-full w-full object-cover object-center transition-opacity duration-[1400ms] ease-in-out ${
//                 videoFinished ? "pointer-events-none opacity-0" : "opacity-100"
//               }`}
//             >
//               <source src="/images/promo1-.mp4" type="video/mp4" />
//               Your browser does not support video playback.
//             </video>

//             {/* Full-bleed photographs gently drift and crossfade after the video. */}
//             {heroImageSlides.map((slide, index) => (
//               <img
//                 key={`${slide.image}-${index}`}
//                 src={slide.image}
//                 alt={slide.alt}
//                 aria-hidden={!videoFinished || index !== activeImageIndex}
//                 className={`soft-edit-hero-image absolute inset-0 z-0 h-full w-full object-cover object-center transition-[opacity,transform,filter] duration-[2200ms] ease-in-out ${
//                   videoFinished && index === activeImageIndex
//                     ? "scale-100 opacity-100"
//                     : "pointer-events-none scale-[1.06] opacity-0"
//                 }`}
//                 style={{
//                   filter: "saturate(0.91) contrast(1.02)",
//                   animation:
//                     videoFinished && index === activeImageIndex
//                       ? "softEditHeroImageDrift 7s cubic-bezier(0.2, 0.65, 0.25, 1) both"
//                       : "none",
//                 }}
//               />
//             ))}

//             <style>{`
//               @keyframes softEditHeroImageDrift {
//                 0% { transform: scale(1.055) translate3d(0.8%, 0.3%, 0); }
//                 100% { transform: scale(1) translate3d(-0.4%, 0, 0); }
//               }
//               @media (prefers-reduced-motion: reduce) {
//                 .soft-edit-hero-image { animation: none !important; transition-duration: 400ms !important; }
//               }
//             `}</style>

//             {/* Restore the original cinematic overlay on the video; keep the stronger image-only shadow below. */}
//             {!videoFinished ? (
//               <>
//                 <div
//                   aria-hidden="true"
//                   className="pointer-events-none absolute inset-0 z-[1]"
//                   style={{
//                     background:
//                       "linear-gradient(90deg, rgba(28, 18, 29, 0.68) 0%, rgba(33, 22, 37, 0.54) 22%, rgba(48, 35, 47, 0.26) 46%, rgba(33, 22, 37, 0.08) 72%, rgba(33, 22, 37, 0.12) 100%)",
//                   }}
//                 />
//                 <div
//                   aria-hidden="true"
//                   className="pointer-events-none absolute inset-0 z-[1]"
//                   style={{
//                     background:
//                       "linear-gradient(0deg, rgba(33, 22, 37, 0.42) 0%, rgba(33, 22, 37, 0.08) 34%, rgba(33, 22, 37, 0.12) 100%)",
//                   }}
//                 />
//               </>
//             ) : (
//               <>
//                 {/* A cinematic plum-black shadow protects the copy on the left, while the images stay vivid on the right. */}
//                 <div
//                   aria-hidden="true"
//                   className="pointer-events-none absolute inset-0 z-[1]"
//                   style={{
//                     background:
//                       "linear-gradient(90deg, rgba(18, 12, 22, 0.88) 0%, rgba(24, 16, 28, 0.78) 18%, rgba(33, 22, 37, 0.58) 34%, rgba(33, 22, 37, 0.30) 49%, rgba(33, 22, 37, 0.08) 68%, rgba(33, 22, 37, 0.02) 100%)",
//                   }}
//                 />
//                 <div
//                   aria-hidden="true"
//                   className="pointer-events-none absolute inset-0 z-[1]"
//                   style={{
//                     background:
//                       "linear-gradient(0deg, rgba(25, 16, 28, 0.30) 0%, rgba(33, 22, 37, 0.05) 36%, rgba(33, 22, 37, 0.04) 100%)",
//                   }}
//                 />
//               </>
//             )}
//           </>
//         )}

//         {/* STICKY LUXURY HEADER */}
//         {/* <header
//           className={`fixed inset-x-0 top-0 z-[100] w-full text-[#FFF9EF] transition-all duration-500 ${
//             isScrolled
//               ? "border-b border-[#D9BE8B]/40 bg-[#30232F]/95 shadow-[0_8px_30px_rgba(20,12,20,0.22)] backdrop-blur-xl"
//               : "border-b border-transparent bg-transparent"
//           }`}
//         > */}
//         {createPortal(
//         <header

// className={`fixed inset-x-0 top-0 z-[9999] w-full border-x-0 border-t-0 border-b text-[#FFF9EF] shadow-none transition-[background-color,border-color,backdrop-filter] duration-500 ease-in-out ${
//   headerVariant === "home"
//     ? isScrolled
//       ? "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
//       : "border-b-transparent bg-transparent backdrop-blur-none"
//     : "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
// }`}

//   // className={`fixed inset-x-0 top-0 z-[9999] w-full border-x-0 border-t-0 border-b text-[#FFF9EF] shadow-none transition-[background-color,border-color] duration-500 ease-in-out ${
//   //   isScrolled
//   //     ? "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
//   //     : "border-b-transparent bg-transparent backdrop-blur-none"

// >
//           <nav
//             aria-label="Main navigation"
//             className="relative mx-auto flex min-h-[88px] w-full items-center justify-between gap-3 px-4 py-4 sm:min-h-[94px] sm:px-7 lg:min-h-[108px] lg:px-10 2xl:px-14"
//           >
//             {/* LEFT NAVIGATION */}
//             <div className="flex min-w-0 flex-1 items-center justify-start gap-4 lg:gap-5">
//               {/* HOME: active only on the homepage */}
//               <a
//                 href="/"
//                 onClick={(event) => {
//                   event.preventDefault();
//                   closeNavigation();
//                   if (headerVariant !== "home") {
//                     onNavigate("/");
//                   } else {
//                     window.scrollTo({ top: 0, behavior: "smooth" });
//                   }
//                 }}
//                 aria-current={headerVariant === "home" ? "page" : undefined}
//                 className={`group/nav relative whitespace-nowrap py-3 text-[14px] font-semibold transition-colors duration-300 ${
//                   headerVariant === "home"
//                     ? "text-[#E9CDA0]"
//                     : "text-[#FFF9EF] hover:text-[#E9CDA0]"
//                 }`}
//               >
//                 Home
//                 <span
//                   className={`absolute inset-x-0 bottom-1 h-[1.5px] origin-left bg-[#D9BE8B] transition-transform duration-300 ${
//                     headerVariant === "home"
//                       ? "scale-x-100"
//                       : "scale-x-0 group-hover/nav:scale-x-100"
//                   }`}
//                 />
//               </a>

//               {heroNavigation.map((item) => {
//                 const isOpen = openDropdown === item.label;
//                 const isActive = item.href === activePathByVariant[headerVariant];

//                 return (
//                   <div
//                     key={item.label}
//                     className="relative"
//                     onMouseEnter={() => setOpenDropdown(item.label)}
//                     onMouseLeave={() => setOpenDropdown(null)}
//                   >
//                     <button
//                       type="button"
//                       aria-expanded={isOpen}
//                       aria-haspopup="true"
//                       // onClick={() =>
//                       //   setOpenDropdown((current) =>
//                       //     current === item.label ? null : item.label,
//                       //   )
//                       // }
//                       onClick={() => {
//                         closeNavigation();
//                         onNavigate(item.href);
//                       }}
//                       onFocus={() => setOpenDropdown(item.label)}
//                       className={`group/nav relative flex items-center gap-0 whitespace-nowrap py-3 text-[14px] font-semibold transition-colors duration-300 ${
//                         isActive || isOpen
//                           ? "text-[#E9CDA0]"
//                           : "text-[#FFF9EF] hover:text-[#E9CDA0]"
//                       }`}
//                     >
//                       {item.label}

//                       <ChevronDown
//                         size={14}
//                         strokeWidth={1.6}
//                         className={`-ml-[1px] text-[#D9BE8B]/70 transition-transform duration-300 ${
//                           isOpen ? "rotate-180 text-[#E9CDA0]" : ""
//                         }`}
//                       />

//                       <span
//                         className={`absolute inset-x-0 bottom-1 h-[1.5px] origin-left bg-[#D9BE8B] transition-transform duration-300 ${
//                           isActive || isOpen
//                             ? "scale-x-100"
//                             : "scale-x-0 group-hover/nav:scale-x-100"
//                         }`}
//                       />
//                     </button>

//                     {/* DROPDOWN */}
//                     <div
//                       className={`absolute left-0 top-full w-56 pt-2 transition-all duration-200 ${
//                         isOpen
//                           ? "visible translate-y-0 opacity-100"
//                           : "invisible pointer-events-none -translate-y-1 opacity-0"
//                       }`}
//                     >
//                       <div className="border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] py-2 shadow-xl backdrop-blur-xl">
//                         {item.items.map((subItem) => (
//                           <a
//   key={subItem.label}
//   href={subItem.href}
//   onClick={(event) => {
//                               closeNavigation();
//                               if (item.label !== "See More") {
//                                 event.preventDefault();
//                                 onNavigate(item.href);
//                               }
//                             }}
//   className="block px-5 py-3 text-[13px] text-[#FFF9EF] transition-colors duration-200 hover:bg-white/10 hover:text-[#E9CDA0]"
// >
//   {subItem.label}
// </a>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* BRAND WORDMARK — LEAF BESIDE THE NAME */}
//             <a
//               href="/"
//               aria-label="The Soft Edit home"
//               onClick={(event) => {
//                 event.preventDefault();
//                 closeNavigation();
//                 if (headerVariant !== "home") {
//                   onNavigate("/");
//                 } else {
//                   window.scrollTo({ top: 0, behavior: "smooth" });
//                 }
//               }}
//               className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 ml-10  items-center justify-center gap-2 whitespace-nowrap transition-opacity duration-300 hover:opacity-90 sm:gap-2.5"
//             >
//               {/* BOTANICAL LEAF ICON */}
//               {/* <Leaf
//                 size={23}
//                 strokeWidth={1.4}
//                 className="shrink-0 text-[#E9CDA0] transition-transform duration-500 hover:rotate-[-12deg] sm:h-[27px] sm:w-[27px]"
//               /> */}

//               {/* BRAND NAME */}
//               <span
//                 className="flex items-baseline justify-center gap-1 whitespace-nowrap font-serif text-[27px] italic sm:gap-1.5 sm:text-[29px] lg:text-[34px] 2xl:text-[36px]"
//                 style={{
//                   fontFamily: '"Canosa", Georgia, serif',
//                   fontWeight: 535,
//                   letterSpacing: "-0.045em",
//                   textShadow: "0 2px 14px rgba(20, 12, 20, 0.45)",
//                 }}
//               >
//                 <img src={logo}                 className="h-auto w-[150px] max-w-[34vw] object-contain sm:w-[205px] md:w-[245px] lg:w-[285px] xl:w-[310px]"
//                 style={{
//                   mixBlendMode: "screen",
//                   filter: "brightness(1.65) saturate(1.12)",
//                   imageRendering: "auto",
//                 }} ></img>
//                 {/* <span className="text-[#FFF9EF]">The</span>
//                 <span className="text-[#E9CDA0]">Soft</span>
//                 <span className="text-[#E0E7D6]">Edit</span> */}
//               </span>
//             </a>

//             {/* RIGHT CONTROLS: LOGIN, SEARCH, CART */}
//             <div className="ml-auto flex min-w-0 items-center justify-end gap-3 sm:gap-4 lg:gap-5">
//               {/* LOGIN / REGISTER */}
//               <div className="flex shrink-0 items-center gap-0 whitespace-nowrap text-[15px] font-medium">
//                 <a
//                   href="/login"
//                   className="group/account relative py-2 text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0]"
//                 >
//                   Login
//                   <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-[#D9BE8B] transition-transform duration-300 group-hover/account:scale-x-100" />
//                 </a>

//                 <span className="px-1 text-[#D9BE8B]/80">/</span>

//                 <a
//                   href="/register"
//                   className="group/account relative py-2 text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0]"
//                 >
//                   Register
//                   <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-[#D9BE8B] transition-transform duration-300 group-hover/account:scale-x-100" />
//                 </a>
//               </div>

//               {/* COLLAPSIBLE SEARCH */}
//               <div
//                 ref={searchContainerRef}
//                 className="relative flex shrink-0 items-center justify-end"
//               >
//                 <form
//                   role="search"
//                   onSubmit={handleSearch}
//                   className={`relative flex items-center transition-all duration-300 ease-in-out ${
//                     searchOpen
//                       ? "w-[155px] sm:w-[185px] lg:w-[205px]"
//                       : "w-9"
//                   }`}
//                 >
//                   <div
//                     className={`flex h-10 w-full items-center overflow-hidden rounded-full border transition-all duration-300 sm:h-11 ${
//                       searchOpen
//                         ? "border-[#D9BE8B] bg-[#30232F]/80 pl-3 pr-2 shadow-[0_0_0_3px_rgba(217,190,139,0.10)]"
//                         : "justify-end border-transparent bg-transparent"
//                     }`}
//                   >
//                     {searchOpen && (
//                       <input
//                         ref={searchRef}
//                         type="search"
//                         value={searchQuery}
//                         onChange={(event) =>
//                           setSearchQuery(event.target.value)
//                         }
//                         onFocus={() => setSearchFocused(true)}
//                         onBlur={() => {
//                           window.setTimeout(() => {
//                             setSearchFocused(false);
//                           }, 180);
//                         }}
//                         placeholder="Search products..."
//                         aria-label="Search products"
//                         aria-expanded={
//                           searchFocused && searchResults.length > 0
//                         }
//                         className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-[12px] text-[#FFF9EF] outline-none ring-0 placeholder:text-[#FFF9EF]/65 focus:border-0 focus:outline-none focus:ring-0 sm:text-[13px]"
//                       />
//                     )}

//                     {searchOpen && searchQuery && (
//                       <button
//                         type="button"
//                         aria-label="Clear search"
//                         onMouseDown={(event) => event.preventDefault()}
//                         onClick={() => {
//                           setSearchQuery("");
//                           searchRef.current?.focus();
//                         }}
//                         className="ml-1 shrink-0 text-[#AAA39D] transition-colors hover:text-[#E9CDA0]"
//                       >
//                         <X size={14} />
//                       </button>
//                     )}

//                     <button
//                       type={searchOpen ? "submit" : "button"}
//                       aria-label={
//                         searchOpen ? "Submit product search" : "Open search"
//                       }
//                       onClick={() => {
//                         if (!searchOpen) {
//                           setSearchOpen(true);
//                           window.setTimeout(() => {
//                             searchRef.current?.focus();
//                           }, 180);
//                         }
//                       }}
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
//                         searchOpen
//                           ? "text-[#E9CDA0] hover:text-[#FFF9EF]"
//                           : "text-[#E9CDA0] hover:bg-white/10 hover:text-[#FFF9EF]"
//                       }`}
//                     >
//                       <Search size={19} strokeWidth={1.7} />
//                     </button>
//                   </div>

//                   {/* SEARCH SUGGESTIONS */}
//                   {searchOpen &&
//                     searchFocused &&
//                     searchResults.length > 0 && (
//                       <div className="absolute right-0 top-full z-[110] mt-3 w-[min(320px,calc(100vw-24px))] overflow-hidden rounded-xl border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] p-2 shadow-[0_20px_55px_rgba(20,12,20,0.38)] backdrop-blur-xl">
//                         <p className="px-3 pb-2 pt-3 text-[10px] tracking-[0.18em] text-[#D9BE8B]">
//                           DISCOVER YOUR NEXT FAVOURITE
//                         </p>

//                         {searchResults.map((product) => (
//                           <button
//                             key={product.id}
//                             type="button"
//                             onMouseDown={(event) => event.preventDefault()}
//                             onClick={() => openProduct(product.id)}
//                             className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-[13px] text-[#FFF9EF] transition-colors duration-200 hover:bg-white/[0.08] hover:text-[#E9CDA0]"
//                           >
//                             <span className="min-w-0 truncate">
//                               {product.name}
//                             </span>

//                             <ArrowUpRight
//                               size={15}
//                               className="shrink-0 text-[#D9BE8B]"
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     )}

//                   {searchOpen &&
//                     searchFocused &&
//                     searchQuery.trim().length > 0 &&
//                     searchResults.length === 0 && (
//                       <div className="absolute right-0 top-full z-[110] mt-3 w-[min(320px,calc(100vw-24px))] rounded-xl border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] p-5 shadow-xl backdrop-blur-xl">
//                         <p className="text-[13px] leading-6 text-[#FFF9EF]">
//                           We couldn't find a match. Try another product name
//                           or category.
//                         </p>
//                       </div>
//                     )}
//                 </form>
//               </div>

//               {/* CART */}
//               <button
//                 type="button"
//                 onClick={onOpenBag}
//                 aria-label={`Open cart, ${bagCount} items`}
//                 title="Cart"
//                 className="group/cart relative flex h-10 w-9 shrink-0 items-center justify-center text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0] sm:w-10"
//               >
//                 <ShoppingCart
//                   size={22}
//                   strokeWidth={1.7}
//                   className="transition-transform duration-300 group-hover/cart:-translate-y-0.5"
//                 />

//                 {bagCount > 0 && (
//                   <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#E9CDA0] px-1 text-[10px] font-semibold text-[#30232F]">
//                     {bagCount}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </nav>
//         </header>,
//         document.body,
//         )}

//         {/* HERO COPY */}
//         {showHeroBanner && (
//         <div className="hero-copy relative z-20 flex min-h-[650px] w-[55%] flex-col items-start justify-center px-4 pb-24 pt-36 text-white sm:min-h-[720px] sm:px-8 sm:pb-28 sm:pt-40 lg:min-h-[800px] lg:px-12 lg:pt-44 xl:px-16">
//           <div className="hero-copy-item mb-6 flex items-center gap-3 sm:mb-7">
//             <span className="hero-gold-line h-px w-9 bg-[#B99A62]" />

//             <p className="text-[9px] font-medium tracking-[0.18em] text-[#E4C99B] sm:text-xs sm:tracking-[0.23em]">
//               {currentSlide.eyebrow}
//             </p>
//           </div>

//           <h1
//             className="hero-copy-item hero-headline max-w-full font-serif text-3xl font-normal leading-[1.08] tracking-[-0.045em] sm:text-4xl lg:text-6xl xl:text-[76px]"
//             style={{ animationDelay: "120ms" }}
//           >
//             {currentSlide.title.map((line, index) => (
//               <span
//                 key={`${line}-${index}`}
//                 className={`hero-title-line block ${
//                   index === 1
//                     ? "italic text-[#DCC09A]"
//                     : "text-[#FBF6EF]"
//                 }`}
//                 style={{ animationDelay: `${180 + index * 140}ms` }}
//               >
//                 {line}
//               </span>
//             ))}
//           </h1>

//           <p
//             className="hero-copy-item mt-5 max-w-[340px] text-xs leading-6 text-white/90 sm:mt-6 sm:text-sm sm:leading-7 lg:text-base"
//             style={{ animationDelay: "430ms" }}
//           >
//             {currentSlide.description}
//           </p>

//           <a
//             href="#shop"
//             className="hero-copy-item hero-cta group/cta mb-5 mt-8 inline-flex items-center gap-8 border border-[#F7F2EA] bg-[#F7F2EA] px-6 py-4 text-[10px] font-semibold tracking-[0.16em] text-[#30232F] transition-all duration-500 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#211820] sm:mt-9 sm:px-7 sm:text-xs"
//             style={{ animationDelay: "520ms" }}
//           >
//             <span className="text-[#30232F] transition-colors duration-500 group-hover/cta:text-[#211820]">
//               {currentSlide.button}
//             </span>

//             <ArrowUpRight
//               size={17}
//               className="shrink-0 text-[#30232F] transition-all duration-500 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 group-hover/cta:text-[#211820]"
//             />
//           </a>

//           <a
//             href="#categories"
//             className="hero-copy-item absolute bottom-7 left-6 flex items-center gap-3 text-[8px] tracking-[0.12em] text-white/90 transition-colors duration-300 hover:text-[#B99A62] sm:bottom-8 sm:left-12 sm:text-[9px] sm:tracking-[0.14em] lg:left-20"
//             style={{ animationDelay: "650ms" }}
//           >
//             <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 transition-all duration-500 hover:border-[#B99A62] hover:bg-[#B99A62]/15">
//               <ArrowDown size={15} />
//             </span>

//             A MOMENT FOR YOURSELF
//           </a>

//           {/* EXISTING SIGNATURE */}
//           <div style={{ animationDelay: "700ms" }}>
//             <p className="font-serif text-xl italic sm:text-2xl">
//               {currentSlide.signature}
//             </p>

//             <p className="mt-2 text-[22px] tracking-[0.2em]">
//               THE SOFT EDIT
//             </p>
//           </div>
//         </div>
//          )}
//       </div>
//     </section>
//   );
// }
// type HeaderProps = {
//   bagCount: number;
//   onOpenBag: () => void;
//   onNavigate: (path: string) => void;
//   showHeroBanner?: boolean;
//   headerVariant?: "home" | "serum" | "face-creams" | "body-creams" | "all-products" ;
// };


// const heroNavigation = [
//   {
//     label: "Serum",
//     href: "/serum",
//     items: [
//       { label: "All Serums", href: "#shop" },
//       { label: "Hydrating Serums", href: "#shop" },
//       { label: "Brightening Serums", href: "#shop" },
//     ],
//   },
//   {
//     label: "Face Cream",
//     href: "/face-creams",
//     items: [
//       { label: "All Face Creams", href: "#shop" },
//       { label: "Day Creams", href: "#shop" },
//       { label: "Night Creams", href: "#shop" },
//     ],
//   },
//   {
//     label: "Body Cream",
//     href: "/body-creams",
//     items: [
//       { label: "All Body Creams", href: "#shop" },
//       { label: "Body Butters", href: "#shop" },
//       { label: "Body Lotions", href: "#shop" },
//     ],
//   },
//   {
//     label: "See More",
//     href: "/all-products",
//     items: [
//       { label: "All Products", href: "#shop" },
//       { label: "Our Story", href: "#our-story" },
//       { label: "Contact Us", href: "#footer" },
//     ],
//   },
// ];


// function Hero({ bagCount, onOpenBag, onNavigate, showHeroBanner = true,
//   headerVariant = "home", }: HeaderProps) {
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchFocused, setSearchFocused] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
// const activePathByVariant: Record<NonNullable<HeaderProps["headerVariant"]>, string> = {
//     home: "/",
//     serum: "/serum",
//     "face-creams": "/face-creams",
//     "body-creams": "/body-creams",
//     "all-products": "/all-products",
//   };
//   const searchContainerRef = useRef<HTMLDivElement>(null);
//   const searchRef = useRef<HTMLInputElement>(null);

//   const currentSlide = {
//     eyebrow: "THE ART OF EVERYDAY SKINCARE",
//     title: ["Your skin,", "your soft ritual."],
//     description:
//       "Thoughtful skincare for the moments that are just for you. Discover your next everyday essential with The Soft Edit.",
//     button: "DISCOVER THE COLLECTION",
//     signature: "A softer kind of glow",
//   };

//   const searchResults = searchQuery.trim()
//     ? products
//         .filter((product) =>
//           `${product.name} ${product.category}`
//             .toLowerCase()
//             .includes(searchQuery.trim().toLowerCase()),
//         )
//         .slice(0, 4)
//     : [];

//   // Change the navigation appearance as the page scrolls.
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 40);
//     };

//     handleScroll();

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     function handleEscape(event: KeyboardEvent) {
//       if (event.key === "Escape") {
//         setOpenDropdown(null);
//         setSearchFocused(false);
//         setSearchOpen(false);
//         setSearchQuery("");
//       }
//     }

//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       const searchContainer = searchContainerRef.current;

//       if (
//         searchOpen &&
//         searchContainer &&
//         !searchContainer.contains(event.target as Node)
//       ) {
//         setSearchOpen(false);
//         setSearchFocused(false);
//       }
//     };

//     document.addEventListener("click", handleOutsideClick, true);

//     return () => {
//       document.removeEventListener("click", handleOutsideClick, true);
//     };
//   }, [searchOpen]);

//   function closeNavigation() {
//     setOpenDropdown(null);
//     setSearchFocused(false);
//   }

//   function openProduct(productId: string | number) {
//     closeNavigation();
//     setSearchOpen(false);

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

//     setSearchFocused(false);

//     if (matchingProduct) {
//       openProduct(matchingProduct.id);
//     } else {
//       closeNavigation();
//       setSearchOpen(false);

//       document.getElementById("shop")?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   }

//   return (
//     <section id="home" className="relative w-full">
//       {/* <div
//         className="hero-frame group relative isolate min-h-[650px] w-full overflow-hidden bg-[#30232F] sm:min-h-[720px] lg:min-h-[800px]"
//         aria-label="The Soft Edit skincare campaign video"
//       > */}
//       <div
//   className={`group relative w-full ${
//     showHeroBanner
//       ? "hero-frame isolate min-h-[650px] overflow-hidden bg-[#30232F] sm:min-h-[720px] lg:min-h-[800px]"
//       : "h-0 overflow-visible"
//   }`}
//   aria-label={
//     showHeroBanner
//       ? "The Soft Edit skincare campaign video"
//       : "The Soft Edit navigation"
//   }
// >
//         {/* FULL-WIDTH HERO — VIDEO ONLY */}
//         {showHeroBanner && (
//           <>
//             <video
//               autoPlay
//               muted
//               loop
//               playsInline
//               preload="auto"
//               aria-label="The Soft Edit luxury skincare campaign"
//               className="absolute inset-0 z-0 h-full w-full object-cover object-center"
//               onError={(event) => {
//                 console.error(
//                   "Unable to load skincare video:",
//                   event.currentTarget.error,
//                 );
//               }}
//             >
//               <source src="/images/promo1-.mp4" type="video/mp4" />
//               Your browser does not support video playback.
//             </video>

//             {/* Cinematic plum overlays keep the existing hero text readable. */}
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#211625]/65 via-[#30232F]/25 to-transparent"
//             />
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#211625]/60 via-transparent to-[#211625]/25"
//             />
//           </>
//         )}

//         {/* STICKY LUXURY HEADER */}
//         {/* <header
//           className={`fixed inset-x-0 top-0 z-[100] w-full text-[#FFF9EF] transition-all duration-500 ${
//             isScrolled
//               ? "border-b border-[#D9BE8B]/40 bg-[#30232F]/95 shadow-[0_8px_30px_rgba(20,12,20,0.22)] backdrop-blur-xl"
//               : "border-b border-transparent bg-transparent"
//           }`}
//         > */}
//         {createPortal(
//         <header

// className={`fixed inset-x-0 top-0 z-[9999] w-full border-x-0 border-t-0 border-b text-[#FFF9EF] shadow-none transition-[background-color,border-color,backdrop-filter] duration-500 ease-in-out ${
//   headerVariant === "home"
//     ? isScrolled
//       ? "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
//       : "border-b-transparent bg-transparent backdrop-blur-none"
//     : "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
// }`}

//   // className={`fixed inset-x-0 top-0 z-[9999] w-full border-x-0 border-t-0 border-b text-[#FFF9EF] shadow-none transition-[background-color,border-color] duration-500 ease-in-out ${
//   //   isScrolled
//   //     ? "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
//   //     : "border-b-transparent bg-transparent backdrop-blur-none"

// >
//           <nav
//             aria-label="Main navigation"
//             className="relative mx-auto flex min-h-[88px] w-full items-center justify-between gap-3 px-4 py-4 sm:min-h-[94px] sm:px-7 lg:min-h-[108px] lg:px-10 2xl:px-14"
//           >
//             {/* LEFT NAVIGATION */}
//             <div className="flex min-w-0 flex-1 items-center justify-start gap-4 lg:gap-5">
//               {/* HOME: active only on the homepage */}
//               <a
//                 href="/"
//                 onClick={(event) => {
//                   event.preventDefault();
//                   closeNavigation();
//                   if (headerVariant !== "home") {
//                     onNavigate("/");
//                   } else {
//                     window.scrollTo({ top: 0, behavior: "smooth" });
//                   }
//                 }}
//                 aria-current={headerVariant === "home" ? "page" : undefined}
//                 className={`group/nav relative whitespace-nowrap py-3 text-[14px] font-semibold transition-colors duration-300 ${
//                   headerVariant === "home"
//                     ? "text-[#E9CDA0]"
//                     : "text-[#FFF9EF] hover:text-[#E9CDA0]"
//                 }`}
//               >
//                 Home
//                 <span
//                   className={`absolute inset-x-0 bottom-1 h-[1.5px] origin-left bg-[#D9BE8B] transition-transform duration-300 ${
//                     headerVariant === "home"
//                       ? "scale-x-100"
//                       : "scale-x-0 group-hover/nav:scale-x-100"
//                   }`}
//                 />
//               </a>

//               {heroNavigation.map((item) => {
//                 const isOpen = openDropdown === item.label;
//                 const isActive = item.href === activePathByVariant[headerVariant];

//                 return (
//                   <div
//                     key={item.label}
//                     className="relative"
//                     onMouseEnter={() => setOpenDropdown(item.label)}
//                     onMouseLeave={() => setOpenDropdown(null)}
//                   >
//                     <button
//                       type="button"
//                       aria-expanded={isOpen}
//                       aria-haspopup="true"
//                       // onClick={() =>
//                       //   setOpenDropdown((current) =>
//                       //     current === item.label ? null : item.label,
//                       //   )
//                       // }
//                       onClick={() => {
//                         closeNavigation();
//                         onNavigate(item.href);
//                       }}
//                       onFocus={() => setOpenDropdown(item.label)}
//                       className={`group/nav relative flex items-center gap-0 whitespace-nowrap py-3 text-[14px] font-semibold transition-colors duration-300 ${
//                         isActive || isOpen
//                           ? "text-[#E9CDA0]"
//                           : "text-[#FFF9EF] hover:text-[#E9CDA0]"
//                       }`}
//                     >
//                       {item.label}

//                       <ChevronDown
//                         size={14}
//                         strokeWidth={1.6}
//                         className={`-ml-[1px] text-[#D9BE8B]/70 transition-transform duration-300 ${
//                           isOpen ? "rotate-180 text-[#E9CDA0]" : ""
//                         }`}
//                       />

//                       <span
//                         className={`absolute inset-x-0 bottom-1 h-[1.5px] origin-left bg-[#D9BE8B] transition-transform duration-300 ${
//                           isActive || isOpen
//                             ? "scale-x-100"
//                             : "scale-x-0 group-hover/nav:scale-x-100"
//                         }`}
//                       />
//                     </button>

//                     {/* DROPDOWN */}
//                     <div
//                       className={`absolute left-0 top-full w-56 pt-2 transition-all duration-200 ${
//                         isOpen
//                           ? "visible translate-y-0 opacity-100"
//                           : "invisible pointer-events-none -translate-y-1 opacity-0"
//                       }`}
//                     >
//                       <div className="border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] py-2 shadow-xl backdrop-blur-xl">
//                         {item.items.map((subItem) => (
//                           <a
//   key={subItem.label}
//   href={subItem.href}
//   onClick={(event) => {
//                               closeNavigation();
//                               if (item.label !== "See More") {
//                                 event.preventDefault();
//                                 onNavigate(item.href);
//                               }
//                             }}
//   className="block px-5 py-3 text-[13px] text-[#FFF9EF] transition-colors duration-200 hover:bg-white/10 hover:text-[#E9CDA0]"
// >
//   {subItem.label}
// </a>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* BRAND WORDMARK — LEAF BESIDE THE NAME */}
//             <a
//               href="/"
//               aria-label="The Soft Edit home"
//               onClick={(event) => {
//                 event.preventDefault();
//                 closeNavigation();
//                 if (headerVariant !== "home") {
//                   onNavigate("/");
//                 } else {
//                   window.scrollTo({ top: 0, behavior: "smooth" });
//                 }
//               }}
//               className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 whitespace-nowrap transition-opacity duration-300 hover:opacity-90 sm:gap-2.5"
//             >
//               {/* BOTANICAL LEAF ICON */}
//               <Leaf
//                 size={23}
//                 strokeWidth={1.4}
//                 className="shrink-0 text-[#E9CDA0] transition-transform duration-500 hover:rotate-[-12deg] sm:h-[27px] sm:w-[27px]"
//               />

//               {/* BRAND NAME */}
//               <span
//                 className="flex items-baseline justify-center gap-1 whitespace-nowrap font-serif text-[27px] italic sm:gap-1.5 sm:text-[29px] lg:text-[34px] 2xl:text-[36px]"
//                 style={{
//                   fontFamily: '"Canosa", Georgia, serif',
//                   fontWeight: 535,
//                   letterSpacing: "-0.045em",
//                   textShadow: "0 2px 14px rgba(20, 12, 20, 0.45)",
//                 }}
//               >
//                 <span className="text-[#FFF9EF]">The</span>
//                 <span className="text-[#E9CDA0]">Soft</span>
//                 <span className="text-[#E0E7D6]">Edit</span>
//               </span>
//             </a>

//             {/* RIGHT CONTROLS: LOGIN, SEARCH, CART */}
//             <div className="ml-auto flex min-w-0 items-center justify-end gap-3 sm:gap-4 lg:gap-5">
//               {/* LOGIN / REGISTER */}
//               <div className="flex shrink-0 items-center gap-0 whitespace-nowrap text-[15px] font-medium">
//                 <a
//                   href="/login"
//                   className="group/account relative py-2 text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0]"
//                 >
//                   Login
//                   <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-[#D9BE8B] transition-transform duration-300 group-hover/account:scale-x-100" />
//                 </a>

//                 <span className="px-1 text-[#D9BE8B]/80">/</span>

//                 <a
//                   href="/register"
//                   className="group/account relative py-2 text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0]"
//                 >
//                   Register
//                   <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-[#D9BE8B] transition-transform duration-300 group-hover/account:scale-x-100" />
//                 </a>
//               </div>

//               {/* COLLAPSIBLE SEARCH */}
//               <div
//                 ref={searchContainerRef}
//                 className="relative flex shrink-0 items-center justify-end"
//               >
//                 <form
//                   role="search"
//                   onSubmit={handleSearch}
//                   className={`relative flex items-center transition-all duration-300 ease-in-out ${
//                     searchOpen
//                       ? "w-[155px] sm:w-[185px] lg:w-[205px]"
//                       : "w-9"
//                   }`}
//                 >
//                   <div
//                     className={`flex h-10 w-full items-center overflow-hidden rounded-full border transition-all duration-300 sm:h-11 ${
//                       searchOpen
//                         ? "border-[#D9BE8B] bg-[#30232F]/80 pl-3 pr-2 shadow-[0_0_0_3px_rgba(217,190,139,0.10)]"
//                         : "justify-end border-transparent bg-transparent"
//                     }`}
//                   >
//                     {searchOpen && (
//                       <input
//                         ref={searchRef}
//                         type="search"
//                         value={searchQuery}
//                         onChange={(event) =>
//                           setSearchQuery(event.target.value)
//                         }
//                         onFocus={() => setSearchFocused(true)}
//                         onBlur={() => {
//                           window.setTimeout(() => {
//                             setSearchFocused(false);
//                           }, 180);
//                         }}
//                         placeholder="Search products..."
//                         aria-label="Search products"
//                         aria-expanded={
//                           searchFocused && searchResults.length > 0
//                         }
//                         className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-[12px] text-[#FFF9EF] outline-none ring-0 placeholder:text-[#FFF9EF]/65 focus:border-0 focus:outline-none focus:ring-0 sm:text-[13px]"
//                       />
//                     )}

//                     {searchOpen && searchQuery && (
//                       <button
//                         type="button"
//                         aria-label="Clear search"
//                         onMouseDown={(event) => event.preventDefault()}
//                         onClick={() => {
//                           setSearchQuery("");
//                           searchRef.current?.focus();
//                         }}
//                         className="ml-1 shrink-0 text-[#AAA39D] transition-colors hover:text-[#E9CDA0]"
//                       >
//                         <X size={14} />
//                       </button>
//                     )}

//                     <button
//                       type={searchOpen ? "submit" : "button"}
//                       aria-label={
//                         searchOpen ? "Submit product search" : "Open search"
//                       }
//                       onClick={() => {
//                         if (!searchOpen) {
//                           setSearchOpen(true);
//                           window.setTimeout(() => {
//                             searchRef.current?.focus();
//                           }, 180);
//                         }
//                       }}
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
//                         searchOpen
//                           ? "text-[#E9CDA0] hover:text-[#FFF9EF]"
//                           : "text-[#E9CDA0] hover:bg-white/10 hover:text-[#FFF9EF]"
//                       }`}
//                     >
//                       <Search size={19} strokeWidth={1.7} />
//                     </button>
//                   </div>

//                   {/* SEARCH SUGGESTIONS */}
//                   {searchOpen &&
//                     searchFocused &&
//                     searchResults.length > 0 && (
//                       <div className="absolute right-0 top-full z-[110] mt-3 w-[min(320px,calc(100vw-24px))] overflow-hidden rounded-xl border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] p-2 shadow-[0_20px_55px_rgba(20,12,20,0.38)] backdrop-blur-xl">
//                         <p className="px-3 pb-2 pt-3 text-[10px] tracking-[0.18em] text-[#D9BE8B]">
//                           DISCOVER YOUR NEXT FAVOURITE
//                         </p>

//                         {searchResults.map((product) => (
//                           <button
//                             key={product.id}
//                             type="button"
//                             onMouseDown={(event) => event.preventDefault()}
//                             onClick={() => openProduct(product.id)}
//                             className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-[13px] text-[#FFF9EF] transition-colors duration-200 hover:bg-white/[0.08] hover:text-[#E9CDA0]"
//                           >
//                             <span className="min-w-0 truncate">
//                               {product.name}
//                             </span>

//                             <ArrowUpRight
//                               size={15}
//                               className="shrink-0 text-[#D9BE8B]"
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     )}

//                   {searchOpen &&
//                     searchFocused &&
//                     searchQuery.trim().length > 0 &&
//                     searchResults.length === 0 && (
//                       <div className="absolute right-0 top-full z-[110] mt-3 w-[min(320px,calc(100vw-24px))] rounded-xl border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] p-5 shadow-xl backdrop-blur-xl">
//                         <p className="text-[13px] leading-6 text-[#FFF9EF]">
//                           We couldn't find a match. Try another product name
//                           or category.
//                         </p>
//                       </div>
//                     )}
//                 </form>
//               </div>

//               {/* CART */}
//               <button
//                 type="button"
//                 onClick={onOpenBag}
//                 aria-label={`Open cart, ${bagCount} items`}
//                 title="Cart"
//                 className="group/cart relative flex h-10 w-9 shrink-0 items-center justify-center text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0] sm:w-10"
//               >
//                 <ShoppingCart
//                   size={22}
//                   strokeWidth={1.7}
//                   className="transition-transform duration-300 group-hover/cart:-translate-y-0.5"
//                 />

//                 {bagCount > 0 && (
//                   <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#E9CDA0] px-1 text-[10px] font-semibold text-[#30232F]">
//                     {bagCount}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </nav>
//         </header>,
//         document.body,
//         )}

//         {/* HERO COPY */}
//         {showHeroBanner && (
//         <div className="hero-copy relative z-20 flex min-h-[650px] w-[55%] flex-col items-start justify-center px-4 pb-24 pt-36 text-white sm:min-h-[720px] sm:px-8 sm:pb-28 sm:pt-40 lg:min-h-[800px] lg:px-12 lg:pt-44 xl:px-16">
//           <div className="hero-copy-item mb-6 flex items-center gap-3 sm:mb-7">
//             <span className="hero-gold-line h-px w-9 bg-[#B99A62]" />

//             <p className="text-[9px] font-medium tracking-[0.18em] text-[#E4C99B] sm:text-xs sm:tracking-[0.23em]">
//               {currentSlide.eyebrow}
//             </p>
//           </div>

//           <h1
//             className="hero-copy-item hero-headline max-w-full font-serif text-3xl font-normal leading-[1.08] tracking-[-0.045em] sm:text-4xl lg:text-6xl xl:text-[76px]"
//             style={{ animationDelay: "120ms" }}
//           >
//             {currentSlide.title.map((line, index) => (
//               <span
//                 key={`${line}-${index}`}
//                 className={`hero-title-line block ${
//                   index === 1
//                     ? "italic text-[#DCC09A]"
//                     : "text-[#FBF6EF]"
//                 }`}
//                 style={{ animationDelay: `${180 + index * 140}ms` }}
//               >
//                 {line}
//               </span>
//             ))}
//           </h1>

//           <p
//             className="hero-copy-item mt-5 max-w-[340px] text-xs leading-6 text-white/90 sm:mt-6 sm:text-sm sm:leading-7 lg:text-base"
//             style={{ animationDelay: "430ms" }}
//           >
//             {currentSlide.description}
//           </p>

//           <a
//             href="#shop"
//             className="hero-copy-item hero-cta group/cta mb-5 mt-8 inline-flex items-center gap-8 border border-[#F7F2EA] bg-[#F7F2EA] px-6 py-4 text-[10px] font-semibold tracking-[0.16em] text-[#30232F] transition-all duration-500 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#211820] sm:mt-9 sm:px-7 sm:text-xs"
//             style={{ animationDelay: "520ms" }}
//           >
//             <span className="text-[#30232F] transition-colors duration-500 group-hover/cta:text-[#211820]">
//               {currentSlide.button}
//             </span>

//             <ArrowUpRight
//               size={17}
//               className="shrink-0 text-[#30232F] transition-all duration-500 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 group-hover/cta:text-[#211820]"
//             />
//           </a>

//           <a
//             href="#categories"
//             className="hero-copy-item absolute bottom-7 left-6 flex items-center gap-3 text-[8px] tracking-[0.12em] text-white/90 transition-colors duration-300 hover:text-[#B99A62] sm:bottom-8 sm:left-12 sm:text-[9px] sm:tracking-[0.14em] lg:left-20"
//             style={{ animationDelay: "650ms" }}
//           >
//             <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 transition-all duration-500 hover:border-[#B99A62] hover:bg-[#B99A62]/15">
//               <ArrowDown size={15} />
//             </span>

//             A MOMENT FOR YOURSELF
//           </a>

//           {/* EXISTING SIGNATURE */}
//           <div style={{ animationDelay: "700ms" }}>
//             <p className="font-serif text-xl italic sm:text-2xl">
//               {currentSlide.signature}
//             </p>

//             <p className="mt-2 text-[22px] tracking-[0.2em]">
//               THE SOFT EDIT
//             </p>
//           </div>
//         </div>
//          )}
//       </div>
//     </section>
//   );
// }
// const heroImageSlides = [
//   {
//     image:
//       "../src/images/imagea.jpg",
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
//       // "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imageb.jpg",
//     alt: "Relaxing facial skincare treatment",
//     eyebrow: "YOUR MOMENT OF SELF-CARE",
//     title: ["Make room", "for your", "glow."],
//     description:
//       "Turn your everyday routine into a little luxury, with thoughtful essentials that make caring for yourself feel special.",
//     button: "FIND YOUR RITUAL",
//     signature: "A softer kind of self-care.",
//   },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imagec.jpg",
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
//       // "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imaged.jpg",
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
//       // "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imagee.jpg",
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
//       // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imagef.jpg",
//     alt: "Premium beauty products in a refined skincare setting",
//     eyebrow: "YOUR GLOW, YOUR WAY",
//     title: ["Feel good", "in your", "own skin."],
//     description:
//       "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//     button: "SHOP THE COLLECTION",
//     signature: "Always beautifully you.",
//   },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imageh.jpg",
//     alt: "Premium beauty products in a refined skincare setting",
//     eyebrow: "YOUR GLOW, YOUR WAY",
//     title: ["Feel good", "in your", "own skin."],
//     description:
//       "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//     button: "SHOP THE COLLECTION",
//     signature: "Always beautifully you.",
//   },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imageh.jpg",
//     alt: "Premium beauty products in a refined skincare setting",
//     eyebrow: "YOUR GLOW, YOUR WAY",
//     title: ["Feel good", "in your", "own skin."],
//     description:
//       "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//     button: "SHOP THE COLLECTION",
//     signature: "Always beautifully you.",
//   },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imagei.jpg",
//     alt: "Premium beauty products in a refined skincare setting",
//     eyebrow: "YOUR GLOW, YOUR WAY",
//     title: ["Feel good", "in your", "own skin."],
//     description:
//       "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//     button: "SHOP THE COLLECTION",
//     signature: "Always beautifully you.",
//   },
// ];


// type HeaderProps = {
//   bagCount: number;
//   onOpenBag: () => void;
//   onNavigate: (path: string) => void;
//   showHeroBanner?: boolean;
//   headerVariant?: "home" | "serum" | "face-creams" | "body-creams" | "all-products" ;
// };


// const heroNavigation = [
//   {
//     label: "Serum",
//     href: "/serum",
//     items: [
//       { label: "All Serums", href: "#shop" },
//       { label: "Hydrating Serums", href: "#shop" },
//       { label: "Brightening Serums", href: "#shop" },
//     ],
//   },
//   {
//     label: "Face Cream",
//     href: "/face-creams",
//     items: [
//       { label: "All Face Creams", href: "#shop" },
//       { label: "Day Creams", href: "#shop" },
//       { label: "Night Creams", href: "#shop" },
//     ],
//   },
//   {
//     label: "Body Cream",
//     href: "/body-creams",
//     items: [
//       { label: "All Body Creams", href: "#shop" },
//       { label: "Body Butters", href: "#shop" },
//       { label: "Body Lotions", href: "#shop" },
//     ],
//   },
//   {
//     label: "See More",
//     href: "/all-products",
//     items: [
//       { label: "All Products", href: "#shop" },
//       { label: "Our Story", href: "#our-story" },
//       { label: "Contact Us", href: "#footer" },
//     ],
//   },
// ];


// function Hero({ bagCount, onOpenBag, onNavigate, showHeroBanner = true,
//   headerVariant = "home", }: HeaderProps) {
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);

// const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchFocused, setSearchFocused] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
// const activePathByVariant: Record<NonNullable<HeaderProps["headerVariant"]>, string> = {
//     home: "/",
//     serum: "/serum",
//     "face-creams": "/face-creams",
//     "body-creams": "/body-creams",
//     "all-products": "/all-products",
//   };
//   const searchContainerRef = useRef<HTMLDivElement>(null);
//   const searchRef = useRef<HTMLInputElement>(null);

//   const currentSlide = {
//     eyebrow: "THE ART OF EVERYDAY SKINCARE",
//     title: ["Your skin,", "your soft ritual."],
//     description:
//       "Thoughtful skincare for the moments that are just for you. Discover your next everyday essential with The Soft Edit.",
//     button: "DISCOVER THE COLLECTION",
//     signature: "A softer kind of glow",
//   };

//   const searchResults = searchQuery.trim()
//     ? products
//         .filter((product) =>
//           `${product.name} ${product.category}`
//             .toLowerCase()
//             .includes(searchQuery.trim().toLowerCase()),
//         )
//         .slice(0, 4)
//     : [];

//   // Change the navigation appearance as the page scrolls.
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 40);
//     };

//     handleScroll();

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

// useEffect(() => {
//   if (!showHeroBanner) return;

//   const slideshowInterval = window.setInterval(() => {
//     setActiveImageIndex((current) => (current + 1) % heroImageSlides.length);
//   }, 5000);

//   return () => window.clearInterval(slideshowInterval);
// }, [showHeroBanner]);


//   useEffect(() => {
//     function handleEscape(event: KeyboardEvent) {
//       if (event.key === "Escape") {
//         setOpenDropdown(null);
//         setSearchFocused(false);
//         setSearchOpen(false);
//         setSearchQuery("");
//       }
//     }

//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       const searchContainer = searchContainerRef.current;

//       if (
//         searchOpen &&
//         searchContainer &&
//         !searchContainer.contains(event.target as Node)
//       ) {
//         setSearchOpen(false);
//         setSearchFocused(false);
//       }
//     };

//     document.addEventListener("click", handleOutsideClick, true);

//     return () => {
//       document.removeEventListener("click", handleOutsideClick, true);
//     };
//   }, [searchOpen]);

//   function closeNavigation() {
//     setOpenDropdown(null);
//     setSearchFocused(false);
//   }

//   function openProduct(productId: string | number) {
//     closeNavigation();
//     setSearchOpen(false);

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

//     setSearchFocused(false);

//     if (matchingProduct) {
//       openProduct(matchingProduct.id);
//     } else {
//       closeNavigation();
//       setSearchOpen(false);

//       document.getElementById("shop")?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   }

//   return (
//     <section id="home" className="relative w-full">
//       {/* <div
//         className="hero-frame group relative isolate min-h-[650px] w-full overflow-hidden bg-[#30232F] sm:min-h-[720px] lg:min-h-[800px]"
//         aria-label="The Soft Edit skincare campaign video"
//       > */}
//       <div
//   className={`group relative w-full ${
//     showHeroBanner
//       ? "hero-frame isolate min-h-[650px] overflow-hidden bg-[#30232F] sm:min-h-[720px] lg:min-h-[800px]"
//       : "h-0 overflow-visible"
//   }`}
//   aria-label={
//     showHeroBanner
//       ? "The Soft Edit skincare campaign video"
//       : "The Soft Edit navigation"
//   }
// >
//         {/* Subtle champagne seam between the video and CEO gallery */}
//         {showHeroBanner && (
//           <div
//             aria-hidden="true"
//             className="pointer-events-none absolute inset-y-0 left-[55%] z-[6] w-px bg-gradient-to-b from-transparent via-[#D9BE8B]/55 to-transparent"
//           />
//         )}

//         {/* LUXURY SPLIT HERO: VIDEO LEFT, CEO GALLERY RIGHT */}
//         {showHeroBanner && (
//           <>
//             {/* LEFT PANEL — continuous, muted campaign video */}
//             <div className="absolute inset-y-0 left-0 z-0 w-[55%] overflow-hidden bg-[#211625]">
//               <video
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//                 preload="auto"
//                 aria-label="The Soft Edit luxury skincare campaign"
//                 className="absolute inset-0 h-full w-full object-cover object-center"
//                 onError={(event) => {
//                   console.error(
//                     "Unable to load skincare video:",
//                     event.currentTarget.error,
//                   );
//                 }}
//               >
//                 <source src="/images/promo1-.mp4" type="video/mp4" />
//                 Your browser does not support video playback.
//               </video>
//               <div
//                 aria-hidden="true"
//                 className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#211625]/60 via-[#30232F]/25 to-[#30232F]/10"
//               />
//               <div
//                 aria-hidden="true"
//                 className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#211625]/60 via-transparent to-[#211625]/30"
//               />
//             </div>

//             {/* RIGHT PANEL — independent CEO and product image crossfade */}
//             <div className="absolute inset-y-0 right-0 z-0 w-[45%] overflow-hidden bg-[#30232F]">
//               {heroImageSlides.map((slide, index) => (
//                 <img
//                   key={`${slide.image}-${index}`}
//                   src={slide.image}
//                   alt={slide.alt}
//                   aria-hidden={index !== activeImageIndex}
//                   className={`absolute inset-0 h-full w-full object-cover object-center transition-[opacity,transform] duration-[1400ms] ease-in-out ${
//                     index === activeImageIndex
//                       ? "scale-100 opacity-100"
//                       : "pointer-events-none scale-[1.035] opacity-0"
//                   }`}
//                   style={{ willChange: "opacity, transform" }}
//                 />
//               ))}
//               <div
//                 aria-hidden="true"
//                 className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[28%] bg-gradient-to-r from-[#30232F]/55 to-transparent"
//               />
//               <div
//                 aria-hidden="true"
//                 className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-1/3 bg-gradient-to-t from-[#211625]/45 to-transparent"
//               />
//               <div
//                 aria-hidden="true"
//                 className="pointer-events-none absolute inset-4 z-[3] border border-[#D9BE8B]/35 sm:inset-6 lg:inset-8"
//               />
//               <div className="absolute bottom-10 right-10 z-[4] hidden items-center gap-3 text-[#FFF9EF] sm:flex">
//                 <span className="h-px w-8 bg-[#D9BE8B]" />
//                 <span className="text-[10px] tracking-[0.22em]">
//                   {String(activeImageIndex + 1).padStart(2, "0")}
//                   <span className="mx-2 text-[#D9BE8B]/70">/</span>
//                   {String(heroImageSlides.length).padStart(2, "0")}
//                 </span>
//               </div>
//             </div>
//           </>
//         )}

//         {/* STICKY LUXURY HEADER */}
//         {/* <header
//           className={`fixed inset-x-0 top-0 z-[100] w-full text-[#FFF9EF] transition-all duration-500 ${
//             isScrolled
//               ? "border-b border-[#D9BE8B]/40 bg-[#30232F]/95 shadow-[0_8px_30px_rgba(20,12,20,0.22)] backdrop-blur-xl"
//               : "border-b border-transparent bg-transparent"
//           }`}
//         > */}
//         {createPortal(
//         <header

// className={`fixed inset-x-0 top-0 z-[9999] w-full border-x-0 border-t-0 border-b text-[#FFF9EF] shadow-none transition-[background-color,border-color,backdrop-filter] duration-500 ease-in-out ${
//   headerVariant === "home"
//     ? isScrolled
//       ? "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
//       : "border-b-transparent bg-transparent backdrop-blur-none"
//     : "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
// }`}

//   // className={`fixed inset-x-0 top-0 z-[9999] w-full border-x-0 border-t-0 border-b text-[#FFF9EF] shadow-none transition-[background-color,border-color] duration-500 ease-in-out ${
//   //   isScrolled
//   //     ? "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
//   //     : "border-b-transparent bg-transparent backdrop-blur-none"

// >
//           <nav
//             aria-label="Main navigation"
//             className="relative mx-auto flex min-h-[88px] w-full items-center justify-between gap-3 px-4 py-4 sm:min-h-[94px] sm:px-7 lg:min-h-[108px] lg:px-10 2xl:px-14"
//           >
//             {/* LEFT NAVIGATION */}
//             <div className="flex min-w-0 flex-1 items-center justify-start gap-4 lg:gap-5">
//               {/* HOME: active only on the homepage */}
//               <a
//                 href="/"
//                 onClick={(event) => {
//                   event.preventDefault();
//                   closeNavigation();
//                   if (headerVariant !== "home") {
//                     onNavigate("/");
//                   } else {
//                     window.scrollTo({ top: 0, behavior: "smooth" });
//                   }
//                 }}
//                 aria-current={headerVariant === "home" ? "page" : undefined}
//                 className={`group/nav relative whitespace-nowrap py-3 text-[14px] font-semibold transition-colors duration-300 ${
//                   headerVariant === "home"
//                     ? "text-[#E9CDA0]"
//                     : "text-[#FFF9EF] hover:text-[#E9CDA0]"
//                 }`}
//               >
//                 Home
//                 <span
//                   className={`absolute inset-x-0 bottom-1 h-[1.5px] origin-left bg-[#D9BE8B] transition-transform duration-300 ${
//                     headerVariant === "home"
//                       ? "scale-x-100"
//                       : "scale-x-0 group-hover/nav:scale-x-100"
//                   }`}
//                 />
//               </a>

//               {heroNavigation.map((item) => {
//                 const isOpen = openDropdown === item.label;
//                 const isActive = item.href === activePathByVariant[headerVariant];

//                 return (
//                   <div
//                     key={item.label}
//                     className="relative"
//                     onMouseEnter={() => setOpenDropdown(item.label)}
//                     onMouseLeave={() => setOpenDropdown(null)}
//                   >
//                     <button
//                       type="button"
//                       aria-expanded={isOpen}
//                       aria-haspopup="true"
//                       // onClick={() =>
//                       //   setOpenDropdown((current) =>
//                       //     current === item.label ? null : item.label,
//                       //   )
//                       // }
//                       onClick={() => {
//                         closeNavigation();
//                         onNavigate(item.href);
//                       }}
//                       onFocus={() => setOpenDropdown(item.label)}
//                       className={`group/nav relative flex items-center gap-0 whitespace-nowrap py-3 text-[14px] font-semibold transition-colors duration-300 ${
//                         isActive || isOpen
//                           ? "text-[#E9CDA0]"
//                           : "text-[#FFF9EF] hover:text-[#E9CDA0]"
//                       }`}
//                     >
//                       {item.label}

//                       <ChevronDown
//                         size={14}
//                         strokeWidth={1.6}
//                         className={`-ml-[1px] text-[#D9BE8B]/70 transition-transform duration-300 ${
//                           isOpen ? "rotate-180 text-[#E9CDA0]" : ""
//                         }`}
//                       />

//                       <span
//                         className={`absolute inset-x-0 bottom-1 h-[1.5px] origin-left bg-[#D9BE8B] transition-transform duration-300 ${
//                           isActive || isOpen
//                             ? "scale-x-100"
//                             : "scale-x-0 group-hover/nav:scale-x-100"
//                         }`}
//                       />
//                     </button>

//                     {/* DROPDOWN */}
//                     <div
//                       className={`absolute left-0 top-full w-56 pt-2 transition-all duration-200 ${
//                         isOpen
//                           ? "visible translate-y-0 opacity-100"
//                           : "invisible pointer-events-none -translate-y-1 opacity-0"
//                       }`}
//                     >
//                       <div className="border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] py-2 shadow-xl backdrop-blur-xl">
//                         {item.items.map((subItem) => (
//                           <a
//   key={subItem.label}
//   href={subItem.href}
//   onClick={(event) => {
//                               closeNavigation();
//                               if (item.label !== "See More") {
//                                 event.preventDefault();
//                                 onNavigate(item.href);
//                               }
//                             }}
//   className="block px-5 py-3 text-[13px] text-[#FFF9EF] transition-colors duration-200 hover:bg-white/10 hover:text-[#E9CDA0]"
// >
//   {subItem.label}
// </a>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* BRAND WORDMARK — LEAF BESIDE THE NAME */}
//             <a
//               href="/"
//               aria-label="The Soft Edit home"
//               onClick={(event) => {
//                 event.preventDefault();
//                 closeNavigation();
//                 if (headerVariant !== "home") {
//                   onNavigate("/");
//                 } else {
//                   window.scrollTo({ top: 0, behavior: "smooth" });
//                 }
//               }}
//               className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 whitespace-nowrap transition-opacity duration-300 hover:opacity-90 sm:gap-2.5"
//             >
//               {/* BOTANICAL LEAF ICON */}
//               <Leaf
//                 size={23}
//                 strokeWidth={1.4}
//                 className="shrink-0 text-[#E9CDA0] transition-transform duration-500 hover:rotate-[-12deg] sm:h-[27px] sm:w-[27px]"
//               />

//               {/* BRAND NAME */}
//               <span
//                 className="flex items-baseline justify-center gap-1 whitespace-nowrap font-serif text-[27px] italic sm:gap-1.5 sm:text-[29px] lg:text-[34px] 2xl:text-[36px]"
//                 style={{
//                   fontFamily: '"Canosa", Georgia, serif',
//                   fontWeight: 535,
//                   letterSpacing: "-0.045em",
//                   textShadow: "0 2px 14px rgba(20, 12, 20, 0.45)",
//                 }}
//               >
//                 <span className="text-[#FFF9EF]">The</span>
//                 <span className="text-[#E9CDA0]">Soft</span>
//                 <span className="text-[#E0E7D6]">Edit</span>
//               </span>
//             </a>

//             {/* RIGHT CONTROLS: LOGIN, SEARCH, CART */}
//             <div className="ml-auto flex min-w-0 items-center justify-end gap-3 sm:gap-4 lg:gap-5">
//               {/* LOGIN / REGISTER */}
//               <div className="flex shrink-0 items-center gap-0 whitespace-nowrap text-[15px] font-medium">
//                 <a
//                   href="/login"
//                   className="group/account relative py-2 text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0]"
//                 >
//                   Login
//                   <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-[#D9BE8B] transition-transform duration-300 group-hover/account:scale-x-100" />
//                 </a>

//                 <span className="px-1 text-[#D9BE8B]/80">/</span>

//                 <a
//                   href="/register"
//                   className="group/account relative py-2 text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0]"
//                 >
//                   Register
//                   <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-[#D9BE8B] transition-transform duration-300 group-hover/account:scale-x-100" />
//                 </a>
//               </div>

//               {/* COLLAPSIBLE SEARCH */}
//               <div
//                 ref={searchContainerRef}
//                 className="relative flex shrink-0 items-center justify-end"
//               >
//                 <form
//                   role="search"
//                   onSubmit={handleSearch}
//                   className={`relative flex items-center transition-all duration-300 ease-in-out ${
//                     searchOpen
//                       ? "w-[155px] sm:w-[185px] lg:w-[205px]"
//                       : "w-9"
//                   }`}
//                 >
//                   <div
//                     className={`flex h-10 w-full items-center overflow-hidden rounded-full border transition-all duration-300 sm:h-11 ${
//                       searchOpen
//                         ? "border-[#D9BE8B] bg-[#30232F]/80 pl-3 pr-2 shadow-[0_0_0_3px_rgba(217,190,139,0.10)]"
//                         : "justify-end border-transparent bg-transparent"
//                     }`}
//                   >
//                     {searchOpen && (
//                       <input
//                         ref={searchRef}
//                         type="search"
//                         value={searchQuery}
//                         onChange={(event) =>
//                           setSearchQuery(event.target.value)
//                         }
//                         onFocus={() => setSearchFocused(true)}
//                         onBlur={() => {
//                           window.setTimeout(() => {
//                             setSearchFocused(false);
//                           }, 180);
//                         }}
//                         placeholder="Search products..."
//                         aria-label="Search products"
//                         aria-expanded={
//                           searchFocused && searchResults.length > 0
//                         }
//                         className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-[12px] text-[#FFF9EF] outline-none ring-0 placeholder:text-[#FFF9EF]/65 focus:border-0 focus:outline-none focus:ring-0 sm:text-[13px]"
//                       />
//                     )}

//                     {searchOpen && searchQuery && (
//                       <button
//                         type="button"
//                         aria-label="Clear search"
//                         onMouseDown={(event) => event.preventDefault()}
//                         onClick={() => {
//                           setSearchQuery("");
//                           searchRef.current?.focus();
//                         }}
//                         className="ml-1 shrink-0 text-[#AAA39D] transition-colors hover:text-[#E9CDA0]"
//                       >
//                         <X size={14} />
//                       </button>
//                     )}

//                     <button
//                       type={searchOpen ? "submit" : "button"}
//                       aria-label={
//                         searchOpen ? "Submit product search" : "Open search"
//                       }
//                       onClick={() => {
//                         if (!searchOpen) {
//                           setSearchOpen(true);
//                           window.setTimeout(() => {
//                             searchRef.current?.focus();
//                           }, 180);
//                         }
//                       }}
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
//                         searchOpen
//                           ? "text-[#E9CDA0] hover:text-[#FFF9EF]"
//                           : "text-[#E9CDA0] hover:bg-white/10 hover:text-[#FFF9EF]"
//                       }`}
//                     >
//                       <Search size={19} strokeWidth={1.7} />
//                     </button>
//                   </div>

//                   {/* SEARCH SUGGESTIONS */}
//                   {searchOpen &&
//                     searchFocused &&
//                     searchResults.length > 0 && (
//                       <div className="absolute right-0 top-full z-[110] mt-3 w-[min(320px,calc(100vw-24px))] overflow-hidden rounded-xl border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] p-2 shadow-[0_20px_55px_rgba(20,12,20,0.38)] backdrop-blur-xl">
//                         <p className="px-3 pb-2 pt-3 text-[10px] tracking-[0.18em] text-[#D9BE8B]">
//                           DISCOVER YOUR NEXT FAVOURITE
//                         </p>

//                         {searchResults.map((product) => (
//                           <button
//                             key={product.id}
//                             type="button"
//                             onMouseDown={(event) => event.preventDefault()}
//                             onClick={() => openProduct(product.id)}
//                             className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-[13px] text-[#FFF9EF] transition-colors duration-200 hover:bg-white/[0.08] hover:text-[#E9CDA0]"
//                           >
//                             <span className="min-w-0 truncate">
//                               {product.name}
//                             </span>

//                             <ArrowUpRight
//                               size={15}
//                               className="shrink-0 text-[#D9BE8B]"
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     )}

//                   {searchOpen &&
//                     searchFocused &&
//                     searchQuery.trim().length > 0 &&
//                     searchResults.length === 0 && (
//                       <div className="absolute right-0 top-full z-[110] mt-3 w-[min(320px,calc(100vw-24px))] rounded-xl border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] p-5 shadow-xl backdrop-blur-xl">
//                         <p className="text-[13px] leading-6 text-[#FFF9EF]">
//                           We couldn't find a match. Try another product name
//                           or category.
//                         </p>
//                       </div>
//                     )}
//                 </form>
//               </div>

//               {/* CART */}
//               <button
//                 type="button"
//                 onClick={onOpenBag}
//                 aria-label={`Open cart, ${bagCount} items`}
//                 title="Cart"
//                 className="group/cart relative flex h-10 w-9 shrink-0 items-center justify-center text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0] sm:w-10"
//               >
//                 <ShoppingCart
//                   size={22}
//                   strokeWidth={1.7}
//                   className="transition-transform duration-300 group-hover/cart:-translate-y-0.5"
//                 />

//                 {bagCount > 0 && (
//                   <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#E9CDA0] px-1 text-[10px] font-semibold text-[#30232F]">
//                     {bagCount}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </nav>
//         </header>,
//         document.body,
//         )}

//         {/* HERO COPY */}
//         {showHeroBanner && (
//         <div className="hero-copy relative z-20 flex min-h-[650px] w-[55%] flex-col items-start justify-center px-4 pb-24 pt-36 text-white sm:min-h-[720px] sm:px-8 sm:pb-28 sm:pt-40 lg:min-h-[800px] lg:px-12 lg:pt-44 xl:px-16">
//           <div className="hero-copy-item mb-6 flex items-center gap-3 sm:mb-7">
//             <span className="hero-gold-line h-px w-9 bg-[#B99A62]" />

//             <p className="text-[9px] font-medium tracking-[0.18em] text-[#E4C99B] sm:text-xs sm:tracking-[0.23em]">
//               {currentSlide.eyebrow}
//             </p>
//           </div>

//           <h1
//             className="hero-copy-item hero-headline max-w-full font-serif text-3xl font-normal leading-[1.08] tracking-[-0.045em] sm:text-4xl lg:text-6xl xl:text-[76px]"
//             style={{ animationDelay: "120ms" }}
//           >
//             {currentSlide.title.map((line, index) => (
//               <span
//                 key={`${line}-${index}`}
//                 className={`hero-title-line block ${
//                   index === 1
//                     ? "italic text-[#DCC09A]"
//                     : "text-[#FBF6EF]"
//                 }`}
//                 style={{ animationDelay: `${180 + index * 140}ms` }}
//               >
//                 {line}
//               </span>
//             ))}
//           </h1>

//           <p
//             className="hero-copy-item mt-5 max-w-[340px] text-xs leading-6 text-white/90 sm:mt-6 sm:text-sm sm:leading-7 lg:text-base"
//             style={{ animationDelay: "430ms" }}
//           >
//             {currentSlide.description}
//           </p>

//           <a
//             href="#shop"
//             className="hero-copy-item hero-cta group/cta mb-5 mt-8 inline-flex items-center gap-8 border border-[#F7F2EA] bg-[#F7F2EA] px-6 py-4 text-[10px] font-semibold tracking-[0.16em] text-[#30232F] transition-all duration-500 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#211820] sm:mt-9 sm:px-7 sm:text-xs"
//             style={{ animationDelay: "520ms" }}
//           >
//             <span className="text-[#30232F] transition-colors duration-500 group-hover/cta:text-[#211820]">
//               {currentSlide.button}
//             </span>

//             <ArrowUpRight
//               size={17}
//               className="shrink-0 text-[#30232F] transition-all duration-500 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 group-hover/cta:text-[#211820]"
//             />
//           </a>

//           <a
//             href="#categories"
//             className="hero-copy-item absolute bottom-7 left-6 flex items-center gap-3 text-[8px] tracking-[0.12em] text-white/90 transition-colors duration-300 hover:text-[#B99A62] sm:bottom-8 sm:left-12 sm:text-[9px] sm:tracking-[0.14em] lg:left-20"
//             style={{ animationDelay: "650ms" }}
//           >
//             <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 transition-all duration-500 hover:border-[#B99A62] hover:bg-[#B99A62]/15">
//               <ArrowDown size={15} />
//             </span>

//             A MOMENT FOR YOURSELF
//           </a>

//           {/* EXISTING SIGNATURE */}
//           <div style={{ animationDelay: "700ms" }}>
//             <p className="font-serif text-xl italic sm:text-2xl">
//               {currentSlide.signature}
//             </p>

//             <p className="mt-2 text-[22px] tracking-[0.2em]">
//               THE SOFT EDIT
//             </p>
//           </div>
//         </div>
//          )}
//       </div>
//     </section>
//   );
// }


// const heroImageSlides = [
//   {
//     image:
//       "../src/images/imagea.jpg",
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
//       // "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imageb.jpg",
//     alt: "Relaxing facial skincare treatment",
//     eyebrow: "YOUR MOMENT OF SELF-CARE",
//     title: ["Make room", "for your", "glow."],
//     description:
//       "Turn your everyday routine into a little luxury, with thoughtful essentials that make caring for yourself feel special.",
//     button: "FIND YOUR RITUAL",
//     signature: "A softer kind of self-care.",
//   },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imagec.jpg",
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
//       // "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imaged.jpg",
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
//       // "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imagee.jpg",
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
//       // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imagef.jpg",
//     alt: "Premium beauty products in a refined skincare setting",
//     eyebrow: "YOUR GLOW, YOUR WAY",
//     title: ["Feel good", "in your", "own skin."],
//     description:
//       "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//     button: "SHOP THE COLLECTION",
//     signature: "Always beautifully you.",
//   },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imageh.jpg",
//     alt: "Premium beauty products in a refined skincare setting",
//     eyebrow: "YOUR GLOW, YOUR WAY",
//     title: ["Feel good", "in your", "own skin."],
//     description:
//       "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//     button: "SHOP THE COLLECTION",
//     signature: "Always beautifully you.",
//   },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imageh.jpg",
//     alt: "Premium beauty products in a refined skincare setting",
//     eyebrow: "YOUR GLOW, YOUR WAY",
//     title: ["Feel good", "in your", "own skin."],
//     description:
//       "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//     button: "SHOP THE COLLECTION",
//     signature: "Always beautifully you.",
//   },
//   {
//     image:
//       // "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=2200&q=90",
//         "../src/images/imagei.jpg",
//     alt: "Premium beauty products in a refined skincare setting",
//     eyebrow: "YOUR GLOW, YOUR WAY",
//     title: ["Feel good", "in your", "own skin."],
//     description:
//       "Celebrate the skin you're in with a thoughtful edit of beauty essentials made for your moments, your pace, and your glow.",
//     button: "SHOP THE COLLECTION",
//     signature: "Always beautifully you.",
//   },
// ];


// type HeaderProps = {
//   bagCount: number;
//   onOpenBag: () => void;
//   onNavigate: (path: string) => void;
//   showHeroBanner?: boolean;
//   headerVariant?: "home" | "serum" | "face-creams" | "body-creams" | "all-products" ;
// };


// const heroNavigation = [
//   {
//     label: "Serum",
//     href: "/serum",
//     items: [
//       { label: "All Serums", href: "#shop" },
//       { label: "Hydrating Serums", href: "#shop" },
//       { label: "Brightening Serums", href: "#shop" },
//     ],
//   },
//   {
//     label: "Face Cream",
//     href: "/face-creams",
//     items: [
//       { label: "All Face Creams", href: "#shop" },
//       { label: "Day Creams", href: "#shop" },
//       { label: "Night Creams", href: "#shop" },
//     ],
//   },
//   {
//     label: "Body Cream",
//     href: "/body-creams",
//     items: [
//       { label: "All Body Creams", href: "#shop" },
//       { label: "Body Butters", href: "#shop" },
//       { label: "Body Lotions", href: "#shop" },
//     ],
//   },
//   {
//     label: "See More",
//     href: "/all-products",
//     items: [
//       { label: "All Products", href: "#shop" },
//       { label: "Our Story", href: "#our-story" },
//       { label: "Contact Us", href: "#footer" },
//     ],
//   },
// ];


// function Hero({ bagCount, onOpenBag, onNavigate, showHeroBanner = true,
//   headerVariant = "home", }: HeaderProps) {
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);

// const [videoFinished, setVideoFinished] = useState(false);
// const [activeImageIndex, setActiveImageIndex] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchFocused, setSearchFocused] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
// const isCollectionPage =
//   headerVariant === "serum" || headerVariant === "face-creams";
//   const searchContainerRef = useRef<HTMLDivElement>(null);
//   const searchRef = useRef<HTMLInputElement>(null);

//   const currentSlide = {
//     eyebrow: "THE ART OF EVERYDAY SKINCARE",
//     title: ["Your skin,", "your soft ritual."],
//     description:
//       "Thoughtful skincare for the moments that are just for you. Discover your next everyday essential with The Soft Edit.",
//     button: "DISCOVER THE COLLECTION",
//     signature: "A softer kind of glow",
//   };

//   const searchResults = searchQuery.trim()
//     ? products
//         .filter((product) =>
//           `${product.name} ${product.category}`
//             .toLowerCase()
//             .includes(searchQuery.trim().toLowerCase()),
//         )
//         .slice(0, 4)
//     : [];

//   // Change the navigation appearance as the page scrolls.
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 40);
//     };

//     handleScroll();

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

// useEffect(() => {
//   if (!showHeroBanner || !videoFinished) return;

//   const slideshowInterval = window.setInterval(() => {
//     setActiveImageIndex((current) => {
//       return (current + 1) % heroImageSlides.length;
//     });
//   }, 3000);

//   return () => {
//     window.clearInterval(slideshowInterval);
//   };
// }, [showHeroBanner, videoFinished]);


//   useEffect(() => {
//     function handleEscape(event: KeyboardEvent) {
//       if (event.key === "Escape") {
//         setOpenDropdown(null);
//         setSearchFocused(false);
//         setSearchOpen(false);
//         setSearchQuery("");
//       }
//     }

//     document.addEventListener("keydown", handleEscape);

//     return () => {
//       document.removeEventListener("keydown", handleEscape);
//     };
//   }, []);

//   useEffect(() => {
//     const handleOutsideClick = (event: MouseEvent) => {
//       const searchContainer = searchContainerRef.current;

//       if (
//         searchOpen &&
//         searchContainer &&
//         !searchContainer.contains(event.target as Node)
//       ) {
//         setSearchOpen(false);
//         setSearchFocused(false);
//       }
//     };

//     document.addEventListener("click", handleOutsideClick, true);

//     return () => {
//       document.removeEventListener("click", handleOutsideClick, true);
//     };
//   }, [searchOpen]);

//   function closeNavigation() {
//     setOpenDropdown(null);
//     setSearchFocused(false);
//   }

//   function openProduct(productId: string | number) {
//     closeNavigation();
//     setSearchOpen(false);

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

//     setSearchFocused(false);

//     if (matchingProduct) {
//       openProduct(matchingProduct.id);
//     } else {
//       closeNavigation();
//       setSearchOpen(false);

//       document.getElementById("shop")?.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   }

//   return (
//     <section id="home" className="relative w-full">
//       {/* <div
//         className="hero-frame group relative isolate min-h-[650px] w-full overflow-hidden bg-[#30232F] sm:min-h-[720px] lg:min-h-[800px]"
//         aria-label="The Soft Edit skincare campaign video"
//       > */}
//       <div
//   className={`group relative w-full ${
//     showHeroBanner
//       ? "hero-frame isolate min-h-[650px] overflow-hidden bg-[#30232F] sm:min-h-[720px] lg:min-h-[800px]"
//       : "h-0 overflow-visible"
//   }`}
//   aria-label={
//     showHeroBanner
//       ? "The Soft Edit skincare campaign video"
//       : "The Soft Edit navigation"
//   }
// >
//         {/* VIDEO OVERLAYS */}

//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 z-[5]"
//           style={{
//             background:
//               "linear-gradient(90deg, rgba(25, 17, 25, 0.48) 0%, rgba(35, 24, 34, 0.30) 8%, rgba(48, 35, 47, 0.12) 15%, transparent 28%)",
//           }}
//         />

//         <div
//           aria-hidden="true"
//           className="hero-slide-overlay pointer-events-none absolute inset-0 z-[6] bg-gradient-to-r from-[#30232F]/55 via-[#30232F]/20 to-transparent"
//         />

//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute inset-0 z-[7] bg-gradient-to-t from-[#30232F]/40 via-transparent to-[#30232F]/20"
//         />

//         {/* SINGLE LOOPING LUXURY SKINCARE VIDEO */}
//         {/* <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="auto"
//           aria-label="The Soft Edit luxury skincare promotional video"
//           className="absolute inset-0 z-0 h-full w-full object-cover object-center"
//           onError={(event) => {
//             console.error(
//               "Unable to load skincare video:",
//               event.currentTarget.error,
//             );
//           }}
//         >
//           <source src="/images/promo1-.mp4" type="video/mp4" />
//           Your browser does not support video playback.
//         </video> */}
        
// {showHeroBanner && (
//   <>
//     {/* VIDEO PLAYS FIRST */}
//     {!videoFinished && (
//       <video
//         autoPlay
//         muted
//         playsInline
//         preload="auto"
//         aria-label="The Soft Edit luxury skincare promotional video"
//         className="absolute inset-0 z-0 h-full w-full object-cover object-center"
//         onEnded={() => setVideoFinished(true)}
//         onError={() => setVideoFinished(true)}
//       >
//         <source src="/images/promo1-.mp4" type="video/mp4" />
//         Your browser does not support video playback.
//       </video>
//     )}

//     {/* NINE-IMAGE SLIDESHOW */}
//     {videoFinished &&
//       heroImageSlides.map((slide, index) => (
//         <img
//           key={slide.image}
//           src={slide.image}
//           alt={slide.alt}
//           aria-hidden={index !== activeImageIndex}
//           className={`absolute inset-0 z-0 h-full w-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
//             index === activeImageIndex
//               ? "opacity-100"
//               : "pointer-events-none opacity-0"
//           }`}
//         />
//       ))}
//   </>
// )}


//         {/* STICKY LUXURY HEADER */}
//         {/* <header
//           className={`fixed inset-x-0 top-0 z-[100] w-full text-[#FFF9EF] transition-all duration-500 ${
//             isScrolled
//               ? "border-b border-[#D9BE8B]/40 bg-[#30232F]/95 shadow-[0_8px_30px_rgba(20,12,20,0.22)] backdrop-blur-xl"
//               : "border-b border-transparent bg-transparent"
//           }`}
//         > */}
//         {createPortal(
//         <header

// className={`fixed inset-x-0 top-0 z-[9999] w-full border-x-0 border-t-0 border-b text-[#FFF9EF] shadow-none transition-[background-color,border-color,backdrop-filter] duration-500 ease-in-out ${
//   headerVariant === "home"
//     ? isScrolled
//       ? "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
//       : "border-b-transparent bg-transparent backdrop-blur-none"
//     : "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
// }`}

//   // className={`fixed inset-x-0 top-0 z-[9999] w-full border-x-0 border-t-0 border-b text-[#FFF9EF] shadow-none transition-[background-color,border-color] duration-500 ease-in-out ${
//   //   isScrolled
//   //     ? "border-b-[#D9BE8B]/40 bg-[#30232F]/[0.97] backdrop-blur-xl"
//   //     : "border-b-transparent bg-transparent backdrop-blur-none"

// >
//           <nav
//             aria-label="Main navigation"
//             className="relative mx-auto flex min-h-[88px] w-full items-center justify-between gap-3 px-4 py-4 sm:min-h-[94px] sm:px-7 lg:min-h-[108px] lg:px-10 2xl:px-14"
//           >
//             {/* LEFT NAVIGATION */}
//             <div className="flex min-w-0 flex-1 items-center justify-start gap-4 lg:gap-5">
//               {/* HOME */}
//               <a
//                 href="#home"
//                 onClick={closeNavigation}
//                 aria-current="page"
//                 className="group/nav relative whitespace-nowrap py-3 text-[14px] font-semibold text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0]"
//               >
//                 Home
//                 <span className="absolute inset-x-0 bottom-1 h-[1.5px] origin-left scale-x-100 bg-[#D9BE8B] transition-transform duration-300" />
//               </a>

//               {heroNavigation.map((item) => {
//                 const isOpen = openDropdown === item.label;

//                 return (
//                   <div
//                     key={item.label}
//                     className="relative"
//                     onMouseEnter={() => setOpenDropdown(item.label)}
//                     onMouseLeave={() => setOpenDropdown(null)}
//                   >
//                     <button
//                       type="button"
//                       aria-expanded={isOpen}
//                       aria-haspopup="true"
//                       // onClick={() =>
//                       //   setOpenDropdown((current) =>
//                       //     current === item.label ? null : item.label,
//                       //   )
//                       // }
//                       onClick={() => {
//   // if (item.label === "Serum") {
//   //   closeNavigation();
//   //   onNavigate("/serum");
//   //   return;
//   // }
//   if (item.label === "Serum") {
//   closeNavigation();
//   onNavigate("/serum");
//   return;
// }

// if (
//   item.label === "Face Cream" ||
//   item.label === "Face Creams"
// ) {
//   closeNavigation();
//   onNavigate("/face-creams");
//   return;
// }
// if (
//   item.label === "See-more" ||
//   item.label === "shop"
// ) {
//   closeNavigation();
//   onNavigate("/all-products");
//   return;
// }

// if (
//     item.label === "Body Cream" ||
//     item.label === "Body Creams"
//   ) {
//     closeNavigation();
//     onNavigate("/body-creams");
//     return;
//   }


//   setOpenDropdown((current) =>
//     current === item.label ? null : item.label,
//   );
// }}
//                       onFocus={() => setOpenDropdown(item.label)}
//                       className={`group/nav relative flex items-center gap-0 whitespace-nowrap py-3 text-[14px] font-semibold transition-colors duration-300 ${
//                         isOpen
//                           ? "text-[#E9CDA0]"
//                           : "text-[#FFF9EF] hover:text-[#E9CDA0]"
//                       }`}
//                     >
//                       {item.label}

//                       <ChevronDown
//                         size={14}
//                         strokeWidth={1.6}
//                         className={`-ml-[1px] text-[#D9BE8B]/70 transition-transform duration-300 ${
//                           isOpen ? "rotate-180 text-[#E9CDA0]" : ""
//                         }`}
//                       />

//                       <span
//                         className={`absolute inset-x-0 bottom-1 h-[1.5px] origin-left bg-[#D9BE8B] transition-transform duration-300 ${
//                           isOpen
//                             ? "scale-x-100"
//                             : "scale-x-0 group-hover/nav:scale-x-100"
//                         }`}
//                       />
//                     </button>

//                     {/* DROPDOWN */}
//                     <div
//                       className={`absolute left-0 top-full w-56 pt-2 transition-all duration-200 ${
//                         isOpen
//                           ? "visible translate-y-0 opacity-100"
//                           : "invisible pointer-events-none -translate-y-1 opacity-0"
//                       }`}
//                     >
//                       <div className="border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] py-2 shadow-xl backdrop-blur-xl">
//                         {item.items.map((subItem) => (
//                           <a
//   key={subItem.label}
//   href={subItem.href}
//   onClick={(event) => {
//     closeNavigation();

//     if (item.label === "Serum") {
//       event.preventDefault();
//       onNavigate("/serum");
//     }
//   }}
//   className="block px-5 py-3 text-[13px] text-[#FFF9EF] transition-colors duration-200 hover:bg-white/10 hover:text-[#E9CDA0]"
// >
//   {subItem.label}
// </a>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* BRAND WORDMARK — LEAF BESIDE THE NAME */}
//             <a
//               href="#home"
//               aria-label="The Soft Edit home"
//               onClick={closeNavigation}
//               className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 whitespace-nowrap transition-opacity duration-300 hover:opacity-90 sm:gap-2.5"
//             >
//               {/* BOTANICAL LEAF ICON */}
//               <Leaf
//                 size={23}
//                 strokeWidth={1.4}
//                 className="shrink-0 text-[#E9CDA0] transition-transform duration-500 hover:rotate-[-12deg] sm:h-[27px] sm:w-[27px]"
//               />

//               {/* BRAND NAME */}
//               <span
//                 className="flex items-baseline justify-center gap-1 whitespace-nowrap font-serif text-[27px] italic sm:gap-1.5 sm:text-[29px] lg:text-[34px] 2xl:text-[36px]"
//                 style={{
//                   fontFamily: '"Canosa", Georgia, serif',
//                   fontWeight: 535,
//                   letterSpacing: "-0.045em",
//                   textShadow: "0 2px 14px rgba(20, 12, 20, 0.45)",
//                 }}
//               >
//                 <span className="text-[#FFF9EF]">The</span>
//                 <span className="text-[#E9CDA0]">Soft</span>
//                 <span className="text-[#E0E7D6]">Edit</span>
//               </span>
//             </a>

//             {/* RIGHT CONTROLS: LOGIN, SEARCH, CART */}
//             <div className="ml-auto flex min-w-0 items-center justify-end gap-3 sm:gap-4 lg:gap-5">
//               {/* LOGIN / REGISTER */}
//               <div className="flex shrink-0 items-center gap-0 whitespace-nowrap text-[15px] font-medium">
//                 <a
//                   href="/login"
//                   className="group/account relative py-2 text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0]"
//                 >
//                   Login
//                   <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-[#D9BE8B] transition-transform duration-300 group-hover/account:scale-x-100" />
//                 </a>

//                 <span className="px-1 text-[#D9BE8B]/80">/</span>

//                 <a
//                   href="/register"
//                   className="group/account relative py-2 text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0]"
//                 >
//                   Register
//                   <span className="absolute inset-x-0 bottom-0 h-[1.5px] origin-left scale-x-0 bg-[#D9BE8B] transition-transform duration-300 group-hover/account:scale-x-100" />
//                 </a>
//               </div>

//               {/* COLLAPSIBLE SEARCH */}
//               <div
//                 ref={searchContainerRef}
//                 className="relative flex shrink-0 items-center justify-end"
//               >
//                 <form
//                   role="search"
//                   onSubmit={handleSearch}
//                   className={`relative flex items-center transition-all duration-300 ease-in-out ${
//                     searchOpen
//                       ? "w-[155px] sm:w-[185px] lg:w-[205px]"
//                       : "w-9"
//                   }`}
//                 >
//                   <div
//                     className={`flex h-10 w-full items-center overflow-hidden rounded-full border transition-all duration-300 sm:h-11 ${
//                       searchOpen
//                         ? "border-[#D9BE8B] bg-[#30232F]/80 pl-3 pr-2 shadow-[0_0_0_3px_rgba(217,190,139,0.10)]"
//                         : "justify-end border-transparent bg-transparent"
//                     }`}
//                   >
//                     {searchOpen && (
//                       <input
//                         ref={searchRef}
//                         type="search"
//                         value={searchQuery}
//                         onChange={(event) =>
//                           setSearchQuery(event.target.value)
//                         }
//                         onFocus={() => setSearchFocused(true)}
//                         onBlur={() => {
//                           window.setTimeout(() => {
//                             setSearchFocused(false);
//                           }, 180);
//                         }}
//                         placeholder="Search products..."
//                         aria-label="Search products"
//                         aria-expanded={
//                           searchFocused && searchResults.length > 0
//                         }
//                         className="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-[12px] text-[#FFF9EF] outline-none ring-0 placeholder:text-[#FFF9EF]/65 focus:border-0 focus:outline-none focus:ring-0 sm:text-[13px]"
//                       />
//                     )}

//                     {searchOpen && searchQuery && (
//                       <button
//                         type="button"
//                         aria-label="Clear search"
//                         onMouseDown={(event) => event.preventDefault()}
//                         onClick={() => {
//                           setSearchQuery("");
//                           searchRef.current?.focus();
//                         }}
//                         className="ml-1 shrink-0 text-[#AAA39D] transition-colors hover:text-[#E9CDA0]"
//                       >
//                         <X size={14} />
//                       </button>
//                     )}

//                     <button
//                       type={searchOpen ? "submit" : "button"}
//                       aria-label={
//                         searchOpen ? "Submit product search" : "Open search"
//                       }
//                       onClick={() => {
//                         if (!searchOpen) {
//                           setSearchOpen(true);
//                           window.setTimeout(() => {
//                             searchRef.current?.focus();
//                           }, 180);
//                         }
//                       }}
//                       className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
//                         searchOpen
//                           ? "text-[#E9CDA0] hover:text-[#FFF9EF]"
//                           : "text-[#E9CDA0] hover:bg-white/10 hover:text-[#FFF9EF]"
//                       }`}
//                     >
//                       <Search size={19} strokeWidth={1.7} />
//                     </button>
//                   </div>

//                   {/* SEARCH SUGGESTIONS */}
//                   {searchOpen &&
//                     searchFocused &&
//                     searchResults.length > 0 && (
//                       <div className="absolute right-0 top-full z-[110] mt-3 w-[min(320px,calc(100vw-24px))] overflow-hidden rounded-xl border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] p-2 shadow-[0_20px_55px_rgba(20,12,20,0.38)] backdrop-blur-xl">
//                         <p className="px-3 pb-2 pt-3 text-[10px] tracking-[0.18em] text-[#D9BE8B]">
//                           DISCOVER YOUR NEXT FAVOURITE
//                         </p>

//                         {searchResults.map((product) => (
//                           <button
//                             key={product.id}
//                             type="button"
//                             onMouseDown={(event) => event.preventDefault()}
//                             onClick={() => openProduct(product.id)}
//                             className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-3 text-left text-[13px] text-[#FFF9EF] transition-colors duration-200 hover:bg-white/[0.08] hover:text-[#E9CDA0]"
//                           >
//                             <span className="min-w-0 truncate">
//                               {product.name}
//                             </span>

//                             <ArrowUpRight
//                               size={15}
//                               className="shrink-0 text-[#D9BE8B]"
//                             />
//                           </button>
//                         ))}
//                       </div>
//                     )}

//                   {searchOpen &&
//                     searchFocused &&
//                     searchQuery.trim().length > 0 &&
//                     searchResults.length === 0 && (
//                       <div className="absolute right-0 top-full z-[110] mt-3 w-[min(320px,calc(100vw-24px))] rounded-xl border border-[#D9BE8B]/40 bg-[#30232F]/[0.98] p-5 shadow-xl backdrop-blur-xl">
//                         <p className="text-[13px] leading-6 text-[#FFF9EF]">
//                           We couldn't find a match. Try another product name
//                           or category.
//                         </p>
//                       </div>
//                     )}
//                 </form>
//               </div>

//               {/* CART */}
//               <button
//                 type="button"
//                 onClick={onOpenBag}
//                 aria-label={`Open cart, ${bagCount} items`}
//                 title="Cart"
//                 className="group/cart relative flex h-10 w-9 shrink-0 items-center justify-center text-[#FFF9EF] transition-colors duration-300 hover:text-[#E9CDA0] sm:w-10"
//               >
//                 <ShoppingCart
//                   size={22}
//                   strokeWidth={1.7}
//                   className="transition-transform duration-300 group-hover/cart:-translate-y-0.5"
//                 />

//                 {bagCount > 0 && (
//                   <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#E9CDA0] px-1 text-[10px] font-semibold text-[#30232F]">
//                     {bagCount}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </nav>
//         </header>,
//         document.body,
//         )}

//         {/* HERO COPY */}
//         {showHeroBanner && (
//         <div className="hero-copy relative z-20 flex min-h-[650px] max-w-[900px] flex-col items-start justify-center px-6 pb-24 pt-40 text-white sm:min-h-[720px] sm:px-12 sm:pb-28 sm:pt-44 lg:min-h-[800px] lg:px-20">
//           <div className="hero-copy-item mb-6 flex items-center gap-3 sm:mb-7">
//             <span className="hero-gold-line h-px w-9 bg-[#B99A62]" />

//             <p className="text-[9px] font-medium tracking-[0.18em] text-[#E4C99B] sm:text-xs sm:tracking-[0.23em]">
//               {currentSlide.eyebrow}
//             </p>
//           </div>

//           <h1
//             className="hero-copy-item hero-headline max-w-[700px] font-serif text-5xl font-normal leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-[86px]"
//             style={{ animationDelay: "120ms" }}
//           >
//             {currentSlide.title.map((line, index) => (
//               <span
//                 key={`${line}-${index}`}
//                 className={`hero-title-line block ${
//                   index === 1
//                     ? "italic text-[#DCC09A]"
//                     : "text-[#FBF6EF]"
//                 }`}
//                 style={{ animationDelay: `${180 + index * 140}ms` }}
//               >
//                 {line}
//               </span>
//             ))}
//           </h1>

//           <p
//             className="hero-copy-item mt-5 max-w-[390px] text-sm leading-7 text-white/90 sm:mt-6 sm:text-base"
//             style={{ animationDelay: "430ms" }}
//           >
//             {currentSlide.description}
//           </p>

//           <a
//             href="#shop"
//             className="hero-copy-item hero-cta group/cta mb-5 mt-8 inline-flex items-center gap-8 border border-[#F7F2EA] bg-[#F7F2EA] px-6 py-4 text-[10px] font-semibold tracking-[0.16em] text-[#30232F] transition-all duration-500 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#211820] sm:mt-9 sm:px-7 sm:text-xs"
//             style={{ animationDelay: "520ms" }}
//           >
//             <span className="text-[#30232F] transition-colors duration-500 group-hover/cta:text-[#211820]">
//               {currentSlide.button}
//             </span>

//             <ArrowUpRight
//               size={17}
//               className="shrink-0 text-[#30232F] transition-all duration-500 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 group-hover/cta:text-[#211820]"
//             />
//           </a>

//           <a
//             href="#categories"
//             className="hero-copy-item absolute bottom-7 left-6 flex items-center gap-3 text-[8px] tracking-[0.12em] text-white/90 transition-colors duration-300 hover:text-[#B99A62] sm:bottom-8 sm:left-12 sm:text-[9px] sm:tracking-[0.14em] lg:left-20"
//             style={{ animationDelay: "650ms" }}
//           >
//             <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50 transition-all duration-500 hover:border-[#B99A62] hover:bg-[#B99A62]/15">
//               <ArrowDown size={15} />
//             </span>

//             A MOMENT FOR YOURSELF
//           </a>

//           {/* EXISTING SIGNATURE */}
//           <div style={{ animationDelay: "700ms" }}>
//             <p className="font-serif text-2xl italic">
//               {currentSlide.signature}
//             </p>

//             <p className="mt-2 text-[22px] tracking-[0.2em]">
//               THE SOFT EDIT
//             </p>
//           </div>
//         </div>
//          )}
//       </div>
//     </section>
//   );
// }



function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Animate IN when entering the viewport.
        // Animate OUT when leaving it.
        // This works while scrolling both up and down.
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -25px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const hiddenTransform = {
    up: "translate3d(0, 38px, 0)",
    left: "translate3d(-38px, 0, 0)",
    right: "translate3d(38px, 0, 0)",
    none: "scale(0.97)",
  }[direction];

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translate3d(0, 0, 0) scale(1)"
          : hiddenTransform,
        transition: `opacity 850ms ease ${visible ? delay : 0}ms, transform 1000ms cubic-bezier(0.2, 0.7, 0.2, 1) ${visible ? delay : 0}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}




function EditorialLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.24em] text-[#7D8768] sm:text-[10px]">
      <span className="h-px w-8 bg-[#B99A62]" />
      {children}
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <EditorialLabel>{eyebrow}</EditorialLabel>
      <h2 className="mt-6 font-serif text-4xl font-normal leading-[1.08] tracking-[-0.045em] text-[#4B165C] sm:text-5xl md:text-6xl">
        {title}
      </h2>
      <p className="mt-5 max-w-lg text-sm leading-7 text-[#7A685E] sm:text-base sm:leading-8">
        {description}
      </p>
    </div>
  );
}

/* 01 — THE BRAND PROMISES */

function BrandPromises() {
  const items = [
    {
      icon: Flower2,
      title: "Beauty with intention",
      detail: "Thoughtful choices, always.",
    },
    {
      icon: ShieldCheck,
      title: "Carefully considered",
      detail: "A more personal approach.",
    },
    {
      icon: Truck,
      title: "A lovely delivery",
      detail: "From our edit to your door.",
    },
    {
      icon: Heart,
      title: "Made to feel good",
      detail: "Little rituals, more joy.",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-[#E6D9CA] bg-[#FBF7F0]">
      <div className="mx-auto grid max-w-[1600px] grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = item.icon;

          return (
            <Reveal
              key={item.title}
              delay={index * 100}
              className={`group relative px-5 py-9 sm:px-8 sm:py-11 lg:px-10 ${
                index % 2 === 0 ? "border-r border-[#E6D9CA]" : ""
              } ${index < 2 ? "border-b border-[#E6D9CA] lg:border-b-0" : ""} ${
                index !== 3 ? "lg:border-r lg:border-[#E6D9CA]" : ""
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#B99A62]/40 text-[#4B165C] transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-[-8deg] group-hover:border-[#4B165C] group-hover:bg-[#4B165C] group-hover:text-[#F7F2EA] sm:h-12 sm:w-12">
                  <Icon size={20} strokeWidth={1.3} />
                </div>

                <div>
                  <p className="font-serif text-lg leading-tight text-[#4B165C] sm:text-xl">
                    {item.title}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[#89766A] sm:text-sm">
                    {item.detail}
                  </p>
                </div>
              </div>

              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#B99A62] transition-all duration-700 group-hover:w-full" />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* 02 — EDITORIAL CATEGORY EXPERIENCE */

function Categories() {
  return (
    <section
      id="categories"
      className="scroll-mt-36 overflow-hidden bg-[#F7F2EA] px-5 py-20 sm:px-10 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.65fr] lg:items-end">
          <Reveal>
            <SectionIntro
              eyebrow="A MORE PERSONAL KIND OF BEAUTY"
              title={
                <>
                  Your ritual.
                  <br />
                  <em className="font-normal text-[#9A8061]">Your own rules.</em>
                </>
              }
              description="Discover the little things that make looking after yourself feel less like a routine and more like a moment you can call your own."
            />
          </Reveal>

          <Reveal direction="right" delay={160} className="lg:justify-self-end">
            <a
              href="#shop"
              className="group inline-flex items-center gap-4 border-b border-[#B99A62] pb-3 text-[10px] font-semibold tracking-[0.17em] text-[#4B165C] transition-colors hover:text-[#7D8768]"
            >
              DISCOVER THE COLLECTION
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-5 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal
              key={category.name}
              delay={index * 110}
              className={index % 2 === 1 ? "lg:translate-y-8" : ""}
            >
              <a href="#shop" className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#E8DCD1]">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.09]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#30232F]/75 via-[#30232F]/5 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />

                  <span className="absolute left-4 top-4 font-serif text-sm italic text-white/90 sm:left-6 sm:top-6">
                    0{index + 1}
                  </span>

                  <div className="absolute inset-x-4 bottom-5 text-white sm:inset-x-6 sm:bottom-7">
                    <p className="mb-2 text-[8px] uppercase tracking-[0.2em] text-[#E7CE9B] sm:text-[9px]">
                      THE SOFT EDIT
                    </p>

                    <h3 className="font-serif text-2xl leading-tight sm:text-3xl">
                      {category.name}
                    </h3>

                    <p className="mt-2 max-w-[220px] text-[10px] leading-5 text-white/80 sm:text-xs">
                      {category.description}
                    </p>

                    <span className="mt-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 transition-all duration-500 group-hover:translate-x-1 group-hover:border-[#B99A62] group-hover:bg-[#B99A62] group-hover:text-[#30232F]">
                      <ArrowUpRight size={17} />
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-16 flex items-center justify-center gap-4 text-center sm:mt-24">
            <span className="h-px w-10 bg-[#B99A62]/70" />
            <p className="font-serif text-base italic text-[#7D8768] sm:text-lg">
              A little care goes a long way.
            </p>
            <span className="h-px w-10 bg-[#B99A62]/70" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 03 — THE PRODUCT EDIT */

type ProductGridProps = {
  onAddToBag: (product: Product) => void;
  saved: number[];
  onToggleSaved: (id: number) => void;
};

function ProductGrid({
  onAddToBag,
  saved,
  onToggleSaved,
}: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filters = ["All", "Brightening", "Hydration", "Cleansing", "Nourishing"];

  const filteredProducts = products.filter((product) => {
    if (activeCategory === "All") return true;
    return product.category
      .toLowerCase()
      .includes(activeCategory.toLowerCase());
  });

  return (
    <section
      id="shop"
      className="scroll-mt-36 relative overflow-hidden bg-[#EFE6DC] px-5 py-20 sm:px-10 sm:py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full border border-[#B99A62]/20" />
      <div className="pointer-events-none absolute -right-28 top-22 h-72 w-72 rounded-full border border-[#B99A62]/20" />

      <div className="relative mx-auto max-w-[1500px]">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <SectionIntro
              eyebrow="CONSIDER THIS YOUR BEAUTY SHELF"
              title={
                <>
                  The art of
                  <br />
                  <em className="text-[#9A8061]">the everyday.</em>
                </>
              }
              description="A thoughtful edit of everyday favourites, chosen to bring a little more pleasure to your beauty ritual."
            />
          </Reveal>

          <Reveal direction="right" delay={180}>
            <div className="flex max-w-full flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveCategory(filter)}
                  aria-pressed={activeCategory === filter}
                  className={`rounded-full border px-4 py-2.5 text-[10px] transition-all duration-300 sm:text-xs ${
                    activeCategory === filter
                      ? "border-[#4B165C] bg-[#4B165C] text-[#F7F2EA] shadow-md"
                      : "border-[#CDBBAA] bg-[#F7F2EA]/60 text-[#6D594D] hover:border-[#4B165C] hover:text-[#4B165C]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-10 sm:mt-16 sm:gap-x-5 sm:gap-y-14 lg:grid-cols-4">
          {filteredProducts.map((product, index) => {
            const isSaved = saved.includes(product.id);

            return (
              <Reveal key={product.id} delay={index * 100}>
                <article
                  id={`product-${product.id}`}
                  className="group min-w-0 scroll-mt-40"
                >
                  <div
                    className="relative aspect-[4/5] overflow-hidden"
                    style={{ backgroundColor: product.color }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.08]"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#30232F]/15 via-transparent to-white/10 opacity-60" />

                    <span className="absolute left-2 top-2 bg-[#F7F2EA]/95 px-2.5 py-2 text-[7px] font-medium tracking-[0.12em] text-[#4B165C] sm:left-4 sm:top-4 sm:px-3 sm:text-[9px]">
                      {product.tag}
                    </span>

                    <button
                      type="button"
                      onClick={() => onToggleSaved(product.id)}
                      aria-label={
                        isSaved
                          ? `Remove ${product.name} from wishlist`
                          : `Add ${product.name} to wishlist`
                      }
                      aria-pressed={isSaved}
                      className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F2EA]/95 text-[#4B165C] shadow-sm transition-all duration-300 hover:scale-110 hover:bg-white sm:right-4 sm:top-4 sm:h-10 sm:w-10"
                    >
                      <Heart
                        size={17}
                        strokeWidth={1.5}
                        fill={isSaved ? BRAND.purple : "none"}
                        className={isSaved ? "scale-110" : "transition-transform duration-300"}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => onAddToBag(product)}
                      className="absolute inset-x-2 bottom-2 flex translate-y-2 items-center justify-center gap-2 bg-[#F7F2EA] px-2 py-3 text-[9px] font-semibold tracking-[0.1em] text-[#4B165C] opacity-100 shadow-sm transition-all duration-500 hover:bg-[#4B165C] hover:text-white sm:inset-x-4 sm:bottom-4 sm:translate-y-3 sm:py-4 sm:text-[10px] sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100"
                    >
                      ADD TO BAG
                      <Plus size={15} />
                    </button>
                  </div>

                  <div className="pt-4 sm:pt-5">
                    <p className="text-[8px] tracking-[0.12em] text-[#89766A] sm:text-[9px]">
                      {product.category}
                    </p>

                    <h3 className="mt-2 font-serif text-lg leading-snug text-[#4B165C] transition-colors duration-300 group-hover:text-[#896B48] sm:text-xl lg:text-2xl">
                      {product.name}
                    </h3>

                    <div className="mt-3 flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-[#5A4037]">
                        {formatPrice(product.price)}
                      </p>

                      <span className="hidden items-center gap-1 text-[8px] tracking-[0.1em] text-[#7D8768] sm:flex">
                        <Sparkles size={12} />
                        THE EDIT
                      </span>
                    </div>

                    <div className="mt-4 h-px w-full bg-[#D8C8B7]">
                      <div className="h-px w-0 bg-[#4B165C] transition-all duration-700 group-hover:w-full" />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <p className="py-12 text-center font-serif text-xl text-[#4B165C]">
            More lovely things are on their way.
          </p>
        )}

        <Reveal delay={180}>
          <div className="mt-16 text-center sm:mt-20">
            <a
              href="#categories"
              className="group inline-flex items-center gap-5 border border-[#4B165C] px-7 py-4 text-[10px] font-semibold tracking-[0.14em] text-[#4B165C] transition-all duration-500 hover:bg-[#4B165C] hover:text-[#F7F2EA] sm:px-9"
            >
              FIND YOUR NEXT FAVOURITE
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 04 — EDITORIAL BRAND STORY */

function BrandStory() {
  return (
    <section
      id="our-story"
      className="scroll-mt-36 overflow-hidden bg-[#FBF7F0] px-5 py-20 sm:px-10 sm:py-28 lg:py-36"
    >
      <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        <Reveal direction="left">
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="relative overflow-hidden bg-[#E6D9CA]">
              <img
                src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1400&q=90"
                alt="A carefully composed collection of skincare essentials"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-1000 hover:scale-[1.035]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#30232F]/30 via-transparent to-white/10" />

              <div className="absolute left-5 top-5 flex h-20 w-20 flex-col items-center justify-center rounded-full border border-white/60 bg-[#F7F2EA]/15 text-white backdrop-blur-sm sm:left-8 sm:top-8 sm:h-24 sm:w-24">
                <Sparkles size={18} strokeWidth={1.2} />
                <span className="mt-2 text-[7px] tracking-[0.17em] sm:text-[8px]">
                  LESS, BUT BETTER
                </span>
              </div>
            </div>

            <div className="absolute -bottom-7 right-0 max-w-[230px] border border-[#D9C5A4] bg-[#F7F2EA] px-5 py-5 shadow-[0_15px_40px_rgba(75,22,92,0.08)] sm:-right-5 sm:max-w-[290px] sm:px-7 sm:py-7">
              <p className="font-serif text-xl italic leading-snug text-[#4B165C] sm:text-2xl">
                Beauty should feel like a kindness.
              </p>
              <span className="mt-4 block h-px w-10 bg-[#B99A62]" />
            </div>
          </div>
        </Reveal>

        <Reveal direction="right" delay={180}>
          <div className="pt-8 lg:pt-0">
            <EditorialLabel>A NOTE FROM THE SOFT SIDE</EditorialLabel>

            <h2 className="mt-7 font-serif text-4xl leading-[1.08] tracking-[-0.045em] text-[#4B165C] sm:text-5xl lg:text-6xl">
              A little less noise.
              <br />
              <em className="text-[#9A8061]">A lot more you.</em>
            </h2>

            <p className="mt-7 text-sm leading-8 text-[#7A685E] sm:text-base">
              We believe looking after yourself should feel like a small act
              of love, not another thing on an endless to-do list.
            </p>

            <p className="mt-5 text-sm leading-8 text-[#7A685E] sm:text-base">
              The Soft Edit is a more considered approach to beauty.
              Thoughtful choices, everyday essentials and little rituals
              that give you permission to slow down and enjoy the moment.
            </p>

            <div className="mt-9 grid grid-cols-2 gap-5 border-y border-[#E6D9CA] py-6">
              <div>
                <p className="font-serif text-2xl text-[#4B165C] sm:text-3xl">
                  Thoughtful
                </p>
                <p className="mt-2 text-[9px] tracking-[0.13em] text-[#7D8768]">
                  IN EVERY DETAIL
                </p>
              </div>

              <div>
                <p className="font-serif text-2xl text-[#4B165C] sm:text-3xl">
                  Personal
                </p>
                <p className="mt-2 text-[9px] tracking-[0.13em] text-[#7D8768]">
                  ALWAYS ABOUT YOU
                </p>
              </div>
            </div>

            <a
              href="#newsletter"
              className="group mt-9 inline-flex items-center gap-4 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C]"
            >
              COME A LITTLE CLOSER
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B99A62] transition-all duration-500 group-hover:rotate-45 group-hover:bg-[#4B165C] group-hover:text-white">
                <ArrowUpRight size={17} />
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


function RitualInterlude() {
  return (
    <section className="relative isolate overflow-hidden bg-[#4B165C]">
      {/* LUXURIOUS FULL-SECTION IMAGE */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-[12000ms] ease-out hover:scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=2200&q=90')",
        }}
      />

      {/* PURPLE OVERLAY: KEEPS THE BRAND IDENTITY AND TEXT LEGIBLE */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2D1038]/95 via-[#4B165C]/80 to-[#4B165C]/45"
      />

      {/* SUBTLE EDITORIAL DETAIL */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-4 border border-white/15 sm:inset-7 lg:inset-10"
      />

      <div className="mx-auto flex min-h-[420px] max-w-[1440px] items-center px-8 py-20 sm:min-h-[480px] sm:px-14 sm:py-24 lg:min-h-[540px] lg:px-24">
        <div className="max-w-2xl">
          {/* EYEBROW */}
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#B99A62]" />
            <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#E8D2A7] sm:text-[10px]">
              A little reminder, just for you
            </p>
          </div>

          {/* MAIN HEADING */}
          <h2 className="font-serif text-4xl font-normal leading-[1.12] tracking-[-0.035em] text-[#F7F2EA] sm:text-5xl lg:text-7xl">
            You deserve a
            <br />
            <em className="font-normal text-[#E8D2A7]">
              softer moment.
            </em>
          </h2>

          {/* SUPPORTING TEXT */}
          <p className="mt-6 max-w-md text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
            Let the little things bring you back to yourself.
            Discover thoughtful skincare and everyday essentials
            that make caring for you feel like a beautiful ritual.
          </p>

          {/* CTA BUTTON — VISIBLE BEFORE HOVER */}
          <a
            href="#shop"
            className="group mt-9 inline-flex min-h-[54px] items-center justify-center gap-6 border border-[#F7F2EA] bg-[#F7F2EA] px-7 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#4B165C] shadow-[0_8px_28px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#32103D] hover:shadow-[0_14px_35px_rgba(0,0,0,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F2EA] focus-visible:ring-offset-4 focus-visible:ring-offset-[#4B165C]"
          >
            Find your ritual

            <ArrowUpRight
              size={17}
              strokeWidth={1.7}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>

          {/* BRAND SIGNATURE */}
          <p className="mt-7 font-serif text-sm italic text-white/65">
            Thoughtfully chosen. Beautifully you.
          </p>
        </div>
      </div>
    </section>
  );
}

/* 06 — NEWSLETTER */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    if (!email.trim()) return;

    // This confirms the local UI only.
    // Connect a newsletter provider or Supabase Edge Function
    // before treating this as a real mailing-list subscription.
    setSubscribed(true);
    setEmail("");
  }

  return (
    <section
      id="newsletter"
      className="scroll-mt-36 relative overflow-hidden bg-[#EDE3E9] px-5 py-20 sm:px-10 sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full border border-[#4B165C]/10 sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full border border-[#4B165C]/10 sm:h-72 sm:w-72" />

      <Reveal>
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#B99A62]/60 bg-[#F7F2EA]/60 text-[#4B165C] transition-transform duration-700 hover:rotate-12">
            <Sparkles size={22} strokeWidth={1.2} />
          </div>

          <EditorialLabel>
            <span className="mx-auto">A LITTLE NOTE FROM US</span>
          </EditorialLabel>

          <h2 className="mt-6 font-serif text-4xl leading-tight tracking-[-0.04em] text-[#4B165C] sm:text-5xl md:text-6xl">
            Lovely things,
            <br />
            <em className="text-[#9A8061]">delivered softly.</em>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#7A685E] sm:text-base">
            Thoughtful beauty notes, new discoveries, little treats and
            inspiration for making more of your everyday rituals.
          </p>

          {subscribed ? (
            <div
              role="status"
              className="mx-auto mt-9 inline-flex items-center gap-3 border border-[#B99A62] bg-[#F7F2EA]/70 px-6 py-4 text-sm text-[#4B165C]"
            >
              <Check size={19} />
              Thank you. Your sign-up has been received.
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="mx-auto mt-9 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Your email address
              </label>

              <input
                id="newsletter-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email address"
                className="min-h-14 min-w-0 flex-1 border border-[#D7C7D4] bg-[#F7F2EA] px-5 text-sm text-[#5A4037] outline-none transition-all duration-300 placeholder:text-[#98877D] focus:border-[#4B165C] focus:ring-2 focus:ring-[#4B165C]/10"
              />

              <button
                type="submit"
                className="group flex min-h-14 items-center justify-center gap-4 bg-[#4B165C] px-7 text-[10px] font-semibold tracking-[0.15em] text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#351043]"
              >
                JOIN THE EDIT
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </form>
          )}

          <p className="mt-5 text-[10px] leading-5 text-[#89766A]">
            Thoughtful notes, never noise. Unsubscribe whenever you wish.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

// /* 07 — LUXURY SHOPPING BAG DRAWER */

// type BagItem = {
//   product: Product;
//   quantity: number;
// };

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

//   const itemCount = items.reduce((total, item) => total + item.quantity, 0);
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
//       <button
//         type="button"
//         aria-label="Close shopping bag"
//         tabIndex={open ? 0 : -1}
//         onClick={onClose}
//         className={`absolute inset-0 h-full w-full bg-[#211625]/55 backdrop-blur-[3px] transition-opacity duration-500 ${
//           open ? "opacity-100" : "opacity-0"
//         }`}
//       />

//       <aside
//         role="dialog"
//         aria-modal={open ? "true" : undefined}
//         aria-label="Your shopping bag"
//         className={`absolute right-0 top-0 flex h-full w-full max-w-[470px] flex-col border-l border-[#B99A62]/30 bg-[#FBF7F0] shadow-2xl transition-transform duration-500 ease-out ${
//           open ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex items-center justify-between border-b border-[#E6D9CA] px-6 py-6 sm:px-8">
//           <div>
//             <p className="text-[9px] tracking-[0.2em] text-[#7D8768]">
//               YOUR LITTLE COLLECTION
//             </p>
//             <h2 className="mt-2 font-serif text-3xl text-[#4B165C]">
//               Your bag
//             </h2>
//             <p className="mt-1 text-xs text-[#89766A]">
//               {itemCount} {itemCount === 1 ? "lovely find" : "lovely finds"}
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close shopping bag"
//             className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E6D9CA] text-[#4B165C] transition-all duration-300 hover:rotate-90 hover:border-[#B99A62] hover:bg-[#EFE6DC]"
//           >
//             <X size={20} />
//           </button>
//         </div>

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
//                 className="mt-7 inline-flex items-center gap-3 bg-[#4B165C] px-7 py-4 text-[10px] font-semibold tracking-[0.13em] text-white transition-all duration-300 hover:bg-[#351043]"
//               >
//                 DISCOVER THE EDIT
//                 <ArrowUpRight size={16} />
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

//                     <div className="mt-auto flex items-center gap-4 pt-4">
//                       <div className="flex items-center border border-[#D8C8B7]">
//                         <button
//                           type="button"
//                           aria-label={`Decrease ${product.name} quantity`}
//                           onClick={() => onUpdateQuantity(product.id, -1)}
//                           className="flex h-9 w-9 items-center justify-center transition hover:bg-[#EFE6DC]"
//                         >
//                           <Minus size={13} />
//                         </button>

//                         <span className="min-w-8 text-center text-xs">
//                           {quantity}
//                         </span>

//                         <button
//                           type="button"
//                           aria-label={`Increase ${product.name} quantity`}
//                           onClick={() => onUpdateQuantity(product.id, 1)}
//                           className="flex h-9 w-9 items-center justify-center transition hover:bg-[#EFE6DC]"
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

//         {items.length > 0 && (
//           <div className="border-t border-[#E6D9CA] bg-[#F7F2EA] px-6 py-6 sm:px-8">
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-[#5A4037]">Subtotal</span>
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
//               className="group mt-5 flex w-full items-center justify-center gap-4 bg-[#4B165C] px-5 py-5 text-[10px] font-semibold tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#351043]"
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

/* 07 — LUXURY SHOPPING BAG DRAWER */

type BagItem = {
  product: Product;
  quantity: number;
};

type ShoppingBagDrawerProps = {
  open: boolean;
  items: BagItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: number, change: number) => void;
};

function ShoppingBagDrawer({
  open,
  items,
  onClose,
  onUpdateQuantity,
}: ShoppingBagDrawerProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <div
      className={`fixed inset-0 z-[10000] ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close shopping bag"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className={`absolute inset-0 h-full w-full bg-[#211625]/55 backdrop-blur-[3px] transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-label="Your shopping bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[470px] flex-col border-l border-[#B99A62]/30 bg-[#FBF7F0] shadow-2xl transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#E6D9CA] px-6 py-6 sm:px-8">
          <div>
            <p className="text-[9px] tracking-[0.2em] text-[#7D8768]">
              YOUR LITTLE COLLECTION
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[#4B165C]">
              Your bag
            </h2>
            <p className="mt-1 text-xs text-[#89766A]">
              {itemCount} {itemCount === 1 ? "lovely find" : "lovely finds"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close shopping bag"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E6D9CA] text-[#4B165C] transition-all duration-300 hover:rotate-90 hover:border-[#B99A62] hover:bg-[#EFE6DC]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#B99A62]/50 bg-[#EFE6DC] text-[#4B165C]">
                <ShoppingBag size={30} strokeWidth={1.2} />
              </div>

              <h3 className="mt-7 max-w-xs font-serif text-3xl leading-tight text-[#4B165C]">
                Something lovely belongs here.
              </h3>

              <p className="mt-4 max-w-xs text-sm leading-7 text-[#89766A]">
                Your next skincare favourite is waiting to be discovered.
              </p>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  scrollToSection("shop");
                }}
                className="mt-7 inline-flex items-center gap-3 bg-[#4B165C] px-7 py-4 text-[10px] font-semibold tracking-[0.13em] text-white transition-all duration-300 hover:bg-[#351043]"
              >
                DISCOVER THE EDIT
                <ArrowUpRight size={16} />
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map(({ product, quantity }) => (
                <article
                  key={product.id}
                  className="flex gap-4 border-b border-[#E6D9CA] pb-6"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-32 w-24 shrink-0 bg-[#EFE6DC] object-cover sm:w-28"
                  />

                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="text-[8px] tracking-[0.13em] text-[#7D8768]">
                      {product.category}
                    </p>

                    <h3 className="mt-2 font-serif text-xl leading-snug text-[#4B165C]">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-sm font-medium text-[#5A4037]">
                      {formatPrice(product.price * quantity)}
                    </p>

                    <div className="mt-auto flex items-center gap-4 pt-4">
                      <div className="flex items-center border border-[#D8C8B7]">
                        <button
                          type="button"
                          aria-label={`Decrease ${product.name} quantity`}
                          onClick={() => onUpdateQuantity(product.id, -1)}
                          className="flex h-9 w-9 items-center justify-center transition hover:bg-[#EFE6DC]"
                        >
                          <Minus size={13} />
                        </button>

                        <span className="min-w-8 text-center text-xs">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          aria-label={`Increase ${product.name} quantity`}
                          onClick={() => onUpdateQuantity(product.id, 1)}
                          className="flex h-9 w-9 items-center justify-center transition hover:bg-[#EFE6DC]"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <span className="text-[9px] tracking-[0.1em] text-[#7D8768]">
                        THE SOFT EDIT
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#E6D9CA] bg-[#F7F2EA] px-6 py-6 sm:px-8">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#5A4037]">Subtotal</span>
              <span className="font-serif text-2xl text-[#4B165C]">
                {formatPrice(subtotal)}
              </span>
            </div>

            <p className="mt-3 text-xs leading-6 text-[#89766A]">
              Delivery and applicable taxes are calculated at checkout.
            </p>

            <button
              type="button"
              onClick={() =>
                window.alert(
                  "Checkout is not connected yet. The basket is currently a front-end demonstration.",
                )
              }
              className="group mt-5 flex w-full items-center justify-center gap-4 bg-[#4B165C] px-5 py-5 text-[10px] font-semibold tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#351043]"
            >
              CONTINUE TO CHECKOUT
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>

            <p className="mt-4 text-center text-[9px] tracking-[0.1em] text-[#7D8768]">
              A LITTLE CARE, FROM US TO YOU.
            </p>
          </div>
        )}
      </aside>
    </div>
  );
}


function Footer() {
  const exploreLinks = [
    ["Shop all", "#shop"],
    ["Skincare", "#categories"],
    ["Body care", "#categories"],
    ["Our story", "#our-story"],
    ["Our philosophy", "#our-story"],
    ["Newsletter", "#newsletter"],
  ];

  const supportLinks = [
    ["Contact us", "mailto:hello@thesoftedit.com"],
    ["FAQs", "/faqs"],
    ["Delivery & shipping", "/delivery-returns"],
    ["Returns & exchanges", "/delivery-returns"],
    ["Track your order", "/account"],
    ["My account", "/account"],
  ];

  const legalLinks = [
    ["Privacy policy", "/privacy"],
    ["Terms & conditions", "/terms"],
    ["Cookie policy", "/cookies"],
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-[#30232F] text-[#F7F2EA]">

      {/* DECORATIVE BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-28 -z-10 h-96 w-96 rounded-full border border-[#B99A62]/15"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-96 w-96 rounded-full border border-[#B99A62]/10"
      />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">

        {/* NEWSLETTER / BRAND INVITATION */}
        <div className="grid gap-8 border-b border-white/15 py-12 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12 lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#B99A62]" />
              <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#D9BE8B]">
                A little note from us
              </span>
            </div>

            <h2 className="font-serif text-3xl font-normal leading-tight tracking-tight text-[#F7F2EA] sm:text-4xl lg:text-5xl">
              Make room for
              <br />
              <em className="text-[#D9BE8B]">a softer kind of beauty.</em>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-white/60">
              Thoughtful finds, little rituals and considered essentials
              for the life you want to live. Because the everyday deserves
              a little more care.
            </p>
          </div>

          <a
            href="#newsletter"
            className="group inline-flex min-h-[54px] w-fit items-center justify-center gap-5 border border-[#B99A62] bg-[#B99A62] px-7 py-4 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#30232F] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D9BE8B] hover:shadow-[0_12px_35px_rgba(185,154,98,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F2EA] focus-visible:ring-offset-4 focus-visible:ring-offset-[#30232F]"
          >
            Discover your edit
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>

        {/* MAIN FOOTER CONTENT */}
        <div className="grid gap-x-10 gap-y-12 border-b border-white/15 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.9fr_1.1fr] lg:gap-x-12 lg:py-16">

          {/* BRAND COLUMN */}
          <div>
            <a
              href="#home"
              aria-label="The Soft Edit homepage"
              className="group inline-block"
            >
              <img
                src={logo}
                alt="The Soft Edit"
                className="h-auto w-[155px] rounded-sm object-contain transition-transform duration-500 group-hover:scale-[1.03] sm:w-[175px]"
              />
            </a>

            <p className="mt-7 max-w-sm font-serif text-2xl leading-relaxed text-white/95 sm:text-3xl">
              A softer approach
              <br />
              to <em className="text-[#D9BE8B]">everyday beauty.</em>
            </p>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
              Thoughtfully chosen skincare. Everyday rituals. A little more
              softness in everything you do.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="mt-8">
              <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D9BE8B]">
                A little more of us
              </p>

              <div className="flex flex-wrap items-center gap-3">
                {/* Replace with the brand's actual WhatsApp number */}
                <a
                  href="https://wa.me/234XXXXXXXXXX"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Chat with The Soft Edit on WhatsApp"
                  title="WhatsApp"
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/75 transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#30232F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9BE8B]"
                >
                  <FaWhatsapp size={18} strokeWidth={1.6} />
                </a>

                <a
                  href="mailto:hello@thesoftedit.com"
                  aria-label="Email The Soft Edit"
                  title="Email us"
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/75 transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#30232F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9BE8B]"
                >
                  <Mail size={18} strokeWidth={1.6} />
                </a>

                {/* Replace with the real Instagram profile */}
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow The Soft Edit on Instagram"
                  title="Instagram"
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white/75 transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#30232F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9BE8B]"
                >
                  <FaInstagram size={18} strokeWidth={1.6} />
                </a>
              </div>

              <p className="mt-4 text-xs leading-6 text-white/45">
                Have a question, a thought or a little beauty discovery to
                share? We'd love to hear from you.
              </p>
            </div>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D9BE8B]">
              Explore
              <span className="h-px flex-1 bg-white/10" />
            </h3>

            <div className="mt-7 flex flex-col items-start gap-4">
              {exploreLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-2 text-sm text-white/60 transition-colors duration-300 hover:text-white"
                >
                  <span className="h-px w-0 bg-[#B99A62] transition-all duration-300 group-hover:w-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* CUSTOMER CARE */}
          <div>
            <h3 className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D9BE8B]">
              Here to help
              <span className="h-px flex-1 bg-white/10" />
            </h3>

            <div className="mt-7 flex flex-col items-start gap-4">
              {supportLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-2 text-sm text-white/60 transition-colors duration-300 hover:text-white"
                >
                  <span className="h-px w-0 bg-[#B99A62] transition-all duration-300 group-hover:w-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* PHILOSOPHY + TRUST */}
          <div>
            <h3 className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D9BE8B]">
              Our philosophy
              <span className="h-px flex-1 bg-white/10" />
            </h3>

            <p className="mt-7 font-serif text-2xl leading-snug text-white/90">
              Your skin.
              <br />
              Your ritual.
              <br />
              <em className="text-[#D9BE8B]">Your edit.</em>
            </p>

            <div className="mt-7 space-y-4 border-t border-white/10 pt-6">
              <div className="flex items-start gap-3">
                <Heart
                  size={17}
                  className="mt-0.5 shrink-0 text-[#D9BE8B]"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-xs font-medium text-white/85">
                    Thoughtfully selected
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/45">
                    Products chosen with care.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck
                  size={17}
                  className="mt-0.5 shrink-0 text-[#D9BE8B]"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-xs font-medium text-white/85">
                    Delivery information
                  </p>
                  <a
                    href="/delivery-returns"
                    className="mt-1 inline-block text-xs leading-5 text-white/45 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#D9BE8B]"
                  >
                    View shipping details
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck
                  size={17}
                  className="mt-0.5 shrink-0 text-[#D9BE8B]"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-xs font-medium text-white/85">
                    Shop with confidence
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/45">
                    Review our policies before you shop.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-[#D9BE8B]">
              <span className="h-px w-7 bg-[#B99A62]" />
              <Sparkles size={14} strokeWidth={1.4} />
              <span className="text-[8px] font-medium uppercase tracking-[0.17em]">
                Beauty, with intention
              </span>
            </div>
          </div>
        </div>

        {/* PAYMENT METHODS */}
        <div className="grid gap-8 border-b border-white/15 py-9 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12">
          <div>
            <div className="flex items-center gap-3">
              <CreditCard
                size={17}
                className="text-[#D9BE8B]"
                strokeWidth={1.5}
              />
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85">
                Payment options
              </h3>
            </div>

            <p className="mt-3 max-w-md text-xs leading-6 text-white/45">
              Choose from the payment methods available at checkout. Available
              options will depend on your payment provider.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 lg:justify-end">

            {/* VISA */}
            <div
              aria-label="Visa"
              className="flex h-10 min-w-[65px] items-center justify-center rounded-md border border-white/15 bg-white px-3 shadow-sm"
            >
              <span className="text-lg font-black italic tracking-tight text-[#1A1F71]">
                VISA
              </span>
            </div>

            {/* MASTERCARD */}
            <div
              aria-label="Mastercard"
              className="flex h-10 min-w-[65px] items-center justify-center rounded-md border border-white/15 bg-white px-3 shadow-sm"
            >
              <span className="flex items-center">
                <span className="-mr-2.5 h-5 w-5 rounded-full bg-[#EB001B]" />
                <span className="h-5 w-5 rounded-full bg-[#F79E1B]/95" />
              </span>
            </div>

            {/* VERVE */}
            <div
              aria-label="Verve"
              className="flex h-10 min-w-[65px] items-center justify-center rounded-md border border-white/15 bg-white px-3 shadow-sm"
            >
              <span className="text-base font-black italic tracking-tight text-[#542583]">
                verve
              </span>
            </div>

            {/* OPAY */}
            <div
              aria-label="OPay"
              className="flex h-10 min-w-[65px] items-center justify-center rounded-md border border-white/15 bg-white px-3 shadow-sm"
            >
              <span className="text-sm font-extrabold tracking-tight text-[#00A651]">
                OPay
              </span>
            </div>

            {/* BANK TRANSFER */}
            <div
              aria-label="Bank transfer"
              className="flex h-10 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/[0.06] px-3"
            >
              <span className="text-[10px] font-semibold text-white/85">
                BANK TRANSFER
              </span>
            </div>

            {/* USSD */}
            <div
              aria-label="USSD payment"
              className="flex h-10 items-center justify-center rounded-md border border-white/15 bg-white/[0.06] px-3"
            >
              <span className="text-[10px] font-semibold text-white/85">
                USSD
              </span>
            </div>
          </div>
        </div>

        {/* POLICIES + COPYRIGHT */}
        <div className="flex flex-col gap-6 py-7 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-[10px] leading-6 tracking-wide text-white/40">
            © {new Date().getFullYear()} The Soft Edit. All rights reserved.
          </p>

          <nav
            aria-label="Legal information"
            className="flex flex-wrap items-center gap-x-5 gap-y-3"
          >
            {legalLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-[10px] text-white/45 transition-colors hover:text-[#D9BE8B]"
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href="#home"
            className="group inline-flex items-center gap-2 self-start text-[9px] font-semibold tracking-[0.15em] text-white/65 transition-colors hover:text-[#D9BE8B] lg:self-auto"
          >
            BACK TO THE TOP
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}


export default function App() {
  const [bagItems, setBagItems] = useState<BagItem[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(() => {
  if (window.location.pathname === "/serum") return "serum";
  if (window.location.pathname === "/all-products") return "all-products";
  if (window.location.pathname === "/face-creams") return "face-creams";
 if (window.location.pathname === "/body-creams") return "body-creams";

  return "home";
});
//   const [currentPage, setCurrentPage] = useState(
//   window.location.pathname === "/serum" ? "serum" : "home",

// );

// useEffect(() => {
//   const handlePopState = () => {
//     setCurrentPage(
//       window.location.pathname === "/serum" ? "serum" : "home",
//     );
//   };

//   window.addEventListener("popstate", handlePopState);

//   return () => {
//     window.removeEventListener("popstate", handlePopState);
//   };
// }, []);
useEffect(() => {
  const handlePopState = () => {
    const path = window.location.pathname;

    if (path === "/serum") {
      setCurrentPage("serum");
    } else if (path === "/face-creams") {
      setCurrentPage("face-creams");
    } 
     else if (path === "/all-products") {
      setCurrentPage("all-products");
    } 
    else if (path === "/body-creams") {
      setCurrentPage("body-creams");
    } 
    else {
      setCurrentPage("home");
    }
  };

  window.addEventListener("popstate", handlePopState);

  return () => window.removeEventListener("popstate", handlePopState);
}, []);

// function navigateTo(path: string) {
//   window.history.pushState({}, "", path);

//   setCurrentPage(path === "/serum" ? "serum" : "home");

//   window.scrollTo({ top: 0, behavior: "instant" });
// }
function navigateTo(path: string) {
  window.history.pushState({}, "", path);

  if (path === "/serum") {
    setCurrentPage("serum");
  } else if (path === "/face-creams") {
    setCurrentPage("face-creams");
  } 
   else if (path === "/body-creams") {
    setCurrentPage("body-creams");
  }
   else if (path === "/all-products") {
      setCurrentPage("all-products");
    } 
  else {
    setCurrentPage("home");
  }

  window.scrollTo({ top: 0, behavior: "instant" });
}

  useEffect(() => {
    let active = true;

    async function loadFavourites(userId: string) {
      const { data, error } = await supabase
        .from("favourites")
        .select("product_id")
        .eq("customer_id", userId);

      if (error) {
        console.error("Unable to load saved favourites:", error.message);
        return;
      }

      if (active) {
        setSaved(
          (data ?? [])
            .map((item) => Number(item.product_id))
            .filter((id) => Number.isFinite(id)),
        );
      }
    }

    async function loadCurrentSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (active && session) {
        await loadFavourites(session.user.id);
      }
    }

    void loadCurrentSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        window.setTimeout(() => {
          if (active) void loadFavourites(session.user.id);
        }, 0);
      } else if (active) {
        setSaved([]);
      }
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const bagCount = bagItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  function addToBag(product: Product) {
    setBagItems((current) => {
      const existing = current.find(
        (item) => item.product.id === product.id,
      );

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...current, { product, quantity: 1 }];
    });

    setBagOpen(true);
  }

  function updateQuantity(productId: number, change: number) {
    setBagItems((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  async function toggleSaved(productId: number) {
    const wasSaved = saved.includes(productId);

    setSaved((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    // Guest wishlist changes remain local to this page.
    if (userError || !user) return;

    if (wasSaved) {
      const { error } = await supabase
        .from("favourites")
        .delete()
        .eq("customer_id", user.id)
        .eq("product_id", String(productId));

      if (error) {
        console.error("Unable to remove favourite:", error.message);
        setSaved((current) =>
          current.includes(productId)
            ? current
            : [...current, productId],
        );
      }

      return;
    }

    const { error } = await supabase.from("favourites").upsert(
      {
        customer_id: user.id,
        product_id: String(productId),
      },
      { onConflict: "customer_id,product_id" },
    );

    if (error) {
      console.error("Unable to save favourite:", error.message);
      setSaved((current) => current.filter((id) => id !== productId));
    }
  }

  
return (
  <AccountPages>
    <div className="min-h-screen overflow-x-clip bg-[#F7F2EA] text-[#5A4037] selection:bg-[#4B165C] selection:text-[#F7F2EA]">
     
{/* <main>
  <Hero
    bagCount={bagCount}
    onOpenBag={() => setBagOpen(true)}
    onNavigate={navigateTo}
    showHeroBanner={currentPage !== "serum"}
    headerVariant={currentPage === "serum" ? "serum" : "home"}
  />

  {currentPage === "serum" ? (
    <>
      <SerumCollectionPage
        onAddToBag={addToBag}
        saved={saved}
        onToggleSaved={toggleSaved}
      />
      <BrandPromises />
    </>
  ) : (
    <>
      <BrandPromises />
      <Categories />
      <ProductGrid
        onAddToBag={addToBag}
        saved={saved}
        onToggleSaved={toggleSaved}
      />
      <BrandStory />
      <RitualInterlude />
      <Newsletter />
    </>
  )}
</main> */}
<main>
  <Hero
    bagCount={bagCount}
    onOpenBag={() => setBagOpen(true)}
    onNavigate={navigateTo}
    showHeroBanner={currentPage === "home"}
    headerVariant={currentPage === "home" ? "home" : "serum"}
  />

  {currentPage === "serum" ? (
    <>
      <SerumCollectionPage
        onAddToBag={addToBag}
        saved={saved}
        onToggleSaved={toggleSaved}
      />
      <BrandPromises />
    </>
  ) : currentPage === "face-creams" ? (
    <>
      <FaceCreamCollectionPage
        onAddToBag={addToBag}
        saved={saved}
        onToggleSaved={toggleSaved}
      />
      <BrandPromises />
    </>
  ) : currentPage === "body-creams" ? (
    <>
      <BodyCreamCollectionPage
        onAddToBag={addToBag}
        saved={saved}
        onToggleSaved={toggleSaved}
      />
      <BrandPromises />
    </>
  )  : currentPage === "all-products" ? (
  <AllProductsPage
    onAddToBag={addToBag}
    saved={saved}
    onToggleSaved={toggleSaved}
  />
) : (
  <>
    <BrandPromises />
    <Categories />
    <ProductGrid
      onAddToBag={addToBag}
      saved={saved}
      onToggleSaved={toggleSaved}
    />
    <BrandStory />
    <RitualInterlude />
    <Newsletter />
  </>
)}
</main>
      {/* FOOTER SHOWS ON BOTH PAGES */}
      <Footer />

      {/* KEEP THE SHOPPING BAG AVAILABLE ON BOTH PAGES */}
      <ShoppingBagDrawer
        open={bagOpen}
        items={bagItems}
        onClose={() => setBagOpen(false)}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  </AccountPages>
);

    
}





