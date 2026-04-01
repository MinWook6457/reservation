import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), 'yyyy년 M월 d일 (EEE)', { locale: ko });
}

export function formatTime(timeStr: string): string {
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h);
  const period = hour < 12 ? '오전' : '오후';
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${period} ${displayHour}:${m}`;
}

export function toDateString(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}
