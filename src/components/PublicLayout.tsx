// src/components/layouts/PublicLayout.tsx
import Navbar from "@/components/Navbar";

type Props = {
  children: React.ReactNode;
  variant: "landing" | "login" | "register";
};

export default function PublicLayout({ children, variant }: Props) {
  return (
    <>
      <Navbar variant={variant} />
      {children}
    </>
  );
}
