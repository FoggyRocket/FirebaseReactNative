/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Alert
} from 'react-native';
import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body,Item,Icon,Input,Spinner}  from 'native-base'
import {ListComponent} from "./src/component/ListComponent";
import * as firebase from 'firebase';



type Props = {};
export default class App extends Component<Props> {
  state={
    lista:[],
    item:'',
      elId:null,
  }

    componentWillMount(){
      firebase.database().ref("listita")
          .once("value")
          .then(snap=>{
              this.setState({lista:snap.val()})
          })
  }

  //
  handleChange=(item)=>{
    console.log("aqui va el item", item)
      this.setState({item:item})
  }
  //
  Send=()=>{
      let {item,lista}=this.state;
      var ob = {name:item}
      lista.push(ob)
      this.setState({lista:lista, item:''})
      //Hack para no pelear con los ids
      this.firebaseUpdate()
  }
  firebaseUpdate=()=>{
      let {lista}=this.state
      var updates={listita:lista}
      firebase.database().ref().update(updates)
  }
  //
  confirmDelete=(i)=>{
      this.setState({elId:i})
      const message = '¿Seguro que quieres eliminarlo?';
      Alert.alert(
          'ELIMINAR',
          message,
          [
              {
                  text: 'Borrar',
                  onPress:this.deleteItem
              },
              {
                  text: 'Cancelar',
                  onPress: null
              }
          ]
      )
  }
  //
  deleteItem=()=>{
        let{lista,elId}=this.state
        lista.splice(elId,1)
       this.setState({lista:lista})
      this.firebaseUpdate()

  }

  render() {
    let {lista,item}=this.state
    return (

        <Container >
            <Header>
              <Left>
                <Button transparent>
                  <Icon name='menu'/>
                </Button>
              </Left>
              <Body>
                <Title>
                  Firebase
                </Title>
              </Body>
              <Right/>
            </Header>

          <Content>
              <Item style={styles.elinput}>
                  <Input placeholder="Aqui puedes escribir!!"
                    value={this.state.item}
                    onChangeText={this.handleChange}
                  />
                  <Button transparent onPress={this.Send} disabled={item === '' ? true : false }>
                      <Icon active name='send' />
                  </Button>
              </Item>
              {lista.length < 1 ?
                  <Spinner color="blue"/>
                  :
                  <ListComponent
                        lista={lista}
                        onDelete={this.confirmDelete}
                    />
              }

          </Content>

            <Footer>
                <FooterTab>
                    <Button full>
                        <Text>React Native</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textito: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  elinput:{
      marginBottom:20
  },

});
//Instalación de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDzgZapMUPFkg6dlte4W3au-E0zHR7Vp50",
    authDomain: "test-4341e.firebaseapp.com",
    databaseURL: "https://test-4341e.firebaseio.com",
    projectId: "test-4341e",
    storageBucket: "test-4341e.appspot.com",
    messagingSenderId: "301332539094"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);