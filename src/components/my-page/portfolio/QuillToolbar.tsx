import classNames from 'classnames';
import styles from './quillToolbar.module.scss';
import { Quill } from 'react-quill-new';
import '../../../styles/quillStyles.css';

export const QuillToolbar = () => {
  const FONT_SIZE = [
    '10px',
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '22px',
    '24px',
    '26px',
    '28px',
    '30px',
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Size = Quill.import('formats/size') as any;
  Size.whitelist = FONT_SIZE;
  Quill.register(Size, true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Font = Quill.import('attributors/style/font') as any;
  const FONT_FAMILY = ['Arial', 'Courier', 'Georgia', 'Roboto', 'Verdana'];
  Font.whitelist = FONT_FAMILY;
  Quill.register(Font, true);

  return (
    <div
      id='toolbar'
      className={classNames(styles.container, 'ql-header')}>
      <select className='ql-font'>
        {FONT_FAMILY.map((font) => (
          <option
            value={font}
            key={font}
            className={classNames(`${font}`)}>
            {font}
          </option>
        ))}
      </select>
      <select className='ql-size'>
        {FONT_SIZE.map((font) => (
          <option
            value={font}
            key={font}
            className={classNames(`ql-size-${font}`)}>
            {font}
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
