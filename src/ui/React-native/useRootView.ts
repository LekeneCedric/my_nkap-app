import {useCallback, useEffect, useMemo} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {
  selectActivationAccountExpTime,
  selectToken,
  selectUserStatus,
} from "../../Feature/Authentication/AuthenticationSelector";
import {DeactivateUserStatus, InitAIToken} from "../../Feature/Authentication/AuthenticationSlice";
import {UserStatusEnum} from "../../Domain/User/User";
import TimeConstants from "./Shared/Constants/Time";
import * as RNLocalize from "react-native-localize";
import CurrenciesFormat, {currencies} from "./Shared/Constants/Currencies";
import useCustomTranslation from "./Shared/Hooks/useCustomTranslation";
import {SwitchCurrency, SwitchTheme, Themes} from "../../Feature/Configuration/ConfigurationSlice";
import {Appearance, ColorSchemeName} from "react-native";
import { selectCurrentTheme } from "../../Feature/Configuration/ConfigurationSelector";

interface IUseRootViewBehaviour {
  isAuthenticated: boolean;
  status: UserStatusEnum;
}
const useRoot = (): IUseRootViewBehaviour => {
  const dispatch = useAppDispatch();
  const {changeLanguage} = useCustomTranslation();
  const token = useAppSelector(selectToken);
  const userStatus = useAppSelector(selectUserStatus);
  const currentTheme = useAppSelector(selectCurrentTheme);
  const activationAccountExpTime = useAppSelector(
    selectActivationAccountExpTime,
  );
  const locales = useMemo(() => RNLocalize.getLocales(), []);
  const localCurrencies = useMemo(() => RNLocalize.getCurrencies(), []);
  
  const getAppLanguagesAndCurrency = useCallback((): {sysLang: string; sysCurr: string} => {
    let systemLang = "en";
    let systemCurr = currencies[0];
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
  },[]);

  const updateLocalization = useCallback((sysLang: string, sysCurr: string) => {
    changeLanguage(sysLang);
    const currency = CurrenciesFormat.find(
      c => c.currency.toLocaleLowerCase() == sysCurr.toLowerCase(),
    );
    dispatch(SwitchCurrency(currency!));
  },[])

  useEffect(() => {
    const {sysLang, sysCurr} = getAppLanguagesAndCurrency();
    updateLocalization(sysLang, sysCurr);
    dispatch(InitAIToken());
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
