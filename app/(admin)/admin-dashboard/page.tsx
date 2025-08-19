export default function AdminDashboard() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
            <p className="text-lg">Welcome to the admin dashboard!</p>
            <p className="text-sm text-gray-500">This page is only accessible to users with admin privileges.</p>
        </div>
    );
}