import React from 'react';
import "./QuizSidebar.css"

import AreaCard from './AreaCard';

const RESIDENTIAL_AREAS = [
    {
        id: 'zdravec',
        name: 'Ж.К. Здравец',
        options: [
            { value: 'all', label: 'Всички блокове' },
            { value: 'imena', label: 'Само Именувани' },
            { value: 'nomera', label: 'Само Номерирани' }
        ]
    },
    {
        id: 'zdravec_iztok',
        name: 'Ж.К. Здравец-Изток',
        options: [
            { value: 'all', label: 'Всички блокове' }
        ]
    },
    {
        id: 'zdravec_sever_1',
        name: 'Ж.К. Здравец-Север 1',
        options: [
            { value: 'imena', label: 'Само Именувани' }
        ]
    },
    {
        id: 'zdravec_sever_2',
        name: 'Ж.К. Здравец-Север 2',
        options: [
            { value: 'imena', label: 'Само Именувани' }
        ]
    },
    {
        id: 'zaharna_fabrika',
        name: 'Ж.К. Захарна Фабрика',
        options: [
            { value: 'nomera', label: 'Само Номерирани' }
        ]
    }
];


export default function QuizSidebar({ isOpen, setIsQuizActive, onClose }) {
    if (!isOpen) return null;

    function handleStartQuiz() {
        setIsQuizActive(true);
        onClose();
    }

    return (
    <div className="sidebar-container">
        {/* Header */}
        <div className="sidebar-header">
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>Тествай знанията си</h2>
            <button 
                className="sidebar-close-btn" 
                onClick={() => { 
                    console.log("[UI] Close button clicked"); 
                    onClose(); 
                }}
            > 
                ✕ 
            </button>
        </div>
        
        <p className="sidebar-sub-header">Избери кои квартали да се включат:</p>

        {/* List of Residential Areas */}
        <div className="sidebar-section">
            {RESIDENTIAL_AREAS.map((area) => (
                    <AreaCard
                        key={area.id}
                        id={area.id}
                        name={area.name}
                        options={area.options}
                    />
            ))}
        </div>

        {/* Action Button */}
        <button 
            onClick={handleStartQuiz} 
            className="start-btn" 
        > 
            Започни Тест 
        </button>
    </div>
    );
  
}