-- CreateTable
CREATE TABLE "InHouseTrainingRequest" (
    "id" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "numberOfDays" INTEGER NOT NULL,
    "numberOfTrainees" INTEGER NOT NULL,
    "preferredLanguage" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InHouseTrainingRequest_pkey" PRIMARY KEY ("id")
);
