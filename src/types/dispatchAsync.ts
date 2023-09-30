import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import GlobalStateType from './globalStateType';

type DispatchAsyncType = ThunkDispatch<GlobalStateType, null, AnyAction>;

export default DispatchAsyncType;
