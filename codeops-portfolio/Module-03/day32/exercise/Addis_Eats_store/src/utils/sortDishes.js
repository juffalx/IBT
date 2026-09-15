export const SORT_OPTIONS = [
  { value: 'default', label: 'Menu order' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

export function sortDishes(dishes, order) {
  if (order === 'price-asc') {
    return [...dishes].sort((a, b) => a.price - b.price)
  }

  if (order === 'price-desc') {
    return [...dishes].sort((a, b) => b.price - a.price)
  }

  return dishes
}
