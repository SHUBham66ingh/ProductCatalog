'use client';
import { useState, useEffect } from 'react';


export default function ProductForm({ initial, onSubmit }: { initial?: any; onSubmit: (v: any) => Promise<void> }) {
const [form, setForm] = useState(() => initial || { name: '', category: '', price: '', currency: 'INR', sku: '', status: 'draft' });
const [errors, setErrors] = useState<any>({});
useEffect(() => { setForm(initial || form); }, [initial]);


function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
const { name, value } = e.target;
setForm((s: any) => ({ ...s, [name]: value }));
}


function validate() {
const errs: any = {};
if (!form.name) errs.name = 'Required';
if (!form.category) errs.category = 'Required';
const price = Number(form.price);
if (!form.price || Number.isNaN(price) || price <= 0) errs.price = 'Price must be > 0';
if (!form.sku) errs.sku = 'Required';
setErrors(errs);
return Object.keys(errs).length === 0;
}


async function submit(e: React.FormEvent) {
e.preventDefault();
if (!validate()) return;
const payload = { ...form, price: Number(form.price) };
await onSubmit(payload);
}


return (
<form onSubmit={submit} className="space-y-4">
<div>
<label className="block text-sm">Name</label>
<input name="name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" />
{errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
</div>
<div>
<label className="block text-sm">Category</label>
<input name="category" value={form.category} onChange={handleChange} className="w-full border p-2 rounded" />
{errors.category && <div className="text-red-600 text-sm">{errors.category}</div>}
</div>
<div>
<label className="block text-sm">Price</label>
<input name="price" value={form.price} onChange={handleChange} className="w-full border p-2 rounded" />
{errors.price && <div className="text-red-600 text-sm">{errors.price}</div>}
</div>
<div>
<label className="block text-sm">Currency</label>
<select name="currency" value={form.currency} onChange={handleChange} className="w-full border p-2 rounded">
<option value="INR">INR</option>
<option value="USD">USD</option>
</select>
</div>
<div>
<label className="block text-sm">SKU</label>
<input name="sku" value={form.sku} onChange={handleChange} className="w-full border p-2 rounded" />
{errors.sku && <div className="text-red-600 text-sm">{errors.sku}</div>}
</div>
<div className="flex gap-2">
<button className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
</div>
</form>
);
}