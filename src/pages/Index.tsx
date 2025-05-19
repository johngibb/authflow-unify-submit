
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Check } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
        <div className="container px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-portal-purple/10 text-portal-purple font-medium text-sm px-4 py-1.5 rounded-full mb-6">
              Streamlining Healthcare Administration
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              One Portal for All Your <span className="text-portal-purple">Prior Authorizations</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Submit, track, and manage all your prior authorization requests through one unified interface — regardless of the payor.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/signup">
                <Button className="bg-portal-purple hover:bg-portal-purple/90 px-8 py-6 text-lg">
                  Get Started
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="px-8 py-6 text-lg">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Spend Less Time on Paperwork, More Time on Patient Care
            </h2>
            <p className="text-xl text-gray-600">
              Our unified portal simplifies the prior authorization process across all insurance providers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-portal-purple/10 rounded-lg flex items-center justify-center mb-4">
                <Check className="text-portal-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">Unified Submission</h3>
              <p className="text-gray-600">Submit prior authorization requests to any payor through a single, intuitive interface.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-portal-purple/10 rounded-lg flex items-center justify-center mb-4">
                <Check className="text-portal-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-time Tracking</h3>
              <p className="text-gray-600">Monitor the status of all your submissions in real-time with detailed updates and notifications.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-portal-purple/10 rounded-lg flex items-center justify-center mb-4">
                <Check className="text-portal-purple" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Communication</h3>
              <p className="text-gray-600">Communicate directly with payor representatives through our secure messaging system.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container px-6 mx-auto">
          <div className="max-w-4xl mx-auto bg-portal-dark-bg text-white p-8 md:p-12 rounded-xl shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">What Healthcare Providers Are Saying</h2>
            </div>
            
            <blockquote className="text-lg md:text-xl mb-6 text-center">
              "This portal has transformed our prior authorization process. What used to take hours now takes minutes, allowing our team to focus on what truly matters: patient care."
            </blockquote>
            
            <div className="text-center">
              <p className="font-medium">Dr. Sarah Johnson</p>
              <p className="text-sm text-gray-300">Chief Medical Officer, Pacific Medical Group</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ready to Simplify Your Prior Authorization Process?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of healthcare providers who have streamlined their workflow with our unified payor portal.
            </p>
            <Link to="/signup">
              <Button className="bg-portal-purple hover:bg-portal-purple/90 px-8 py-6 text-lg">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-100 py-10 mt-auto">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <span className="text-portal-purple text-xl font-bold">Unified</span>
              <span className="text-portal-teal text-xl font-bold">Payor</span>
            </div>
            
            <div className="flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-portal-purple">About</a>
              <a href="#" className="text-gray-600 hover:text-portal-purple">Features</a>
              <a href="#" className="text-gray-600 hover:text-portal-purple">Contact</a>
              <a href="#" className="text-gray-600 hover:text-portal-purple">Privacy</a>
            </div>
          </div>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Unified Payor Portal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
