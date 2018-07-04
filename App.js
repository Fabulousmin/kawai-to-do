import React, {Component} from 'react';
import { StyleSheet,
         Text,
         View,
         StatusBar,
         Dimensions,
         TextInput,
         Platform,
         ScrollView,
      } from 'react-native';

import ToDo from "./ToDo";

//윈도우 사이즈 받아25
const {height, width} = Dimensions.get("window");

export default class App extends React.Component {

  state = {
    newToDo: "",
    isCompleted: false,
    toDoValue:"",
  };

  render() {
    const {newToDo} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"/>
        <Text style={styles.title}>Kawai To Do</Text>
        <View style={styles.card}>
          <TextInput style={styles.input}
            placeholder={"New To Do"}
            placeholderTextColor ={'#999'}
            value = {newToDo}
            onChangeText={this._controlNewToDo}
            returnKeyType ={"done"}
            autoCorrect={false}
            /> //리턴키 줄바꿈이아니라 done으로 TextInput 문서 더 보자
          <ScrollView contentContainerStyle={styles.toDos}>
            <ToDo text ={"hello I'm to do "} /> //text 를 속성으로받음.
          </ScrollView>
        </View>
      </View>
    );
  }

  _controlNewToDo = text => {  //gets the text from events
    this.setState({
      newToDo: text            //statef에 받은 값 저장
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F23657',
    alignItems: 'center'
  },
  title: {
    color:"white",
    fontSize: 30,
    marginTop: 100,
    fontWeight:"200",
    marginBottom: 30
  },
  card:{
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    ...Platform.select({
      ios: {
        shadowColor:"rgb(50,50,50)",
        shadowOpacity:1,
        shadowRadius:5,
        shadowOffset:{
          height:-1,
          width:0
        }
      },
      android:{
        elevation: 3,
      }
    })
  },

  input:{
    padding:20,
    borderBottomColor: "#bbb",
    borderBottomWidth: 1,
    fontSize:25
  },
  toDos:{
    marginLeft: 15,
    width: width -50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection : "row",
    alignItems: 'center'
  },
  text: {
  fontWeight:"600",
  fontSize: 20
},


});
