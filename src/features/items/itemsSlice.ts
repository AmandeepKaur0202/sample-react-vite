import { createEntitySlice } from '../createEntitySlice'

interface Item {
  id: number
  title: string
}

const initialState = {
  items: [] as Item[],
}

const itemsSlice = createEntitySlice<Item>('items', initialState)

export const { setItems, addItem, updateItem, deleteItem } = itemsSlice.actions
export default itemsSlice.reducer
