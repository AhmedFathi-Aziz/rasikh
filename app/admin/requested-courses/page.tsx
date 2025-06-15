"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Building2, Calendar, Users, Phone, Mail, User, Briefcase, Globe } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface InHouseRequest {
  id: string;
  courseName: string;
  companyName: string;
  numberOfDays: number;
  numberOfTrainees: number;
  preferredLanguage: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  countryCode: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function RequestedCourses() {
  const [requests, setRequests] = useState<InHouseRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch("/api/in-house-training");
      if (!response.ok) throw new Error("Failed to fetch requests");
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/in-house-training/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error("Failed to update request");
      await fetchRequests();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update request");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-red-500 text-center">
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p>{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/admin">
            <Button variant="ghost" className="mb-4 hover:bg-gray-100">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">In-House Training Requests</h1>
              <p className="text-gray-500">Manage and track all in-house training requests</p>
            </div>
            <Badge variant="outline" className="text-lg px-4 py-2">
              Total Requests: {requests.length}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6">
          {requests.map((request) => (
            <Card key={request.id} className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl mb-2 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-gray-500" />
                      {request.courseName}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      Company: {request.companyName}
                    </p>
                  </div>
                  <Select
                    defaultValue={request.status}
                    onValueChange={(value) => updateRequestStatus(request.id, value)}
                  >
                    <SelectTrigger className={`w-[180px] ${getStatusColor(request.status)}`}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      Training Details
                    </h3>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        Duration: {request.numberOfDays} days
                      </p>
                      <p className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        Number of Trainees: {request.numberOfTrainees}
                      </p>
                      <p className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-gray-400" />
                        Preferred Language: {request.preferredLanguage}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <User className="h-5 w-5 text-gray-500" />
                      Contact Information
                    </h3>
                    <div className="space-y-2">
                      <p className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        Name: {request.firstName} {request.lastName}
                      </p>
                      <p className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-gray-400" />
                        Job Title: {request.jobTitle}
                      </p>
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        Email: {request.email}
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        Phone: {request.countryCode} {request.phone}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-500 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Requested on: {new Date(request.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 