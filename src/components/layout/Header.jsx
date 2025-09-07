    export default function Header({ setSidebarOpen }) {
    return (
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-green-600">Sirohi Hospital 🏥</h1>
        <button
            className="md:hidden p-2 bg-gray-200 rounded-lg"
            onClick={() => setSidebarOpen(true)}
        >
            ☰
        </button>
        </header>
    );
    }
