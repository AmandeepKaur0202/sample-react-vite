import React, { useState, useEffect } from 'react'
import { useCrud } from '../hooks/useCrud'
import { useDispatch } from 'react-redux'
import { Table, Button, Modal, Form, Input, Skeleton, message, Checkbox } from 'antd';
import { setItems, addItem, updateItem as updateItemAction, deleteItem } from '../features/items/itemsSlice'
import { SearchOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next'
import { List } from 'react-virtualized';
import ItemForm from './ItemForm';
import { dispatchActionToSlice } from '../app/store';

import 'react-virtualized/styles.css';
import '../i18n' 

interface MyComponentProps {
  type: string;
}

const ItemList: React.FC<MyComponentProps> = ({type}) => {
  const dispatch = useDispatch()
  // @ts-ignore
  const { items, loading, createItem, updateItem, deleteItem } = useCrud(type, setItems)
  const [visible, setVisible] = useState(false)
  const [editingItem, setEditingItem] = useState<{ id: number, title: string } | null>(null)
  const { t } = useTranslation()

  const onCreate = async (values: { title: string }) => {
    try {
      const newItem = await createItem({ id: Date.now(), title: values.title })
      dispatchActionToSlice(type, addItem(newItem));

      setVisible(false)
      message.success(t('msg_add_success'))
    } catch (error) {
      console.error('Error creating item:', error)
      message.error(t('msg_add_error')) 
    }
  }

  const onUpdate = async (values: { id: number, title: string }) => {
    try {
      // @ts-ignore
      const updatedItem = await updateItem(values.id, { title: values.title })
      dispatchActionToSlice(type, updateItemAction(updatedItem));
      setVisible(false)
      setEditingItem(null)
      message.success(t('msg_update_success')) 
    } catch (error) {
      console.error('Error updating item:', error)
      message.error(t('msg_update_error')) 
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteItem(id)
      // @ts-ignore
      dispatchActionToSlice(type,deleteItem(id));
      message.success(t('msg_delete_success'))
    } catch (error) {
      console.error('Error deleting item:', error)
      message.error(t('msg_delete_error')) 
    }
  }

  const showDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: t('confirmDelete'),
      content: t('deleteAction'),
      okText: t('yes'),
      okType: 'danger',
      cancelText: t('no'),
      onOk() {
        handleDelete(id)
      },
    })
  }

  const handleEdit = (record: { id: number, title: string }) => {
    setEditingItem(record)
    setVisible(true)
  }

  const columns = [
    {
      title: t('name'),
      dataIndex: 'title',
      key: 'title',
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
      filters: Array.from(new Set(items.map((item:any) => item.title))).map((title) => ({
        text: title,
        value: title,
      })),
      onFilter: (value: any, record: any) => record.title.includes(value),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => {
        const rowHeight = 24; 
        const rowCount = items.length; 
        const height = Math.min(200, rowCount * rowHeight); 

        return (
          <div style={{ padding: 8 }}>
            <Input
              placeholder={t('searchName')}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => confirm()}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => confirm()}
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              {t('search')}
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90, marginRight: 8 }}>
              {t('reset')}
            </Button>
            <Button onClick={() => { clearFilters(); confirm(); }} size="small" style={{ width: 90 }}>
              {t('cancel')}
            </Button>
            <div style={{ marginTop: 8, height: height }}>
              <List
                width={500} // Width of the virtualized list
                height={height} // Height of the virtualized list
                rowCount={rowCount} // Number of items in your checkbox list
                rowHeight={rowHeight} // Height of each row in the virtualized list
                rowRenderer={({ index, key, style }) => (
                  <div key={key} style={style}>
                    <Checkbox
                      onChange={() => {
                        const nextSelectedKeys = [...selectedKeys];
                        if (selectedKeys.includes(items[index].title)) {
                          nextSelectedKeys.splice(nextSelectedKeys.indexOf(items[index].title), 1);
                        } else {
                          nextSelectedKeys.push(items[index].title);
                        }
                        setSelectedKeys(nextSelectedKeys);
                      }}
                      checked={selectedKeys.includes(items[index].title)}
                    >
                      {items[index].title}
                    </Checkbox>
                  </div>
                )}
              />
            </div>
          </div>
        );
      },
      filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    },
    {
      title: t('action'),
      key: 'action',
      render: (_: any, record: { id: number,title:string }) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            <EditOutlined />
          </Button>
          <Button type="link" danger onClick={() => showDeleteConfirm(record.id)}>
            <DeleteOutlined />

          </Button>
        </>
      ),
    },
  ]

  const renderSkeleton = () => (
    <Skeleton active>
      <Table dataSource={[]} columns={columns} rowKey="id" />
    </Skeleton>
  )

  return (
    <div style={{ padding: 24 }}>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true)
          setEditingItem(null)
        }}
      >
        <PlusOutlined/>{t('addItem')}
      </Button>
      {loading ? renderSkeleton() : <Table dataSource={items} columns={columns} rowKey="id" pagination={{ position: ['topRight', 'bottomRight'] }} />}
      <ItemForm
        visible={visible}
        onCreate={onCreate}
        onUpdate={onUpdate}
        onCancel={() => setVisible(false)}
        initialValues={editingItem}
      />
    </div>
  )
}

export default ItemList
