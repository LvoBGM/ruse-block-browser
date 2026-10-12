import React from 'react';
import "./QuizSidebar.css"

import AreaCard from './AreaCard';

const RESIDENTIAL_AREAS = [
    {
        id: 'zdravec',
        name: 'Ж.К. Здравец',
        options: [
            { value: 'all', label: 'Всички (Имена и Номера)' },
            { value: 'imena', label: 'Само Именувани (бл. Цена...)' },
            { value: 'nomera', label: 'Само Номерирани (бл. 105...)' }
        ]
    },
    {
        id: 'zdravec_iztok',
        name: 'Ж.К. Здравец-Изток',
        options: [
            { value: 'all', label: 'Всички блокове' },
        ]
    },
];

export default function QuizSidebar({ isOpen, onClose }) {
    if (!isOpen) return null;
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
            onClick={() => console.log("[UI] Започни Тест clicked")} 
            className="start-btn" 
        > 
            Започни Тест 
        </button>
    </div>
    );
  
}