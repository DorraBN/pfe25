'use client';

import React, { useState } from 'react';
import {
  FiDownload, FiPackage, FiCheckCircle, FiCreditCard,
  FiDollarSign, FiUser, FiCalendar, FiX
} from 'react-icons/fi';
import { FaPaypal, FaCcVisa, FaBolt, FaShoppingCart, FaStore, FaUser } from 'react-icons/fa';
import { SiMastercard } from 'react-icons/si';
import Logo from '@/components/Layout/Header/Logo';


type Produit = {
    nom: string;
    prix: number;
    quantite: number;
    image?: string;
  };
  
  type Commande = {
    date: string;
    reference: string;
    membre: string;
    produits: Produit[];
    montant: number;
    paiement: string;
    etatPaiement: string;
    etatCommande: string;
    adresseLivraison: string;
    dateLivraison: string;
  };
  
  const CommandesPage = () => {
    const [selectedOrder, setSelectedOrder] = useState<Commande | null>(null);
    const [showDetails, setShowDetails] = useState(false);
  
    const commandes: Commande[] = [
      {
        date: '21 déc. 2028 18:57',
        reference: 'CIPCREF150001',
        membre: 'Lite Patrick',
        produits: [
          { image: "https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png", nom: 'Tel', prix: 19.99, quantite: 1 },
          { image: "https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png", nom: 'Tel', prix: 49.99, quantite: 1 },
          { image: "https://techland.tn/uploads/media/A3W794ov8Un6itnQXWiscbAelv4wVE362GXO7Hoj.png", nom: 'Tel', prix: 12.99, quantite: 1 }
        ],
        montant: 38.00,
        paiement: 'Carte bancaire',
        etatPaiement: 'PAYÉE',
        etatCommande: 'A PRÉPARER',
        adresseLivraison: '12 Rue des Lilas, 75000 Paris',
        dateLivraison: '25 déc. 2028'
      },
      {
        date: '21 déc. 2023 16:47',
        reference: 'CIPCREF150002',
        membre: 'Fuhundi Arnold',
        produits: [
          { nom: 'Chaussures de sport', prix: 89.99, quantite: 1 },
          { nom: 'Sweat à capuche', prix: 39.99, quantite: 2 },
          { nom: 'Caleçon', prix: 12.99, quantite: 2 }
        ],
        montant: 189.10,
        paiement: 'Chèque',
        etatPaiement: 'PAYÉE',
        etatCommande: 'ENVOYÉE',
        adresseLivraison: '45 Avenue des Champs, 69000 Lyon',
        dateLivraison: '28 déc. 2023'
      },
    ];
 
    const getPaymentIcon = (method: string): JSX.Element => {
        switch (method) {
          case 'Paypal':
            return <FaPaypal className="text-blue-500" />;
          case 'Carte bancaire':
            return (
              <div className="flex space-x-1">
                <FaCcVisa className="text-blue-900" />
                <SiMastercard className="text-red-500" />
              </div>
            );
          case 'Chèque':
            return <FiDollarSign className="text-green-500" />;
          default:
            return <FiCreditCard className="text-gray-500" />;
        }
      };

      const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold";
    return status === 'ENVOYÉE' ? (
      <span className={`${baseClasses} bg-green-100 text-green-800`}>
        <FiCheckCircle className="inline mr-1" /> {status}
      </span>
    ) : (
      <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
        <FiPackage className="inline mr-1" /> {status}
      </span>
    );
  };

  const handleRowClick = (commande: Commande) => {
    setSelectedOrder(commande);
    setShowDetails(!showDetails);
  };
  

  const closeDetails = () => {
    setShowDetails(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
        <div className="flex items-center justify-between border-b pb-4 mb-6">
              <div className="flex items-center space-x-2">
          <div className="ml-1">
            <Logo /> {/* Ici, on peut aussi ajuster la taille du logo dans le composant Logo */}
          </div>
          <div className="text-xl font-bold text-red-500 mr-3">E-commerce</div> {/* Réduit la taille du texte */}
        </div>
        
                <div className="flex space-x-6 text-sm">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
                    <FaStore className="text-xl text-purple-400" />
                    <span><a href="/#">Accueil</a></span>
                  </div>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-orange-500">
                    <FaBolt className="text-xl text-purple-400" />
                    <span>  <a href="/hotdeals">Promotions</a></span>
                  </div>
        
                  
                  <div className="bg-orange-500 p-3 rounded-full text-white hover:bg-orange-600 transition">
                    <FaShoppingCart className="text-2xl text-purple-400" />
                  </div>
                </div>
              </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Gestion des commandes
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <FiPackage className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Commandes aujourd'hui</p>
              <p className="text-xl font-bold">8</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <FiCheckCircle className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Commandes envoyées</p>
              <p className="text-xl font-bold">2</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg mr-4">
              <FiCreditCard className="text-yellow-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Dépense total</p>
              <p className="text-xl font-bold">499.90 €</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <FiUser className="text-purple-600 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Client fidél</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FiCalendar className="mr-2" /> Commandes du 11 décembre
            </h2>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <FiDownload className="mr-2" /> Télécharger les données
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Référence</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produits</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paiement</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">État</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {commandes.map((commande, index) => (
                  <React.Fragment key={index}>
                    <tr onClick={() => handleRowClick(commande)} className="hover:bg-gray-50 transition-colors cursor-pointer">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{commande.reference}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <FiCalendar className="mr-1 text-gray-400" size={12} />
                          {commande.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{commande.membre}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiPackage className="mr-2 text-blue-500" />
                          <span className="text-sm text-gray-900">
                            {commande.produits.length} article{commande.produits.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {commande.montant.toFixed(2)} €
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getPaymentIcon(commande.paiement)}
                          <span className="text-sm text-gray-500">{commande.paiement}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(commande.etatCommande)}
                      </td>
                    </tr>

                    {selectedOrder?.reference === commande.reference && showDetails && (
                      <tr className="bg-gray-50">
                      <td colSpan={6} className="px-6 py-4">
                          <div className="bg-white p-4 rounded-lg shadow-inner relative">
                            <button onClick={closeDetails} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                              <FiX size={20} />
                            </button>

                            <h3 className="text-lg font-semibold mb-4">Détails de la commande #{commande.reference}</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium mb-2 flex items-center">
                                  <FiPackage className="mr-2" /> Produits commandés
                                </h4>
                                <ul className="divide-y divide-gray-200">
                                  {commande.produits.map((produit, idx) => (
                                    <li key={idx} className="py-2 flex justify-between items-center">
                                      <div className="flex items-center space-x-3">
                                        {produit.image && (
                                          <img
                                            src={produit.image}
                                            alt={produit.nom}
                                            className="w-12 h-12 object-cover rounded"
                                          />
                                        )}
                                        <div>
                                          <span className="font-medium">{produit.nom}</span>
                                          <span className="text-gray-500 text-sm block">Quantité: {produit.quantite}</span>
                                        </div>
                                      </div>
                                      <div className="font-medium">
                                        {(produit.prix * produit.quantite).toFixed(2)} €
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                                <div className="border-t border-gray-200 pt-2 mt-2 font-bold text-right">
                                  Total: {commande.montant.toFixed(2)} €
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium mb-2 flex items-center">
                                  <FiUser className="mr-2" /> Informations
                                </h4>
                                <div className="space-y-3">
                                  <div>
                                    <p className="text-sm text-gray-500">Date de commande</p>
                                    <p>{commande.date}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Méthode de paiement</p>
                                    <div className="flex items-center">
                                      {getPaymentIcon(commande.paiement)}
                                      <span className="ml-2">{commande.paiement}</span>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Statut</p>
                                    {getStatusBadge(commande.etatCommande)}
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Adresse de livraison</p>
                                    <p>{commande.adresseLivraison}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-gray-500">Date estimée de livraison</p>
                                    <p>{commande.dateLivraison}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Affichage de <span className="font-medium">1</span> à <span className="font-medium">8</span> sur <span className="font-medium">8</span> commandes
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Précédent
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandesPage;
