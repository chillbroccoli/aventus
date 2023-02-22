import { Tabs as MantineTabs } from "@mantine/core";
import { useState } from "react";

type Options = {
  label: string;
  value: string;
};

export function Tabs({ options }: { options: Options[] }) {
  const [activeTab, setActiveTab] = useState<string | null>(options[0].value);

  return (
    <MantineTabs value={activeTab} onTabChange={setActiveTab}>
      <MantineTabs.List>
        {options.map((tab) => (
          <MantineTabs.Tab key={tab.value} value={tab.value}>
            {tab.label}
          </MantineTabs.Tab>
        ))}
      </MantineTabs.List>

      {options.map((tab) => (
        <MantineTabs.Panel key={tab.value} value={tab.value}>
          {tab.label}
        </MantineTabs.Panel>
      ))}
    </MantineTabs>
  );
}
