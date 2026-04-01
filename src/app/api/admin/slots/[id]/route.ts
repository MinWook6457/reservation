import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const slot = await prisma.timeSlot.update({
    where: { id: parseInt(id) },
    data: {
      ...(body.time && { time: body.time }),
      ...(body.label && { label: body.label }),
      ...(body.maxCount !== undefined && { maxCount: body.maxCount }),
      ...(body.isActive !== undefined && { isActive: body.isActive }),
    },
  });

  return NextResponse.json({ slot });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.timeSlot.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ ok: true });
}
