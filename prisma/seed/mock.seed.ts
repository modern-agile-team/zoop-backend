/* eslint-disable no-restricted-imports */
import mockNicknameSources from './contents/nickname-source-mock.json';
import mockQuizImages from './contents/quiz-image-mock.json';
import mockQuizzes from './contents/quiz-mock.json';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class Seeder {
  counter = {
    quizImage: { insertCount: 0, skipCount: 0 },
    quiz: { insertCount: 0, skipCount: 0 },
    nicknameSource: { insertCount: 0, skipCount: 0 },
  };

  constructor(
    readonly prismaClient: PrismaClient,
    readonly contents: {
      quizImages: typeof mockQuizImages;
      quizzes: typeof mockQuizzes;
      nicknameSources: typeof mockNicknameSources;
    },
  ) {}

  async run() {
    await this.seedQuizImages();
    await this.seedQuizzes();
    await this.seedNicknameSources();
  }

  private async seedQuizImages() {
    const quizImageResult = await prisma.quizImage.createMany({
      data: this.contents.quizImages.map((quizImage) => ({
        id: BigInt(quizImage.id),
        category: quizImage.category,
        name: quizImage.name,
        originalFileName: quizImage.originalFileName,
        fileName: quizImage.quizImageFileName,
        extension: quizImage.extension,
        contentType: quizImage.contentType,
        contentLength: String(quizImage.contentLength),
        width: quizImage.width,
        height: quizImage.height,
      })),
      skipDuplicates: true,
    });
    this.counter.quizImage.insertCount += quizImageResult.count;
    this.counter.quizImage.skipCount +=
      this.contents.quizImages.length - quizImageResult.count;
  }

  private async seedQuizzes() {
    const quizResult = await prisma.quiz.createMany({
      data: this.contents.quizzes.map((quiz) => ({
        id: BigInt(quiz.id),
        type: quiz.type,
        imageFileName: quiz.imageFileName,
        question: quiz.question,
        answer: quiz.answer,
      })),
      skipDuplicates: true,
    });
    this.counter.quiz.insertCount += quizResult.count;
    this.counter.quiz.skipCount +=
      this.contents.quizzes.length - quizResult.count;
  }

  private async seedNicknameSources() {
    const nicknameSourceResult = await prisma.nicknameSource.createMany({
      data: this.contents.nicknameSources.map((nicknameSource) => ({
        id: BigInt(nicknameSource.id),
        name: nicknameSource.name,
        sequence: 0,
      })),
      skipDuplicates: true,
    });
    this.counter.nicknameSource.insertCount += nicknameSourceResult.count;
    this.counter.nicknameSource.skipCount +=
      this.contents.nicknameSources.length - nicknameSourceResult.count;
  }
}

const seeder = new Seeder(prisma, {
  quizImages: mockQuizImages,
  quizzes: mockQuizzes,
  nicknameSources: mockNicknameSources,
});

seeder
  .run()
  .then(() => {
    console.log(
      `퀴즈 이미지: ${seeder.counter.quizImage.insertCount}개 삽입, ${seeder.counter.quizImage.skipCount}개 스킵`,
    );
    console.log(
      `퀴즈: ${seeder.counter.quiz.insertCount}개 삽입, ${seeder.counter.quiz.skipCount}개 스킵`,
    );
    console.log(
      `닉네임 소스: ${seeder.counter.nicknameSource.insertCount}개 삽입, ${seeder.counter.nicknameSource.skipCount}개 스킵`,
    );
  })
  .catch(async (e) => {
    console.error(e);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
