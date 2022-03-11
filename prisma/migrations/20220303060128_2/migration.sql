/*
  Warnings:

  - You are about to drop the column `userId` on the `Request` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[participantId]` on the table `Request` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_userId_fkey";

-- DropIndex
DROP INDEX "Request_userId_key";

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "userId",
ADD COLUMN     "participantId" INTEGER NOT NULL DEFAULT -1;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "oidc_userid" TEXT NOT NULL DEFAULT E'';

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL,
    "username" TEXT NOT NULL,
    "requestId" INTEGER,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Request_participantId_key" ON "Request"("participantId");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
