import React, { useContext } from 'react';
import {
  FavoriteContactCard,
  FavoriteContactContainer,
  FavoriteContactScroll,
  InformationContact,
  InformationContactDescription
} from '../../styles/FavoriteContact.module';
import {
  DeleteOutlined,
  SmallDashOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Dropdown, Menu, MenuProps } from 'antd';
import _ from 'lodash';
import { Divider } from 'antd';
import ContactContext, {
  AppContextType
} from '../../lib/context/createContext';

interface FavoriteContactProps {
  listFavoriteContacts: any;
}

const FavoriteContact: React.FC<FavoriteContactProps> = props => {
  const { listFavoriteContacts } = props;
  const { deleteFromFavoriteListContact } = useContext(
    ContactContext
  ) as AppContextType;

  const onClick: MenuProps['onClick'] = e => {
    if (listFavoriteContacts[e.key])
      return deleteFromFavoriteListContact(
        listFavoriteContacts[e.key],
        listFavoriteContacts
      );
  };

  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: 'Hapus',
          key: '0',
          icon: <DeleteOutlined />
        }
      ]}
    />
  );

  return (
    <FavoriteContactContainer>
      <h2>List kontak favorit</h2>
      <FavoriteContactScroll>
        {listFavoriteContacts.length > 0 ? (
          listFavoriteContacts?.map(
            (favoriteContactData: any, favoriteContactIndex: number) => (
              <>
                <FavoriteContactCard key={favoriteContactIndex}>
                  <InformationContact>
                    <UserOutlined
                      style={{
                        padding: '0.8rem',
                        fontSize: '28px',
                        border: '1px solid black',
                        borderRadius: '20px',
                        marginLeft: '15px',
                        marginBottom: '10px'
                      }}
                    />
                    <InformationContactDescription>
                      <span>
                        {favoriteContactData?.first_name}{' '}
                        {favoriteContactData?.last_name}
                      </span>
                    </InformationContactDescription>
                  </InformationContact>
                  <Dropdown overlay={menu}>
                    <SmallDashOutlined
                      style={{
                        padding: '0.8rem',
                        margin: '0',
                        fontSize: '28px'
                      }}
                    />
                  </Dropdown>
                </FavoriteContactCard>
                <Divider />
              </>
            )
          )
        ) : (
          <p style={{ color: 'red', textAlign: 'center' }}>
            Kontak favorit kamu masih kosong.
          </p>
        )}
      </FavoriteContactScroll>
    </FavoriteContactContainer>
  );
};

export default FavoriteContact;
