import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { LoginModal } from "./LoginModal";

const navLinks = [
  { to: "home", label: "Home" },
  { to: "booking", label: "Book Now" },
  { to: "about", label: "About" },
  { to: "venmo", label: "Venmo" },
  { to: "contact", label: "Contact" },
];

export function Navigation() {
  const { user, loading, signOut, isEditMode, setEditMode } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2 bg-gray-900/80 backdrop-blur-lg shadow-xl" : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="home" smooth={true} duration={500} className="cursor-pointer">
          <h1 className="text-2xl font-bold text-white tracking-wider" style={{ fontFamily: 'Fontdiner Swanky, cursive' }}>
            MOOSEOLOGY101
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="px-4 py-2 text-white rounded-md hover:bg-blue-500/20 transition-colors relative group"
              activeClass="bg-blue-500/30 font-semibold"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
          {/* Admin login / logout – only show when auth has finished loading */}
          {!loading && (
            user ? (
              <>
                <button
                  type="button"
                  onClick={() => setEditMode(!isEditMode)}
                  className={`px-4 py-2 text-white rounded-md transition-colors ${
                    isEditMode ? "bg-yellow-600/90 hover:bg-yellow-500/90" : "hover:bg-blue-500/20"
                  }`}
                  title="Toggle edit mode"
                >
                  {isEditMode ? "Exit edit" : "Edit site"}
                </button>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="px-4 py-2 text-white rounded-md hover:bg-blue-500/20 transition-colors"
                >
                  Log out
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsLoginOpen(true)}
                className="px-4 py-2 text-white rounded-md hover:bg-blue-500/20 transition-colors"
              >
                Log in
              </button>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="space-y-2">
              <span
                className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              ></span>
              <span
                className={`block w-8 h-0.5 bg-white transition-opacity duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-8 h-0.5 bg-white transition-transform duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className="md:hidden bg-gray-900/95 backdrop-blur-lg absolute top-full left-0 right-0"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col items-center py-4">
              {navLinks.map(({ to, label }) => (
                <li key={to} className="w-full text-center">
                  <Link
                    to={to}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    className="block py-3 text-white hover:bg-blue-500/20 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              {!loading && (
                <li className="w-full text-center">
                  {user ? (
                    <div className="w-full">
                      <button
                        type="button"
                        onClick={() => {
                          setEditMode(!isEditMode);
                          setIsMenuOpen(false);
                        }}
                        className={`block py-3 text-white transition-colors w-full ${
                          isEditMode ? "bg-yellow-600/90 hover:bg-yellow-500/90" : "hover:bg-blue-500/20"
                        }`}
                      >
                        {isEditMode ? "Exit edit" : "Edit site"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          signOut();
                          setIsMenuOpen(false);
                        }}
                        className="block py-3 text-white hover:bg-blue-500/20 transition-colors w-full"
                      >
                        Log out
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => { setIsLoginOpen(true); setIsMenuOpen(false); }}
                      className="block py-3 text-white hover:bg-blue-500/20 transition-colors w-full"
                    >
                      Log in
                    </button>
                  )}
                </li>
              )}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Login modal for admin (Moose) – opens when "Log in" is clicked */}
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
}