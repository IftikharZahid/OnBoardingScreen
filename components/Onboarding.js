import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Animated,
} from "react-native";
import React from "react";
import OnboardingItems from "./OnboardingItems";
import slides from "./slides";
import { useState, useRef } from "react";
import Paginator from "./Paginator";
import NextButton from "./NextButton";

const Onboarding = ({ item }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewconfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const slideRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItems item={item} />}
          horizontal
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewconfig}
          ref={slideRef}
        />
      </View>
      <Paginator data={slides} scrollX={scrollX} />
      <NextButton percenteg={(currentIndex + 1) * (100 / slides.length)} />
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
