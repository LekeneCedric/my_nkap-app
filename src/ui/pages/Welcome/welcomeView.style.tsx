import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { StyleSheet } from 'react-native';
import { Theme } from "../../Global/Theme.ts";
import { FontSize } from "../../Global/FontSize.ts";

const styles = StyleSheet.create({
	pageContainer: {
		flexDirection: 'column',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Theme.light
	},
	logo: {
		width: wp('40%'),
		height: hp('19.5%'),
		alignSelf: 'center',
		backgroundColor: Theme.light,
	},
	container1: {
		backgroundColor: Theme.light,
		flex: 4,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	container2: {
		backgroundColor: Theme.light,
		flex: 3,
		width: '100%',
		alignItems: 'center',
		padding: wp('5%'),
		borderTopLeftRadius: wp('10%'),
		borderTopRightRadius: wp('10%'),
	},
	cardShadow: {
		backgroundColor: Theme.primary,
		shadowColor: '#171717',
    	shadowOffset: {width: 5, height: 5},
    	shadowOpacity: 0.2,
    	shadowRadius: wp('10%'),
		elevation: 10
	},
	title: {
		fontSize: FontSize.high,
		textAlign: 'center',
		color: Theme.light,
		fontWeight: 'bold'
	},
	description: {
		marginTop: hp('2%'),
		fontSize: FontSize.medium,
		textAlign: 'center',
		color: Theme.light,
		fontWeight: '600'
	},
	indicatorsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		backgroundColor: Theme.primary,
		width: '50%',
		marginBottom: hp('4%')
	},
	selectedSliceIndicator: {
		flex: 0.5,
		borderRadius: 10,
		backgroundColor: Theme.light,
		padding: 5,
		borderWidth: 1,
		borderColor: Theme.light,
	},
	notSelectedSliceIndicator: {
		flex: 0.05,
		borderRadius: 10,
		backgroundColor: Theme.primary,
		padding: 5,
		borderWidth: 1,
		borderColor: Theme.light,
	},
	nextButton: {
		backgroundColor: Theme.light,
		borderRadius: 100,
		padding: wp('4%'),
		alignItems: 'center',
		marginTop: hp('2%')
	},
	nextIcon: {
		color: Theme.primary
	}
});
export default styles;
