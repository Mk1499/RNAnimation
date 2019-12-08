import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Animated,
  PanResponder
} from 'react-native';
import {Header, Icon} from 'native-base';
// import Icon from 'react-native-ionicons';

import SmallCard from '../../components/SmallCard/SmallCard';
import ListCard from '../../components/ListCard/ListCard';
import Footer from '../../components/Footer/Footer';

const {height: Height, width: Width} = Dimensions.get('screen');

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: [],
      selected: [],
      pan: new Animated.ValueXY()
    };

    
  }

  componentDidMount() {
    this.setState({
      all: [
        { id:1,
          name: 'Messi',
          img:
            'https://asset.otro.com/image/authenticated/s--GMXcYeHD--/v1/app/stars/leomessi/avatar/avatar-leomessi',
          price: '1000',
        },
        {
          id:2,
          name: 'Neymar',
          img:
            'https://i.pinimg.com/564x/df/84/9e/df849ed9c7c1099fb34323210ac00533.jpg',
          price: '3032',
        },
        {
          id:3,
          name: 'SRK',
          img:
            'https://i.pinimg.com/originals/11/47/03/1147038facc1a5e886aa7be517c9e319.jpg',
          price: '123',
        },
      ],
      selected : []
    });
  }

  _handleSelect = (player) => {
    // alert(player.name)
    this.setState({
      all: this.state.all.filter((p) => p.id != player.id),
      selected : [player,...this.state.selected]
    })
  }

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
                      borderRadius:10
                    },
                    styles.icon,
                  ]}
                  name="create"></Icon>
              </View>
            </View>

            <ScrollView horizontal={true} style={styles.SmallCardContainer}>
        
              <View style={styles.add}>
                <Icon name="add" style={styles.addIcon} /> 
              </View>
              {
              this.state.all.map(player => (

                  <SmallCard key={player.id} data={player} onPress={()=>this._handleSelect(player)} />
              ))
            
            }
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
              ) :
              <>
              {this.state.selected.map((player)=>
              <ListCard
                key={Math.random()}
                data={player}/>
              )}
         
              </>
              }
            </View>
          </Animated.View>
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
    zIndex:222,
  },
  Tasks:{
    padding:10,
    borderStyle:"dashed",
    borderWidth:1 ,
    borderRadius: 10,
    marginHorizontal : 10,
    borderColor : 'grey',
    // maxHeight:0.4*Height ,
    marginBottom:0.1*Height , 
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
  add:{
   
    margin : 10 , 
    width:0.25*Width , 
    height: 0.22 * Height, 
    backgroundColor: "#333" , 
    alignItems:'center',
    justifyContent:'center',
    borderRadius:20,
    zIndex:20
  },
  addIcon:{
    fontSize:40,
    color:'#eee'
  }
});
