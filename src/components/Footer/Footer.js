import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import {Icon, Card, CardItem, Content, Left, Body, Right} from 'native-base';

const {height: Height, width: Width} = Dimensions.get('screen');
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footerHeight: new Animated.Value(100),
      clicked: false,
    };
  }
  btnClicked = () => {
    // alert("Clicked") ;
    Animated.parallel([
      Animated.timing(this.state.footerHeight, {
        toValue: 1000,
        duration: 1000,
      }),
    ]).start();
    this.setState({
      clicked: true,
    });

    setTimeout(() => this.setState({footerHeight: Height}), 550);
  };

  render() {
    return (
      <Animated.View
        style={[{height: this.state.footerHeight}, styles.container]}>
        {!this.state.clicked ? (
          <CardItem>
            <Left style={styles.left}>
              <Icon name="grid" />
            </Left>
            <TouchableOpacity style={styles.btn} onPress={this.btnClicked}>
              <Text style={{color: '#eee', fontWeight: 'bold'}}>SEND</Text>
            </TouchableOpacity>
            <Right style={styles.right}>
              <Icon name="settings" />
            </Right>
          </CardItem>
        ) : (
          <View style={styles.doneView}>
            <Icon name="done-all" style={styles.doneIcon} />
          </View>
        )}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    bottom: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: Width,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: '#59d89d',
    width: 0.5 * Width,
    height: 0.1 * Height,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: -0.05 * Width,
  },
  doneView: {
    backgroundColor: '#59d89d',
    alignSelf: 'center',
    width: 0.3 * Width,
    height: 0.3 * Width,
    borderRadius: 0.15 * Width,
    alignItems: 'center',
    justifyContent: 'center',
},
doneIcon: {
    color: '#eee',
    borderWidth:1,
    borderColor:"#eee",
    padding:20,
    borderRadius:0.15 * Width
    

  },
});
