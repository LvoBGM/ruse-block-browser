import './Quiz.css';
import { useState, useEffect } from 'react';
import clickCorrectSound from './assets/click-correct.mp3';
import clickIncorrectSound from './assets/click-correct.mp3'; // TODO: replace with incorrect sound


export default function Quiz({ setIsQuizActive, handleCloseQuiz, clickedBlock, blockData, onQuizComplete }) {
    
    // Clean and randomize block data
    const cleanBlockData = shuffle(blockData.features.map(block => block.properties?.blockname));

    const [blockQueue, setBlockQueue] = useState(cleanBlockData);
    const [targetBlock, setTargetBlock] = useState(cleanBlockData[0]);

    const clickCorrectAudio = new Audio(clickCorrectSound);
    const clickIncorrectAudio = new Audio(clickIncorrectSound);

    useEffect(() => {
        if (clickedBlock) {
            const clickedBlockName = clickedBlock.blockname;
            if (clickedBlockName === targetBlock) {
                console.log("block was correct");
                clickCorrectAudio.play();
                handleNextBlock();
            } else {
                console.log("block was incorrect");
                clickIncorrectAudio.play();
            }
        }
    }, [clickedBlock]);

    function handleNextBlock() {
        const nextBlock = blockQueue[1];

        if (nextBlock === undefined) {
            onQuizComplete();
            return;
        }

        setTargetBlock(nextBlock);
        setBlockQueue(prevQueue => prevQueue.slice(1));
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    return (
        <>
        <div className="quiz-prompt">
            <div className="quiz-header">
                <h2>Къде е {targetBlock}?</h2>
            </div>
            <p>Кликни на картата, за да познаеш</p>
        </div>
        <button
            className="quiz-end-btn"
            onClick={handleCloseQuiz}
        >
            Излез от Quiz
        </button>
        </>
    );
}