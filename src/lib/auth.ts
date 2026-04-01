import { cookies } from 'next/headers';
import crypto from 'crypto';
import { SessionPayload, UserRole } from '@/types';
import { SESSION_COOKIE_NAME, SESSION_EXPIRY_HOURS } from './constants';

const SECRET = process.env.SESSION_SECRET || 'fallback-secret';

function sign(payload: string): string {
  const hmac = crypto.createHmac('sha256', SECRET);
  hmac.update(payload);
  return hmac.digest('base64url');
}

function encode(data: SessionPayload): string {
  const json = JSON.stringify(data);
  const payload = Buffer.from(json).toString('base64url');
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function decode(token: string): SessionPayload | null {
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  if (sign(payload) !== signature) return null;

  try {
    const json = Buffer.from(payload, 'base64url').toString();
    const data = JSON.parse(json) as SessionPayload;
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export async function createSession(userId: number, role: UserRole) {
  const exp = Date.now() + SESSION_EXPIRY_HOURS * 60 * 60 * 1000;
  const token = encode({ userId, role, exp });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_EXPIRY_HOURS * 60 * 60,
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return decode(token);
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
