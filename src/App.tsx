//import { Test } from './pages/test/Test';
import "./styles/global.scss";

function App() {
  return(
    <div className="app-container">
    <h1>Global SCSS 테스트</h1>

    {/* 기본 버튼 */}
    <button className="button button-primary">기본 버튼</button>
    
    {/* 테두리 버튼 */}
    <button className="button button-outline">테두리 버튼</button>

    {/* 블랙 버튼 */}
    <button className="button button-dark">블랙 버튼</button>

    {/* 비활성화 버튼 */}
    <button className="button button-primary" disabled>비활성화 버튼</button>

    {/* 버튼 크기 테스트 */}
    <button className="button button-primary button-small">작은 버튼</button>
    <button className="button button-primary button-medium">중간 버튼</button>
    <button className="button button-primary button-large">큰 버튼</button>
    
    {/* 추가적인 스타일이 적용되는지 확인 */}
    <p className="test-text">이 문장은 글로벌 SCSS 스타일이 적용되어야 합니다.</p>
  </div>
  );
  //return <Test />;
}

export default App;