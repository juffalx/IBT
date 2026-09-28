import './StateToReducerPage.css'
import ExerciseHeader from '../../components/ExerciseHeader/ExerciseHeader'
import CartWithState from '../../components/CartWithState/CartWithState'
import CartWithReducer from '../../components/CartWithReducer/CartWithReducer'
import { sampleDishes } from '../../data/sampleDishes'

function StateToReducerPage() {
  return (
    <section>
      <ExerciseHeader
        number={4}
        title="useState versus useReducer"
        goal="The same cart written with three related useState calls and with one reducer. Both behave the same."
      />
      <div className="state-to-reducer-page__grid">
        <CartWithState dishes={sampleDishes} />
        <CartWithReducer dishes={sampleDishes} />
      </div>
    </section>
  )
}

export default StateToReducerPage
