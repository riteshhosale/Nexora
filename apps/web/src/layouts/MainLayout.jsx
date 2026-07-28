import Navbar from "../components/Navbar";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import MobileBottomNav from "../components/MobileBottomNav";

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="max-w-7xl mx-auto flex gap-6 px-4 py-6">
                {/* Left Sidebar */}
                <aside className="hidden lg:block w-64 sticky top-24 self-start">
                    <LeftSidebar />
                </aside>

                {/* Page Content */}
                <section className="flex-1 min-w-0">
                    {children}
                </section>

                {/* Right Sidebar */}
                <aside className="hidden xl:block w-80 sticky top-24 self-start">
                    <RightSidebar />
                </aside>
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden">
                <MobileBottomNav />
            </div>
        </div>
    );
};

export default MainLayout;