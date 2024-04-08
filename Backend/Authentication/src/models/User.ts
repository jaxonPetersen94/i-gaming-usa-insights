export interface DbUser {
  firebaseUid: string;
  firstName: string;
  lastName: string;
  email: string;
  dob?: string | null;
  phoneNumber?: string | null;
}
