import DesktopSidebar from "./DesktopSidebar";

async function Sidebar({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-full">
            <main className="h-full lg:pl-20">
                <DesktopSidebar />
                {children}
            </main>
        </div>
    );
}

export default Sidebar;