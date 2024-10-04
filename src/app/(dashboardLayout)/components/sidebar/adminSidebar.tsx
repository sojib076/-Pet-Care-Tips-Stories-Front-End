import {  DollarSign, Home, Laptop, User, } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sidebar } from "./sidebar.styles";



import { useSidebarContext } from "../../layout/layout-context";
import { SidebarItem } from "./sidebar-item";



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
     
          <Link className="flex" href="/newsfeed">
             GO TO NEWS FEED 
          </Link>
        </div>

        <div className="flex flex-col justify-between ">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<Home />}
              isActive={pathname === "/admin-dashboard"}
              href="/admin-dashboard"
            />
            <SidebarItem
              title="All User"
              icon={<User />}
              isActive={pathname === "/admin-dashboard/alluser"}
              href="/admin-dashboard/alluser"
            />
            <SidebarItem
              title="All Post"
              icon={<Laptop />}
              isActive={pathname === "/admin-dashboard/allpost"}
              href="/admin-dashboard/allpost"
            />
            <SidebarItem
              title="All Post"
              icon={<DollarSign />}
              isActive={pathname === "/admin-dashboard/allpost"}
              href="/admin-dashboard/allpost"
            />
   

         
   
          </div>
        </div>

      </div>
    </aside>
  );
};