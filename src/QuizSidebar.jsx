import React from 'react';
import { useState, useEffect } from 'react';
import "./QuizSidebar.css"

import AreaCard from './AreaCard';

const RESIDENTIAL_AREAS = [
    {
        id: 'zdravec',
        name: 'Ж.К. Здравец',
        options: [
            { value: '_imena', label: 'Именa' },
            { value: '_nomera', label: 'Номерa' }
        ]
    },
    {
        id: 'zdravec_iztok',
        name: 'Ж.К. Здравец-Изток',
        options: []
    },
    {
        id: 'zdravec_sever_1',
        name: 'Ж.К. Здравец-Север 1',
        options: [
            { value: '', label: 'Именувани' }
        ]
    },
    {
        id: 'zdravec_sever_2',
        name: 'Ж.К. Здравец-Север 2',
        options: [
            { value: '', label: 'Именувани' }
        ]
    },
    {
        id: 'zaharna_fabrika',
        name: 'Ж.К. Захарна Фабрика',
        options: [
            { value: '', label: 'Номерирани' }
        ]
    }
];


export default function QuizSidebar({ isOpen, setIsQuizActive, onClose, setRenderedBlockData, blockDataDictionary }) {
    if (!isOpen) return null;

    const [selectedOptions, setSelectedOptions] = useState({});

    // Initialize selected options with all options selected by default
    useEffect(() => {
        const defaults = {};
        
        // Generate a key for each residential area option
        RESIDENTIAL_AREAS.forEach((area, index) => {
            area.options.forEach((option, index) => {
                defaults[`${area.id}${option.value}`] = true;
            })
        })

        setSelectedOptions(defaults);
    }, []);

    function handleStartQuiz() {
        let quizFeatures = []

        for (const [key, value] of Object.entries(blockDataDictionary)) {
            if (selectedOptions[key]) {
                quizFeatures = [...quizFeatures, ...value.features];
            }
        }

        const quizData = {
            type: "FeatureCollection",
             features: quizFeatures
        }

        console.log("Setting block data to", selectedOptions);
        setRenderedBlockData(quizData);

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
                        setSelectedOptions={setSelectedOptions}
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