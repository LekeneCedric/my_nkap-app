import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {
  selectActivationAccountExpTime,
  selectToken,
  selectUserStatus,
} from "../../Feature/Authentication/AuthenticationSelector";
import {DeactivateUserStatus} from "../../Feature/Authentication/AuthenticationSlice";
import {UserStatusEnum} from "../../Domain/User/User";
import TimeConstants from "./Shared/Constants/Time";
import * as RNLocalize from "react-native-localize";
import CurrenciesFormat, {currencies} from "./Shared/Constants/Currencies";
import useCustomTranslation from "./Shared/Hooks/useCustomTranslation";
import {SwitchCurrency, SwitchTheme} from "../../Feature/Configuration/ConfigurationSlice";
import {Appearance, ColorSchemeName} from "react-native";

interface IUseRootViewBehaviour {
  isAuthenticated: boolean;
  status: UserStatusEnum;
}
const useRoot = (): IUseRootViewBehaviour => {
  const dispatch = useAppDispatch();
  const {changeLanguage} = useCustomTranslation();
  const token = useAppSelector(selectToken);
  const userStatus = useAppSelector(selectUserStatus);
  const activationAccountExpTime = useAppSelector(
    selectActivationAccountExpTime,
  );

  const updateTheme = (colorScheme: ColorSchemeName) => {
    const currentTheme = colorScheme === 'dark' ? 'dark' : 'light';
    dispatch(SwitchTheme(currentTheme));
  };
  
  const getAppLanguagesAndCurrency = (): {sysLang: string; sysCurr: string} => {
    let systemLang = "en";
    let systemCurr = currencies[0];
    const locales = RNLocalize.getLocales();
    const localCurrencies = RNLocalize.getCurrencies();

    if (locales.length > 0) {
      let lang = locales[0].languageCode;
      if (["en", "fr", "de"].includes(lang)) {
        systemLang = lang;
      }
    }

    if (localCurrencies.length > 0) {
      let curr = localCurrencies[0];
      if (currencies.includes(curr)) {
        systemCurr = curr;
      }
    }

    return {
      sysLang: systemLang,
      sysCurr: systemCurr,
    };
  };

  const updateLocalization = (sysLang: string, sysCurr: string) => {
    changeLanguage(sysLang);
    const currency = CurrenciesFormat.find(
      c => c.currency.toLocaleLowerCase() == sysCurr.toLowerCase(),
    );
    dispatch(SwitchCurrency(currency!));
  };

  useEffect(() => {
    const {sysLang, sysCurr} = getAppLanguagesAndCurrency();
    updateLocalization(sysLang, sysCurr);
  }, []);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      updateTheme(colorScheme);
    });

    // Clean up the listener when the component unmounts
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const differenceBetweenExpAndCurrTime = Math.floor(
      (new Date().getTime() - activationAccountExpTime) / 1000,
    );
    const activationAccountTimeIsPassed =
      TimeConstants.tenMinutesInSeconds < differenceBetweenExpAndCurrTime;
    if (activationAccountExpTime !== 0 && activationAccountTimeIsPassed) {
      console.warn("deactivate");
      dispatch(DeactivateUserStatus());
    }
  }, [activationAccountExpTime]);
  return {
    isAuthenticated:
      token !== undefined && userStatus === UserStatusEnum.ACTIVATE,
    status: userStatus,
  };
};
export default useRoot;
