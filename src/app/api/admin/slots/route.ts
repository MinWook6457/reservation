import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const slots = await prisma.timeSlot.findMany({ orderBy: { time: 'asc' } });
  return NextResponse.json({ slots });
}

export async function POST(request: NextRequest) {
  const { time, label, maxCount } = await request.json();

  if (!time || !label) {
    return NextResponse.json({ error: '시간과 라벨을 입력해주세요.' }, { status: 400 });
  }

  const slot = await prisma.timeSlot.create({
    data: { time, label, maxCount: maxCount || 5 },
  });

  return NextResponse.json({ slot }, { status: 201 });
}
