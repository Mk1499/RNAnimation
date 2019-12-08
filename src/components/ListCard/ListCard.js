import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {
  Icon,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Text,
  Content,
} from 'native-base';

const {height: Height, width: Width} = Dimensions.get('screen');

export default class ListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listWidth:
        this.props.index == 0
          ? new Animated.Value(10)
          : new Animated.Value(0.8 * Width),
    };
  }
  componentDidMount() {
    Animated.timing(this.state.listWidth, {
      toValue: 0.8 * Width,
      duration: 800,
    }).start();
  }

  _handleDeSelection=()=>{
    this.props.onPress(this.props.data)
}

  render() {
    return (
      <TouchableOpacity onPress={this._handleDeSelection}>
        <Content padder>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Animated.View
              style={[{width: this.state.listWidth}, styles.container]}>
              <CardItem>
                <Left>
                  <Image
                    source={{
                      uri: this.props.data.img,
                    }}
                    style={styles.img}
                  />
                  <Text style={styles.name}> {this.props.data.name} </Text>
                </Left>
                <Body />
                <Icon name="logo-usd" />
                <Right>
                  <Text style={styles.price}>{this.props.data.price}</Text>
                </Right>
              </CardItem>
            </Animated.View>
          </View>
        </Content>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    // width:0.2*Width
  },
  img: {
    width: 0.1 * Width,
    height: 0.1 * Width,
    borderRadius: 0.05 * Width,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
