import classNames from 'classnames';
import styles from './info.module.scss';

import { MyProfileCard } from '../../../components/my/MyProfileCard';
import { PortfolioCarousel } from '../../../components/personal-profile/PortfolioCarousel';
import { LevelCheckboxGroup } from '../../../components/common/levelCheckboxGroup/LevelCheckboxGroup';
import { useState } from 'react';
import { InfoInput } from '../../../components/my/InfoInput';
import Dropdown from '../../../components/dropdown/Dropdown';
import { SkillInput } from '../../../components/my/SkillInput';
import { ExperienceInput } from '../../../components/my/ExperienceInput';

const USER_DATA = {
  연락처: '01023451234',
  노션: '노션 주소',
  깃허브: '깃허브 주소',
};

export const Info = () => {
  const [editMode, setEditMode] = useState(false);

  const handleClick = (value: string) => {
    console.log(value);
  };

  const handleClickEditButton = () => {
    setEditMode(true);
  };

  const handleClickSaveButton = () => {
    setEditMode(false);
  };

  return (
    <form>
      <MyProfileCard
        status={editMode ? 'save' : 'edit'}
        onClickButton={editMode ? handleClickSaveButton : handleClickEditButton}
      />
      <div className={classNames(styles.contentContainer)}>
        <div>
          <h1 className={classNames(styles.title)}>자기 소개</h1>
          <textarea
            className={classNames(styles.introduceWrapper)}
            value={'자기소개 내용임'}
            disabled={!editMode}>
            자기 소개 내용임
          </textarea>
        </div>
        <div>
          <h1 className={classNames(styles.title)}>
            개별 정보
            {editMode && (
              <span className={classNames(styles.subTitle)}>
                {'(최대 500자)'}
              </span>
            )}
          </h1>
          <div className={classNames(styles.individualInfoWrapper)}>
            {Object.entries(USER_DATA).map(([key, value]) => (
              <div
                key={key}
                className={classNames(styles.list)}>
                <span className={classNames(styles.label)}>{key}</span>
                <hr className={classNames(styles.divider)} />
                <span>{value}</span>
              </div>
            ))}
          </div>
          {editMode && (
            <div className={classNames(styles.editInputWrapper)}>
              <InfoInput customClassName={classNames(styles.infoInput)} />
              <button
                type='button'
                className={classNames(
                  'buttonFilled-grey800',
                  styles.addButton,
                )}>
                추가하기
              </button>
            </div>
          )}
        </div>
        {editMode && (
          <div className={classNames(styles.speciallizationWrapper)}>
            <h1 className={classNames(styles.title)}>
              전문 분야
              {editMode && (
                <span className={classNames(styles.subTitle)}>
                  {'(최대 3개)'}
                </span>
              )}
            </h1>
            <Dropdown
              customClassName={classNames(styles.speciallizationDropdown)}
            />
          </div>
        )}
        <div>
          <div className={classNames(styles.title)}>
            보유 기술
            {editMode && (
              <div className={classNames(styles.publicCheckboxWrapper)}>
                <input type='checkbox' />
                <span>공개여부</span>
              </div>
            )}
          </div>
          <div className={classNames(styles.skillInfoWrapper)}>
            <div className={classNames(styles.list)}>
              <span className={classNames(styles.label)}>파이썬</span>
              <hr className={classNames(styles.divider)} />
              <span className={classNames(styles.content)}>
                파이썬을 이용한 2D 게임 개발 경험
              </span>
              <hr className={classNames(styles.divider)} />
              <LevelCheckboxGroup onChangeLevel={handleClick} />
            </div>
          </div>
          {editMode && (
            <div className={classNames(styles.editInputWrapper)}>
              <SkillInput />
              <button
                type='button'
                className={classNames(
                  'buttonFilled-grey800',
                  styles.addButton,
                )}>
                추가하기
              </button>
            </div>
          )}
        </div>
        <div>
          <div className={classNames(styles.title)}>
            경력 사항
            {editMode && (
              <div className={classNames(styles.publicCheckboxWrapper)}>
                <input type='checkbox' />
                <span>공개여부</span>
              </div>
            )}
          </div>
          <div className={classNames(styles.experienceWrapper)}>
            <div className={classNames(styles.list)}>
              <span className={classNames(styles.content)}>
                삼성 소프트웨어 개발(서버) 인턴쉽
              </span>
              <hr className={classNames(styles.divider)} />
              <span className={classNames(styles.date)}>2024/08 - 2024/12</span>
            </div>
            <div className={classNames(styles.list)}>
              <span className={classNames(styles.content)}>
                삼성 소프트웨어 개발(서버) 인턴쉽
              </span>
              <hr className={classNames(styles.divider)} />
              <span className={classNames(styles.date)}>2024/08 - 2024/12</span>
            </div>
          </div>
          {editMode && (
            <div className={classNames(styles.editInputWrapper)}>
              <ExperienceInput />
              <button
                type='button'
                className={classNames(
                  'buttonFilled-grey800',
                  styles.addButton,
                )}>
                추가하기
              </button>
            </div>
          )}
        </div>
        <div className={classNames(styles.portfolioWrapper)}>
          <div className={classNames(styles.title)}>
            포트폴리오
            <span className={classNames(styles.manageText)}>관리하기</span>
          </div>
          <PortfolioCarousel size={3} />
        </div>
      </div>
    </form>
  );
};
