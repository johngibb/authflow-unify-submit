
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/contexts/TranslationContext";

interface AuthFormProps {
  isLogin?: boolean;
}

export default function AuthForm({ isLogin = true }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth process
    setTimeout(() => {
      setIsLoading(false);
      if (isLogin) {
        // In a real app, we'd validate credentials here
        localStorage.setItem("isLoggedIn", "true");
        toast({
          title: t("toast.login"),
          description: t("toast.login.desc"),
        });
      } else {
        toast({
          title: t("toast.register"),
          description: t("toast.register.desc"),
        });
      }
      navigate("/dashboard");
    }, 1000);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isLogin ? t("auth.login.title") : t("auth.signup.title")}</CardTitle>
        <CardDescription>
          {isLogin ? t("auth.login.description") : t("auth.signup.description")}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="orgName">{t("auth.orgName")}</Label>
              <Input 
                id="orgName"
                type="text" 
                value={orgName} 
                onChange={(e) => setOrgName(e.target.value)} 
                placeholder={t("auth.orgName")}
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">{t("auth.email")}</Label>
            <Input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder={t("auth.email")}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t("auth.password")}</Label>
              {isLogin && (
                <a href="#" className="text-sm text-portal-purple hover:underline">
                  {t("auth.forgotPassword")}
                </a>
              )}
            </div>
            <Input 
              id="password"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder={t("auth.password")}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            type="submit" 
            className="w-full bg-portal-purple hover:bg-portal-purple/90"
            disabled={isLoading}
          >
            {isLoading ? t("auth.processing") : isLogin ? t("auth.login.submit") : t("auth.signup.submit")}
          </Button>
          <div className="text-center text-sm">
            {isLogin ? (
              <span>
                {t("auth.noAccount")}{" "}
                <a href="/signup" className="text-portal-purple hover:underline">
                  {t("auth.signup")}
                </a>
              </span>
            ) : (
              <span>
                {t("auth.haveAccount")}{" "}
                <a href="/login" className="text-portal-purple hover:underline">
                  {t("app.login")}
                </a>
              </span>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
