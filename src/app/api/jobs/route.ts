import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const jobs = await prisma.job.findMany({ orderBy: { date: 'desc' } });
  return NextResponse.json(jobs);
}

export async function POST(req: Request) {
    const form = await req.formData();

    const jobData: any = {
      company: form.get('company') as string,
      position: form.get('position') as string,
      location: form.get('location') as string,
      date: form.get('date') as string,
      status: form.get('status') as 'Applied' | 'Interview' | 'Rejected' | 'Accepted',
    };
    
    const optionalFields = ['notes', 'salary', 'contact', 'url'] as const;
    
    optionalFields.forEach((field) => {
      const value = form.get(field);
      if (value) {
        jobData[field] = value;
      }
    });
    
    const job = await prisma.job.create({ data: jobData });
    return NextResponse.json(job);
    
  }