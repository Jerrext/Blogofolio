import { TabsNames } from "../../utils/@globalTypes";

export type TabType = {
  title: string;
  disabled: boolean;
  key: number;
};

export type TabsProps = {
  onClick: (key: TabsNames) => void;
  activeTab: number;
};
