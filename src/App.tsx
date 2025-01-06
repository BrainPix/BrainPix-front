import { useState } from 'react';
import styles from './App.module.scss';
import classNames from 'classnames/bind';

function App() {
  const cn = classNames.bind(styles);

  const [clicked, setClicked] = useState(false);
  const handleClickButton = () => {
    setClicked(!clicked);
  };
  return (
    <div>
      프로젝트 세팅
      <button
        className={cn('testButton', { clicked: clicked })}
        onClick={handleClickButton}>
        테스트 버튼
      </button>
      <div>
        프로젝트 세팅
        {/* <button
        className={classNames(styles.testButton, clicked && styles.clicked)}
        onClick={handleClickButton}>
        테스트 버튼
      </button> */}
      </div>
    </div>
  );
}

export default App;
