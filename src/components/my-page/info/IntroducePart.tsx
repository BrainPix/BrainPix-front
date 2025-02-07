import { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './introducePart.module.scss';

interface IntroducePartPropsType {
  editMode: boolean;
  userType: '개인' | '기업';
}

export const IntroducePart = forwardRef<
  HTMLTextAreaElement,
  IntroducePartPropsType
>(({ editMode, userType, ...rest }, ref) => {
  const handleChange = () => {};
  return (
    <div>
      <h1 className={classNames(styles.title)}>
        {userType === '개인' ? '자기 소개' : '기업 소개'}
      </h1>
      <textarea
        className={classNames(styles.introduceWrapper)}
        onChange={handleChange}
        disabled={!editMode}
        ref={ref}
        {...rest}
      />
    </div>
  );
});

IntroducePart.displayName = 'IntroducePart';
