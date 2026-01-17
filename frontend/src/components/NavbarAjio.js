import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import { FaRegHeart, FaSearch, FaShoppingBag } from "react-icons/fa";
import "./ajioHome.css";


const MENU_DATA = {
  MEN: {
    brandsColumns: [
      {
        heading: "PREMIUM BRANDS",
        links: [
          "ANDAMEN",
          "ARMANI EXCHANGE",
          "BROOKS BROTHERS",
          "CONVERSE",
          "GANT",
          "GAP",
          "GAS",
          "LA MARTINA",
          "STEVE MADDEN",
          "SUPERDRY",
          "TOMMY HILFIGER",
        ],
      },
      {
        heading: "WESTERN WEAR",
        links: [
          "ALLEN SOLLY",
          "ARROW",
          "FORT COLLINS",
          "H&M",
          "LEE COOPER",
          "LEVIS",
          "LOUIS PHILIPPE",
          "PERFORMAX",
          "PUMA",
          "RARE RABBIT",
        ],
      },
      {
        heading: "EXCLUSIVE BRANDS",
        links: [
          "ALPHA TRIBE",
          "ASOS",
          "BUDA JEANS CO",
          "DNMX",
          "JOHN PLAYERS",
          "NETPLAY",
          "SHEIN",
          "TEAMSPIRIT",
        ],
      },
      {
        heading: "ETHNIC WEAR",
        links: ["FABINDIA", "JOMPERS", "KISAH", "MANYAVAR", "SAMAV", "SOJANYA", "VASTRAMAY"],
      },
      {
        heading: "FOOTWEAR",
        links: ["ADIDAS", "ASICS", "CLARKS", "CROCS", "NEW BALANCE", "NIKE", "PUMA", "RED TAPE", "SKECHERS"],
      },
    ],

    leftTitle: "Shop By:",
    leftTabs: ["CATEGORIES", "BRANDS"],
    leftCategories: [
      { title: "CLOTHING", items: [] },
      { title: "FOOTWEAR", items: [] },
      { title: "ACCESSORIES", items: [] },
      { title: "ALL THATS NEW", items: ["Clothing", "Footwear", "Accessories"] },
      { title: "AJIO GLOBAL", items: [] },
      { title: "PLUS SIZE", items: [] },
      { title: "NIGHT & LOUNGEWEAR", items: [] },
      { title: "GROOMING", items: ["NEW"] },
      { title: "WINTERWEAR", items: ["Blazers & Waistcoats", "Jackets & Coats", "Sweaters & Cardigans", "Sweatshirts & Hoodie"] },
    ],
    columns: [
      {
        heading: "WESTERN WEAR",
        links: ["Jeans", "Shirts", "Shorts & 3/4ths", "Suit Sets", "Track Pants", "Tracksuits", "Trousers & Pants", "Tshirts"],
      },
      {
        heading: "FOOTWEAR",
        links: ["Boots", "Casual Shoes", "Flip Flops & Slippers", "Formal Shoes", "Sandals", "Sneakers", "Sports Shoes"],
      },
      {
        heading: "ETHNIC WEAR",
        links: ["Ethnic Jackets", "Ethnic Suit Sets", "Kurtas", "Pyjamas & Churidars", "Sherwani Sets", "Stoles"],
      },
      {
        heading: "INNERWEAR",
        links: ["Boxers", "Briefs", "Pyjamas", "Thermal Wear", "Trunks"],
      },
      {
        heading: "ACCESSORIES",
        links: ["Backpacks", "Belts", "Caps & Hats", "Luggage & Trolley Bags", "Perfumes & Colognes", "Socks", "Sunglasses", "Wallets", "Watches"],
      },
      {
        heading: "JEWELLERY",
        links: ["Bracelets & Kadas", "Chains", "Cufflinks & Tiepins", "Earrings", "Rings"],
      },
      {
        heading: "GADGETS",
        links: ["Smart Wearables", "Fitness Gadgets", "Headphones", "Speakers"],
      },
    ],
  },

  WOMEN: {
  leftTitle: "Shop By:",
  leftTabs: ["CATEGORIES", "BRANDS"],

  leftCategories: [
    { title: "CLOTHING", items: [] },
    { title: "FOOTWEAR", items: [] },
    { title: "ACCESSORIES", items: [] },
    { title: "ALL THATS NEW", items: [] },
    { title: "AJIO GLOBAL", items: [] },
    { title: "CURVE SIZE", items: [] },
    { title: "NIGHT & LOUNGEWEAR", items: [] },
    { title: "BEAUTY", items: [] },
    { title: "ATHLEISURE", items: [] },
    { title: "WINTERWEAR", items: [] },
  ],

  columns: [
    {
      heading: "FOOTWEAR",
      links: ["Boots", "Casual Shoes", "Flip Flops & Slipper", "Sandals", "Sneakers", "Sports Shoes"],
    },
    {
      heading: "WESTERN WEAR",
      links: ["Dresses", "Jeans & Jeggings", "Tops", "Trousers & Pants", "Tshirts", "Track Pants", "Shirts", "Leggings", "Co-Ord Sets"],
    },
    {
      heading: "ACCESSORIES",
      links: ["Backpacks", "Belts", "Caps & Hats", "Clutches & Wristlets", "Handbags", "Shawls & Wraps", "Socks & Stockings", "Stoles & Scarves", "Sunglasses", "Wallets", "Watches"],
    },
    {
      heading: "ETHNIC WEAR",
      links: ["Co-Ord Sets", "Dresses & Gowns", "Kurta Suit Sets", "Kurta-Bottom Set", "Kurtas", "Kurtis & Tunics", "Lehenga Choli Sets", "Salwars & Churidars", "Sarees"],
    },
    {
      heading: "GADGETS",
      links: ["Smart Wearables", "Fitness Gadgets", "Headphones", "Speakers"],
    },
    {
      heading: "JEWELLERY",
      links: ["Gold And Silver Idols & Coins", "Gold And Diamond Jewellery", "Silver Jewellery", "Fashion Jewellery"],
    },
    {
      heading: "LINGERIE & INNERWEAR",
      links: ["Bras", "Night & Lounge Wear Sets", "Night Shirts & Nighties", "Panties", "Pyjamas & Shorts", "Shapewear", "Thermal Wear"],
    },
  ],

  brandsColumns: [
    { heading: "TOP BRANDS", links: ["BIBA", "W", "AURELIA", "GLOBAL DESI", "ONLY", "VERO MODA"] },
    { heading: "FOOTWEAR", links: ["PUMA", "ADIDAS", "NIKE", "SKECHERS"] },
    { heading: "ACCESSORIES", links: ["CAPRESE", "LAVIE", "BAGGIT", "FOSSIL"] },
    { heading: "BEAUTY", links: ["LAKME", "MAYBELLINE", "LOREAL", "NYKAA"] },
  ],
},

  KIDS: {
  leftTitle: "Shop By:",
  leftTabs: ["CATEGORIES", "BRANDS"],
  leftCategories: [
    { title: "CLOTHING", items: [] },
    { title: "FOOTWEAR", items: [] },
    { title: "ACCESSORIES", items: [] },
    { title: "ALL THATS NEW", items: ["Clothing", "Footwear", "Accessories"] },
    { title: "TOYS", items: [] },
    {
      title: "SHOP BY AGE",
      items: ["0 To 2 Years", "3 To 5 Years", "6 To 8 Years", "9 To 12 Years", "12 Years And Above"],
    },
  ],

  columns: [
    {
      heading: "WINTERWEAR",
      links: ["Jackets & Coats", "Jackets & Shrugs", "Sweaters & Cardigans", "Sweatshirts & Hoodie", "Sweatshirts & Jacket"],
    },
    { heading: "BOYS", links: ["Jeans", "Shirts", "Shorts & 3/4ths", "Track Pants", "Trousers & Pants", "Tshirts"] },
    { heading: "GIRLS", links: ["Dresses & Frocks", "Jeans & Jeggings", "Leggings", "Tops & Tunics", "Tshirts"] },
    { heading: "INFANTS", links: ["2 Piece-Sets", "Dungarees & Playsuit", "Rompers & Onesies", "Sets", "Winterwear"] },
    { heading: "FOOTWEAR", links: ["Shoes", "Sneakers", "Casual Shoes", "Sandals", "Flip Flops & Slipper", "School Shoes"] },
    {
      heading: "ACCESSORIES",
      links: [
        "Backpacks",
        "Socks & Stockings",
        "Baby Bed & Furniture",
        "Creative & Educational",
        "BathGroom & Diaper",
        "Sport Games & Equipment",
      ],
    },

    // ✅ EXTRA like AJIO
    { heading: "FEATURED BRANDS", links: ["ADIDAS KIDS", "BUMZEE", "GAP KIDS", "HELLCAT", "HOPSCOTCH", "KUCHIPOO", "MAX"] },
    { heading: "AJIO EXCLUSIVES", links: ["INF FRENDZ", "KG FRENDZ", "YB DNMX", "RIO GIRLS", "TEAMSPIRIT"] },
  ],
},


  "HOME & KITCHEN": {
  leftTitle: "Shop By:",
  leftTabs: ["CATEGORIES", "BRANDS"],

leftCategories: [
  {
    title: "BED LINEN",
    items: [
      "Bedsheets",
      "Bedding Sets",
      "Blankets, Dohars & Quilts",
      "Comforters",
      "Bed Covers",
      "Mattress Protectors",
      "Quilt & Duvet Covers",
    ],
  },
  {
    title: "CUSHIONS & PILLOWS",
    items: [
      "Cushions",
      "Pillows",
      "Bed Wedges & Neck Pillows",
      "Bolsters",
      "Cushion Covers",
      "Pillow Covers",
    ],
  },
  { title: "RUGS, CARPETS & MATS", items: [] },

  {
    title: "CURTAIN & ACCESSORIES",
    items: ["Window Curtains", "Door Curtains"],
  },

  {
    title: "KITCHEN",
    items: [
      "Cookware & Cutlery",
      "Bakeware",
      "Kitchen Tools",
      "Kitchen Aprons, Gloves & Towel",
      "Kitchen Organisers",
    ],
  },

  {
    title: "DINING",
    items: [
      "Serveware & Drinkware",
      "Table Linen Sets",
      "Table Covers & Runners",
      "Table Napkins",
      "Placemats & Coasters",
    ],
  },

  {
    title: "HOME DECOR",
    items: [
      "Wall Decor",
      "Wall Shelves",
      "Clocks",
      "Photo Frames",
      "Mirrors",
      "Lamp, Diyas & Candle",
      "Home Fragrance",
      "Plants & Flowers",
    ],
  },

  {
    title: "FESTIVE GIFTS",
    items: [
      "Bells & Wind Chimes",
      "Decorative Pots, Plates & Jars",
      "Fengshui",
      "Indoor Fountains",
      "Religious Idols",
      "Vases",
    ],
  },

  { title: "GARDENING & PLANTERS", items: [] },

  {
    title: "BATH",
    items: [
      "Bath Towel & Robes",
      "Hand & Face Towels",
      "Towel Sets",
      "Bath Curtains & Mats",
      "Bathroom Organisers",
      "Laundry Baskets & Dryers",
      "Holders & More",
    ],
  },

  { title: "HOME ESSENTIALS", items: [] },

  {
    title: "FEATURED STORIES",
    items: [
      "GIFT For Everyone Under 999",
      "Winter Carnival Upto 60",
      "Kids Room Min 40",
      "Heritage Of India",
    ],
  },
],
columns: [
  { heading: "BED LINEN", links: ["Bedsheets","Bedding Sets","Blankets, Dohars & Quilts","Comforters","Bed Covers","Mattress Protectors","Quilt & Duvet Covers"] },
  { heading: "CUSHIONS & PILLOWS", links: ["Cushions","Pillows","Bed Wedges & Neck Pillows","Bolsters","Cushion Covers","Pillow Covers"] },
  { heading: "RUGS, CARPETS & MATS", links: [] },
  { heading: "CURTAIN & ACCESSORIES", links: ["Window Curtains","Door Curtains"] },
  { heading: "KITCHEN", links: ["Cookware & Cutlery","Bakeware","Kitchen Tools","Kitchen Aprons, Gloves & Towel","Kitchen Organisers"] },
  { heading: "DINING", links: ["Serveware & Drinkware","Table Linen Sets","Table Covers & Runners","Table Napkins","Placemats & Coasters"] },
  { heading: "HOME DECOR", links: ["Wall Decor","Wall Shelves","Clocks","Photo Frames","Mirrors","Lamp, Diyas & Candle","Home Fragrance","Plants & Flowers"] },
  { heading: "FESTIVE GIFTS", links: ["Bells & Wind Chimes","Decorative Pots, Plates & Jars","Fengshui","Indoor Fountains","Religious Idols","Vases"] },
  { heading: "GARDENING & PLANTERS", links: [] },
  { heading: "BATH", links: ["Bath Towel & Robes","Hand & Face Towels","Towel Sets","Bath Curtains & Mats","Bathroom Organisers","Laundry Baskets & Dryers","Holders & More"] },
  { heading: "HOME ESSENTIALS", links: [] },
  { heading: "FEATURED STORIES", links: ["GIFT For Everyone Under 999","Winter Carnival Upto 60","Kids Room Min 40","Heritage Of India"] },
],


  // ✅ BRANDS section
  brandsColumns: [
    { heading: "TOP BRANDS", links: ["HOME CENTRE", "SPACES", "MASPAR", "PORTICO", "CORTINA", "D'DECOR", "TRIDENT", "BOMBAY DYEING"] },
    { heading: "KITCHEN", links: ["MILTON", "PRESTIGE", "PIGEON", "WONDERCHEF", "CELLO", "BOROSIL", "TUPPERWARE"] },
    { heading: "BED & BATH", links: ["MARKS & SPENCER", "SPACES", "MASPAR", "PORTICO", "TRIDENT"] },
    { heading: "DECOR", links: ["FOYER", "H&M HOME", "THE WHITE WILLOW", "CHUMBAK", "HOME SIZZLER"] },
    { heading: "APPLIANCES", links: ["PHILIPS", "BAJAJ", "HAVELLS", "MORPHY RICHARDS", "USHA"] },
  ],
},
}

export default function NavbarAjio() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);


  const [openMenu, setOpenMenu] = useState(null);
  const [activeTab, setActiveTab] = useState("CATEGORIES");
  const [selectedLeftIndex, setSelectedLeftIndex] = useState(0);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = ["MEN", "WOMEN", "KIDS", "HOME & KITCHEN"];

const currentMenu = openMenu ? MENU_DATA[openMenu.trim()] : null;

  const handleHover = (menuName) => {
    setOpenMenu(menuName);
    setActiveTab("CATEGORIES");
    setSelectedLeftIndex(0);
  };

  const handleClick = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
    setActiveTab("CATEGORIES");
    setSelectedLeftIndex(0);
  };

  return (
    <div className="ajioNavWrap">
      <div className="ajioTopNav">
        <div className="ajioTopRight">
          <span onClick={() => setShowLogin(true)} className="topLink">

            Sign In / Join AJIO
          </span>
          <span className="topLink">Customer Care</span>
          <span className="topBlack">Visit AJIOLUXE</span>
        </div>
      </div>

      <div className="ajioMainNav">
        <div className="ajioLogo" onClick={() => navigate("/")}>
          AJIO
        </div>

        <div className="ajioMenu">
          {navItems.map((item) => (
            <div
              key={item}
              className={`ajioMenuItem ${openMenu === item ? "active" : ""}`}
              onMouseEnter={() => handleHover(item)}
              onClick={() => handleClick(item)}
            >
              {item} <span className="chev">⌄</span>
            </div>
          ))}
        </div>

        <div className="ajioSearchWrap">
          <div className="ajioSearch">
            <input placeholder="Search AJIO" />
            <FaSearch className="searchIcon" />
          </div>

          <div className="ajioIcons">
            <div className="iconCircle">
              <FaRegHeart />
            </div>
            <div className="iconCircle">
              <FaShoppingBag />
            </div>
          </div>
        </div>
      </div>

      {openMenu && currentMenu && (
  <div className="ajioMegaMenu">
    <div className="ajioMegaInner">

      {/* LEFT SIDE */}
      <div className="ajioMegaLeft">
        <p className="ajioShopBy">Shop By:</p>

        <div className="ajioMegaTabs">
          <button
            type="button"
            className={`ajioTabBtn ${activeTab === "CATEGORIES" ? "active" : ""}`}
            onClick={() => setActiveTab("CATEGORIES")}
          >
            CATEGORIES
          </button>

          <button
            type="button"
            className={`ajioTabBtn ${activeTab === "BRANDS" ? "active" : ""}`}
            onClick={() => setActiveTab("BRANDS")}
          >
            BRANDS
          </button>
        </div>

        {/* LEFT CATEGORY LIST */}
        {activeTab === "CATEGORIES" && (
          <div className="ajioLeftCats">
            {currentMenu?.leftCategories?.map((c, idx) => (
              <div
                key={idx}
                className={`ajioLeftCatItem ${
                  selectedLeftIndex === idx ? "selected" : ""
                }`}
                onMouseEnter={() => setSelectedLeftIndex(idx)}
              >
                {c.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="ajioMegaRight">

        {/* RIGHT CATEGORIES */}
     {/* RIGHT CATEGORIES */}
        {activeTab === "CATEGORIES" && (
  <div className="ajioMegaColumns">

    {openMenu === "HOME & KITCHEN" ? (
      /* ✅ Always show full columns for HOME & KITCHEN */
      MENU_DATA[openMenu]?.columns?.map((col, index) => (
        <div className="ajioMegaCol" key={index}>
          <h4>{col.heading}</h4>
          {col.links?.map((l, i) => (
            <p key={i}>{l}</p>
          ))}
        </div>
      ))
    ) : (
      /* ✅ normal logic for MEN/WOMEN/KIDS */
      MENU_DATA[openMenu]?.leftCategories?.[selectedLeftIndex]?.items?.length >
      0 ? (
        <div className="ajioMegaCol">
          <h4>
            {MENU_DATA[openMenu]?.leftCategories?.[selectedLeftIndex]?.title}
          </h4>

          {MENU_DATA[openMenu]?.leftCategories?.[
            selectedLeftIndex
          ]?.items.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
      ) : (
        MENU_DATA[openMenu]?.columns?.map((col, index) => (
          <div className="ajioMegaCol" key={index}>
            <h4>{col.heading}</h4>
            {col.links?.map((l, i) => (
              <p key={i}>{l}</p>
            ))}
          </div>
        ))
      )
    )}
  </div>
)}



        {/* RIGHT BRANDS */}
        {activeTab === "BRANDS" && (
          <div className="ajioMegaColumns">
            {currentMenu?.brandsColumns?.map((col, index) => (
              <div className="ajioMegaCol" key={index}>
                <h4>{col.heading}</h4>
                {col.links?.map((l, i) => (
                  <p key={i}>{l}</p>
                ))}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  </div>
)}
{showLogin && <LoginModal closeModal={() => setShowLogin(false)} />}

</div>
)}
