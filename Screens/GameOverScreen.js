import {
  Image,
  View,
  StyleSheet,
  Text,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import TitleAndroid from "../component/ui/Title";
import Colors from "../constants/Colors";
import PrimaryButton from "../component/ui/PrimaryButton";

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  const { width, height } = useWindowDimensions();
  let imageSize = 300;
  if (width < 380) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <TitleAndroid> GAME OVER! </TitleAndroid>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require("../assets/img/success.png")}
          />
        </View>
        <Text style={styles.summeryText}>
          your phone needed{" "}
          <Text style={styles.highlights}> {roundsNumber} </Text>
          rounds to guess the number{" "}
          <Text style={styles.highlights}> {userNumber} </Text>
        </Text>
        <PrimaryButton onPress={onStartNewGame}>
          {" "}
          Start a new Game{" "}
        </PrimaryButton>
      </View>
    </ScrollView>
  );
}

export default GameOverScreen;

// const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%"
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 :  300 ,
    // height: deviceWidth < 380 ? 150 :  300 ,
    // borderRadius: deviceWidth < 380 ? 75 : 150  ,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  summeryText: {
    fontFamily: "open-sans",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 24,
  },
  highlights: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
