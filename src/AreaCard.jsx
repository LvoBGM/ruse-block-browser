import React from 'react';

export default function AreaCard({ id, name, options }) {
    return (
        <div className="area-card">
            <label className="sidebar-label">
                <div className="toggle-switch-wrapper">
                    <input 
                        type="checkbox" 
                        defaultChecked 
                        className="sidebar-toggle-input" 
                        id={`${id}-toggle`}
                    />
                    <span className="sidebar-toggle-slider"></span>
                </div>
                <span className="sidebar-label-text">{name}</span>
            </label>

            {options && options.length > 1 && (
                <div className="dropdown-container">
                    <select 
                        defaultValue="all" 
                        onChange={(e) => onSelectChange(id, e.target.value)} 
                        className="sidebar-select"
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}