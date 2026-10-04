export default function MenuLayout({ children }) {
  return (
    <div>
      <aside className="grid grid-rows-4g text-center bg-yellow-100 p-4 rounded-lg shadow-md text">
        <h2>Menu Categories</h2>
        <p>Breakfast</p>
        <p>Main Dishes</p>
        <p>Drinks</p>
      </aside>

      <main>{children}</main>
    </div>
  );
}
