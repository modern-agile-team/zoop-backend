-- CreateTable
CREATE TABLE "sound_effect" (
    "id" BIGINT NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalFileName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "contentLength" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sound_effect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sound_effect_event_store" (
    "id" BIGINT NOT NULL,
    "actorId" BIGINT,
    "aggregateId" BIGINT NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventPayload" JSONB NOT NULL,
    "version" INTEGER NOT NULL,
    "storedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sound_effect_event_store_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "sound_effect_fileName_idx" ON "sound_effect"("fileName");

-- CreateIndex
CREATE UNIQUE INDEX "sound_effect_event_store_aggregateId_version_key" ON "sound_effect_event_store"("aggregateId", "version");
