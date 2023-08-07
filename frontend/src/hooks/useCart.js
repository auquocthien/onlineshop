import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  clearItemFromCart,
  removeItem,
  clearCartItems
} from 'store/actions/cartActions';

const useCart = () => {
  const dispatch = useDispatch();

  const incQty = useCallback(
    (product) => {
      dispatch(addToCart(product));
    },
    [dispatch]
  );

  const decQty = useCallback(
    (product) => {
      dispatch(removeItem(product));
    },
    [dispatch]
  );

  const removeItemFromCart = useCallback(
    (product) => {
      dispatch(clearItemFromCart(product));
    },
    [dispatch]
  );

  const clearCart = useCallback(
    (cartItems) => {
      dispatch(clearCartItems(cartItems))
    },
    [dispatch]
  )

  return {
    incQty,
    decQty,
    removeItemFromCart,
    clearCart
  };
};

export default useCart;
