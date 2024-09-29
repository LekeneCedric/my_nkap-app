import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import useTheme from "../../../../../../Shared/Hooks/useTheme";
import categoriesStyles from "./CategoriesView.styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Icons } from "../../../../../../Global/Icons";
import { IconSizes } from "../../../../../../Global/IconSizes";
import useCustomTranslation from "../../../../../../Shared/Hooks/useCustomTranslation";
import useCustomNavigation from "../../../../../../utils/useNavigation";
import SeachInput from "../../../../../../Components/SeachInput/SearchInput";
import useCategories from "./useCategories";
import Category from "./Category/Category";

const CategoriesView = () => {
    const {goBack} = useCustomNavigation();
    const {colorPalette: {pageBackground, text, containerBackground}} = useTheme();
    const {translate} = useCustomTranslation();
    const styles = categoriesStyles(pageBackground, text);
    const {filteredCategories, searchText, setSearchText} = useCategories();
    return <SafeAreaView style={styles.pageContainer}>
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={goBack}>
                <Icon
                    id="icon=id"
                    name={Icons.back}
                    size={IconSizes.medium}
                    color={text}
                />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
                {translate('settings')} {'>'} {translate('categories')}
            </Text>
        </View>
        <View style={{flexDirection: 'row', alignContent: 'center', marginTop: 10}}>
            <SeachInput value={searchText} onChange={setSearchText} backgroundColor={containerBackground} />
        </View>
        <ScrollView>
            <FlatList
                data={filteredCategories}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <Category data={item} />
                )}
            />
        </ScrollView>
    </SafeAreaView>
};

export default CategoriesView;