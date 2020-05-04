import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Cart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            results:[]
        }
        
    }

    componentDidMount = (params)=>{
        let api = "https://openapi.etsy.com/v2/listings/active?api_key=w4mv8soose78gb7bu5lup3k7"
        fetch(api)
        .then(res=>{
            return res.json()
        })
        .then(data=>{
            this.props.dataFetch(data.results)
            this.setState({
                results:data.results,
            })
        })
    }


    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Cart
