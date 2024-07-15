import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useEffect } from 'react'
import axios from 'axios'
import { dispatchActionToSlice } from '../app/store';

export const useCrud = <T>(entity: string, setItemsAction: (items: T[]) => void) => {
  const dispatch = useDispatch()
        // @ts-ignore

  const items = useSelector((state: RootState) => state?.['items'].items)
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/${entity}`)
      // @ts-ignore
      dispatch(setItemsAction(response.data))
    }
    fetchData()
  }, [dispatch, entity, setItemsAction])

  const createItem = async (item: T) => {
    const response = await axios.post(`https://jsonplaceholder.typicode.com/${entity}`, item)
    return response.data
  }

  const updateItem = async (id: number, item: T) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/${entity}/${id}`, item)
    return response.data
  }

  const deleteItem = async (id: number) => {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/${entity}/${id}`)
    return response.data
  }

  return {
    items,
    createItem,
    updateItem,
    deleteItem,
  }
}
