import { FaHome, FaLaptop, FaDesktop, FaMicrochip, FaHeadphones, FaDownload, FaStar, FaRegStar, FaComments, FaFileAlt, FaPhoneAlt, FaTools, FaQuoteRight, FaQuestionCircle } from 'react-icons/fa';

interface SubmenuItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface HeaderItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  submenu?: SubmenuItem[];
}

export const headerData: HeaderItem[] = [
  { 
    label: "Accueil", 
    href: "/",
    icon: <FaHome className="mr-2" />
  },
  {
    label: "Produits",
    href: "/products",
    icon: <FaLaptop className="mr-2" />,
    submenu: [
      { label: "Ordinateurs de bureau", href: "/produits/ordinateurs-de-bureau", icon: <FaDesktop className="mr-2" /> },
      { label: "Laptops et tablettes", href: "/produits/laptops-et-tablettes", icon: <FaLaptop className="mr-2" /> },
      { label: "Composants PC", href: "/produits/composants", icon: <FaMicrochip className="mr-2" /> },
      { label: "Accessoires", href: "/produits/accessoires", icon: <FaHeadphones className="mr-2" /> },
      { label: "Logiciels", href: "/produits/logiciels", icon: <FaDownload className="mr-2" /> },
      { label: "Nouveautés", href: "/produits/nouveaux", icon: <FaStar className="mr-2" /> },
      { label: "Produits en solde", href: "/produits/solde", icon: <FaRegStar className="mr-2" /> }
    ]
  },
  {
    label: "Témoignages",
    href: "/Testimonial",
    icon: <FaComments className="mr-2" />,
    submenu: [
      { label: "Avis clients", href: "/temoignages/avis", icon: <FaQuoteRight className="mr-2" /> },
      { label: "Études de cas", href: "/temoignages/etudes", icon: <FaFileAlt className="mr-2" /> },
      { label: "Avis sur les services", href: "/temoignages/services", icon: <FaTools className="mr-2" /> }
    ]
  },
  {
    label: "Contactez-nous",
    href: "/#",
    icon: <FaPhoneAlt className="mr-2" />,
    submenu: [
      { label: "Support technique", href: "/contact/support", icon: <FaTools className="mr-2" /> },
      { label: "Demande de devis", href: "/contact/devis", icon: <FaFileAlt className="mr-2" /> },
      { label: "Questions fréquentes (FAQ)", href: "/contact/faq", icon: <FaQuestionCircle className="mr-2" /> }
    ]
  },
];