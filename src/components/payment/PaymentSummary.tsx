import { useState } from 'react';
import styles from './paymentSummary.module.scss';
import EllipseGray from '../../assets/icons/ellipseGray.svg?react';
import EllipseBlue from '../../assets/icons/ellipseBlue.svg?react';
import CheckLightIcon from '../../assets/icons/checkLight.svg?react';
import CheckLightGray from '../../assets/icons/checkLightGray.svg?react';
import CheckLightBlue from '../../assets/icons/checkLightBlue.svg?react';

interface PaymentSummaryProps {
  price: number;
}

const PaymentSummary = ({ price }: PaymentSummaryProps) => {
  const fee = Math.round(price * 0.05); // 주문 금액의 5% 수수료
  const totalAmount = price + fee;

  const [isAllAgreed, setIsAllAgreed] = useState(false);

  const AGREEMENT_ITEMS = [
    {
      id: 'terms',
      label: '‘BrainPIX’ 서비스 이용약관 동의 (필수)',
      agreed: false,
    },
    {
      id: 'privacy',
      label: '개인정보 수집 및 이용 동의 (필수)',
      agreed: false,
    },
    {
      id: 'thirdParty',
      label: '개인정보 제3자 제공 동의 (필수)',
      agreed: false,
    },
  ];

  const [agreements, setAgreements] = useState(AGREEMENT_ITEMS);

  const handleAllAgree = () => {
    const newState = !isAllAgreed;
    setIsAllAgreed(newState);
    setAgreements(agreements.map((item) => ({ ...item, agreed: newState })));
  };

  const handleAgreementClick = (id: string) => {
    const updatedAgreements = agreements.map((item) =>
      item.id === id ? { ...item, agreed: !item.agreed } : item,
    );
    setAgreements(updatedAgreements);
    setIsAllAgreed(updatedAgreements.every((item) => item.agreed));
  };

  return (
    <div className={styles.paymentSummary}>
      <div className={styles.title}>결제 금액</div>
      <div className={styles.summaryBox}>
        <div className={styles.row}>
          <div className={styles.label}>주문 금액</div>
          <div className={styles.value}>{price.toLocaleString()}원</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>수수료</div>
          <div className={styles.value}>{fee.toLocaleString()}원</div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.row}>
          <div className={styles.totalLabel}>
            총 결제 금액 <span className={styles.highlight}>(VAT 포함)</span>
          </div>
          <div className={styles.totalValue}>
            {totalAmount.toLocaleString()}원
          </div>
        </div>
      </div>

      <div className={styles.agreementBox}>
        <div
          className={styles.agreementTitle}
          onClick={handleAllAgree}>
          <CheckLightIcon className={styles.checkIcon} />
          <EllipseBlue
            className={styles.checkBackground}
            style={{
              display: isAllAgreed ? 'block' : 'none',
            }}
          />
          <EllipseGray
            className={styles.checkBackground}
            style={{
              display: !isAllAgreed ? 'block' : 'none',
            }}
          />
          아래 약관에 전체 동의해요
        </div>

        {agreements.map((item) => (
          <div
            key={item.id}
            className={styles.agreementRow}
            onClick={() => handleAgreementClick(item.id)}>
            {item.agreed ? (
              <CheckLightBlue className={styles.checkIcon} />
            ) : (
              <CheckLightGray className={styles.checkIcon} />
            )}
            <span className={styles.agreementLabel}>{item.label}</span>
            <span className={styles.details}>자세히</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSummary;
