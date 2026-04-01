import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const { id } = await params;
  const reservationId = parseInt(id);

  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
  });

  if (!reservation) {
    return NextResponse.json({ error: '예약을 찾을 수 없습니다.' }, { status: 404 });
  }

  if (reservation.userId !== session.userId) {
    return NextResponse.json({ error: '권한이 없습니다.' }, { status: 403 });
  }

  await prisma.reservation.delete({ where: { id: reservationId } });

  return NextResponse.json({ ok: true });
}
