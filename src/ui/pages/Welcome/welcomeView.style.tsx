import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
import { Theme } from "../../Global/Theme.ts";
import { FontSize } from "../../Global/FontSize.ts";

const WelcomeViewStyles = (pageBackgroundColor: string, containerBackgroundColor: string, textColor: string, action1Color: string, action1TextColor: string) => {
	return StyleSheet.create({
	pageContainer: {
		flexDirection: 'column',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: pageBackgroundColor
	},
	logo: {
		width: wp('40%'),
		height: hp('19.5%'),
		alignSelf: 'center',
		backgroundColor: pageBackgroundColor,
	},
	container1: {
		backgroundColor: pageBackgroundColor,
		flex: 4,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	container2: {
		backgroundColor: containerBackgroundColor,
		flex: 3,
		width: '100%',
		alignItems: 'center',
		padding: wp('5%'),
		borderTopLeftRadius: wp('10%'),
		borderTopRightRadius: wp('10%'),
	},
	cardShadow: {
		backgroundColor: containerBackgroundColor,
		shadowColor: '#171717',
    	shadowOffset: {width: 5, height: 5},
    	shadowOpacity: 0.2,
    	shadowRadius: wp('10%'),
		elevation: 10
	},
	title: {
		fontSize: FontSize.mediumHigh,
		textAlign: 'center',
		color: action1Color,
		fontWeight: 'bold'
	},
	description: {
		marginTop: hp('2%'),
		fontSize: FontSize.medium,
		textAlign: 'center',
		color: textColor,
		fontWeight: '600'
	},
	indicatorsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: containerBackgroundColor,
		width: '50%',
		marginBottom: hp('4%')
	},
	selectedSliceIndicator: {
		flex: 0.5,
		borderRadius: 10,
		backgroundColor: action1Color,
		padding: 5,
		borderWidth: 1,
		borderColor: action1Color,
	},
	notSelectedSliceIndicator: {
		flex: 0.05,
		borderRadius: 10,
		backgroundColor: containerBackgroundColor,
		padding: 5,
		borderWidth: 1,
		borderColor: textColor,
	},
	nextButton: {
		backgroundColor: action1Color,
		borderRadius: 100,
		padding: wp('4%'),
		alignItems: 'center',
		marginTop: hp('2%')
	},
	nextIcon: {
		color: action1TextColor
	}
});}
export default WelcomeViewStyles;
