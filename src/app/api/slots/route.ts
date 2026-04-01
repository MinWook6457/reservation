import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date');
  if (!date) {
    return NextResponse.json({ error: '날짜를 지정해주세요.' }, { status: 400 });
  }

  const slots = await prisma.timeSlot.findMany({
    where: { isActive: true },
    orderBy: { time: 'asc' },
  });

  const counts = await prisma.reservation.groupBy({
    by: ['startTime'],
    where: {
      date,
      type: 'visit',
      status: { in: ['pending', 'approved'] },
    },
    _count: { id: true },
  });

  const countMap: Record<string, number> = {};
  for (const c of counts) {
    countMap[c.startTime] = c._count.id;
  }

  const result = slots.map((slot) => ({
    time: slot.time,
    label: slot.label,
    maxCount: slot.maxCount,
    currentCount: countMap[slot.time] || 0,
  }));

  return NextResponse.json({ slots: result });
}
