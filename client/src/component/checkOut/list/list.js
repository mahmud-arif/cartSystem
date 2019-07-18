import React from 'react';

/* eslint-disable react/prop-types */
const list = ({ product, quantity }) => (
  <React.Fragment>
    <div>
      <span>{product.name} : </span>
      <span>{product.unitPrice * quantity}</span>
    </div>
  </React.Fragment>
);

export default list;
