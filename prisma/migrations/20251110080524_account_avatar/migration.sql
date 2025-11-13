-- 1) NULL 허용 컬럼 추가
ALTER TABLE "account"
  ADD COLUMN "avatarFileName" TEXT;

-- 2) 기존 데이터 채우기
UPDATE "account"
SET "avatarFileName" = 'pendingImage'
WHERE "avatarFileName" IS NULL;

-- 3) NOT NULL 제약 추가
ALTER TABLE "account"
  ALTER COLUMN "avatarFileName" SET NOT NULL;