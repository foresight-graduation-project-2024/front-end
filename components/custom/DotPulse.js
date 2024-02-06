import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Easing } from 'react-native';
import { Colors } from '../../constants/config';

const DotPulse = (props) => {
  const dot1Anim = useRef(new Animated.Value(0)).current;
  const dot2Anim = useRef(new Animated.Value(0)).current;
  const dot3Anim = useRef(new Animated.Value(0)).current;

  const pulse = (animatedValue, delay = 0) => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    pulse(dot1Anim);
    pulse(dot2Anim, 750);
    pulse(dot3Anim, 1500);
  }, [dot1Anim, dot2Anim, dot3Anim]);

  const dotStyle = (animatedValue) => ({
    opacity: animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0.3, 1, 0.3],
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.3],
        }),
      },
    ],
  });

  return (
    <View style={styles.dotContainer}>
      <Animated.View style={[styles.dot, dotStyle(dot1Anim)]} />
      <Animated.View style={[styles.dot, dotStyle(dot2Anim)]} />
      <Animated.View style={[styles.dot, dotStyle(dot3Anim)]} />
    </View>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 22,
    top: 24,
    right: 64,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginHorizontal: 2,
  },
});

export default DotPulse;