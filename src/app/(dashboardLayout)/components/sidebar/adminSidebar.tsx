import {   Home, Laptop, Pen, User, } from "lucide-react";
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
              title="All Users"
              icon={<User />}
              isActive={pathname === "/admin-dashboard/alluser"}
              href="/admin-dashboard/alluser"
            />
            <SidebarItem
              title="Users Posts "
              icon={<User />}
              isActive={pathname === "/admin-dashboard/userspost"}
              href="/admin-dashboard/userspost"
            />

            <SidebarItem
              title="Your Posts"
              icon={<Laptop />}
              isActive={pathname === "/admin-dashboard/allpost"}
              href="/admin-dashboard/allpost"
            />
            <SidebarItem
              title="Create Post"
              icon={<Pen />}
              isActive={pathname === "/admin-dashboard/creation"}
              href="/admin-dashboard/creation"
            />
               <SidebarItem
              title="Create PDF"
              icon={<Laptop />}
              isActive={pathname === "/dashboard/createpdf"}
              href="/admin-dashboard/createpdf"
            />



            <SidebarItem
              title="Reset Password"
              icon={<Laptop />}
              isActive={pathname === "/forget-password"}
              href="/forget-password"
            />
           
            <SidebarItem
              title="Forget Password"
              icon={<Laptop />}
              isActive={pathname === "/forget-password"}
              href="/forget-password"
            />

         
   
          </div>
        </div>

      </div>
    </aside>
  );
};