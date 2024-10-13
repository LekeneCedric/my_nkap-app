import {Text, TouchableOpacity, View} from "react-native";
import {FontSize} from "../../../../Global/FontSize";
import useTheme from "../../../../Shared/Hooks/useTheme";
import Animated, {BounceInLeft, BounceInRight, BounceOutLeft} from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {IconSizes} from "../../../../Global/IconSizes";
import {OperationProcessingByAI} from "../../../../../../Feature/AIOperations/Thunks/ProcessingByAI/ProcessingByAIResponse";
import useMoneyParser from "../../../../Shared/useMoneyParser";
import {useAppSelector} from "../../../../../../app/hook";
import {selectCategory} from "../../../../../../Feature/Category/CategorySelector";
import {IOperationTypeEnum} from "../../../../../../Domain/Operation/Operation";
import {useEffect, useRef, useState} from "react";
import moment from "moment";
import "moment/locale/fr";
import "moment/locale/en-gb";
import useCustomTranslation from "../../../../Shared/Hooks/useCustomTranslation";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Icons } from "../../../../Global/Icons";
import UpdateOperationItemModal from "./Modal/UpdateOperationItemModal/UpdateOperationItemModal";
import React from "react";

type props = {
  data: OperationProcessingByAI;
  deleteOperation: () => void,
};
const OperationItem = ({data, deleteOperation}: props) => {
  const [isVisibleUpdateOperationModal, setIsVisibleUpdateOperationModal] = useState(false);
  const {currentLanguage, translate} = useCustomTranslation();
  const {
    colorPalette: {containerBackground, text, green, red, gray, action1},
  } = useTheme();
  const color = data.type === IOperationTypeEnum.INCOME ? green : red;
  const {parseThousand} = useMoneyParser();
  const selectedCategory = useAppSelector(state =>
    selectCategory(state, data.categoryId),
  );
  const swipeRef = useRef<Swipeable | null>(null);
  const accountIsNotDefined = data.accountId === undefined;
  const renderedActions = () => {
    return <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={()=>{setIsVisibleUpdateOperationModal(true)}} style={{width: 50, alignItems: 'center'}}>
        <Icon name={Icons.edit} size={IconSizes.normal} color={action1} />
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteOperation} style={{width: 50, alignItems: 'center'}}>
        <Icon name={Icons.trash} size={IconSizes.normal} color={red} />
      </TouchableOpacity>
    </View>
  }

  const onPressSimulateSwipe= () => {
    if (swipeRef.current) {
      swipeRef.current.openRight();
    }
  }
  useEffect(() => {
    moment.locale(currentLanguage);
  }, []);
  return (
    <>
    <UpdateOperationItemModal
      closeModal={()=>{
        setIsVisibleUpdateOperationModal(false);
        if (swipeRef.current) {
          swipeRef.current.close();
        }
      }}
      isVisible={isVisibleUpdateOperationModal}
      data={data}
    />
    <Animated.View entering={BounceInLeft.duration(1000)} exiting={BounceOutLeft.duration(100)}>
      <Swipeable ref={swipeRef}
       renderRightActions={() => renderedActions() }>
        <TouchableOpacity
          onPress={onPressSimulateSwipe}
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 50,
            margin: 8,
            backgroundColor: containerBackground,
            shadowColor: "#171717",
            shadowOffset: {width: 5, height: 5},
            shadowOpacity: 0.2,
            shadowRadius: 20,
            elevation: 10,
            borderRadius: 10,
          }}>
          <View
            style={{
              height: "100%",
              borderBottomLeftRadius: 10,
              borderTopLeftRadius: 10,
              width: "5%",
              backgroundColor: color,
            }}
          />
          <View
            style={{
              paddingLeft: 5,
              paddingRight: 5,
              width: "95%",
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <Text style={{color: text, fontSize: FontSize.normal}}>
                {data.title}
              </Text>
              <Text
                style={{
                  fontSize: FontSize.normal,
                  color: color,
                  fontWeight: "bold",
                }}>
                {parseThousand(Number(data.amount))}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                {
                  selectedCategory && <Icon
                  name={selectedCategory!.icon}
                  color={selectedCategory!.color}
                  size={IconSizes.normSmall}
                  style={{marginRight: 2}}
                />
                }
                <Text style={{fontSize: FontSize.normal, color: text}}>
                  {selectedCategory?.name}
                </Text>
              </View>
              <Text style={{fontSize: FontSize.normal, color: text, fontWeight: '100'}}>
                {moment(data.date).format("dddd HH:mm")}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {
          accountIsNotDefined && (
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5, marginLeft: 8}}>
            <Icon name={Icons.info} color={red} size={IconSizes.small} />
            <Text style={{fontSize: FontSize.small, color: red, marginLeft: 5}}>{translate("account-not-selected")}</Text>
          </View>
          )
        }
        
      </Swipeable>
    </Animated.View>
    </>
  );
};

export default OperationItem;
