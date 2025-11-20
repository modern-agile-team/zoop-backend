-- CreateTable
CREATE TABLE "background_music" (
    "id" BIGINT NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "durationInSeconds" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "contentLength" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "background_music_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "background_music_event_store" (
    "id" BIGINT NOT NULL,
    "actorId" BIGINT,
    "aggregateId" BIGINT NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventPayload" JSONB NOT NULL,
    "version" INTEGER NOT NULL,
    "storedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "background_music_event_store_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "background_music_fileName_idx" ON "background_music"("fileName");

-- CreateIndex
CREATE UNIQUE INDEX "background_music_event_store_aggregateId_version_key" ON "background_music_event_store"("aggregateId", "version");
