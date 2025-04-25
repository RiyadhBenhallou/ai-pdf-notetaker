import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function PricingGrid() {
  const tiers = [
    {
      name: "Basic",
      price: "$9",
      description: "For individuals and small teams",
      features: [
        "Upload up to 50 PDFs per month",
        "AI-powered question answering",
        "Basic text extraction",
        "Email support",
      ],
    },
    {
      name: "Pro",
      price: "$29",
      description: "For growing businesses",
      features: [
        "Upload up to 200 PDFs per month",
        "Advanced AI question answering",
        "Full text and image extraction",
        "Priority email support",
        "API access",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited PDF uploads",
        "Custom AI model training",
        "Advanced analytics and reporting",
        "24/7 phone and email support",
        "Dedicated account manager",
        "Custom integrations",
      ],
    },
  ];

  return (
    <div className="py-12 bg-gray-50 rounded">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pricing Plans
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Choose the perfect plan for your AI-powered PDF reading needs
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  {tier.name}
                </CardTitle>
                <CardDescription className="mt-2">
                  {tier.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <span className="text-4xl font-extrabold">{tier.price}</span>
                  {tier.name !== "Enterprise" && (
                    <span className="text-base font-medium text-gray-500">
                      /month
                    </span>
                  )}
                </div>
                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="shrink-0">
                        <Check className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="ml-3 text-base text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  variant={tier.name === "Pro" ? "default" : "outline"}
                >
                  {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
