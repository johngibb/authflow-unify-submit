
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar({ isLoggedIn = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  
  return (
    <header className="w-full bg-white border-b border-gray-100 py-4 px-6 md:px-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center">
            <span className="text-portal-purple text-2xl font-bold">Unified</span>
            <span className="text-portal-teal text-2xl font-bold">{t("app.name")}</span>
          </Link>
          
          {isLoggedIn && (
            <nav className="hidden md:flex ml-8 space-x-6">
              <Link to="/dashboard" className="text-gray-700 hover:text-portal-purple transition-colors">
                {t("nav.dashboard")}
              </Link>
              <Link to="/submit-claim" className="text-gray-700 hover:text-portal-purple transition-colors">
                {t("nav.submit")}
              </Link>
              <Link to="/track-claims" className="text-gray-700 hover:text-portal-purple transition-colors">
                {t("nav.track")}
              </Link>
            </nav>
          )}
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <Button variant="ghost" className="text-portal-purple hover:text-portal-purple/90 hover:bg-gray-100">
                  {t("app.login")}
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-portal-purple hover:bg-portal-purple/90">
                  {t("app.register")}
                </Button>
              </Link>
            </>
          ) : (
            <Button className="bg-portal-purple hover:bg-portal-purple/90" onClick={() => console.log("Log out")}>
              {t("app.logout")}
            </Button>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSwitcher />
          <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-3 px-6 border-t border-gray-100 animate-fade-in">
          <nav className="flex flex-col space-y-3">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-portal-purple transition-colors">
                  {t("nav.dashboard")}
                </Link>
                <Link to="/submit-claim" className="text-gray-700 hover:text-portal-purple transition-colors">
                  {t("nav.submit")}
                </Link>
                <Link to="/track-claims" className="text-gray-700 hover:text-portal-purple transition-colors">
                  {t("nav.track")}
                </Link>
                <Button 
                  className="bg-portal-purple hover:bg-portal-purple/90 w-full mt-2" 
                  onClick={() => console.log("Log out")}
                >
                  {t("app.logout")}
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-portal-purple transition-colors">
                  {t("app.login")}
                </Link>
                <Link to="/signup" className="text-gray-700 hover:text-portal-purple transition-colors">
                  {t("app.register")}
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
