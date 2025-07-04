'use client'
import { useEffect, useState } from 'react';
import { useLanguage } from '@/components/language-provider';
import { useParams } from 'next/navigation';

export default function BlogDetails() {
  const { language } = useLanguage();
  const isEnglish = language === 'en';
  const params = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => setPost(data.find((p: any) => p.id == params.id)));
  }, [params.id]);

  if (!post) return <div className="text-center py-16 text-gray-400">المقال غير موجود</div>;

  // date format
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
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* صورة المقال مع overlay والعنوان */}
      <div className="relative mx-auto w-full max-w-3xl h-64 md:h-80 lg:h-96 rounded-xl overflow-hidden mt-8">
        <img
          src={post.image || '/images/rasikh-logo.png'}
          alt={isEnglish ? post.title_en : post.title_ar}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* تفاصيل المقال */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 -mt-12 relative z-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">
          {isEnglish ? post.title_en : post.title_ar}
        </h1>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
          <div className="text-gray-600 text-sm">{post.author?.name}</div>
          <div className="text-gray-400 text-xs">{formatDate(post.publishedAt)}</div>
        </div>
        <div
          className={`prose prose-xl max-w-none mb-8 prose-img:rounded-xl prose-img:mx-auto prose-p:leading-relaxed prose-p:my-6 ${isEnglish ? 'text-left' : 'text-right'}`}
          dir={isEnglish ? 'ltr' : 'rtl'}
        >
          <div dangerouslySetInnerHTML={{ __html: isEnglish ? post.content_en : post.content_ar }} />
        </div>
      </div>
    </div>
  );
} 