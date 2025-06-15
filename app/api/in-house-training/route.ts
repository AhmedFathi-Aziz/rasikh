import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      courseName,
      companyName,
      numberOfDays,
      numberOfTrainees,
      preferredLanguage,
      firstName,
      lastName,
      jobTitle,
      email,
      phone,
      countryCode,
    } = body;

    const trainingRequest = await prisma.inHouseTrainingRequest.create({
      data: {
        courseName,
        companyName,
        numberOfDays: parseInt(numberOfDays),
        numberOfTrainees: parseInt(numberOfTrainees),
        preferredLanguage,
        firstName,
        lastName,
        jobTitle,
        email,
        phone,
        countryCode,
      },
    });

    return NextResponse.json(trainingRequest);
  } catch (error) {
    console.error("Error creating in-house training request:", error);
    return NextResponse.json(
      { error: "Failed to create in-house training request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const requests = await prisma.inHouseTrainingRequest.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error fetching in-house training requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch in-house training requests" },
      { status: 500 }
    );
  }
} 