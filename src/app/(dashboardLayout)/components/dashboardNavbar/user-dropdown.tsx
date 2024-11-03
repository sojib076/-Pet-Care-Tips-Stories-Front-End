


import { ThemeSwitcher } from "@/app/(commonLayout)/components/page/shared/ThemeSwitcher";
import { useUser } from "@/context/uAuthContext";
import { logout } from "@/Services/AuthServices";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,

} from "@nextui-org/react";


export const UserDropdown = () => {
  const {user,setUser,setIsLoading}=useUser();
  const logOutUser = () => {

    window.location.href = "/login";
  
      logout();
      setUser(null);
      setIsLoading(true);
     
    };

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="secondary"
            size="md"
            src={user?.img}
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
  
   
        <DropdownItem
        
          key="logout"
          color="danger"
          className="text-danger "
          onClick={logOutUser}
        >
          Log Out
        </DropdownItem>
        <DropdownItem key="switch">
          <ThemeSwitcher></ThemeSwitcher>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};