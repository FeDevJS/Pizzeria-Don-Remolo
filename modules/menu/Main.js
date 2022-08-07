import { CurrentView } from "./components/CurrentView";
import { MenuNavBar } from "./components/MenuNavBar";

const Main = () => {
	return (
		<section className="relative h-screen">
			<MenuNavBar />
			<CurrentView />
		</section>
	);
};

export default Main;