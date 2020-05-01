import React from "react";
import items from "../../api/api-items";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

function ProductView(props) {
  // console.log(props.match.params.id)

  // We are looking to see if the item "ID" matches the "ID" in the URL
  const product = items.products.find(
    (obj) => props.match.params.id === obj._id
  );

  return (
    <>
      <div>
        <Link to="/">Back to Results</Link>
      </div>
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
                <li> Status : {product.status}</li>
                <li>
                  {" "}
                  Qty :
                  <select>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </li>
                <li>
                  <Button variant="success">Add To Cart</Button>
                </li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
export default ProductView;
