/*
  Warnings:

  - A unique constraint covering the columns `[eventsId]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventsId]` on the table `Programation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_eventsId_key" ON "Enrollment"("eventsId");

-- CreateIndex
CREATE UNIQUE INDEX "Programation_eventsId_key" ON "Programation"("eventsId");
