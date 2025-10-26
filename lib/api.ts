export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000';


export type Role = 'admin' | 'editor' | 'viewer';


export async function loginApi(username: string, password: string) {
const res = await fetch(`${API_BASE}/auth?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
const users = await res.json();
if (users.length === 0) return null;
const user = users[0];
return { token: `fake-token-${user.id}`, role: user.role as Role, username: user.username };
}


export async function fetchProducts(query = '') {
const res = await fetch(`${API_BASE}/products${query}`);
return res.json();
}


export async function fetchProduct(id: string) {
const res = await fetch(`${API_BASE}/products/${id}`);
if (!res.ok) throw new Error('Not found');
return res.json();
}


export async function createProduct(payload: any) {
const res = await fetch(`${API_BASE}/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
return res.json();
}


export async function updateProduct(id: string, payload: any) {
const res = await fetch(`${API_BASE}/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
return res.json();
}


export async function patchProductStatus(id: string, status: string) {
const res = await fetch(`${API_BASE}/products/${id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status, updatedAt: new Date().toISOString() }) });
return res.json();
}