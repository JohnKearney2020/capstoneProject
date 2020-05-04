import React, {useEffect, useState} from "react";
import items from "../../api/api-items";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { detailsItem } from "../../actions/itemActions";

function ProductView(props) {
  const [ qty, setQty] = useState(1);

  const itemDetails = useSelector(state => state.itemDetails)
  const { product, loading, error } = itemDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsItem(props.match.params.id))
    return () => {
      //
    }
  }, []);

  const handleAdd2Cart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
  }
  

  return (
    <>
      <div>
        <Link to="/">Back to Results</Link>
      </div>
      {loading? <div>Loading...</div> : error? <div>{error}</div> : (
              <Container>
              <Row className="product-details">
                <Col className="product-image">
                  <img src={product.image} alt="product"></img>
                </Col>
                <Col className="details-info">
                  <ul>
                    <li>
                      <b>{product.title}</b>
                    </li>
                    <li>
                      {product.rating} Stars ({product.numOfRev}) Reviews
                    </li>
                    <li>
                      <b>${product.price}</b>
                    </li>
                    <li>Description: {product.description}</li>
                  </ul>
                </Col>
                <Col className="cart-action">
                  <Card border="dark" style={{ width: "18rem", padding: "1rem" }}>
                    <ul>
                      <li> Price : {product.price}</li>
                      <li> Status : {product.qtyInStock > 0? "In Stock" : "Unavailable"}</li>
                      <li>
                        {" "}
                        Qty :
                        <select vaue ={qty} onChange={ (e)=> { setQty( e.target.value ) }}>
                          {[...Array(product.qtyInStock).keys()].map(param =>
                            <option key={param + 1} value={ param + 1 }>{ param + 1 }</option>
                            )}
                        </select>
                      </li>
                      <li>
                        {product.qtyInStock > 0 &&
                        <Button variant="success" onClick={handleAdd2Cart}>Add To Cart</Button> 
                            }
                      </li>
                    </ul>
                  </Card>
                </Col>
              </Row>
            </Container>
      )}

    </>
  );
}
export default ProductView;
