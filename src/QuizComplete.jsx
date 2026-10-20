import React from 'react';
import './QuizComplete.css';

const QuizComplete = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

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
      			You got <span className='highlight'>10/12</span> on the first time!
    		</p>
    		<p className='stat-text'>
      			The quiz took you <span className='highlight'>25</span> seconds!
    		</p>
  		</div>
  	</div>
  	);
};

export default QuizComplete;
