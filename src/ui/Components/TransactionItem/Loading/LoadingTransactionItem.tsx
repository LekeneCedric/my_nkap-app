import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import {hp, wp} from "../../../Global/Percentage.ts";
import {Text, View} from "react-native";
import {useEffect, useState} from "react";
import {Node} from "@babel/core";

type props = {
    count: number,
}
const LoadingTransactionItem = ({count}: props) => {
    const [items, setItems] = useState<Node[]>([]);
    useEffect(() => {
        for(let i=0; i<count; i++){
            let newItem: Node = <SkeletonPlaceholder borderRadius={4}>
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