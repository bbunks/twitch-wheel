-- AlterTable
ALTER TABLE "Request" ALTER COLUMN "participantId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "oidc_userid" DROP DEFAULT;
