import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle2, ArrowUp, ArrowDown } from 'lucide-react';

const NumberGuessingGame = () => {
  const MAX_ATTEMPTS = 7;
  const [secretNumber, setSecretNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(MAX_ATTEMPTS);
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts(MAX_ATTEMPTS);
    setFeedback('Try to guess the number between 1 and 100!');
    setGameOver(false);
    setWon(false);
  };

  const handleGuess = (e) => {
    e.preventDefault();
    
    const guessNum = parseInt(guess);
    
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      setFeedback('Please enter a valid number between 1 and 100');
      return;
    }

    const newAttempts = attempts - 1;
    setAttempts(newAttempts);

    if (guessNum === secretNumber) {
      setFeedback('Congratulations! You won! 🎉');
      setGameOver(true);
      setWon(true);
    } else if (newAttempts === 0) {
      setFeedback(`Game Over! The number was ${secretNumber}`);
      setGameOver(true);
    } else if (guessNum > secretNumber) {
      setFeedback('Too high! Try a lower number');
    } else {
      setFeedback('Too low! Try a higher number');
    }

    setGuess('');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Number Guessing Game</h1>
        
        <div className="space-y-4">
          {/* Attempts Counter */}
          <div className="text-center">
            <span className="font-semibold">
              Attempts remaining: {attempts}
            </span>
          </div>

          {/* Feedback Display */}
          <div className="flex items-center justify-center gap-2 min-h-12 text-center">
            {gameOver ? (
              won ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="w-6 h-6" />
                  <span>{feedback}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-6 h-6" />
                  <span>{feedback}</span>
                </div>
              )
            ) : feedback.includes('high') ? (
              <div className="flex items-center gap-2 text-orange-600">
                <ArrowDown className="w-6 h-6" />
                <span>{feedback}</span>
              </div>
            ) : feedback.includes('low') ? (
              <div className="flex items-center gap-2 text-blue-600">
                <ArrowUp className="w-6 h-6" />
                <span>{feedback}</span>
              </div>
            ) : (
              <span>{feedback}</span>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleGuess} className="space-y-4">
            <input
              type="number"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={gameOver}
              placeholder="Enter your guess..."
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              max="100"
            />
            
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={gameOver}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Guess
              </button>
              
              {gameOver && (
                <button
                  type="button"
                  onClick={startNewGame}
                  className="w-full px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
                >
                  Play Again
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NumberGuessingGame;