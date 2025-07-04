import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOG_PATH = path.join(process.cwd(), 'data', 'blog.json');

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = fs.readFileSync(BLOG_PATH, 'utf-8');
    const posts = JSON.parse(data);
    const newId = posts.length > 0 ? Math.max(...posts.map((p: any) => p.id)) + 1 : 1;
    const newPost = {
      id: newId,
      title_ar: body.title_ar,
      title_en: body.title_en,
      content_ar: body.content_ar,
      content_en: body.content_en,
      image: body.image,
      author: {
        name: body.author_name,
        bio: body.author_bio,
      },
      publishedAt: new Date().toISOString(),
    };
    posts.unshift(newPost);
    fs.writeFileSync(BLOG_PATH, JSON.stringify(posts, null, 2), 'utf-8');
    return NextResponse.json({ success: true, post: newPost });
  } catch (e) {
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const data = fs.readFileSync(BLOG_PATH, 'utf-8');
    let posts = JSON.parse(data);
    const idx = posts.findIndex((p: any) => p.id === body.id);
    if (idx === -1) {
      return NextResponse.json({ success: false, error: 'المقال غير موجود' }, { status: 404 });
    }
    posts[idx] = {
      ...posts[idx],
      title_ar: body.title_ar,
      title_en: body.title_en,
      content_ar: body.content_ar,
      content_en: body.content_en,
      image: body.image,
      author: {
        name: body.author_name,
        bio: body.author_bio,
      },
      // لا نغير publishedAt
    };
    fs.writeFileSync(BLOG_PATH, JSON.stringify(posts, null, 2), 'utf-8');
    return NextResponse.json({ success: true, post: posts[idx] });
  } catch (e) {
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const data = fs.readFileSync(BLOG_PATH, 'utf-8');
    const posts = JSON.parse(data);
    return NextResponse.json(posts);
  } catch (e) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const data = fs.readFileSync(BLOG_PATH, 'utf-8');
    let posts = JSON.parse(data);
    posts = posts.filter((p: any) => p.id !== body.id);
    fs.writeFileSync(BLOG_PATH, JSON.stringify(posts, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
} 