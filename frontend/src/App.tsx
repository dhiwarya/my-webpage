import './App.css'
import { useState, useEffect } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Timeline } from "@/components/Timeline"
import { RecentContent } from "@/components/RecentContent"
import { Footer } from "@/components/Footer"
import { LoginPage } from "@/components/LoginPage"
import { AdminDashboard } from "@/components/AdminDashboard"
import { AuthProvider, useAuth } from "@/contexts/AuthContext"

// Simple router based on hash
type Page = 'home' | 'login' | 'admin';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Handle hash-based routing
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'login') {
        setCurrentPage('login');
      } else if (hash === 'admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Redirect to admin if authenticated and on login page
  useEffect(() => {
    if (isAuthenticated && currentPage === 'login') {
      window.location.hash = 'admin';
    }
  }, [isAuthenticated, currentPage]);

  // Redirect to login if not authenticated and trying to access admin
  useEffect(() => {
    if (!isLoading && !isAuthenticated && currentPage === 'admin') {
      window.location.hash = 'login';
    }
  }, [isAuthenticated, isLoading, currentPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (currentPage === 'login') {
    return <LoginPage />;
  }

  if (currentPage === 'admin' && isAuthenticated) {
    return <AdminDashboard />;
  }

  const navItems = [
    { label: "Homepage", href: "#" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "#blog" },
    { label: "Admin", href: "#login" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    href={item.href}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Timeline />
        <RecentContent />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
