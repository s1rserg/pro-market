export type UserDto = {
  id: number;
  name: string;
  email: string;
};

export type SignInRequestDto = {
  email: string;
  password: string;
};

export type SignUpRequestDto = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponseDto = {
  token: string;
  user: UserDto;
};
