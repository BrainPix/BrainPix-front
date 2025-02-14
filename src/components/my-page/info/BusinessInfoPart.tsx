import { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './businessInfoPart.module.scss';

interface BusinessInfoPartPropsType {
  editMode: boolean;
}

export const BusinessInfoPart = forwardRef<
  HTMLTextAreaElement,
  BusinessInfoPartPropsType
>(({ editMode, ...rest }, ref) => {
  const handleChange = () => {};

  return (
    <div>
      <h1 className={classNames(styles.title)}>사업 정보</h1>
      <textarea
        className={classNames(styles.introduceWrapper)}
        onChange={handleChange}
        placeholder='기타 사업 정보를 입력하세요(텍스트)'
        disabled={!editMode}
        ref={ref}
        {...rest}
      />
    </div>
  );
});

BusinessInfoPart.displayName = 'BusinessInfoPart';
