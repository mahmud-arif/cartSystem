import React, { Component } from 'react';
import axios from 'axios';
import List from './list/list';
/* eslint-disable */

class OrderFrom extends Component {
  state = {
    code: null,
    data: null,
    error: null,
  };

  formHandler = e => {
    e.preventDefault();
    if (!this.state.code) {
      return; 
    }

    /* eslint-disable-next-line */
    const data = { code: this.state.code }; 
    axios
      .post('/api/promo', data)
      .then(res => this.setState({ data: res.data }))
      .catch(err => this.setState({
        error: err.response.data.error
      })); 
  };

  inputChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    let totalPrice = 0;
    let sum = 0;
    let sumeri = null; 
    let sub = 0;
    let isActiv = true; 
    if (this.props) {
    /* eslint-disable-next-line */
    
      totalPrice = this.props.items.map(item => {
        sum += item.quantity * item.productId.unitPrice;
      });
    }
    if (this.state.data !== null) {
      isActiv = this.state.data[0].isActive; 
      console.log(isActiv); 
      if (isActiv) {
        if (this.state.data[0].reductionType === 'byPercent') {
          sub = Math.floor(sum / this.state.data[0].reductionAmount);
        } else {
          sub = this.state.data[0].reductionAmount
        }
         
        sum -= sub;  
      }
      // console.log(typeof test[0].reductionAmount);
    } 

    if (this.props) {
       sumeri = this.props.items.map(itm => <List product={itm.productId}
          quantity={itm.quantity} key={itm.productId._id}/>)
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
            <input type="submit" value="Apply →" />
            {!isActiv ? <p style={{ color: "red" }}>this code is apply once</p> : ''}
            {this.state.error ? <p style={{ color: "red" }}>{this.state.error}</p>:''}
          </form>
        </div>
        <div>{sumeri}</div>
        <hr/>
        <div>{`SUBTOTAL  :    ${sum}`}</div>
      </React.Fragment>
    );
  }
}

export default OrderFrom;
