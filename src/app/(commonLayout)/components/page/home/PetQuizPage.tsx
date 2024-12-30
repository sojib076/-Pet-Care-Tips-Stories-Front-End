'use client'

import { useState, useEffect } from 'react'


import { Brain, Trophy, CheckCircle, XCircle } from 'lucide-react'
import { Button, Card, CardBody,  Progress } from '@nextui-org/react'


const fullQuizData = [
  {
    question: "Which breed is known as the 'Gentle Giant'?",
    options: ['Great Dane', 'Chihuahua', 'Pomeranian', 'Beagle'],
    answer: 'Great Dane',
    difficulty: 'Easy',
  },
  {
    question: "Which cat breed has a distinctive 'squished' face?",
    options: ['Siamese', 'Persian', 'Maine Coon', 'Sphynx'],
    answer: 'Persian',
    difficulty: 'Medium',
  },
  // ... (include all other questions from the previous implementation)
]

export default function PetQuiz() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(20)
  const [gameOver, setGameOver] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            endGame()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [gameStarted, gameOver])

  const startGame = () => {
    setGameStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setTimeLeft(20)
    setGameOver(false)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const endGame = () => {
    setGameStarted(false)
    setGameOver(true)
  }

  const handleAnswer = (selected: string) => {
    setSelectedAnswer(selected)
    setShowFeedback(true)

    if (selected === fullQuizData[currentQuestion].answer) {
      setScore(score + 1)
    }

    setTimeout(() => {
      if (currentQuestion < fullQuizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setTimeLeft(30)
        setSelectedAnswer(null)
        setShowFeedback(false)
      } else {
        endGame()
      }
    }, 2000)
  }

  return (
    <Card className="
      bg-gray-200
    dark:bg-gray-800 shadow-lg mt-10  w-full mx-auto">
     
      <CardBody className="p-6">
        {!gameStarted && !gameOver ? (
          <div className="text-center">
            <Brain className="w-16 h-16 mx-auto mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-4">Ready to Test Your Pet Breed Knowledge?</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Answer as many questions as you can in 30 seconds per question. Good luck!
            </p>
            <Button onClick={startGame} className="mb-4
             
              
            ">Start Full Quiz</Button>
          </div>
        ) : gameStarted ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Question {currentQuestion + 1} of {fullQuizData.length}</h3>
              <span className="text-lg font-medium">Time: {timeLeft}s</span>
            </div>
            <Progress 
            
            value={(currentQuestion / fullQuizData.length) * 100} className="mb-4
                text-gray-600 dark:text-gray-300
            " />
            <p className="mb-4 text-lg">{fullQuizData[currentQuestion].question}</p>
            <div className=" lg:min-w-[600px] w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fullQuizData[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                    variant='solid'
                  className={`relative ${
                    showFeedback
                      ? option === fullQuizData[currentQuestion].answer
                        ? 'bg-green-300 dark:bg-green-900'
                        : selectedAnswer === option
                        ? 'bg-red-300 dark:bg-red-900'
                        : ''
                      : ''
                  }`}
                  disabled={showFeedback}
                >
                  {option}
                  {showFeedback && option === fullQuizData[currentQuestion].answer && (
                    <CheckCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500" size={20} />
                  )}
                  {showFeedback && selectedAnswer === option && option !== fullQuizData[currentQuestion].answer && (
                    <XCircle className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500" size={20} />
                  )}
                </Button>
              ))}
            </div>
            <div className="mt-4 text-right">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Difficulty: {fullQuizData[currentQuestion].difficulty}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-2xl font-semibold mb-4">Quiz Completed!</h3>
            <p className="text-lg mb-4">Your Score: {score}/{fullQuizData.length}</p>
            <Button onClick={startGame} className="mb-4">Play Again</Button>
          </div>
        )}
      </CardBody>
    </Card>
  )
}

