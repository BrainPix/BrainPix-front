/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import styles from './PaymentSummary.module.scss';
import EllipseGray from '../../assets/icons/ellipse_gray.svg';
import EllipseBlue from '../../assets/icons/ellipse_blue.svg';
import EllipseWhite from '../../assets/icons/ellipse_white.svg';
import CheckLightIcon from '../../assets/icons/check-light.svg';
import CheckLightGray from '../../assets/icons/check-light-gray.svg';
import CheckLightBlue from '../../assets/icons/check-light-blue.svg';

const PaymentSummary: React.FC = () => {
  const [isAllAgreed, setIsAllAgreed] = useState(false);
  const [agreements, setAgreements] = useState([false, false, false]);

  const handleAllAgree = () => {
    const newState = !isAllAgreed;
    setIsAllAgreed(newState);
    setAgreements(agreements.map(() => newState));
  };

  const handleAgreementClick = (index: number) => {
    const newAgreements = [...agreements];
    newAgreements[index] = !newAgreements[index];
    setAgreements(newAgreements);
    setIsAllAgreed(newAgreements.every((value) => value));
  };

  return (
    <div className={styles.paymentSummary}>
      <div className={styles.title}>결제 금액</div>
      <div className={styles.summaryBox}>
        <div className={styles.row}>
          <div className={styles.label}>주문 금액</div>
          <div className={styles.value}>2,000,000원</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>수수료</div>
          <div className={styles.value}>10,000원</div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.row}>
          <div className={styles.totalLabel}>
            총 결제 금액 <span className={styles.highlight}>(VAT 포함)</span>
          </div>
          <div className={styles.totalValue}>2,010,000원</div>
        </div>
      </div>

      <div className={styles.agreementBox}>
        <div
          className={styles.agreementTitle}
          onClick={handleAllAgree}>
          <img
            src={CheckLightIcon}
            alt='체크 아이콘'
            className={styles.checkIcon}
          />
          <img
            src={isAllAgreed ? EllipseBlue : EllipseGray}
            alt='전체 동의 체크 배경'
            className={styles.checkBackground}
          />
          아래 약관에 전체 동의해요
        </div>

        {[
          '‘BrainPIX’ 서비스 이용약관 동의 (필수)',
          '개인정보 수집 및 이용 동의 (필수)',
          '개인정보 제3자 제공 동의 (필수)',
        ].map((label, index) => (
          <div
            key={index}
            className={styles.agreementRow}
            onClick={() => handleAgreementClick(index)}>
            <img
              src={EllipseWhite}
              alt='개별 동의 체크 배경'
              className={styles.nonecheckBackground}
              onClick={() => handleAgreementClick(index)}
            />
            <img
              src={agreements[index] ? CheckLightBlue : CheckLightGray}
              alt='체크 아이콘'
              className={styles.checkIcon}
            />
            <span className={styles.agreementLabel}>{label}</span>
            <span
              className={styles.details}
              onClick={() => handleAgreementClick(index)}>
              자세히
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSummary;
