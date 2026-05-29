import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { subscribeToAuthChanges } from '../../../services/authService';
import useCartStore from '../../../store/cartStore';

export default function NavBar() {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    /*
      // BACKUP: OLD LOCALSTORAGE METHOD
      // const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
      // setLoggedInUser(user);
    */
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setLoggedInUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const isActive = (path) => location.pathname === path;

  /*
    // BACKUP: OLD LOCALSTORAGE METHOD
    // const handleLogout = () => {
    //   localStorage.removeItem('loggedInUser');
    //   setLoggedInUser(null);
    //   navigate('/login');
    // };
  */

  return (
    <nav className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-serif font-extrabold hover:opacity-90 transition-opacity"
          >
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent tracking-wide">
              FloraStore
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link
                to="/gallery"
                className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                  isActive('/gallery')
                    ? 'text-brand-emerald border-brand-emerald'
                    : 'text-neutral-400 border-transparent hover:text-neutral-200 hover:border-neutral-600'
                }`}
              >
                Galería
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                  isActive('/cart')
                    ? 'text-brand-emerald border-brand-emerald'
                    : 'text-neutral-400 border-transparent hover:text-neutral-200 hover:border-neutral-600'
                }`}
              >
                Carrito ({totalItems})
              </Link>
            </li>
            {loggedInUser ? (
              <li>
                <Link
                  to="/profile"
                  className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                    isActive('/profile')
                      ? 'text-brand-emerald border-brand-emerald'
                      : 'text-neutral-400 border-transparent hover:text-neutral-200 hover:border-neutral-600'
                  }`}
                >
                  Perfil
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                      isActive('/login')
                        ? 'text-brand-emerald border-brand-emerald'
                        : 'text-neutral-400 border-transparent hover:text-neutral-200 hover:border-neutral-600'
                    }`}
                  >
                    Ingresar
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                      isActive('/register')
                        ? 'text-brand-emerald border-brand-emerald'
                        : 'text-neutral-400 border-transparent hover:text-neutral-200 hover:border-neutral-600'
                    }`}
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}

