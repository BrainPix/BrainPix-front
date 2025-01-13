import classNames from 'classnames';
import { ChangeEvent, useRef, useState, KeyboardEvent } from 'react';

import Search from '../../../assets/icons/search.svg?react';
import Delete from '../../../assets/icons/delete.svg?react';
import Clock from '../../../assets/icons/clock.svg?react';
import { debounce } from '../../../utils/debounce';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

import styles from './searchInput.module.scss';

export const SearchInput = () => {
  const recentSearchWrapperRef = useRef<HTMLDivElement>(null);

  const closeRecentSearchWrapper = () => {
    setOpenRecentSearch(false);
  };
  useOutsideClick({
    ref: recentSearchWrapperRef,
    handler: closeRecentSearchWrapper,
  });

  const [search, setSearch] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  const [openRecentSearch, setOpenRecentSearch] = useState(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOpenRecentSearch(true);
    const searchKeyword = e.target.value;
    if (searchKeyword === '') {
      setRecentSearch([]);
    }
    setSearch(searchKeyword);
    const recentSearches = localStorage.getItem('recentSearch');
    const recentSearchesArray = recentSearches
      ? JSON.parse(recentSearches)
      : [];
    const filteredArray = recentSearchesArray.filter((keyword: string) =>
      keyword.includes(searchKeyword),
    );
    setRecentSearch(filteredArray);
  };

  const handleEnterEvent = (e: KeyboardEvent<HTMLInputElement>) => {
    setOpenRecentSearch(true);
    if (e.code === 'Enter' && search !== '') {
      const prev = localStorage.getItem('recentSearch');
      const prevArray = prev ? JSON.parse(prev) : [];
      const updatedArray = [...new Set([search.trim(), ...prevArray])];
      localStorage.setItem('recentSearch', JSON.stringify(updatedArray));
      if (!inputRef.current) {
        return;
      }
      inputRef.current.value = '';
    }
  };

  const handleDeleteKeyword = (keyword: string) => {
    const updatedArray = recentSearch.filter((search) => search !== keyword);
    setRecentSearch(updatedArray);
    localStorage.setItem('recentSearch', JSON.stringify(updatedArray));
  };

  const handleAllDelete = () => {
    localStorage.removeItem('recentSearch');
    setRecentSearch([]);
  };

  return (
    <label
      className={classNames(
        styles.input,
        openRecentSearch && recentSearch.length !== 0
          ? styles.roundedTop
          : styles.roundedAll,
      )}>
      <Search />
      <input
        ref={inputRef}
        className={classNames(styles.inputText)}
        placeholder='어떤 아이디어를 찾으시나요? 키워드를 입력하세요'
        onChange={debounce({ handler: handleInputChange })}
        onKeyDown={(e) => handleEnterEvent(e)}
      />
      {openRecentSearch && recentSearch.length !== 0 && (
        <div
          className={classNames(styles.recentSearchWrapper)}
          ref={recentSearchWrapperRef}>
          <div className={classNames(styles.spaceBetween)}>
            <span>최근검색어</span>
            <span
              onClick={() => handleAllDelete()}
              className={classNames(styles.hoverUnderline)}>
              전체 삭제
            </span>
          </div>
          <div>
            {recentSearch.map((searches) => (
              <div
                key={searches}
                className={classNames(
                  styles.spaceBetween,
                  styles.recentSearch,
                )}>
                <div>
                  <Clock />
                  {searches}
                </div>
                <Delete onClick={() => handleDeleteKeyword(searches)} />
              </div>
            ))}
          </div>
          <div className={classNames(styles.spaceBetween)}>
            <span className={classNames(styles.hoverUnderline)}>
              최근 검색 저장 끄기
            </span>
            <span className={classNames(styles.hoverUnderline)}>닫기</span>
          </div>
        </div>
      )}
    </label>
  );
};
