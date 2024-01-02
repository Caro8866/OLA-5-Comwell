export type User = {
  _id: string;
  email: string;
  fullName: string;
  zipCode: number;
  phone: number;
  gender: "Male" | "Female" | "Prefer not to say" | "Other";
  dateOfBirth: string;
  roles: string;
};
