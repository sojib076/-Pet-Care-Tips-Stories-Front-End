


import { ThemeSwitcher } from "@/app/(commonLayout)/components/page/shared/ThemeSwitcher";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react";


export const UserDropdown = () => {

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="secondary"
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          {/* <p>{user?.email}</p> */}
        </DropdownItem>
   
        <DropdownItem
        
          key="logout"
          color="danger"
          className="text-danger "
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