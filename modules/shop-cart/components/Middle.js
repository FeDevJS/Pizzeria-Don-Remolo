import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CartProduct from '../../shared/CartProduct/Main';

export const Middle = () => {
	const currentProducts = useSelector(state => state.cart);
	// useEffect(() => {
	// 	console.log(currentProducts)
	// }, []);
	return (
		<>
			<div className='h-full max-h-[402px] border-t border-b border-gray overflow-y-auto'>
				{currentProducts?.cart?.data?.map(product => (
					<CartProduct
						key={product.id}
						id={product.id}
						title ={product.title}
						productPrice = {product.productPrice}
						img ={product.img}
						size = {product.size}
						dough = {product.dough}
						additional = {[ ...product.drinks, ...product.ingredients ]}
					/>
				))}
			</div>
		</>
	);
};