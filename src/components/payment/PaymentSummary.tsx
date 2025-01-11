import React, { useState } from 'react';
import styles from './PaymentSummary.module.scss';

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
          <button
            type='button'
            className={`${styles.checkButton} ${
              isAllAgreed ? styles.active : styles.default
            }`}>
            <svg
              className={styles.checkIcon}
              width='24'
              height='24'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <circle
                cx='12'
                cy='12'
                r='12'
                className={styles.circle}
              />
              {isAllAgreed && (
                <path
                  d='M8 12l2 2 4-4'
                  className={styles.check}
                />
              )}
            </svg>
          </button>
          아래 약관에 전체 동의해요
        </div>

        {[
          '‘BrainPIX’ 서비스 이용약관 동의 (필수)',
          '개인정보 수집 및 이용 동의 (필수)',
          '개인정보 제3자 제공 동의 (필수)',
        ].map((label: string, index: number) => (
          <div
            key={index}
            className={styles.agreementRow}>
            <button
              type='button'
              className={`${styles.checkButton} ${
                agreements[index] ? styles.active : styles.default
              }`}
              onClick={() => handleAgreementClick(index)}>
              <svg
                className={styles.checkIcon}
                width='24'
                height='24'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <circle
                  cx='12'
                  cy='12'
                  r='12'
                  className={styles.circle}
                />
                {agreements[index] && (
                  <path
                    d='M8 12l2 2 4-4'
                    className={styles.check}
                  />
                )}
              </svg>
            </button>
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
