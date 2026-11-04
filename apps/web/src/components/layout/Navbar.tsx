import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Frame, FolderKanban, LogOut, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore.js';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const searchParams = new URLSearchParams(location.search);
  const activeCategory = location.pathname.startsWith('/templates') ? searchParams.get('category') : null;
  const isAllTemplates = location.pathname === '/templates' && !activeCategory;

  const navCategories = [
    { label: 'All Templates', to: '/templates', category: null, isActive: isAllTemplates },
    { label: 'Birthday', to: '/templates?category=birthday', category: 'birthday', isActive: activeCategory === 'birthday' },
    { label: 'Anniversary', to: '/templates?category=anniversary', category: 'anniversary', isActive: activeCategory === 'anniversary' },
    { label: 'Baby & Kids', to: '/templates?category=baby', category: 'baby', isActive: activeCategory === 'baby' },
    { label: 'Calendar', to: '/templates?category=calendar', category: 'calendar', isActive: activeCategory === 'calendar' },
    { label: 'Family', to: '/templates?category=family', category: 'family', isActive: activeCategory === 'family' },
  ];

  return (
    <nav className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 select-none">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-200 group-hover:scale-105 transition">
            <Frame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition">
              FrameCraft<span className="text-indigo-600 font-extrabold">Studio</span>
            </span>
          </div>
        </Link>

        {/* Navigation Categories */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4 text-sm font-medium">
          {navCategories.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => {
                if (location.pathname === '/templates' && activeCategory === item.category) {
                  const el = document.getElementById('templates-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className={`transition px-2.5 py-1 rounded-lg ${
                item.isActive
                  ? 'text-indigo-600 bg-indigo-50 font-semibold'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Actions: My Projects & Auth */}
        <div className="flex items-center space-x-3">
          <Link
            to="/my-projects"
            className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-lg transition"
            id="my-projects-link"
          >
            <FolderKanban className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">My Projects</span>
          </Link>

          {user ? (
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <span className="text-xs font-semibold text-slate-800 hidden md:inline">
                {user.name}
              </span>
              <button
                onClick={() => logout()}
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-50 transition"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/signin"
                className="px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 transition"
              >
                Sign In
              </Link>
              <Link
                to="/templates"
                className="flex items-center space-x-1.5 px-4 py-1.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm hover:shadow transition"
                id="get-started-btn"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Started</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
