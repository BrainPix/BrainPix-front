import classNames from 'classnames';
import styles from './quillToolbar.module.scss';

export const QuillToolbar = () => {
  const FONT_SIZE = ['14px', '15px', '16px', '17px', '18px'];
  return (
    <div
      id='toolbar'
      className={classNames(styles.container)}>
      <select
        className='ql-font'
        defaultValue='arial'>
        <option value='arial'>Arial</option>
        <option value='buri'>Buri</option>
        <option value='gangwon'>Gangwon</option>
      </select>
      <select className={classNames(styles.list, 'ql-size')}>
        {FONT_SIZE.map((fontSize) => (
          <option
            key={fontSize}
            value={fontSize}>
            {fontSize}
          </option>
        ))}
      </select>
      <select className='ql-align'>
        <option value=''>왼쪽 정렬</option>
        <option value='center'>가운데 정렬</option>
        <option value='right'>오른쪽 정렬</option>
      </select>
      <div className={classNames(styles.imageLinkWrapper)}>
        <button className='ql-image'>이미지 첨부</button>
        <button className='ql-link'>하이퍼링크</button>
      </div>
    </div>
  );
};
