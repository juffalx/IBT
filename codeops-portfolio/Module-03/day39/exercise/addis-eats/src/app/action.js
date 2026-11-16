'use server';
import { createOrder } from '@/lib/db';
import { orderSchema } from '@/lib/schemas';

export async function placeOrder(formData) {
  const parsed = orderSchema.safeParse({
    name: formData.get('name'),
    phone: formData.get('phone'),
  });

  if (!parsed.success) {
    return { fieldError: parsed.error.flatten().fieldErrors };
  }

  return { id: (await createOrder(parsed.data)).id };
}
