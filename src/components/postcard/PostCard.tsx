// import { useNavigate } from 'react-router-dom';
// import styles from './PostCard.module.scss';
// import classNames from 'classnames';
// import { Post } from '../../types/postDataType';
// import PostDefaultImage from '../../assets/images/postCardImage.png';
// import Label from '../common/label/Label';

// export const PostCard = ({
//   postId,
//   category,
//   user,
//   profileImage,
//   title,
//   postImage,
//   price,
//   deadline,
//   current,
//   total,
//   saveCount,
//   viewCount,
// }: Post) => {
//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     let categoryPath = '';
//     if (category === '아이디어 마켓') categoryPath = 'idea-market';
//     else if (category === '요청 과제') categoryPath = 'request-assign';
//     else if (category === '협업 광장') categoryPath = 'collaboration';

//     if (categoryPath) {
//       navigate(`/my/posts/${categoryPath}/${postId}`);
//     }
//   };
//   return (
//     <div
//       className={classNames(styles.postCard, styles[category])}
//       onClick={handleCardClick}>
//       {/* 공통 요소 : 게시물 이미지, 프로필 */}
//       <div className={styles.postHeader}>
//         <img
//           src={postImage || PostDefaultImage}
//           alt='게시물 사진'
//           className={styles.postImage}
//         />
//         <div className={styles.InfoOnPostImage}>
//           <Label
//             text='기업 공개'
//             type='corporatePublic'
//           />
//           <span>{fieldOfPost}</span>
//           <p className={styles.title}>{title}</p>
//         </div>
//       </div>

//       {/* 게시글 이미지 아래 게시글 정보(프로필 사진, 이름, 가격, 저장, 조회) */}
//       <div className={styles.postContent}>
//         {/* 공통 요소: 유저 프로필 */}
//         <div className={styles.userInfo}>
//           {profileImage ? (
//             <img
//               src={profileImage}
//               alt='프로필 사진'
//               className={styles.profileImage}
//             />
//           ) : (
//             <div className={styles.profileImage} />
//           )}
//           <span className={styles.username}>{user}</span>
//         </div>

//         {/* 카테고리별 조건부 렌더링 */}
//         {category === PostCategories.IDEA_MARKET && (
//           <>
//             {price && <div className={styles.price}>{price} 원</div>}
//             <p>
//               저장 {viewCount} • 조회 {saveCount}
//             </p>
//           </>
//         )}

//         {category === PostCategories.REQUEST_ASSIGN && (
//           <>
//             {deadline && <p className={styles.deadline}>D-{deadline}</p>}
//             <p>
//               저장 {viewCount} • 조회 {saveCount}
//             </p>
//           </>
//         )}

//         {category === PostCategories.COLLABORATION && (
//           <>
//             {deadline && <p className={styles.deadline}>D-{deadline}</p>}
//             {current && total && (
//               <>
//                 <p className={styles.memberInfo}>
//                   {current}/{total} 명 모집
//                 </p>
//                 <p className={styles.memberInfo}>
//                   저장 {saveCount} · 조회 {viewCount}
//                 </p>
//               </>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };
