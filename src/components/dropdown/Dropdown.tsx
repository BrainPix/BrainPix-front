import React, { useState } from "react";
import styles from "./Dropdown.module.scss";

interface DropdownProps {
  label?: string;
  options: string[];
  defaultOption?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, defaultOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultOption || options[0]);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.selectBox} onClick={() => setIsOpen(!isOpen)}>
        {selected}
        <span className={styles.arrow}>&#9662;</span>
      </div>
      {isOpen && (
        <ul className={styles.optionsList}>
          {options.map((option) => (
            <li key={option} className={styles.option} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;