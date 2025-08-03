export type UserType = {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  cnic: string;
  area: string;
  cnicPicture?: string;
  profilePicture?: string;
  isBlocked: boolean;

  createdAt?: string;
  updatedAt?: string;
  password?: string;
  __v?: number;
};
