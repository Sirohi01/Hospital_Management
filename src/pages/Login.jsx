    export default function Login() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-2xl font-bold text-center mb-4 text-green-600">
            Login
            </h2>
            <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded mb-3"
            />
            <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded mb-3"
            />
            <button className="w-full bg-green-600 text-white p-2 rounded">
            Login
            </button>
        </div>
        </div>
    );
    }
