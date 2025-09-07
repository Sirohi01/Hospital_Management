    import { Link, useLocation } from "react-router-dom";
    import { ROUTES } from "../routes/RoutesEnum";
    export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const location = useLocation();
    const getLinkClass = (path) => {
        const baseClass = "block px-3 py-2 rounded hover:bg-green-100";
        const activeClass = "text-green-600 font-semibold bg-green-50";
        return location.pathname === path ? `${baseClass} ${activeClass}` : baseClass;
    };

    return (
        <div>
        <aside className="hidden md:flex md:flex-col w-64 bg-white shadow-lg p-4 h-full">
            <nav className="space-y-2">
            <Link to={ROUTES.DASHBOARD} className={getLinkClass(ROUTES.DASHBOARD)}>
                Dashboard
            </Link>
            <Link
                to={ROUTES.PATIENT_REGISTRATION}
                className={getLinkClass(ROUTES.PATIENT_REGISTRATION)}
            >
                Patient Registration
            </Link>
            <Link
                to={ROUTES.Registered_Patient}
                className={getLinkClass(ROUTES.Registered_Patient)}
            >
                Patient Registered
            </Link>
            </nav>
        </aside>
        {sidebarOpen && (
            <div className="fixed inset-0 z-50 flex">
            <div className="w-64 bg-white shadow-lg p-4 flex-col h-full">
                {/* Close button */}
                <button
                className="mb-4 p-2 bg-gray-200 rounded-lg w-full text-left"
                onClick={() => setSidebarOpen(false)}
                >
                ✖ Close
                </button>
                <nav className="space-y-2">
                <Link
                    to={ROUTES.DASHBOARD}
                    className={getLinkClass(ROUTES.DASHBOARD)}
                    onClick={() => setSidebarOpen(false)}
                >
                    Dashboard
                </Link>
                <Link
                    to={ROUTES.PATIENT_REGISTRATION}
                    className={getLinkClass(ROUTES.PATIENT_REGISTRATION)}
                    onClick={() => setSidebarOpen(false)}
                >
                    Patient Registration
                </Link>
                <Link
                    to={ROUTES.Registered_Patient}
                    className={getLinkClass(ROUTES.Registered_Patient)}
                    onClick={() => setSidebarOpen(false)}
                >
                    Patient Registered
                </Link>
                </nav>
            </div>
            <div
                className="flex-1 bg-black bg-opacity-50"
                onClick={() => setSidebarOpen(false)}
            />
            </div>
        )}
        </div>
    );
    }
