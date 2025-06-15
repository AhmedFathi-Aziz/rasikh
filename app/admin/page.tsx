"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Save, X, BookOpen, Users, BarChart, ClipboardList, Mail, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Course {
  id: string
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  durationAr: string
  durationEn: string
  level: string
  category: string
  image: string
  createdAt: string
  topicsAr?: string[]
  topicsEn?: string[]
}

interface Stats {
  courseRegistrations: number
  contactMessages: number
  inHouseRequests: number
}

const ADMIN_USER = process.env.NEXT_PUBLIC_ADMIN_USER || "admin"
const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || "password"

export default function AdminDashboard() {
  const [courses, setCourses] = useState<Course[]>([])
  const [stats, setStats] = useState<Stats>({
    courseRegistrations: 0,
    contactMessages: 0,
    inHouseRequests: 0
  })
  const [isAddingCourse, setIsAddingCourse] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    titleAr: "",
    titleEn: "",
    descriptionAr: "",
    descriptionEn: "",
    durationAr: "",
    durationEn: "",
    level: "",
    category: "",
    image: "",
    topicsAr: [],
    topicsEn: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  // Fetch courses and stats from API
  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetch("/api/courses").then(res => res.json()),
      fetch("/api/course-registrations").then(res => res.json()),
      fetch("/api/contact-messages").then(res => res.json()),
      fetch("/api/in-house-training").then(res => res.json())
    ])
      .then(([coursesData, registrations, messages, inHouseRequests]) => {
        setCourses(Array.isArray(coursesData) ? coursesData : [])
        setStats({
          courseRegistrations: Array.isArray(registrations) ? registrations.length : 0,
          contactMessages: Array.isArray(messages) ? messages.length : 0,
          inHouseRequests: Array.isArray(inHouseRequests) ? inHouseRequests.length : 0
        })
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to fetch data")
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsAuthenticated(localStorage.getItem("admin-auth") === "true")
    }
  }, [])

  // Add course via API
  const handleAddCourse = async () => {
    if (!newCourse.titleAr || !newCourse.titleEn || !newCourse.descriptionAr || !newCourse.descriptionEn || !newCourse.durationAr || !newCourse.durationEn) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newCourse,
          topicsAr: Array.isArray(newCourse.topicsAr) ? newCourse.topicsAr : [],
          topicsEn: Array.isArray(newCourse.topicsEn) ? newCourse.topicsEn : []
        })
      })
      if (!res.ok) {
        console.error("Server error status:", res.status, res.statusText)
        const errorData = await res.json()
        console.error("Server error response:", errorData)
        throw new Error(errorData.error || "Failed to add course")
      }
      const added = await res.json()
      setCourses([added, ...courses])
      setNewCourse({ titleAr: "", titleEn: "", descriptionAr: "", descriptionEn: "", durationAr: "", durationEn: "", level: "", category: "", image: "", topicsAr: [], topicsEn: [] })
      setIsAddingCourse(false)
    } catch (e) {
      console.error("Error adding course:", e)
      setError(e instanceof Error ? e.message : "Failed to add course")
    } finally {
      setLoading(false)
    }
  }

  // Edit and delete handlers (delete not implemented in API yet)
  const handleEditCourse = (course: Course) => {
    setEditingCourse(course)
  }

  const handleSaveEdit = async () => {
    if (!editingCourse) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/courses/${editingCourse.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editingCourse,
          topicsAr: Array.isArray(editingCourse.topicsAr) ? editingCourse.topicsAr : [],
          topicsEn: Array.isArray(editingCourse.topicsEn) ? editingCourse.topicsEn : []
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update course");
      }
      const updated = await res.json();
      setCourses(courses.map(c => c.id === updated.id ? updated : c));
      setEditingCourse(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (courseId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete course");
      }
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("admin-auth", "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="border rounded px-3 py-2"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border rounded px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="bg-primary text-white py-2 rounded font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8" dir="ltr"> 
      {/* Dashboard Header */}
      <div className="mb-8 flex flex-col gap-4 items-start text-left">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Welcome Fathi</h1>
          <p className="text-muted-foreground">
            Manage your website content and settings from here.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 justify-center">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Course Registrations
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.courseRegistrations}</div>
              <p className="text-xs text-muted-foreground">
                Active registrations
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Contact Messages
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground ml-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.contactMessages}</div>
              <p className="text-xs text-muted-foreground">
                Total contact messages
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                In-House Training Requests
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground ml-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.inHouseRequests}</div>
              <p className="text-xs text-muted-foreground">
                Total training requests
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/registrations">
            <Button variant="outline" className="w-full">
              <Users className="mr-2 h-4 w-4" />
              View Registrations
            </Button>
          </Link>
          <Link href="/admin/contacts">
            <Button variant="outline" className="w-full">
              <MessageSquare className="mr-2 h-4 w-4" />
              View Messages
            </Button>
          </Link>
          <Link href="/admin/requested-courses">
            <Button variant="outline" className="w-full">
              <BookOpen className="mr-2 h-4 w-4" />
              View In-House Requests
            </Button>
          </Link>
          <Button variant="outline" className="w-full" onClick={() => setIsAddingCourse(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Course
          </Button>
        </div>
      </div>

      {isAddingCourse && (
        <Card className="mb-8 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Add New Course</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder={"Title in Arabic"}
                  value={newCourse.titleAr}
                  onChange={(e) => setNewCourse({ ...newCourse, titleAr: e.target.value })}
                />
                <Input
                  placeholder={"Title in English"}
                  value={newCourse.titleEn}
                  onChange={(e) => setNewCourse({ ...newCourse, titleEn: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Textarea
                  placeholder={"Course description in Arabic"}
                  value={newCourse.descriptionAr}
                  onChange={(e) => setNewCourse({ ...newCourse, descriptionAr: e.target.value })}
                />
                <Textarea
                  placeholder={"Course description in English"}
                  value={newCourse.descriptionEn}
                  onChange={(e) => setNewCourse({ ...newCourse, descriptionEn: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Textarea
                  placeholder={"Course topics (one per line in Arabic)"}
                  value={newCourse.topicsAr?.join('\n') || ""}
                  onChange={e => setNewCourse({ ...newCourse, topicsAr: e.target.value.split('\n') })}
                />
                <Textarea
                  placeholder={"Course topics (one per line in English)"}
                  value={newCourse.topicsEn?.join('\n') || ""}
                  onChange={e => setNewCourse({ ...newCourse, topicsEn: e.target.value.split('\n') })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder={"Duration in Arabic"}
                  value={newCourse.durationAr}
                  onChange={(e) => setNewCourse({ ...newCourse, durationAr: e.target.value })}
                />
                <Input
                  placeholder={"Duration in English"}
                  value={newCourse.durationEn}
                  onChange={(e) => setNewCourse({ ...newCourse, durationEn: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                <Select
                  value={newCourse.level}
                  onValueChange={(value) => setNewCourse({ ...newCourse, level: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Select
                value={newCourse.category}
                onValueChange={(value) => setNewCourse({ ...newCourse, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="kids">Kids</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Image URL"
                value={newCourse.image}
                onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
              />
              <div className="flex justify-end gap-2"> 
                <Button variant="outline" onClick={() => setIsAddingCourse(false)}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleAddCourse} disabled={loading}>
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? "Save..." : "Save"}
                </Button>
              </div>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
          </CardContent>
        </Card>
      )}

      {loading && !isAddingCourse && (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      )}
      {!loading && courses.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">No courses found.</div>
      )}
      <div className="grid gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="shadow-md">
            <CardContent className="p-6 flex flex-col md:flex-row gap-6"> 
              <div className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                <img
                  src={course.image || "/images/default-course.jpg"}
                  alt={course.titleEn}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-grow"> 
                <h3 className="text-xl font-semibold mb-2">{course.titleEn}</h3>
                <p className="text-muted-foreground mb-4">{course.descriptionEn}</p>
                <div className="flex gap-4 text-sm text-muted-foreground mb-2"> 
                  <span>{course.durationAr} - {course.durationEn}</span>
                  <span>•</span>
                  <span>{course.level}</span>
                  <span>•</span>
                  <span>{course.category}</span>
                </div>
                <div className="flex gap-2 justify-end"> 
                  <Button variant="outline" size="icon" onClick={() => handleEditCourse(course)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => handleDeleteCourse(course.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {editingCourse && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
          <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg px-2">
            <Card>
              <CardHeader>
                <CardTitle>Edit Course</CardTitle>
              </CardHeader>
              <CardContent className="max-h-[80vh] overflow-y-auto">
                <div className="grid gap-4">
                  <Input
                    placeholder="Course Title in Arabic"
                    value={editingCourse.titleAr}
                    onChange={(e) => setEditingCourse({ ...editingCourse, titleAr: e.target.value })}
                  />
                  <Input
                    placeholder="Course Title in English"
                    value={editingCourse.titleEn}
                    onChange={(e) => setEditingCourse({ ...editingCourse, titleEn: e.target.value })}
                  />
                  <Textarea
                    placeholder="Course Description in Arabic"
                    value={editingCourse.descriptionAr}
                    onChange={(e) => setEditingCourse({ ...editingCourse, descriptionAr: e.target.value })}
                  />
                  <Textarea
                    placeholder="Course Description in English"
                    value={editingCourse.descriptionEn}
                    onChange={(e) => setEditingCourse({ ...editingCourse, descriptionEn: e.target.value })}
                  />
                  <Textarea
                    placeholder="Course Topics in Arabic"
                    value={editingCourse.topicsAr?.join('\n') || ""}
                    onChange={e => setEditingCourse({ ...editingCourse, topicsAr: e.target.value.split('\n') })}
                  />
                  <Textarea
                    placeholder="Course Topics in English"
                    value={editingCourse.topicsEn?.join('\n') || ""}
                    onChange={e => setEditingCourse({ ...editingCourse, topicsEn: e.target.value.split('\n') })}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Duration in Arabic"
                      value={editingCourse.durationAr}
                      onChange={(e) => setEditingCourse({ ...editingCourse, durationAr: e.target.value })}
                    />
                    <Input
                      placeholder="Duration in English"
                      value={editingCourse.durationEn}
                      onChange={(e) => setEditingCourse({ ...editingCourse, durationEn: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                    <Select
                      value={editingCourse.level}
                      onValueChange={(value) => setEditingCourse({ ...editingCourse, level: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Select
                    value={editingCourse.category}
                    onValueChange={(value) => setEditingCourse({ ...editingCourse, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="kids">Kids</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Image URL"
                    value={editingCourse.image}
                    onChange={(e) => setEditingCourse({ ...editingCourse, image: e.target.value })}
                  />
                  <div className="flex justify-end gap-2"> 
                    <Button variant="outline" onClick={() => setEditingCourse(null)}>
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} disabled={loading}>
                      <Save className="mr-2 h-4 w-4" />
                      {loading ? "Save..." : "Save"}
                    </Button>
                  </div>
                  {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
} 