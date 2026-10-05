import { CATEGORIES } from '../../data/dishes'

export default function MenuLayout({ children }) {
  return (
    <div className="flex gap-6 p-6">
      <aside className="w-48 rounded-lg bg-yellow-100 p-4 shadow-md">
        <h2 className="mb-2 font-bold">Menu Categories</h2>
        <ul className="grid gap-1">
          {CATEGORIES.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  )
}
