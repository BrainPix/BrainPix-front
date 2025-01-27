import classNames from 'classnames';
import styles from './info.module.scss';

import { MyProfileCard } from '../../../components/my/info/MyProfileCard';
import { useState } from 'react';
import { IntroducePart } from '../../../components/my/info/IntroducePart';
import { IndividualInfoPart } from '../../../components/my/info/IndividualInfoPart';
import { SkillPart } from '../../../components/my/info/SkillPart';
import { ExperiencePart } from '../../../components/my/info/ExperiencePart';
import { PortfolioPart } from '../../../components/my/info/PortfolioPart';
import { SpecializationPart } from '../../../components/my/info/SpecializationPart';

const USER_DATA = {
  연락처: '01023451234',
  노션: '노션 주소',
  깃허브: '깃허브 주소',
};

export const Info = () => {
  const [editMode, setEditMode] = useState(false);

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
        <IntroducePart editMode={editMode} />
        <IndividualInfoPart
          editMode={editMode}
          userData={USER_DATA}
        />
        {editMode && <SpecializationPart />}

        <SkillPart editMode={editMode} />
        <ExperiencePart editMode={editMode} />
        <PortfolioPart editMode={editMode} />
      </div>
    </form>
  );
};
