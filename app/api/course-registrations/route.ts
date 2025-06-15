import { NextResponse } from "next/server";
import { prisma } from '../../../lib/prisma';

// Fetch data from the courses API endpoint
const fetchData = async () => {
  const response = await fetch('http://localhost:3000/api/courses');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const registration = await prisma.courseRegistration.create({
      data: {
        courseId: data.courseId,
        courseName: data.courseName,
        location: data.location,
        numberOfDays: Number(data.numberOfDays),
        numberOfParticipants: Number(data.numberOfParticipants),
        preferredLanguage: data.preferredLanguage,
        firstName: data.firstName,
        lastName: data.lastName,
        jobTitle: data.jobTitle,
        company: data.company,
        phone: data.phone,
        countryCode: data.countryCode,
        email: data.email,
      }
    });
    return NextResponse.json(registration);
  } catch (error) {
    console.error("Error creating course registration:", error);
    return NextResponse.json({ error: "Failed to create course registration" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const registrations = await prisma.courseRegistration.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(registrations);
  } catch (error) {
    console.error("Error fetching course registrations:", error);
    return NextResponse.json({ error: "Failed to fetch course registrations" }, { status: 500 });
  }
} 