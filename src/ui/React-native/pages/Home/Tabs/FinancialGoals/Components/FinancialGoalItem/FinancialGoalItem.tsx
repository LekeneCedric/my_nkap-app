import {FinancialGoalStatus, IFinancialGoal} from "../../../../../../../../Domain/FinancialGoal/FinancialGoal.ts";
import useTheme from "../../../../../../Shared/Hooks/useTheme.ts";
import {Text, TouchableOpacity, View} from "react-native";
import FinancialGoalItemStyles from "./FinancialGoalItem.styles.ts";
import 'moment-duration-format';
import 'moment/locale/fr';
import FinancialGoalDetailsModalView from "../../Modals/FinancialGoalDetailsModal/FinancialGoalDetailsModalView.tsx";
import useFinancialGoalItem from "./useFinancialGoalItem.ts";
import {FontSize} from "../../../../../../Global/FontSize.ts";
import {Widget} from "../../../../../../Components/Widget/Widget.tsx";

type props = {
    data: IFinancialGoal
}
const FinancialGoalItem = ({data}: props) => {
    const {
        colorPalette: {
            pageBackground,
            containerBackground,
            action1,
            text,
            gray,
            light,
            red,
            green
        }
    } = useTheme();
    const styles = FinancialGoalItemStyles({
        text: text,
        backgroundColor: containerBackground,
        gray: gray,
        action1: action1,
    });
    const {
        percentage,
        status,
        modalDetailsFinancialGoalIsVisible,
        setModalDetailsFinancialGoalIsVisible,
        formattedDurationEndDate,
    } = useFinancialGoalItem(data);

    const progressBarColor = status === FinancialGoalStatus.FAILED ? red
        : status === FinancialGoalStatus.PENDING ? action1
            : status === FinancialGoalStatus.COMPLETE ? green
                : action1;
    return <>
        <FinancialGoalDetailsModalView
            closeModal={() => {
                setModalDetailsFinancialGoalIsVisible(false);
            }}
            isVisible={modalDetailsFinancialGoalIsVisible}
            data={data}
        />
        <TouchableOpacity onPress={() => {
            setModalDetailsFinancialGoalIsVisible(true)
        }} style={styles.container}>
            <View style={styles.header}>
                <Text numberOfLines={2} style={styles.title}>{data.title}</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap'
                }}>
                    {
                        status === FinancialGoalStatus.FAILED ? (
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.labelDesc}>
                                    Status:
                                </Text>
                                <Widget backgroundColor={red} value={FinancialGoalStatus.FAILED}/>
                            </View>
                        ) : status === FinancialGoalStatus.PENDING ? (
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.labelDesc}>
                                    Status:
                                </Text>
                                <Widget backgroundColor={action1} value={FinancialGoalStatus.PENDING}/>
                            </View>

                        ) : status === FinancialGoalStatus.COMPLETE ? (
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={styles.labelDesc}>
                                    Status:
                                </Text>
                                <Widget backgroundColor={green} value={FinancialGoalStatus.COMPLETE}/>
                            </View>
                        ) : null
                    }
                    {
                        status === FinancialGoalStatus.PENDING &&
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={styles.labelDesc}>
                                Temps restant :
                            </Text>
                            {/*<View style={[styles.statusContainer, {backgroundColor: action1}]}>*/}
                                <Text style={[styles.statusText, {color: action1}]}>
                                    {formattedDurationEndDate}
                                </Text>
                            {/*</View>*/}
                        </View>
                    }

                </View>
            </View>
            <View style={styles.progression}>
                <View style={{
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: pageBackground,
                    width: '85%'
                }}>
                    <View style={{
                        width: `${percentage}%`,
                        height: '100%',
                        backgroundColor: progressBarColor,
                        borderRadius: 10,
                    }}/>

                </View>
                <Text style={[styles.percentage, {color: progressBarColor, fontWeight: 'bold'}]}>{`${percentage}%`}</Text>
            </View>
        </TouchableOpacity>
    </>
};
export default FinancialGoalItem;