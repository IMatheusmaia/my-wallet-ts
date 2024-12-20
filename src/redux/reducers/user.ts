import { UserType } from '../actions/useActions';

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
    return action.user;
  }
  return state;
};

export default userReducer;
