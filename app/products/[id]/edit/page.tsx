'use client';
import { useEffect, useState } from 'react';
import ProductForm from '../../../../components/ProductForm';
import { fetchProduct, updateProduct } from '../../../../lib/api';
import { useRouter } from 'next/navigation';

export default function EditProduct({ params }: { params: { id: string } }) {
  const [initial, setInitial] = useState<any>(null);
  const router = useRouter();
  useEffect(() => { fetchProduct(params.id).then(p => setInitial(p)).catch(() => router.push('/products')); }, [params.id, router]);

  async function onSubmit(payload: any) {
    // increment version
    const updated = { ...initial, ...payload, version: (initial.version || 0) + 1, updatedAt: new Date().toISOString() };
    await updateProduct(params.id, updated);
    router.push('/products');
  }

  if (!initial) return <div>Loading...</div>;
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      <ProductForm initial={initial} onSubmit={onSubmit} />
    </div>
  );
}
