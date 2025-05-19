
import Navbar from "@/components/Navbar";
import AuthForm from "@/components/AuthForm";
import { useTranslation } from "@/contexts/TranslationContext";

const Signup = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6">
        <AuthForm isLogin={false} />
      </div>
    </div>
  );
};

export default Signup;
