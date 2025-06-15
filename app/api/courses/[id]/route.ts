import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function PUT(request, { params }) {
  const id = params.id;
  const data = await request.json();
  try {
    const updated = await prisma.course.update({
      where: { id },
      data,
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const id = params.id;
  try {
    await prisma.course.delete({ where: { id } });
    return NextResponse.json({ message: 'Course deleted' });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
} 