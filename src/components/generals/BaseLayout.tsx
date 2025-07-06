import Navbar from "@/components/generals/Navbar";
import SidebarDashboard from "../dashboard/SidebarDashboard";

type Props = {
  children: React.ReactNode;
   variant: "landing" | "login" | "register" | "dashboard";
};

export default function BaseLayout({ children, variant }: Props) {
  return (
    <>
      <Navbar variant={variant} />
       {variant === "dashboard" ? (
        <div className="flex">
          <SidebarDashboard />
          <main className="flex-1 p-6 bg-light">{children}</main>
        </div>
      ) : (
        children
      )}
    </>
  );
}
