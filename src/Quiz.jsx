import './Quiz.css';
import { useState, useEffect } from 'react';

export default function Quiz({ setIsQuizActive, handleCloseQuiz, clickedBlock, blockData }) {
    // Clean block data
    const cleanBlockData = blockData.features.map(block => block.properties?.blockname);
    const [blockQueue, setBlockQueue] = useState(cleanBlockData);
    const [targetBlock, setTargetBlock] = useState(cleanBlockData[0]);

    useEffect(() => {
        if (clickedBlock) {
            const clickedBlockName = clickedBlock.blockname;
            if (clickedBlockName === targetBlock) {
                console.log("block was correct");
                handleNextBlock();
            } else {
                console.log("block was incorrect");
            }
        }
    }, [clickedBlock]);

    function handleNextBlock() {
        const nextBlock = blockQueue[1];

        if (nextBlock === undefined) {
            console.log("Quiz completed");
            setIsQuizActive(false);
            return;
        }

        setTargetBlock(nextBlock);
        setBlockQueue(prevQueue => prevQueue.slice(1));
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