export enum SubscriptionType {
  DEPOSIT = 'D',
  WITHDRAW = 'W',
  TRANSFER = 'T'
}

export const SubscriptionTypeLabel = new Map<string, string>([
  [SubscriptionType.DEPOSIT, 'DEPOSIT'],
  [SubscriptionType.WITHDRAW, 'WITHDRAW'],
  [SubscriptionType.TRANSFER, 'TRANSFER'],
]);