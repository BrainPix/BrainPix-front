import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './ideaMarketMarketPlace.module.scss';
import PreviewThumbnail from '../../components/preview/PreviewThumbnail';
import { Dropdown } from '../../components/common/dropdown/Dropdown';
import Card from '../../components/common/card/Card';
import { Carousel } from '../../components/common/carousel/Carousel';
import { getPopularIdeas } from '../../apis/mainPageAPI';
import { IdeaMarketCheck } from '../../types/mainType';

interface CardData {
  id: number;
  isBookmarked?: boolean;
  saves: number;
  views: number;
}

export const IdeaMarketMarketPlace = () => {
  const navigate = useNavigate();
  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [ideaData, setIdeaData] = useState<IdeaMarketCheck['data']['content']>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await getPopularIdeas({
          type: 'MARKET_PLACE',
          page: 0,
          size: 10,
        });

        if (response.success) {
          const formattedCardsData = response.data.content.map((item) => ({
            id: item.ideaId,
            isBookmarked: item.isSavedPost,
            saves: item.saveCount,
            views: item.viewCount,
          }));

          setCardsData(formattedCardsData);
          setIdeaData(response.data.content);
        }
      } catch (error) {
        console.error('아이디어 데이터 로딩 중 에러:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIdeas();
  }, []);

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

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div className={styles.ideaMarketHeader}>
        <div className={styles.titleWrapper}>
          <span className={styles.mainTitle}>아이디어 마켓</span>
          <span className={styles.subtitle}>Market Place</span>
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
            <span>완성된 아이디어 제품과 서비스를 거래하는 공간</span>
            <span className={styles.highlight}></span>
          </div>
          <Carousel
            buttonPosition='center'
            cardWidth={200}
            cardCount={3}
            gap={45}
            dataLength={cardsData.length}>
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
        {ideaData.map((idea) => (
          <PreviewThumbnail
            key={idea.ideaId}
            username={idea.writerName}
            description={idea.title}
            price={idea.price}
            imageUrl={idea.thumbnailImageUrl}
          />
        ))}
      </div>
    </>
  );
};
