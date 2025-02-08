import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './ideaMarketMain.module.scss';
import PreviewThumbnail from '../../components/preview/PreviewThumbnail';
import { Dropdown } from '../../components/common/dropdown/Dropdown';
import Card from '../../components/common/card/Card';
import { Carousel } from '../../components/common/carousel/Carousel';

interface CardData {
  id: number;
  isBookmarked?: boolean;
  saves: number;
  views: number;
}

export const IdeaMarketMain = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState<CardData[]>(
    Array(9)
      .fill(null)
      .map((_, index) => ({
        id: index,
        isBookmarked: false,
        saves: 12,
        views: 12,
      })),
  );

  const handleBookmarkClick = (cardId: number) => {
    setCardsData((prevData) =>
      prevData.map((card) =>
        card.id === cardId
          ? {
              ...card,
              isBookmarked: !card.isBookmarked,
              saves: card.saves + (card.isBookmarked ? -1 : 1),
            }
          : card,
      ),
    );
  };

  return (
    <>
      <div className={styles.ideaMarketHeader}>
        <div className={styles.titleWrapper}>
          <span className={styles.mainTitle}>아이디어 마켓</span>
          <span className={styles.subtitle}>Idea Solution</span>
        </div>
        <button
          className={styles.registerButton}
          onClick={() => navigate('/idea-market/register')}>
          아이디어 등록하기
        </button>
      </div>
      <div className={styles.carouselWrapper}>
        <div className={styles.ideaMarketMain}>
          <div className={styles.subTitle}>
            <span>전문가의 손길로 완성되는 아이디어</span>
            <span className={styles.highlight}></span>
          </div>
          <Carousel
            buttonPosition='center'
            cardWidth={200}
            cardCount={3}
            gap={45}
            dataLength={8}>
            {cardsData.map((card) => (
              <Card
                key={card.id}
                id={card.id}
                isBookmarked={card.isBookmarked}
                saves={card.saves}
                views={card.views}
                onBookmarkClick={handleBookmarkClick}
              />
            ))}
          </Carousel>
        </div>
      </div>
      <div className={styles.headerComponents}>
        <div className={styles.leftComponents}>
          <div className={styles.ideaText}>맞춤형 아이디어 모아보기</div>
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
              <option value='low'>저가순</option>
              <option value='highView'>낮은 가격순</option>
              <option value='lowView'>높은 가격순</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.thumbnailGrid}>
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <PreviewThumbnail
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
