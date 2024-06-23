import { useEffect, useState } from 'react'
import { useNavigation } from "@react-navigation/native";
import { routes } from '../routes';

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
				setCurrentTitle(`Avoir un oeil constant sur vos finances !`);
				setCurrentDescription(`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500`);
				break;
			case 1:
				setCurrentTitle(`Pouvoir retracer vos transactions financières !`);
				setCurrentDescription(`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500`);
				break;
			case 2:
				setCurrentTitle(`Allez lancez vous !`);
				setCurrentDescription(`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500`);
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
