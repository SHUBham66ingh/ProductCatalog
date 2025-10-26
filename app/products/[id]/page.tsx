'use client';
import { useEffect, useState } from 'react';
import { fetchProduct } from '../../../lib/api';
import { useRouter } from 'next/navigation';

export default function ViewProduct({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const router = useRouter();
  useEffect(() => { fetchProduct(params.id).then(setProduct).catch(() => router.push('/products')); }, [params.id, router]);
  if (!product) return <div>Loading...</div>;
  return (
    <div className="bg-white p-4 rounded shadow max-w-2xl">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <div className="mt-2">Category: {product.category}</div>
      <div>Price: {product.price} {product.currency}</div>
      <div>SKU: {product.sku}</div>
      <div>Status: {product.status}</div>
      <div>Version: {product.version}</div>
      <div>Created: {product.createdAt}</div>
      <div>Updated: {product.updatedAt}</div>
    </div>
  );
}
