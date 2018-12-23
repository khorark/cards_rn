/**
 * Created by arkadiy on 22.12.18.
 * @flow
 */
import React, { PureComponent } from "react";
import { StyleSheet, Animated, PanResponder, Dimensions } from "react-native";
import type AnimatedValue from "react-native/Libraries/Animated/src/nodes/AnimatedValue";

type Props = {
  idx: number,
  lostIndex: number,
  backgroundColor: string,
  isSwipeLeft: boolean,
  swipeRight: () => void,
  swipeLeft: () => void
};

type State = {
  rotateYAnim: AnimatedValue,
  translateXAnim: AnimatedValue,
  translateYAnim: AnimatedValue
};

export default class Card extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    const { width } = Dimensions.get('window');

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._onStartShouldSetPanResponder,
      onPanResponderMove: this._onPanResponderMove,
      onPanResponderRelease: this._onPanResponderRelease
    });

    this._initAnimatedValues();
    this.durationAnimaed = 1000;
    this.cardPadding = 15;
    this.width = width;

    this.state = {
      rotateYAnim: this.rotateY,
      translateXAnim: this.translateXAnimValue,
      translateYAnim: this.translateYAnimValue
    };
  }

  /**
   * Инициализация начальных значений анимации
   * @private
   */
  _initAnimatedValues = () => {
    this.rotateYAnimValue = new Animated.Value(0);
    this.translateXAnimValue = new Animated.Value(0);
    this.translateYAnimValue = new Animated.Value(0);

    this.rotateY = this.rotateYAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "-15deg"]
    });
  };

  _onStartShouldSetPanResponder = () => this.props.idx === this.props.lostIndex;
  _onPanResponderMove = (_, { dx }) => {
    dx = dx > this.width ? this.width : dx;
    const rotate = dx / this.width;

    this.translateXAnimValue.setValue(dx);
    this.rotateYAnimValue.setValue(rotate);
  };

  _onPanResponderRelease = (_, { dx }) => {
    if (dx > this.width / 2) {
      this.props.swipeRight();
    }

    if (dx < -(this.width / 2)) {
      this.props.swipeLeft();
    }

    Animated.parallel([
      Animated.timing(this.translateXAnimValue, {
        toValue: 0,
        duration: this.durationAnimaed,
        useNativeDriver: true
      }),

      Animated.timing(this.rotateYAnimValue, {
        toValue: 0,
        duration: this.durationAnimaed,
        useNativeDriver: true
      })
    ]).start();
  };

  _animatedPreRender() {
    const { idx = 0, lostIndex, isSwipeLeft = false } = this.props;

    if (isSwipeLeft) {
      this.translateYAnimValue.setValue(this.cardPadding);

      Animated.timing(this.translateYAnimValue, {
        toValue: 0,
        duration: this.durationAnimaed,
        useNativeDriver: true
      }).start();

      if (idx === lostIndex) {
        this.translateXAnimValue.setValue(this.width);

        Animated.timing(this.translateXAnimValue, {
          toValue: 0,
          duration: this.durationAnimaed,
          useNativeDriver: true
        }).start();
      }
    } else {
      this.translateYAnimValue.setValue(-this.cardPadding);

      Animated.timing(this.translateYAnimValue, {
        toValue: 0,
        duration: this.durationAnimaed,
        useNativeDriver: true
      }).start();
    }
  }

  render() {
    const { idx = 0, backgroundColor = "green" } = this.props;
    this._animatedPreRender();

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            backgroundColor,
            top: idx * this.cardPadding,
            transform: [
              { rotate: this.state.rotateYAnim },
              { translateX: this.state.translateXAnim },
              { translateY: this.state.translateYAnim }
            ]
          }
        ]}
        {...this._panResponder.panHandlers}
      />
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
    height: "90%",
    borderRadius: 10,
    overflow: "hidden",
    position: "absolute"
  }
});
