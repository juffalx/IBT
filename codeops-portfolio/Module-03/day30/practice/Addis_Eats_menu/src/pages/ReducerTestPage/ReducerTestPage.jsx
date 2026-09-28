import ExerciseHeader from '../../components/ExerciseHeader/ExerciseHeader'
import CaseResults from '../../components/CaseResults/CaseResults'
import { cartReducerCases } from '../../reducers/cartReducerCases'

function ReducerTestPage() {
  return (
    <section>
      <ExerciseHeader
        number={3}
        title="cartReducer called directly"
        goal="Add, remove and clear, checked with plain objects and no React state involved."
      />
      <CaseResults cases={cartReducerCases} />
    </section>
  )
}

export default ReducerTestPage
