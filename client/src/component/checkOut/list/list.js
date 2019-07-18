import React from 'react';

/* eslint-disable react/prop-types */
const list = ({ product, quantity }) => (
  <React.Fragment>
    <span>{product.name} : </span>
    <span>{product.unitPrice * quantity}</span>
  </React.Fragment>
);

export default list;
