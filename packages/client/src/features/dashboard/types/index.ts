export type DashboardColumn = { name: string; count: number };

type Dashboard = {
  id: string;
  name: string;
  date: string;
  columns: Array<DashboardColumn>;
};

export type DashboardSlice = {
  isModalOpen: boolean;
  boards: Array<Dashboard>;
};
