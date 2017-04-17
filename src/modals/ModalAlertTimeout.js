import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class ModalAlertTimeout extends Component {

  componentDidMount(){
    setTimeout(()=> {
      let timeoutModal = ReactDOM.findDOMNode(this.refs.timeoutModal);
      $(timeoutModal).modal('show');
      $(timeoutModal).on('hidden.bs.modal', this.unMountComponent.bind(this));
    }, 100);
  }


  unMountComponent() {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
  }

  render() {
    return (
      <div className="modal fade" ref='timeoutModal'>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                aria-hidden="true">×</span></button>
              <h4 className="modal-title">Timeout</h4>
            </div>
            <div className="modal-body">
              <p>The cart has timed-out. Please try again!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ModalAlertTimeout;
