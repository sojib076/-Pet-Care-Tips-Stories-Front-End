import {  Input, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { ChevronLeft, Menu, SearchCheck } from "lucide-react";
import { useSidebarContext } from "@/app/(dashboardLayout)/layout/layout-context";
import { useUser } from "@/context/uAuthContext";


import { UserDropdown } from "./user-dropdown";


interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const { collapsed, setCollapsed } = useSidebarContext();



  const {user}=useUser();




  

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
            <UserDropdown></UserDropdown>
            </>)
          }
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};