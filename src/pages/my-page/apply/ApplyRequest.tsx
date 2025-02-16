import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RequestTasks } from '../../../types/supportsType';
import {
  getAcceptedRequestTasks,
  getRejectedRequestTasks,
  deleteRejectedRequestTasks,
} from '../../../apis/supportsAPI';
import styles from './applyRequest.module.scss';
import { CardHeader } from '../../../components/my-page/apply/CardHeader';
import { PostAuthorInfo } from '../../../components/my-page/apply/PostAuthorInfo';
import { ApplyDetailsInfo } from '../../../components/my-page/apply/ApplyDetailsInfo';

export const ApplyRequest = () => {
  const FORM_DATA = {
    cardTitle: '요청 과제 지원 상세',
    labelText: '개인',
    labelType: 'personal',
  };
  // const APPLY_DATA = [
  //   {
  //     id: 1,
  //     status: '수락됨',
  //     statusType: 'accept',
  //     date: '2024/12/24',
  //     seller: 'SEO YEON',
  //     tab: '요청 과제',
  //     category: '디자인',
  //     itemName: '앱 개발 해주실 분',
  //     part: '디자이너',
  //   },
  //   {
  //     id: 2,
  //     status: '거절됨',
  //     statusType: 'reject',
  //     date: '2024/12/24',
  //     seller: 'SEO YEON',
  //     tab: '요청 과제',
  //     category: '디자인',
  //     itemName: '앱 개발 해주실 분',
  //     part: '디자이너',
  //   },
  // ];

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (purchasingId: number) =>
      deleteRejectedRequestTasks(purchasingId),
    onSuccess: () => {
      alert('거절된 요청과제 지원 내역이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['RejectedRequestTasks'] }); // 삭제 후 리스트 새로고침
    },
    onError: () => {
      alert('삭제에 실패했습니다.');
    },
  });

  // accept된 요청 과제
  const {
    data: acceptedTasks = [],
    isLoading: isLoadingAccepted,
    isError: isAcceptedError,
  } = useQuery({
    queryKey: ['AcceptedRequestTasks', 0, 10],
    queryFn: () => getAcceptedRequestTasks(0, 10),
  });

  // reject된 요청 과제
  const {
    data: rejectedTasks = [],
    isLoading: isLoadingRejected,
    isError: isErrorRejected,
  } = useQuery({
    queryKey: ['RejectedRequestTasks', 0, 10],
    queryFn: () => getRejectedRequestTasks(0, 10),
  });

  if (isLoadingAccepted || isLoadingRejected) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  if (isAcceptedError || isErrorRejected) {
    return (
      <div className={styles.error}>데이터를 불러오는 데 실패했습니다.</div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>
        <span className={styles.sectionMainTitle}>지원 현황</span>
        <span className={styles.sectionSubTitle}>지원 내역</span>
      </div>

      {acceptedTasks.length > 0 ? (
        acceptedTasks.map((requestTask: RequestTasks) => (
          <div
            key={requestTask.requestTaskId}
            className={styles.applyCard}>
            <div className={styles.cardHeaderContainer}>
              <CardHeader
                date={requestTask.postCreatedAt}
                status='수락됨'
                statusType='accept'
                cardTitle={FORM_DATA.cardTitle}
              />
            </div>

            <PostAuthorInfo
              seller={requestTask.writerName}
              labelText={FORM_DATA.labelText}
              labelType={FORM_DATA.labelType}
            />

            <ApplyDetailsInfo
              tab='요청 과제'
              category={requestTask.specialization}
              itemName={requestTask.postTitle}
              part={requestTask.domain}
            />
          </div>
        ))
      ) : (
        <div className={styles.emptyMessage}>수락된 지원 내역이 없습니다.</div>
      )}

      {rejectedTasks.length > 0 ? (
        rejectedTasks.map((requestTask: RequestTasks) => (
          <div
            key={requestTask.requestTaskId}
            className={styles.applyCard}>
            <div className={styles.cardHeaderContainer}>
              <CardHeader
                date={requestTask.postCreatedAt}
                status='거절됨'
                statusType='reject'
                showDeleteButton={true}
                onDelete={() => deleteMutation.mutate(requestTask.purchasingId)}
              />
            </div>

            <ApplyDetailsInfo
              tab='요청 과제'
              category={requestTask.specialization}
              itemName={requestTask.postTitle}
              part={requestTask.domain}
            />
          </div>
        ))
      ) : (
        <div className={styles.emptyMessage}>거절된 지원 내역이 없습니다.</div>
      )}
    </div>
  );
};
