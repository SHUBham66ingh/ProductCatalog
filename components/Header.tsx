import Link from 'next/link';

export default function Header({ role, onLogout }: { role?: string | null; onLogout: () => void }) {
return (
<header className="bg-white shadow-sm p-4 flex justify-between items-center">
<div>
<Link href="/products" className="font-semibold">Product Catalog Admin</Link>
</div>
<div className="flex items-center gap-4">
<span className="text-sm text-slate-600">{role ? `Role: ${role}` : 'Not logged in'}</span>
{role ? (
<button className="px-3 py-1 bg-red-500 text-white rounded" onClick={onLogout}>Logout</button>
) : (
<Link href="/login" className="px-3 py-1 bg-blue-600 text-white rounded">Login</Link>
)}
</div>
</header>
);
}