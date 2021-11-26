
export enum SubscriptionsMembership {
  BASIC = 'Basic',
  PREMIUM = 'Premium',
  GOLD = 'Gold',
}
export const SubscriptionMembershipLabel = new Map<string, string>([
  [SubscriptionsMembership.BASIC, 'BASIC'],
  [SubscriptionsMembership.PREMIUM, 'PREMIUM'],
  [SubscriptionsMembership.GOLD, 'G0LD'],
]);

export const SubscriptionMembershipEnum = new Map<string, SubscriptionsMembership>([
  [ 'BASIC' ,  SubscriptionsMembership.BASIC   ],
  [ 'PREMIUM' ,SubscriptionsMembership.PREMIUM ],
  [ 'G0LD'  ,  SubscriptionsMembership.GOLD    ],
]);

