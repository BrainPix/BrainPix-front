type LabelType = 'corporate' | 'corporatePublic' | 'personal' | 'selfOffer';

export const formatToLabelText = (labelText: LabelType) => {
  switch (labelText) {
    case 'corporate':
      return '기업';
    case 'corporatePublic':
      return '기업 공개';
    case 'personal':
      return '개인';
  }
};
