/**
 * Created by arkadiy on 22.12.18.
 */
import React, { PureComponent } from "react";
import { StyleSheet, Animated, PanResponder } from "react-native";

export default class Card extends PureComponent {
  constructor(props) {
    super(props);
    this.idx = props.idx;
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => this.idx === 3,
      onMoveShouldSetPanResponder: (evt, gestureState) => this.idx === 3,

      onPanResponderGrant: (evt, gestureState) => {
        console.log("onPanResponderGrant");
        // Animated.parallel([
        //   Animated.timing(this.rotateYAnimValue, {
        //     toValue: 1,
        //     duration: 2000,
        //     useNativeDriver: true
        //   }),
        //   Animated.timing(this.translateXAnimValue, {
        //     toValue: 1,
        //     duration: 2000,
        //     useNativeDriver: true
        //   })
        // ]).start();
        //
        // setTimeout(() => {
        //   props.swipeRight();
        //
        //   Animated.parallel([
        //     Animated.timing(this.rotateYAnimValue, {
        //       toValue: 0,
        //       duration: 2000,
        //       useNativeDriver: true
        //     }),
        //     Animated.timing(this.translateXAnimValue, {
        //       toValue: 0,
        //       duration: 2000,
        //       useNativeDriver: true
        //     }),
        //   ]).start();
        // }, 2000);
        // console.log("evt", evt);
        // console.log("gestureState", gestureState);
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        const dx = gestureState.dx > 200 ? 200 : gestureState.dx;
        const rotate = gestureState.dx / 200;

        this.translateXAnimValue.setValue(dx);
        this.rotateYAnimValue.setValue(rotate);

        // console.log("evt", evt);
        // console.log("gestureState", gestureState);
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        console.log("onPanResponderTerminationRequest");
        const dx = gestureState.dx;

        if (dx > 180) {
          props.swipeRight();
        }

        if (dx < -180) {
          props.swipeLeft();
        }

        Animated.parallel([
          Animated.timing(this.translateXAnimValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
          }),

          Animated.timing(this.rotateYAnimValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
          })
        ]).start();

        // console.log("evt", evt);
        // console.log("onPanResponderRelease", gestureState);
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        console.log("onPanResponderTerminate");
        // console.log("evt", evt);
        // console.log("onPanResponderRelease", gestureState);
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        console.log("onShouldBlockNativeResponder");
        // console.log("evt", evt);
        // console.log("onPanResponderRelease", gestureState);
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    });

    this.rotateYAnimValue = new Animated.Value(0);
    this.translateXAnimValue = new Animated.Value(0);
    this.translateYAnimValue = new Animated.Value(-15);

    this.rotateY = this.rotateYAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "-15deg"]
    });

    this.state = {
      rotateYAnim: this.rotateY,
      translateXAnim: this.translateXAnimValue,
      translateYAnim: this.translateYAnimValue
    };
  }

  render() {
    const {
      idx = 0,
      backgroundColor = "green",
      isSwipeLeft = false
    } = this.props;
    this.idx = idx;

    if (isSwipeLeft && idx === 3) {
      this.translateXAnimValue.setValue(200);

      Animated.timing(this.translateXAnimValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start();
    }

    if (!isSwipeLeft) {
      console.log("idx", idx);

      this.translateYAnimValue.setValue(-15);

      Animated.timing(this.translateYAnimValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start();
    } else {

      this.translateYAnimValue.setValue(15);

      Animated.timing(this.translateYAnimValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start();
    }

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            backgroundColor,
            top: idx * 15,
            transform: [
              { rotate: this.state.rotateYAnim },
              { translateX: this.state.translateXAnim },
              { translateY: this.state.translateYAnim }
              // { perspective: 1000 } // without this line this Animation will not render on Android while working fine on iOS
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
    width: "80%",
    height: "80%",
    borderRadius: 10,
    overflow: "hidden",
    position: "absolute"
  }
});
