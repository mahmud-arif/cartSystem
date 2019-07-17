import { ADD_PRODUCT, LOAD_DATA, SUB_PRODUCT } from '../actions/actionsType';
import Items from '../component/Cart/items';

const initialState = {
  items: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        items: action.payload,
      };
    case SUB_PRODUCT:
      return {
        ...state,
        items: action.payload,
      };
    case LOAD_DATA:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
}
