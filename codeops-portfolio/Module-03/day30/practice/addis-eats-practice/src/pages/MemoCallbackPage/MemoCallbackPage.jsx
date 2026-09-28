import { useCallback, useMemo, useState } from 'react'
import './MemoCallbackPage.css'
import { useFetch } from '../../hooks/useFetch'
import { formatEtb } from '../../utils/formatEtb'
import ExerciseHeader from '../../components/ExerciseHeader/ExerciseHeader'
import Spinner from '../../components/Spinner/Spinner'
import ErrorNote from '../../components/ErrorNote/ErrorNote'
import DishList from '../../components/DishList/DishList'
import MemoDishList from '../../components/DishList/MemoDishList'

function MemoCallbackPage() {
  const { data, loading, error } = useFetch('/dishes.json')
  const [unrelated, setUnrelated] = useState(0)
  const [ordered, setOrdered] = useState(0)

  const shown = useMemo(() => (data ?? []).slice(0, 6), [data])

  const addStable = useCallback((dish) => {
    setOrdered((amount) => amount + dish.price)
  }, [])

  function addInline(dish) {
    setOrdered((amount) => amount + dish.price)
  }

  return (
    <section className="memo-callback-page">
      <ExerciseHeader
        number={7}
        title="React.memo and useCallback"
        goal="Three versions of the same list. Click the unrelated button and compare how often each one renders."
      />

      <div className="memo-callback-page__controls">
        <button
          type="button"
          className="memo-callback-page__button"
          onClick={() => setUnrelated((count) => count + 1)}
        >
          Unrelated update ({unrelated})
        </button>
        <span>Ordered so far: {formatEtb(ordered)}</span>
      </div>

      {loading && <Spinner />}
      {error && <ErrorNote message={error} />}

      {!loading && !error && (
        <>
          <section className="memo-callback-page__variant">
            <h3>A. Plain list</h3>
            <DishList dishes={shown} onAdd={addInline} />
          </section>

          <section className="memo-callback-page__variant">
            <h3>B. React.memo with a new handler on every render</h3>
            <MemoDishList dishes={shown} onAdd={addInline} />
          </section>

          <section className="memo-callback-page__variant">
            <h3>C. React.memo with useCallback</h3>
            <MemoDishList dishes={shown} onAdd={addStable} />
          </section>
        </>
      )}
    </section>
  )
}

export default MemoCallbackPage
