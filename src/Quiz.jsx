import './Quiz.css';

export default function Quiz({ setIsQuizActive }) {
    return (
        <>
        <div className="quiz-prompt">
            <div className="quiz-header">
                <h2>Къде е бл. Комаров?</h2>
            </div>
            <p>Кликни на картата, за да познаеш</p>
        </div>
        <button
            className="quiz-end-btn"
            onClick={() => setIsQuizActive(false)}
        >
            Излез от Quiz
        </button>
        </>
    );
}