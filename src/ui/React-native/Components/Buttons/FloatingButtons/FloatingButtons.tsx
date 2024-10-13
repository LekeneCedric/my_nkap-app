import React, { useState } from "react";
import { Animated, StyleProp, View, ViewStyle } from "react-native";
import useTheme from "../../../Shared/Hooks/useTheme";
import useFloatingButtonAnimation from "../FloatingButton/useFloatingButtonAnimation";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconSizes } from "../../../Global/IconSizes";
import {BounceInDown, BounceOutDown, BounceOutUp, default as Reanimated, useAnimatedStyle, useSharedValue}from "react-native-reanimated";

type buttonProps = {
    icon: string,
    size: number,
    color: string,
    action: () => void
}
type props = {
    customStyles?: StyleProp<ViewStyle>,
    buttons: buttonProps[],
    icon: string,
}
const FloatingButtons = ({customStyles, buttons, icon}: props) => {
    const [showButtons, setShowButtons] = useState<boolean>(false);
    const {colorPalette: {text, action1Text, action1}} = useTheme();
    const {bounceYValue} = useFloatingButtonAnimation();

    return <View style={[{flexDirection: 'column', position: 'absolute', right: 20}, customStyles ?? {},]}>
                {
                    showButtons && buttons.map(b => {
                        return <Reanimated.View style={[{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: action1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            elevation: 8, // Add shadow for Android
                            shadowColor: text, // Add shadow for iOS
                            shadowOffset: {width: 0, height: 2},
                            shadowOpacity: 0.8,
                            shadowRadius: 2,
                            marginBottom: 10
                            },
                        ]}
                            
                            entering={BounceInDown.delay(100)}
                            >
                            <TouchableOpacity onPress={() => {
                                setShowButtons(!showButtons);
                                b.action();
                            }}>
                                <Icon name={b.icon} size={IconSizes.medium} color={action1Text}/>
                            </TouchableOpacity>
                        </Reanimated.View>
                    })
                }
                <Animated.View style={[{
                    translateY: bounceYValue,
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    backgroundColor: action1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 8, // Add shadow for Android
                    shadowColor: text, // Add shadow for iOS
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    }]}>
                    <TouchableOpacity onPress={() => {setShowButtons(!showButtons)}}>
                        <Icon name={icon} size={IconSizes.medium} color={action1Text}/>
                    </TouchableOpacity>
                </Animated.View>
    </View>
};

export default FloatingButtons;