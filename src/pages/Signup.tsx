
import Navbar from "@/components/Navbar";
import AuthForm from "@/components/AuthForm";

const Signup = () => {
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
