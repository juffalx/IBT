import { db } from '@/lib/db';

export async function GET(request, { params }) {
  const { id } = await params;

  const dish = await db.dish.findUnique({
    where: { id: id },
  });

  if (!dish) {
    return Response.json({ message: 'Dish not found' }, { status: 404 });
  }

  return Response.json(dish);
}
