"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, FileText, Brain, Zap, Check } from "lucide-react";
import Navbar from "./_components/navbar";
import Link from "next/link";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission here
    console.log("Email submitted:", email);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 text-black">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                Unlock the Power of Your{" "}
                <span className="text-orange-600">PDFs</span> with AI
              </h1>
              <p className="mt-6 text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
                Upload, analyze, and get answers from your PDF documents using
                cutting-edge AI technology.
              </p>
              <div className="mt-10 relative inline-block">
                <Link href={"/sign-up"}>
                  <Button className="bg-black hover:bg-gray-800 text-white text-lg px-8 py-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
                    Start Free Trial
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-orange-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: FileText,
                  title: "PDF Upload & Processing",
                  description:
                    "Easily upload and process multiple PDF documents",
                },
                {
                  icon: Brain,
                  title: "AI-Powered Analysis",
                  description:
                    "Get intelligent insights and answers from your documents",
                },
                {
                  icon: Zap,
                  title: "Quick Answers",
                  description:
                    "Receive instant responses to your questions about the content",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-100 p-6 rounded-lg text-center"
                >
                  <feature.icon className="h-12 w-12 mx-auto text-black mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black text-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                "Upload your PDF documents to our secure platform",
                "Our AI analyzes and indexes the content",
                "Ask questions and get accurate answers instantly",
              ].map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 bg-white rounded-full p-3 text-black font-bold mr-4">
                    {index + 1}
                  </div>
                  <p className="text-lg">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
              Simple, Transparent Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Basic",
                  price: "$9/mo",
                  features: [
                    "50 PDFs/month",
                    "Basic AI analysis",
                    "Email support",
                  ],
                },
                {
                  name: "Pro",
                  price: "$29/mo",
                  features: [
                    "200 PDFs/month",
                    "Advanced AI analysis",
                    "Priority support",
                    "API access",
                  ],
                },
                {
                  name: "Enterprise",
                  price: "Custom",
                  features: [
                    "Unlimited PDFs",
                    "Custom AI training",
                    "24/7 support",
                    "Dedicated account manager",
                  ],
                },
              ].map((plan, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 text-center"
                >
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <p className="text-3xl font-extrabold mb-6">{plan.price}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center justify-center"
                      >
                        <Check className="h-5 w-5 text-black mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={index === 1 ? "default" : "outline"}
                    className={
                      index === 1
                        ? "bg-black hover:bg-gray-800 text-white"
                        : "border-black text-black hover:bg-gray-100"
                    }
                  >
                    {plan.name === "Enterprise"
                      ? "Contact Sales"
                      : "Get Started"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-6">
              Ready to revolutionize your PDF workflow?
            </h2>
            <p className="text-xl text-gray-800 mb-8">
              Join thousands of satisfied users and start getting answers from
              your PDFs today.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow max-w-md"
                required
              />
              <Button
                type="submit"
                className="bg-black text-white hover:bg-gray-800"
              >
                Start Free Trial
              </Button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <p>
              &copy; {new Date().getFullYear().toString()} AI PDF Reader. All
              rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
