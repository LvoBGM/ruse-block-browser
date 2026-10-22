import React from 'react';
import './styles/QuizComplete.css';

const QuizComplete = ({ isOpen, onClose, quizProgress }) => {
	if (!isOpen) return null;

	console.log(quizProgress);
	const correct = quizProgress.correct;
	const total = quizProgress.total;
	const time = Math.floor(quizProgress.time / 1000);

  	return (
  	  <div className='quiz-complete'>
  		<button
    		onClick={onClose}
    		className='close-btn'
    		aria-label="Close"
  		>
    		×
  		</button>
  		<h2>Завършихте Quiz-a</h2>
  		<hr className='quiz-divider' />
  		<div className='quiz-stats'>
    		<p className='stat-text'>
				You got <span className='highlight'>{correct}/{total}</span> on the first try!
    		</p>
    		<p className='stat-text'>
      			The quiz took you <span className='highlight'>{time}</span> seconds!
    		</p>
  		</div>
  	</div>
  	);
};

export default QuizComplete;
