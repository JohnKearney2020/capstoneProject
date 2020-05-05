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
  console.log("This is Product", product)
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
                  <img src={product.MainImage ? product.MainImage.url_570xN : "null"} alt={product.image}></img>
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
                      <li> Price : ${product.price}</li>
                      <li> Status : {product.state} </li>
                      <li>
                        {" "}
                        Qty :
                        <select value ={qty} onChange={ (e)=> { setQty( e.target.value ) }}>
                          {[...Array(product.qtyInStock).keys()].map(param =>
                            <option key={param + 1} value={ param + 1 }>{ param + 1 }</option>
                            )}
                        </select>
                      </li>
                      <li>
                        {product.state > 0 &&
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

  export default ProductView
































// import React from "react";
// import items from "../../api/api-items";
// import { Link } from "react-router-dom";
// import { Container, Row, Col, Button, Card } from "react-bootstrap";

// function ProductView(props) {
//   // console.log(props.match.params.id)

//   // We are looking to see if the item "ID" matches the "ID" in the URL
//   const product = items.products.find(
//     (obj) => props.match.params.id === obj._id
//   );

//   return (
//     <>
//       <div>
//         <Link to="/">Back to Results</Link>
//       </div>
//       <Container>
//         <Row className="product-details">
//           <Col className="product-image">
//             <img src={product.image} alt="product"></img>
//           </Col>
//           <Col className="details-info">
//             <ul>
//               <li>
//                 <b>{product.title}</b>
//               </li>
//               <li>
//                 {product.rating} Stars ({product.numOfRev}) Reviews
//               </li>
//               <li>
//                 <b>${product.price}</b>
//               </li>
//               <li>Description: {product.description}</li>
//             </ul>
//           </Col>
//           <Col className="cart-action">
//             <Card border="dark" style={{ width: "18rem", padding: "1rem" }}>
//               <ul>
//                 <li> Price : {product.price}</li>
//                 <li> Status : {product.status}</li>
//                 <li>
//                   {" "}
//                   Qty :
//                   <select>
//                     <option>1</option>
//                     <option>2</option>
//                     <option>3</option>
//                     <option>4</option>
//                   </select>
//                 </li>
//                 <li>
//                   <Button variant="success">Add To Cart</Button>
//                 </li>
//               </ul>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }
// export default ProductView;
