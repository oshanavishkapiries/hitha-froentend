/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import SearchPage from './components/SearchPage';
import MyAppointmentsModal from './components/MyAppointmentsModal';
import BlogsModal from './components/BlogsModal';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [showAppointments, setShowAppointments] = useState(false);
  const [showBlogs, setShowBlogs] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-cream font-sans selection:bg-sprout selection:text-forest">
      {/* Global Navigation Header */}
      <Navbar 
        onOpenAppointments={() => setShowAppointments(true)}
        onOpenBlogs={() => setShowBlogs(true)}
      />

      {/* Main Page Content Area */}
      <main className="flex-grow">
        {currentPath === '/search' ? (
          <SearchPage />
        ) : (
          <LandingPage />
        )}
      </main>

      {/* Conditional Modals */}
      {showAppointments && (
        <MyAppointmentsModal onClose={() => setShowAppointments(false)} />
      )}

      {showBlogs && (
        <BlogsModal onClose={() => setShowBlogs(false)} />
      )}

      {/* Simple Organic Footer */}
      <footer className="bg-forest text-white border-t border-hairline/20 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left space-y-1">
            <div className="flex items-center justify-center sm:justify-start space-x-2">
              <span className="font-display font-bold text-lg text-mint">Hitha (හිත)</span>
              <span className="text-xs text-sprout">| Digital Mental Sanctuary</span>
            </div>
            <p className="text-[11px] text-sprout/60 max-w-sm">
              Sri Lanka's local, privacy-first telehealth directory. Fully compliant with SLMC guidelines & safe trilingual care.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-sprout/70">
            <span>Secure SSL Encrypted</span>
            <span className="hidden sm:inline">•</span>
            <span>No Cookies / No Logs Collected</span>
            <span className="hidden sm:inline">•</span>
            <span>© 2026 Hitha Sri Lanka</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

