import styles from './buttonGroup.module.scss';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { putPostIdeaMarket } from '../../../apis/postManagementAPI';
import { IdeaMarketEditType } from '../../../types/postDataType';

interface ButtonGroupProps {
  ideaId?: string;
  handleSubmit: () => Promise<boolean>;
  formData: {
    title: string;
    content: string;
  };
  isPortfolioVisible: boolean;
  visibility: string;
  pageType: string;
}

export const ButtonGroup = ({
  ideaId,
  handleSubmit,
  formData,
  isPortfolioVisible,
  visibility,
  pageType,
}: ButtonGroupProps) => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (payload: IdeaMarketEditType) =>
      putPostIdeaMarket(Number(ideaId), payload),
    onSuccess: () => {
      alert('게시글 수정 성공!');
      navigate(-1);
    },
    onError: () => {
      alert('수정에 실패했습니다.');
    },
  });

  const handleUpdate = () => {
    if (!ideaId) return;

    const updatePayload: IdeaMarketEditType = {
      title: formData.title,
      content: formData.content,
      specialization: 'DESIGN', // 또는 category -> 서버 enum 매핑
      openMyProfile: isPortfolioVisible,
      postAuth:
        visibility === '전체공개'
          ? 'ALL'
          : visibility === '기업공개'
            ? 'COMPANY'
            : 'ME',
      ideaMarketType:
        pageType === 'Idea Solution' ? 'IDEA_SOLUTION' : 'MARKET_PLACE',
      imageList: [],
      attachmentFileList: [],
    };

    mutation.mutate(updatePayload);
  };

  return (
    <div className={styles.buttonWrapper}>
      <button
        onClick={() => navigate(-1)}
        className={styles.cancelButton}>
        취소
      </button>

      {ideaId ? (
        <button
          onClick={handleUpdate}
          className={styles.submitButton}>
          <span>수정</span>
        </button>
      ) : (
        <button
          onClick={async () => {
            try {
              await handleSubmit();
              navigate('/idea-market/register-complete');
            } catch {
              alert('등록에 실패했습니다. 다시 시도해주세요.');
            }
          }}
          className={styles.submitButton}>
          <span>등록</span>
        </button>
      )}
    </div>
  );
};
