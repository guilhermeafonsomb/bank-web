import { Menu, MenuButton, MenuItems } from "@headlessui/react";

interface DropdownProps {
  children: React.ReactNode;
  labelButton: string;
}

export default function Dropdown({ children, labelButton }: DropdownProps) {
  return (
    <Menu>
      <MenuButton className="text-red-500 cursor-pointer p-2 rounded transition ease-in-out delay-150 hover:text-red-700 active:text-red-900">
        {labelButton}
      </MenuButton>
      <MenuItems className="rounded mt-4 mr-4 p-4 bg-slate-900" anchor="bottom">
        {children}
      </MenuItems>
    </Menu>
  );
}
