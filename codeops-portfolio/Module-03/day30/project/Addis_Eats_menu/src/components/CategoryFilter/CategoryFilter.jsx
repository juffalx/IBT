import PropTypes from 'prop-types'
import './CategoryFilter.css'

function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <nav className="category-filter" aria-label="Dish categories">
      <h2 className="category-filter__title">Categories</h2>
      <ul className="category-filter__list">
        {categories.map((category) => (
          <li key={category}>
            <button
              type="button"
              className={
                category === selected
                  ? 'category-filter__button category-filter__button--active'
                  : 'category-filter__button'
              }
              aria-pressed={category === selected}
              onClick={() => onSelect(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

export default CategoryFilter
