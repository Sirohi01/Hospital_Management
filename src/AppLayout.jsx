    import { Outlet } from "react-router-dom";
    import Sidebar from "./components/layout/Sidebar";
    import Header from "./components/layout/Header";
    import { useState } from "react";

    export default function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-screen flex flex-col bg-gray-100">
        <Header setSidebarOpen={setSidebarOpen} />
        <div className="flex flex-1 overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 p-4 overflow-y-auto">
            <Outlet />
            </main>
        </div>
        </div>
    );
    }
