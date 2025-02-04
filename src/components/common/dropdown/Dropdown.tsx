import { useState, useRef } from 'react';
import { useOutsideClick } from '../../../hooks/useOutsideClick.ts';
import classNames from 'classnames';
import styles from './dropdown.module.scss';

interface DropdownProps {
  label?: string;
  options?: string[];
  max_visible_options?: number;
  customClassName?: string;
  onSelect?: (value: string) => void;
}

const defaultOptions = [
  '광고 · 홍보',
  '디자인',
  '레슨',
  '마케팅',
  '문서 · 글쓰기',
  '미디어 · 콘텐츠',
  '번역 및 통역',
  '세무 · 법무 · 노무',
  '주문제작',
  '창업 · 사업',
  '푸드 및 음료',
  'IT · 테크',
  '기타',
];

export const Dropdown = ({
  label = '',
  options,
  max_visible_options = 5,
  customClassName,
  onSelect,
}: DropdownProps) => {
  const finalOptions = options && options.length > 0 ? options : defaultOptions;
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options?.[0] || '분야별');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsListRef = useRef<HTMLUListElement>(null);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  // 외부 클릭 감지
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  return (
    <div
      className={styles.dropdown}
      ref={dropdownRef}>
      {label && <label className={styles.label}>{label}</label>}
      <div
        className={classNames(
          styles.selectBox,
          { [styles.open]: isOpen },
          customClassName,
        )}
        onClick={() => setIsOpen(!isOpen)}>
        {selected}
        <span className={styles.arrow}>&#9662;</span>
      </div>
      {isOpen && (
        <ul
          className={styles.optionsList}
          ref={optionsListRef}
          style={{ maxHeight: `calc((40px) * ${max_visible_options})` }}>
          {finalOptions.map((option) => (
            <li
              key={option}
              className={(classNames(styles.option), customClassName)}
              role='option'
              aria-selected={selected === option}
              tabIndex={0}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => e.key === 'Enter' && handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
