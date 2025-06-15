"use client"
import { useState, useEffect } from "react";
import { useLanguage } from "@/components/language-provider";
import { useParams } from "next/navigation";

interface Course {
  id: string;
  titleAr: string;
  titleEn: string;
}

const countryCodes = [
  { code: "+20", name: "مصر", flag: "🇪🇬" },
  { code: "+966", name: "السعودية", flag: "🇸🇦" },
  { code: "+971", name: "الإمارات", flag: "🇦🇪" },
  { code: "+965", name: "الكويت", flag: "🇰🇼" },
  { code: "+973", name: "البحرين", flag: "🇧🇭" },
  { code: "+968", name: "عمان", flag: "🇴🇲" },
  { code: "+974", name: "قطر", flag: "🇶🇦" },
  { code: "+1", name: "USA", flag: "🇺🇸" },
  { code: "+44", name: "UK", flag: "🇬🇧" },
];

const inputStyle =
  "border border-gray-300 rounded-lg px-3 py-2 bg-white placeholder-gray-400 text-sm focus:outline-none";

export default function CourseRegisterPage() {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    courseName: "",
    location: "",
    numberOfDays: "",
    numberOfParticipants: "",
    preferredLanguage: "",
    firstName: "",
    lastName: "",
    jobTitle: "",
    phone: "",
    countryCode: countryCodes[0].code,
    company: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    setLoading(true);
    fetch("/api/courses")
      .then(res => res.json())
      .then(data => {
        const found = Array.isArray(data) ? data.find((c: Course) => c.id === id) : null;
        setCourse(found || null);
        setForm(f => ({ ...f, courseName: found ? (isAr ? found.titleAr : found.titleEn) : "" }));
        setLoading(false);
      })
      .catch(() => {
        setCourse(null);
        setForm(f => ({ ...f, courseName: "" }));
        setLoading(false);
      });
  }, [id, isAr]);

  const validate = () => {
    const errs: any = {};
    if (!form.courseName) errs.courseName = isAr ? "هذا الحقل مطلوب" : "Required";
    if (!form.location) errs.location = isAr ? "هذا الحقل مطلوب" : "Required";
    if (!form.numberOfDays || isNaN(Number(form.numberOfDays)) || Number(form.numberOfDays) <= 0) errs.numberOfDays = isAr ? "أدخل عدد أيام صحيح" : "Enter a valid number of days";
    if (!form.numberOfParticipants || isNaN(Number(form.numberOfParticipants)) || Number(form.numberOfParticipants) <= 0) errs.numberOfParticipants = isAr ? "أدخل عدد مشاركين صحيح" : "Enter a valid number of participants";
    if (!form.preferredLanguage) errs.preferredLanguage = isAr ? "هذا الحقل مطلوب" : "Required";
    if (!form.firstName) errs.firstName = isAr ? "هذا الحقل مطلوب" : "Required";
    if (!form.lastName) errs.lastName = isAr ? "هذا الحقل مطلوب" : "Required";
    if (!form.jobTitle) errs.jobTitle = isAr ? "هذا الحقل مطلوب" : "Required";
    if (!form.company) errs.company = isAr ? "هذا الحقل مطلوب" : "Required";
    if (!form.email) errs.email = isAr ? "هذا الحقل مطلوب" : "Required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = isAr ? "البريد الإلكتروني غير صحيح" : "Invalid email";
    if (!form.phone) errs.phone = isAr ? "هذا الحقل مطلوب" : "Required";
    else if (!/^\d{6,15}$/.test(form.phone)) errs.phone = isAr ? "رقم الهاتف غير صحيح" : "Invalid phone number";
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      const response = await fetch("/api/course-registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: id,
          ...form,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit registration");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting registration:", error);
      setErrors({
        submit: isAr ? "حدث خطأ أثناء إرسال البيانات" : "An error occurred while submitting the form",
      });
    }
  };

  if (loading) {
    return <div className="text-center py-16 text-gray-500 text-base">{isAr ? "جاري التحميل..." : "Loading..."}</div>;
  }
  if (!course) {
    return <div className="text-center py-16 text-red-500 text-base">{isAr ? "لم يتم العثور على الكورس" : "Course not found."}</div>;
  }

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <h2 className={`text-2xl mb-8 text-center font-semibold ${isAr ? "cairo-font" : ""} text-gray-800`}>
        {isAr ? "تسجيل في الدورة" : "Register for the Course"}
      </h2>
      {submitted ? (
        <div className="text-center text-green-700 font-medium py-8 text-base">
          {isAr ? "تم إرسال بياناتك بنجاح!" : "Your information has been submitted successfully!"}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          {/* Step 2: تفاصيل الدورة */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4 w-full">
            <div className="text-base mb-4 text-gray-700 font-medium text-right w-full" style={{direction: 'rtl'}}>
              {isAr ? "الخطوة 2: تفاصيل الدورة" : "Step 2: Course Details"}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <input
                type="text"
                name="courseName"
                value={form.courseName}
                readOnly
                placeholder={isAr ? "اسم الدورة التدريبية" : "Course Name"}
                className={inputStyle + ' md:col-span-2 w-full'}
                dir={isAr ? "rtl" : "ltr"}
                required
                style={{ backgroundColor: '#f9f9f9', color: '#374151', fontSize: '0.875rem', width: '100%' }}
              />
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder={isAr ? "مكان عقد الدورة" : "Course Location"}
                className={inputStyle + ' md:col-span-2 w-full'}
                dir={isAr ? "rtl" : "ltr"}
                required
                style={{ fontSize: '0.875rem', width: '100%' }}
              />
              <input
                type="text"
                name="numberOfDays"
                value={form.numberOfDays}
                onChange={handleChange}
                placeholder={isAr ? "عدد الأيام" : "Number of Days"}
                className={inputStyle + ' w-full'}
                dir={isAr ? "rtl" : "ltr"}
                required
                style={{ fontSize: '0.875rem', width: '100%' }}
              />
              {errors.numberOfDays && <span className="text-red-500 text-xs block mt-1">{errors.numberOfDays}</span>}
              <input
                type="text"
                name="numberOfParticipants"
                value={form.numberOfParticipants}
                onChange={handleChange}
                placeholder={isAr ? "عدد المشاركين" : "Number of Participants"}
                className={inputStyle + ' w-full'}
                dir={isAr ? "rtl" : "ltr"}
                required
                style={{ fontSize: '0.875rem', width: '100%' }}
              />
              <select
                name="preferredLanguage"
                value={form.preferredLanguage}
                onChange={handleChange}
                className={inputStyle + ' w-full'}
                dir={isAr ? "rtl" : "ltr"}
                required
                style={{ fontSize: '0.875rem', width: '100%' }}
              >
                <option value="">{isAr ? "اللغة المفضلة" : "Preferred Language"}</option>
                <option value="الانجليزية">{isAr ? "الانجليزية" : "English"}</option>
                <option value="العربيه">{isAr ? "العربيه" : "Arabic"}</option>
              </select>
            </div>
          </div>

          {/* Step 3: تفاصيل الاتصال */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-4 w-full">
            <div className="text-base mb-4 text-gray-700 font-medium text-right w-full" style={{direction: 'rtl'}}>
              {isAr ? "الخطوة 3: تفاصيل الاتصال" : "Step 3: Contact Details"}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder={isAr ? "الاسم الاول" : "First Name"}
                className={inputStyle + ' w-full'}
                dir={isAr ? "rtl" : "ltr"}
                required
                style={{ fontSize: '0.875rem', width: '100%' }}
              />
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder={isAr ? "اسم العائلة" : "Last Name"}
                className={inputStyle + ' w-full'}
                dir={isAr ? "rtl" : "ltr"}
                required
                style={{ fontSize: '0.875rem', width: '100%' }}
              />
              <input
                type="text"
                name="jobTitle"
                value={form.jobTitle}
                onChange={handleChange}
                placeholder={isAr ? "المسمى الوظيفي" : "Job Title"}
                className={inputStyle + ' w-full'}
                dir={isAr ? "rtl" : "ltr"}
                required
                style={{ fontSize: '0.875rem', width: '100%' }}
              />
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder={isAr ? "اسم الشركة" : "Company Name"}
                className={inputStyle + ' w-full'}
                dir={isAr ? "rtl" : "ltr"}
                required
                style={{ fontSize: '0.875rem', width: '100%' }}
              />
              <div className={`flex w-full gap-2 items-center col-span-2 ${isAr ? 'flex-row-reverse' : ''}`}>
                <div className="flex w-full">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                    className={`border border-gray-300 ${isAr ? 'rounded-r-lg' : 'rounded-l-lg'} px-3 py-2 bg-white text-sm min-w-[6.5rem] text-left appearance-none focus:outline-none font-mono`}
                    style={isAr ? { borderLeft: 'none', fontSize: '0.875rem' } : { borderRight: 'none', fontSize: '0.875rem' }}
                    dir={isAr ? "rtl" : "ltr"}
                  >
                    {countryCodes.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={isAr ? "رقم الهاتف" : "Phone Number"}
                    className={`border border-gray-300 ${isAr ? 'rounded-l-lg' : 'rounded-r-lg'} px-3 py-2 bg-white placeholder-gray-400 text-sm w-full focus:outline-none`}
                    dir={isAr ? "rtl" : "ltr"}
                    required
                    style={isAr ? { fontSize: '0.875rem', borderRight: 'none', width: '100%' } : { fontSize: '0.875rem', borderLeft: 'none', width: '100%' }}
                  />
                </div>
              </div>
              {errors.phone && <span className="text-red-500 text-xs block mt-1 col-span-2">{errors.phone}</span>}
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={isAr ? "الايميل الالكتروني" : "Email"}
                className={inputStyle + ' w-full col-span-2'}
                dir={isAr ? "rtl" : "ltr"}
                required
                style={{ fontSize: '0.875rem', width: '100%' }}
              />
              {errors.email && <span className="text-red-500 text-xs block mt-1 col-span-2">{errors.email}</span>}
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4 w-full">
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg text-white text-sm font-medium shadow bg-black hover:bg-gray-900 transition-colors"
            >
              {isAr ? "أرسل" : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 