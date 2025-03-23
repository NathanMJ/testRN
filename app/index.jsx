import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [firstNum, setFirstNum] = useState(0)
  const [secondNum, setSecondNum] = useState(0)
  const [sign, setSign] = useState()
  const [result, setResult] = useState(0)
  const [writingNum, setWritingNum] = useState("first")
  const [historic, setHistoric] = useState("")

  const changeNum = (text) => {
    if (writingNum == "first") {
      changeFirstNum(text)
    }
    else if (writingNum == "second") {
      changeSecondNum(text)
    }
    else if(writingNum == 'equal'){
      setFirstNum(Number(text))
      setSecondNum(0)
      setWritingNum("first")
      setResult(text)
    }
  }

  const changeFirstNum = (text) => {
    
    if (firstNum != 0)
      text = firstNum + '' + text
    setFirstNum(Number(text))
    setResult(text)
  }

  const changeSecondNum = (text) => {
    if (secondNum != 0)
      text = secondNum + '' + text
    setSecondNum(Number(text))
    setResult(text)
  }


  const changeSign = (text) => {
    setSign(text)
    if(writingNum == "first"){
      setWritingNum("second")
      setResult(text)
    }
    else if(writingNum == "equal"){
      setFirstNum(Number(result))
      setSecondNum(0)
      setResult(text)
      setWritingNum("second")
    }
  }

  const restart = () => {
    setFirstNum(0)
    setSecondNum(0)
    setWritingNum("first")
    setResult(0)
  }

  const equal = () => {
    setWritingNum("equal")
    let tempResult = 0
    switch (sign) {
      case '+':
        tempResult = (firstNum + secondNum)
        break;
      case '-':
        tempResult = (firstNum - secondNum)
        break;
      case 'x':
        tempResult = (firstNum * secondNum)
        break;
      case '/':
        tempResult = (firstNum / secondNum)
        if(secondNum == 0)
          tempResult = 'ERR'
        break;
    }
    if(isNaN(firstNum) || isNaN(secondNum)){
      tempResult = 'ERR'
    }

    setResult(tempResult)
    let totalHistoric = historic + `\n${firstNum} ${sign} ${secondNum} = ${tempResult}`
    setHistoric(totalHistoric)
  }

  useEffect(() => {
    console.log(`firstNum= ${firstNum}`);
  }, [firstNum])

  useEffect(() => {
    console.log(`secondNum= ${secondNum}`);
  }, [secondNum])

  useEffect(() => {
    console.log(`writingNum= ${writingNum}`);
  }, [writingNum])



  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Text style={{ backgroundColor: "rgb(210, 221, 223)", fontSize: 30, padding: 5, textAlign: "right", }}>{result}</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View>
            <TouchableOpacity onPress={() => changeNum(1)} style={styles.button}><Text style={styles.buttonTxt}>1</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => changeNum(4)} style={styles.button}><Text style={styles.buttonTxt}>4</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => changeNum(7)} style={styles.button}><Text style={styles.buttonTxt}>7</Text></TouchableOpacity>
            <TouchableOpacity onPress={restart} style={styles.button}><Text style={styles.buttonTxt}>C</Text></TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => changeNum(2)} style={styles.button}><Text style={styles.buttonTxt}>2</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => changeNum(5)} style={styles.button}><Text style={styles.buttonTxt}>5</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => changeNum(8)} style={styles.button}><Text style={styles.buttonTxt}>8</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => changeNum(0)} style={styles.button}><Text style={styles.buttonTxt}>0</Text></TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => changeNum(3)} style={styles.button}><Text style={styles.buttonTxt}>3</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => changeNum(6)} style={styles.button}><Text style={styles.buttonTxt}>6</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => changeNum(9)} style={styles.button}><Text style={styles.buttonTxt}>9</Text></TouchableOpacity>
            <TouchableOpacity onPress={equal} style={styles.button}><Text style={styles.buttonTxt}>=</Text></TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity onPress={() => changeSign('+')} style={styles.calcButton}><Text style={styles.buttonTxt}>+</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => changeSign('-')} style={styles.calcButton}><Text style={styles.buttonTxt}>-</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => changeSign('x')} style={styles.calcButton}><Text style={styles.buttonTxt}>x</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => changeSign('/')} style={styles.calcButton}><Text style={styles.buttonTxt}>/</Text></TouchableOpacity>
          </View>
        </View>
      </View>

      <View>
        <Text>Historic : </Text>
        <View>
          <Text style={styles.history}>{historic}</Text>
        </View>
        <TouchableOpacity onPress={() => setHistoric('')} style={styles.button}><Text style={styles.buttonTxt}>Reset historic</Text></TouchableOpacity>
      </View>

    </View>

  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgb(5, 184, 255)",
    justifyContent: "center",
    alignContent: 'center',
    padding: 20,
    margin: 3
  },
  buttonTxt: {
    fontSize: 20,
    color: "white"
  },
  calcButton: {
    backgroundColor: "rgb(255, 147, 5)",
    padding: 20,
    margin: 3
  },
  history: {
    textAlign: 'center'
  },
});
