import { useState, useEffect, useRef } from "react";
import styles from './Dropdown.module.scss';

interface DropdownProps {
  label?: string;
  options?: string[];
  maxVisibleOptions?: number;
}

const defaultOptions = [
  "광고 · 홍보",
  "디자인",
  "레슨",
  "마케팅",
  "문서 · 글쓰기",
  "미디어 · 콘텐츠",
  "번역 및 통역",
  "세무 · 법무 · 노무",
  "주문제작",
  "창업 · 사업",
  "푸드 및 음료",
  "IT · 테크",
  "기타"
];

const Dropdown = ({ label = "", options, maxVisibleOptions = 5 } : DropdownProps) => { 
  const finalOptions = options && options.length > 0 ? options : defaultOptions;
  // console.log(finalOptions[0], finalOptions[1]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("분야별");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsListRef = useRef<HTMLUListElement>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false); // 외부 클릭 시 드롭다운 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={`${styles.selectBox} ${isOpen ? styles.open : ""}`}
      onClick={() => setIsOpen(!isOpen)}>
        {selected}
        <span className={styles.arrow}>&#9662;</span>
      </div>
      {isOpen && (
        <ul className={styles.optionsList}
        ref={optionsListRef} 
        style={{ maxHeight: `calc((40px) * ${maxVisibleOptions})`}}>
          {finalOptions.map((option) => (
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