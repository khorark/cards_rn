/**
 * Created by arkadiy on 22.12.18.
 */
import React, { PureComponent } from "react";
import { StyleSheet, Animated, PanResponder } from "react-native";

export default class Card extends PureComponent {
  constructor(props) {
    super(props);
    this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

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
        console.log("dx", dx);
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
          props.swipeLeft()
        }

        Animated.timing(this.translateXAnimValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        }).start();

          Animated.timing(this.rotateYAnimValue, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true
          }).start();

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
    this.scaleAnimValue = new Animated.Value(0);

    this.rotateY = this.rotateYAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "-15deg"]
    });

    // this.translateX = this.translateXAnimValue.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [0, 350]
    // });

    this.scal = this.scaleAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.05]
    });

    this.state = {
      scaleAnim: this.scal,
      rotateYAnim: this.rotateY,
      translateXAnim: this.translateXAnimValue
    };
  }

  render() {
    const { idx = 0, backgroundColor = "green" } = this.props;

    return (
      <Animated.View
        style={[
          styles.cardContainer,
          {
            backgroundColor,
            top: idx * 20,
            transform: [
              // { scale: this.state.scaleAnim },
              { rotate: this.state.rotateYAnim },
              { translateX: this.state.translateXAnim }
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
