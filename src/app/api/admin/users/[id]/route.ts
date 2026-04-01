import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      ...(body.role && { role: body.role }),
    },
    select: { id: true, name: true, email: true, phone: true, role: true },
  });

  return NextResponse.json({ user });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.user.delete({ where: { id: parseInt(id) } });
  return NextResponse.json({ ok: true });
}
