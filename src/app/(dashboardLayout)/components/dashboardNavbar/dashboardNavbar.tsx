import { Button, Input, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { ChevronLeft, Menu, SearchCheck } from "lucide-react";
import { useSidebarContext } from "@/app/(dashboardLayout)/layout/layout-context";
import { useUser } from "@/context/uAuthContext";

import { logout } from "@/Services/AuthServices";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const { collapsed, setCollapsed } = useSidebarContext();


  const router = useRouter();

  const {user,setUser,setIsLoading}=useUser();
  const logOutUser = () => {
    logout();
    setUser(null);
    setIsLoading(true);
    router.push("/login");


   
  };
  

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden ">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          {collapsed ? (
            <ChevronLeft onClick={setCollapsed}></ChevronLeft>
          ) : (
            <Menu onClick={setCollapsed}></Menu>
          )}

        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <Input
            startContent={<SearchCheck />}
            isClearable
            className="w-full"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search..."
          />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          {
            user && (<>
            <Button onClick={logOutUser} color="primary" variant="flat">
              Logout
            </Button>
            </>)
          }
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};