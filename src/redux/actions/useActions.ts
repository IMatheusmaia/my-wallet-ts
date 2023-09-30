export type UserType = {
  email: string,
  password: string
};

export const actionUser = (user: UserType) => ({
  type: 'ADD_USER',
  user,
});
