"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { AlignCenterIcon, X } from "lucide-react";
import Link from "next/link";

import { useUser } from "@/context/uAuthContext";
import { logout } from "@/Services/AuthServices";
import { useState } from "react";
import { ThemeSwitcher } from "./ThemeSwitcher";




export default function NavBar() {
  const routeMap: Record<string, string> = {
    user: "/dashboard",
    admin: "/admin-dashboard",
  };


  const { user, setIsLoading: userLoading, setUser } = useUser();

  const logOutUser = () => {
    logout();
    setUser(null);
    userLoading(false);
  };

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>

      <Navbar maxWidth="2xl" className="lg:block hidden font-bold">
        <NavbarBrand>
          <Link className="flex" href="/">

            <p className="font-bold text-inherit px-4"> PsTips </p>
          </Link>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center" >
          <NavbarItem>
            <Link color="foreground" href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/newsfeed">
              News feed
            </Link>
          </NavbarItem>
          <NavbarItem >
            <Link href="about" >
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="contact">
              Contact
            </Link>
          </NavbarItem>

          <NavbarItem>
            <ThemeSwitcher />
            </NavbarItem>



          <NavbarItem>
            {user && <Link href={routeMap[user?.role]}>Dashboard</Link>}
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">


          {user ? (
            <NavbarItem>
              <Button onClick={logOutUser} color="primary" variant="flat">
                Logout
              </Button>
            </NavbarItem>
          )
            : (
              <NavbarItem className="hidden lg:flex">
                <Link href="/login">Login</Link>
              </NavbarItem>
            )}

        </NavbarContent>
      </Navbar>

      {/* Mobile Header */}

      <div className="flex md:hidden justify-between px-4 py-3 bg-blue-900 text-white">
        <div>
          <h1 className="text-3xl font-bold text-primary-100">PsTips</h1>
        </div>
        <button
          className="text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <AlignCenterIcon
              className="transform rotate-90"
              size={24} />
          ) : (
            <AlignCenterIcon
              size={24}

            />
          )}
        </button>
      </div>



      <div
        className={`fixed top-0 right-0 h-full w-3/4  bg-blue-900/90 pl-5 text-white z-50 transform transition-transform duration-700 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between px-4 py-3">
          <h1 className="text-2xl font-bold text-primary-100">PsTips</h1>
          <button
            className="text-white focus:outline-none mr-5"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-4 items-start text-[15px] font-medium">


          <Link href={'/'} className="cursor-pointer hover:text-primary-100 transition-all">

            Home

          </Link>
          <Link href={'/newsfeed'} className="cursor-pointer hover:text-primary-100 transition-all">
            News Feed
          </Link>
          <Link href={'/about'} className="cursor-pointer hover:text-primary-100 transition-all">
            About
          </Link>
          <Link href={'/contact'} className="cursor-pointer hover:text-primary-100 transition-all">
            Contact
          </Link>
          {user && (
            <Link href={routeMap[user?.role]} className="cursor-pointer hover:text-primary-100 transition-all">
              Dashboard
            </Link>
          )}
          {
            user ? <Button onClick={logOutUser} variant="flat" className="cursor-pointe text-white bg-yellow-500/70 font-semibold my-5 ml-4  " >
              Logout
            </Button> : (
              <>
                <Link href={'/login'} className="cursor-pointer hover:text-primary-100 transition-all">
                  Login
                </Link>

                <Link href={'/register'} className="cursor-pointer hover:text-primary-100 transition-all">
                  Register
                </Link>
              </>
            )
          }
        </div>


      </div>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        >

        </div>
      )}

    </>
  );
}
