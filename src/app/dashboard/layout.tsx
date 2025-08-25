import BaseLayout from "@/components/generals/BaseLayout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <BaseLayout variant="dashboard">{children}</BaseLayout>;
}
