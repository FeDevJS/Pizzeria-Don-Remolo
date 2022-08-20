import React, { useEffect } from 'react';
import { getMenuByCategory } from '/redux/slices/menuCategories/categories.js';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from '/modules/shared/ProductCard.js';
import PropTypes from 'prop-types';

export const Desserts = ({ refProp }) => {
	const dispatch = useDispatch();

	let { category } = useSelector((state) => state.categories);

	useEffect(() => {
		dispatch(getMenuByCategory({ category: 'postres' }));
	}, [dispatch]);

	const handleclick = () => {
		console.log('nhklk');
	};

	return (
		<div ref={refProp} className="px-2 md:px-0 lg:w-[90%] xl:max-w-[70%] mx-auto mt-8">
			<h2 className="text-[1.2rem] font-bold uppercase">Postres</h2>
			<div className="h-full flex flex-wrap gap-4 gap-y-8 lg:grid lg:grid-cols-4">
				{category.postres?.data?.map((product) => (
					<div key={product.id} className="min-h-[320px]">
						<ProductCard
							key={product.id}
							title={product.name}
							desc={product.description}
							price={product.price}
							newPrice={''}
							id={product.id}
							image={product.picture}
							onClick={handleclick}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

Desserts.propTypes = {
	refProp: PropTypes.object,
};
