
export enum SubscriptionStatus {
  STARTED = 1,
  COMPLETED = 2,
  FAILED = 3
}

export const SubscriptionStatusLabel = new Map<number, string>([
  [SubscriptionStatus.STARTED, 'STARTED'],
  [SubscriptionStatus.COMPLETED, 'COMPLETED'],
  [SubscriptionStatus.FAILED, 'FAILED'],
]);