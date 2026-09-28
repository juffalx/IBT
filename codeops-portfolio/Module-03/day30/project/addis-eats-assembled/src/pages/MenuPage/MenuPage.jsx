import { useState } from 'react'
import './MenuPage.css'
import { CATEGORIES } from '../../constants/categories'
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter'
import Menu from '../../components/Menu/Menu'
import Checkout from '../../components/Checkout/Checkout'

function MenuPage() {
  const [category, setCategory] = useState('All')
  const [simulateError, setSimulateError] = useState(false)

  return (
    <main className="menu-page">
      <CategoryFilter
        categories={CATEGORIES}
        selected={category}
        onSelect={setCategory}
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

      <Checkout />
    </main>
  )
}

export default MenuPage
