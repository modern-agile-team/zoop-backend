-- 1. NULL 허용으로 contentType 컬럼 추가
ALTER TABLE "quiz_image"
ADD COLUMN "contentType" TEXT;

-- 2. 기존 row 중 contentType이 NULL인 경우
--    extension='png' → contentType='image/png'
UPDATE "quiz_image"
SET "contentType" = CONCAT('image/', "extension")
WHERE "contentType" IS NULL;

-- 3. 이제 NOT NULL 제약 추가
ALTER TABLE "quiz_image"
ALTER COLUMN "contentType"
SET NOT NULL;