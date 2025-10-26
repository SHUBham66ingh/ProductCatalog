'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchProducts, patchProductStatus } from '../../lib/api';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [q, setQ] = useState('');
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => { setRole(localStorage.getItem('role')); load(); }, []);
  async function load() { const data = await fetchProducts(); setProducts(data); }

  async function publish(id: string) {
    if (!confirm('Change status to published?')) return;
    await patchProductStatus(id, 'published');
    load();
  }
  async function archive(id: string) {
    if (!confirm('Archive product?')) return;
    await patchProductStatus(id, 'archived');
    load();
  }

  const filtered = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Products</h1>
        <div className="flex gap-2">
          {role !== 'viewer' && <Link href="/products/new" className="px-3 py-1 bg-green-600 text-white rounded">New</Link>}
        </div>
      </div>

      <div className="mb-4">
        <input placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} className="border p-2 rounded w-full" />
      </div>

      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-slate-100 text-left">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Price</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.category}</td>
              <td className="p-2">{p.price} {p.currency}</td>
              <td className="p-2">{p.status}</td>
              <td className="p-2 flex gap-2">
                <Link href={`/products/${p.id}`} className="px-2 py-1 bg-slate-200 rounded">View</Link>
                {role !== 'viewer' && <Link href={`/products/${p.id}/edit`} className="px-2 py-1 bg-yellow-300 rounded">Edit</Link>}
                {role === 'admin' && p.status !== 'published' && <button onClick={() => publish(p.id)} className="px-2 py-1 bg-blue-600 text-white rounded">Publish</button>}
                {role === 'admin' && p.status !== 'archived' && <button onClick={() => archive(p.id)} className="px-2 py-1 bg-red-600 text-white rounded">Archive</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
