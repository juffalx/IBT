import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDish, getDishes } from '../../../data/dishes';

export const dynamicParams = false;

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: dish.id }));
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) notFound();

  return (
    <article>
      <Link href="/menu">Back to menu</Link>
      <h1 className="mt-2 text-2xl font-bold">{dish.name}</h1>
      <p>{dish.category}</p>
      <p className="font-bold">{dish.price} ETB</p>
    </article>
  );
}
