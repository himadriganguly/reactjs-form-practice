import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SetIntervalComponent from './components/set_interval_component';
import ModalAlertTimeout from './modals/modal_alert_timeout';

class BookList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedBooks: this.props.formValues.selectedBooks != null ? this.props.formValues.selectedBooks : [],
      error: false,
      cartTimeout: this.props.cartTimeout
    };
  }

  _renderBook = book => {
    return (
      <div className="checkbox" key={book.id}>
        <label>
          <input type="checkbox" value={book.name} checked={this.state.selectedBooks.indexOf(book.name) == -1 ? false : true}
                 onChange={this.handleSelectedBooks.bind(this)}/>
          {book.name} -- {book.author}
        </label>
      </div>
    );
  }

  _renderError() {
    if (this.state.error) {
      return (
        <div className="alert alert-danger">
          {this.state.error}
        </div>
      );
    }
  }

  handleSelectedBooks(event) {
    var selectedBooks = this.state.selectedBooks;
    var index = selectedBooks.indexOf(event.target.value);

    if (event.target.checked) {
      if (index === -1)
        selectedBooks.push(event.target.value);
    } else {
      selectedBooks.splice(index, 1);
    }

    this.setState({selectedBooks: selectedBooks });
  }

  handleSubmit(event) {
    event.preventDefault();

    if(this.state.selectedBooks.length === 0) {
      this.setState({error: 'Please choose atleast one book to continue'});
    } else {
      this.setState({error: false});
      this.props.updateFormData({ selectedBooks: this.state.selectedBooks });
    }
  }

  render() {
    var errorMessage = this._renderError();
    var minutes = Math.floor(this.state.cartTimeout / 60);
    var seconds = this.state.cartTimeout - minutes * 60;

    return (
      <div>
        <h3> Choose from wide variety of books available in our store </h3>
        {errorMessage}
        <form onSubmit={this.handleSubmit.bind(this)}>
          { this.props.books.map((book) => { return (this._renderBook(book)); })}
          <input type="submit" className="btn btn-success" />
        </form>
        <div className="well">
          <span className="glyphicon glyphicon-time" aria-hidden="true"></span> You have {minutes} Minutes, {seconds} Seconds, before confirming order
        </div>
      </div>
    );
  }
};

BookList.defaultProps = {
  books: [
        { id: 1, name: 'Zero to One', author: 'Peter Thiel' },
        { id: 2, name: 'Monk who sold his Fearrary', author: 'Robin Sharma' },
        { id: 3, name: 'Wings of Fire', author: 'A.P.J. Abdul Kalam' }
      ]
}

const BookListWithSetInterval = SetIntervalComponent(BookList);

class ShippingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      fullName: this.props.formValues.fullName != null ? this.props.formValues.fullName : '',
      contactNumber: this.props.formValues.contactNumber != null ? this.props.formValues.contactNumber : '',
      shippingAddress: this.props.formValues.shippingAddress != null ? this.props.formValues.shippingAddress : '',
      cartTimeout: this.props.cartTimeout
    };
    this.handleChange = this.handleChange.bind(this);
  }

  _renderError() {
    if (this.state.error) {
      return (
        <div className="alert alert-danger">
          {this.state.error}
        </div>
      );
    }
  }

  _validateInput() {
    if (this.state.fullName === '') {
      this.setState({error: "Please enter full name"});
    } else if (this.state.contactNumber === '') {
      this.setState({error: "Please enter contact number"});
    } else if (this.state.shippingAddress === '') {
      this.setState({error: "Please enter shipping address"});
    } else {
      this.setState({error: false});
      return true;
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    var formData = { fullName: this.state.fullName,
                     contactNumber: this.state.contactNumber,
                     shippingAddress: this.state.shippingAddress };

    if (this._validateInput()) {
      this.props.updateFormData(formData);
    }
  }

  handleChange(event, attribute) {
    var newState = this.state;
    newState[attribute] = event.target.value;
    this.setState(newState);
  }

  render() {
    var errorMessage = this._renderError();
    var minutes = Math.floor(this.state.cartTimeout / 60);
    var seconds = this.state.cartTimeout - minutes * 60;

    return (
      <div>
        <h1>Enter your shipping information.</h1>
        {errorMessage}
        <div style={{width: 200}}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <input className="form-control"
                     type="text"
                     placeholder="Full Name"
                     value={this.state.fullName}
                     onChange={(event) => this.handleChange(event, 'fullName')} />
            </div>

            <div className="form-group">
              <input className="form-control"
                     type="text"
                     placeholder="Contact number"
                     value={this.state.contactNumber}
                     onChange={(event) => this.handleChange(event, 'contactNumber')}/>
            </div>

            <div className="form-group">
              <input className="form-control"
                     type="text"
                     placeholder="Shipping Address"
                     value={this.state.shippingAddress}
                     onChange={(event) => this.handleChange(event, 'shippingAddress')} />
            </div>

            <div className="form-group">
              <button type="submit"
                      ref="submit"
                      className="btn btn-success">
                Submit
              </button>
                <button type="button" className="btn btn-success back" onClick={this.props.updateBack}>Back</button>
            </div>
          </form>
        </div>
        <div className="well">
          <span className="glyphicon glyphicon-time" aria-hidden="true"></span> You have {minutes} Minutes, {seconds} Seconds, before confirming order
        </div>
      </div>
    );
  }
};

const ShippingDetailsWithSetInterval = SetIntervalComponent(ShippingDetails);

class DeliveryDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deliveryOption: 'Primary',
      cartTimeout: this.props.cartTimeout
    };
  }

  handleChange(event) {
    this.setState({ deliveryOption: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateFormData(this.state);
  }

  render() {
    var minutes = Math.floor(this.state.cartTimeout / 60);
    var seconds = this.state.cartTimeout - minutes * 60;

    return (
      <div>
        <h1>Choose your delivery options here.</h1>
        <div style={{width:200}}>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="radio">
              <label>
                <input type="radio"
                       checked={this.state.deliveryOption === "Primary"}
                       value="Primary"
                       onChange={this.handleChange.bind(this)} />
                Primary -- Next day delivery
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio"
                       checked={this.state.deliveryOption === "Normal"}
                       value="Normal"
                       onChange={this.handleChange.bind(this)} />
                Normal -- 3-4 days
              </label>
            </div>

            <button className="btn btn-success">
              Submit
            </button>
            <button type="button" className="btn btn-success back" onClick={this.props.updateBack}>Back</button>
          </form>
        </div>
        <div className="well">
          <span className="glyphicon glyphicon-time" aria-hidden="true"></span> You have {minutes} Minutes, {seconds} Seconds, before confirming order
        </div>
      </div>
    );
  }
};

const DeliveryDetailsWithSetInterval = SetIntervalComponent(DeliveryDetails);

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

class Success extends Component{
  render() {
    var numberOfDays = "1 to 2 ";

    if (this.props.data.deliveryOption === 'Normal') {
      numberOfDays = "3 to 4 ";
    }
    return (
      <div>
        <h2>
          Thank you for shopping with us {this.props.data.fullName}.
        </h2>
        <h4>
          You will soon get {this.props.data.selectedBooks.join(", ")} at {this.props.data.shippingAddress} in approrximately {numberOfDays} days.
        </h4>
      </div>
    );
  }
};

class Confirmation extends Component{
  constructor(props) {
    super(props);
    this.state = {cartTimeout: this.props.cartTimeout};
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateFormData(this.props.data);
  }

  render() {
    var minutes = Math.floor(this.state.cartTimeout / 60);
    var seconds = this.state.cartTimeout - minutes * 60;

    return (
      <div>
        <h1>Are you sure you want to submit the data?</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div>
            <strong>Full Name</strong> : { this.props.data.fullName }
          </div><br/>
          <div>
            <strong>Contact Number</strong> : { this.props.data.contactNumber }
          </div><br/>
          <div>
            <strong>Shipping Address</strong> : { this.props.data.shippingAddress }
          </div><br/>
          <div>
            <strong>Selected books</strong> : { this.props.data.selectedBooks.join(", ") }
          </div><br/>
          <button className="btn btn-success">
            Place order
          </button>
        </form>
        <div className="well">
          <span className="glyphicon glyphicon-time" aria-hidden="true"></span> You have {minutes} Minutes, {seconds} Seconds, before confirming order
        </div>
      </div>
    );
  }
};

const ConfirmationWithSetInterval = SetIntervalComponent(Confirmation);

export default BookStore;
