import React, { Dispatch, SetStateAction } from 'react';
import { Modal, Form, Input, Button, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { EDIT_CONTACT_BY_ID } from '../../../lib/graphql';

interface ModalEditSettingProps {
  isVisibleModalSetting: boolean;
  setIsVisibleModalSetting: Dispatch<SetStateAction<boolean>>;
  onCancel: any;
  phoneDataById: number;
  first_name: string;
  last_name: string;
  phones: Array<[]>;
}

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

const ModalEditSetting: React.FC<ModalEditSettingProps> = props => {
  const {
    isVisibleModalSetting,
    setIsVisibleModalSetting,
    onCancel,
    phoneDataById,
    first_name,
    last_name,
    phones
  } = props;
  const [form] = Form.useForm();
  const [editContactById, { loading }] = useMutation(EDIT_CONTACT_BY_ID);

  const onFinish = (values: any) => {
    editContactById({
      variables: {
        id: phoneDataById,
        _set: {
          first_name: values?.first_name,
          last_name: values?.last_name
        }
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
          message: 'Data kontak berhasil diedit.'
        });
        setIsVisibleModalSetting(false);
      }
    });
  };

  return (
    <Modal
      title="Edit nama kontak handphone"
      visible={isVisibleModalSetting}
      onCancel={loading ? () => {} : onCancel}
      onOk={form.submit}
      okText="Edit"
      cancelText="Batal"
    >
      <Form form={form}>
        <Form
          name="add_contact_phonebook"
          form={form}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          autoComplete="off"
          fields={[
            {
              name: 'first_name',
              value: first_name
            },
            {
              name: 'last_name',
              value: last_name
            },
            {
              name: 'phones',
              value: phones
            }
          ]}
        >
          <Form.Item
            label="Nama depan"
            name="first_name"
            rules={[
              { required: true, message: 'Please input your first name' }
            ]}
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
            {(fields, { add }) => (
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
                        disabled={true}
                      />
                    </Form.Item>
                  </Form.Item>
                ))}
                <Form.Item wrapperCol={{ span: 24, offset: 7 }}>
                  <Button
                    type="dashed"
                    disabled={true}
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
      </Form>
    </Modal>
  );
};

export default ModalEditSetting;
