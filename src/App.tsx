import classNames from 'classnames/bind'
import styles from './App.module.scss'

function App() {
  const cn = classNames.bind(styles)

  return (
    <div>
      프로젝트 세팅
      <button className={cn('test-button')}>테스트 버튼</button>
    </div>
  )
}

export default App
