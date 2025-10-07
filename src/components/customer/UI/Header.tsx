"use client";

import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Heart,
  Calendar,
  Package,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const accountDropdownRef = useRef<HTMLDivElement>(null);
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/services?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery("");
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
          {/* Search Bar - Hidden on very small screens */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className={`p-2 rounded-full transition-colors ${
                isScrolled 
                  ? "hover:bg-gray-100 text-gray-600" 
                  : "hover:bg-white/20 text-white"
              }`}
            >
              <Search className="w-5 h-5" />
            </button>
            
            {showSearch && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50">
                <form onSubmit={handleSearch} className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, services..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gold focus:border-gold outline-none"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="btn-primary px-4 py-2 text-sm"
                  >
                    Search
                  </button>
                </form>
              </div>
            )}
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
