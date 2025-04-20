"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "../Header/Navigation/HeaderLink";
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink";
import { useTheme } from "next-themes";
import { 
  FaHome, 
  FaLaptop, 
  FaDesktop, 
  FaMicrochip, 
  FaHeadphones, 
  FaDownload, 
  FaStar, 
  FaRegStar, 
  FaComments, 
  FaFileAlt, 
  FaPhoneAlt, 
  FaTools, 
  FaQuoteRight, 
  FaQuestionCircle,
  FaSignInAlt,
  FaUserPlus,

  FaTimes
} from 'react-icons/fa';

const Header: React.FC = () => {
  const pathUrl = usePathname();
  const { theme, setTheme } = useTheme();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const navbarRef = useRef<HTMLDivElement>(null);
  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    setSticky(window.scrollY >= 10);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (signInRef.current && !signInRef.current.contains(event.target as Node)) {
      setIsSignInOpen(false);
    }
    if (signUpRef.current && !signUpRef.current.contains(event.target as Node)) {
      setIsSignUpOpen(false);
    }
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && navbarOpen) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navbarOpen, isSignInOpen, isSignUpOpen]);

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        sticky ? "shadow-lg bg-white py-4" : "shadow-none py-8"
      }`}
    >
      <div className="lg:py-0 py-2">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md flex items-center justify-between px-4">
          <Logo />
          
          <nav className="hidden lg:flex flex-grow items-center gap-8 justify-start ml-14">
            {headerData.map((item, index) => (
              <HeaderLink key={index} item={item} />
            ))}
           
          </nav>

          <div className="flex items-center gap-4">
            {/* Liens utilitaires avec icônes */}
           
            
            

            {/* Boutons de connexion */}
            <Link
              href="/register"
              className="hidden lg:flex items-center bg-transparent text-primary border hover:bg-primary border-primary hover:text-white duration-300 px-5 py-4 rounded-lg"
            >
              <FaSignInAlt className="mr-2" />
              Sign In
            </Link>
           
            <Link
              href="/register"
              className="hidden lg:flex items-center bg-primary text-white text-base font-medium hover:bg-transparent duration-300 hover:text-primary border border-primary px-5 py-4 rounded-lg"
            >
              <FaUserPlus className="mr-2" />
              Sign Up
            </Link> 

            {/* Bouton menu mobile */}
            <button
              onClick={() => setNavbarOpen(!navbarOpen)}
              className="block lg:hidden p-2 rounded-lg text-gray-700 dark:text-white"
              aria-label="Toggle mobile menu"
            >
              {navbarOpen ? (
                <FaTimes size={24} />
              ) : (
                <>
                  <span className="block w-6 h-0.5 bg-current"></span>
                  <span className="block w-6 h-0.5 bg-current mt-1.5"></span>
                  <span className="block w-6 h-0.5 bg-current mt-1.5"></span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Overlay du menu mobile */}
        {navbarOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40" />
        )}

        {/* Menu mobile */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed top-0 right-0 h-full w-full bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 max-w-xs ${
            navbarOpen ? "translate-x-0" : "translate-x-full"
          } z-50`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <Logo />
            <button
              onClick={() => setNavbarOpen(false)}
              className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white"
              aria-label="Close menu"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <nav className="flex flex-col items-start p-4 overflow-y-auto h-[calc(100%-120px)]">
            {headerData.map((item, index) => (
              <div key={index} className="w-full">
                <MobileHeaderLink item={item} />
                {item.submenu && (
                  <div className="ml-6 mt-1 space-y-2">
                    {item.submenu.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                      >
                        {subItem.icon}
                        <span className="ml-2">{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex flex-col space-y-3">
              <Link
                href="/register"
                className="flex items-center justify-center bg-transparent border border-primary text-primary px-4 py-3 rounded-lg hover:bg-primary hover:text-white"
              >
                <FaSignInAlt className="mr-2" />
                Sign In
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center bg-primary text-white px-4 py-3 rounded-lg hover:bg-primary-dark"
              >
                <FaUserPlus className="mr-2" />
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;