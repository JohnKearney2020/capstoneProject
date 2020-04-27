import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import './App.css'
import Subtotal from './components/Subtotal/Subtotal'
import Savings from './components/Savings/Savings'
import Taxes from './components/Taxes/Taxes'
import TotalCost from './components/TotalCost/TotalCost';
import ItemDetails from './components/ItemDetails/ItemDetails'
import PromoCode from './components/PromoCode/PromoCode'
import { connect } from 'react-redux'
import { handleChange } from "./actions/promoCodeAction";

export class App extends Component {

  constructor(props) {
    super(props)
    this.state ={
      total : 200,
      savings: -3.85,
      taxes : 0,
      totalCost : 0,
      disablePromoButton : false,
    }
  }

  componentDidMount = () => {
    this.setState({
      taxes : (this.state.total + this.state.savings) * 0.0625
    },
    function(){
      this.setState({
        totalCost : this.state.total + this.state.savings + this.state.taxes
      })
    })
  }
  
  giveDiscountHandler = () => {
    if(this.props.promoCode === 'DISCOUNT') {
      this.setState({
        totalCost : this.state.totalCost * 0.9
      },

      function(){
        this.setState({
          disablePromoButton : true
        });
      })
    }
  }
  
  render() {
    return (
      <div className="container">
        <Container className='purchase-card'>
          <Subtotal price={this.state.total.toFixed(2)} />
          <Savings  price={this.state.savings}/>
          <Taxes taxes={this.state.taxes.toFixed(2)} />
          <hr />
          <TotalCost price={this.state.totalCost.toFixed(2)}/>
          <ItemDetails price={this.state.totalCost.toFixed(2)} />
          <hr />
          <PromoCode 
          giveDiscount={()=> this.giveDiscountHandler()} 
          isDisabled ={this.state.disablePromoButton}
          />
        </Container>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  promoCode : state.promoCode.value
})

export default connect(mapStateToProps, {handleChange})(App);

