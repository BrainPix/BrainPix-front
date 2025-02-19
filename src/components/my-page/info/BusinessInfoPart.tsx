import { ChangeEvent, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './businessInfoPart.module.scss';
import { UseFormSetValue } from 'react-hook-form';

interface FieldValuesType {
  profileImage: string;
  selfIntroduction: string;
  stackOpen: boolean;
  careerOpen: boolean;
  businessInfo: string;
}

interface BusinessInfoPartPropsType {
  editMode: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  businessInfoText: string;
  setValue: UseFormSetValue<FieldValuesType>;
}

export const BusinessInfoPart = forwardRef<
  HTMLTextAreaElement,
  BusinessInfoPartPropsType
>(({ editMode, onChange, businessInfoText, setValue, ...rest }, ref) => {
  setValue('businessInfo', businessInfoText);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue('businessInfo', e.target.value);
    onChange(e);
  };

  return (
    <div>
      <h1 className={classNames(styles.title)}>사업 정보</h1>
      {editMode ? (
        <textarea
          className={classNames(styles.introduceTextArea)}
          placeholder='기타 사업 정보를 입력하세요(텍스트)'
          disabled={!editMode}
          ref={ref}
          {...rest}
          onChange={handleChange}
        />
      ) : (
        <div className={classNames(styles.introduceWrapper)}>
          {businessInfoText}
        </div>
      )}
    </div>
  );
});

BusinessInfoPart.displayName = 'BusinessInfoPart';
