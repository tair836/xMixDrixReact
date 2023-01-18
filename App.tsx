import { FC, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const Brick: FC<{ brickNumber:number, onClick: (brickNUmber: number) => void; getCurrentPlayer: () => number;
   xView: (brickNUmber: number) => "none" | "flex"; oView: (brickNUmber: number) => "none" | "flex";
   isPressed: (brickNumber: number) => boolean}> = (props) => {
  const [player, setPlayer] = useState(0)
  const onClick = () => {
    setPlayer(props.getCurrentPlayer())
    props.onClick(props.brickNumber)
  }

  return (
    <View style={styles.brick}>
      <TouchableOpacity style={[styles.button, { backgroundColor: 'white'}]} onPress={onClick} disabled={props.isPressed(props.brickNumber)}>
        <Image source={require('./assets/x.png')} style={[styles.image, { display: props.xView(props.brickNumber)}]} ></Image>
        <Image source={require('./assets/o.png')} style={[styles.image, { display: props.oView(props.brickNumber)}]}></Image>
      </TouchableOpacity>
    </View>
  )
}

const XmixDrix: FC = () => {
  // 0: not selected, 1: 'x', 2: 'o'
  const [turn, setTurn] = useState(1)
  const [arr, setArr] = useState(Array(9).fill(0))
  const [winner, setWinner] = useState(0)
  const [game, setGame] = useState(0)
  const [tie, setTie] = useState(0)

  const getCurrentPlayer = () => {
    return turn
  }
  const onBrickClick = (brickNumber: number) => {
    console.log('onBrickClick')
    if (turn == 1) {
      arr[brickNumber] = 1
      checkWin()
      setTurn(2)
    } else {
      arr[brickNumber] = 2
      checkWin()
      setTurn(1)
    }
    setArr(arr) 
  }

  const xView = (brickNumber: number) => {
    if (arr[brickNumber] == 1) {
      return 'flex'
    } else return 'none'
  }

  const oView = (brickNumber: number) => {
    if (arr[brickNumber] == 2) {
      return 'flex'
    } else return 'none'
  }

  const isPressed = (brickNumber: number) => {
    if(arr[brickNumber] > 0) return true
    else return false
  }

  const checkWin = () => {
    
    if(arr[0] == arr[1] && arr[0] == arr[2] && arr[0]) {
      setWinner(turn)
      setGame(1)
      console.log("game over")
    }
    else if(arr[3] == arr[4] && arr[3] == arr[5] && arr[3]) {
      setWinner(turn)
      setGame(1)
      console.log("game over")
    }
    else if(arr[6] == arr[7] && arr[6] == arr[8] && arr[6]) {
      setWinner(turn)
      setGame(1)
      console.log("game over")
    }
    else if(arr[0] == arr[3] && arr[0] == arr[6] && arr[0]) {
      setWinner(turn)
      setGame(1)
      console.log("game over")
    }
    else if(arr[1] == arr[4] && arr[1] == arr[7] && arr[1]) {
      setWinner(turn)
      setGame(1)
      console.log("game over")
    }
    else if(arr[2] == arr[5] && arr[2] == arr[8] && arr[2]) {
      setWinner(turn)
      setGame(1)
      console.log("game over")
    }
    else if(arr[0] == arr[4] && arr[0] == arr[8] && arr[0]) {
      setWinner(turn)
      setGame(1)
      console.log("game over")
    }
    else if(arr[2] == arr[4] && arr[2] == arr[6] && arr[2]) {
      setWinner(turn)
      setGame(1)
      console.log("game over")
    }
    else {
      for (let i= 0; i < arr.length; ++i) {
        if (!arr[i]) return;
      }
      setTie(1)
      setGame(1)
    }
  }

  const isWinner = () => {
    if(winner == 1 || winner == 2) {
      return 'flex'
    }
    else return 'none'
  }

  const isTie = () => {
    if(tie == 1) {
      return 'flex'
    }
    else return 'none'
  }

  const newGame = () => {
    setTurn(1)
    setArr(Array(9).fill(0))
    setWinner(0)
    setGame(0)
    setTie(0)
  }

  const showTurnMessage = () => {
    if(game == 0) {
      return 'flex'
    }
    else return 'none'
  }
  console.log("My app is running")

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Brick brickNumber={0} onClick={onBrickClick} getCurrentPlayer={getCurrentPlayer} xView={xView} oView={oView} isPressed={isPressed}></Brick>
        <Brick brickNumber={1} onClick={onBrickClick} getCurrentPlayer={getCurrentPlayer} xView={xView} oView={oView} isPressed={isPressed}></Brick>
        <Brick brickNumber={2} onClick={onBrickClick} getCurrentPlayer={getCurrentPlayer} xView={xView} oView={oView} isPressed={isPressed}></Brick>
      </View>
      <View style={styles.row}>
        <Brick brickNumber={3} onClick={onBrickClick} getCurrentPlayer={getCurrentPlayer} xView={xView} oView={oView} isPressed={isPressed}></Brick>
        <Brick brickNumber={4} onClick={onBrickClick} getCurrentPlayer={getCurrentPlayer} xView={xView} oView={oView} isPressed={isPressed}></Brick>
        <Brick brickNumber={5} onClick={onBrickClick} getCurrentPlayer={getCurrentPlayer} xView={xView} oView={oView} isPressed={isPressed}></Brick>
      </View>
      <View style={styles.row}>
        <Brick brickNumber={6} onClick={onBrickClick} getCurrentPlayer={getCurrentPlayer} xView={xView} oView={oView} isPressed={isPressed}></Brick>
        <Brick brickNumber={7} onClick={onBrickClick} getCurrentPlayer={getCurrentPlayer} xView={xView} oView={oView} isPressed={isPressed}></Brick>
        <Brick brickNumber={8} onClick={onBrickClick} getCurrentPlayer={getCurrentPlayer} xView={xView} oView={oView} isPressed={isPressed}></Brick>
      </View>
      <Text style={[styles.playMessage, { display: isWinner()}, { backgroundColor: 'lightblue'}]}>player {winner} is the winner</Text>
      <Text style={[styles.playMessage, { display: isTie()}, { backgroundColor: 'lightblue'}]}>Tie</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: 'white'}]} onPress={newGame}>
        <Text style={[styles.playMessage]}>new game</Text>
      </TouchableOpacity>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: 'pink',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'pink',
  },
  brick: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
    aspectRatio: 1,
  },
  button: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    aspectRatio: 1,
    display: 'none',
  },
  lines: {
    flex: 1,
    position: "absolute",
  },
  playMessage: {
    fontSize: 25,
    margin: 25,
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: 65
  }
});

export default XmixDrix