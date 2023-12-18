import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="relative h-full">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-[#080c14]">
        <div>
          <Sidebar />
        </div>
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
	);
}
