import React from "react";
import "./MySelect.css";
interface MySelectProps {
    handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const MySelect = ({ handleSelectChange }: MySelectProps)=>{
    return(
        <div className="select-container">
            <select onChange={handleSelectChange}>
                <option value="activated">Activated</option>
                <option value="deactivated">Deactivated</option>
                <option value="all">All</option>
            </select>
        </div>
    )
}