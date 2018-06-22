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
  View,
  Alert
} from 'react-native';
import {Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body,Item,Icon,Input,}  from 'native-base'
import {ListComponent} from "./src/component/ListComponent";



type Props = {};
export default class App extends Component<Props> {
  state={
    lista:[
        {name:'Perro'},
        {name:"Gato"},
        {name:"Delfin"},
        {name:"Pikachu"}
    ],
    item:'',
      ID:null,
  }
  handleChange=(item)=>{
    console.log("aqui va el item", item)
      this.setState({item:item})
  }
  Send=()=>{
      let {item,lista}=this.state;
      var ob = {name:item}
      lista.push(ob)
      this.setState({lista:lista, item:''})
      console.log("Enviare",ob)
  }
  confirmDelete=(i)=>{
      this.setState({ID:i})
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
  deleteItem=()=>{
        let{lista,ID}=this.state
        lista.splice(ID,1)
       this.setState({lista:lista})

  }

  render() {

    return (
        <Container>
            <Header>
              <Left>
                <Button transparent>
                  <Icon name='menu'/>
                </Button>
              </Left>
              <Body>
                <Title>
                  Firebase + RN
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
                  <Button transparent onPress={this.Send}>
                      <Icon active name='send' />
                  </Button>
              </Item>
            <ListComponent
                lista={this.state.lista}
                onDelete={this.confirmDelete}
            />
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
  }
});
