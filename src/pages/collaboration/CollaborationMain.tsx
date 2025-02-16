import { useNavigate } from 'react-router-dom';
import styles from './collaborationMain.module.scss';
import PreviewThumbnail from '../../components/preview/PreviewThumbnail';
import { Dropdown } from '../../components/common/dropdown/Dropdown';

export const CollaborationMain = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.ideaMarketHeader}>
        <div className={styles.titleWrapper}>
          <span className={styles.mainTitle}>협업 광장</span>
        </div>
        <button
          className={styles.registerButton}
          onClick={() => navigate('/collaboration/register')}>
          팀원 모집 등록하기
        </button>
      </div>
      <div className={styles.headerComponents}>
        <div className={styles.leftComponents}>
          <div className={styles.filterWrapper}>
            <Dropdown />
            <div className={styles.viewOptions}>
              <label className={styles.radioWrapper}>
                <input
                  type='radio'
                  name='viewOption'
                  value='all'
                  defaultChecked
                />
                <span className={styles.radioLabel}>기업 공개 제외</span>
              </label>
              <label className={styles.radioWrapper}>
                <input
                  type='radio'
                  name='viewOption'
                  value='company'
                />
                <span className={styles.radioLabel}>기업 공개만</span>
              </label>
            </div>
          </div>
        </div>
        <div className={styles.rightComponents}>
          <div className={styles.sortDropdown}>
            <select className={styles.sortSelect}>
              <option value='newest'>최신순</option>
              <option value='popular'>오래된순</option>
              <option value='save'>저장순</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.thumbnailGrid}>
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <PreviewThumbnail
              ideaId={1}
              key={index}
              username='최규호'
              description='BrainPix 페이지'
              price={500000}
            />
          ))}
      </div>
    </>
  );
};
