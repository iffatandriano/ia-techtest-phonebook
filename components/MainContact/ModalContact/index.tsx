import React, { Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { ADD_CONTACT_WITH_NUMBER } from '../../../lib/graphql';

const formItemLayout = {
  labelCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 7 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 7 }
  }
};

interface ModalContactProps {
  isVisibleModalContact: boolean;
  setIsVisibleModalContact: Dispatch<SetStateAction<boolean>>;
  onCancel: any;
}

const ModalContact: React.FC<ModalContactProps> = props => {
  const { onCancel, isVisibleModalContact, setIsVisibleModalContact } = props;
  const [form] = Form.useForm();
  const [addContactWithPhones, { loading }] = useMutation(
    ADD_CONTACT_WITH_NUMBER
  );

  const onFinish = (values: any) => {
    addContactWithPhones({
      variables: {
        first_name: values?.first_name,
        last_name: values?.last_name,
        phones: values?.phones
      },
      onError: err => {
        notification.error({
          message: `${err}`
        });
        form.setFields([
          {
            name: 'phones',
            errors: [`${err}`]
          }
        ]);
      },
      onCompleted: () => {
        notification.success({
          message: 'Data kontak berhasil ditambahkan.'
        });
        setIsVisibleModalContact(false);
        window.location.reload();
      }
    });
  };

  return (
    <Modal
      title="Tambah kontak handphone baru"
      visible={isVisibleModalContact}
      onCancel={loading ? () => {} : onCancel}
      onOk={form.submit}
      okText="Tambah"
      cancelText="Batal"
    >
      <Form
        name="add_contact_phonebook"
        form={form}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Nama depan"
          name="first_name"
          rules={[{ required: true, message: 'Please input your first name' }]}
        >
          <Input placeholder="nama depan" />
        </Form.Item>
        <Form.Item
          label="Nama belakang"
          name="last_name"
          rules={[{ required: true, message: 'Please input your last name' }]}
        >
          <Input placeholder="nama belakang" />
        </Form.Item>
        <Form.List name="phones">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item
                  {...(index === 0
                    ? formItemLayout
                    : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Nomor handphone' : ''}
                  key={field.key}
                >
                  <Form.Item
                    {...field}
                    name={[index, 'number']}
                    validateTrigger={['onChange', 'onBlur']}
                    rules={[
                      {
                        required: true,
                        whitespace: true,
                        message: "Please input number phone's"
                      }
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="nomor handphone"
                      style={{ width: '60%' }}
                    />
                  </Form.Item>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      style={{ marginLeft: '10px' }}
                      className="dynamic-delete-button"
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item wrapperCol={{ span: 24, offset: 7 }}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ justifyContent: 'center' }}
                  icon={<PlusOutlined />}
                >
                  Tambah nomor handphone
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default ModalContact;
