"use client"
import Logo from '@/components/Layout/Header/Logo';
import { PackageCheck, Clock3, Truck, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import { FaStore, FaBolt, FaUser, FaShoppingCart } from 'react-icons/fa';

type TransactionStatus = 'Livré' | 'En cours' | 'Annulé';

interface Transaction {
  id: string;
  date: string;
  total: number;
  status: TransactionStatus;
  items: number;
  deliveryMethod: string;
  trackingNumber: string;
}

// Compléter le tableau transactions
const transactions: Transaction[] = [
  {
    id: '1001',
    date: '2025-04-15',
    total: 89.99,
    status: 'Livré',
    items: 3,
    deliveryMethod: 'Standard',
    trackingNumber: 'ABC123456789'
  },
  {
    id: '1002',
    date: '2025-04-10',
    total: 45.50,
    status: 'En cours',
    items: 1,
    deliveryMethod: 'Express',
    trackingNumber: 'XYZ987654321'
  },
  {
    id: '1003',
    date: '2025-03-30',
    total: 120.00,
    status: 'Annulé',
    items: 2,
    deliveryMethod: 'Standard',
    trackingNumber: 'LMN564738291'
  }
];

const statusStyles: Record<TransactionStatus, {
  icon: React.ComponentType<any>;
  color: string;
  iconColor: string;
}> = {
  'Livré': {
    icon: CheckCircle,
    color: 'bg-green-100 text-green-800',
    iconColor: 'text-green-500'
  },
  'En cours': {
    icon: Clock3,
    color: 'bg-blue-100 text-blue-800',
    iconColor: 'text-blue-500'
  },
  'Annulé': {
    icon: XCircle,
    color: 'bg-red-100 text-red-800',
    iconColor: 'text-red-500'
  }
};

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Logo />
            <span className="text-xl font-bold text-purple-700">E-commerce</span>
          </div>

          <nav className="flex items-center space-x-6">
            <Link href="/" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
              <FaStore className="text-lg" />
              <span className="text-sm font-medium">Accueil</span>
            </Link>
            <Link href="/deals" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 transition-colors">
              <FaBolt className="text-lg" />
              <span className="text-sm font-medium">Promotions</span>
            </Link>
            <Link href="/profile" className="hidden lg:flex items-center gap-2 bg-purple-700 text-white px-4 py-2 rounded-full hover:bg-purple-800 transition-colors">
              <FaUser className="text-lg" />
              <span className="text-sm font-medium">Mon compte</span>
            </Link>
            <button className="p-2 bg-orange-500 rounded-full text-white hover:bg-orange-600 transition-colors relative">
              <FaShoppingCart className="text-black " />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </button>
          </nav>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Historique des Commandes</h1>
          <p className="text-lg text-gray-600">Retrouvez toutes vos transactions passées</p>
        </div>

        <div className="space-y-6">
          {transactions.map((tx) => {
            const StatusIcon = statusStyles[tx.status].icon;
            return (
              <div
                key={tx.id}
                className="bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <span>Commande #{tx.id}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[tx.status].color} flex items-center gap-1`}>
                          <StatusIcon className={`w-3 h-3 ${statusStyles[tx.status].iconColor}`} />
                          {tx.status}
                        </span>
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">{tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="text-2xl font-bold text-indigo-600">{tx.total.toFixed(2)} €</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Mode de livraison</p>
                          <p className="font-medium">{tx.deliveryMethod}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-gray-100 text-gray-600">
                          <PackageCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Articles</p>
                          <p className="font-medium">{tx.items} article{tx.items > 1 ? 's' : ''}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-gray-100 text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">N° de suivi</p>
                          <p className="font-medium">{tx.trackingNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-6 py-3 flex justify-end">
                  <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm flex items-center gap-1 transition-colors">
                    Voir les détails
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <nav className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Précédent</button>
            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white">1</button>
            <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">2</button>
            <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">3</button>
            <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Suivant</button>
          </nav>
        </div>
      </div>
    </div>
  );
}
