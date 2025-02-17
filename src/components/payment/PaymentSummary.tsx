import { useState, useEffect } from 'react';
import styles from './paymentSummary.module.scss';
import { kakaoPayReady } from '../../apis/kakaoAPI';
import { useParams } from 'react-router-dom';

import EllipseGray from '../../assets/icons/ellipseGray.svg?react';
import EllipseBlue from '../../assets/icons/ellipseBlue.svg?react';
import CheckLightIcon from '../../assets/icons/checkLight.svg?react';
import CheckLightGray from '../../assets/icons/checkLightGray.svg?react';
import CheckLightBlue from '../../assets/icons/checkLightBlue.svg?react';

interface PaymentSummaryProps {
  price: number;
  quantity: number;
  ideaId: number;
  sellerId: number;
}

const PaymentSummary = ({ price, quantity, sellerId }: PaymentSummaryProps) => {
  const { ideaId } = useParams<{ ideaId: string }>();
  const ideaIdNumber = ideaId ? Number(ideaId) : 0;

  const [totalPrice, setTotalPrice] = useState(price * quantity);
  const vat = Math.round(totalPrice * 0.05);
  const totalAmount = totalPrice + vat;

  useEffect(() => {
    setTotalPrice(price * quantity);
  }, [price, quantity, ideaId, ideaIdNumber]);

  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isAllAgreed, setIsAllAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleButtonClick = (method: string) => {
    setSelectedMethod(method);
  };

  const isPaymentActive = isAllAgreed && selectedMethod === '카카오페이';

  const handlePaymentClick = async () => {
    setIsLoading(true);
    try {
      const response = await kakaoPayReady({
        ideaId: Number(ideaId),
        sellerId,
        quantity,
        totalPrice: totalAmount,
        vat,
      });

      if (!response) {
        return;
      }

      const { nextRedirectPcUrl, orderId } = response;

      sessionStorage.setItem('orderId', orderId);
      window.location.href = nextRedirectPcUrl;
    } catch {
      throw Error;
    }
  };

  return (
    <>
      <div className={styles.paymentMethods}>
        <div className={styles.title}>결제 수단</div>
        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button} ${
              selectedMethod === '카카오페이' ? styles.selected : ''
            }`}
            onClick={() => handleButtonClick('카카오페이')}>
            카카오페이
          </button>
          <button
            className={`${styles.button} ${
              selectedMethod === '휴대폰 결제' ? styles.selected : ''
            }`}
            onClick={() => handleButtonClick('휴대폰 결제')}>
            휴대폰 결제
          </button>
          <button
            className={`${styles.button} ${
              selectedMethod === '계좌이체' ? styles.selected : ''
            }`}
            onClick={() => handleButtonClick('계좌이체')}>
            계좌이체
          </button>
        </div>
      </div>

      <div className={styles.paymentSummary}>
        <div className={styles.title}>결제 금액</div>
        <div className={styles.summaryBox}>
          <div className={styles.row}>
            <div className={styles.label}>주문 금액</div>
            <div className={styles.value}>{totalPrice.toLocaleString()}원</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>수수료</div>
            <div className={styles.value}>{vat.toLocaleString()}원</div>
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
              style={{ display: isAllAgreed ? 'block' : 'none' }}
            />
            <EllipseGray
              className={styles.checkBackground}
              style={{ display: !isAllAgreed ? 'block' : 'none' }}
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

        <button
          className={`${styles.paymentButton} ${
            isPaymentActive ? styles.active : styles.disabled
          }`}
          onClick={handlePaymentClick}
          disabled={!isPaymentActive || isLoading}>
          {isLoading ? '결제 요청 중...' : '결제하기'}
        </button>
      </div>
    </>
  );
};

export default PaymentSummary;
