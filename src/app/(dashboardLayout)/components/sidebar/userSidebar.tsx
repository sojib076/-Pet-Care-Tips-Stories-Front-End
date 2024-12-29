import {  Group, Home, Lock, NotebookIcon, Pen, PenBoxIcon, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Sidebar } from "./sidebar.styles";



import { useSidebarContext } from "../../layout/layout-context";
import { SidebarItem } from "./sidebar-item";
import { RadioGroup } from "@nextui-org/react";





export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed } = useSidebarContext();
  
 

  return (
    <aside className="h-auto z-[20] sticky top-0 dark:bg-black  ">
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
     
          <Link className="flex" href="/newsfeed">
            
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
              icon={<NotebookIcon />}
              isActive={pathname === "/dashboard/allpost"}
              href="/dashboard/allpost"
            />
            <SidebarItem
              title="Create Story"
              icon={<PenBoxIcon />}
              isActive={pathname === "/dashboard/creation"}
              href="/dashboard/creation"
            />
            <SidebarItem
              title="Create PDF"
              icon={<Pen />}
              isActive={pathname === "/dashboard/createpdf"}
              href="/dashboard/createpdf"
            />
            <SidebarItem
              title="Create Group"
              icon={<RadioGroup />}
              isActive={pathname === "/dashboard/createpdf"}
              href="/dashboard/creategroup"
            />
            <SidebarItem
              title=" My  Group"
              icon={<Group />}
              isActive={pathname === "/dashboard/createpdf"}
              href="/dashboard/mycreatedgroup"
            />



            <SidebarItem
              title="Reset Password"
              icon={<Lock />}
              isActive={pathname === "/forget-password"}
              href="/forget-password"
            />
           
            <SidebarItem
              title="Forget Password"
              icon={<Lock />}
              isActive={pathname === "/forget-password"}
              href="/forget-password"
            />

         
   
          </div>
        </div>

      </div>
    </aside>
  );
};