'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function orderPage() {
  const [dish, setDish] = useState('');

  return (
    <div>
      <h1>Order</h1>

      <lable>
        <input
          type="radio"
          name="dish"
          value={'Doro Wat'}
          checked={dish === 'Doro Wat'}
          onchange={(e) => setDish(e.target.value)}
        />
        Doro Wat - 360
      </lable>

      <br />
      <lable>
        <input
          type="radio"
          name="dish"
          value={'Shiro'}
          checked={dish === 'Shiro'}
          onchange={(e) => setDish(e.target.value)}
        />
        Shiro - 200
      </lable>

      <br />

      <Link href={`/TestCheckout?dish=${dish}`}>Go to Checkout</Link>
    </div>
  );
}
