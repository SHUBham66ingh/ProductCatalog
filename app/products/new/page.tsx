'use client';
import ProductForm from '../../../components/ProductForm';
import { createProduct } from '../../../lib/api';
import { useRouter } from 'next/navigation';

export default function NewProduct() {
  const router = useRouter();
  async function onSubmit(payload: any) {
    const now = new Date().toISOString();
    const id = String(Math.floor(Math.random() * 1000000));
    await createProduct({ id, ...payload, version: 1, createdAt: now, updatedAt: now });
    router.push('/products');
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">New Product</h2>
      <ProductForm onSubmit={onSubmit} />
    </div>
  );
}
