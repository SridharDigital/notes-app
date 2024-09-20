import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ThemeModeToggle } from "./ThemeModeToggle";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const Navbar = () => {
  return (
    <nav className="flex h-[10vh] items-center border-b bg-background">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Cenvic<span className="text-primary">Notes</span>
          </h1>
        </Link>

        <div className="flex items-center gap-x-5">
          <ThemeModeToggle />

          <div className="flex items-center gap-x-5">
            <LoginLink>
              <Button>Sign In</Button>
            </LoginLink>

            <RegisterLink>
              <Button variant="secondary">Sign Up</Button>
            </RegisterLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
