"use client"
import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { FiShoppingCart, FiStar, FiClock, FiZap, FiChevronRight, FiX, FiSearch } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaStore, FaBolt, FaUser, FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Footer from '@/components/Layout/Footer';

type Produit = {
  id: number;
  categorie: string;
  titre: string;
  avis: number;
  stock: number;
  prix: number;
  prixOriginal: number;
  image: string;
  badge: string;
  couleurs?: string[];
  caracteristiques: string[];
  specsTechniques: string[];
  note?: number;
  dateFinPromo?: Date;
};

const PromotionsPage = () => {
  // États
  const [panier, setPanier] = useState<Produit[]>([]);
  const [listeSouhaits, setListeSouhaits] = useState<number[]>([]);
  const [produitSurvole, setProduitSurvole] = useState<number | null>(null);
  const [recherche, setRecherche] = useState('');
  const [categorieSelectionnee, setCategorieSelectionnee] = useState('Toutes catégories');
  const [tri, setTri] = useState('featured');
  const [produitApercu, setProduitApercu] = useState<Produit | null>(null);
  const [modalOuverte, setModalOuverte] = useState(false);

  // Données des produits
  const promotions: Produit[] = [
    {
      id: 1,
      categorie: "ACCESSOIRES HIGH-TECH",
      titre: "Apple Mac Mini Puce M4 16/512GB",
      avis: 5,
      stock: 9,
      prix: 600.00,
      prixOriginal: 666.00,
      image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6376/6376551_sd.jpg",
      badge: "NOUVEAU",
      couleurs: ["#c0c0c0", "#333333"],
      caracteristiques: ["Puce M4", "16GB RAM", "512GB SSD"],
      specsTechniques: ["Neural Engine", "8-core CPU", "10-core GPU"],
      note: 4.8,
      dateFinPromo: new Date(Date.now() + 48 * 60 * 60 * 1000)
    }, {
      id: 2,
      categorie: "ACCESSOIRES HIGH-TECH",
      titre: "Apple Mac Mini Puce M4 16/512GB",
      avis: 5,
      stock: 9,
      prix: 600.00,
      prixOriginal: 666.00,
      image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6376/6376551_sd.jpg",
      badge: "NOUVEAU",
      couleurs: ["#c0c0c0", "#333333"],
      caracteristiques: ["Puce M4", "16GB RAM", "512GB SSD"],
      specsTechniques: ["Neural Engine", "8-core CPU", "10-core GPU"],
      note: 4.8,
      dateFinPromo: new Date(Date.now() + 48 * 60 * 60 * 1000)
    },
    {
      id: 5,
      categorie: "ACCESSOIRES HIGH-TECH",
      titre: "Apple Mac Mini Puce M4 16/512GB",
      avis: 5,
      stock: 9,
      prix: 600.00,
      prixOriginal: 666.00,
      image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6376/6376551_sd.jpg",
      badge: "NOUVEAU",
      couleurs: ["#c0c0c0", "#333333"],
      caracteristiques: ["Puce M4", "16GB RAM", "512GB SSD"],
      specsTechniques: ["Neural Engine", "8-core CPU", "10-core GPU"],
      note: 4.8,
      dateFinPromo: new Date(Date.now() + 48 * 60 * 60 * 1000)
    },
    {
      id: 4,
      categorie: "ACCESSOIRES HIGH-TECH",
      titre: "Apple Mac Mini Puce M4 16/512GB",
      avis: 5,
      stock: 9,
      prix: 600.00,
      prixOriginal: 666.00,
      image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6376/6376551_sd.jpg",
      badge: "NOUVEAU",
      couleurs: ["#c0c0c0", "#333333"],
      caracteristiques: ["Puce M4", "16GB RAM", "512GB SSD"],
      specsTechniques: ["Neural Engine", "8-core CPU", "10-core GPU"],
      note: 4.8,
      dateFinPromo: new Date(Date.now() + 48 * 60 * 60 * 1000)
    },
    {
      id: 3,
      categorie: "ACCESSOIRES HIGH-TECH",
      titre: "Apple Mac Mini Puce M4 16/512GB",
      avis: 5,
      stock: 9,
      prix: 600.00,
      prixOriginal: 666.00,
      image: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6376/6376551_sd.jpg",
      badge: "NOUVEAU",
      couleurs: ["#c0c0c0", "#333333"],
      caracteristiques: ["Puce M4", "16GB RAM", "512GB SSD"],
      specsTechniques: ["Neural Engine", "8-core CPU", "10-core GPU"],
      note: 4.8,
      dateFinPromo: new Date(Date.now() + 48 * 60 * 60 * 1000)
    },
  ];

  // Filtrage et tri des produits
  const promotionsFiltrees = useMemo(() => {
    let resultat = [...promotions];
    
    // Filtre par recherche
    if (recherche) {
      resultat = resultat.filter(produit => 
        produit.titre.toLowerCase().includes(recherche.toLowerCase()) ||
        produit.categorie.toLowerCase().includes(recherche.toLowerCase())
      );
    }
    
    // Filtre par catégorie
    if (categorieSelectionnee !== 'Toutes catégories') {
      resultat = resultat.filter(produit => produit.categorie === categorieSelectionnee);
    }
    
    // Tri des produits
    switch (tri) {
      case 'price-low-high':
        return resultat.sort((a, b) => a.prix - b.prix);
      case 'price-high-low':
        return resultat.sort((a, b) => b.prix - a.prix);
      case 'newest':
        return resultat.sort((a, b) => (b.dateFinPromo?.getTime() || 0) - (a.dateFinPromo?.getTime() || 0));
      case 'rating':
        return resultat.sort((a, b) => (b.note || 0) - (a.note || 0));
      default:
        return resultat;
    }
  }, [recherche, categorieSelectionnee, tri]);

  const categories = useMemo(() => {
    const categoriesUniques = new Set(promotions.map(produit => produit.categorie));
    return ['Toutes catégories', ...Array.from(categoriesUniques)];
  }, [promotions]);

  // Fonctions utilitaires
  const calculerEconomie = (prix: number, prixOriginal: number) => {
    return Math.round(100 - (prix / prixOriginal * 100));
  };

  const toggleListeSouhaits = (produitId: number) => {
    setListeSouhaits(prev => 
      prev.includes(produitId) 
        ? prev.filter(id => id !== produitId) 
        : [...prev, produitId]
    );
  };

  const ajouterAuPanier = (produit: Produit) => {
    setPanier(prev => [...prev, produit]);
    toast.success(`${produit.titre} ajouté au panier !`, {
      position: 'bottom-right',
      icon: '🛒',
    });
  };

  const ouvrirApercu = (produit: Produit) => {
    setProduitApercu(produit);
    setModalOuverte(true);
    document.body.style.overflow = 'hidden';
  };

  const fermerApercu = () => {
    setModalOuverte(false);
    setTimeout(() => setProduitApercu(null), 300);
    document.body.style.overflow = 'auto';
  };

  // Compte à rebours
  const CompteARebours = ({ dateFin }: { dateFin: Date }) => {
    const [tempsRestant, setTempsRestant] = useState({
      jours: 0,
      heures: 0,
      minutes: 0,
      secondes: 0
    });

    useEffect(() => {
      const timer = setInterval(() => {
        const maintenant = new Date();
        const difference = dateFin.getTime() - maintenant.getTime();
        
        if (difference <= 0) {
          clearInterval(timer);
          return;
        }

        const jours = Math.floor(difference / (1000 * 60 * 60 * 24));
        const heures = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const secondes = Math.floor((difference % (1000 * 60)) / 1000);

        setTempsRestant({ jours, heures, minutes, secondes });
      }, 1000);

      return () => clearInterval(timer);
    }, [dateFin]);

    return (
      <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
        <FiClock className="mr-2 text-yellow-300" />
        <span className="font-mono text-lg text-white">
          {tempsRestant.jours > 0 && `${tempsRestant.jours}j `}
          {String(tempsRestant.heures).padStart(2, '0')}:
          {String(tempsRestant.minutes).padStart(2, '0')}:
          {String(tempsRestant.secondes).padStart(2, '0')}
        </span>
      </div>
    );
  };

  // Carte produit
  const CarteProduit = ({ produit }: { produit: Produit }) => {
    const [survole, setSurvole] = useState(false);
    const estDansListeSouhaits = listeSouhaits.includes(produit.id);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ y: -5 }}
        onHoverStart={() => setSurvole(true)}
        onHoverEnd={() => setSurvole(false)}
        className="relative bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
      >
        {/* Badge produit */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
            produit.badge === "NOUVEAU" ? "bg-blue-500" : 
            produit.badge === "HOT" ? "bg-red-500" : "bg-purple-500"
          } text-white shadow-sm`}>
            {produit.badge}
          </span>
        </div>

        {/* Bouton liste de souhaits */}
        <button 
          onClick={() => toggleListeSouhaits(produit.id)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-100 transition-colors"
        >
          {estDansListeSouhaits ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-700" />
          )}
        </button>

        {/* Image produit */}
        <div 
          className="relative h-60 bg-gray-100 overflow-hidden group cursor-pointer"
          onClick={() => ouvrirApercu(produit)}
        >
          <img 
            src={produit.image} 
            alt={produit.titre} 
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Info produit */}
        <div className="p-5">
          <span className="text-xs font-semibold text-purple-600 uppercase tracking-wider">
            {produit.categorie}
          </span>
          <h3 className="text-lg font-bold mt-1 mb-2 line-clamp-2">{produit.titre}</h3>
          
          {/* Caractéristiques techniques (apparaissent au survol) */}
          <AnimatePresence>
            {survole && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 overflow-hidden"
              >
                <div className="flex flex-wrap gap-2">
                  {produit.specsTechniques.map((spec, i) => (
                    <span 
                      key={i} 
                      className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Avis */}
          <div className="flex items-center mb-3">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FiStar 
                  key={i} 
                  className={`${i < Math.floor(produit.note || 0) ? "fill-current" : ""} ${
                    (produit.note || 0) % 1 > 0 && i === Math.floor(produit.note || 0) ? "text-yellow-400" : ""
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm ml-1">({produit.avis})</span>
          </div>

          {/* Couleurs */}
          {produit.couleurs && (
            <div className="flex mb-3">
              {produit.couleurs.map((couleur, i) => (
                <div 
                  key={i} 
                  className="w-5 h-5 rounded-full mr-2 border border-gray-300 shadow-sm"
                  style={{ backgroundColor: couleur }}
                />
              ))}
            </div>
          )}

          {/* Prix & Stock */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-xl font-bold text-gray-900">{produit.prix.toFixed(2)}€</span>
              <span className="text-gray-400 line-through ml-2 text-sm">{produit.prixOriginal.toFixed(2)}€</span>
              <span className="block text-green-600 text-sm font-medium">
                Économisez {calculerEconomie(produit.prix, produit.prixOriginal)}%
              </span>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${
              produit.stock > 5 ? 'bg-green-100 text-green-800' : 
              produit.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
            }`}>
              {produit.stock > 5 ? `${produit.stock} en stock` : produit.stock > 0 ? 'Stock faible' : 'En rupture'}
            </span>
          </div>

          {/* Bouton Ajouter au panier */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => ajouterAuPanier(produit)}
            disabled={produit.stock <= 0}
            className={`w-full ${
              produit.stock > 0 
                ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group shadow-md`}
          >
            <FiShoppingCart className="mr-2 group-hover:scale-110 transition-transform" />
            {produit.stock > 0 ? "Ajouter au panier" : "En rupture"}
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900">
      <Head>
        <title>Promotions | Tech Store</title>
        <meta name="description" content="Découvrez les meilleures promotions high-tech avec des offres à durée limitée" />
      </Head>

      {/* En-tête */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-purple-600">TechPromo</div>
          </div>

          <div className="hidden md:block w-1/3 mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher des promotions..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <nav className="flex items-center space-x-4 sm:space-x-6">
            <Link href="/" className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors">
              <FaStore className="text-lg" />
              <span className="hidden sm:inline">Accueil</span>
            </Link>
            <div className="flex items-center space-x-1 text-purple-600 font-medium">
              <FaBolt className="text-lg" />
              <span className="hidden sm:inline">Promos</span>
            </div>
            <Link href="/compte" className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors">
              <FaUser className="text-lg" />
              <span>Compte</span>
            </Link>
            <Link href="/liste-souhaits" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              {listeSouhaits.length > 0 ? (
                <FaHeart className="text-lg text-red-500" />
              ) : (
                <FaRegHeart className="text-lg text-gray-700" />
              )}
              {listeSouhaits.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {listeSouhaits.length}
                </span>
              )}
            </Link>
            <Link href="/panier" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <FaShoppingCart className="text-lg text-gray-700" />
              {panier.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {panier.length}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-6">
        {/* Section Hero */}
        <section className="mb-12">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-600 to-blue-500">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/90 to-blue-500/90"></div>
            <div className="relative z-10 p-6 md:p-12 lg:p-16 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <div className="flex items-center mb-4">
                  <FiZap className="text-yellow-300 mr-2 animate-pulse" />
                  <span className="text-sm font-semibold text-yellow-100">PROMO FLASH</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  High-Tech de Demain <br />
                  <span className="text-yellow-300">À Prix Cassés</span>
                </h1>
                <p className="text-purple-100 mb-6 text-lg">
                  Découvrez des technologies révolutionnaires avec des réductions exclusives à durée limitée.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <CompteARebours dateFin={new Date(Date.now() + 48 * 60 * 60 * 1000)} />
                  <button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center group shadow-lg">
                    Voir les offres
                    <FiChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              <div className="md:w-1/2 flex justify-center">
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                  className="relative"
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full max-w-md rounded-2xl shadow-xl"
                  >
                    <source src="/images/cadeau.webm" type="video/webm" />
                    Votre navigateur ne supporte pas les vidéos WebM.
                  </video>
                  <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-purple-900 px-4 py-2 rounded-lg font-bold shadow-lg">
                    Temps limité !
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Produits */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
              Promotions en Vedette
            </h2>
            
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <div className="md:hidden w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher des promotions..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={recherche}
                    onChange={(e) => setRecherche(e.target.value)}
                  />
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>
              
              <select
                value={categorieSelectionnee}
                onChange={(e) => setCategorieSelectionnee(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {categories.map(categorie => (
                  <option key={categorie} value={categorie}>{categorie}</option>
                ))}
              </select>
              
              <select
                value={tri}
                onChange={(e) => setTri(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="featured">Trier par : Vedettes</option>
                <option value="price-low-high">Prix : Croissant</option>
                <option value="price-high-low">Prix : Décroissant</option>
                <option value="newest">Nouveautés</option>
                <option value="rating">Meilleures notes</option>
              </select>
            </div>
          </div>

          {promotionsFiltrees.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-500">Aucun produit trouvé</h3>
              <p className="text-gray-400 mt-2">Essayez d'ajuster vos critères de recherche</p>
              <button 
                onClick={() => {
                  setRecherche('');
                  setCategorieSelectionnee('Toutes catégories');
                  setTri('featured');
                }}
                className="mt-4 text-purple-600 hover:text-purple-700 font-medium"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {promotionsFiltrees.map((produit) => (
                <CarteProduit key={produit.id} produit={produit} />
              ))}
            </div>
          )}
        </section>

        {/* Newsletter */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl p-8 md:p-12 overflow-hidden relative">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10">
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ne manquez aucune promo</h3>
                <p className="text-purple-100 mb-8 text-lg">
                  Abonnez-vous à notre newsletter pour recevoir les meilleures offres high-tech en avant-première.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                  <input 
                    type="email" 
                    placeholder="Votre adresse email" 
                    className="flex-grow bg-white/20 border border-white/30 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-purple-200"
                  />
                  <button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg">
                    S'abonner
                  </button>
                </div>
                <p className="text-purple-100 text-sm mt-4">
                  Nous respectons votre vie privée. Désabonnez-vous à tout moment.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Modal Aperçu Rapide */}
      <AnimatePresence>
        {modalOuverte && produitApercu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={fermerApercu}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={fermerApercu}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FiX className="text-gray-700" />
              </button>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <div className="bg-gray-100 rounded-lg p-4 h-80 flex items-center justify-center">
                      <img 
                        src={produitApercu.image} 
                        alt={produitApercu.titre} 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    {produitApercu.couleurs && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Couleurs disponibles :</h4>
                        <div className="flex gap-2">
                          {produitApercu.couleurs.map((couleur, i) => (
                            <div 
                              key={i} 
                              className="w-8 h-8 rounded-full border border-gray-300 shadow-sm"
                              style={{ backgroundColor: couleur }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="md:w-1/2">
                    <div className="flex items-center mb-2">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                        produitApercu.badge === "NOUVEAU" ? "bg-blue-500" : 
                        produitApercu.badge === "HOT" ? "bg-red-500" : "bg-purple-500"
                      } text-white`}>
                        {produitApercu.badge}
                      </span>
                      <span className="ml-2 text-xs font-semibold text-purple-600 uppercase tracking-wider">
                        {produitApercu.categorie}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold mb-2">{produitApercu.titre}</h2>

                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            className={`${i < Math.floor(produitApercu.note || 0) ? "fill-current" : ""} ${
                              (produitApercu.note || 0) % 1 > 0 && i === Math.floor(produitApercu.note || 0) ? "text-yellow-400" : ""
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm ml-1">({produitApercu.avis} avis)</span>
                      <span className={`ml-4 text-xs px-2 py-1 rounded-full ${
                        produitApercu.stock > 5 ? 'bg-green-100 text-green-800' : 
                        produitApercu.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {produitApercu.stock > 5 ? `${produitApercu.stock} en stock` : 
                         produitApercu.stock > 0 ? 'Stock faible' : 'En rupture'}
                      </span>
                    </div>

                    <div className="mb-6">
                      <span className="text-3xl font-bold text-gray-900">{produitApercu.prix.toFixed(2)}€</span>
                      <span className="text-gray-400 line-through ml-2">{produitApercu.prixOriginal.toFixed(2)}€</span>
                      <span className="block text-green-600 text-sm font-medium">
                        Économisez {calculerEconomie(produitApercu.prix, produitApercu.prixOriginal)}%
                      </span>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Caractéristiques principales :</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {produitApercu.specsTechniques.map((spec, i) => (
                          <li key={i} className="text-gray-600">{spec}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Spécifications :</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {produitApercu.caracteristiques.map((caract, i) => (
                          <div key={i} className="bg-gray-100 rounded px-3 py-2 text-sm">
                            {caract}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          ajouterAuPanier(produitApercu);
                          fermerApercu();
                        }}
                        disabled={produitApercu.stock <= 0}
                        className={`flex-1 ${
                          produitApercu.stock > 0 
                            ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white" 
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        } py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group shadow-md`}
                      >
                        <FiShoppingCart className="mr-2 group-hover:scale-110 transition-transform" />
                        {produitApercu.stock > 0 ? "Ajouter au panier" : "En rupture"}
                      </motion.button>
                      <button
                        onClick={() => toggleListeSouhaits(produitApercu.id)}
                        className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                      >
                        {listeSouhaits.includes(produitApercu.id) ? (
                          <FaHeart className="text-red-500" />
                        ) : (
                          <FaRegHeart className="text-gray-700" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer/>
    </div>
  
  );
};

export default PromotionsPage;