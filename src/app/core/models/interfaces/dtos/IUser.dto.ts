export interface IUser {
  _id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  dob?: Date | string;
  gender?: string;
  phoneNumber?: number;
  profileImage?: string;
  employeeLeaveCount?: number;
  roleId?: string;
  departmentId?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
