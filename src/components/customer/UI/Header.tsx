"use client";

import {
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Heart,
  Calendar,
  Package,
  Phone,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const accountDropdownRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAccountDropdownOpen(false);
      }
      if (
        phoneRef.current &&
        !phoneRef.current.contains(event.target as Node)
      ) {
        setShowPhoneNumber(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleDropdown = (item: string) => {
    setOpenDropdown(openDropdown === item ? null : item);
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const togglePhoneNumber = () => {
    setShowPhoneNumber(!showPhoneNumber);
  };

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Services",
      href: "#",
      dropdown: [
        { name: "Hair", href: "hair" },
        { name: "Skin", href: "skin" },
        { name: "Nail", href: "nail" },
        { name: "Body", href: "body" },
      ],
    },
    { name: "Book Appointment", href: "book" },
    { name: "Membership", href: "membership" },
    { name: "Gallery", href: "gallery" },
    { name: "Contact", href: "/contact" },
    { name: "About Us", href: "aboutus" },
    {
      name: "Policies",
      href: "#",
      dropdown: [
        { name: "Terms & Conditions", href: "terms-conditions" },
        { name: "Privacy Policy", href: "privacy-policy" },
      ],
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  const accountMenuItems = [
    { name: "My Profile", href: "/profile", icon: User },
    { name: "My Appointments", href: "/appointments", icon: Calendar },
    { name: "My Memberships", href: "/my-memberships", icon: Package },
  ];

  return (
    <>
      {/* Top Bar with Logo and Icons */}
      <div
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 py-2 sm:py-4 z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" 
            : "bg-black/90 backdrop-blur-sm"
        }`}
      >
        <Link href="/" className="flex items-center">
          <img src="/logo.png" alt="Enlive" className="h-6 sm:h-8 w-auto" />
          
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* CTA Button - Call Now */}
          <div className="flex items-center gap-2">
            <a
              href="tel:+919637733733"
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? "bg-gold text-black hover:bg-gold-dark shadow-md"
                  : "bg-gold text-black hover:bg-gold-dark shadow-lg"
              }`}
              style={{ textDecoration: 'none' }}
            >
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline text-sm font-medium">9637733733</span>
            </a>
            <a
              href="https://wa.me/919637733733"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 bg-green-500 text-white hover:bg-green-600 shadow-lg`}
              style={{ textDecoration: 'none' }}
              aria-label="Chat on WhatsApp"
            >
              {/* WhatsApp SVG icon inline */}
              <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}><path fill="currentColor" d="M16 3C9.383 3 4 8.383 4 15c0 2.389.66 4.615 1.8 6.524L3.062 29.393c-.177.328-.08.741.227.961a.701.701 0 00.306.101c.118 0 .233-.036.332-.107l7.04-4.934C12.418 26.426 14.169 27 16 27c6.617 0 12-5.383 12-12S22.617 3 16 3zm0 22c-1.821 0-3.572-.574-5.027-1.579a.999.999 0 00-1.076-.062l-5.389 3.779 2.042-5.236a1 1 0 00-.082-.906C5.109 19.024 5 17.026 5 15 5 9.486 9.486 5 15 5s10 4.486 10 10-4.486 10-10 10zm5.065-7.095c-.416-.208-2.424-1.197-2.799-1.333-.375-.136-.65-.208-.926.208-.274.417-1.062 1.333-1.301 1.606-.24.271-.48.312-.896.104-.417-.208-1.764-.666-3.364-2.128-.623-.555-1.043-1.24-1.167-1.456-.24-.416-.025-.64.182-.847.188-.186.417-.481.626-.72.208-.24.278-.417.417-.695.138-.278.07-.521-.033-.73-.104-.208-.926-2.243-1.27-3.036-.334-.804-.677-.697-.926-.71a8.224 8.224 0 00-.771-.014c-.25 0-.651.093-.992.464-.342.37-1.299 1.27-1.299 3.095s1.334 3.583 1.52 3.833c.186.25 2.628 4.058 6.366 5.261.892.294 1.587.469 2.131.6.895.214 1.711.184 2.353.112 1.517-.181 2.316-1.132 2.457-2.221.17-1.307.122-1.267-.293-1.475z"/></svg>
              <span className="hidden sm:inline text-sm font-medium">WhatsApp</span>
            </a>
          </div>

          {/* Account Dropdown - Always visible */}
          {user ? (
            <div className="relative" ref={accountDropdownRef}>
              <button
                onClick={toggleAccountDropdown}
                className={`flex items-center gap-1 sm:gap-2 p-2 rounded-full transition-colors ${
                  isScrolled 
                    ? "hover:bg-gray-100 text-gray-600" 
                    : "hover:bg-white/20 text-white"
                }`}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gold rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                </div>
                <ChevronDown
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform hidden sm:block ${
                    isAccountDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isAccountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white text-black rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Hello, {user.name}!</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>

                  {accountMenuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                        onClick={() => setIsAccountDropdownOpen(false)}
                      >
                        <IconComponent className="w-4 h-4 mr-3 text-gray-500" />
                        {item.name}
                      </Link>
                    );
                  })}
                  
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative" ref={accountDropdownRef}>
              <button
                onClick={toggleAccountDropdown}
                className={`flex items-center gap-1 sm:gap-2 p-2 rounded-full transition-colors ${
                  isScrolled 
                    ? "hover:bg-gray-100 text-gray-600" 
                    : "hover:bg-white/20 text-white"
                }`}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gold rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                </div>
                <ChevronDown
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform hidden sm:block ${
                    isAccountDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isAccountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 sm:w-64 bg-white text-black rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">Account</p>
                    <p className="text-xs text-gray-500">Sign in to your account</p>
                  </div>
                  
                  <Link
                    href="/auth/login"
                    className="flex items-center px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                    onClick={() => setIsAccountDropdownOpen(false)}
                  >
                    <User className="w-4 h-4 mr-3 text-gray-500" />
                    Login
                  </Link>
                  
                  <Link
                    href="/auth/signup"
                    className="flex items-center px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                    onClick={() => setIsAccountDropdownOpen(false)}
                  >
                    <User className="w-4 h-4 mr-3 text-gray-500" />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button - Always visible on mobile */}
          <button 
            onClick={toggleMenu} 
            className={`md:hidden p-2 rounded-full transition-colors ${
              isScrolled 
                ? "hover:bg-gray-100 text-gray-600" 
                : "hover:bg-white/20 text-white"
            }`}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Bar with Background */}
      <div
        className={`fixed left-0 w-full hidden md:block z-40 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200 top-16" 
            : "bg-black/80 backdrop-blur-sm top-20"
        }`}
      >
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-center">
            <ul className={`flex items-center space-x-8 py-4 text-sm ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}>
              {navItems.map((item) => (
                <li key={item.name} className="relative group">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => handleDropdown(item.name)}
                        className={`flex items-center py-2 transition-colors ${
                          isScrolled 
                            ? "hover:text-gold" 
                            : "hover:text-gold"
                        }`}
                      >
                        {item.name}
                        <ChevronDown className="w-4 h-4 ml-1" />
                      </button>
                      <div className="absolute hidden group-hover:block bg-white text-black rounded-xl shadow-xl border border-gray-200 p-2 min-w-[200px] z-50">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 hover:bg-gold hover:text-black rounded-lg transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`py-2 transition-colors ${
                        isScrolled 
                          ? "hover:text-gold" 
                          : "hover:text-gold"
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-16 sm:top-20 left-0 w-full h-screen bg-white/95 backdrop-blur-md text-black pt-6 px-4 sm:px-6 flex flex-col z-40">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => handleDropdown(item.name)}
                      className="py-3 sm:py-4 w-full text-left flex justify-between items-center border-b border-gray-200 hover:text-gold transition-colors"
                    >
                      {item.name}
                      <ChevronDown
                        className={`w-4 h-4 transform transition-transform ${
                          openDropdown === item.name ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openDropdown === item.name && (
                      <div className="pl-4 mt-2 space-y-2 pb-4">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block py-3 text-gray-600 hover:text-gold transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="py-3 sm:py-4 border-b border-gray-200 block hover:text-gold transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Account menu items in mobile view */}
          {user ? (
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 rounded-lg mb-3 sm:mb-4">
                <p className="text-sm font-semibold text-gray-900">Hello, {user.name}!</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                {accountMenuItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <IconComponent className="w-4 h-4 mr-3 text-gray-500" />
                      {item.name}
                    </Link>
                  );
                })}
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full py-2 sm:py-3 px-3 sm:px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <div className="flex flex-col gap-2 sm:gap-3">
                <Link
                  href="/auth/login"
                  className="w-full py-2 sm:py-3 px-3 sm:px-4 text-center border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="w-full py-2 sm:py-3 px-3 sm:px-4 text-center bg-gold text-black rounded-lg hover:bg-gold-dark transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}

          
        </div>
      )}

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-14 sm:h-20"></div>
    </>
  );
}
