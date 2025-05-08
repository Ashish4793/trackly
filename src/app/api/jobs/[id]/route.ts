import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET job by ID
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: { id },
  });

  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }

  return NextResponse.json(job);
}

// UPDATE job by ID
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updatedJob = await prisma.job.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(updatedJob);
}

// DELETE job by ID
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.job.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Deleted' });
}
