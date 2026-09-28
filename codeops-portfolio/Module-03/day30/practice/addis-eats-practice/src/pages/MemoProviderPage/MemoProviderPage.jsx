import { useState } from 'react'
import './MemoProviderPage.css'
import CartProvider from '../../context/CartProvider'
import ExerciseHeader from '../../components/ExerciseHeader/ExerciseHeader'
import CartDishPicker from '../../components/CartDishPicker/CartDishPicker'
import CartRenderProbe from '../../components/CartRenderProbe/CartRenderProbe'
import { sampleDishes } from '../../data/sampleDishes'

function MemoProviderPage() {
  const [unrelated, setUnrelated] = useState(0)

  return (
    <CartProvider>
      <section className="memo-provider-page">
        <ExerciseHeader
          number={6}
          title="Memoised provider value"
          goal="Re-rendering the parent must not re-render the context consumer. Only a real cart change should."
        />
        <button
          type="button"
          className="memo-provider-page__button"
          onClick={() => setUnrelated((count) => count + 1)}
        >
          Re-render the parent ({unrelated})
        </button>
        <CartDishPicker dishes={sampleDishes} />
        <CartRenderProbe />
      </section>
    </CartProvider>
  )
}

export default MemoProviderPage
