import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, ChevronDown, ShoppingCart, User, Menu, X } from 'lucide-react';
import { navigationData } from '../data/navigation';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="bg-primary shadow-lg fixed w-full z-50 backdrop-blur-md top-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-accent-purple" />
              <span className="ml-2 text-xl font-bold text-neutral-white">
                MarcViews
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-neutral-white/80 hover:text-neutral-white transition-colors ${location.pathname === '/' ? 'text-neutral-white' : ''}`}>
              Home
            </Link>
            
            {navigationData.map((item) => (
              <div key={item.path} className="relative group">
                <Link 
                  to={item.path}
                  className={`flex items-center text-neutral-white/80 hover:text-neutral-white transition-colors ${
                    location.pathname.startsWith(item.path) ? 'text-neutral-white' : ''
                  }`}
                >
                  {item.title} 
                  <ChevronDown className="ml-1 h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200" />
                </Link>
                <div 
                  className="absolute left-0 top-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out pt-2"
                  style={{ 
                    transform: 'translateY(-10px)',
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <div className="bg-secondary-dark rounded-lg shadow-xl border border-primary-accent/20 overflow-hidden min-w-[240px]">
                    {item.children?.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block px-4 py-3 text-neutral-white/80 hover:text-neutral-white hover:bg-primary-light transition-all duration-200 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/cart')}
                className={`text-neutral-white/80 hover:text-neutral-white transition-colors p-2 rounded-full hover:bg-primary-light ${
                  location.pathname === '/cart' ? 'text-neutral-white bg-primary-light' : ''
                }`}
              >
                <ShoppingCart className="h-6 w-6" />
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className={`text-neutral-white/80 hover:text-neutral-white transition-colors p-2 rounded-full hover:bg-primary-light ${
                  location.pathname === '/profile' ? 'text-neutral-white bg-primary-light' : ''
                }`}
              >
                <User className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-white/80 hover:text-neutral-white p-2 rounded-lg hover:bg-primary-light transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden bg-secondary-dark border-t border-primary-accent/20 fixed w-full top-16 max-h-[calc(100vh-4rem)] overflow-y-auto transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className="block px-4 py-3 rounded-lg text-base font-medium text-neutral-white/80 hover:text-neutral-white hover:bg-primary-light transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          {navigationData.map((item) => (
            <div key={item.path}>
              <Link
                to={item.path}
                className="block px-4 py-3 rounded-lg text-base font-medium text-neutral-white/80 hover:text-neutral-white hover:bg-primary-light transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
              <div className="pl-4 space-y-1">
                {item.children?.map((child) => (
                  <Link
                    key={child.path}
                    to={child.path}
                    className="block px-4 py-2 rounded-lg text-sm text-neutral-white/70 hover:text-neutral-white hover:bg-primary-light transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="flex space-x-4 px-4 py-3">
            <Link
              to="/cart"
              className="text-neutral-white/80 hover:text-neutral-white p-2 rounded-full hover:bg-primary-light transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <Link
              to="/profile"
              className="text-neutral-white/80 hover:text-neutral-white p-2 rounded-full hover:bg-primary-light transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}