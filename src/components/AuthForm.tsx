
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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
          title: "Login successful",
          description: "Welcome back to Unified Payor Portal",
        });
      } else {
        toast({
          title: "Registration successful",
          description: "Your account has been created",
        });
      }
      navigate("/dashboard");
    }, 1000);
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isLogin ? "Log in" : "Create an account"}</CardTitle>
        <CardDescription>
          {isLogin 
            ? "Enter your credentials to access your account" 
            : "Fill out the form to create your provider account"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input 
                id="orgName"
                type="text" 
                value={orgName} 
                onChange={(e) => setOrgName(e.target.value)} 
                placeholder="Enter your organization name"
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              {isLogin && (
                <a href="#" className="text-sm text-portal-purple hover:underline">
                  Forgot password?
                </a>
              )}
            </div>
            <Input 
              id="password"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter your password"
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
            {isLoading ? "Processing..." : isLogin ? "Log in" : "Create account"}
          </Button>
          <div className="text-center text-sm">
            {isLogin ? (
              <span>
                Don't have an account?{" "}
                <a href="/signup" className="text-portal-purple hover:underline">
                  Sign up
                </a>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <a href="/login" className="text-portal-purple hover:underline">
                  Log in
                </a>
              </span>
            )}
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
