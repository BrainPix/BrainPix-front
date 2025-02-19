import { ChangeEvent, forwardRef } from 'react';
import styles from '../../../pages/my-page/postsIdeaMarket/ideaMarketEdit.module.scss';

interface IdeaNameInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const IdeaName = forwardRef<HTMLInputElement, IdeaNameInputProps>(
  ({ value, onChange }, ref) => {
    return (
      <div className={styles.formGroup}>
        <div className={styles.ideaNameWrapper}>
          <input
            ref={ref}
            type='text'
            placeholder='아이디어명 입니다'
            className={styles.IdeaName}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    );
  },
);

IdeaName.displayName = 'IdeaName';
