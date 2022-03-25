import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";



export default function App() {
  return (
    <View style={styles.container}>
      { <Video
        source={require("./assets/Evaporate_1.mp4")}
        style={styles.backgroundVid}
        shouldPlay={true}
        isLooping={false}
        resizeMode="cover"
        isMuted={false}
      /> }

      <View style={styles.container}>
        
        <View>
          <Image
            source={require("./assets/Facebook.png")}
            style={{ width: 50, height: 50, bottom: 150 }}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 15,
              bottom: 50,
              left: -3,
              lineHeight: 84,
              textAlign: "center",
              fontFamily: "",
            }}
          >
            Facebook
          </Text>
        </View>
        <View style={{ bottom: -150, left: 100 }}>
          <Image
            source={require("./assets/Instagram.png")}
            style={{ width: 40, height: 60, bottom: 308 }}
          />
          <Text
            style={{
              position: "absolute",
              color: "white",
              fontSize: 15,
              bottom: 195,
              left: 0,
              lineHeight: 84,
              textAlign: "center",
              fontFamily: "",
            }}
          >
            Instagram
          </Text>
        </View>
        
        
        <Text style={styles.bottomright}>Karim Salem 1001619 ;) </Text>

        <TextInput
          style={{
            borderRadius: 10,
            bottom: 220,
            margin: 5,
            color: "#000",
            borderColor: "black",
            backgroundColor: "#FFF",
            borderWidth: 1,
            height: 45,
            paddingHorizontal: 100,
            fontSize: 12,
          }}
          placeholder={"DM info@aquafit.me"}
          placeholderTextColor={"black"} 
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    position: "absolute",
    color: "#FFF",
    fontSize: 80,
    bottom: 50,
    left: -5,
    lineHeight: 84,
    textAlign: "center",
    fontFamily: "",
  },
  backgroundVid: {
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    alignItems: "center",
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
 
  
  bottomright: {
    position: "absolute",
    color: "white",
    fontSize: 10,
    bottom: -25,
    left: 150,
    lineHeight: 84,
    textAlign: "center",
    fontFamily: "",
  },
});
