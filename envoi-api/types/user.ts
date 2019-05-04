export interface IUser {
  username: string;
  password: string;
  email: string;
  type: UserType;
  firstName: string;
  lastName?: string;
};

export enum UserType {
  'CREATOR' = 'CREATOR',
  'CONSUMER' = 'CONSUMER',
};