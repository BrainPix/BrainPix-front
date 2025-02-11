import { useState } from 'react';
import { useQnA } from '../../hooks/useQnA';
import styles from './qnaSection.module.scss';
import { Comment } from '../../types/commentsType';
import React from 'react';

interface QnASectionProps {
  postId: number;
  profileImageUrl: string;
}

const QnASection = ({ postId, profileImageUrl }: QnASectionProps) => {
  const {
    commentsQuery,
    postCommentMutation,
    postReplyMutation,
    setCurrentPage,
    currentPage,
  } = useQnA(postId);

  const [commentContent, setCommentContent] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [activeReply, setActiveReply] = useState<number | null>(null); // 대댓글 입력창 활성화 상태

  // 페이지 이동 함수
  const handleNextPage = () => {
    if (commentsQuery.data?.hasNext) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const handleReplyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReplyContent(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!commentContent.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    postCommentMutation.mutate(commentContent, {
      onSuccess: () => {
        setCommentContent(''); // 입력 필드 초기화
      },
    });
  };

  const handleReplySubmit = async (parentCommentId: number) => {
    if (!replyContent.trim()) {
      alert('답글을 입력해주세요.');
      return;
    }

    postReplyMutation.mutate(
      { parentCommentId, content: replyContent },
      {
        onSuccess: () => {
          setReplyContent('');
          setActiveReply(null); // 대댓글 입력창 닫기
        },
      },
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>담당자 Q&A</h1>
      <div className={styles.divider}></div>

      {/* 🔹 댓글 입력 폼 */}
      <div className={styles.inputContainer}>
        <textarea
          className={styles.textArea}
          placeholder='질문을 입력하세요...'
          value={commentContent}
          onChange={handleCommentChange}
        />
        <button
          className={styles.submitButton}
          onClick={handleCommentSubmit}
          disabled={postCommentMutation.isPending}>
          {postCommentMutation.isPending ? '등록 중...' : '등록'}
        </button>
      </div>

      {/* 🔹 댓글 목록 */}
      {commentsQuery.isLoading && <p>댓글을 불러오는 중...</p>}
      {commentsQuery.error && <p>댓글을 불러오는 중 오류 발생!</p>}
      {commentsQuery.data?.content.length === 0 && (
        <p>등록된 댓글이 없습니다.</p>
      )}

      {commentsQuery.data?.content.map((comment: Comment) => (
        <div
          key={comment.commentId}
          className={styles.qnaItem}>
          <div className={styles.profile}>
            <img
              src={profileImageUrl || '/default-profile.png'}
              alt={`프로필`}
              className={styles.profileIcon}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.header}>
              <span className={styles.id}>{comment.writerName}</span>
              <span className={styles.date}>{comment.createdDate}</span>
            </div>
            <p className={styles.question}>{comment.content}</p>
            <div className={styles.actions}>
              <button
                className={styles.actionButton}
                onClick={() => setActiveReply(comment.commentId)}>
                답글쓰기
              </button>
            </div>

            {/* 🔹 대댓글 입력창 */}
            {activeReply === comment.commentId && (
              <div className={styles.replyInputContainer}>
                <textarea
                  className={styles.textArea}
                  placeholder='답글을 입력하세요...'
                  value={replyContent}
                  onChange={handleReplyChange}
                />
                <button
                  className={styles.submitButton}
                  onClick={() => handleReplySubmit(comment.commentId)}
                  disabled={postReplyMutation.isPending}>
                  {postReplyMutation.isPending ? '등록 중...' : '등록'}
                </button>
              </div>
            )}

            {/* 🔹 대댓글 목록 */}
            {comment.childComments.length > 0 && (
              <div className={styles.childComments}>
                {comment.childComments.map((child) => (
                  <div
                    key={child.commentId}
                    className={styles.qnaItemReply}>
                    <div className={styles.profile}>
                      <img
                        src={profileImageUrl || '/default-profile.png'}
                        alt={`프로필`}
                        className={styles.profileIcon}
                      />
                    </div>
                    <div className={styles.content}>
                      <div className={styles.header}>
                        <span className={styles.id}>{child.writerName}</span>
                        <span className={styles.date}>{child.createdDate}</span>
                      </div>
                      <p className={styles.question}>{child.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* 🔹 페이지네이션 버튼 */}
      <div className={styles.pagination}>
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}>
          이전 페이지
        </button>
        <span>{currentPage + 1} 페이지</span>
        <button
          onClick={handleNextPage}
          disabled={!commentsQuery.data?.hasNext}>
          다음 페이지
        </button>
      </div>
    </div>
  );
};

export default QnASection;
