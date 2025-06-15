import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn'],
});

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export async function GET() {
  try {
    const courses = await prisma.course.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(courses);
  } catch (error) {
    console.error('GET /api/courses error:', error);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { titleAr, titleEn, descriptionAr, descriptionEn, durationAr, durationEn, level, category, image, topicsAr, topicsEn } = await request.json()
    if (!titleAr || !titleEn || !descriptionAr || !descriptionEn || !durationAr || !durationEn) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    const course = await prisma.course.create({
      data: {
        titleAr,
        titleEn,
        descriptionAr,
        descriptionEn,
        durationAr,
        durationEn,
        level,
        category,
        image,
        topicsAr: topicsAr || [],
        topicsEn: topicsEn || []
      }
    })
    return NextResponse.json(course)
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json({ error: "Failed to add course" }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    await prisma.course.deleteMany()
    return NextResponse.json({ message: "All courses deleted successfully" })
  } catch (error) {
    console.error("Error deleting courses:", error)
    return NextResponse.json({ error: "Failed to delete courses" }, { status: 500 })
  }
} 