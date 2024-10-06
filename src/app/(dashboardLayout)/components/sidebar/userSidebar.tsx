import {      Home, Laptop, User } from "lucide-react";
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
     
          <Link className="flex" href="/">
            
            <p className="font-bold text-inherit px-4"> Home </p>
  
          </Link>
     
          <Link className="flex" href="/">
            
            <p className="font-bold text-inherit px-4"> News  </p>
  
          </Link>
        </div>

        <div className="flex flex-col justify-between ">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<Home />}
              isActive={pathname === "/dashboard"}
              href="/dashboard"
            />
            <SidebarItem
              title="Update Your Profile"
              icon={<User />}
              isActive={pathname === "/dashboard/profile"}
              href="/dashboard/profile"
            />
            <SidebarItem
              title="ALL POST"
              icon={<User />}
              isActive={pathname === "/dashboard/allpost"}
              href="/dashboard/allpost"
            />
            <SidebarItem
              title="Create Story"
              icon={<User />}
              isActive={pathname === "/dashboard/creation"}
              href="/dashboard/creation"
            />
            <SidebarItem
              title="Create PDF"
              icon={<Laptop />}
              isActive={pathname === "/dashboard/createpdf"}
              href="/dashboard/createpdf"
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