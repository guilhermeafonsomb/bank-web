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
      <TabList className="flex justify-center gap-10 w-full border-b border-gray-800">
        {tabs.map((tab) => (
          <Tab
            className={({ selected }) =>
              clsx(
                "text-lg font-bold pb-2",
                selected ? "text-blue-500" : "text-gray-20 "
              )
            }
            key={tab.label}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="w-full mt-4">
        {tabs.map((tab) => (
          <TabPanel className="w-full" key={tab.label}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
