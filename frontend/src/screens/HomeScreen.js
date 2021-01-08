import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import {listProducts} from '../actions/productActions'
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';

const Homescreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const {loading, error, products} = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);


  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <h2><Loader /></h2>
      ) : error ? (
         <h3><Message variant='danger'>{error}</Message></h3>
      ) : (
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={3} >
            <Product product={product}/>
          </Col>
        ))}
      </Row>
      )}
    </div>
  );
};

export default Homescreen;
