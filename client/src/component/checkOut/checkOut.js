import React, { Component } from 'react';
import axios from 'axios';
/* eslint-disable */

class OrderFrom extends Component {
  state = {
    code: null,
    data: null,
  };

  formHandler = e => {
    e.preventDefault();

    /* eslint-disable-next-line */
    const data = { code: this.state.code }; 
    console.log(data);
    axios
      .post('/api/promo', data)
      .then(res => this.setState({data: res.data}));
  };

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    let totalPrice = 0;
    let sum = 0;
    if (this.props) {
      /* eslint-disable-next-line */
      totalPrice = this.props.items.map(item => {
        sum += item.quantity * item.productId.unitPrice;
      });
    }
    if (this.state.data !== null) {
      const test = this.state.data; 
      // console.log(typeof test[0].reductionAmount);
      let sub = Math.floor(sum / this.state.data[0].reductionAmount); 
      sum -= sub;  
    } 
    return (
      <React.Fragment>
        <div>
          <form onSubmit={this.formHandler}>
            <input
              type="text"
              name="code"
              onChange={this.inputChangeHandler}
            />
            <input type="submit" value="Submit Review →" />
          </form>
        </div>
        <div>{`SUBTOTAL ${sum}`}</div>
      </React.Fragment>
    );
  }
}

export default OrderFrom;
