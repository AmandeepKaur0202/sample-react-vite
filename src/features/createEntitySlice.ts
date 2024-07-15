import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface EntityState<T> {
  [index: string]:T[];
}
export const createEntitySlice = <T>(name: string, initialState: EntityState<T>) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      setItems: (state, action: PayloadAction<T[]>) => {
        // @ts-ignore
        state.items = action.payload
      },
      addItem: (state, action: PayloadAction<T>) => {
        // @ts-ignore
        state.items.push(action.payload)
      },
      updateItem: (state, action: PayloadAction<T>) => {
        // @ts-ignore
        const index = state.items.findIndex(item => item.id === action.payload.id)
        if (index !== -1) {
          // @ts-ignore
          state.items[index] = action.payload
        }
      },
      deleteItem: (state, action: PayloadAction<number>) => {
        // @ts-ignore
        state.items = state.items.filter(item => item.id !== action.payload)
      },
    },
  })
}
