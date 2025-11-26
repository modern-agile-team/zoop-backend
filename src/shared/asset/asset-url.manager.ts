import { ENV_KEY } from '@common/app-config/app-config.constant';

import { InvalidAssetUrlError } from '@shared/asset/errors/invalid-asset-url.error';

export type AssetCategory =
  | 'quizImage'
  | 'soundEffect'
  | 'avatar'
  | 'backgroundMusic';

export class AssetUrlManager {
  static fileNameToUrl(fileName: string, category: AssetCategory): string {
    return `${this.getBaseAssetUrl()}/${this.getBaseAssetFilePath(category)}/${fileName}`;
  }

  static urlToFileName(url: string, category: AssetCategory): string {
    if (this.isValidUrl(url, category) === false) {
      throw new InvalidAssetUrlError();
    }

    return url.replace(
      `${this.getBaseAssetUrl()}/${this.getBaseAssetFilePath(category)}/`,
      '',
    );
  }

  static isValidUrl(url: string, category: AssetCategory): boolean {
    return url.startsWith(
      `${this.getBaseAssetUrl()}/${this.getBaseAssetFilePath(category)}`,
    );
  }

  private static getBaseAssetUrl(): string {
    return process.env[ENV_KEY.AWS_S3_URL] as string;
  }

  private static getBaseAssetFilePath(category: AssetCategory): string {
    const BASE_ASSET_FILE_PATHS: Record<AssetCategory, string> = {
      quizImage: process.env[ENV_KEY.AWS_S3_QUIZ_IMAGE_FILE_PATH] as string,
      soundEffect: process.env[ENV_KEY.AWS_S3_SOUND_EFFECT_FILE_PATH] as string,
      avatar: process.env[ENV_KEY.AWS_S3_AVATAR_FILE_PATH] as string,
      backgroundMusic: process.env[
        ENV_KEY.AWS_S3_BACKGROUND_MUSIC_FILE_PATH
      ] as string,
    };
    return BASE_ASSET_FILE_PATHS[category];
  }
}
