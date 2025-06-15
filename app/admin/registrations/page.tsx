"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"

interface Registration {
  id: string
  course_id: string
  course_name: string
  location: string
  number_of_days: number
  number_of_participants: number
  preferred_language: string
  first_name: string
  last_name: string
  job_title: string
  company: string
  phone: string
  country_code: string
  email: string
  created_at: string
}

export default function RegistrationsPage() {
  const { language } = useLanguage()
  const isAr = language === "ar"
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      const response = await fetch("/api/course-registrations")
      if (!response.ok) throw new Error("Failed to fetch registrations")
      const data = await response.json()
      setRegistrations(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch registrations")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-16 text-gray-500 text-base">{isAr ? "جاري التحميل..." : "Loading..."}</div>
  }

  if (error) {
    return <div className="text-center py-16 text-red-500 text-base">{error}</div>
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            {isAr ? "تسجيلات الدورات" : "Course Registrations"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{isAr ? "الدورة" : "Course"}</TableHead>
                  <TableHead>{isAr ? "الاسم" : "Name"}</TableHead>
                  <TableHead>{isAr ? "الشركة" : "Company"}</TableHead>
                  <TableHead>{isAr ? "المسمى الوظيفي" : "Job Title"}</TableHead>
                  <TableHead>{isAr ? "البريد الإلكتروني" : "Email"}</TableHead>
                  <TableHead>{isAr ? "الهاتف" : "Phone"}</TableHead>
                  <TableHead>{isAr ? "تاريخ التسجيل" : "Registration Date"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">{registration.courseName}</TableCell>
                    <TableCell>{`${registration.firstName} ${registration.lastName}`}</TableCell>
                    <TableCell>{registration.company}</TableCell>
                    <TableCell>{registration.jobTitle}</TableCell>
                    <TableCell>{registration.email}</TableCell>
                    <TableCell>{`${registration.countryCode} ${registration.phone}`}</TableCell>
                    <TableCell>
                      {registration.createdAt ? format(new Date(registration.createdAt), "MMM d, yyyy") : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 