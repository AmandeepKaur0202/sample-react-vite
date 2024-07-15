import { configureStore } from '@reduxjs/toolkit';
 import itemsReducer from '../features/items/itemsSlice'

 export const store = configureStore({
  reducer: {
    items: itemsReducer,
    // Add other reducers as needed
  },
});

// Function to dispatch actions dynamically
export const dispatchActionToSlice = (sliceName: string, action: any) => {
  store.dispatch({
    type: `${action.type}`, // Construct action type dynamically
    payload: action.payload,
    sliceName
  });
};

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch