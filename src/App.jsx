import { useState } from 'react'
import StartScreen from './components/StartScreen'
import CategorySelect from './components/CategorySelect'
import QuizScreen from './components/QuizScreen'
import ResultsScreen from './components/ResultsScreen'
import { categories } from './data/questions'

const SCREENS = {
  START: 'start',
  CATEGORY: 'category',
  QUIZ: 'quiz',
  RESULTS: 'results',
}

function App() {
  const [screen, setScreen] = useState(SCREENS.START)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [quizResult, setQuizResult] = useState(null)

  const handleStart = () => setScreen(SCREENS.CATEGORY)

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat)
    setScreen(SCREENS.QUIZ)
  }

  const handleFinish = (result) => {
    setQuizResult(result)
    setScreen(SCREENS.RESULTS)
  }

  const handleRestart = () => {
    setScreen(SCREENS.CATEGORY)
    setSelectedCategory(null)
    setQuizResult(null)
  }

  const handleHome = () => {
    setScreen(SCREENS.START)
    setSelectedCategory(null)
    setQuizResult(null)
  }

  return (
    <>
      {screen === SCREENS.START && <StartScreen onStart={handleStart} />}
      {screen === SCREENS.CATEGORY && (
        <CategorySelect categories={categories} onSelect={handleSelectCategory} />
      )}
      {screen === SCREENS.QUIZ && selectedCategory && (
        <QuizScreen
          category={selectedCategory}
          onFinish={handleFinish}
          onBack={() => setScreen(SCREENS.CATEGORY)}
        />
      )}
      {screen === SCREENS.RESULTS && quizResult && (
        <ResultsScreen
          result={quizResult}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}
    </>
  )
}

export default App
