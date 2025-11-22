import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { base44 } from '@/api/base44Client';
import { Music, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0118] via-[#1a0b2e] to-[#0a0118]">
      <style>{`
        :root {
          --primary: 270 95% 35%;
          --primary-foreground: 0 0% 100%;
          --accent: 280 100% 70%;
        }
        body {
          background: #0a0118;
        }
      `}</style>
      
      <header className="bg-[#0a0118]/95 backdrop-blur-xl border-b border-purple-500/20 sticky top-0 z-50 shadow-lg shadow-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-6">
              <Link to={createPageUrl('Feed')} className="flex items-center gap-3 group">
                <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 p-2 rounded-xl shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/60 transition-all">
                  <Music className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Prof. Jorge</h1>
                  <p className="text-xs text-purple-400">Escola de Violão</p>
                </div>
              </Link>
              
              <nav className="hidden md:flex items-center gap-1 ml-6">
                <Link to={createPageUrl('Feed')}>
                  <Button variant="ghost" className="text-purple-300 hover:text-white hover:bg-purple-900/30">
                    Comunidade
                  </Button>
                </Link>
                <Link to={createPageUrl('Courses')}>
                  <Button variant="ghost" className="text-purple-300 hover:text-white hover:bg-purple-900/30">
                    Cursos
                  </Button>
                </Link>
              </nav>
            </div>
            
            {user && (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 text-sm text-purple-300">
                  <User className="w-4 h-4" />
                  <span>{user.full_name || user.email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => base44.auth.logout()}
                  className="text-purple-300 hover:text-white hover:bg-purple-900/30"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="min-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  );
}
