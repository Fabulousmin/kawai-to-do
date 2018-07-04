import React, {Component} from 'react';
import {StyleSheet,
        View,
        Text,
        TextInput,
        Dimensions,
        TouchableOpacity,
        Button,
      } from 'react-native';

const { width, height } = Dimensions.get("window")
//stateful component
export default class ToDo extends React.Component{
  state= {
    isEditing: false,
    isCompleted: false,
    toDoValue: "",
  };

  render(){
    const {isCompleted, isEditing, toDoValue} = this.state; //렌더에 집어넣는 state 값?
    const { text } = this.props; // text 라는 prop만듦

    return(
      <View style = {styles.container}>
        <View style = {styles.column}>

          <TouchableOpacity onPress = {this._toggleComplete}>
            <View style={[styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle
              ]}/> //스타일 배열로도 파싱됨
          </TouchableOpacity>
          { isEditing ? ( <TextInput style={[styles.input, styles.text]} value = {toDoValue}
          multiline = {true}/>
      ) :
            (<Text style = {[styles.text,
              isCompleted ? styles.completedText : styles.uncompletedText
            ]}
        >
            {text}</Text>)}
      </View>

      <View styles ={styles.column}>
            { isEditing ?
              ( <View style = {styles.actions}>  //편집중일때
                  <TouchableOpacity onPress ={this._finishEditing}>
                  <View style = {styles.actionContainer}>
                    <Text style={styles.actionText}>
                      ✅
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ):
             ( <View style = {styles.actions}>  //편집중 아닐때 연필 , x 모양
               <TouchableOpacity onPress ={this._startEditing}>
              <View style = {styles.actionContainer}>
                <Text style={styles.actionText}>
                  ✏️
                </Text>
              </View>
            </TouchableOpacity>
                <TouchableOpacity>
                  <View style = {styles.actionContainer}>
                    <Text style={styles.actionText}>
                    ❌
                  </Text>
                  </View>
                </TouchableOpacity>
              </View> )}
        </View>

      </View>
    );
}

  _toggleComplete = () => {
    this.setState(prevState => {
      return{
        isCompleted :  !prevState.isCompleted,
      }
    });
  }
  _startEditing = () => {
    const{text} =this.props; //prop으로 받은 text
    this.setState({
      isEditing : true,
      toDoValue : text,   //this.state 로 넣기
    });
  }
  _finishEditing = () => {
    this.setState({
      isEditing : false
    });
    };
}

const styles = StyleSheet.create(
  {
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

  },
  circle:{
    width : 30,
    height : 30,
    borderRadius: 15,
    borderColor: "red",
    borderWidth: 3,
    marginRight:30
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    marginVertical: 20, //위 아래 마진
  },
  completedText:{
    color:"#bbb",
    textDecorationLine: 'line-through',
  },
  uncompletedText:{
    color:"#353535",
    textDecorationLine: 'none',
  },
  completedCircle:{
    borderColor: "#bbb",
  },
  uncompletedCircle:
  {
    borderColor: "#F23657",
  },
  column:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    width: width / 2,
  },
  actions:{
    flexDirection: "row"
  },
  actionContainer:{
    marginVertical :10,
    marginHorizontal: 10,
  },
  input: {
    marginVertical: 15
  }
}
);
