import React, { useState } from 'react';
import { Dropdown, Menu, Modal, notification } from 'antd';
import type { MenuProps } from 'antd';
import {
  SmallDashOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import ModalEditSetting from './ModalSetting';
import { useMutation } from '@apollo/client';
import { DELETE_CONTACT_BY_ID } from '../../lib/graphql';

interface SettingMenuDropdownProps {
  phoneDataById: number;
  first_name: string;
  last_name: string;
  phones: Array<[]>;
}

const SettingMenuDropdown: React.FC<SettingMenuDropdownProps> = props => {
  const { phoneDataById, first_name, last_name, phones } = props;
  const [isVisibleModalSetting, setIsVisibleModalSetting] = useState(false);
  const [deleteContactById] = useMutation(DELETE_CONTACT_BY_ID);

  const onClick: MenuProps['onClick'] = e => {
    if (e.key === '0') return setIsVisibleModalSetting(true);
    if (e.key === '1')
      return Modal.confirm({
        title: 'Kamu yakin ingin menghapus kontak ini?',
        icon: <ExclamationCircleOutlined />,
        onOk: () => {
          deleteContactById({
            variables: {
              id: phoneDataById
            },
            onError: err => {
              notification.error({
                message: `${err}`
              });
            },
            onCompleted: () => {
              notification.success({
                message: `Nama kontak dengan Id ${phoneDataById} berhasil dihapus.`
              });
              window.location.reload();
            }
          });
        },
        okText: 'Delete',
        cancelText: 'Cancel'
      });
  };

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: 'Edit Nama Kontak',
          key: '0',
          icon: <EditOutlined />
        },
        {
          label: 'Hapus',
          key: '1',
          icon: <DeleteOutlined />
        }
      ]}
    />
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={['click']}>
        <SmallDashOutlined
          style={{ padding: '0.8rem', margin: '0', fontSize: '28px' }}
        />
      </Dropdown>
      <ModalEditSetting
        isVisibleModalSetting={isVisibleModalSetting}
        setIsVisibleModalSetting={setIsVisibleModalSetting}
        onCancel={() => setIsVisibleModalSetting(false)}
        phoneDataById={phoneDataById}
        first_name={first_name}
        last_name={last_name}
        phones={phones}
      />
    </>
  );
};

export default SettingMenuDropdown;
