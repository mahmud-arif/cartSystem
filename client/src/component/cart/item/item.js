import React, { Fragment } from 'react';
import styles from './item.css';
import plus from './assets/plus.svg';
import minus from './assets/minus.svg';
import delet from './assets/delete-icn.svg';
/* eslint-disable react/prop-types */
const item = ({
  product,
  quantity,
  plusHandler,
  minusHandler,
  removeHandler,
}) => {
  const totalPrice = product.unitPrice * quantity;
  return (
    <Fragment>
      <div className={styles.item}>
        <div className={styles.buttons}>
          <span className={styles.deletebtn}> </span>
          <button
            className={styles.deletebtn}
            onClick={() => removeHandler(product._id)}
            type="button"
            name="button"
          >
            <img src={delet} alt="" />
          </button>
        </div>

        <div className={styles.description}>
          <span>{product.name}</span>
          <span>{product.attributes}</span>
        </div>
        <div className={styles.totalPrice}>{product.unitPrice}</div>
        <div className={styles.quantity}>
          <button
            className={styles.plusbtn}
            type="button"
            id="plus"
            name="button"
            onClick={() => plusHandler(product._id)}
          >
            <img src={plus} alt="" />
          </button>
          <input type="text" name="name" value={quantity} />
          <button
            className={styles.minusbtn}
            type="button"
            id="minus"
            name="button"
            onClick={() => minusHandler(product._id)}
          >
            <img src={minus} alt="" />
          </button>
        </div>

        <div className={styles.totalPrice}>{totalPrice}</div>
      </div>
    </Fragment>
  );
};

export default item;
