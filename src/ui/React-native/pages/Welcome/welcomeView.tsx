import {Image, SafeAreaView, TouchableOpacity, View} from 'react-native';
import {useWelcomeView} from './useWelcomeView.ts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GestureRecognizer from 'react-native-swipe-gestures';
import {Icons} from "../../Global/Icons.ts";
import {IconSizes} from "../../Global/IconSizes.ts";
import Animated, {BounceInLeft} from "react-native-reanimated";
import useTheme from "../../Shared/Hooks/useTheme.ts";
import WelcomeViewStyles from "./welcomeView.style.tsx";

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
    const {colorPalette: {pageBackground, containerBackground, text, action1, action1Text}} = useTheme();

    const styles = WelcomeViewStyles(pageBackground, containerBackground, text, action1, action1Text);
    return (
        <SafeAreaView style={styles.pageContainer}>
            <Animated.View style={[styles.container1]}>
                <Image
                    source={require("../../../../assets/images/logo.png")}
                    style={[styles.logo,{width: '100%', height:'90%'}]}

                />
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
