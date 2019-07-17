import { combineReducers } from 'redux';
import cartReducer from './reducers/cartReducer';

export default combineReducers({
  cart: cartReducer,
});
