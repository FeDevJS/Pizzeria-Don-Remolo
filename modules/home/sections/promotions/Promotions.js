import { useEffect, useState } from 'react';
import { useSelectProduct } from '../../../../hooks/useSelectProduct';
import { productServices } from '../../../../services/product-services/productServices';
import { ProductCard } from '../../../shared/ProductCard';

export const Promotions = () => {
	const [promotions, setPromotions] = useState(null);
	const { handlePromotion } = useSelectProduct();

	useEffect(() => {
		productServices.getPromotions().then((res) => setPromotions(res.data));
	}, []);

	return (
		<div className="px-2 flex flex-col h-screen max-h-[380px] lg:w-[90%] xl:max-w-[70%] mx-auto pt-2 gap-2 md:max-h-[400px] lg:max-h-[450px]">
			<div className="flex w-full max-w-[1200px]">
				<h2 className="text-[1.2rem] font-bold">PROMOCIONES</h2>
			</div>
			<section className="flex justify-between overflow-hidden gap-4 overflow-x-scroll min-h-[255px] h-full">
				{promotions &&
					promotions.map((promo) => (
						<ProductCard
							key={promo.id}
							title={promo.title}
							desc={promo.description}
							oldPrice={promo.originalPrice}
							newPrice={promo.promotionalPrice}
							id={promo.id}
							onClick={handlePromotion}
						/>
					))}
			</section>
		</div>
	);
};
