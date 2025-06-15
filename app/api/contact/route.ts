import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { firstName, lastName, email, subject = '', message } = data;
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    const name = `${firstName} ${lastName}`.trim();
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save message.' }, { status: 500 });
  }
} 