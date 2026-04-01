import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const reservation = await prisma.reservation.update({
    where: { id: parseInt(id) },
    data: {
      ...(body.status && { status: body.status }),
      ...(body.notes !== undefined && { notes: body.notes }),
    },
    include: { user: { select: { name: true, phone: true, email: true } } },
  });

  return NextResponse.json({ reservation });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.reservation.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ ok: true });
}
