import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent } from "../ui/card";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaStore,
  FaBolt,
  FaHeart,
  FaRegHeart,
  FaCheckCircle,
  FaSortAmountDown,
  FaMoneyBillAlt,
  FaThList,
  FaRedo,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaCheck,
} from "react-icons/fa";
import { Button } from "@headlessui/react";
import Link from "next/link";
import Logo from "../Layout/Header/Logo";

// Catégories étendues
const categories = [
  "Gaming Console",
  "Mobile Accessories",
  "Earbuds",
  "Portable SSD",
  "Earphone",
  "Mobile Phone",
  "Action Camera",
  "Portable Camera",
  "Charger Fan",
  "Refrigerator",
  "TV",
  "Smart Watch",
  "Trimmer",
  "Drone",
  "Bluetooth Speakers",
  "Laptops",
  "Tablets",
  "Monitors",
  "Keyboards",
  "Mice",
  "Others",
];

// Fonction pour générer des évaluations aléatoires
const generateRandomRating = () => {
  const rating = (Math.random() * 5).toFixed(1);
  return parseFloat(rating);
};

// Fonction pour générer des ventes aléatoires
const generateRandomSales = () => {
  return Math.floor(Math.random() * 1000);
};

// Produits étendus avec plus de variété
const products = [
  {
    id: 1,
    category: "TV",
    name: "Samsung 43” TU7000 Crystal UHD 4K Smart TV",
    price: 1599,
    originalPrice: 1678.95,
    stock: 6,
    save: "$80 (-5%)",
    image: "https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png",
    dateAdded: "2025-04-10",
    salesCount: generateRandomSales(),
    rating: generateRandomRating(),
  },
  {
    id: 2,
    category: "Earbuds",
    name: "Apple AirPods 3rd generation with Charging Case",
    price: 1700,
    originalPrice: 1870,
    stock: 3,
    save: "$170 (-10%)",
    image: "https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png",
    dateAdded: "2025-04-12",
    salesCount: generateRandomSales(),
    rating: generateRandomRating(),
  },
  {
    id: 3,
    category: "Gaming Console",
    name: "PlayStation 5 Digital Edition",
    price: 499,
    originalPrice: 549,
    stock: 8,
    save: "$50 (-9%)",
    image: "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$",
    dateAdded: "2025-03-25",
    salesCount: generateRandomSales(),
    rating: generateRandomRating(),
  },
  {
    id: 4,
    category: "TV",
    name: "LG OLED C3 55” 4K Smart TV",
    price: 1299,
    originalPrice: 1499,
    stock: 4,
    save: "$200 (-13%)",
    image: "https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png",
    dateAdded: "2025-04-05",
    salesCount: generateRandomSales(),
    rating: generateRandomRating(),
  },
  {
    id: 5,
    category: "Laptops",
    name: "MacBook Pro 14-inch M3 Pro 16GB/512GB",
    price: 1999,
    originalPrice: 2199,
    stock: 7,
    save: "$200 (-9%)",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830209",
    dateAdded: "2025-04-15",
    salesCount: generateRandomSales(),
    rating: generateRandomRating(),
  },
  {
    id: 6,
    category: "Mobile Phone",
    name: "iPhone 15 Pro Max 256GB Titanium",
    price: 1199,
    originalPrice: 1299,
    stock: 10,
    save: "$100 (-8%)",
    image: "https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png",
    dateAdded: "2025-04-17",
    salesCount: generateRandomSales(),
    rating: generateRandomRating(),
  },
  {
    id: 7,
    category: "Smart Watch",
    name: "Apple Watch Series 9 GPS 45mm",
    price: 429,
    originalPrice: 459,
    stock: 12,
    save: "$30 (-7%)",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT963ref_VW_34FR+watch-49-titanium-ultra2_VW_34FR_WF_CO?wid=750&hei=712&trim=1%2C0&fmt=p-jpg&qlt=95&.v=1694387532214%2C1696613776968",
    dateAdded: "2025-04-16",
    salesCount: generateRandomSales(),
    rating: generateRandomRating(),
  },
  {
    id: 8,
    category: "Drone",
    name: "DJI Mini 4 Pro Fly More Combo",
    price: 1099,
    originalPrice: 1199,
    stock: 8,
    save: "$100 (-8%)",
    image: "https://www1.djicdn.com/cms/uploads/3c006720ab1d19cfb1e18ee9acaffb26.png",
    dateAdded: "2025-04-14",
    salesCount: generateRandomSales(),
    rating: generateRandomRating(),
  },
  {
    id: 9,
    category: "Bluetooth Speakers",
    name: "JBL Flip 6 Portable Bluetooth Speaker",
    price: 129,
    originalPrice: 149,
    stock: 15,
    save: "$20 (-13%)",
    image: "https://www.jbl.com/dw/image/v2/BFND_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw6e8d6bd1/JBL_Flip_6_Hero_Blue_0065.png?sw=535&sh=535",
    dateAdded: "2025-04-13",
    salesCount: generateRandomSales(),
    rating: generateRandomRating(),
  },
  {
    id: 10,
    category: "Tablets",
    name: "iPad Pro 12.9-inch M2 128GB",
    price: 1099,
    originalPrice: 1199,
    stock: 5,
    save: "$100 (-8%)",
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-finish-select-202212-12-9inch-space-gray-wifi_FMT_WHH?wid=1280&hei=720&fmt=p-jpg&qlt=95&.v=1670865949316",
    dateAdded: "2025-04-18",
    salesCount: generateRandomSales(),
    rating: generateRandomRating(),
  },
  {
    id: 11,
    category: "Monitors",
    name: "Dell UltraSharp 32 4K USB-C Hub Monitor",
    price: 899,
    originalPrice: 999,
    stock: 6,
    save: "$100 (-10%)",
    image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/peripherals/monitors/u-series/u3223qe/media-gallery/monitor-u3223qe-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&hei=402&wid=554&qlt=100,0&resMode=sharp2&size=554,402",
    dateAdded: "2025-04-20",
    salesCount: generateRandomSales(),
    rating: generateRandomRating(),
  },
  {
    id: 12,
    category: "Keyboards",
    name: "Logitech MX Keys Advanced Wireless Illuminated Keyboard",
    price: 99,
    originalPrice: 129,
    stock: 9,
    save: "$30 (-23%)",
    image: "https://resource.logitech.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/products/keyboards/mx-keys/gallery/mx-keys-graphite-gallery-1.png?v=1",
    dateAdded: "2025-04-19",
    salesCount: generateRandomSales(),
    rating: generateRandomRating(),
  },
  {
    id: 13,
    category: "Mice",
    name: "Logitech MX Master 3S Wireless Mouse",
    price: 99,
    originalPrice: 109,
    stock: 11,
    save: "$10 (-9%)",
    image: "https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png",
    dateAdded: "2025-04-21",
    salesCount: generateRandomSales(),
    rating: generateRandomRating(),
  },
  {
    id: 14,
    category: "Mobile Accessories",
    name: "Anker 737 Power Bank 24,000mAh",
    price: 129,
    originalPrice: 149,
    stock: 7,
    save: "$20 (-13%)",
    image: "https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png",
    dateAdded: "2025-04-22",
    salesCount: generateRandomSales(),
    rating: generateRandomRating(),
  },
  {
    id: 15,
    category: "Portable SSD",
    name: "Samsung T7 Shield 1TB Portable SSD",
    price: 89,
    originalPrice: 99,
    stock: 8,
    save: "$10 (-10%)",
    image: "https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png",
    dateAdded: "2025-04-23",
    salesCount: generateRandomSales(),
    rating: generateRandomRating(),
  },
  {
    id: 16,
    category: "Gaming Console",
    name: "Xbox Series X 1TB",
    price: 499,
    originalPrice: 549,
    stock: 5,
    save: "$50 (-9%)",
    image: "https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png",
    dateAdded: "2025-04-24",
    salesCount: generateRandomSales(),
    rating: generateRandomRating(),
  },
];

// Composant pour afficher les étoiles de notation
const RatingStars = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
  }

  return (
    <div className="flex items-center">
      {stars}
      <span className="ml-1 text-xs text-gray-500">({rating.toFixed(1)})</span>
    </div>
  );
};

export default function ShopPage() {
  const [cart, setCart] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId: number) => {
    setCart((prev) => 
      prev.includes(productId) 
        ? prev 
        : [...prev, productId]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSearchText("");
    setMinPrice("");
    setMaxPrice("");
    setDateRange("all");
    setSortBy("recent");
  };

  const filteredProducts = [...products]
    .filter((product) => {
      const matchCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchText = product.name.toLowerCase().includes(searchText.toLowerCase());
      const price = parseFloat(product.price.toString());
      const matchMin = minPrice === "" || price >= parseFloat(minPrice);
      const matchMax = maxPrice === "" || price <= parseFloat(maxPrice);
      const matchDate = dateRange === "all" || new Date(product.dateAdded) >= new Date(dateRange);
      return matchCategory && matchText && matchMin && matchMax && matchDate;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priceLow":
          return a.price - b.price;
        case "priceHigh":
          return b.price - a.price;
        case "popular":
          return b.salesCount - a.salesCount;
        case "rating":
          return b.rating - a.rating;
        case "recent":
        default:
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 text-sm">
      {/* Header avec sticky */}
      <header className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white p-4 shadow-lg sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="ml-1">
              <Logo />
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-yellow-400 bg-clip-text text-transparent">
              Ecommerce
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="flex items-center bg-white rounded-full px-4 py-2 text-black w-full md:w-[700px] shadow-md">
              <FaSearch className="mr-2 text-gray-500" />
              <Input
                placeholder="Rechercher des produits..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="border-0 focus-visible:ring-0 text-sm w-full"
              />
            </div>
            <div className="flex gap-6">
              <Link href="/" className="flex items-center gap-2 cursor-pointer hover:text-yellow-300 transition-colors">
                <FaStore className="text-xl" />
                <span className="hidden md:inline">Accueil</span>
              </Link>
              <Link href="/hotdeals" className="flex items-center gap-2 cursor-pointer hover:text-yellow-300 transition-colors">
                <FaBolt className="text-xl" />
                <span className="hidden md:inline">Promotions</span>
              </Link>
              <Link
                href="/profil"
                className="hidden lg:flex items-center gap-2 cursor-pointer hover:text-yellow-300 transition-colors"
              >
                <FaUser className="text-xl" />
                <span>Compte</span>
              </Link>
            
              <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
                {wishlist.length > 0 ? (
                  <FaHeart className="text-2xl text-red-500" />
                ) : (
                  <FaRegHeart className="text-2xl" />
                )}
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>
              <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
                <FaShoppingCart className="text-2xl" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-2">
        <h1 className="text-2xl font-bold mb-6">Rechercher un produit</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <ScrollArea className="border p-4 rounded-lg h-[calc(190vh-250px)] bg-white shadow-sm">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 text-xs uppercase tracking-wide text-gray-700 flex items-center gap-2">
                    <FaThList className="text-purple-400 text-sm" /> Catégories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <div key={cat} className="flex items-center gap-2">
                        <Checkbox
                          id={cat}
                          checked={selectedCategories.includes(cat)}
                          onChange={() => handleCategoryChange(cat)}
                        />
                        <label htmlFor={cat} className="text-xs cursor-pointer hover:text-purple-600 transition-colors">
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-xs uppercase text-gray-700 flex items-center gap-2">
                    <FaSearch className="text-purple-400 text-sm" /> Rechercher
                  </h3>
                  <Input
                    type="text"
                    placeholder="Nom du produit"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="text-xs"
                  />
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-xs uppercase text-gray-700 flex items-center gap-2">
                    <FaMoneyBillAlt className="text-purple-400 text-sm" /> Plage de prix
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min ($)"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="text-xs"
                    />
                    <Input
                      type="number"
                      placeholder="Max ($)"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-xs uppercase text-gray-700 flex items-center gap-2">
                    <FaSortAmountDown className="text-purple-400 text-sm" /> Trier par
                  </h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-xs focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="recent">Les plus récents</option>
                    <option value="priceLow">Prix croissant</option>
                    <option value="priceHigh">Prix décroissant</option>
                    <option value="popular">Les plus vendus</option>
                    <option value="rating">Les mieux notés</option>
                  </select>
                </div>

                <Button
                  onClick={resetFilters}
                  className="w-full text-xs flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 py-2 px-4 rounded-md transition-colors"
                >
                  <FaRedo className="text-sm" />
                  Réinitialiser les filtres
                </Button>
              </div>
            </ScrollArea>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4 space-y-3">
                      <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                      <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <div className="text-gray-400 mb-4">
                  <FaSearch className="mx-auto text-4xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Aucun produit trouvé</h3>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="absolute top-3 right-3 z-10">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          toggleWishlist(product.id);
                        }}
                        className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-pink-100 transition-colors"
                      >
                        {wishlist.includes(product.id) ? (
                          <FaHeart className="text-red-500 text-lg" />
                        ) : (
                          <FaRegHeart className="text-gray-500 text-lg hover:text-red-500 transition-colors" />
                        )}
                      </button>
                    </div>
                    
                    {product.save && (
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded z-10">
                        Économisez {product.save}
                      </div>
                    )}
                    
                    <Link href={`/details`}>
                      <CardContent className="p-4">
                        <div className="aspect-square w-full bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-48 object-contain transition-transform duration-300 group-hover:scale-105" 
                          />
                        </div>
                        
                        <div className="mt-4 space-y-1">
                          <div className="text-xs text-purple-600 font-medium">{product.category}</div>
                          <h3 className="font-medium text-gray-900 line-clamp-2 h-12">{product.name}</h3>
                          
                          <RatingStars rating={product.rating} />
                          
                          <div className="flex items-end gap-2 mt-2">
                            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                              <span className="text-sm line-through text-gray-400">${product.originalPrice.toFixed(2)}</span>
                            )}
                          </div>
                          
                          <div className="text-xs text-green-600 font-medium flex items-center mt-2">
                            <FaCheckCircle className="mr-1" />
                            {product.stock > 5 ? 'En stock' : `Seulement ${product.stock} restant(s)`}
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                    
                    <div className="p-4 pt-0">
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product.id);
                        }}
                        className={`w-full py-3 rounded-md font-medium flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg ${
                          cart.includes(product.id)
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                        }`}
                      >
                        {cart.includes(product.id) ? (
                          <>
                            <FaCheck className="mr-2" />
                            Ajouté au panier
                          </>
                        ) : (
                          <>
                            <FaShoppingCart />
                            Ajouter au panier
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}