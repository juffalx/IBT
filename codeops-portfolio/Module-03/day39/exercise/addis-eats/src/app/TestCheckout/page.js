export default async function CheckoutPage({ searchParams }) {
  const params = await searchParams;

  const dish = params.dish;

  return (
    <div>
      <h1>Checkout</h1>

      <p>Dish:{dish}</p>

      <form>
        <input name="name" placeholder="your name" />

        <input name="phone" placeholder="your phone" />

        <button type="submit">place order</button>
      </form>
    </div>
  );
}
