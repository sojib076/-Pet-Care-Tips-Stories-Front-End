"use client";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import {  Dog } from "lucide-react";
import Link from "next/link";

import { useUser } from "@/context/uAuthContext";
import { logout } from "@/Services/AuthServices";




// import { ThemeSwitcher } from "./ThemeSwitcher";
export default function NavBar() {
  const routeMap: Record<string, string> = {
    user: "/dashboard",
    admin: "/admin-dashboard",
  };
 


  const {user,setIsLoading:userLoading,setUser}=useUser();

  
  
  const logOutUser = () => {

    logout();
    setUser(null);
    userLoading(false);
    
    
   
  
  };

  return (
    <Navbar maxWidth="2xl">
      <NavbarBrand>
        <Link className="flex" href="/">
          <Dog size={32} />
          <p className="font-bold text-inherit px-4"> </p>
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
          {/* {user && <Link href={routeMap[user?.role]}>Dashboard</Link>} */}

          <Link href={routeMap.user}>Dashboard</Link>
          
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
  );
}
