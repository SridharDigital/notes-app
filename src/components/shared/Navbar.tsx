"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import ThemeToggle from "./ThemeToggle";
import UserNav from "./UserNav";
import { Menu, X } from "lucide-react";

interface User {
  email?: string;
  picture?: string;
  given_name?: string;
}

const MobileMenu: React.FC<{
  isAuthenticated: boolean;
  user: User | null;
  onClose: () => void;
}> = ({ isAuthenticated, user, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-y-0 right-0 w-3/4 max-w-sm bg-background shadow-lg">
        <div className="flex justify-end p-4">
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-y-4 p-4">
          {isAuthenticated ? (
            <UserNav
              email={user?.email ?? ""}
              image={user?.picture ?? ""}
              name={user?.given_name ?? ""}
            />
          ) : (
            <>
              <LoginLink>
                <Button className="w-full">Sign In</Button>
              </LoginLink>
              <RegisterLink>
                <Button variant="secondary" className="w-full">
                  Sign Up
                </Button>
              </RegisterLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useKindeAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  if (!isLoaded) {
    return null;
  }

  return (
    <nav className="border-b bg-background">
      <div className="container flex h-[10vh] items-center justify-between">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Cenvic<span className="text-primary">Notes</span>
          </h1>
        </Link>

        <div className="flex items-center gap-x-5">
          <ThemeToggle />

          <div className="hidden items-center gap-x-5 md:flex">
            {isAuthenticated ? (
              <UserNav
                email={user?.email ?? ""}
                image={user?.picture ?? ""}
                name={user?.given_name ?? ""}
              />
            ) : (
              <>
                <LoginLink>
                  <Button>Sign In</Button>
                </LoginLink>
                <RegisterLink>
                  <Button variant="secondary">Sign Up</Button>
                </RegisterLink>
              </>
            )}
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <MobileMenu
          isAuthenticated={isAuthenticated}
          user={user}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
