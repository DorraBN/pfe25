// pages/magasiner-par-marques.js
import React from 'react';
import Head from 'next/head';
import { FiTruck, FiRefreshCw, FiHeadphones, FiShield } from 'react-icons/fi';

const MagasinerParMarques = () => {
    const features = [
      {
        title: "High-Tech",
        description: "Livraison Gratuite",
        detail: "Expédition gratuite pour +100$",
        icon: FiTruck,
        color: "bg-blue-100 text-blue-600"
      },
      {
        title: "Retour Gratuit",
        description: "Politique 30 jours",
        detail: "Sans justification",
        icon: FiRefreshCw,
        color: "bg-purple-100 text-purple-600"
      },
      {
        title: "Support Client",
        description: "Assistance 24/7",
        detail: "Nous sommes toujours là",
        icon: FiHeadphones,
        color: "bg-green-100 text-green-600"
      },
      {
        title: "Garantie Satisfait",
        description: "Qualité Vérifiée",
        detail: "Contrôlé par nos experts",
        icon: FiShield,
        color: "bg-amber-100 text-amber-600"
      }
    ];
  
    return (
      <div className="min-h-100 bg-gradient-to-br from-gray-50 to-gray-100">
        
  
        <main className="container mx-auto px-4 py-12">
         
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className={`${feature.color} w-14 h-14 rounded-full flex items-center justify-center mb-6 mx-auto`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h2 className="text-xl font-bold text-center mb-3 text-gray-800">{feature.title}</h2>
                  <p className="text-gray-600 text-center mb-2 font-medium">{feature.description}</p>
                  {feature.detail && <p className="text-sm text-gray-500 text-center">{feature.detail}</p>}
                </div>
              );
            })}
          </div>
  
          
        </main>
      </div>
    );
  };
  

export default MagasinerParMarques;