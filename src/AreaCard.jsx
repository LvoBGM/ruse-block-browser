import React, { useState } from 'react';

export default function AreaCard({ id, name, options, setSelectedOptions }) {
    const [isExpanded, setIsExpanded] = useState(false);

    function handleMainToggle(e) {
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [id]: e.target.checked
        }));

        // Change option checkboxes to match main toggle
        if (options && options.length > 1) {
            if (isExpanded) {
                setIsExpanded(false);
            }
            options.forEach(option => {
                handleOptionToggle(option.value, e.target.checked);
            });
        }
        
    };

    function handleOptionToggle(optionValue, checked) {
        setSelectedOptions(prevOptions => ({
            ...prevOptions,
            [`${id}${optionValue}`]: checked
        }));
    };

    return (
        <div className="area-card">
            {/* Main area toggle */}
            <div className="sidebar-label">
                <label className="toggle-switch-wrapper">
                    <input
                        type="checkbox"
                        defaultChecked
                        className="sidebar-toggle-input"
                        id={`${id}-toggle`}
                        onChange={handleMainToggle}
                    />
                    <span className="sidebar-toggle-slider"></span>
                </label>
                <div className="label-content" onClick={() => setIsExpanded(!isExpanded)}>
                    <span className="sidebar-label-text">{name}</span>

                    {/* Expand/collapse symbol */}
                    {options && options.length > 1 && (
                        <span className={`chevron ${isExpanded ? 'expanded' : ''}`}>▼</span>
                    )}
                </div>
            </div>
 
            {/* Sub-checkboxes for options */}
            {isExpanded && options && options.length > 1 && (
                <div className="options-container">
                    {options.map((option) => (
                        <label key={option.value} className="option-checkbox">
                            <input 
                                type="checkbox"
                                defaultChecked
                                onChange={(e) => handleOptionToggle(option.value, e.target.checked)}
                            />
                            <span>{option.label}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}