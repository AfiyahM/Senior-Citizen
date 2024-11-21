// pages/Quiz.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const { videoId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetch(`/api/quiz/${videoId}`)
      .then(response => response.json())
      .then(data => setQuiz(data))
      .catch(error => console.error(error));
  }, [videoId]);

  const handleSubmit = () => {
    fetch(`/api/quiz/${quiz._id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers, userId: 'user-id-here' })
    })
      .then(response => response.json())
      .then(data => setScore(data.score))
      .catch(error => console.error(error));
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div>
      <h2>{quiz.title}</h2>
      {quiz.questions.map((q, i) => (
        <div key={i}>
          <p>{q.question}</p>
          {q.options.map((option, j) => (
            <label key={j}>
              <input
                type="radio"
                name={`question-${i}`}
                onChange={() => {
                  const updatedAnswers = [...answers];
                  updatedAnswers[i] = j;
                  setAnswers(updatedAnswers);
                }}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {score !== null && <p>Your score: {score}</p>}
    </div>
  );
};

export default Quiz;
