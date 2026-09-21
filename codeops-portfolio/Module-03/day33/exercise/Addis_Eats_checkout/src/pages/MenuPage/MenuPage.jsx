import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './MenuPage.css'
import { CATEGORIES } from '../../constants/categories'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'
import Menu from '../../components/Menu/Menu'

function MenuPage() {
  const [params, setParams] = useSearchParams()
  const [simulateError, setSimulateError] = useState(false)
  const category = params.get('category') ?? 'All'

  function choose(nextCategory) {
    setParams({ category: nextCategory })
  }

  return (
    <main className="menu-page">
      <CategoryFilter
        categories={CATEGORIES}
        selected={category}
        onSelect={choose}
      />

      <div className="menu-page__content">
        <label className="menu-page__toggle">
          <input
            type="checkbox"
            checked={simulateError}
            onChange={(event) => setSimulateError(event.target.checked)}
          />
          Simulate a server error
        </label>
        <Menu category={category} simulateError={simulateError} />
      </div>
    </main>
  )
}

export default MenuPage
