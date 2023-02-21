import { Navbar } from "@/components/molecules/Navbar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
