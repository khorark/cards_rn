/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Card from "./components/Card";

type Props = {};
export default class App extends Component<Props> {
  state = {
    cards: {
      1: {
        backgroundColor: "red"
      },
      2: {
        backgroundColor: "green"
      },
      3: {
        backgroundColor: "orange"
      },
      4: {
        backgroundColor: "blue"
      }
    },
    orderCards: [1, 2, 3, 4]
  };

  render() {
    const { cards, orderCards } = this.state;

    return (
      <View style={styles.container}>
        {orderCards.map((id, idx) => (
          <Card
              id={id}
            key={id}
            idx={idx}
            backgroundColor={cards[id].backgroundColor}
            swipeRight={this._cardSwipeRight}
          />
        ))}
      </View>
    );
  }

  _cardSwipeRight = () => {
        const orderCardsRaw = [...this.state.orderCards];
        const lastCard = orderCardsRaw.pop();
        const orderCards = [ lastCard, ...orderCardsRaw ];
        this.setState({ orderCards })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginTop: 40
  }
});
