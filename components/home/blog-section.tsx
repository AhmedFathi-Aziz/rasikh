'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/components/language-provider';

export default function BlogSection() {
  const [posts, setPosts] = useState<any[]>([]);
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  if (!posts.length) return null;

  // Helper to format date as "21 May 2023"
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    const year = date.getFullYear();
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = months[date.getMonth()];
    return `${day} ${month} ${year}`;
  };

  return (
    <section className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-8">
        {isEnglish ? 'Latest Blog Posts' : 'أحدث المقالات'}
      </h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {posts.map((post) => (
          <Card key={post.id} className="p-0 rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col h-full">
            <img
              src={post.image || '/images/rasikh-logo.png'}
              alt={isEnglish ? post.title_en : post.title_ar}
              className="w-full h-56 object-cover rounded-t-2xl"
            />
            <div className={`p-4 flex flex-col flex-1 ${isEnglish ? 'text-left' : 'text-right'}`} dir={isEnglish ? 'ltr' : 'rtl'}>
              <div className="text-gray-500 text-sm mb-2">
                {formatDate(post.publishedAt)}
              </div>
              <div className="font-bold text-lg mb-1 line-clamp-2">
                {isEnglish ? post.title_en : post.title_ar}
              </div>
              <div className="text-gray-500 text-sm mb-1">
                {post.author?.name}
              </div>
              <div className="text-gray-400 text-xs">
                {isEnglish ? post.category_en : post.category_ar}
              </div>
              <div className="flex items-center justify-between mt-2">
                <div />
                <Link href={`/blog/${post.id}`}>
                  <button className="px-4 py-1 rounded bg-primary text-white hover:bg-primary/90 transition text-sm">
                    {isEnglish ? 'View Details' : 'عرض التفاصيل'}
                  </button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link
          href="/blog"
          className="inline-block px-6 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
        >
          {isEnglish ? 'View All Blogs' : 'عرض كل المقالات'}
        </Link>
      </div>
    </section>
  );
}
