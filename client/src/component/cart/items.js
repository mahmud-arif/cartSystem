import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Axios from 'axios';
import Item from './item/item';
import styles from './items.css';
import {
  addProduct,
  loadData,
  subProduct,
  removeProduct,
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
        <div style={{ flexGrow: 3 }} className={styles.shopping - cart}>
          {' '}
          {cart}{' '}
        </div>
        <div style={{ flexGrow: 1 }}>
          <Order items={this.props.items} />
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
    removeProduct
  }
)(Items);
