export type RenterType = {
  _id: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  shopName: string;
  shopAddress: string;
  cnic: string;
  area: string;
  role: string;
  cnicPicture?: string;
  profilePicture?: string;

  isBlocked: boolean;
  createdAt?: string;
  updatedAt?: string;
  password?: string;
  __v?: number;
};
