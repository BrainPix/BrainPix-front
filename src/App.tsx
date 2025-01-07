import { useState } from 'react';
import classNames from 'classnames';
import './styles/main.scss';

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className='container'>
      <h1>Global SCSS 테스트</h1>

      <div className='cardOutlined'>
        <h3>카드 제목</h3>
        <p>카드 내용</p>
      </div>
      <div className='cardDark'></div>

      {/* 기본 버튼 */}
      <button className='button'>기본 버튼</button>

      {/* 테두리 버튼 */}
      <button className='button buttonOutlined'>테두리 버튼</button>

      {/* 블랙 버튼 */}
      <button className='button buttonDark'>블랙 버튼</button>

      {/* 비활성화 버튼 */}
      <button className='button' disabled>
        비활성화 버튼
      </button>

      {/* 버튼 크기 테스트 */}
      <button className='button buttonDark buttonSmall'>작은 버튼</button>
      <button className='button buttonRounded buttonMedium'>중간 버튼</button>
      <button className='button buttonOutlined buttonLarge'>큰 버튼</button>

      {/* 버튼 클릭 이벤트 테스트 */}
      <button
        className={classNames('button', { clicked: isClicked })}
        onClick={handleClick}
      >
        클릭 테스트 버튼
      </button>

      <p>이 문장은 글로벌 SCSS 스타일이 적용되어야 합니다.</p>
    </div>
  );
}

export default App;