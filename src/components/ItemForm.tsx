import React, { useEffect } from 'react'

import {  Modal, Form, Input } from 'antd'; 
import { useTranslation } from 'react-i18next'
import 'react-virtualized/styles.css'; 
import '../i18n'  

interface ItemFormProps {
  visible: boolean
  onCreate: (values: { title: string }) => void
  onUpdate: (values: { id: number, title: string }) => void
  onCancel: () => void
  initialValues?: { id: number, title: string } | null
}

const ItemForm: React.FC<ItemFormProps> = ({ visible, onCreate, onUpdate, onCancel, initialValues }) => {
  const [form] = Form.useForm()
  const { t } = useTranslation()

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [form, initialValues])

  return (
    <Modal
      visible={visible}
      title={initialValues ? t('editItem') : t('addItem')}
      okText={initialValues ? t('update') : t('add')}
      cancelText={t('cancel')}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields()
            if (initialValues) {
              onUpdate({ ...initialValues, ...values })
            } else {
              onCreate(values)
            }
          })
          .catch(info => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="title"
          label={t('name')}
          rules={[{ required: true, message: t('name') }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ItemForm
