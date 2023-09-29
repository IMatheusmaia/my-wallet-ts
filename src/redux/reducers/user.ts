import { UserType } from '../actions';

type ActionUserType = {
  type: string,
  user: UserType
};

const INITIAL_USER_STATE = {
  email: '',
  password: '',
};

const userReducer = (state = INITIAL_USER_STATE, action: ActionUserType) => {
  if (action.type === 'ADD_USER') {
    return { ...state, ...action.user };
  }
  return state;
};

export default userReducer;
