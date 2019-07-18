import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Item from './item/item';
import styles from './items.css';
import Header from './item/header';
import {
  addProduct,
  loadData,
  subProduct,
  removeProduct,
  clearCart,
} from '../../actions/actions';
import Order from '../checkOut/checkOut';

class Items extends Component {
  static propTypes = {
    items: PropTypes.array,
  };
  /* eslint-disable react/no-unused-state */
  // state = {
  //   itemss: null,
  // };

  componentDidMount() {
    /* eslint-disable */
    this.props.loadData();
  }

  minusHandler = id => {
    const data = { productId: id };
    Axios.post('/api/shop/sub-from-cart', data).then(result =>
      this.setState({
        items: result.data.cart.items,
      })
    );
  };

  render() {
    /* react/prop-types */
    const { items } = this.props;
    const {
      addProduct,
      loadData,
      subProduct,
      removeProduct,
    } = this.props; 
    let cart;
    if (items) {
      
      cart = items.map(itm => (
        <Item
          product={itm.productId}
          quantity={itm.quantity}
          key={itm.productId._id}
          
          plusHandler={addProduct}
          removeHandler = {removeProduct}
          minusHandler={subProduct}
        />
      ));
    }
    return (
      <div className={styles.container}>
        <div><button onClick={()=>this.props.clearCart()}>clear cart</button></div>
        <div style={{ flexGrow: 3 }} className={styles.shoppingCart}>
          <Header/>
          {cart}
        </div>
        <div style={{ flexGrow: 1 }} className={styles.order}>
          {this.props.items.lenght !== 0 ? <Order items={this.props.items} /> : null}
          <button>CHEEKOUT</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  items: state.cart.items,
});

export default connect(
  mapStateToProps,
  {
    addProduct,
    loadData,
    subProduct,
    removeProduct, 
    clearCart
  }
)(Items);
