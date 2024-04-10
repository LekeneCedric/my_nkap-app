
import {Animated, Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from './welcome.style';
import { useState } from 'react';
import { useWelcomeView } from './useWelcomeView';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icons } from '../../shared/Icons';
import { IconSizes } from '../../shared/IconSizes';
import GestureRecognizer from 'react-native-swipe-gestures';
const Welcome = () => {
  const {
    currentTitle,
    currentDescription,
    slides,
    currentSlide,
    nextSlide,
    prevSlide,
    goToSlide,
  } = useWelcomeView();
  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.container1}>
        <Image
         source={require('../../../assets/icons/welcome/money.png')}
         style={styles.logo}
        />
      </View>
      <GestureRecognizer
        onSwipeLeft={prevSlide}
        onSwipeRight={nextSlide}
        style={[styles.container2, styles.cardShadow]}>
        <View style={styles.indicatorsContainer}>
        {
          slides.map(pos => {
            return <TouchableOpacity onPress={()=>{goToSlide(pos)}} style={pos == currentSlide ? styles.selectedSliceIndicator : styles.notSelectedSliceIndicator} />
          })
        }
        </View>
        <Animated.Text style={styles.title}>
        {currentTitle}
        </Animated.Text>
        <Animated.Text style={styles.description}>
        {currentDescription}
        </Animated.Text>
        <TouchableOpacity style={styles.nextButton} onPress={nextSlide}>
          <Icon name={Icons.next} size={IconSizes.medium} style={styles.nextIcon} />
        </TouchableOpacity>
      </GestureRecognizer>
    </SafeAreaView>
  );
};
export default Welcome;
