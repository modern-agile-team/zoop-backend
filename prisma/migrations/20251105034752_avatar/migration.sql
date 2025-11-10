-- CreateTable
CREATE TABLE "avatar" (
    "id" BIGINT NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "contentLength" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "description" TEXT,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avatar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avatar_event_store" (
    "id" BIGINT NOT NULL,
    "actorId" BIGINT,
    "aggregateId" BIGINT NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventPayload" JSONB NOT NULL,
    "version" INTEGER NOT NULL,
    "storedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "avatar_event_store_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "avatar_fileName_idx" ON "avatar"("fileName");

-- CreateIndex
CREATE UNIQUE INDEX "avatar_event_store_aggregateId_version_key" ON "avatar_event_store"("aggregateId", "version");
