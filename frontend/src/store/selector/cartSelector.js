import { createSelector } from 'reselect';

const selectCart = (state) => state.cart

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

// export const selectCartItemsCount = createSelector(
//   [selectCartItems],
//   (cartItems) =>
//     cartItems.reduce(
//       (totalqty, cartItem) => totalqty + cartItem.quantity,
//       0
//     )
// );

export const selectCartItemsCount = createSelector(
  [selectCart],
  (cart) => cart.cartItems.length
)

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (totalPrice, cartItem) => totalPrice + cartItem.quantity * cartItem.price,
    0
  )
);
