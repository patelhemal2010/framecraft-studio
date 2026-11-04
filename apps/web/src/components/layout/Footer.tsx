import React from 'react';
import { Frame, Heart, ShieldCheck, Printer, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Frame className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                FrameCraft Studio
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Professional online photo collage maker and personalized frame designer. Turn precious memories into 300 DPI print-ready artwork.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/templates?category=birthday" className="hover:text-white transition">
                  Birthday Collages
                </Link>
              </li>
              <li>
                <Link to="/templates?category=anniversary" className="hover:text-white transition">
                  Anniversary & Hearts
                </Link>
              </li>
              <li>
                <Link to="/templates?category=baby" className="hover:text-white transition">
                  Baby Milestones
                </Link>
              </li>
              <li>
                <Link to="/templates?category=calendar" className="hover:text-white transition">
                  Photo Calendars
                </Link>
              </li>
              <li>
                <Link to="/templates?category=family" className="hover:text-white transition">
                  Family Heirloom Posters
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Print Fidelity
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-1.5">
                <Printer className="w-3.5 h-3.5 text-indigo-400" />
                <span>300 DPI High-Resolution</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Lossless PNG & Print PDF</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Standard Frames (4x6, 8x10, A4)</span>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
              Privacy & Security
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Your photos are processed safely in your browser and on secure servers. Guest drafts are saved in private local storage.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FrameCraft Studio. All rights reserved.</p>
          <p className="flex items-center space-x-1 mt-2 sm:mt-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for timeless memories.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
