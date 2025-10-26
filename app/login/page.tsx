'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginApi } from '../../lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [u, setU] = useState('');
  const [p, setP] = useState('');
  const [err, setErr] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await loginApi(u, p);
    if (!res) return setErr('Invalid credentials');
    localStorage.setItem('token', res.token);
    localStorage.setItem('role', res.role);
    router.push('/products');
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input placeholder="username" value={u} onChange={(e) => setU(e.target.value)} className="w-full border p-2 rounded" />
        <input placeholder="password" type="password" value={p} onChange={(e) => setP(e.target.value)} className="w-full border p-2 rounded" />
        {err && <div className="text-red-600">{err}</div>}
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Login</button>
        <div className="text-sm text-slate-600 mt-2">Try: admin/admin, editor/editor, viewer/viewer</div>
      </form>
    </div>
  );
}
