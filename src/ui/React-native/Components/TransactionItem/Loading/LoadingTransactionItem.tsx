import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {hp} from "../../../Global/Percentage.ts";
import {View} from "react-native";
import {useEffect, useState} from "react";
import {Node} from "@babel/core";
import useTheme from "../../../Shared/Hooks/useTheme.ts";

type props = {
    count: number,
}
const LoadingTransactionItem = ({count}: props) => {
    const {colorPalette: {pageBackground, gray}} = useTheme();
    const [items, setItems] = useState<Node[]>([]);
    useEffect(() => {
        for(let i=0; i<count; i++){
            let newItem: Node = <SkeletonPlaceholder backgroundColor={gray} borderRadius={4}>
                <View style={{ width: 'auto', height: hp(5), margin: 5}}>
                </View>
            </SkeletonPlaceholder>;
            setItems(prev => [...prev, newItem])
        }
    }, [])
    return (
        <>
            {items.map( item => item)}
        </>
    )
};
export default LoadingTransactionItem;