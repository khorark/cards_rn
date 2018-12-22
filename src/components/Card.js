/**
 * Created by arkadiy on 22.12.18.
 */
import React from "react";
import { StyleSheet, View } from "react-native";

const Card = ({ idx = 0, backgroundColor = "green" }) => (
  <View style={[styles.cardContainer, { backgroundColor, top: idx * 20 }]} />
);

const styles = StyleSheet.create({
  cardContainer: {
    width: "80%",
    height: "80%",
    borderRadius: 10,
    overflow: "hidden",
    position: "absolute"
  }
});

export default Card;
