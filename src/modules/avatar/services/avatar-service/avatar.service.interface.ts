export const AVATAR_SERVICE = Symbol('AVATAR_SERVICE');

export interface IAvatarService {
  assignRandomAvatar(): Promise<{ avatarFileName: string }>;
}
