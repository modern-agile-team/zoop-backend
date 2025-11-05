import { NicknameSourceAdminDto } from '@module/nickname-source/dto/nickname-source.admin-dto';
import { NicknameSource } from '@module/nickname-source/entities/nickname-source.entity';

export class NicknameSourceDtoAssembler {
  static convertToAdminDto(
    nicknameSource: NicknameSource,
  ): NicknameSourceAdminDto {
    const dto = new NicknameSourceAdminDto({
      id: nicknameSource.id,
      createdAt: nicknameSource.createdAt,
      updatedAt: nicknameSource.updatedAt,
    });

    dto.name = nicknameSource.name;
    dto.sequence = nicknameSource.sequence;
    dto.fullname = nicknameSource.fullname;

    return dto;
  }
}
