"use client";

import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";

const navItems = [
  {
    title: "Features",
    href: "/features",
    description: "Take a closer look at what our product can do for you.",
  },
  {
    title: "Pricing",
    href: "/pricing",
    description: "Choose the perfect plan for your needs.",
  },
  {
    title: "About",
    href: "/about",
    description: "Learn more about our company and mission.",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Read our latest articles and stay updated.",
  },
];

export default function ModernNavbar() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  // const router = useRouter();

  // const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const searchQuery = formData.get("search") as string;
  //   if (searchQuery) {
  //     router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  //   }
  // };

  return (
    <nav className="bg-white/90 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image src={"/logo.svg"} alt="" height={38} width={38} />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="bg-transparent text-black hover:bg-transparent">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] bg-transparent">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-orange-500 to-orange-600 p-6 no-underline outline-none focus:shadow-md"
                              href={item.href}
                            >
                              <div className="mt-4 text-lg font-medium text-white">
                                {item.title}
                              </div>
                              <p className="text-sm leading-tight text-white/90">
                                {item.description}
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {/* <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search..."
                name="search"
                className="w-64 pl-10"
              />
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            </form> */}

            {user ? (
              <>
                <UserButton />

                <Link href={"/dashboard"}>
                  <Button variant={"outline"} className="flex gap-2">
                    Dashboard
                    <ChevronRight />
                  </Button>
                </Link>
              </>
            ) : (
              <Link href={"/sign-in"}>
                <Button variant={"default"}>Sign In</Button>
              </Link>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">Open main menu</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription>
                    Navigate through our app with ease.
                  </SheetDescription>
                </SheetHeader>
                <nav className="mt-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
                <div className="mt-6 px-4">
                  {/* <form onSubmit={handleSearch} className="relative">
                    <Input
                      type="search"
                      placeholder="Search..."
                      name="search"
                      className="w-full pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  </form> */}
                </div>
                <div className="mt-6 px-4">
                  <Button
                    variant={"default"}
                    className="w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
