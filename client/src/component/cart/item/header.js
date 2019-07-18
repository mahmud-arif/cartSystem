import React, { Fragment } from 'react';
import styles from './item.css';

const header = () => (
  <Fragment>
    <div className={styles.item}>
      <div className={styles.buttons}></div>

      <div className={styles.description}>
        <span>PRODUCT</span>
      </div>
      <div className={styles.totalPrice}>PRICE</div>
      <div className={styles.quantity}>QUANTITY</div>

      <div className={styles.totalPrice}>TOTAL</div>
    </div>
  </Fragment>
);
export default header;
