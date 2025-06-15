"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

export default function ContactsPage() {
  const [messages, setMessages] = useState([])
  const [showMessages, setShowMessages] = useState(true)

  useEffect(() => {
    fetch("/api/contact-messages")
      .then(res => res.json())
      .then(setMessages)
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
      <div className="flex gap-4 mb-8">
        <Button variant="default" onClick={() => setShowMessages((v) => !v)}>
          <Eye className="mr-2 h-4 w-4" />
          {showMessages ? "Hide Contact Messages" : "View Contact Messages"}
        </Button>
        <Button variant="default" onClick={() => { /* TODO: export logic */ }}>
          Export Contacts
        </Button>
      </div>
      {showMessages && (
        <table className="min-w-full border">
          <thead>
            <tr className="py-4 h-14">
              <th className="py-4">Name</th>
              <th className="py-4">Email</th>
              <th className="py-4">Subject</th>
              <th className="py-4">Message</th>
              <th className="py-4">Date</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg: any) => (
              <tr key={msg.id}>
                <td className="pb-6 pr-6 text-right align-top">{msg.name}</td>
                <td className="pb-6 pr-6 text-right align-top">{msg.email}</td>
                <td className="pb-6 pr-6 text-right align-top">{msg.subject}</td>
                <td className="pb-6 pr-6 text-right align-top">{msg.message}</td>
                <td className="pb-6 pr-6 text-right align-top">{new Date(msg.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
} 