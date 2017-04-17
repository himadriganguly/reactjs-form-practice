import React, {Component} from 'react';

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

export default DeliveryDetails;
