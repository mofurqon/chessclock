import React from 'react';
import PropTypes from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AppState
} from 'react-native';
import _ from 'lodash';
import {sprintf} from 'sprintf-js';

class CountDown extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    size: PropTypes.number,
    until: PropTypes.number,
    onChange: PropTypes.func,
    onPress: PropTypes.func,
    onFinish: PropTypes.func,
    increment: PropTypes.number,
  };

  state = {
    until: Math.max(this.props.until, 0),
    lastUntil: null,
    wentBackgroundAt: null,
  };

  constructor(props) {
    super(props);
    this.timer = setInterval(this.updateTimer, 100);
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.until !== prevProps.until || this.props.id !== prevProps.id) {
      this.setState({
        lastUntil: prevState.until,
        until: Math.max(prevProps.until, 0)
      });
    }

    // time increment
    if (!this.props.running && this.props.running !== prevProps.running) {
      this.setState({
        until: this.state.until + this.props.increment
      });
    }
  }
  

  _handleAppStateChange = currentAppState => {
    const {until, wentBackgroundAt} = this.state;
    if (currentAppState === 'active' && wentBackgroundAt && this.props.running) {
      const diff = (Date.now() - wentBackgroundAt) / 100.0;
      this.setState({
        lastUntil: until,
        until: Math.max(0, until - diff)
      });
    }
    if (currentAppState === 'background') {
      this.setState({wentBackgroundAt: Date.now()});
    }
  }

  getTimeLeft = () => {
    const {until} = this.state;
    return {
      miliseconds: Math.floor(until % 10),
      seconds: (until / 10) % 60,
      minutes: parseInt(until / 600, 10) % 60,
      hours: parseInt((until / 10) / (60 * 60), 10) % 24,
    };
  };

  updateTimer = () => {
    if (this.state.lastUntil === this.state.until || !this.props.running) {
      return;
    }
    if (this.state.until === 1 || (this.state.until === 0 && this.state.lastUntil !== 1)) {
      if (this.props.onFinish) {
        this.props.onFinish();
      }
      if (this.props.onChange) {
        this.props.onChange(this.state.until);
      }
    }

    if (this.state.until === 0) {
      this.setState({lastUntil: 0, until: 0});
    } else {
      if (this.props.onChange) {
        this.props.onChange(this.state.until);
      }
      this.setState({
        lastUntil: this.state.until,
        until: Math.max(0, this.state.until - 1)
      });
    }
  };

  renderDigit = (d) => {
    return (
        <Text style={styles.digitTxt}>
          {d}
        </Text>
    );
  };

  renderLabel = label => {
    const {timeLabelStyle, size} = this.props;
    if (label) {
      return (
        <Text style={[
          styles.timeTxt,
          {fontSize: size / 1.8},
          timeLabelStyle,
        ]}>
          {label}
        </Text>
      );
    }
  };

  renderDoubleDigits = (digits) => {
    return (
      <View style={styles.doubleDigitCont}>
        <View style={styles.timeInnerCont}>
          {this.renderDigit(digits)}
        </View>
      </View>
    );
  };

  renderCountDown = () => {
    let newTime = [];
    const {until} = this.state;
    const {hours, minutes, seconds, miliseconds} = this.getTimeLeft();
    if ( hours > 0 ) {
      newTime = sprintf('%02d:%02d:%02d', hours, minutes, seconds).split(':');
      
    } else if ( minutes > 0 || seconds > 20) {
      newTime = sprintf('%02d:%02d', minutes, seconds, miliseconds).split(':');
    } else {
      newTime = sprintf('%02d:%02d.%d', minutes, seconds, miliseconds).split(':');
    }

    return (
      <View
        style={styles.timeCont}
        onPress={this.props.onPress}
      >
        {this.renderDoubleDigits(newTime[0])}
        <Text style={styles.doublecolon}>:</Text>
        {this.renderDoubleDigits(newTime[1])}
        {hours != 0 && <Text style={styles.doublecolon}>:</Text>}
        {hours != 0 && this.renderDoubleDigits(newTime[2])}
      </View>
    );
  };

  render() {
    return (
      <View style={this.props.style}>
        {this.renderCountDown()}
      </View>
    );
  }
}

CountDown.defaultProps = {
  until: 0,
  size: 15,
  running: true,
};

const styles = StyleSheet.create({
  timeCont: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeTxt: {
    color: 'white',
    marginVertical: 2,
    backgroundColor: 'transparent',
  },
  timeInnerCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitCont: {
    borderRadius: 5,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doubleDigitCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitTxt: {
    color: 'black',
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
    fontSize: 18
  },
  separatorTxt: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
  },
  doublecolon: {
    fontWeight: 'bold',
    marginHorizontal: 2
  }
});

export default CountDown;
export { CountDown };