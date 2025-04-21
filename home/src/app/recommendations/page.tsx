'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaChevronRight, FaShoppingCart, FaStar, FaHeart, FaRegHeart, 
  FaFire, FaShare, FaSearch, FaMoon, FaSun, FaFilter, FaTimes,
  FaChevronLeft, FaChevronDown, FaChevronUp, FaInfoCircle
} from 'react-icons/fa';
import { toast } from 'react-hot-toast';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  liked: boolean;
  promotion: boolean;
  description: string;
  specs: Record<string, string>;
  reviews: {
    user: string;
    rating: number;
    comment: string;
    date: string;
  }[];
};

type CartItem = Product & {
  quantity: number;
};

const RecommendationsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: 0,
    promotion: false,
  });
  const productsPerPage = 6;

  // Initialisation des données
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simuler un chargement asynchrone
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockProducts: Product[] = [
          {
            id: 1,
            name: 'Casque VR Ultra HD',
            category: 'Réalité Virtuelle',
            price: 599.99,
            originalPrice: 699.99,
            rating: 4.8,
            reviewCount: 124,
            image: 'https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png',
            liked: false,
            promotion: true,
            description: 'Casque VR avec écran 4K, suivi oculaire et retour haptique avancé pour une immersion totale.',
            specs: {
              'Résolution': '3840 x 2160',
              'Champ de vision': '110°',
              'Refresh Rate': '120Hz',
              'Connectivité': 'USB-C, Bluetooth',
              'Poids': '450g'
            },
            reviews: [
              {
                user: 'Jean Dupont',
                rating: 5,
                comment: 'Incroyable immersion, je recommande !',
                date: '2023-10-15'
              },
              {
                user: 'Marie Lambert',
                rating: 4,
                comment: 'Très bon produit mais un peu lourd après une longue utilisation',
                date: '2023-09-28'
              }
            ]
          },
          {
            id: 3,
            name: 'Casque VR Ultra HD',
            category: 'Réalité Virtuelle',
            price: 599.99,
            originalPrice: 699.99,
            rating: 4.8,
            reviewCount: 124,
            image: 'https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png',
            liked: false,
            promotion: true,
            description: 'Casque VR avec écran 4K, suivi oculaire et retour haptique avancé pour une immersion totale.',
            specs: {
              'Résolution': '3840 x 2160',
              'Champ de vision': '110°',
              'Refresh Rate': '120Hz',
              'Connectivité': 'USB-C, Bluetooth',
              'Poids': '450g'
            },
            reviews: [
              {
                user: 'Jean Dupont',
                rating: 5,
                comment: 'Incroyable immersion, je recommande !',
                date: '2023-10-15'
              },
              {
                user: 'Marie Lambert',
                rating: 4,
                comment: 'Très bon produit mais un peu lourd après une longue utilisation',
                date: '2023-09-28'
              }
            ]
          },
          {
            id: 2,
            name: 'Clavier Mécanique RGB',
            category: 'Périphériques',
            price: 149.99,
            rating: 4.6,
            reviewCount: 89,
            image: 'https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png',
            liked: false,
            promotion: false,
            description: 'Clavier mécanique avec switches personnalisables, rétroéclairage RGB et construction en aluminium.',
            specs: {
              'Type de switch': 'Cherry MX Red',
              'Rétroéclairage': 'RGB 16.8M couleurs',
              'Matériau': 'Aluminium',
              'Anti-ghosting': '100%',
              'Connectivité': 'USB, Bluetooth'
            },
            reviews: [
              {
                user: 'Thomas Martin',
                rating: 5,
                comment: 'Touches très réactives, le RGB est magnifique',
                date: '2023-11-02'
              }
            ]
          },
          {
            id: 3,
            name: 'Écran Courbe 34" 4K',
            category: 'Moniteurs',
            price: 899.99,
            originalPrice: 1099.99,
            rating: 4.9,
            reviewCount: 156,
            image: 'https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png',
            liked: false,
            promotion: true,
            description: 'Écran ultra-large courbé avec résolution 4K, taux de rafraîchissement 144Hz et technologie HDR.',
            specs: {
              'Taille': '34 pouces',
              'Résolution': '3440 x 1440',
              'Refresh Rate': '144Hz',
              'Temps de réponse': '1ms',
              'Technologie': 'HDR10, FreeSync'
            },
            reviews: [
              {
                user: 'Sophie Leroy',
                rating: 5,
                comment: 'Parfait pour le gaming et le travail',
                date: '2023-10-20'
              },
              {
                user: 'Alexandre Petit',
                rating: 4,
                comment: 'Excellent écran mais prend beaucoup de place',
                date: '2023-09-15'
              }
            ]
          },
          {
            id: 4,
            name: 'Souris Ergonomique Sans Fil',
            category: 'Périphériques',
            price: 79.99,
            rating: 4.5,
            reviewCount: 67,
            image: 'https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png',
            liked: false,
            promotion: false,
            description: 'Souris ergonomique conçue pour le confort lors des longues sessions de travail ou de jeu.',
            specs: {
              'DPI': '16000',
              'Boutons': '8 programmables',
              'Autonomie': '70 heures',
              'Poids': '98g',
              'Connectivité': 'USB, Bluetooth'
            },
            reviews: []
          },
          {
            id: 5,
            name: 'Disque SSD NVMe 1To',
            category: 'Composants',
            price: 129.99,
            originalPrice: 149.99,
            rating: 4.7,
            reviewCount: 203,
            image: 'https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png',
            liked: false,
            promotion: true,
            description: 'SSD ultra-rapide avec interface NVMe pour des temps de chargement réduits et des transferts de données plus rapides.',
            specs: {
              'Capacité': '1To',
              'Vitesse lecture': '3500MB/s',
              'Vitesse écriture': '3000MB/s',
              'Type': 'M.2 NVMe',
              'Garantie': '5 ans'
            },
            reviews: [
              {
                user: 'Paul Bernard',
                rating: 5,
                comment: 'Mon PC démarre en quelques secondes maintenant',
                date: '2023-11-10'
              }
            ]
          },
          {
            id: 6,
            name: 'Webcam 4K avec Micro',
            category: 'Périphériques',
            price: 199.99,
            rating: 4.4,
            reviewCount: 42,
            image: 'https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png',
            liked: false,
            promotion: false,
            description: 'Webcam haute résolution avec micro intégré pour des vidéoconférences professionnelles.',
            specs: {
              'Résolution': '4K UHD',
              'Micro': 'Stéréo intégré',
              'Champ de vision': '90°',
              'Autofocus': 'Oui',
              'Compatibilité': 'Windows, Mac'
            },
            reviews: []
          },
          {
            id: 7,
            name: 'Enceinte Bluetooth Portable',
            category: 'Audio',
            price: 129.99,
            originalPrice: 159.99,
            rating: 4.3,
            reviewCount: 178,
            image: 'https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png',
            liked: false,
            promotion: true,
            description: 'Enceinte portable avec son puissant et clair, résistante à l\'eau pour une utilisation en extérieur.',
            specs: {
              'Puissance': '20W',
              'Autonomie': '15 heures',
              'Résistance': 'IPX7',
              'Poids': '0.8kg',
              'Connectivité': 'Bluetooth 5.0'
            },
            reviews: []
          },
          {
            id: 8,
            name: 'Routeur Wi-Fi 6',
            category: 'Réseau',
            price: 249.99,
            rating: 4.8,
            reviewCount: 91,
            image: 'https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png',
            liked: false,
            promotion: false,
            description: 'Routeur dernière génération avec technologie Wi-Fi 6 pour des connexions ultra-rapides et stables.',
            specs: {
              'Vitesse': 'AX6000',
              'Ports': '4 Gigabit Ethernet',
              'USB': '3.0',
              'Couverture': '250m²',
              'Appareils': 'Jusqu\'à 50 simultanés'
            },
            reviews: []
          }
        ];

        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Appliquer les filtres et la recherche
  useEffect(() => {
    let result = [...products];
    
    // Filtre par recherche
   
    
    // Filtres avancés
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    
    if (filters.minPrice) {
      result = result.filter(product => product.price >= Number(filters.minPrice));
    }
    
    if (filters.maxPrice) {
      result = result.filter(product => product.price <= Number(filters.maxPrice));
    }
    
    if (filters.rating > 0) {
      result = result.filter(product => product.rating >= filters.rating);
    }
    
    if (filters.promotion) {
      result = result.filter(product => product.promotion);
    }
    
    // Tri des produits
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Tri par défaut (recommandé)
        break;
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Réinitialiser la pagination lors du changement de filtres
  }, [searchTerm, filters, sortOption, products]);

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const toggleLike = (productId: number) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, liked: !product.liked } : product
    ));
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    
    toast.success(`${product.name} ajouté au panier`);
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
    toast.error('Produit retiré du panier');
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const categories = [...new Set(products.map(product => product.category))];

  const resetFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      rating: 0,
      promotion: false,
    });
    setSearchTerm('');
    setSortOption('recommended');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'} 
          />
        ))}
        <span className="ml-1 text-sm text-gray-500">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-cream text-black'}`}>
      <header className={`max-w-7xl mx-auto p-6 ${darkMode ? 'bg-gray-800' : 'bg-purple-600/20'} rounded-xl mb-6 shadow-lg`}>
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className={`text-4xl font-extrabold bg-gradient-to-r ${darkMode ? 'from-purple-300 to-pink-400' : 'from-purple-400 to-pink-500'} bg-clip-text text-transparent`}>
              Bonjour Dorra 👋
            </h1>
            <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-primary'}`}>Découvrez nos nouvelles suggestions</p>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-purple-700 text-white'}`}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowCart(!showCart)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-purple-700 hover:bg-purple-600'} relative`}
              >
                <FaShoppingCart />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              
              <AnimatePresence>
                {showCart && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className={`absolute right-0 mt-2 w-80 rounded-lg shadow-xl z-50 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold">Votre Panier</h3>
                        <button onClick={() => setShowCart(false)} className="text-gray-500 hover:text-gray-700">
                          <FaTimes />
                        </button>
                      </div>
                      
                      {cart.length === 0 ? (
                        <p className="text-center py-4 text-gray-500">Votre panier est vide</p>
                      ) : (
                        <>
                          <div className="max-h-64 overflow-y-auto">
                            {cart.map(item => (
                              <div key={item.id} className="flex items-center py-2 border-b border-gray-200 dark:border-gray-700">
                                <div className="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden">
                                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="ml-3 flex-1">
                                  <h4 className="text-sm font-medium">{item.name}</h4>
                                  <div className="flex items-center justify-between mt-1">
                                    <div className="flex items-center">
                                      <button 
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="text-gray-500 hover:text-purple-500"
                                      >
                                        -
                                      </button>
                                      <span className="mx-2">{item.quantity}</span>
                                      <button 
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="text-gray-500 hover:text-purple-500"
                                      >
                                        +
                                      </button>
                                    </div>
                                    <span className="font-bold">{(item.price * item.quantity).toFixed(2)}€</span>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-2 text-red-500 hover:text-red-700"
                                >
                                  <FaTimes />
                                </button>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                            <div className="flex justify-between font-bold">
                              <span>Total:</span>
                              <span>{cartTotal.toFixed(2)}€</span>
                            </div>
                            <button className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                              Passer la commande
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`w-14 h-14 rounded-full ${darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-600' : 'bg-gradient-to-br from-purple-500 to-pink-600'} flex items-center justify-center shadow-lg cursor-pointer`}
            >
              <span className="text-xl font-bold">D</span>
            </motion.div>
          </div>
        </div>
        
        <div className="mt-6 relative">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des produits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filtres */}
          <div className="md:w-1/4">
            <div className={`p-4 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white/10 backdrop-blur-lg'}`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  <FaFilter /> Filtres
                </h3>
                <button 
                  onClick={resetFilters}
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  Réinitialiser
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Trier par</label>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white/10 border-gray-300/30'} border`}
                  >
                    <option value="recommended">Recommandé</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                    <option value="rating">Meilleures notes</option>
                    <option value="reviews">Plus d'avis</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Catégorie</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                    className={`w-full p-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white/10 border-gray-300/30'} border`}
                  >
                    <option value="">Toutes catégories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Prix</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                      className={`w-1/2 p-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white/10 border-gray-300/30'} border`}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                      className={`w-1/2 p-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white/10 border-gray-300/30'} border`}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Note minimale</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setFilters({...filters, rating: filters.rating === star ? 0 : star})}
                        className={`p-2 rounded-lg ${filters.rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                      >
                        <FaStar />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="promotion"
                    checked={filters.promotion}
                    onChange={(e) => setFilters({...filters, promotion: e.target.checked})}
                    className="mr-2"
                  />
                  <label htmlFor="promotion" className="text-sm">En promotion seulement</label>
                </div>
              </div>
            </div>
            
            {/* Statistiques */}
            <div className={`mt-4 p-4 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white/10 backdrop-blur-lg'}`}>
              <h3 className="font-bold mb-3">Statistiques</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Produits trouvés</p>
                  <p className="text-xl font-bold">{filteredProducts.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Note moyenne</p>
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="font-bold">
                      {(products.reduce((sum, product) => sum + product.rating, 0) / products.length).toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-400 ml-1">({products.length} produits)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contenu principal */}
          <div className="md:w-3/4">
            <section className="mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'bg-gradient-to-r from-primary to-gray-300 bg-clip-text text-transparent'}`}>
                  Recommandations
                  <span className={`block w-16 h-1 ${darkMode ? 'bg-purple-400' : 'bg-purple-500'} mt-2 rounded-full`} />
                </h2>
                
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-xl font-semibold shadow-xl hover:shadow-purple-500/20 transition-all"
                  >
                    Voir plus <FaChevronRight className="text-sm" />
                  </motion.button>
                </div>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <div 
                      key={index} 
                      className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-lg animate-pulse`}
                    >
                      <div className="h-56 bg-gray-600/30 rounded-xl mb-4"></div>
                      <div className="h-6 bg-gray-600/30 rounded mb-3 w-3/4"></div>
                      <div className="h-4 bg-gray-600/30 rounded mb-4 w-1/2"></div>
                      <div className="h-8 bg-gray-600/30 rounded w-1/3"></div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className={`text-center py-12 rounded-xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-lg`}>
                  <FaInfoCircle className="mx-auto text-4xl text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Aucun produit trouvé</h3>
                  <p className="text-gray-400">Essayez de modifier vos filtres de recherche</p>
                  <button 
                    onClick={resetFilters}
                    className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        whileHover={{ y: -5 }}
                        className={`group relative ${darkMode ? 'bg-gray-800/70' : 'bg-white/10'} backdrop-blur-lg rounded-2xl p-6 border ${darkMode ? 'border-gray-700/50 hover:border-purple-500/30' : 'border-gray-300/30 hover:border-purple-300/50'} transition-all duration-300 shadow-xl`}
                      >
                        <div 
                          className="relative h-56 mb-4 rounded-xl overflow-hidden cursor-pointer"
                          onClick={() => setSelectedProduct(product)}
                        >
                          {product.promotion && (
                            <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-red-600/90 px-3 py-1 rounded-full text-sm font-semibold">
                              <FaFire className="text-yellow-400" /> Promotion
                            </div>
                          )}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleLike(product.id);
                            }}
                            className="absolute top-2 right-2 z-10 p-2 hover:scale-110 transition-transform"
                          >
                            {product.liked ? 
                              <FaHeart className="text-red-500 text-xl" /> : 
                              <FaRegHeart className={`text-xl ${darkMode ? 'text-gray-300 hover:text-red-400' : 'text-white/80 hover:text-red-400'}`} />
                            }
                          </button>
                          <motion.img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-gray-900/70' : 'from-gray-900/50'} to-transparent`} />
                        </div>
                        
                        <div className="flex justify-between items-center mb-3">
                          <h3 
                            className="text-xl font-bold truncate cursor-pointer hover:text-purple-400 transition-colors"
                            onClick={() => setSelectedProduct(product)}
                          >
                            {product.name}
                          </h3>
                          <span className={`flex items-center gap-1 text-sm ${darkMode ? 'bg-gray-700/70' : 'bg-purple-600/30'} px-3 py-1 rounded-full backdrop-blur-sm`}>
                            {product.rating} <FaStar className="text-yellow-400" />
                          </span>
                        </div>
                        
                        <p className={`mb-4 font-medium ${darkMode ? 'text-gray-400' : 'text-purple-200'}`}>{product.category}</p>
                        
                        <div className="flex justify-between items-center gap-2">
                          <div className="flex flex-col">
                            <span className={`text-2xl font-bold bg-gradient-to-r ${darkMode ? 'from-purple-300 to-pink-300' : 'from-purple-400 to-pink-400'} bg-clip-text text-transparent`}>
                              {product.price.toFixed(2)}€
                            </span>
                            {product.promotion && product.originalPrice && (
                              <span className="text-sm line-through text-gray-400">
                                {product.originalPrice.toFixed(2)}€
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              className={`flex items-center gap-2 ${darkMode ? 'bg-gray-700/50 hover:bg-purple-600/80' : 'bg-white/10 hover:bg-purple-500/50'} px-4 py-2.5 rounded-xl backdrop-blur-sm transition-colors border ${darkMode ? 'border-gray-600/50 hover:border-transparent' : 'border-gray-300/30 hover:border-transparent'}`}
                            >
                              <FaShoppingCart className="text-purple-400" />
                              <span>Ajouter</span>
                            </motion.button>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              className={`p-2.5 ${darkMode ? 'bg-gray-700/50 hover:bg-purple-600/80' : 'bg-white/10 hover:bg-purple-500/50'} rounded-xl backdrop-blur-sm transition-colors border ${darkMode ? 'border-gray-600/50 hover:border-transparent' : 'border-gray-300/30 hover:border-transparent'}`}
                            >
                              <FaShare className="text-lg" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className={`p-2 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white/10 hover:bg-white/20'}`}
                        >
                          <FaChevronLeft />
                        </button>
                        
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 +i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-10 h-10 rounded-lg ${currentPage === pageNum ? 
                                'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 
                                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white/10 hover:bg-white/20'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}

                        {totalPages > 5 && currentPage < totalPages - 2 && (
                          <span className="px-2">...</span>
                        )}

                        {totalPages > 5 && currentPage < totalPages - 2 && (
                          <button
                            onClick={() => setCurrentPage(totalPages)}
                            className={`w-10 h-10 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white/10 hover:bg-white/20'}`}
                          >
                            {totalPages}
                          </button>
                        )}

                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className={`p-2 rounded-lg ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''} ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white/10 hover:bg-white/20'}`}
                        >
                          <FaChevronRight />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </section>

            {/* Product Details Modal */}
            <AnimatePresence>
              {selectedProduct && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                  onClick={() => setSelectedProduct(null)}
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-gray-200/50 hover:bg-gray-300/50 dark:bg-gray-700/50 dark:hover:bg-gray-600/50"
                    >
                      <FaTimes />
                    </button>

                    <div className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/2">
                          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                            {selectedProduct.promotion && (
                              <div className="absolute top-2 left-2 z-10 flex items-center gap-1 bg-red-600/90 px-3 py-1 rounded-full text-sm font-semibold">
                                <FaFire className="text-yellow-400" /> Promotion
                              </div>
                            )}
                            <img
                              src={selectedProduct.image}
                              alt={selectedProduct.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <div className="md:w-1/2">
                          <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
                          <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {selectedProduct.category}
                          </p>

                          <div className="flex items-center mb-4">
                            {renderStars(selectedProduct.rating)}
                            <span className="ml-2 text-sm">
                              ({selectedProduct.reviewCount} avis)
                            </span>
                          </div>

                          <div className="mb-6">
                            {selectedProduct.promotion && selectedProduct.originalPrice ? (
                              <div className="flex items-center gap-4">
                                <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                                  {selectedProduct.price.toFixed(2)}€
                                </span>
                                <span className="text-xl line-through text-gray-400">
                                  {selectedProduct.originalPrice.toFixed(2)}€
                                </span>
                                <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                                  -{Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}%
                                </span>
                              </div>
                            ) : (
                              <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                                {selectedProduct.price.toFixed(2)}€
                              </span>
                            )}
                          </div>

                          <p className="mb-6">{selectedProduct.description}</p>

                          <div className="flex gap-3 mb-6">
                            <button
                              onClick={() => {
                                addToCart(selectedProduct);
                                setSelectedProduct(null);
                              }}
                              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                              <FaShoppingCart /> Ajouter au panier
                            </button>
                            <button className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                              <FaHeart className="text-red-500" />
                            </button>
                          </div>

                          <div className="mb-6">
                            <h3 className="font-bold mb-2">Caractéristiques</h3>
                            <div className="space-y-2">
                              {Object.entries(selectedProduct.specs).map(([key, value]) => (
                                <div key={key} className="flex">
                                  <span className="w-1/3 font-medium">{key}</span>
                                  <span className="w-2/3">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Reviews Section */}
                      <div className="mt-8">
                        <h3 className="text-xl font-bold mb-4">Avis clients</h3>
                        {selectedProduct.reviews.length > 0 ? (
                          <div className="space-y-4">
                            {selectedProduct.reviews.map((review, index) => (
                              <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h4 className="font-bold">{review.user}</h4>
                                    <div className="flex items-center">
                                      {renderStars(review.rating)}
                                    </div>
                                  </div>
                                  <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                                <p>{review.comment}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className={`py-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Aucun avis pour ce produit
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

     
    </div>
  );
};

export default RecommendationsPage;