import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet'
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {listProducts} from '../actions/productActions';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import ProductCarousel from '../components/ProductCarousel';

const Homescreen = ({match}) => {
  const keyword = match.params.keyword

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  let {loading, error, products, page, pages} = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <div>
      <Meta />
      {!keyword ? <ProductCarousel /> : (
        <Link to='/' className='btn btn-light'>Go Back</Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <h2><Loader /></h2>
      ) : error ? (
         <h3><Message variant='danger'>{error}</Message></h3>
      ) : (
        <>
          <Row>
            {products && products.map(product => <Col key={product._id} sm={12} md={6} lg={3} ><Product product={product}/></Col>)}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword? keyword: ''}/>
        </>
      )}
    </div>
  );
};

export default Homescreen;
