type LabelType = "accept" | "reject" | "corporate" | "corporatePublic" | "personal" | "selfOffer" | "purchaseCompleted";

export const isValidLabelType = (type: string): type is LabelType => {
  return ["accept", "reject", "corporate", "corporatePublic", "personal", "selfOffer", "purchaseCompleted"].includes(type);
};
