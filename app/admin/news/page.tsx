"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER || "admin"
const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || "password"

interface NewsItem {
  id: number
  title_ar: string
  title_en: string
  description_ar: string
  description_en: string
  image: string
  source: string
  sourceUrl: string
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [editing, setEditing] = useState<null | number>(null)
  const [form, setForm] = useState<Partial<NewsItem>>({})
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(localStorage.getItem("admin-auth") === "true")
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/news")
        .then((res) => res.json())
        .then(setNews)
    }
  }, [isAuthenticated])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("admin-auth", "true")
      setIsAuthenticated(true)
      setError(null)
      setUsername("")
      setPassword("")
    } else {
      setError("Invalid username or password")
    }
  }

  const handleEdit = (id: number) => {
    const item = news.find((n) => n.id === id)
    if (item) {
      setEditing(id)
      setForm(item)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm("هل أنت متأكد من حذف هذا الخبر؟")) {
      setLoading(true)
      await fetch("/api/news", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      })
      setNews(news.filter((n) => n.id !== id))
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    if (editing) {
      await fetch("/api/news", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editing })
      })
      setNews(news.map((n) => (n.id === editing ? { ...n, ...form } as NewsItem : n)))
      setEditing(null)
      setForm({})
    } else {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })
      const newItem = await res.json()
      setNews([...news, newItem])
      setForm({})
    }
    setLoading(false)
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-primary/5 to-white dark:from-primary/10 dark:to-card">
        <form onSubmit={handleLogin} className="bg-white dark:bg-card rounded-2xl shadow-xl p-10 border border-border/40 flex flex-col gap-6 min-w-[320px] max-w-xs w-full">
          <h2 className="text-2xl font-bold text-primary text-center mb-2">تسجيل دخول الأدمن</h2>
          <input
            className="input input-bordered rounded-xl px-4 py-3 bg-white dark:bg-card border border-primary/20 focus:border-primary/60 shadow-sm"
            placeholder="اسم المستخدم"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            className="input input-bordered rounded-xl px-4 py-3 bg-white dark:bg-card border border-primary/20 focus:border-primary/60 shadow-sm"
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-center text-sm">{error}</div>}
          <button type="submit" className="btn btn-primary px-8 py-2 rounded-xl font-bold text-lg shadow-md transition hover:scale-105">دخول</button>
        </form>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto py-14 px-4 md:px-0">
      <h1 className="text-4xl font-extrabold text-primary mb-10 text-center tracking-tight">إدارة الأخبار</h1>
      <div className="bg-gradient-to-tr from-primary/5 to-white dark:from-primary/10 dark:to-card rounded-3xl shadow-xl p-10 mb-14 border border-border/40 flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-primary mb-2 text-center">{editing ? "تعديل خبر" : "إضافة خبر جديد"}</h2>
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-primary">العنوان (عربي)</label>
            <input
              className="input input-bordered rounded-xl px-4 py-3 bg-white dark:bg-card border border-primary/20 focus:border-primary/60 shadow-sm"
              name="title_ar"
              placeholder="العنوان بالعربية"
              value={form.title_ar || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-primary">العنوان (إنجليزي)</label>
            <input
              className="input input-bordered rounded-xl px-4 py-3 bg-white dark:bg-card border border-primary/20 focus:border-primary/60 shadow-sm"
              name="title_en"
              placeholder="Title in English"
              value={form.title_en || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-3 md:col-span-2">
            <label className="font-semibold text-primary">الوصف (عربي)</label>
            <textarea
              className="input input-bordered rounded-xl px-4 py-3 min-h-[90px] bg-white dark:bg-card border border-primary/20 focus:border-primary/60 shadow-sm"
              name="description_ar"
              placeholder="الوصف بالعربية"
              value={form.description_ar || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-3 md:col-span-2">
            <label className="font-semibold text-primary">الوصف (إنجليزي)</label>
            <textarea
              className="input input-bordered rounded-xl px-4 py-3 min-h-[90px] bg-white dark:bg-card border border-primary/20 focus:border-primary/60 shadow-sm"
              name="description_en"
              placeholder="Description in English"
              value={form.description_en || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-primary">رابط الصورة</label>
            <input
              className="input input-bordered rounded-xl px-4 py-3 bg-white dark:bg-card border border-primary/20 focus:border-primary/60 shadow-sm"
              name="image"
              placeholder="رابط الصورة"
              value={form.image || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-primary">المصدر</label>
            <input
              className="input input-bordered rounded-xl px-4 py-3 bg-white dark:bg-card border border-primary/20 focus:border-primary/60 shadow-sm"
              name="source"
              placeholder="المصدر"
              value={form.source || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-primary">رابط المصدر</label>
            <input
              className="input input-bordered rounded-xl px-4 py-3 bg-white dark:bg-card border border-primary/20 focus:border-primary/60 shadow-sm"
              name="sourceUrl"
              placeholder="رابط المصدر"
              value={form.sourceUrl || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-end gap-4 md:col-span-2 mt-2">
            <button
              type="submit"
              className="btn btn-primary px-10 py-3 rounded-xl font-bold text-lg shadow-md transition hover:scale-105"
              disabled={loading}
            >
              {editing ? "حفظ التعديلات" : "إضافة الخبر"}
            </button>
            {editing && (
              <button
                type="button"
                className="btn btn-secondary px-8 py-3 rounded-xl font-bold text-lg shadow-md transition hover:scale-105"
                onClick={() => { setEditing(null); setForm({}) }}
                disabled={loading}
              >
                إلغاء
              </button>
            )}
          </div>
        </form>
      </div>
      <div className="bg-gradient-to-tr from-primary/5 to-white dark:from-primary/10 dark:to-card rounded-3xl shadow-xl p-10 border border-border/40">
        <h2 className="text-2xl font-bold text-primary mb-8 text-center">كل الأخبار</h2>
        <div className="overflow-x-auto">
          <table className="w-full border rounded-2xl overflow-hidden bg-white dark:bg-card shadow-md">
            <thead>
              <tr className="bg-primary/10 text-primary text-lg">
                <th className="py-4 px-3">الصورة</th>
                <th className="py-4 px-3">العنوان (عربي)</th>
                <th className="py-4 px-3">العنوان (إنجليزي)</th>
                <th className="py-4 px-3">الوصف (عربي)</th>
                <th className="py-4 px-3">الوصف (إنجليزي)</th>
                <th className="py-4 px-3">المصدر</th>
                <th className="py-4 px-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.id} className="border-b hover:bg-primary/5 transition">
                  <td className="py-3 px-3"><img src={item.image} alt="صورة الخبر" className="w-24 h-16 object-cover rounded-lg border shadow" /></td>
                  <td className="py-3 px-3 font-bold text-primary max-w-xs whitespace-normal">{item.title_ar}</td>
                  <td className="py-3 px-3 font-bold text-primary max-w-xs whitespace-normal">{item.title_en}</td>
                  <td className="py-3 px-3 text-muted-foreground max-w-xs whitespace-normal">{item.description_ar}</td>
                  <td className="py-3 px-3 text-muted-foreground max-w-xs whitespace-normal">{item.description_en}</td>
                  <td className="py-3 px-3"><a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline text-primary">{item.source}</a></td>
                  <td className="py-3 px-3 flex gap-2 justify-center">
                    <button className="btn btn-sm btn-secondary rounded-lg px-4 py-2 font-bold" onClick={() => handleEdit(item.id)} disabled={loading}>تعديل</button>
                    <button className="btn btn-sm btn-danger rounded-lg px-4 py-2 font-bold" onClick={() => handleDelete(item.id)} disabled={loading}>حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 