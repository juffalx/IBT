import './CartProviderPage.css'
import CartProvider from '../../context/CartProvider'
import ExerciseHeader from '../../components/ExerciseHeader/ExerciseHeader'
import CartDishPicker from '../../components/CartDishPicker/CartDishPicker'
import CartPanel from '../../components/CartPanel/CartPanel'
import { sampleDishes } from '../../data/sampleDishes'

function CartProviderPage() {
  return (
    <CartProvider>
      <section className="cart-provider-page">
        <ExerciseHeader
          number={5}
          title="CartProvider"
          goal="A provider that holds the reducer and shares items, dispatch and the derived total with any component below it."
        />
        <CartDishPicker dishes={sampleDishes} />
        <CartPanel />
      </section>
    </CartProvider>
  )
}

export default CartProviderPage
