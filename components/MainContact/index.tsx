import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import SearchContact from '../SearchContact';
import FavoriteContact from '../FavoriteContact';
import { HeartOutlined, UserOutlined } from '@ant-design/icons';
import {
  Container,
  ContactContainer,
  MainContainer,
  ListContact,
  ListContactCard,
  InformationContact,
  InformationContactDescription,
  ListNumberContact,
  ListContactHeader,
  ListButtonAction
} from '../../styles/Home.module';
import styles from '../../styles/Home.module.css';
import SettingMenuDropdown from '../DropdownMenuSetting';
import { Divider, List } from 'antd';
import { useQuery } from '@apollo/client';
import { QUERIES_GET_CONTACT_LIST } from '../../lib/graphql';
import { ContactPhone } from '../constant';
import ModalContact from './ModalContact';
import ContactContext, {
  AppContextType
} from '../../lib/context/createContext';

const MainContact: React.FC = () => {
  const [isVisibleModalContact, setIsVisibleModalContact] = useState(false);
  const [listFavoriteContacts, setListFavoriteContacts] = useState([]);
  const { addToFavoriteListContact, favoriteContacts } = useContext(
    ContactContext
  ) as AppContextType;

  const { loading, data } = useQuery(QUERIES_GET_CONTACT_LIST);

  useEffect(() => {
    localStorage.setItem('favoriteContacts', JSON.stringify(favoriteContacts));
    // @ts-ignore
    const items: any = JSON.parse(localStorage.getItem('favoriteContacts'));
    if (items) {
      setListFavoriteContacts(items);
    }
  }, [favoriteContacts]);

  return (
    <Container>
      <Head>
        <title>IA PhoneBook</title>
        <meta name="description" content="My list phonebook" />
        <link
          rel="icon"
          href="https://ecs7.tokopedia.net/favicon/favicon-notif.ico"
        />
      </Head>

      <MainContainer>
        <section>
          <SearchContact />
          <ContactContainer>
            <ListContact>
              <ListContactHeader>
                <h2>Kontak</h2>
                <button onClick={() => setIsVisibleModalContact(true)}>
                  Tambah Kontak
                </button>
              </ListContactHeader>
              <List
                itemLayout="horizontal"
                dataSource={data?.contact}
                pagination={{
                  onChange: page => {
                    console.log(page);
                  },
                  pageSize: 4,
                  size: 'small'
                }}
                loading={loading}
                style={{ marginBottom: '10px' }}
                renderItem={(
                  contactData: ContactPhone,
                  contactDataIndex: number
                ) => (
                  <>
                    <ListContactCard key={contactDataIndex}>
                      <InformationContact>
                        <UserOutlined
                          style={{
                            padding: '0.8rem',
                            height: '50px',
                            width: '50px',
                            fontSize: '24px',
                            border: '1px solid black',
                            borderRadius: '20px',
                            marginLeft: '15px',
                            marginBottom: '10px'
                          }}
                        />
                        <InformationContactDescription>
                          <span>
                            {contactData.first_name} {contactData.last_name}
                          </span>
                          <div>
                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: 'inherit'
                              }}
                            >
                              Nomor handphone :
                            </span>
                            {contactData?.phones?.map(
                              (phoneData: any, phoneDataIndex: number) => (
                                <ListNumberContact key={phoneDataIndex}>
                                  {phoneData.number}
                                </ListNumberContact>
                              )
                            )}
                          </div>
                        </InformationContactDescription>
                      </InformationContact>
                      <ListButtonAction>
                        <HeartOutlined
                          style={{
                            padding: '0.8rem',
                            margin: '0',
                            fontSize: '28px'
                          }}
                          onClick={() => addToFavoriteListContact(contactData)}
                        />
                        <SettingMenuDropdown
                          phoneDataById={contactData?.id}
                          first_name={contactData?.first_name}
                          last_name={contactData?.last_name}
                          phones={contactData?.phones}
                        />
                      </ListButtonAction>
                    </ListContactCard>
                    <Divider dashed />
                  </>
                )}
              />
            </ListContact>
            <FavoriteContact listFavoriteContacts={listFavoriteContacts} />
          </ContactContainer>
        </section>
        <ModalContact
          isVisibleModalContact={isVisibleModalContact}
          setIsVisibleModalContact={setIsVisibleModalContact}
          onCancel={() => setIsVisibleModalContact(false)}
        />
      </MainContainer>

      <footer className={styles.footer}>
        <span style={{}}>
          Write code with <span style={{ color: 'red' }}>💙</span>
        </span>
      </footer>
    </Container>
  );
};

export default MainContact;
