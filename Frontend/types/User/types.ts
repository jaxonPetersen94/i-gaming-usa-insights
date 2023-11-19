export interface SignInUserForm {
  username: string;
  password: string;
}

export interface RegisterUserForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterUserPostRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
