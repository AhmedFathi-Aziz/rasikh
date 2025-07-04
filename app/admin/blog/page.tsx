"use client"

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/components/language-provider';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number|null>(null);
  const [form, setForm] = useState({
    title_ar: '',
    title_en: '',
    content_ar: '',
    content_en: '',
    image: '',
    author_name: '',
    author_bio: '',
  });
  const { language, t } = useLanguage();
  const isEnglish = language === 'en';

  useEffect(() => {
    fetch('/api/blog')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = (post: any) => {
    setForm({
      title_ar: post.title_ar,
      title_en: post.title_en,
      content_ar: post.content_ar,
      content_en: post.content_en,
      image: post.image,
      author_name: post.author?.name || '',
      author_bio: post.author?.bio || '',
    });
    setEditId(post.id);
    setOpen(true);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch('/api/blog', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, id: editId }),
    });
    setLoading(false);
    if (res.ok) {
      setForm({ title_ar: '', title_en: '', content_ar: '', content_en: '', image: '', author_name: '', author_bio: '' });
      setOpen(false);
      setEditId(null);
      // إعادة تحميل المقالات بعد الإضافة أو التعديل
      fetch('/api/blog')
        .then(res => res.json())
        .then(data => setPosts(data));
    } else {
      alert('حدث خطأ أثناء الحفظ');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال؟')) return;
    const res = await fetch('/api/blog', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      fetch('/api/blog')
        .then(res => res.json())
        .then(data => setPosts(data));
    } else {
      alert('حدث خطأ أثناء الحذف');
    }
  };

  return (
    <div className={`p-6 ${isEnglish ? 'text-left' : 'text-right'}`} dir={isEnglish ? 'ltr' : 'rtl'}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{isEnglish ? 'Manage Blog Posts' : 'إدارة المقالات'}</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setEditId(null); setForm({ title_ar: '', title_en: '', content_ar: '', content_en: '', image: '', author_name: '', author_bio: '' }); } }}>
          <DialogTrigger asChild>
            <Button onClick={() => { setOpen(true); setEditId(null); setForm({ title_ar: '', title_en: '', content_ar: '', content_en: '', image: '', author_name: '', author_bio: '' }); }}>{isEnglish ? 'Add New Article' : 'إضافة مقال جديد'}</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto max-w-3xl">
            <DialogHeader>
              <DialogTitle>{editId ? (isEnglish ? 'Edit Article' : 'تعديل مقال') : (isEnglish ? 'Add New Article' : 'إضافة مقال جديد')}</DialogTitle>
            </DialogHeader>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <Input name="title_ar" placeholder={isEnglish ? 'Title (Arabic)' : 'العنوان بالعربية'} value={form.title_ar} onChange={handleChange} />
              <Input name="title_en" placeholder={isEnglish ? 'Title (English)' : 'العنوان بالإنجليزية'} value={form.title_en} onChange={handleChange} />
              <Textarea name="content_ar" placeholder={isEnglish ? 'Content (Arabic)' : 'المحتوى بالعربية (يمكنك إدراج رابط صورة أو وسم <img src=\'...\' /> في منتصف النص)'} value={form.content_ar} onChange={handleChange} rows={5} />
              <Textarea name="content_en" placeholder={isEnglish ? 'Content (English)' : 'المحتوى بالإنجليزية (يمكنك إدراج رابط صورة أو وسم <img src=\'...\' /> في منتصف النص)'} value={form.content_en} onChange={handleChange} rows={5} />
              <Input name="image" placeholder={isEnglish ? 'Main Image URL' : 'رابط الصورة الرئيسية'} value={form.image} onChange={handleChange} />
              <Input name="author_name" placeholder={isEnglish ? 'Author Name' : 'اسم الناشر'} value={form.author_name} onChange={handleChange} />
              <Textarea name="author_bio" placeholder={isEnglish ? 'Author Bio' : 'نبذة عن الناشر'} value={form.author_bio} onChange={handleChange} rows={2} />
              <div className="text-xs text-gray-500">{isEnglish ? 'You can embed an image in the article by placing a direct image link or <img src=\'...\' /> tag in the text.' : 'يمكنك إدراج صورة في منتصف المقال بوضع رابط صورة مباشر أو وسم <code>&lt;img src=\'...\' /&gt;</code> في النص.'}</div>
              <DialogFooter>
                <Button type="submit" disabled={loading}>{loading ? (isEnglish ? 'Saving...' : 'جاري الحفظ...') : editId ? (isEnglish ? 'Save Changes' : 'حفظ التعديلات') : (isEnglish ? 'Save' : 'حفظ')}</Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline">{isEnglish ? 'Cancel' : 'إلغاء'}</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <Card key={post.id} className="p-4 flex flex-col gap-2">
            <img src={post.image} alt={isEnglish ? post.title_en : post.title_ar} className="rounded h-40 object-cover mb-2" />
            <h2 className="font-semibold text-lg">{isEnglish ? post.title_en : post.title_ar}</h2>
            <div className="text-sm text-gray-500">{post.author?.name}</div>
            <div className="text-xs text-gray-400">{formatDate(post.publishedAt, isEnglish)}</div>
            <p className="line-clamp-3 text-sm">{isEnglish ? post.content_en : post.content_ar}</p>
            <Button variant="outline" className="mt-2" onClick={() => handleEdit(post)}>{isEnglish ? 'Edit' : 'تعديل'}</Button>
            <Button className="mt-2 bg-black text-white hover:bg-gray-900" onClick={() => handleDelete(post.id)}>{isEnglish ? 'Delete' : 'حذف'}</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Helper to format date as "21 May 2023" in both languages
function formatDate(dateStr: string, isEnglish: boolean) {
  const date = new Date(dateStr);
  const day = date.getDate();
  const year = date.getFullYear();
  const monthsEn = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const monthsAr = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];
  const month = isEnglish ? monthsEn[date.getMonth()] : monthsAr[date.getMonth()];
  return `${day} ${month} ${year}`;
} 