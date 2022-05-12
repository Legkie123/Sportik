import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export const CartReducer = (state, action) => {

    const { basket, fullPriceTag, fullAmount } = state;

    let product;
    let index;
    let updatedPrice;
    let updatedQty;

    switch (action.type) {

        case 'add_to_cart':

            const check = basket.find(product => product.ProductID === action.id);
            if (check) {
                toast.info('Этот товар уже в вашей корзине', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                });
                return state;
            }
            else {
                product = action.product;
                product['qty'] = 1;
                product['fullPriceTagPriceTagGoods'] = product.PriceTagGoods * product.qty;
                updatedQty = fullAmount + 1;
                updatedPrice = fullPriceTag + product.PriceTagGoods;
                return {
                    basket: [product, ...basket], fullPriceTag: updatedPrice, fullAmount: updatedQty
                }
            }       

        case 'INC':
            product = action.cart;
            product.qty = ++product.qty;
            product.fullPriceTag = product.qty * product.PriceTagGoods;
            updatedQty = fullAmount + 1;
            updatedPrice = fullPriceTag + product.PriceTagGoods;
            index = basket.findIndex(cart => cart.ProductID === action.id);
            basket[index] = product;
            return {
                basket: [...basket], fullPriceTag: updatedPrice, fullAmount: updatedQty
            }
            

        case 'DEC':
            product = action.cart;
            if (product.qty > 1) {
                product.qty = product.qty - 1;
                product.fullPriceTagPriceTagGoods = product.qty * product.PriceTagGoods;
                updatedPrice = fullPriceTag - product.PriceTagGoods;
                updatedQty = fullAmount - 1;
                index = basket.findIndex(cart => cart.ProductID === action.id);
                basket[index] = product;
                return {
                    basket: [...basket], fullPriceTag: updatedPrice, fullAmount: updatedQty
                }
            }
            else {
                return state;
            }
            

        case 'DELETE':
            const filtered = basket.filter(product => product.ProductID !== action.id);
            product = action.cart;
            updatedQty = fullAmount - product.qty;
            updatedPrice = fullPriceTag - product.qty * product.PriceTagGoods;
            return {
                basket: [...filtered], fullPriceTag: updatedPrice, fullAmount: updatedQty
            }
            

        case 'EMPTY':
            return {
                basket: [], fullPriceTag: 0, fullAmount: 0
            }

        default:
            return state;

    }

}
