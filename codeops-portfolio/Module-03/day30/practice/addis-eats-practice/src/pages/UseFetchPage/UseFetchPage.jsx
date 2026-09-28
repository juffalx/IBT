import './UseFetchPage.css'
import ExerciseHeader from '../../components/ExerciseHeader/ExerciseHeader'
import DishCount from '../../components/DishCount/DishCount'
import DishNames from '../../components/DishNames/DishNames'

function UseFetchPage() {
  return (
    <section className="use-fetch-page">
      <ExerciseHeader
        number={2}
        title="useFetch in two components"
        goal="One hook in its own file, used by two components that each keep their own data, loading and error."
      />
      <div className="use-fetch-page__grid">
        <DishCount />
        <DishNames />
      </div>
    </section>
  )
}

export default UseFetchPage
