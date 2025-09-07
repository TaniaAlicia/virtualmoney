import Navbar from "@/components/generals/Navbar";
import SidebarDashboard from "../dashboard/SidebarDashboard";
import CustomToaster from "./CustomToaster";


type Props = {
  children: React.ReactNode;
   variant: "landing" | "login" | "register" | "dashboard";
};

export default function BaseLayout({ children, variant }: Props) {
  return (
    <>
      <Navbar variant={variant} />
      <CustomToaster />
       {variant === "dashboard" ? (
        <div className="flex min-h-screen bg-gray1">
          <SidebarDashboard />
          <main className="flex-1 p-6 ">{children}</main>
        </div>
      ) : (
        children
      )}
    </>
  );
}
