import { Menu, MenuButton, MenuItems } from "@headlessui/react";

interface DropdownProps {
  children: React.ReactNode;
  labelButton: string;
}

export default function Dropdown({ children, labelButton }: DropdownProps) {
  return (
    <Menu>
      <MenuButton className="text-gray-300 cursor-pointer p-2 rounded transition ease-in-out delay-150 hover:text-gray-700 active:text-gray-900">
        {labelButton}
      </MenuButton>
      <MenuItems className="rounded mt-4 mr-4 p-4 bg-slate-900" anchor="bottom">
        {children}
      </MenuItems>
    </Menu>
  );
}
