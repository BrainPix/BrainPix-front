import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Collaborations } from '../../../types/supportsType';
import {
  getAcceptedCollaborations,
  getRejectedCollaborations,
  deleteRejectedCollaborations,
} from '../../../apis/supportsAPI';
import styles from './applyCollaboration.module.scss';
import { CardHeader } from '../../../components/my-page/apply/CardHeader';
import { PostAuthorInfo } from '../../../components/my-page/apply/PostAuthorInfo';
import { ApplyDetailsInfo } from '../../../components/my-page/apply/ApplyDetailsInfo';
import { ApplyTable } from '../../../components/my-page/apply/ApplyTable';

export const ApplyCollaboration = () => {
  const FORM_DATA = {
    cardTitle: '협업 광장 지원 상세',
    labelText: '기업',
    labelType: 'corporate',
  };
  // const APPLY_DATA = [
  //   {
  //     id: 1,
  //     status: '수락됨',
  //     statusType: 'accept',
  //     date: '2024/12/24',
  //     seller: 'SEO YEON',
  //     tab: '협업 광장',
  //     category: '디자인',
  //     itemName: '앱 개발 팀원 모집',
  //     part: '디자이너',
  //   },
  //   {
  //     id: 2,
  //     status: '거절됨',
  //     statusType: 'reject',
  //     date: '2024/12/24',
  //     seller: 'SEO YEON',
  //     tab: '협업 광장',
  //     category: '디자인',
  //     itemName: '앱 개발 팀원 모집',
  //     part: '디자이너',
  //   },
  // ];
  // const TABLE_DATA = [
  //   {
  //     id: 'qweqr',
  //     role: '디자이너',
  //     current: 1,
  //     total: 2,
  //   },
  //   {
  //     id: 'qweqr',
  //     role: '디자이너',
  //     current: 1,
  //     total: 2,
  //   },
  // ];

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (collectionGatheringId: number) =>
      deleteRejectedCollaborations(collectionGatheringId),
    onSuccess: () => {
      alert('거절된 협업 광장의 지원 내역이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['RejectedCollaborations'] }); // 삭제 후 리스트 새로고침
    },
    onError: () => {
      alert('삭제에 실패했습니다.');
    },
  });

  // accept된 협업 광장
  const {
    data: acceptedCollaborations = [],
    isLoading: isLoadingAccepted,
    isError: isAcceptedError,
  } = useQuery({
    queryKey: ['AcceptedCollaborations', 0, 10],
    queryFn: () => getAcceptedCollaborations(0, 10),
  });

  // reject된 협업 광장
  const {
    data: rejectedCollaborations = [],
    isLoading: isLoadingRejected,
    isError: isErrorRejected,
  } = useQuery({
    queryKey: ['RejectedCollaborations', 0, 10],
    queryFn: () => getRejectedCollaborations(0, 10),
  });

  if (isLoadingAccepted || isLoadingRejected) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  if (isAcceptedError || isErrorRejected) {
    return (
      <div className={styles.error}>데이터를 불러오는 데 실패했습니다.</div>
    );
  }

  const content: Collaborations[] = [
    {
      collectionGatheringId: 0,
      firstImage: 'string',
      postCreatedAt: 'yyyy-MM-dd',
      postTitle: 'string',
      specialization: 'ADVERTISING_PROMOTION',
      domain: 'string',
      writerName: 'string',
      writerType: 'string',
      teamInfoList: [
        {
          domain: 'string',
          occupied: 0,
          total: 0,
          joiners: [
            {
              joinerID: 'string',
              userType: 'string',
            },
          ],
        },
      ],
      collaborationId: 0,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>
        <span className={styles.sectionMainTitle}>지원 현황</span>
        <span className={styles.sectionSubTitle}>지원 내역</span>
      </div>

      {content.length > 0 ? (
        content.map((collaboration: Collaborations) => (
          <div
            key={collaboration.collaborationId}
            className={styles.applyCard}>
            <div className={styles.cardHeaderContainer}>
              <CardHeader
                date={collaboration.postCreatedAt}
                status={'수락됨'}
                statusType={'accept'}
                cardTitle={FORM_DATA.cardTitle}
              />
            </div>

            <PostAuthorInfo
              seller={collaboration.writerName}
              labelText={collaboration.writerType}
              labelType={FORM_DATA.labelType}
            />

            <ApplyDetailsInfo
              tab={'협업 광장'}
              category={collaboration.specialization}
              itemName={collaboration.postTitle}
              part={collaboration.specialization}
            />
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <span>아이디</span>
                <span className={styles.divider} />
                <span>역할</span>
                <span className={styles.divider} />
                <span>인원수</span>
                <span className={styles.divider} />
                <span></span>
              </div>

              {collaboration.teamInfoList.map((teamInfo, index) => (
                <ApplyTable
                  key={index}
                  id={teamInfo.joiners[index].joinerID}
                  role={teamInfo.domain}
                  current={teamInfo.occupied}
                  total={teamInfo.total}
                />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className={styles.error}>수락된 지원 내역이 없습니다.</div>
      )}

      {rejectedCollaborations.length > 0 ? (
        rejectedCollaborations.map((collaboration: Collaborations) => (
          <div
            key={collaboration.collaborationId}
            className={styles.applyCard}>
            <div className={styles.cardHeaderContainer}>
              <CardHeader
                date={collaboration.postCreatedAt}
                status={'거절됨'}
                statusType={'reject'}
                showDeleteButton={true}
                onDelete={() =>
                  deleteMutation.mutate(collaboration.collectionGatheringId)
                }
              />
            </div>

            <ApplyDetailsInfo
              tab={'협업 광장'}
              category={collaboration.specialization}
              itemName={collaboration.postTitle}
              part={collaboration.specialization}
            />
          </div>
        ))
      ) : (
        <div> 거절된 지원 내역이 없습니다. </div>
      )}
    </div>
  );
};
