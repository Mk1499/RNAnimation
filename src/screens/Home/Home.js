import React, {Component} from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  CardItem,
  Left,
  Right,
  Body,
  Icon,
  Text,
  View,
} from 'native-base';

const {height: Hight, width: Width} = Dimensions.get('screen');

export default class AnatomyExample extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Header style={styles.header} />
        <View padder style={styles.head}>
          {/* <CardItem> */}
          <View style={styles.headText}>
            <Left>
                <Icon name="grid" color="#eee" />
            </Left>
            <Body style={{flexDirection: 'column'}}>
              <View>
                <Text style={styles.smallText}>andsjfdfj</Text>
              </View>
              <View>
                <Title>The Fitz Bar</Title>
              </View>
            </Body>
            <Right>
              <View style={{backgroundColor:"#333",width:20,alignItems:"center"}}>
                <Icon name="create" color="white"></Icon>
              </View>
            </Right>
          </View>
          {/* </CardItem> */}
        </View>
        <Content>
          <Text>This is Content Section</Text>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: '#446ad7',
  },
  head: {
    backgroundColor: '#446ad7',
    flexDirection: 'row',
    color: '#eee',
    height: 0.3 * Hight,
    // borderColor: 'red',
    // borderWidth: 2,
  },
  headText: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    width: '100%',
  },
  smallText: {
    color: '#eee',
    fontSize: 12,
   textAlign:'left',
   flexDirection:"row"
  },
});
