/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { SafeAreaView, StyleSheet, View, StatusBar } from "react-native";
import Card from "./components/Card";

type Props = {};
export default class App extends Component<Props> {
  state = {
    orderCards: [1, 2, 3, 4],
    isSwipeLeft: false
  };

  CARDS = {
    1: {
      image: require("./assets/images/1.jpg"),
      size: { width: 450, height: 589 }
    },
    2: {
      image: require("./assets/images/2.jpg"),
      size: { width: 450, height: 529 }
    },
    3: {
      image: require("./assets/images/3.jpg"),
      size: { width: 450, height: 566 }
    },
    4: {
      image: require("./assets/images/4.jpg"),
      size: { width: 450, height: 573 }
    }
  };

  render() {
    const { orderCards, isSwipeLeft } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#002137" />
        <View style={styles.cardsContainer}>
          {orderCards.map((id, idx) => (
            <Card
              key={id}
              idx={idx}
              image={this.CARDS[id].image}
              size={this.CARDS[id].size}
              swipeRight={this._cardSwipeRight}
              swipeLeft={this._cardSwipeLeft}
              isSwipeLeft={isSwipeLeft}
              lostIndex={orderCards.length - 1}
            />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  _cardSwipeRight = () => {
    const orderCardsRaw = [...this.state.orderCards];
    const lastCard = orderCardsRaw.pop();
    const orderCards = [lastCard, ...orderCardsRaw];
    this.setState({ orderCards, isSwipeLeft: false });
  };

  _cardSwipeLeft = () => {
    const orderCardsRaw = [...this.state.orderCards];
    const firstCard = orderCardsRaw.shift();
    const orderCards = [...orderCardsRaw, firstCard];
    this.setState({ orderCards, isSwipeLeft: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002137"
  },
  cardsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 40
  }
});
