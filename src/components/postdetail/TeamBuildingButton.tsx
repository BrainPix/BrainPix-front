import styles from './teamBuildingButton.module.scss';

const TeamBuildingButton = () => {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a
      href='#'
      className={styles.button}>
      팀 빌딩 신청하기
    </a>
  );
};

export default TeamBuildingButton;
