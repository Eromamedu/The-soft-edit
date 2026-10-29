// The Soft Edit — catalogue data.
// Images use loremflickr keyword photos so every product shows a real picture.
// Replace the `image` of any product with your own photo URL whenever you have it.

export type StoreProduct = {
  id: number;
  name: string;
  category: string; // one of COLLECTIONS[].name
  price: number; // Naira
  image: string;
  stock: number;
  tag?: string;
  bestSeller?: boolean;
  frequent?: boolean;
  blurb: string;
};

const img = (kw: string, id: number, w = 700, h = 880) =>
  `https://loremflickr.com/${w}/${h}/${kw}?lock=${id}`;

type Row = [string, string, number, string, number, string?];

const rows: Row[] = [
  // Pots
  ["Terracotta Bloom Plant Pot", "Pots", 12500, "terracotta,plant,pot", 12, "BESTSELLER"],
  ["Cream Ceramic Planter", "Pots", 15800, "ceramic,planter", 9],
  ["Fluted Stone Pot", "Pots", 18900, "stone,pot,plant", 7],
  ["Woven Rattan Pot Cover", "Pots", 9800, "rattan,basket,plant", 14],
  ["Glazed Sage Planter", "Pots", 16400, "green,ceramic,vase", 6, "NEW"],
  ["Mini Succulent Trio", "Pots", 8500, "succulent,pot", 18],
  // Bags
  ["The Everyday Tote", "Bags", 34500, "tote,bag,leather", 8, "BESTSELLER"],
  ["Soft Slouch Shoulder Bag", "Bags", 42000, "handbag,fashion", 5],
  ["Mini Crescent Bag", "Bags", 29800, "mini,handbag", 10],
  ["Raffia Weekend Carry", "Bags", 27500, "raffia,bag", 11, "NEW"],
  ["Velvet Evening Clutch", "Bags", 21500, "clutch,bag", 7],
  ["Canvas Market Bag", "Bags", 12800, "canvas,tote,bag", 20],
  // Mirrors
  ["Arch Standing Mirror", "Mirrors", 78000, "arch,mirror,interior", 4, "THE EDIT"],
  ["Gold Rim Round Mirror", "Mirrors", 46500, "round,mirror,gold", 6],
  ["Pebble Wall Mirror", "Mirrors", 39800, "wall,mirror,decor", 5],
  ["Compact Vanity Mirror", "Mirrors", 11500, "vanity,mirror,makeup", 16],
  ["Rattan Frame Mirror", "Mirrors", 52000, "rattan,mirror", 3],
  // Creams
  ["Soft Focus Face Cream", "Creams", 17500, "face,cream,jar", 5, "BESTSELLER"],
  ["Cloud Nine Moisturiser", "Creams", 16000, "moisturizer,cream", 9],
  ["Shea Body Butter", "Creams", 14500, "shea,butter,skincare", 13],
  ["Silk Night Cream", "Creams", 19800, "night,cream,skincare", 6],
  ["Velvet Hand Cream", "Creams", 7800, "hand,cream", 22],
  ["Daily Veil SPF 50", "Creams", 15500, "sunscreen,skincare", 10, "NEW"],
  // Serums
  ["The Daily Glow Serum", "Serums", 14000, "serum,dropper", 4, "BESTSELLER"],
  ["Hydra Dew Serum", "Serums", 15200, "hyaluronic,serum", 7],
  ["Vitamin C Radiance Drops", "Serums", 16800, "vitamin,serum", 5],
  ["Overnight Repair Elixir", "Serums", 21000, "skincare,bottle", 3],
  ["Rose Petal Face Mist", "Serums", 9500, "rose,mist,spray", 15],
  // Candles
  ["Amber Dusk Candle", "Candles", 13500, "candle,amber", 14, "BESTSELLER"],
  ["Vanilla Cloud Candle", "Candles", 12500, "vanilla,candle", 17],
  ["Lavender Hour Candle", "Candles", 12800, "lavender,candle", 11],
  ["Sandalwood Glow Candle", "Candles", 14800, "sandalwood,candle", 8],
  ["Mini Votive Trio", "Candles", 8200, "votive,candle", 19],
  ["Reed Diffuser — Soft Linen", "Candles", 16500, "reed,diffuser", 9, "NEW"],
  // Home Decor
  ["Sculpted Ceramic Vase", "Home Decor", 24500, "ceramic,vase", 6, "THE EDIT"],
  ["Dried Pampas Bundle", "Home Decor", 9800, "pampas,grass", 12],
  ["Linen Table Runner", "Home Decor", 11800, "linen,table,runner", 10],
  ["Marble Trinket Tray", "Home Decor", 14200, "marble,tray", 8],
  ["Framed Botanical Print", "Home Decor", 19500, "botanical,print,frame", 7],
  // Throws & Linen
  ["Cloud Knit Throw", "Throws & Linen", 38500, "knit,throw,blanket", 6, "BESTSELLER"],
  ["Pure Linen Pillowcase Pair", "Throws & Linen", 18500, "linen,pillow,bedroom", 12],
  ["Velvet Cushion Cover", "Throws & Linen", 11200, "velvet,cushion", 15],
  ["Silk Sleep Eye Mask", "Throws & Linen", 8800, "silk,sleep,mask", 20, "NEW"],
  ["Waffle Bath Towel Set", "Throws & Linen", 26500, "bath,towel,spa", 9],
  // Tableware
  ["Stoneware Dinner Plate Set", "Tableware", 32500, "stoneware,plates", 7],
  ["Glazed Coffee Mug Duo", "Tableware", 10500, "ceramic,mug,coffee", 16],
  ["Gold Cutlery Set", "Tableware", 28800, "gold,cutlery", 5, "THE EDIT"],
  ["Crystal Tumbler Pair", "Tableware", 13800, "crystal,glass,tumbler", 11],
  ["Ceramic Teapot & Cups", "Tableware", 24800, "teapot,tea,ceramic", 6],
  // Self-care Basics
  ["Bamboo Bath Tray", "Self-care Basics", 19800, "bath,tray,bamboo", 7],
  ["Jade Face Roller", "Self-care Basics", 7800, "jade,roller,skincare", 18],
  ["Silk Scrunchie Set", "Self-care Basics", 6200, "silk,scrunchie", 25, "NEW"],
  ["Bath Salts — Eucalyptus", "Self-care Basics", 8800, "bath,salts,spa", 14],
  ["Journal & Pen Gift Set", "Self-care Basics", 12500, "journal,notebook,pen", 13, "BESTSELLER"],
];

const bestIds = new Set([1, 7, 13, 18, 23, 28, 41, 46, 52, 36]);
const frequentIds = new Set([2, 9, 16, 19, 21, 26, 29, 30, 33, 38, 42, 45, 47, 50, 51]);

export const STORE_PRODUCTS: StoreProduct[] = rows.map((r, i) => {
  const id = i + 1;
  return {
    id: 100 + id, // offset so it never clashes with the 4 original demo products
    name: r[0],
    category: r[1],
    price: r[2],
    image: img(r[3], id),
    stock: r[4],
    tag: r[5],
    bestSeller: bestIds.has(id) || r[5] === "BESTSELLER",
    frequent: frequentIds.has(id),
    blurb: `${r[0]} — chosen for a softer, more beautiful everyday.`,
  };
});

export const COLLECTIONS = [
  { name: "Pots", slug: "pots", kw: "plant,pot", blurb: "Planters that make every corner bloom." },
  { name: "Bags", slug: "bags", kw: "handbag", blurb: "Carry your softness everywhere." },
  { name: "Mirrors", slug: "mirrors", kw: "mirror,interior", blurb: "Reflect your own light." },
  { name: "Creams", slug: "creams", kw: "cream,skincare", blurb: "Everyday comfort for your skin." },
  { name: "Serums", slug: "serums", kw: "serum,skincare", blurb: "Targeted care, thoughtful formulas." },
  { name: "Candles", slug: "candles", kw: "candle", blurb: "Light the mood, slow the evening." },
  { name: "Home Decor", slug: "home-decor", kw: "home,decor", blurb: "Little details, lived in beautifully." },
  { name: "Throws & Linen", slug: "throws-linen", kw: "linen,bedroom", blurb: "Soft things to sink into." },
  { name: "Tableware", slug: "tableware", kw: "ceramic,tableware", blurb: "Set the table like it matters." },
  { name: "Self-care Basics", slug: "self-care-basics", kw: "spa,selfcare", blurb: "Rituals for the days that need you." },
].map((c, i) => ({
  ...c,
  image: img(c.kw, 300 + i, 800, 1000),
  count: STORE_PRODUCTS.filter((p) => p.category === c.name).length,
}));

export const SHOP_BANNERS = [
  { collection: "Pots", headline: "Let something green grow beside you.", text: "Hand-finished pots and planters that turn any corner into a calm little garden.", kw: "plants,home,interior" },
  { collection: "Bags", headline: "Carry yourself softly.", text: "Everyday totes and evening clutches, made to go wherever your day goes.", kw: "handbag,fashion,woman" },
  { collection: "Mirrors", headline: "See the light in you.", text: "Arched, rounded and gilded mirrors that make every room feel brighter.", kw: "mirror,bedroom,interior" },
  { collection: "Candles", headline: "Light up a slower evening.", text: "Warm amber, soft vanilla and quiet lavender. Pick the mood, light the wick.", kw: "candles,cozy,evening" },
  { collection: "Serums", headline: "Glow is a daily ritual.", text: "Gentle, targeted formulas for skin that feels as good as it looks.", kw: "skincare,serum,beauty" },
  { collection: "Throws & Linen", headline: "Sink into something softer.", text: "Knitted throws and pure linen for the nights you owe yourself.", kw: "blanket,bedroom,cozy" },
];

export const LOVER_VIDEOS = [
  { id: 1, title: "Morning glow routine", product: "The Daily Glow Serum", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
  { id: 2, title: "Candle-lit evenings", product: "Amber Dusk Candle", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
  { id: 3, title: "Styling my corner", product: "Terracotta Bloom Plant Pot", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
  { id: 4, title: "Out the door with my tote", product: "The Everyday Tote", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
  { id: 5, title: "Mirror check", product: "Arch Standing Mirror", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
  { id: 6, title: "Night cream, night ritual", product: "Silk Night Cream", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
  { id: 7, title: "Sunday throw season", product: "Cloud Knit Throw", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
  { id: 8, title: "Setting the table", product: "Stoneware Dinner Plate Set", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
  { id: 9, title: "Bath-night basics", product: "Bath Salts — Eucalyptus", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4" },
  { id: 10, title: "Hydrate and go", product: "Hydra Dew Serum", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
];

export const MARQUEE_ITEMS = [
  "Pots", "Bags", "Mirrors", "Creams", "Serums", "Candles", "Home Decor",
  "Throws & Linen", "Tableware", "Self-care Basics",
];

export const QUOTES = [
  "It's literally The Soft Edit. Live beautifully.",
  "Self-care is not selfish. It is how you refill your cup.",
  "Make room for a softer kind of life.",
  "Rest is a ritual, not a reward.",
  "Be gentle with yourself. You are doing beautifully.",
  "Small rituals, big glow.",
];

export const ngn = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);

export const slugify = (s: string) => s.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
