/* Tab Group */
import React, { useState } from "react";
import Label from "../label/Label";

type TabGroupProps = {
  activeTab: string;
  onTabChange: (tab: any) => void;
  tabs: string[];
};

function TabGroup({ activeTab, onTabChange, tabs }: TabGroupProps) {
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <div className="flex flex-row my-4">
      {tabs.map((tab) => (
        <Label key={tab} color={activeTab === tab ? "charcoal" : "blank"} onClick={() => onTabChange(tab)}>
          {capitalize(tab)}
        </Label>
      ))}
    </div>
  );
}

export default TabGroup;