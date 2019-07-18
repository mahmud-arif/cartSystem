import axios from 'axios';
import {
  REMOVE,
  CLEAR,
  ADD_PRODUCT,
  LOAD_DATA,
  SUB_PRODUCT,
} from './actionsType';

// const calPrice = (data) => {
//   return data.map(res => res.quantity
//       )
// }

export const addProduct = id => dispatch => {
  const data = { productId: id };
  return axios.post('/api/cart/add-to-cart', data).then(result => {
    const product = result.data.cart.items;

    return dispatch({
      type: SUB_PRODUCT,
      payload: product,
    });
  });
};

export const subProduct = id => dispatch => {
  const data = { productId: id };
  return axios.post('/api/cart/sub-from-cart', data).then(result => {
    const product = result.data.cart.items;

    return dispatch({
      type: ADD_PRODUCT,
      payload: product,
    });
  });
};

export const removeProduct = id => dispatch => {
  const data = { productId: id };
  return axios.post('/api/cart/remove-product', data).then(result => {
    const product = result.data.cart.items;

    return dispatch({
      type: REMOVE,
      payload: product,
    });
  });
};

export const clearCart = () => dispatch =>
  axios.post('/api/cart/clearCart').then(result => {
    const product = result.data.cart.items;

    return dispatch({
      type: CLEAR,
      payload: product,
    });
  });
export const loadData = () => dispatch =>
  axios.get('/api/cart').then(result => {
    const product = result.data.cart.items;
    console.log(product);
    return dispatch({
      type: LOAD_DATA,
      payload: product,
    });
  });
