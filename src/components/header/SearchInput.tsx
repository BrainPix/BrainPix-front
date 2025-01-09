import classNames from 'classnames';
import { ChangeEvent, useRef, useState, KeyboardEvent } from 'react';

import Search from '../../assets/icons/search.svg?react';
import Delete from '../../assets/icons/delete.svg?react';
import Clock from '../../assets/icons/clock.svg?react';
import { debounce } from '../../utils/debounce';

import styles from './searchInput.module.scss';

export const SearchInput = () => {
  const [search, setSearch] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [recentSearch, setRecentSearch] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    if (e.code === 'Enter' && search !== '') {
      const prev = localStorage.getItem('recentSearch');
      const prevArray = prev ? JSON.parse(prev) : [];
      const updatedArray = [...new Set([...prevArray, search.trim()])];
      localStorage.setItem('recentSearch', JSON.stringify(updatedArray));
      if (!inputRef.current) {
        return;
      }
      inputRef.current.value = '';
    }
  };

  return (
    <label className={classNames(styles.input)}>
      <Search />
      <input
        ref={inputRef}
        className={classNames(styles.inputText)}
        placeholder='어떤 아이디어를 찾으시나요? 키워드를 입력하세요'
        onChange={debounce((e) => handleInputChange(e))}
        onKeyDown={(e) => handleEnterEvent(e)}
      />
      {recentSearch.length !== 0 && (
        <div className={classNames(styles.recentSearchWrapper)}>
          <div className={classNames(styles.spaceBetween)}>
            <span>최근검색어</span>
            <span>전체 삭제</span>
          </div>
          <div>
            {recentSearch.map((searches) => (
              <div
                key={searches}
                className={classNames(
                  styles.spaceBetween,
                  styles.recentSearch,
                )}>
                <div className='flex-center'>
                  <Clock />
                  <span>{searches}</span>
                </div>
                <Delete />
              </div>
            ))}
          </div>
          <div className={classNames(styles.spaceBetween)}>
            <span>최근 검색 저장 끄기</span>
            <span>닫기</span>
          </div>
        </div>
      )}
    </label>
  );
};
