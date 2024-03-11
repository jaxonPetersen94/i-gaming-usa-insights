export interface LoginUserForm {
  email: string;
  password: string;
}

export interface RegisterUserForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface DbUser {
  firebaseUid: string;
  firstName: string;
  lastName: string;
  email: string;
  dob?: string | null;
  phoneNumber?: string | null;
}
