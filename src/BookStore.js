// React classes
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// Components import
import BookList from './Components/BookList';
import ShippingDetails from './Components/ShippingDetails';
import DeliveryDetails from './Components/DeliveryDetails';
import Confirmation from './Components/Confirmation';
import Success from './Components/Success';
// High order Component
import SetIntervalComponent from './Components/SetIntervalComponent';
// Modal component
import ModalAlertTimeout from './modals/ModalAlertTimeout';

// Converting component using high order component adding new features
const BookListWithSetInterval = SetIntervalComponent(BookList);
const ShippingDetailsWithSetInterval = SetIntervalComponent(ShippingDetails);
const DeliveryDetailsWithSetInterval = SetIntervalComponent(DeliveryDetails);
const ConfirmationWithSetInterval = SetIntervalComponent(Confirmation);

class BookStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      formValues: {},
      cartTimeout: (60*15)
    };
  }

  updateCartTimeout(timeout){
    // console.log("Timeout: " + timeout);
    this.setState({cartTimeout: timeout}, function () {
        // console.log("CartTimeout: " + this.state.cartTimeout);
    });
  }

  updateFormData(formData) {
    var formValues = Object.assign({}, this.state.formValues, formData);
    var nextStep = this.state.currentStep + 1;
    this.setState({currentStep: nextStep, formValues: formValues});
  }

  updateBack() {
    var backStep = this.state.currentStep - 1;
    this.setState({currentStep: backStep})
  }

  alertCartTimeout(){
    ReactDOM.render(<ModalAlertTimeout />, document.getElementById('modalAlertTimeout'));
    this.setState({
      currentStep: 1,
      formValues: {},
      cartTimeout: (60*15)
    });
  }

  render() {
    switch (this.state.currentStep) {
      case 1:
        return <BookListWithSetInterval updateFormData={this.updateFormData.bind(this)}
          books={this.props.books}
          formValues={this.state.formValues}
          cartTimeout={this.state.cartTimeout}
          updateCartTimeout={this.updateCartTimeout.bind(this)}
          alertCartTimeout={this.alertCartTimeout.bind(this)} />;
      case 2:
        return <ShippingDetailsWithSetInterval updateFormData={this.updateFormData.bind(this)}
          updateBack={this.updateBack.bind(this)}
          formValues={this.state.formValues}
          cartTimeout={this.state.cartTimeout}
          updateCartTimeout={this.updateCartTimeout.bind(this)}
          alertCartTimeout={this.alertCartTimeout.bind(this)} />;
      case 3:
        return <DeliveryDetailsWithSetInterval updateFormData={this.updateFormData.bind(this)}
          updateBack={this.updateBack.bind(this)}
          cartTimeout={this.state.cartTimeout}
          updateCartTimeout={this.updateCartTimeout.bind(this)}
          alertCartTimeout={this.alertCartTimeout.bind(this)} />;
      case 4:
        return <ConfirmationWithSetInterval data={this.state.formValues}
          updateFormData={this.updateFormData.bind(this)}
          cartTimeout={this.state.cartTimeout}
          updateCartTimeout={this.updateCartTimeout.bind(this)}
          alertCartTimeout={this.alertCartTimeout.bind(this)} />;
      case 5:
        return <Success data={this.state.formValues}/>;
      case 10:
        /* Handle the case of Cart timeout */
        return <div><h2>Your cart timed out, Please try again!</h2></div>;
      default:
        return <BookList updateFormData={this.updateFormData.bind(this)} />;
    }
  }
};

export default BookStore;
