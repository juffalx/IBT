import { useState } from 'react'
import './App.css'
import { EXERCISES } from './pages/exercises'
import ExerciseNav from './components/ExerciseNav/ExerciseNav'

function App() {
  const [activeId, setActiveId] = useState(EXERCISES[0].id)
  const { Page } = EXERCISES.find((exercise) => exercise.id === activeId)

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Day 30 Practice: Hooks Deep Dive</h1>
        <ExerciseNav
          exercises={EXERCISES}
          activeId={activeId}
          onSelect={setActiveId}
        />
      </header>
      <main className="app__main">
        <Page />
      </main>
    </div>
  )
}

export default App
