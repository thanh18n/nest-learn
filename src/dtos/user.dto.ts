export class UserDto {
  id: number;
  username: string;
  createdAt: Date;
}

export class ChangePasswordDTO {
  id: number;
  oldPassword: string;
  newPassword: string;
}
