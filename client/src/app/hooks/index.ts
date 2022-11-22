import {AppDispatch, RootState} from "../redux/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {useLayoutEffect, useState} from "react";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useWindowSize = () => {
	const [size, setSize] = useState<{windowWidth: number, windowHeight: number}>({windowWidth: 0, windowHeight: 0});
	useLayoutEffect(() => {
		function updateSize() {
			setSize({windowWidth: window.innerWidth, windowHeight: window.innerHeight});
		}
		window.addEventListener('resize', updateSize);
		updateSize();
		return () => window.removeEventListener('resize', updateSize);
	}, []);
	return size;
}