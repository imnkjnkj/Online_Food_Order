import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

import * as Location from 'expo-location';

import { useEffect, useState } from "react";

const screenWidth = Dimensions.get("screen").width;
export const LandingScreen = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [address, setAddress] = useState();
  const [displayAddress, setDisplayAddress] = useState("Waiting for current location");

  useEffect(() => {
    async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status != "granted") {
        setErrorMsg("Permission to access location is not granted");
      }
      let location: any = await Location.getCurrentPositionAsync({});
      const { coords } = location
      if(coords){
        const {latitude, longitude} = coords;
        let addressResponse: any = await Location.reverseGeocodeAsync({ latitude, longitude})

        for(let item of addressResponse) {
            setAddress(item);
            let currentAddress = `${item.name}, ${item.street}, ${item.postaCode}, ${item.country}`;
            setDisplayAddress(currentAddress);
            return;
        }
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.navigation} />
      <View style={styles.body}>
        <Image
          source={require("../images/delivery_icon.png")}
          style={styles.deliveryIcon}
        />
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Your Delivery Address</Text>
        </View>
        <Text style={styles.addressText}> {displayAddress}</Text>
      </View>
      <View style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    flex: 2,
  },
  body: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  deliveryIcon: {
    width: 120,
    height: 120,
  },
  addressContainer: {
    width: screenWidth - 100,
    borderBottomColor: "red",
    borderBottomWidth: 0.5,
    padding: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  addressTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#7D7D7D",
  },
  addressText: {
    fontSize: 20,
    fontWeight: "200",
    color: "#7D7D7D",
  },
  footer: {
    flex: 1,
  },
});
