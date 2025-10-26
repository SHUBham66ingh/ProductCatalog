import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect immediately to /products
  redirect('/products');
}