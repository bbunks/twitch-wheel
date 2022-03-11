/*
  Warnings:

  - A unique constraint covering the columns `[oidc_userid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_oidc_userid_key" ON "User"("oidc_userid");
