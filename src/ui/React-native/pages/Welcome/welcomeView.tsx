import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useWelcomeView} from './useWelcomeView.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GestureRecognizer from 'react-native-swipe-gestures';
import {Icons} from "../../Global/Icons.ts";
import {IconSizes} from "../../Global/IconSizes.ts";
import Animated, {BounceInLeft, BounceInUp} from "react-native-reanimated";
import {useAnimationView} from "./useAnimationView.ts";
import useTheme from "../../Shared/Hooks/useTheme.ts";
import WelcomeViewStyles from "./welcomeView.style.tsx";
import useCustomTranslation from "../../Shared/Hooks/useCustomTranslation.ts";

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
    const {
        animatedStyle,
    } = useAnimationView();
    const {colorPalette: {pageBackground, containerBackground, text, action1, action1Text}} = useTheme();

    const styles = WelcomeViewStyles(pageBackground, containerBackground, text, action1, action1Text);
    return (
        <SafeAreaView style={styles.pageContainer}>
            <Animated.View entering={BounceInUp.duration(500)} style={[styles.container1, animatedStyle]}>
                {/*<Image*/}
                {/* source={require('../../../assets/icons/welcome/money.png')}*/}
                {/* style={styles.logo}*/}
                {/*/>*/}
            </Animated.View>
            <GestureRecognizer
                onSwipeLeft={nextSlide}
                onSwipeRight={prevSlide}
                style={[styles.container2, styles.cardShadow]}>
                <View style={styles.indicatorsContainer}>
                    {
                        slides.map(pos => {
                            return <TouchableOpacity onPress={() => {
                                goToSlide(pos)
                        }}
                        style={pos == currentSlide ? styles.selectedSliceIndicator : styles.notSelectedSliceIndicator}/>
                        })
                    }
                </View>
                <>
                    {
                        currentSlide === 0 ? (
                            <Animated.View entering={BounceInLeft.duration(2000)}>
                                <Animated.Text style={styles.title}>
                                    {currentTitle}
                                </Animated.Text>
                                <Animated.Text style={styles.description}>
                                    {currentDescription}
                                </Animated.Text>
                            </Animated.View>
                        ) : currentSlide === 1 ? (
                            <Animated.View entering={BounceInLeft.duration(2000)}>
                                <Animated.Text style={styles.title}>
                                    {currentTitle}
                                </Animated.Text>
                                <Animated.Text style={styles.description}>
                                    {currentDescription}
                                </Animated.Text>
                            </Animated.View>
                        ) : (
                            <Animated.View entering={BounceInLeft.duration(2000)}>
                                <Animated.Text style={styles.title}>
                                    {currentTitle}
                                </Animated.Text>
                                <Animated.Text style={styles.description}>
                                    {currentDescription}
                                </Animated.Text>
                            </Animated.View>
                        )
                    }
                </>
                <TouchableOpacity style={styles.nextButton} onPress={nextSlide}>
                    <Icon name={Icons.next} size={IconSizes.medium} style={styles.nextIcon}/>
                </TouchableOpacity>
            </GestureRecognizer>
        </SafeAreaView>
    );
};
export default Welcome;
