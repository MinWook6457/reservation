export type UserRole = 'user' | 'admin';
export type ReservationType = 'visit' | 'overnight' | 'outing';
export type ReservationStatus = 'pending' | 'approved' | 'rejected';

export interface SessionPayload {
  userId: number;
  role: UserRole;
  exp: number;
}

export const RESERVATION_TYPE_LABELS: Record<ReservationType, string> = {
  visit: '면회',
  overnight: '외박',
  outing: '외출',
};

export const RESERVATION_STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: '대기',
  approved: '승인',
  rejected: '거절',
};
