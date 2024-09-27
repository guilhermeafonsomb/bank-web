import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import clsx from "clsx";

interface TabData {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabData[];
}

export default function Tabs({ tabs }: TabsProps) {
  return (
    <TabGroup className="w-full max-w-5xl flex flex-col justify-center items-start p-4 border rounded-md">
      <TabList className="flex justify-between w-full border-b border-gray-800">
        {tabs.map((tab, index) => (
          <Tab
            className={({ selected }) =>
              clsx(
                "text-lg font-bold pb-2",
                selected ? "text-blue-500" : "text-gray-20 "
              )
            }
            key={index}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="w-full mt-4">
        {tabs.map((tab, index) => (
          <TabPanel className="w-full" key={index}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
