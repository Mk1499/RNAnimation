import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';

const {height: Height, width: Width} = Dimensions.get('screen');

export default class SmallCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(),
    };
    // Pan Responder

    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: Animated.event([
        null,
        {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        console.log('ASD: ', gestureState.y0);
        if (gestureState.dy > 100) this._handleSelection();
        else {
          Animated.parallel([
            Animated.spring(this.state.pan.x, {
              toValue: 0,
              bounciness: 10,
            }),
            Animated.spring(this.state.pan.y, {
              toValue: 0,
              bounciness: 10,
            }),
          ]).start();
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });
  }

  _handleSelection = () => {
    this.props.onPress(this.props.data);
  };

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };

    return (
      <Animated.View
        {...this._panResponder.panHandlers}
        style={[panStyle, styles.container]}>
        <TouchableOpacity onPress={this._handleSelection}>
          <Image source={{uri: this.props.data.img}} style={styles.image} />
          <Text style={styles.title}> {this.props.data.name} </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 10,
    maxWidth: 0.3 * Width,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: 0.2 * Width,
    height: 0.2 * Width,
    borderRadius: 0.1 * Width,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 0.05 * Width,
    textAlign: 'center',
  },
});
