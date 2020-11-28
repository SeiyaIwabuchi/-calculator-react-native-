import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Pressable, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Button, Card, Header, Text } from 'react-native-elements';


interface CreateComponentRowProps{
  row:number;
  col:number;
  pressHandle:(buttonText:string) => void;
  btntxt:string[][];
}

function CreateComponentRow(props:CreateComponentRowProps){
  let compList:JSX.Element[] = [];
  let buttonsHeight:number = 100 / props.row;
  for(let i = 0;i<props.row;i++){
    compList.push(
      <View style={{flex:1,flexDirection:"row"}}>
        <CreateComponentCol col={props.col} row={i} pressHandle={props.pressHandle} btntxt={props.btntxt[i]}/>
      </View>);
  }
  return (
    <>
    {compList}
    </>
  );
}

interface CreateComponentColProps{
  row:number;
  col:number;
  pressHandle:(buttonText:string) => void;
  btntxt:string[];
}

function CreateComponentCol(props:CreateComponentColProps){
  let compList:JSX.Element[] = [];
  let buttonWidth:number = 100 / props.col;
    for(let i = 0;i<props.col;i++){
      compList.push(
      <TouchableOpacity style={{
        backgroundColor:"#FFFFFF",
        opacity:0.25,
        width:buttonWidth.toString() + "%",
        alignItems:"center",
        justifyContent:"center",
        borderWidth:1,
      }}
      onPress={()=>{
        props.pressHandle(props.btntxt[i]);
      }}
      >
        <Text style={{
          color:"#FFFFFF",
          fontSize:30,
        }}>{props.btntxt[i]}</Text>
      </TouchableOpacity>
      );
    }
  return (
    <>
    {compList}
    </>
  );
}

function App() {
  const [dispText,setdispText] = useState("0");
  const [state,setState] = useState(0);
  const [numberToBe,setNumberToBe] = useState(0);
  const [numberTo,setNumberTo] = useState(0);
  const [fun,setFun] = useState("");
  const buttonTexts:string[][] = [
    ["AC","DEL","未定義","÷",],
    ["7","8","9","×"],
    ["4","5","6","-"],
    ["1","2","3","+"],
    ["0",".","00","="],
  ];
  //let numberTo = 0;
  //let numberToBe = 0;
  //let state = 0;
  let calcResult = 0;
  //let fun = (a:number,b:number) => {return 0}
  return (
    <View style={{backgroundColor:"#000000",height:"100%"}}>
      <Header 
      centerComponent={{text:"ﾃﾞﾝﾀｸｩｰｰｰｰ",style:{color:"#fff",fontSize:20}}} 
      rightComponent={{icon:"help"}}
      leftComponent={{icon:"menu"}}
      backgroundColor={"#FFFFFF"}
      containerStyle={{
        opacity:0.5
      }}
      />
      <View style={{
        padding:"3%",
        height:"30%",
        justifyContent:"flex-end"
      }}>
        <Text h1 style={{
        color:"#FFFFF0",
        textAlign:"right",
        }}
        >{state}</Text>
        <Text h1 style={{
        color:"#FFFFF0",
        textAlign:"right",
        }}
      >{dispText}</Text>
      </View>
      <CreateComponentRow row={5} col={4} pressHandle={(buttonText:string)=>{
        //状態制御
        if(["AC","DEL","÷","-","×","+","="].indexOf(buttonText) === -1){
          if(state === 0) setState(1);
        }else if(["÷","-","×","+"].indexOf(buttonText) !== -1){
          if(state === 1) setState(2);
          else if(state === 3) setState(2);
        }else if(["="].indexOf(buttonText) !== -1){
          if(state === 2) setState(3);
        }else if(buttonText === "AC") setState(0);
        //計算処理
        if(["AC","DEL","÷","-","×","+","="].indexOf(buttonText) === -1){
          if(state === 1 || state == 0) {
            setNumberToBe((numberToBe*10)+parseInt(buttonText));
          }else if(state === 2 || state === 1){
            setNumberTo((numberTo*10)+parseInt(buttonText));
          }
        }else if(["÷","-","×","+"].indexOf(buttonText) !== -1){
          if(state === 1 || state === 3){
            setFun(buttonText);
            console.log(buttonText)
          }
        }else if(buttonText === "="){
          if(fun === "+")
            calcResult = numberToBe + numberTo;
          else if(fun === "-")
            calcResult = numberToBe - numberTo;
          else if(fun === "×")
            calcResult = numberToBe * numberTo;
          else if(fun === "÷")
            calcResult = numberToBe / numberTo;
          
          setNumberTo(0);
          setNumberToBe(calcResult);
        }else if(buttonText === "AC"){
          setNumberTo(0);
          setNumberToBe(0);
        }
        //表示制御
        if(["AC","DEL","="].indexOf(buttonText) === -1){
          if(dispText !== "0") setdispText(dispText + buttonText);
          else setdispText(buttonText);
        }else if(buttonText === "AC"){
          setdispText("0");
        }else if(buttonText === "DEL"){
          setdispText(dispText.substr(1))
          if(dispText === "" || dispText === "0") setdispText("0");
        }else if(buttonText === "="){
          if(state == 2){
            setdispText(calcResult.toString());
          }
        }
      }}
      btntxt = {buttonTexts}
      />
    </View>
  );
}

export default App;