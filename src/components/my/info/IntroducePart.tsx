import classNames from 'classnames';
import styles from './introducePart.module.scss';
import { ChangeEvent } from 'react';

interface IntroducePartPropsType {
  editMode: boolean;
}

export const IntroducePart = ({ editMode }: IntroducePartPropsType) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
  };
  return (
    <div>
      <h1 className={classNames(styles.title)}>자기 소개</h1>
      <textarea
        className={classNames(styles.introduceWrapper)}
        value={'자기소개 내용임'}
        onChange={handleChange}
        disabled={!editMode}>
        자기 소개 내용임
      </textarea>
    </div>
  );
};
