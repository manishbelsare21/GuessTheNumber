import { Alert, FlatList, StyleSheet, View, useWindowDimensions } from "react-native";
import Title from "../component/ui/Title";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import NumberContainer from "../component/game/NumberContainer";
import PrimaryButton from "../component/ui/PrimaryButton";
import InstructionText from "../component/ui/InstructionText";
import Card from "../component/ui/Card";
import GuessLogItem from "../component/game/GuessLogItem";

function generateRandomNumberBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomNumberBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomNumberBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const {width, height} =useWindowDimensions();
  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver( guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    // direction => 'lower', greater

    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie !", "You know that this is wrong ...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomNumberBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;

  let content = (
      <>
    <NumberContainer>{currentGuess}</NumberContainer>
    <Card>
      <InstructionText style={styles.instructionText}>
        Higher or lower ?
      </InstructionText>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name={"md-remove"} size={24} color={"white"} />
          </PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name={"md-add"} size={24} color={"white"} />
          </PrimaryButton>
        </View>
      </View>
    </Card>
  </>
);

  if (width > 500){
 content= (
     <>
       <View style={styles.buttonsContainerWide}>
         <View style={styles.buttonContainer}>
           <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
             <Ionicons name={"md-remove"} size={24} color={"white"} />
           </PrimaryButton>
         </View>

         <NumberContainer>{currentGuess}</NumberContainer>

         <View style={styles.buttonContainer}>
           <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
             <Ionicons name={"md-add"} size={24} color={"white"} />
           </PrimaryButton>
         </View>
       </View>
    </>
 );
  }
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        {/*{guessRounds.map(guessRounds => <Text key={guessRounds}>{guessRounds}  </Text>) }*/}
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    marginTop:"3%",
    alignItems: 'center',
    flex: 1,
    padding: 24,

  },
  instructionText: {
    marginTop: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  buttonsContainerWide:{
    flexDirection:'row',
    alignItems: 'center'
  },
  listContainer: {
    flex: 1,
    padding: 16,
  }
});
