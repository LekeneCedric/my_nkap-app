import {Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../Global/IconSizes";
import IOperationDto from "../../../../Domain/Operation/IOperationDto.ts";
import {useEffect, useState} from "react";
import {IOperationTypeEnum} from "../../../../Domain/Operation/Operation.ts";
import moment from "moment";
import 'moment/locale/fr';
import 'moment/locale/en-gb';
import useTheme from "../../Shared/Hooks/useTheme.ts";
import TransactionItemStyles from "./TransactionItem.styles";
import UpdateOperationModalView from "../Modals/UpdateOperationModal/UpdateOperationModalView.tsx";
import useCustomTranslation from "../../Shared/Hooks/useCustomTranslation.ts";

type props = {
    data: IOperationDto
}
const TransactionItem = ({data}: props) => {
    const [date, setDate] = useState<string | null>(null);
    const {colorPalette: {pageBackground, containerBackground, text, green, red, action1}} = useTheme();
    const [modalUpdateOperationIsVisible, setModalUpdateOperationIsVisible] = useState(false);
    const styles = TransactionItemStyles(containerBackground, text);
    const {
        currentLanguage
    } = useCustomTranslation();
    useEffect(() => {
        moment.locale(currentLanguage);
        const date = moment(data.date);
        const formattedDate = date.format('dddd HH:mm');
        setDate(formattedDate);
    }, [data]);
    return (
        <>
            <UpdateOperationModalView
                closeModal={() => {
                    setModalUpdateOperationIsVisible(false);
                }}
                isVisible={modalUpdateOperationIsVisible}
                operation={data}
            />
            <TouchableOpacity onPress={() => {
                setModalUpdateOperationIsVisible(true)
            }} style={styles.transactionContainer}>

                <View style={{flexDirection: 'row', flex: 5}}>
                    <View style={styles.transactionIconContainer}>
                        <Icon
                            style={styles.transactionIcon}
                            name={data.categoryIcon}
                            color={data.categoryColor}
                            size={IconSizes.normal}
                        />
                    </View>
                    <View style={styles.transactionDetailContainer}>
                        <Text numberOfLines={1} style={styles.transactionTitle}>
                            {data.details}
                        </Text>
                        <Text
                            style={[styles.transactionType, {color: data.categoryColor}]}>
                            {data.categoryName}
                            {/*{data.type === IOperationTypeEnum.EXPENSE && 'Dépense'}*/}
                            {/*{data.type === IOperationTypeEnum.INCOME && 'Revenu'}*/}
                        </Text>
                    </View>
                </View>
                <View style={[styles.transactionDetailAmountContainer, {flex: 3}]}>
                    <Text numberOfLines={1}
                          style={[styles.transactionAmountTitle, {color: data.type === IOperationTypeEnum.EXPENSE ? red : green}]}>
                        {data.type === IOperationTypeEnum.EXPENSE && '-'}
                        {data.type === IOperationTypeEnum.INCOME && '+'}
                        XAF {data.amount}
                    </Text>
                    <Text style={styles.transactionTime}>{date}</Text>
                </View>
            </TouchableOpacity>
        </>
    );
};
export default TransactionItem;
