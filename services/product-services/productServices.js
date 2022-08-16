import axios from "axios";
import { URL } from "../baseService";

const ALL_PRODUCTS = `${URL}/api/products`;
const PROMOTIONS = `${URL}/api/promotions`;
const INGREDIENTS = `${URL}/api/ingredients`;
const MOST_POPULAR = `${URL}/api/products/mostpopular`;

const getAllProducts = async (params) => {
	const res = await axios.get(`${ALL_PRODUCTS}?PageSize=${params?.pageSize || 6}&PageIndex=${params?.pageIndex || 1}`);
	return res;
};

const getProductsByCategory = async (params) => {
	const res = await axios.get(`${ALL_PRODUCTS}?PageSize=${params?.pageSize || 6}&PageIndex=${params?.pageIndex || 1}&Category=${params?.category || 'pizzas'}`);
	return res;
};

const getPromotions = async () => {
	const res = axios.get(PROMOTIONS);
	return res;
};

const getIngredients = async (id) => {
	const res = axios.get(!id ? INGREDIENTS : `${INGREDIENTS}/${id}`);
	return res;
};
const getMostPopular = async (id) => {
	const res = axios.get(MOST_POPULAR);
	return res;
};

const searchProduct = async (product) => {
	const res = axios.get(`${ALL_PRODUCTS}?Search=${product}`);
	return res;
};

const searchPromotionById = async (e) => {
	const id = e.target ? e.target.dataset.id : e;
	const res = await axios.get(PROMOTIONS);
	const selectedProduct = res.data.filter(prod => +id === +prod.id);
	return selectedProduct;
};

export const productServices = {
	getAllProducts,
	getProductsByCategory,
	getPromotions,
	getIngredients,
	getMostPopular,
	searchProduct,
	searchPromotionById
};