import { NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const newsFile = path.join(process.cwd(), "data/news.json")

export async function GET() {
  const data = await fs.readFile(newsFile, "utf-8")
  return NextResponse.json(JSON.parse(data))
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const data = await fs.readFile(newsFile, "utf-8")
  const news = JSON.parse(data)
  const newId = news.length ? Math.max(...news.map((n: any) => n.id)) + 1 : 1
  const newItem = { ...body, id: newId }
  news.push(newItem)
  await fs.writeFile(newsFile, JSON.stringify(news, null, 2), "utf-8")
  return NextResponse.json(newItem)
}

export async function PUT(req: NextRequest) {
  const body = await req.json()
  const data = await fs.readFile(newsFile, "utf-8")
  let news = JSON.parse(data)
  news = news.map((n: any) => (n.id === body.id ? { ...n, ...body } : n))
  await fs.writeFile(newsFile, JSON.stringify(news, null, 2), "utf-8")
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const body = await req.json()
  const data = await fs.readFile(newsFile, "utf-8")
  let news = JSON.parse(data)
  news = news.filter((n: any) => n.id !== body.id)
  await fs.writeFile(newsFile, JSON.stringify(news, null, 2), "utf-8")
  return NextResponse.json({ success: true })
} 