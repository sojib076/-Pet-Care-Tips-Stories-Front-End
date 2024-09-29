import {  Cog, History, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sidebar } from "./sidebar.styles";


import { CollapseItems } from "./collapse-items";
import { useSidebarContext } from "../../layout/layout-context";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";



export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed } = useSidebarContext();
  
 

  return (
    <aside className="h-auto z-[20] sticky top-0  ">
      {collapsed ? 
      
      <div className={Sidebar.Overlay()} /> : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
     
          <Link className="flex" href="/">
            <Cog />
            <p className="font-bold text-inherit px-4">Sojib</p>
          </Link>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<Home />}
              isActive={pathname === "/dashboard"}
              href="/dashboard"
            />
            <SidebarMenu title="Main Menu">
         
              <CollapseItems
                icon={<History />}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Rent history"
              />
          
            </SidebarMenu>
            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="Changelog"
                icon={<Home />}
              />
            </SidebarMenu>
          </div>
        </div>

      </div>
    </aside>
  );
};