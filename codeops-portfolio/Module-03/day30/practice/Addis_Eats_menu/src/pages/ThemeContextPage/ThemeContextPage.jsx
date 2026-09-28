import './ThemeContextPage.css'
import ThemeProvider from '../../context/ThemeProvider'
import ExerciseHeader from '../../components/ExerciseHeader/ExerciseHeader'
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle'
import NestedPanel from '../../components/NestedPanel/NestedPanel'

function ThemeContextPage() {
  return (
    <ThemeProvider>
      <section className="theme-context-page">
        <ExerciseHeader
          number={1}
          title="ThemeContext"
          goal="Hold light or dark in a context and read it from a deeply nested component."
        />
        <ThemeToggle />
        <NestedPanel level={1} depth={4} />
      </section>
    </ThemeProvider>
  )
}

export default ThemeContextPage
