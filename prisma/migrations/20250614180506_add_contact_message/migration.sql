/*
  Warnings:

  - Added the required column `descriptionAr` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionEn` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleAr` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleEn` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "descriptionAr" TEXT NOT NULL,
ADD COLUMN     "descriptionEn" TEXT NOT NULL,
ADD COLUMN     "durationAr" TEXT,
ADD COLUMN     "durationEn" TEXT,
ADD COLUMN     "titleAr" TEXT NOT NULL,
ADD COLUMN     "titleEn" TEXT NOT NULL,
ADD COLUMN     "topicsAr" TEXT[],
ADD COLUMN     "topicsEn" TEXT[],
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "duration" DROP NOT NULL;

-- CreateTable
CREATE TABLE "CourseRegistration" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "numberOfDays" INTEGER NOT NULL,
    "numberOfParticipants" INTEGER NOT NULL,
    "preferredLanguage" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);
