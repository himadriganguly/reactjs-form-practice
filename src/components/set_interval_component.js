var SetInterval = function(Component) {

    class SetIntervalComponent extends Component {
      constructor(props) {
        super(props)
        this.decrementCartTimer = this.decrementCartTimer.bind(this);
        this.setInterval = this.setInterval.bind(this);
      }

      componentWillMount() {
        // this.intervals = [];
        this.setInterval(this.decrementCartTimer, 1000);
      }

      componentWillReceiveProps(newProps) {
          // console.log('Component WILL RECIEVE PROPS!');
          this.setState({cartTimeout: newProps.cartTimeout});
       }

      componentWillUnmount() {
        clearInterval(this.interval);
        // this.intervals.map(clearInterval);
        // this.props.updateCartTimeout(this.state.cartTimeout);
        this.props.updateCartTimeout(this.state.cartTimeout);
      }

      setInterval() {
        this.interval = setInterval.apply(null, arguments);
        // console.log(this.interval);
        // this.intervals.push(setInterval.apply(null, arguments));
      }


      decrementCartTimer() {
        if (this.state.cartTimeout == 0) {
          this.props.alertCartTimeout();
          return;
        }
        this.setState({cartTimeout: this.state.cartTimeout - 1});
        this.props.updateCartTimeout(this.state.cartTimeout - 1);
      }
    };

    return SetIntervalComponent;
}

export default SetInterval;
