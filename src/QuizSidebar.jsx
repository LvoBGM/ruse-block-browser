import React from 'react';
import "./QuizSidebar.css"

export default function QuizSidebar({ isOpen, onClose }) {
    if (!isOpen) return null;
    return (
    <div className="sidebar-container">
        {/* Header */}
        <div className="sidebar-header">
            <h2 style={{ margin: 0, fontSize: "1.2rem" }}>🎯 Тест Квартали</h2>
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
            
            {/* Area 1: Zdravets */}
            <div className="area-card">
                <label className="sidebar-label">
                    <div className="toggle-switch-wrapper">
                        <input 
                            type="checkbox" 
                            defaultChecked 
                            className="sidebar-toggle-input" 
                            id="zdravec-toggle" /* Unique ID for each card */
                            onChange={(e) => console.log("[UI] Zdravec toggled: ", e.target.checked)} 
                        />
                        <span className="sidebar-toggle-slider"></span>
                    </div>
                    <span className="sidebar-label-text">Ж.К. Здравец</span>
                </label>
                <div className="dropdown-container">
                    <select 
                        defaultValue="all" 
                        onChange={(e) => console.log("[UI] Zdravec filter changed: ", e.target.value)} 
                        className="sidebar-select"
                    >
                        <option value="all">Всички (Имена и Номера)</option>
                        <option value="imena">Само Именувани (бл. Цена...)</option>
                        <option value="nomera">Само Номерирани (бл. 105...)</option>
                    </select>
                </div>
            </div>


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