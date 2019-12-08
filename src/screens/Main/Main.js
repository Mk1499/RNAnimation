import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import {Header, Icon} from 'native-base';
// import Icon from 'react-native-ionicons';

import SmallCard from '../../components/SmallCard/SmallCard';
import ListCard from '../../components/ListCard/ListCard';
import Footer from '../../components/Footer/Footer';

import Sound from 'react-native-sound';

const {height: Height, width: Width} = Dimensions.get('screen');

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      selected: [],
      pan: new Animated.ValueXY(),
      totalAmount: 0,
      lastId: 3,
    };

    Sound.setCategory('Playback');
  }

  componentDidMount() {
    this.setState({
      all: [
        {
          id: 1,
          name: 'Messi',
          img:
            'https://asset.otro.com/image/authenticated/s--GMXcYeHD--/v1/app/stars/leomessi/avatar/avatar-leomessi',
          price: 1000,
        },
        {
          id: 2,
          name: 'Neymar',
          img:
            'https://i.pinimg.com/564x/df/84/9e/df849ed9c7c1099fb34323210ac00533.jpg',
          price: 3032,
        },
        {
          id: 3,
          name: 'SRK',
          img:
            'https://i.pinimg.com/originals/11/47/03/1147038facc1a5e886aa7be517c9e319.jpg',
          price: 123,
        },
      ],
      selected: [],
    });
  }

  // select task
  _handleSelect = player => {
    // alert(player.name)

    this.playSound();

    this.setState({
      all: this.state.all.filter(p => p.id != player.id),
      selected: [player, ...this.state.selected],
      totalAmount: this.state.totalAmount + player.price,
    });
  };

  // add new task
  addTask = () => {
    this.setState({
      all: [
        {
          id: this.state.lastId + 1,
          name: 'SRK',
          img:
            'https://i.pinimg.com/originals/11/47/03/1147038facc1a5e886aa7be517c9e319.jpg',
          price: 123,
        },
        ...this.state.all,
      ],
      lastId: this.state.lastId + 1,
    });
  };

  _handleDeSelect = player => {
    this.playSound();

    this.setState({
      selected: this.state.selected.filter(p => p.id != player.id),
      all: [player, ...this.state.all],
      totalAmount: this.state.totalAmount - player.price,
    });
  };

  playSound = () => {
    const selectURI = require('../../assets/audio/paper.mp3');
    let selectSound = new Sound(selectURI, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log(
        'duration in seconds: ' +
          selectSound.getDuration() +
          'number of channels: ' +
          selectSound.getNumberOfChannels(),
      );

      // Play the sound with an onEnd callback
      selectSound.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  };

  render() {
    return (
      <>
        <ScrollView>
          <Header style={styles.header} />
          <Animated.View style={styles.container}>
            <View style={styles.pageTop}>
              <Icon name="radio-button-off" style={styles.icon} />
              <View style={styles.headView}>
                <Text style={styles.headSmall}>New Multi Invoice</Text>
                <Text style={styles.headBig}>The Fitz Bar</Text>
              </View>
              <View>
                <Icon
                  style={[
                    {
                      backgroundColor: '#333',
                      padding: 0.02 * Width,
                      opacity: 0.4,
                      borderRadius: 10,
                    },
                    styles.icon,
                  ]}
                  name="create"></Icon>
              </View>
            </View>

            <ScrollView horizontal={true} style={styles.SmallCardContainer}>
              <TouchableOpacity style={styles.add} onPress={this.addTask}>
                <Icon name="add" style={styles.addIcon} />
              </TouchableOpacity>
              {this.state.all.map(player => (
                <SmallCard
                  key={player.id}
                  data={player}
                  onPress={() => this._handleSelect(player)}
                />
              ))}
            </ScrollView>
            <View style={styles.Tasks}>
              {this.state.selected.length <= 0 ? (
                <>
                  <Image
                    source={{
                      uri:
                        'https://cdn2.iconfinder.com/data/icons/hand-gestures-1-1/128/Drag-Drop-Down-Relocate-Put-Hand-Move-512.png',
                    }}
                    style={styles.draggingImg}
                  />
                  <Text style={styles.dragText}> Drag & Drop Contacts </Text>
                </>
              ) : (
                <>
                  {this.state.selected.map((player, i) => (
                    <ListCard
                      key={Math.random()}
                      data={player}
                      index={i}
                      onPress={() => this._handleDeSelect(player)}
                    />
                  ))}
                </>
              )}
            </View>
          </Animated.View>
          {this.state.totalAmount > 0 ? (
            <View style={styles.amountView}>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>Amount: </Text>
              <View style={styles.rightPrice}>
                <Icon name="logo-usd" style={styles.usdIcon} />
                <Text style={{fontWeight: 'bold'}}>
                  {this.state.totalAmount}
                </Text>
              </View>
            </View>
          ) : null}
        </ScrollView>
        <Footer />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: '#446ad7',
  },
  pageTop: {
    paddingHorizontal: 0.1 * Width,
    backgroundColor: '#446ad7',
    flexDirection: 'row',
    height: 0.25 * Height,
  },
  icon: {
    color: '#eee',
    marginRight: 0.1 * Width,
  },
  headView: {
    marginRight: 0.3 * Width,
  },
  headSmall: {
    color: '#eee',
    fontSize: 12,
  },
  headBig: {
    color: '#eee',
    fontSize: 20,
  },
  SmallCardContainer: {
    position: 'relative',
    top: -0.1 * Height,
    zIndex: 222,
  },
  Tasks: {
    padding: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    borderColor: 'grey',
    // maxHeight:0.4*Height ,
    marginBottom: 0.1 * Height,
  },
  draggingImg: {
    width: Width,
    height: 0.1 * Height,
    resizeMode: 'contain',
  },
  dragText: {
    alignSelf: 'center',
    marginTop: 0.03 * Height,
    fontSize: 15,
    color: 'grey',
  },
  add: {
    margin: 10,
    width: 0.25 * Width,
    height: 0.22 * Height,
    backgroundColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    zIndex: 20,
  },
  addIcon: {
    fontSize: 40,
    color: '#eee',
  },
  amountView: {
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
  },
  rightPrice: {
    flexDirection: 'row',
    position: 'relative',
    left: 0.6 * Width,
  },
  usdIcon: {
    fontSize: 18,
  },
});
