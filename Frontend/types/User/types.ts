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

export interface User {
  firebaseUid: string;
  firstName: string;
  lastName: string;
  email: string;
  dob?: string | null;
  phoneNumber?: string | null;
  accessToken: string;
}
