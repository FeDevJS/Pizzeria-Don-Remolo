import Image from 'next/image';

export const SocialButtons = () => {
	return (
		<div>
			<div className="flex py-1 items-center">
				<span className="flex-grow border-t border-gray-dark"></span>
				<span className="flex-shrink mx-4 text-gray-400">o</span>
				<span className="flex-grow border-t border-gray-dark"></span>
			</div>
			<button className="button border border-gray-dark mt-2 text-black ">
				<Image
					src={require('../../../public/assets/iconGoogle.png')}
					alt="googleIcon"
				/>
				Iniciar Sesión con Google
			</button>
			<button className="button bg-facebook mt-2 text-white">
				<Image
					src={require('../../../public/assets/iconFacebook.png')}
					alt="facebookIcon"
				/>
				Iniciar Sesión con Facebook
			</button>
		</div>
	);
};
