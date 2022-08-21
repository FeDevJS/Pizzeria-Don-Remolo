import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useOnModalChange } from "../../../../hooks/useOnModalChange";
import { useSelectProduct } from "../../../../hooks/useSelectProduct";
import { handleAddToCart, handleEditCartItem } from "../../../../redux/slices/cart/cartSlice";
import { CartPlus } from "./CartPlus";
import DetailsHeader from "./DetailsHeader";
import { PickDough } from "./PickDough";
import { PickDrink } from "./PickDrink";
import { PickIngredients } from "./PickIngredients";
import { PickSize } from "./PickSize";

export const Details = () => {
	const { currentState } = useSelectProduct();
	const { handleWindow } = useOnModalChange();
	const cartState = useSelector(state => state.cart);
	const actionType = cartState.cart.actionType;
	const dispatch = useDispatch();
	const [values, setValues] = useState({
		title: "",
		size: cartState?.cart?.selectedEditItem?.size || "Mediana",
		dough: cartState?.cart?.selectedEditItem?.dough || "Masa normal",
		ingredients: cartState?.cart?.selectedEditItem?.ingredients || [],
		rawIngredients: cartState?.cart?.selectedEditItem?.rawIngredients || [],
		drinks: cartState?.cart?.selectedEditItem?.drinks || [],
		rawDrinks: cartState?.cart?.selectedEditItem?.rawDrinks || [],
		img: "",
		productPrice: cartState?.cart?.selectedEditItem?.productPrice || 12.00,
		additionalPrice: cartState?.cart?.selectedEditItem?.additionalPrice || 0,
		quantity: 1,
		productSubtotal: cartState?.cart?.selectedEditItem?.productSubtotal || 0,
	});
	useEffect(() => {
		console.log(cartState?.cart?.selectedEditItem)
	}, []);
	const handleChange = (e) => {
		const type = e.target.dataset.type;
		const price = e.target.dataset.price ? e.target.dataset.price : null;
		const filteredAdditional = [];
		const filteredRawAdditional = [];
		if(type === "sizes") {
			setValues({ 
				...values, 
				size: e.target.value, 
				productPrice: price,
			});
		} else if(type === "dough") {
			setValues({ 
				...values, dough: e.target.value 
			});
		} else if(type === "ingredients") {
			if(values.ingredients.find(ingredient => ingredient.ingredient === e.target.value)) {
				filteredAdditional = values.ingredients.filter(ingredient => ingredient.ingredient !== e.target.value);
				filteredRawAdditional = values.rawIngredients.filter(rawIngredient => rawIngredient !== e.target.value);
				return setValues({ 
					...values, 
					additionalPrice: +values.additionalPrice - +price, 
					rawIngredients: [ ...filteredRawAdditional ],
					ingredients: [ ...filteredAdditional ]
				});
			};
			setValues(prevState => {
				return { 
					...values,
					additionalPrice: +prevState.additionalPrice + +price,
					rawIngredients: [ ...values.rawIngredients, e.target.value ],
					ingredients: [ ...values.ingredients, {ingredient: e.target.value, price, checked: true, }] 
				};
			});
		} else if(type === "drinks") {
			if(values.drinks.find(drink => drink.drink === e.target.value)) {
				filteredAdditional = values.drinks.filter(drink => drink.drink !== e.target.value);
				filteredRawAdditional = values.rawDrinks.filter(rawDrink => rawDrink !== e.target.value);
				return setValues({ 
					...values, 
					additionalPrice: +values.additionalPrice - +price,
					rawDrinks: [ ...filteredRawAdditional ],
					drinks: [ ...filteredAdditional ] 
				});
			};
			setValues(prevState => {
				return { 
					...values,
					additionalPrice: +prevState.additionalPrice + +price, 
					rawDrinks: [ ...values.rawDrinks, e.target.value ],
					drinks: [ ...values.drinks, {drink: e.target.value, price }] 
				};
			});
		};
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if(actionType === "edit") {
			dispatch(handleEditCartItem({
				totalPrice: +cartState.cart.totalPrice + +values.productPrice + +values.additionalPrice,
				data: { 
					...values,
					id: cartState?.cart?.selectedEditItem?.id,
					title: cartState?.cart?.selectedEditItem?.title,
					img: cartState?.cart?.selectedEditItem?.img,
					quantity: cartState?.cart?.selectedEditItem?.quantity,
					productSubtotal: +values.productPrice + +values.additionalPrice,
				}
			}));
		} else if(actionType === "add") {
			dispatch(handleAddToCart({
				totalPrice: +cartState.cart.totalPrice + +values.productPrice + +values.additionalPrice,
				data: { 
					...values, 
					id: currentState?.selectedProduct?.id,
					img: currentState?.selectedProduct?.picture,
					title: currentState?.selectedProduct?.title,
					quantity: currentState?.selectedProduct?.quantity,
					productSubtotal: +values.productPrice + +values.additionalPrice,
				}
			}));
		};
		handleWindow("cart");
	};
	return (
		<form className="w-full h-max p-3 sm:w-[60%]" onChange={handleChange} onSubmit={handleSubmit}>
			<DetailsHeader title="Tamaños" icon="pizza" iconTitle="Icono pizza" required={true}>
				<PickSize />
			</DetailsHeader>
			<DetailsHeader title="Elige la masa" icon="dough" iconTitle="Icono masa" required={true}>
				<PickDough />
			</DetailsHeader>
			<DetailsHeader title="Añade ingredientes" icon="ingredients" iconTitle="Icono ingredientes">
				<PickIngredients />
			</DetailsHeader>
			<DetailsHeader title="Añade bebidas" icon="drink" iconTitle="Icono bebidas">
				<PickDrink />
			</DetailsHeader>
			<div className="flex justify-center p-2">
				<div className="w-full max-w-[270px]">
					<button className="flex justify-between items-center gap-2 p-4 w-full h-[40px] text-white bg-primary rounded-[50px]" type="submit">
						<CartPlus />
						<span>Agregar al carrito</span>
						<span>|</span>
						<span>
							${currentState?.selectedProduct?.quantity ?
							(currentState?.selectedProduct?.quantity * +values.productPrice)
							+
							(+currentState?.selectedProduct?.quantity * +values.additionalPrice)
							: 12
							}
						</span>
					</button>
				</div>
			</div>
		</form>
	);
};