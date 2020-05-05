import React, {useEffect, useState} from "react";
import { Form, Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { itemSave } from '../../actions/itemActions'


function CreateProduct(props) {
    //HOOKS used to acces the state
    const [ name, setName]= useState('')
    const [ price, setPrice]= useState('')
    const [ image, setImage]= useState('')
    const [ category, setCategory]= useState('')
    const [ qtyInStock, setQtyInStock]= useState('')
    const [ description, setDescription]= useState('')

    const saveItem = useSelector(state => state.saveItem)
    const {loading : loadingSave, success : successSave, error : errorSave} = saveItem;
    const dispatch = useDispatch();

    useEffect(() => {
        
        return () => {
            //
        }
    }, [])


    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(itemSave({name, price, image, category, qtyInStock, description}))
    }


    return (
        <Form onSubmit={submitHandler}>
            <h2>Create NEW Product</h2>
            <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
            </li>
            <Form.Group controlId="formBasicName">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Product Name" value={name} name="name" id='name' onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPrice">
                <Form.Label htmlFor="price">Price</Form.Label>
                <Form.Control type="text" placeholder="Enter Price Value" value={price} name="price" id='price' onChange={(e) => setPrice(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formImage">
                <Form.Label htmlFor="image">Image</Form.Label>
                <Form.Control type="text"  name="image" id='image' value={image} onChange={(e) => setImage(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formCategory">
                <Form.Label htmlFor="category">Category</Form.Label>
                <Form.Control type="text" name="category" value={category} id='category' onChange={(e) => setCategory(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formQtyInStock">
                <Form.Label htmlFor="qtyInStock">Qty In Stock</Form.Label>
                <Form.Control type="text" placeholder="Enter Quantity" value={qtyInStock} name="qtyInStock" id='qtyInStock' onChange={(e) => setQtyInStock(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formDescription">
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control as="textarea" value={description} placeholder="Enter Description" name="description" id='description' onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            
            <Button variant="primary" type="submit">
                Create
            </Button>
        </Form>
        
    );
}
export default CreateProduct;