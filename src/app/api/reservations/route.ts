import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const month = request.nextUrl.searchParams.get('month');

  const where: Record<string, unknown> = { userId: session.userId };
  if (month) {
    where.date = { startsWith: month };
  }

  const reservations = await prisma.reservation.findMany({
    where,
    orderBy: [{ date: 'desc' }, { startTime: 'desc' }],
    include: { user: { select: { name: true, phone: true } } },
  });

  return NextResponse.json({ reservations });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });
  }

  const { type, date, startTime, endTime, notes } = await request.json();

  if (!type || !date || !startTime) {
    return NextResponse.json({ error: '필수 정보를 입력해주세요.' }, { status: 400 });
  }

  if (!['visit', 'overnight', 'outing'].includes(type)) {
    return NextResponse.json({ error: '올바른 예약 유형을 선택해주세요.' }, { status: 400 });
  }

  // Visit type: validate against time slots and check capacity
  if (type === 'visit') {
    const slot = await prisma.timeSlot.findFirst({
      where: { time: startTime, isActive: true },
    });
    if (!slot) {
      return NextResponse.json({ error: '유효하지 않은 면회 시간입니다.' }, { status: 400 });
    }

    const count = await prisma.reservation.count({
      where: {
        date,
        startTime,
        type: 'visit',
        status: { in: ['pending', 'approved'] },
      },
    });

    if (count >= slot.maxCount) {
      return NextResponse.json({ error: '해당 시간대는 이미 마감되었습니다.' }, { status: 409 });
    }
  }

  // Check duplicate booking
  const duplicate = await prisma.reservation.findFirst({
    where: {
      userId: session.userId,
      date,
      startTime,
      type,
      status: { in: ['pending', 'approved'] },
    },
  });

  if (duplicate) {
    return NextResponse.json({ error: '이미 동일한 예약이 존재합니다.' }, { status: 409 });
  }

  const reservation = await prisma.reservation.create({
    data: {
      userId: session.userId,
      type,
      date,
      startTime,
      endTime: endTime || null,
      notes: notes || null,
    },
  });

  return NextResponse.json({ reservation }, { status: 201 });
}
