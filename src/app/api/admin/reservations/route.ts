import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const status = searchParams.get('status');
  const date = searchParams.get('date');
  const type = searchParams.get('type');

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (date) where.date = date;
  if (type) where.type = type;

  const reservations = await prisma.reservation.findMany({
    where,
    orderBy: [{ date: 'desc' }, { startTime: 'desc' }],
    include: { user: { select: { id: true, name: true, phone: true, email: true } } },
  });

  return NextResponse.json({ reservations });
}
