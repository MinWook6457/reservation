export const VISIT_TIME_SLOTS = [
  { time: '11:00', label: '오전 면회 (11:00)' },
  { time: '15:00', label: '오후 면회 1 (15:00)' },
  { time: '16:10', label: '오후 면회 2 (16:10)' },
] as const;

export const DEFAULT_MAX_VISITORS = 5;

export const SESSION_COOKIE_NAME = 'session';
export const SESSION_EXPIRY_HOURS = 24;
