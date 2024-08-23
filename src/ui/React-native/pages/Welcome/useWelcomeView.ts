import { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { routes } from '../routes';
import useCustomTranslation from "../../Shared/Hooks/useCustomTranslation.ts";

interface useWelcomeViewBehavior {
	currentTitle: string,
	currentDescription: string,
	slides: number[],
	currentSlide: number,
	nextSlide: () => void,
	prevSlide: () => void,
	goToSlide: (pos: number) => void,
}

export const useWelcomeView = (): useWelcomeViewBehavior => {
	const {
		translate,
	} = useCustomTranslation();
	const navigation = useNavigation();
	const slides = [0, 1, 2];
	const [currentSlide, setCurrentSlide] = useState<number>(0);
	const [currentTitle, setCurrentTitle] = useState<string>('');
	const [currentDescription, setCurrentDescription] = useState<string>('');

	const nextSlide = () => {
		if (currentSlide < 2) {
			setCurrentSlide(prev => prev + 1)
		}
		if (currentSlide >= 2) {
			//@ts-ignore
			navigation.navigate(routes.auth.login)
		}
	};
	const prevSlide = () => {
		if (currentSlide > 0) {
			setCurrentSlide(prev => prev - 1)
		}
	}
	const goToSlide = (pos: number) => {
		setCurrentSlide(pos)
	}

	const setCorrespondingContent = () => {
		switch (currentSlide) {
			case 0:
				setCurrentTitle(translate(`welcome_slide_1_title`));
				setCurrentDescription(translate(`welcome_slide_1_description`));
				break;
			case 1:
				setCurrentTitle(translate(`welcome_slide_2_title`));
				setCurrentDescription(translate(`welcome_slide_2_description`));
				break;
			case 2:
				setCurrentTitle(translate(`welcome_slide_3_title`));
				setCurrentDescription(translate(`welcome_slide_3_description`));
				break;
			default:
				break;
		}
	}

	useEffect(() => {
		setCorrespondingContent()
	}, [currentSlide])
	return {
		currentTitle: currentTitle,
		currentDescription: currentDescription,
		currentSlide: currentSlide,
		slides: slides,
		nextSlide: nextSlide,
		prevSlide: prevSlide,
		goToSlide: goToSlide,
	}
}
