import { useState, useEffect } from 'react';
import { useQnA } from '../../hooks/useQnA';
import styles from './qnaSection.module.scss';
import { Comment } from '../../types/commentsType';
import React from 'react';
import { imageErrorHandler } from '../../utils/imageErrorHandler';

interface QnASectionProps {
  postId: number;
  userId: number; //props로 userId 받기
}

const QnASection = ({ postId, userId }: QnASectionProps) => {
  const {
    commentsQuery,
    postCommentMutation,
    postReplyMutation,
    deleteCommentMutation,
    setCurrentPage,
    currentPage,
  } = useQnA(postId, userId);

  const [commentContent, setCommentContent] = useState('');
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>(
    {},
  );
  const [activeReply, setActiveReply] = useState<number | null>(null);

  useEffect(() => {
    console.log('내 userId:', userId);
    console.log('댓글 데이터:', commentsQuery.data);
  }, [userId, commentsQuery.data]);

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate({ commentId });
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const handleReplyChange = (
    commentId: number,
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReplyContent((prev) => ({
      ...prev,
      [commentId]: e.target.value,
    }));
  };

  const handleCommentSubmit = () => {
    if (!commentContent.trim()) {
      alert('댓글을 입력해주세요.');
      return;
    }

    postCommentMutation.mutate(commentContent, {
      onSuccess: () => {
        setCommentContent('');
      },
    });
  };

  const handleReplySubmit = (parentCommentId: number) => {
    if (!replyContent[parentCommentId]?.trim()) {
      alert('답글을 입력해주세요.');
      return;
    }

    postReplyMutation.mutate(
      { parentCommentId, content: replyContent[parentCommentId] },
      {
        onSuccess: () => {
          setReplyContent((prev) => ({ ...prev, [parentCommentId]: '' }));
          setActiveReply(null);
        },
      },
    );
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>담당자 Q&A</h1>
      <div className={styles.divider}></div>

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

      {commentsQuery.isLoading && <p>댓글을 불러오는 중...</p>}
      {commentsQuery.error && <p>댓글을 불러오는 중 오류 발생</p>}

      {commentsQuery.data?.content.length === 0 ? (
        <div className={styles.nocomments}>아직 댓글이 달리지 않았습니다.</div>
      ) : (
        commentsQuery.data?.content.map((comment: Comment) => (
          <div
            key={comment.commentId}
            className={styles.qnaItem}>
            <div className={styles.profile}>
              <img
                src={comment.profileImageUrl}
                alt='프로필'
                className={styles.profileIcon}
                onError={imageErrorHandler}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.header}>
                <div className={styles.headerLeft}>
                  <span className={styles.id}>{comment.writerName}</span>
                  <span className={styles.date}>{comment.createdDate}</span>
                </div>
                {userId === comment.writerId && (
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteComment(comment.commentId)}>
                    삭제하기
                  </button>
                )}
              </div>
              <p className={styles.question}>{comment.content}</p>
              <div className={styles.actions}>
                <button
                  className={styles.actionButton}
                  onClick={() => setActiveReply(comment.commentId)}>
                  답글쓰기
                </button>
              </div>
              {activeReply === comment.commentId && (
                <div className={styles.replyInputContainer}>
                  <textarea
                    className={styles.textArea}
                    placeholder='답글을 입력하세요...'
                    value={replyContent[comment.commentId] || ''}
                    onChange={(e) => handleReplyChange(comment.commentId, e)}
                  />
                  <button
                    className={styles.submitButton}
                    onClick={() => handleReplySubmit(comment.commentId)}
                    disabled={postReplyMutation.isPending}>
                    {postReplyMutation.isPending ? '등록 중...' : '등록'}
                  </button>
                </div>
              )}
              {comment.childComments.length > 0 && (
                <div className={styles.childComments}>
                  {comment.childComments.map((child) => (
                    <div
                      key={child.commentId}
                      className={styles.qnaItemReply}>
                      <div className={styles.profile}>
                        <img
                          src={child.profileImageUrl}
                          alt='프로필'
                          className={styles.profileIcon}
                          onError={imageErrorHandler}
                        />
                      </div>
                      <div className={styles.content}>
                        <div className={styles.header}>
                          <div>
                            <span className={styles.id}>
                              {child.writerName}
                            </span>
                            <span className={styles.date}>
                              {child.createdDate}
                            </span>
                          </div>
                          {userId === child.writerId && (
                            <button
                              className={styles.deleteButton}
                              onClick={() =>
                                handleDeleteComment(child.commentId)
                              }>
                              삭제하기
                            </button>
                          )}
                        </div>
                        <p className={styles.question}>{child.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))
      )}
      {commentsQuery.data && commentsQuery.data.content.length > 0 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 0}>
            이전 페이지
          </button>
          <span>{currentPage + 1} 페이지</span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={!commentsQuery.data?.hasNext}>
            다음 페이지
          </button>
        </div>
      )}
    </div>
  );
};

export default QnASection;
