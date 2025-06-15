import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status } = body

    const updatedRequest = await prisma.inHouseTrainingRequest.update({
      where: { id: params.id },
      data: { status }
    })

    return NextResponse.json(updatedRequest)
  } catch (error) {
    console.error("Error updating in-house training request:", error)
    return NextResponse.json(
      { error: "Failed to update in-house training request" },
      { status: 500 }
    )
  }
} 