// // The Soft Edit — catalogue data.
// // Product images are imported from src/images (image01 - image54).
// // Replace any file in src/images with your own photo of the same name to update it.

// export type StoreProduct = {
//   id: number;
//   name: string;
//   category: string; // one of COLLECTIONS[].name
//   price: number; // Naira
//   image: string;
//   stock: number;
//   tag?: string;
//   bestSeller?: boolean;
//   frequent?: boolean;
//   blurb: string;
// };

// // ---------------------------------------------------------------
// // PRODUCT IMAGES — imported (54 total)
// // Put image01.jpg ... image54.jpg inside src/images/
// // If your files are .png or .webp, change the extension below.
// // ---------------------------------------------------------------
// import image01 from "../images/IMG-20261027-WA0001(1).jpg";
// import image02 from "../images/IMG-20261115-WA0002(1).jpg";
// import image03 from "../images/IMG-20261115-WA0003(1).jpg";
// import image04 from "../images/IMG-20261115-WA0004(1).jpg";
// import image05 from "../images/IMG-20261115-WA0017.jpg";
// import image06 from "../images/IMG-20261115-WA0018.jpg";
// import image07 from "../images/IMG-20261115-WA0019.jpg";
// import image08 from "../images/IMG-20261115-WA0020.jpg";
// import image09 from "../images/IMG-20261115-WA0021.jpg";

// import image10 from "../images/IMG-20261115-WA0022.jpg";
// import image11 from "../images/IMG-20261115-WA0023.jpg";
// import image12 from "../images/IMG-20261115-WA0024.jpg";
// import image13 from "../images/IMG-20261115-WA0025.jpg";
// import image14 from "../images/IMG-20261115-WA0026.jpg";
// import image15 from "../images/IMG-20261115-WA0027.jpg";
// import image16 from "../images/IMG-20261115-WA0028.jpg";
// import image17 from "../images/IMG-20261115-WA0029.jpg";
// import image18 from "../images/IMG-20261115-WA0030.jpg";
// import image19 from "../images/IMG-20261115-WA0031.jpg";
// import image20 from "../images/IMG-20261115-WA0032.jpg";
// import image21 from "../images/IMG-20261115-WA0033.jpg";
// import image22 from "../images/IMG-20261115-WA0034.jpg";
// import image23 from "../images/IMG-20261115-WA0035.jpg";
// import image24 from "../images/IMG-20261115-WA0036.jpg";
// import image25 from "../images/IMG-20261115-WA0037.jpg";
// import image26 from "../images/IMG-20261115-WA0038.jpg";
// import image27 from "../images/IMG-20261115-WA0039.jpg";
// import image28 from "../images/IMG-20261115-WA0040.jpg";
// import image29 from "../images/IMG-20261115-WA0041.jpg";
// import image30 from "../images/IMG-20261115-WA0042.jpg";
// import image31 from "../images/IMG-20261115-WA0043.jpg";
// import image32 from "../images/IMG-20261115-WA0044.jpg";
// import image33 from "../images/IMG-20261115-WA0045.jpg";
// import image34 from "../images/IMG-20261115-WA0046.jpg";
// import image35 from "../images/IMG-20261115-WA0047.jpg";
// import image36 from "../images/IMG-20261115-WA0048.jpg";
// import image37 from "../images/IMG-20261115-WA0049.jpg";
// import image38 from "../images/IMG-20261115-WA0050.jpg";
// import image39 from "../images/IMG-20261115-WA0051.jpg";
// import image40 from "../images/IMG-20261115-WA0052.jpg";
// import image41 from "../images/IMG-20261115-WA0053.jpg";
// import image42 from "../images/IMG-20261115-WA0054.jpg";
// import image43 from "../images/IMG-20261115-WA0055.jpg";
// import image44 from "../images/IMG-20261115-WA0056.jpg";
// import image45 from "../images/IMG-20261115-WA0057.jpg";
// import image46 from "../images/IMG-20261115-WA0058.jpg";
// import image47 from "../images/IMG-20261115-WA0059.jpg";
// import image48 from "../images/IMG-20261115-WA0060.jpg";
// import image49 from "../images/IMG-20261115-WA0061.jpg";
// import image50 from "../images/IMG-20261115-WA0062.jpg";
// import image51 from "../images/IMG-20261115-WA0063.jpg";
// import image52 from "../images/IMG-20261115-WA0064.jpg";
// import image53 from "../images/IMG-20261115-WA0065.jpg";
// import image54 from "../images/IMG-20261115-WA0068.jpg";
// import image55 from "../images/books.jpg"
// // Same order as the rows below: image01 = first product, image54 = last product.
// const PRODUCT_IMAGES: string[] = [
//   image01, image02, image03, image04, image05, image06, image07, image08, image09, image10,
//   image11, image12, image13, image14, image15, image16, image17, image18, image19, image20,
//   image21, image22, image23, image24, image25, image26, image27, image28, image29, image30,
//   image31, image32, image33, image34, image35, image36, image37, image38, image39, image40,
//   image41, image42, image43, image44, image45, image46, image47, image48, image49, image50,
//   image51, image52, image53, image54,image55
// ];

// // const img = (kw: string, id: number, w = 700, h = 880) =>
// //   `https://loremflickr.com/${w}/${h}/${kw}?lock=${id}`;

// // Still used for the collection cover images below (not the products).
// const img = (kw: string, id: number, w = 700, h = 880) => {
//   const photos: Record<string, string[]> = {
//     terracotta: [
//       "photo-1485955900006-10f4d324d411",
//       "photo-1416879595882-3373a0480b5b",
//     ],
//     ceramic: [
//       "photo-1578500494198-246f612d3b3d",
//       "photo-1578749556568-bc2c40e68b61",
//     ],
//     stone: [
//       "photo-1578749556568-bc2c40e68b61",
//       "photo-1610701596007-11502861dcfa",
//     ],
//     rattan: [
//       "photo-1594818379496-da1e345b0ded",
//       "photo-1616486338812-3dadae4b4ace",
//     ],
//     green: [
//       "photo-1485955900006-10f4d324d411",
//       "photo-1416879595882-3373a0480b5b",
//     ],
//     succulent: [
//       "photo-1501004318641-b39e6451bec6",
//       "photo-1485955900006-10f4d324d411",
//     ],
//     tote: [
//       "photo-1544816155-12df9643f363",
//       "photo-1584917865442-de89df76afd3",
//     ],
//     handbag: [
//       "photo-1584917865442-de89df76afd3",
//       "photo-1590874103328-eac38a683ce7",
//     ],
//     mini: [
//       "photo-1584917865442-de89df76afd3",
//       "photo-1590874103328-eac38a683ce7",
//     ],
//     raffia: [
//       "photo-1590874103328-eac38a683ce7",
//       "photo-1584917865442-de89df76afd3",
//     ],
//     clutch: [
//       "photo-1584917865442-de89df76afd3",
//       "photo-1590874103328-eac38a683ce7",
//     ],
//     canvas: [
//       "photo-1544816155-12df9643f363",
//       "photo-1584917865442-de89df76afd3",
//     ],
//     arch: [
//       "photo-1618221195710-dd6b41faaea6",
//       "photo-1616486338812-3dadae4b4ace",
//     ],
//     round: [
//       "photo-1616486338812-3dadae4b4ace",
//       "photo-1618221195710-dd6b41faaea6",
//     ],
//     wall: [
//       "photo-1616486338812-3dadae4b4ace",
//       "photo-1618221195710-dd6b41faaea6",
//     ],
//     vanity: [
//       "photo-1618221195710-dd6b41faaea6",
//       "photo-1616486338812-3dadae4b4ace",
//     ],
//     cream: [
//       "photo-1556228720-195a672e8a03",
//       "photo-1601049541289-9b1b7bbbfe19",
//     ],
//     moisturizer: [
//       "photo-1608248543803-ba4f8c70ae0b",
//       "photo-1556229010-6c3f2c9ca5f8",
//     ],
//     shea: [
//       "photo-1601049541289-9b1b7bbbfe19",
//       "photo-1556228720-195a672e8a03",
//     ],
//     night: [
//       "photo-1556229010-6c3f2c9ca5f8",
//       "photo-1608248543803-ba4f8c70ae0b",
//     ],
//     hand: [
//       "photo-1601049541289-9b1b7bbbfe19",
//       "photo-1556228720-195a672e8a03",
//     ],
//     sunscreen: [
//       "photo-1556228720-195a672e8a03",
//       "photo-1608248543803-ba4f8c70ae0b",
//     ],
//     serum: [
//       "photo-1608248543803-ba4f8c70ae0b",
//       "photo-1601049541289-9b1b7bbbfe19",
//     ],
//     hyaluronic: [
//       "photo-1608248543803-ba4f8c70ae0b",
//       "photo-1556229010-6c3f2c9ca5f8",
//     ],
//     vitamin: [
//       "photo-1556229010-6c3f2c9ca5f8",
//       "photo-1608248543803-ba4f8c70ae0b",
//     ],
//     skincare: [
//       "photo-1601049541289-9b1b7bbbfe19",
//       "photo-1608248543803-ba4f8c70ae0b",
//     ],
//     rose: [
//       "photo-1556229010-6c3f2c9ca5f8",
//       "photo-1608248543803-ba4f8c70ae0b",
//     ],
//     candle: [
//       "photo-1603006905003-be475563bc59",
//       "photo-1602874801007-bd458bb1b8b6",
//     ],
//     amber: [
//       "photo-1603006905003-be475563bc59",
//       "photo-1602874801007-bd458bb1b8b6",
//     ],
//     vanilla: [
//       "photo-1603006905003-be475563bc59",
//       "photo-1602874801007-bd458bb1b8b6",
//     ],
//     lavender: [
//       "photo-1603006905003-be475563bc59",
//       "photo-1602874801007-bd458bb1b8b6",
//     ],
//     sandalwood: [
//       "photo-1603006905003-be475563bc59",
//       "photo-1602874801007-bd458bb1b8b6",
//     ],
//     votive: [
//       "photo-1602874801007-bd458bb1b8b6",
//       "photo-1603006905003-be475563bc59",
//     ],
//     reed: [
//       "photo-1603006905003-be475563bc59",
//       "photo-1602874801007-bd458bb1b8b6",
//     ],
//     home: [
//       "photo-1616486338812-3dadae4b4ace",
//       "photo-1618221195710-dd6b41faaea6",
//     ],
//     pampas: [
//       "photo-1616486338812-3dadae4b4ace",
//       "photo-1618221195710-dd6b41faaea6",
//     ],
//     linen: [
//       "photo-1616486338812-3dadae4b4ace",
//       "photo-1618221195710-dd6b41faaea6",
//     ],
//     marble: [
//       "photo-1616486338812-3dadae4b4ace",
//       "photo-1618221195710-dd6b41faaea6",
//     ],
//     botanical: [
//       "photo-1497250681960-ef046c08a56e",
//       "photo-1485955900006-10f4d324d411",
//     ],
//     knit: [
//       "photo-1616486338812-3dadae4b4ace",
//       "photo-1618221195710-dd6b41faaea6",
//     ],
//     pillow: [
//       "photo-1616486338812-3dadae4b4ace",
//       "photo-1618221195710-dd6b41faaea6",
//     ],
//     velvet: [
//       "photo-1616486338812-3dadae4b4ace",
//       "photo-1618221195710-dd6b41faaea6",
//     ],
//     silk: [
//       "photo-1616486338812-3dadae4b4ace",
//       "photo-1618221195710-dd6b41faaea6",
//     ],
//     bath: [
//       "photo-1601049541289-9b1b7bbbfe19",
//       "photo-1556228720-195a672e8a03",
//     ],
//     stoneware: [
//       "photo-1490312278390-ab64016e0aa9",
//       "photo-1578749556568-bc2c40e68b61",
//     ],
//     glazed: [
//       "photo-1578749556568-bc2c40e68b61",
//       "photo-1490312278390-ab64016e0aa9",
//     ],
//     gold: [
//       "photo-1490312278390-ab64016e0aa9",
//       "photo-1578749556568-bc2c40e68b61",
//     ],
//     crystal: [
//       "photo-1490312278390-ab64016e0aa9",
//       "photo-1578749556568-bc2c40e68b61",
//     ],
//     bamboo: [
//       "photo-1601049541289-9b1b7bbbfe19",
//       "photo-1616486338812-3dadae4b4ace",
//     ],
//     jade: [
//       "photo-1556229010-6c3f2c9ca5f8",
//       "photo-1608248543803-ba4f8c70ae0b",
//     ],
//     journal: [
//       "photo-1544816155-12df9643f363",
//       "photo-1455390582262-044cdead277a",
//     ],
//     spa: [
//       "photo-1601049541289-9b1b7bbbfe19",
//       "photo-1556229010-6c3f2c9ca5f8",
//     ],
//   };

//   const keyword = kw.split(",")[0].trim().toLowerCase();
//   const options = photos[keyword] ?? photos.home;
//   const photoId = options[(id - 1) % options.length];

//   return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;
// };


// type Row = [string, string, number, string, number, string?];

// const rows: Row[] = [
//   // Pots
//   ["Polythene bag", "Masks", 5000, "terracotta,plant,pot", 12, "BESTSELLER"],
//   ["Stylpro Wavelength Masks", "Pots", 24700, "ceramic,planter", 9],
//   ["Cyro Rubber Mask", "Masks", 36900, "stone,pot,plant", 7],
//   ["Neck and Chest Mask", "Masks", 28600, "rattan,basket,plant", 14],
//   ["L'occitane cream", "Cream", 25400, "green,ceramic,vase", 6, "NEW"],
//   ["Byoma Hydrating Toner", "Toner", 22500, "succulent,pot", 18],
//   // Bags
//   ["Aveeno Body Oil", "oil", 34500, "tote,bag,leather", 8, "BESTSELLER"],
//   ["Ex-callus Exfoliating Socks", "Bags", 22000, "handbag,fashion", 5],
//   ["Round-lab Toner", "Bags", 29800, "mini,handbag", 10],
//   ["Collagen Jelly Cream", "Bags", 27500, "raffia,bag", 11, "NEW"],
//   ["Exfoliating Toner", "Bags", 21500, "clutch,bag", 7],
//   ["Foot Cream", "Creams", 12800, "canvas,tote,bag", 20],
//   // Mirrors
//   ["Fenty Body Wash", "Mirrors", 28000, "arch,mirror,interior", 4, "THE EDIT"],
//   ["Dr. Sam's Cleanser", "Mirrors", 36500, "round,mirror,gold", 6],
//   ["Naturium Body Wash", "Mirrors", 35000, "wall,mirror,decor", 5],
//   ["Rose Toes Footmask", "Mirrors", 11500, "vanity,mirror,makeup", 16],
//   ["Cerave Foaming Cleanser", "Mirrors", 42000, "rattan,mirror", 3],
//   // Creams
//   ["Dove Moisturizing Cream", "Creams", 27500, "face,cream,jar", 5, "BESTSELLER"],
//   ["Vitamin C glowing mask", "Creams", 16000, "moisturizer,cream", 9],
//   ["The Round lab toner", "Creams", 14500, "shea,butter,skincare", 13],
//   ["Lip Mask", "Creams", 19800, "night,cream,skincare", 6],
//   ["Velvet Hand Cream", "Creams", 7800, "hand,cream", 22],
//   ["Daily Veil SPF 50", "Creams", 15500, "sunscreen,skincare", 10, "NEW"],
//   // Serums
//   ["The Daily Glow Serum", "Serums", 14000, "serum,dropper", 4, "BESTSELLER"],
//   ["Hydra Dew Serum", "Serums", 15200, "hyaluronic,serum", 7],
//   ["Vitamin C Radiance Drops", "Serums", 16800, "vitamin,serum", 5],
//   ["Overnight Repair Elixir", "Serums", 21000, "skincare,bottle", 3],
//   ["Rose Petal Face Mist", "Serums", 9500, "rose,mist,spray", 15],
//   // Candles
//   ["Amber Dusk Candle", "Candles", 13500, "candle,amber", 14, "BESTSELLER"],
//   ["Vanilla Cloud Candle", "Candles", 12500, "vanilla,candle", 17],
//   ["Lavender Hour Candle", "Candles", 12800, "lavender,candle", 11],
//   ["Sandalwood Glow Candle", "Candles", 14800, "sandalwood,candle", 8],
//   ["Mini Votive Trio", "Candles", 8200, "votive,candle", 19],
//   ["Reed Diffuser — Soft Linen", "Candles", 16500, "reed,diffuser", 9, "NEW"],
//   // Home Decor
//   ["Sculpted Ceramic Vase", "Books", 24500, "ceramic,vase", 6, "THE EDIT"],
//   ["Dried Pampas Bundle", "Books", 9800, "pampas,grass", 12],
//   ["Linen Table Runner", "Books", 11800, "linen,table,runner", 10],
//   ["Marble Trinket Tray", "Books", 14200, "marble,tray", 8],
//   ["Framed Botanical Print", "Books", 19500, "botanical,print,frame", 7],
//   // Throws & Linen
//   ["Cloud Knit Throw", "Throws & Linen", 38500, "knit,throw,blanket", 6, "BESTSELLER"],
//   ["Pure Linen Pillowcase Pair", "Throws & Linen", 18500, "linen,pillow,bedroom", 12],
//   ["Velvet Cushion Cover", "Throws & Linen", 11200, "velvet,cushion", 15],
//   ["Silk Sleep Eye Mask", "Throws & Linen", 8800, "silk,sleep,mask", 20, "NEW"],
//   ["Waffle Bath Towel Set", "Throws & Linen", 26500, "bath,towel,spa", 9],
//   // Tableware
//   ["Stoneware Dinner Plate Set", "Tableware", 32500, "stoneware,plates", 7],
//   ["Glazed Coffee Mug Duo", "Tableware", 10500, "ceramic,mug,coffee", 16],
//   ["Gold Cutlery Set", "Tableware", 28800, "gold,cutlery", 5, "THE EDIT"],
//   ["Crystal Tumbler Pair", "Tableware", 13800, "crystal,glass,tumbler", 11],
//   ["Ceramic Teapot & Cups", "Tableware", 24800, "teapot,tea,ceramic", 6],
//   // Self-care Basics
//   ["Bamboo Bath Tray", "Self-care Basics", 19800, "bath,tray,bamboo", 7],
//   ["Jade Face Roller", "Self-care Basics", 7800, "jade,roller,skincare", 18],
//   ["Silk Scrunchie Set", "Self-care Basics", 6200, "silk,scrunchie", 25, "NEW"],
//   ["Bath Salts — Eucalyptus", "Self-care Basics", 8800, "bath,salts,spa", 14],
//   ["Journal & Pen Gift Set", "Self-care Basics", 12500, "journal,notebook,pen", 13, "BESTSELLER"],
// ];

// const bestIds = new Set([1, 7, 13, 18, 23, 28, 41, 46, 52, 36]);
// const frequentIds = new Set([2, 9, 16, 19, 21, 26, 29, 30, 33, 38, 42, 45, 47, 50, 51]);

// export const STORE_PRODUCTS: StoreProduct[] = rows.map((r, i) => {
//   const id = i + 1;
//   return {
//     id: 100 + id, // offset so it never clashes with the 4 original demo products
//     name: r[0],
//     category: r[1],
//     price: r[2],
//     image: PRODUCT_IMAGES[i], // imported image01 - image54
//     stock: r[4],
//     tag: r[5],
//     bestSeller: bestIds.has(id) || r[5] === "BESTSELLER",
//     frequent: frequentIds.has(id),
//     blurb: `${r[0]} — chosen for a softer, more beautiful everyday.`,
//   };
// });

// export const COLLECTIONS = [
//   { name: "Pots", slug: "pots", kw: "plant,pot", blurb: "Planters that make every corner bloom." },
//   { name: "Bags", slug: "bags", kw: "handbag", blurb: "Carry your softness everywhere." },
//   { name: "Mirrors", slug: "mirrors", kw: "mirror,interior", blurb: "Reflect your own light." },
//   { name: "Creams", slug: "creams", kw: "cream,skincare", blurb: "Everyday comfort for your skin." },
//   { name: "Serums", slug: "serums", kw: "serum,skincare", blurb: "Targeted care, thoughtful formulas." },
//   { name: "Candles", slug: "candles", kw: "candle", blurb: "Light the mood, slow the evening." },
//   { name: "Books", slug: "home-decor", kw: "home,decor", blurb: "Little details, lived in beautifully." },
//   { name: "Throws & Linen", slug: "throws-linen", kw: "linen,bedroom", blurb: "Soft things to sink into." },
//   { name: "Tableware", slug: "tableware", kw: "ceramic,tableware", blurb: "Set the table like it matters." },
//   { name: "Self-care Basics", slug: "self-care-basics", kw: "spa,selfcare", blurb: "Rituals for the days that need you." },
// ].map((c, i) => ({
//   ...c,
//   image: img(c.kw, 300 + i, 800, 1000),
//   count: STORE_PRODUCTS.filter((p) => p.category === c.name).length,
// }));

// export const SHOP_BANNERS = [
//   { collection: "Pots", headline: "Let something green grow beside you.", text: "Hand-finished pots and planters that turn any corner into a calm little garden.", kw: "plants,home,interior" },
//   { collection: "Bags", headline: "Carry yourself softly.", text: "Everyday totes and evening clutches, made to go wherever your day goes.", kw: "handbag,fashion,woman" },
//   { collection: "Mirrors", headline: "See the light in you.", text: "Arched, rounded and gilded mirrors that make every room feel brighter.", kw: "mirror,bedroom,interior" },
//   { collection: "Candles", headline: "Light up a slower evening.", text: "Warm amber, soft vanilla and quiet lavender. Pick the mood, light the wick.", kw: "candles,cozy,evening" },
//   { collection: "Serums", headline: "Glow is a daily ritual.", text: "Gentle, targeted formulas for skin that feels as good as it looks.", kw: "skincare,serum,beauty" },
//   { collection: "Throws & Linen", headline: "Sink into something softer.", text: "Knitted throws and pure linen for the nights you owe yourself.", kw: "blanket,bedroom,cozy" },
// ];

// // export const LOVER_VIDEOS = [
// //   { id: 1, title: "Morning glow routine", product: "The Daily Glow Serum", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
// //   { id: 2, title: "Candle-lit evenings", product: "Amber Dusk Candle", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
// //   { id: 3, title: "Styling my corner", product: "Terracotta Bloom Plant Pot", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4" },
// //   { id: 4, title: "Out the door with my tote", product: "The Everyday Tote", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
// //   { id: 5, title: "Mirror check", product: "Arch Standing Mirror", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4" },
// //   { id: 6, title: "Night cream, night ritual", product: "Silk Night Cream", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" },
// //   { id: 7, title: "Sunday throw season", product: "Cloud Knit Throw", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4" },
// //   { id: 8, title: "Setting the table", product: "Stoneware Dinner Plate Set", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4" },
// //   { id: 9, title: "Bath-night basics", product: "Bath Salts — Eucalyptus", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4" },
// //   { id: 10, title: "Hydrate and go", product: "Hydra Dew Serum", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4" },
// // ];


// export type LoverVideo = {
//   id: number;
//   title: string;
//   product: string;
//   src: string;
//   sourceUrl: string;
//   duration: string;
//   muted: boolean;
//   loop: boolean;
//   playsInline: boolean;
// };


// export const LOVER_VIDEOS: LoverVideo[] = [
//   {
//     id: 1,
//     title: "Your morning glow ritual",
//     product: "The Daily Glow Serum",
//     src: "https://videos.pexels.com/video-files/6006425/6006425-hd_1920_1080_25fps.mp4",
//     sourceUrl: "https://www.pexels.com/video/a-woman-holding-a-cosmetic-product-6006425/",
//     duration: "3 seconds",
//     muted: true,
//     loop: true,
//     playsInline: true,
//   },
//   {
//     id: 2,
//     title: "A moment of deep hydration",
//     product: "Cloud Nine Moisturiser",
//     src: "https://videos.pexels.com/video-files/7614371/7614371-uhd_4096_2160_25fps.mp4",
//     sourceUrl: "https://www.pexels.com/video/woman-putting-on-skin-care-7614371/",
//     duration: "28 seconds",
//     muted: true,
//     loop: true,
//     playsInline: true,
//   },
//   {
//     id: 3,
//     title: "The soft skin ritual",
//     product: "Soft Focus Face Cream",
//     src: "https://videos.pexels.com/video-files/5422167/5422167-hd_1920_1080_25fps.mp4",
//     sourceUrl: "https://www.pexels.com/video/a-woman-applying-a-skincare-product-5422167/",
//     duration: "11 seconds",
//     muted: true,
//     loop: true,
//     playsInline: true,
//   },
//   {
//     id: 4,
//     title: "Slow evenings, warm light",
//     product: "Amber Dusk Candle",
//     src: "https://videos.pexels.com/video-files/6343716/6343716-uhd_4096_2160_30fps.mp4",
//     sourceUrl: "https://www.pexels.com/video/skin-care-product-with-candle-6343716/",
//     duration: "Product ambience",
//     muted: true,
//     loop: true,
//     playsInline: true,
//   },
//   {
//     id: 5,
//     title: "A little green moment",
//     product: "Terracotta Bloom Plant Pot",
//     src: "https://videos.pexels.com/video-files/6006425/6006425-hd_1920_1080_25fps.mp4",
//     sourceUrl: "https://www.pexels.com/video/a-woman-holding-a-cosmetic-product-6006425/",
//     duration: "Skincare and plant styling",
//     muted: true,
//     loop: true,
//     playsInline: true,
//   },
//   {
//     id: 6,
//     title: "Everyday, carried beautifully",
//     product: "The Everyday Tote",
//     src: "https://videos.pexels.com/video-files/7670013/7670013-hd_1080_1920_25fps.mp4",
//     sourceUrl: "https://www.pexels.com/video/woman-putting-on-skin-care-7670013/",
//     duration: "13 seconds",
//     muted: true,
//     loop: true,
//     playsInline: true,
//   },
//   {
//     id: 7,
//     title: "A softer view of home",
//     product: "Arch Standing Mirror",
//     src: "https://videos.pexels.com/video-files/7306060/7306060-uhd_2160_4096_25fps.mp4",
//     sourceUrl: "https://www.pexels.com/video/a-woman-applying-a-skincare-product-on-her-neck-7306060/",
//     duration: "22 seconds",
//     muted: true,
//     loop: true,
//     playsInline: true,
//   },
//   {
//     id: 8,
//     title: "Make room for softness",
//     product: "Cloud Knit Throw",
//     src: "https://videos.pexels.com/video-files/7614371/7614371-uhd_4096_2160_25fps.mp4",
//     sourceUrl: "https://www.pexels.com/video/woman-putting-on-skin-care-7614371/",
//     duration: "28 seconds",
//     muted: true,
//     loop: true,
//     playsInline: true,
//   },
//   {
//     id: 9,
//     title: "A bath-night reset",
//     product: "Bath Salts — Eucalyptus",
//     src: "https://videos.pexels.com/video-files/6343716/6343716-uhd_4096_2160_30fps.mp4",
//     sourceUrl: "https://www.pexels.com/video/skin-care-product-with-candle-6343716/",
//     duration: "Product ambience",
//     muted: true,
//     loop: true,
//     playsInline: true,
//   },
//   {
//     id: 10,
//     title: "A little ritual, every day",
//     product: "Hydra Dew Serum",
//     src: "https://videos.pexels.com/video-files/6724791/6724791-hd_1080_1920_24fps.mp4",
//     sourceUrl: "https://www.pexels.com/video/a-woman-putting-on-a-skin-serum-6724791/",
//     duration: "12 seconds",
//     muted: true,
//     loop: true,
//     playsInline: true,
//   },
// ];

// export const MARQUEE_ITEMS = [
//   "Pots", "Bags", "Mirrors", "Creams", "Serums", "Candles", "Books",
//   "Throws & Linen", "Tableware", "Self-care Basics",
// ];

// export const QUOTES = [
//   "It's literally The Soft Edit. Live beautifully.",
//   "Self-care is not selfish. It is how you refill your cup.",
//   "Make room for a softer kind of life.",
//   "Rest is a ritual, not a reward.",
//   "Be gentle with yourself. You are doing beautifully.",
//   "Small rituals, big glow.",
// ];

// export const ngn = (n: number) =>
//   new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);

// export const slugify = (s: string) => s.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");


// The Soft Edit — catalogue data.
// Product images are imported from src/images (image01 - image55).
// Replace any file in src/images with your own photo of the same name to update it.

export type StoreProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  stock: number;
  tag?: string;
  bestSeller?: boolean;
  frequent?: boolean;
  blurb: string;
};

// ---------------------------------------------------------------
// PRODUCT IMAGES — imported (55 total)
// Put image01.jpg ... image54.jpg and books.jpg inside src/images/
// ---------------------------------------------------------------
import image01 from "../images/IMG-20261027-WA0001(1).jpg";
import image02 from "../images/IMG-20261115-WA0002(1).jpg";
import image03 from "../images/IMG-20261115-WA0003(1).jpg";
import image04 from "../images/IMG-20261115-WA0004(1).jpg";
import image05 from "../images/IMG-20261115-WA0017.jpg";
import image06 from "../images/IMG-20261115-WA0018.jpg";
import image07 from "../images/IMG-20261115-WA0019.jpg";
import image08 from "../images/IMG-20261115-WA0020.jpg";
import image09 from "../images/IMG-20261115-WA0021.jpg";

import image10 from "../images/IMG-20261115-WA0022.jpg";
import image11 from "../images/IMG-20261115-WA0023.jpg";
import image12 from "../images/IMG-20261115-WA0024.jpg";
import image13 from "../images/IMG-20261115-WA0025.jpg";
import image14 from "../images/IMG-20261115-WA0026.jpg";
import image15 from "../images/IMG-20261115-WA0027.jpg";
import image16 from "../images/IMG-20261115-WA0028.jpg";
import image17 from "../images/IMG-20261115-WA0029.jpg";
import image18 from "../images/IMG-20261115-WA0030(1).jpg";
import image19 from "../images/IMG-20261115-WA0031.jpg";
import image20 from "../images/IMG-20261115-WA0032.jpg";
import image21 from "../images/IMG-20261115-WA0033.jpg";
import image22 from "../images/IMG-20261115-WA0034.jpg";
import image23 from "../images/IMG-20261115-WA0035.jpg";
import image24 from "../images/IMG-20261115-WA0036.jpg";
import image25 from "../images/IMG-20261115-WA0037.jpg";
import image26 from "../images/IMG-20261115-WA0038.jpg";
import image27 from "../images/IMG-20261115-WA0039.jpg";
import image28 from "../images/IMG-20261115-WA0040.jpg";
import image29 from "../images/IMG-20261115-WA0041.jpg";
import image30 from "../images/IMG-20261115-WA0042.jpg";
import image31 from "../images/IMG-20261115-WA0043.jpg";
import image32 from "../images/IMG-20261115-WA0044.jpg";
import image33 from "../images/IMG-20261115-WA0045.jpg";
import image34 from "../images/IMG-20261115-WA0046.jpg";
import image35 from "../images/IMG-20261115-WA0047.jpg";
import image36 from "../images/IMG-20261115-WA0048.jpg";
import image37 from "../images/IMG-20261115-WA0049.jpg";
import image38 from "../images/IMG-20261115-WA0050.jpg";
import image39 from "../images/IMG-20261115-WA0051.jpg";
import image40 from "../images/IMG-20261115-WA0052.jpg";
import image41 from "../images/IMG-20261115-WA0053.jpg";
import image42 from "../images/IMG-20261115-WA0054.jpg";
import image43 from "../images/IMG-20261115-WA0055.jpg";
import image44 from "../images/IMG-20261115-WA0056.jpg";
import image45 from "../images/IMG-20261115-WA0057.jpg";
import image46 from "../images/IMG-20261115-WA0058.jpg";
import image47 from "../images/IMG-20261115-WA0059.jpg";
import image48 from "../images/IMG-20261115-WA0060.jpg";
import image49 from "../images/IMG-20261115-WA0061.jpg";
import image50 from "../images/IMG-20261115-WA0062.jpg";
import image51 from "../images/IMG-20261115-WA0063.jpg";
// import image52 from "../images/IMG-20261115-WA0064.jpg";
import image53 from "../images/IMG-20261115-WA0065.jpg";
import image54 from "../images/IMG-20261115-WA0068.jpg";
import image55 from "../images/books.jpg";
// import image56 from "../images/IMG-20261117-WA0004.jpg";
// import image57 from "../images/IMG-20261117-WA0008.jpg";
// import image58 from "../images/IMG-20261117-WA0011.jpg";
import image59 from "../images/IMG-20261117-WA0014.jpg";
// import image60 from "../images/IMG-20261117-WA0016.jpg";
import image61 from "../images/IMG-20261117-WA0020.jpg";
import image62 from "../images/IMG-20261117-WA0022.jpg";
import image63 from "../images/IMG-20261117-WA0025.jpg";
// import image64 from "../images/IMG-20261117-WA0028.jpg";
// import image65 from "../images/IMG-20261117-WA0029.jpg";
import image66 from "../images/IMG-20261117-WA0032.jpg";
// import image67 from "../images/IMG-20261117-WA0038.jpg";
import image68 from "../images/IMG-20261117-WA0041.jpg";
import image69 from "../images/IMG-20261117-WA0044.jpg";
// import image70 from "../images/IMG-20261117-WA0047.jpg";
// import image71 from "../images/IMG-20261117-WA0051.jpg";
// import image72 from "../images/IMG-20261117-WA0054.jpg";
// import image73 from "../images/IMG-20261118-WA0001.jpg";
// import image74 from "../images/IMG-20261118-WA0002.jpg";
import image75 from "../images/IMG-20261118-WA0005.jpg";
// import image76 from "../images/IMG-20261118-WA0010.jpg";
// import image77 from "../images/IMG-20261118-WA0015.jpg";
// import image78 from "../images/IMG-20261118-WA0016.jpg";
// import image79 from "../images/IMG-20261120-WA0018.jpg";
// import image80 from "../images/IMG-20261120-WA0021.jpg";
// import image81 from "../images/IMG-20261120-WA0027.jpg";
// import image82 from "../images/IMG-20261121-WA0002.jpg";
// import image83 from "../images/IMG-20261121-WA0005.jpg";
import image84 from "../images/IMG-20261121-WA0011.jpg";
// import image85 from "../images/IMG-20261121-WA0014.jpg";
// import image86 from "../images/IMG-20261121-WA0023.jpg";
// import image87 from "../images/IMG-20261121-WA0029.jpg";
// import image88 from "../images/IMG-20261121-WA0032.jpg";
// import image89 from "../images/IMG-20261121-WA0050.jpg";
import image90 from "../images/IMG-20261121-WA0055.jpg";
// import image91 from "../images/IMG-20261121-WA0056.jpg";
// import image92 from "../images/IMG-20261121-WA0058.jpg";
// import image93 from "../images/IMG-20261121-WA0059.jpg";
import image94 from "../images/IMG-20261121-WA0060.jpg";
// import image95 from "../images/IMG-20261121-WA0061.jpg";
import image97 from "../images/IMG-20261121-WA0064.jpg";
import image98 from "../images/IMG-20261121-WA0067.jpg";
import image99 from "../images/IMG-20261121-WA0070.jpg";
import image100 from "../images/IMG-20261121-WA0073.jpg";
import image101 from "../images/IMG-20261121-WA0076.jpg";
import image102 from "../images/IMG-20261121-WA0079.jpg";
import image103 from "../images/IMG-20261121-WA0080.jpg";
import image104 from "../images/IMG-20261121-WA0089.jpg";
import image105 from "../images/IMG-20261121-WA0090.jpg";
import image106 from "../images/IMG-20261121-WA0093.jpg";
import image107 from "../images/IMG-20261121-WA0094.jpg";
import image108 from "../images/IMG-20261121-WA0097.jpg";
import image109 from "../images/IMG-20261121-WA0100.jpg";
import image110 from "../images/IMG-20261121-WA0105.jpg";
import image111 from "../images/IMG-20261121-WA0106.jpg";
import image112 from "../images/IMG-20261121-WA0109.jpg";
import image113 from "../images/IMG-20261121-WA0112.jpg";
import image114 from "../images/IMG-20261121-WA0115.jpg";
import image115 from "../images/IMG-20261121-WA0118.jpg";
import image116 from "../images/IMG-20261121-WA0119.jpg";
import image119 from "../images/IMG-20261121-WA0120.jpg";
import image120 from "../images/IMG-20261121-WA0121.jpg";
import image121 from "../images/IMG-20261121-WA0122.jpg";
import image122 from "../images/IMG-20261121-WA0123.jpg";
import image123 from "../images/IMG-20261121-WA0124.jpg";
import image124 from "../images/IMG-20261121-WA0125.jpg";
import image125 from "../images/IMG-20261121-WA0126.jpg";
import image126 from "../images/IMG-20261121-WA0127.jpg";
import image127 from "../images/IMG-20261121-WA0128.jpg";
import image128 from "../images/IMG-20261121-WA0131.jpg";
import image129 from "../images/IMG-20261121-WA0134.jpg";
import image130 from "../images/IMG-20261121-WA0137.jpg";
import image131 from "../images/IMG-20261121-WA0140.jpg";
import image132 from "../images/IMG-20261121-WA0143.jpg";
import image133 from "../images/IMG-20261121-WA0146.jpg";
import image134 from "../images/IMG-20261121-WA0149.jpg";
import image135 from "../images/IMG-20261121-WA0152.jpg";
import image136 from "../images/IMG-20261121-WA0155.jpg";
import image137 from "../images/IMG-20261121-WA0158.jpg";
import image138 from "../images/IMG-20261121-WA0161.jpg";
import image139 from "../images/IMG-20261121-WA0164.jpg";
// import image140 from "../images/IMG-20261121-WA0167.jpg";
import image141 from "../images/IMG-20261121-WA0170.jpg";
import image142 from "../images/IMG-20261121-WA0173.jpg";
import image143 from "../images/IMG-20261121-WA0176.jpg";
import image144 from "../images/IMG-20261121-WA0179.jpg";
import image145 from "../images/IMG-20261121-WA0182.jpg";
import image146 from "../images/IMG-20261121-WA0185.jpg";
// import image147 from "../images/IMG-20261123-WA0026(1).jpg";

// import image123 from "../images/IMG-20261121-WA0124.jpg";

// Same order as the rows below:
// image01 = first product, image55 = The Soft Edit Books.
const PRODUCT_IMAGES: string[] = [
  image01, image02, image03, image04, image05,
  image06, image07, image08, image09, image10,
  image11, image12, image13, image14, image15,
  image16, image17, image18, image19, image20,
  image21, image22, image23, image24, image25,
  image26, image27, image28, image29, image30,
  image31, image32, image33, image34, image35,
  image36, image37, image38, image39, image40,
  image41, image42, image43, image44, image45,
  image46, image47, image48, image49, image50,
  image51,  image53, image54, image55,
  image59,
  image61, image62, image63,
  image66, image68,   image75, 
  // image76, image77, image78, image79, image80,
   image84,
   image90,   image94, 
  image69, image97, image98, image99, image100,
  image101,image102,image103,image104,image105,
  image106, image107, image108, image109, image110,
  image111, image112, image113, image114, image115,
  image116, image119, image120, image121, image122,
  image123, image124, image125, image126, image127,
  image128, image129, image130, image131, image132, 
  image133, image134, image135, image136, image137,
  image138, image139, image141, image142,
  image143, image144, image145, image146 
  
];

// ---------------------------------------------------------------
// COLLECTION COVER IMAGES
// ---------------------------------------------------------------
const img = (kw: string, id: number, w = 700, h = 880) => {
  const photos: Record<string, string[]> = {
    terracotta: [
      "photo-1485955900006-10f4d324d411",
      "photo-1416879595882-3373a0480b5b",
    ],
    ceramic: [
      "photo-1578500494198-246f612d3b3d",
      "photo-1578749556568-bc2c40e68b61",
    ],
    stone: [
      "photo-1578749556568-bc2c40e68b61",
      "photo-1610701596007-11502861dcfa",
    ],
    rattan: [
      "photo-1594818379496-da1e345b0ded",
      "photo-1616486338812-3dadae4b4ace",
    ],
    green: [
      "photo-1485955900006-10f4d324d411",
      "photo-1416879595882-3373a0480b5b",
    ],
    succulent: [
      "photo-1501004318641-b39e6451bec6",
      "photo-1485955900006-10f4d324d411",
    ],
    tote: [
      "photo-1544816155-12df9643f363",
      "photo-1584917865442-de89df76afd3",
    ],
    handbag: [
      "photo-1584917865442-de89df76afd3",
      "photo-1590874103328-eac38a683ce7",
    ],
    mini: [
      "photo-1584917865442-de89df76afd3",
      "photo-1590874103328-eac38a683ce7",
    ],
    raffia: [
      "photo-1590874103328-eac38a683ce7",
      "photo-1584917865442-de89df76afd3",
    ],
    clutch: [
      "photo-1584917865442-de89df76afd3",
      "photo-1590874103328-eac38a683ce7",
    ],
    canvas: [
      "photo-1544816155-12df9643f363",
      "photo-1584917865442-de89df76afd3",
    ],
    arch: [
      "photo-1618221195710-dd6b41faaea6",
      "photo-1616486338812-3dadae4b4ace",
    ],
    round: [
      "photo-1616486338812-3dadae4b4ace",
      "photo-1618221195710-dd6b41faaea6",
    ],
    wall: [
      "photo-1616486338812-3dadae4b4ace",
      "photo-1618221195710-dd6b41faaea6",
    ],
    vanity: [
      "photo-1618221195710-dd6b41faaea6",
      "photo-1616486338812-3dadae4b4ace",
    ],
    cream: [
      "photo-1556228720-195a672e8a03",
      "photo-1601049541289-9b1b7bbbfe19",
    ],
    moisturizer: [
      "photo-1608248543803-ba4f8c70ae0b",
      "photo-1556229010-6c3f2c9ca5f8",
    ],
    shea: [
      "photo-1601049541289-9b1b7bbbfe19",
      "photo-1556228720-195a672e8a03",
    ],
    night: [
      "photo-1556229010-6c3f2c9ca5f8",
      "photo-1608248543803-ba4f8c70ae0b",
    ],
    hand: [
      "photo-1601049541289-9b1b7bbbfe19",
      "photo-1556228720-195a672e8a03",
    ],
    sunscreen: [
      "photo-1556228720-195a672e8a03",
      "photo-1608248543803-ba4f8c70ae0b",
    ],
    serum: [
      "photo-1608248543803-ba4f8c70ae0b",
      "photo-1601049541289-9b1b7bbbfe19",
    ],
    hyaluronic: [
      "photo-1608248543803-ba4f8c70ae0b",
      "photo-1556229010-6c3f2c9ca5f8",
    ],
    vitamin: [
      "photo-1556229010-6c3f2c9ca5f8",
      "photo-1608248543803-ba4f8c70ae0b",
    ],
    skincare: [
      "photo-1601049541289-9b1b7bbbfe19",
      "photo-1608248543803-ba4f8c70ae0b",
    ],
    rose: [
      "photo-1556229010-6c3f2c9ca5f8",
      "photo-1608248543803-ba4f8c70ae0b",
    ],
    candle: [
      "photo-1603006905003-be475563bc59",
      "photo-1602874801007-bd458bb1b8b6",
    ],
    amber: [
      "photo-1603006905003-be475563bc59",
      "photo-1602874801007-bd458bb1b8b6",
    ],
    vanilla: [
      "photo-1603006905003-be475563bc59",
      "photo-1602874801007-bd458bb1b8b6",
    ],
    lavender: [
      "photo-1603006905003-be475563bc59",
      "photo-1602874801007-bd458bb1b8b6",
    ],
    sandalwood: [
      "photo-1603006905003-be475563bc59",
      "photo-1602874801007-bd458bb1b8b6",
    ],
    votive: [
      "photo-1602874801007-bd458bb1b8b6",
      "photo-1603006905003-be475563bc59",
    ],
    reed: [
      "photo-1603006905003-be475563bc59",
      "photo-1602874801007-bd458bb1b8b6",
    ],
    home: [
      "photo-1616486338812-3dadae4b4ace",
      "photo-1618221195710-dd6b41faaea6",
    ],
    pampas: [
      "photo-1616486338812-3dadae4b4ace",
      "photo-1618221195710-dd6b41faaea6",
    ],
    linen: [
      "photo-1616486338812-3dadae4b4ace",
      "photo-1618221195710-dd6b41faaea6",
    ],
    marble: [
      "photo-1616486338812-3dadae4b4ace",
      "photo-1618221195710-dd6b41faaea6",
    ],
    botanical: [
      "photo-1497250681960-ef046c08a56e",
      "photo-1485955900006-10f4d324d411",
    ],
    knit: [
      "photo-1616486338812-3dadae4b4ace",
      "photo-1618221195710-dd6b41faaea6",
    ],
    pillow: [
      "photo-1616486338812-3dadae4b4ace",
      "photo-1618221195710-dd6b41faaea6",
    ],
    velvet: [
      "photo-1616486338812-3dadae4b4ace",
      "photo-1618221195710-dd6b41faaea6",
    ],
    silk: [
      "photo-1616486338812-3dadae4b4ace",
      "photo-1618221195710-dd6b41faaea6",
    ],
    bath: [
      "photo-1601049541289-9b1b7bbbfe19",
      "photo-1556228720-195a672e8a03",
    ],
    stoneware: [
      "photo-1490312278390-ab64016e0aa9",
      "photo-1578749556568-bc2c40e68b61",
    ],
    glazed: [
      "photo-1578749556568-bc2c40e68b61",
      "photo-1490312278390-ab64016e0aa9",
    ],
    gold: [
      "photo-1490312278390-ab64016e0aa9",
      "photo-1578749556568-bc2c40e68b61",
    ],
    crystal: [
      "photo-1490312278390-ab64016e0aa9",
      "photo-1578749556568-bc2c40e68b61",
    ],
    bamboo: [
      "photo-1601049541289-9b1b7bbbfe19",
      "photo-1616486338812-3dadae4b4ace",
    ],
    jade: [
      "photo-1556229010-6c3f2c9ca5f8",
      "photo-1608248543803-ba4f8c70ae0b",
    ],
    journal: [
      "photo-1544816155-12df9643f363",
      "photo-1455390582262-044cdead277a",
    ],
    spa: [
      "photo-1601049541289-9b1b7bbbfe19",
      "photo-1556229010-6c3f2c9ca5f8",
    ],
  };

  const keyword = kw.split(",")[0].trim().toLowerCase();
  const options = photos[keyword] ?? photos.home;
  const photoId = options[(id - 1) % options.length];

  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${w}&h=${h}&q=85`;
};

type Row = [string, string, number, string, number, string?];

const rows: Row[] = [
  // Pots
  ["Polythene bag", "Masks", 2500, "terracotta,plant,pot", 12, "BESTSELLER"],
  ["Stylpro Wavelength Masks", "Pots", 247000, "ceramic,planter", 9],
  ["Cyro Rubber Mask", "Masks", 36900, "stone,pot,plant", 7],
  ["Neck and Chest Mask", "Masks", 28600, "rattan,basket,plant", 14],
  ["L'occitane cream", "Cream", 58900, "green,ceramic,vase", 6, "NEW"],
  ["Byoma Hydrating Toner", "Toner", 29400, "succulent,pot", 18],

  // Bags
  ["Aveeno Body Oil", "oil", 34500, "tote,bag,leather", 8, "BESTSELLER"],
  ["Ex-callus Exfoliating Socks", "Bags", 9500, "handbag,fashion", 5],
  ["Round-lab Toner 150ml", "Bags", 39500, "mini,handbag", 10],
  ["Medicube Collagen Jelly Cream", "Bags", 33000, "raffia,bag", 11, "NEW"],
  ["Exfoliating Toner", "Bags", 39000, "clutch,bag", 7],
  ["Healthy Foot Cream", "Creams", 18999, "canvas,tote,bag", 20],

  // Mirrors
  ["Fenty Body Wash", "Mirrors", 64000, "arch,mirror,interior", 4, "THE EDIT"],
  ["Dr. Sam's Cleanser", "Mirrors", 53500, "round,mirror,gold", 6],
  ["Naturium Body Wash", "Mirrors", 48500, "wall,mirror,decor", 5],
  ["Rose Toes Footmask", "Mirrors", 20800, "vanity,mirror,makeup", 16],
  ["Cerave Foaming Cleanser", "Mirrors", 63900, "rattan,mirror", 3],

  // Creams
  ["Dove Moisturizing Cream", "Creams", 2800, "face,cream,jar", 5, "BESTSELLER"],
  ["Vitamin C glowing mask", "Creams", 3500, "moisturizer,cream", 9],
  ["The Round lab toner 100ml", "Creams", 23200, "shea,butter,skincare", 13],
  ["Sakura Lip Mask", "Creams", 2500, "night,cream,skincare", 6],
  ["Laneige Moisturizer", "Creams", 55000, "hand,cream", 22],
  ["Collagen Lip Mask", "Creams", 2500, "sunscreen,skincare", 10, "NEW"],

  // Serum
  ["Cudalie Serum", "Serums", 89300, "serum,dropper", 4, "BESTSELLER"],
  ["Sakura Eye Mask", "Serums", 2500, "hyaluronic,serum", 7],
  ["Mint Foot Lotion", "Serums", 9580, "vitamin,serum", 5],
  ["Glycolic Body Wash", "Serums", 41000, "skincare,bottle", 3],
  ["Rhode Facial Ceramide", "Serums", 76600, "rose,mist,spray", 15],

  // Candles
  ["Milk Hydrating Mask", "Candles", 3500, "candle,amber", 14, "BESTSELLER"],
  ["Hydrating Socks", "Candles", 13500, "vanilla,candle", 17],
  ["Collagen Lip Mask", "Candles", 12800, "lavender,candle", 11],
  ["Fenty skin toner", "Candles", 79000, "sandalwood,candle", 8],
  ["Collagen Eye Mask", "Candles", 2500, "votive,candle", 19],
  ["Sunscreen Spf 50", "Candles", 27000, "reed,diffuser", 9, "NEW"],

  // Home Decor
  ["Fenty  Beauty Lip gloss", "Home Decor", 35999, "ceramic,vase", 6, "THE EDIT"],
  ["Dried Pampas Bundle", "Home Decor", 165000, "pampas,grass", 12],
  ["Collagen gel mask", "Home Decor", 25800, "linen,table,runner", 10],
  ["Pore pad", "Home Decor", 39000, "marble,tray", 8],
  ["Perfume Oil", "Home Decor", 6500, "botanical,print,frame", 7],

  // Throws & Linen
  ["Fenty body wash", "Throws & Linen", 64000, "knit,throw,blanket", 6, "BESTSELLER"],
  ["Sports Armband", "Throws & Linen", 20000, "linen,pillow,bedroom", 12],
  ["Keepsake boxes", "Throws & Linen", 36900, "velvet,cushion", 15],
  ["Fenty beauty lig gloss", "Throws & Linen", 35999, "silk,sleep,mask", 20, "NEW"],
  ["rhode cream", "Throws & Linen", 42500, "bath,towel,spa", 9],

  // Tableware
  ["Biodance Seakelp mask", "Tableware", 36900, "stoneware,plates", 7],
  ["Pro-collagen cleansing balm", "Tableware", 131794, "ceramic,mug,coffee", 16],
    ["Biodance bio-collagen mask", "Tableware", 36900, "stoneware,plates", 7],
  // ["Gold Cutlery Set", "Tableware", 28800, "gold,cutlery", 5, "THE EDIT"],
  ["Roundlab toner", "Tableware", 36900, "crystal,glass,tumbler", 11],
  ["Rhode lip gloss", "Tableware", 24800, "teapot,tea,ceramic", 6],

  // Self-care Basics
  ["Baylis & Harding present boxes", "Self-care Basics", 36900, "bath,tray,bamboo", 7],
  ["Thrill seeker glassy gloss", "Self-care Basics", 22500, "jade,roller,skincare", 18],
  // ["Silk Scrunchie Set", "Self-care Basics", 6200, "silk,scrunchie", 25, "NEW"],
  ["Premium Incense cones ", "Self-care Basics", 7800, "bath,salts,spa", 14],
  ["Foot Scrub", "Self-care Basics", 1000, "journal,notebook,pen", 13, "BESTSELLER"],

  // Books
  ["The Soft Edit Journal", "Books", 14990 , "journal,book", 24, "NEW"],
  ["Feminelle Body-wash ", "Self-care Basics", 16790, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Whole body deodorant", "Self-care Basics", 14900, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
    ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
      ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
    ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
      ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
    ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal, notebook, pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],  
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"], 
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
    ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
    ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
    ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],
  // ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],


  


  
      //  ["Feminelle Body-wash ", "Self-care Basics", 14990, "journal,notebook,pen", 13, "BESTSELLER"],




        










  



            



];

const bestIds = new Set([1, 7, 13, 18, 23, 28, 41, 46, 52, 36]);
const frequentIds = new Set([2, 9, 16, 19, 21, 26, 29, 30, 33, 38, 42, 45, 47, 50, 51]);

export const STORE_PRODUCTS: StoreProduct[] = rows.map((r, i) => {
  const id = i + 1;

  return {
    id: 100 + id,
    name: r[0],
    category: r[1],
    price: r[2],
    image: PRODUCT_IMAGES[i],
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
  { name: "Books", slug: "books", kw: "journal,book", blurb: "A little inspiration for a softer everyday." },
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

// ---------------------------------------------------------------
// LOVER VIDEOS
// ---------------------------------------------------------------
export type LoverVideo = {
  id: number;
  title: string;
  product: string;
  src: string;
  sourceUrl: string;
  duration: string;
  muted: boolean;
  loop: boolean;
  playsInline: boolean;
};

export const LOVER_VIDEOS: LoverVideo[] = [
  {
    id: 1,
    title: "Your morning glow ritual",
    product: "The Daily Glow Serum",
    src: "https://videos.pexels.com/video-files/6006425/6006425-hd_1920_1080_25fps.mp4",
    sourceUrl: "https://www.pexels.com/video/a-woman-holding-a-cosmetic-product-6006425/",
    duration: "3 seconds",
    muted: true,
    loop: true,
    playsInline: true,
  },
  {
    id: 2,
    title: "A moment of deep hydration",
    product: "Cloud Nine Moisturiser",
    src: "https://videos.pexels.com/video-files/7614371/7614371-uhd_4096_2160_25fps.mp4",
    sourceUrl: "https://www.pexels.com/video/woman-putting-on-skin-care-7614371/",
    duration: "28 seconds",
    muted: true,
    loop: true,
    playsInline: true,
  },
  {
    id: 3,
    title: "The soft skin ritual",
    product: "Soft Focus Face Cream",
    src: "https://videos.pexels.com/video-files/5422167/5422167-hd_1920_1080_25fps.mp4",
    sourceUrl: "https://www.pexels.com/video/a-woman-applying-a-skincare-product-5422167/",
    duration: "11 seconds",
    muted: true,
    loop: true,
    playsInline: true,
  },
  {
    id: 4,
    title: "Slow evenings, warm light",
    product: "Amber Dusk Candle",
    src: "https://videos.pexels.com/video-files/6343716/6343716-uhd_2160_4096_30fps.mp4",
    sourceUrl: "https://www.pexels.com/video/skin-care-product-with-candle-6343716/",
    duration: "Product ambience",
    muted: true,
    loop: true,
    playsInline: true,
  },
  {
    id: 5,
    title: "A little green moment",
    product: "Terracotta Bloom Plant Pot",
    src: "https://videos.pexels.com/video-files/6006425/6006425-hd_1920_1080_25fps.mp4",
    sourceUrl: "https://www.pexels.com/video/a-woman-holding-a-cosmetic-product-6006425/",
    duration: "Skincare and plant styling",
    muted: true,
    loop: true,
    playsInline: true,
  },
  {
    id: 6,
    title: "Everyday, carried beautifully",
    product: "The Everyday Tote",
    src: "https://videos.pexels.com/video-files/7670013/7670013-hd_1080_1920_25fps.mp4",
    sourceUrl: "https://www.pexels.com/video/woman-putting-on-skin-care-7670013/",
    duration: "13 seconds",
    muted: true,
    loop: true,
    playsInline: true,
  },
  {
    id: 7,
    title: "A softer view of home",
    product: "Arch Standing Mirror",
    src: "https://videos.pexels.com/video-files/7306060/7306060-uhd_2160_4096_25fps.mp4",
    sourceUrl: "https://www.pexels.com/video/a-woman-applying-a-skincare-product-on-her-neck-7306060/",
    duration: "22 seconds",
    muted: true,
    loop: true,
    playsInline: true,
  },
  {
    id: 8,
    title: "Make room for softness",
    product: "Cloud Knit Throw",
    src: "https://videos.pexels.com/video-files/7614371/7614371-uhd_4096_2160_25fps.mp4",
    sourceUrl: "https://www.pexels.com/video/woman-putting-on-skin-care-7614371/",
    duration: "28 seconds",
    muted: true,
    loop: true,
    playsInline: true,
  },
  {
    id: 9,
    title: "A bath-night reset",
    product: "Bath Salts — Eucalyptus",
    src: "https://videos.pexels.com/video-files/6343716/6343716-uhd_2160_4096_30fps.mp4",
    sourceUrl: "https://www.pexels.com/video/skin-care-product-with-candle-6343716/",
    duration: "Product ambience",
    muted: true,
    loop: true,
    playsInline: true,
  },
  {
    id: 10,
    title: "A little ritual, every day",
    product: "Hydra Dew Serum",
    src: "https://videos.pexels.com/video-files/6724791/6724791-hd_1080_1920_24fps.mp4",
    sourceUrl: "https://www.pexels.com/video/a-woman-putting-on-a-skin-serum-6724791/",
    duration: "12 seconds",
    muted: true,
    loop: true,
    playsInline: true,
  },
];

export const MARQUEE_ITEMS = [
  "Pots",
  "Bags",
  "Mirrors",
  "Creams",
  "Serums",
  "Candles",
  "Books",
  "Throws & Linen",
  "Tableware",
  "Self-care Basics",
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
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

