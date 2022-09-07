import _ from 'lodash';
import React, { PropsWithChildren, useState } from 'react';
import ContactContext from './createContext';

export function ContactProvider(props: PropsWithChildren<{}>) {
  const [favoriteContacts, setFavoriteContacts] = useState<any[]>([]);

  const addToFavoriteListContact = (contacts: any) => {
    setFavoriteContacts(prevState => [...prevState, contacts]);
    localStorage.setItem('favoriteContacts', JSON.stringify(favoriteContacts));
  };

  const deleteFromFavoriteListContact = (
    contacts: any,
    listFavoriteContacts: any
  ) => {
    let index = _.indexOf(listFavoriteContacts, contacts);
    if (index !== -1) {
      listFavoriteContacts.splice(index, 1);
      setFavoriteContacts([...listFavoriteContacts]);
      localStorage.setItem(
        'favoriteContacts',
        JSON.stringify(favoriteContacts)
      );
    }
  };

  return (
    <ContactContext.Provider
      value={{
        favoriteContacts,
        addToFavoriteListContact,
        deleteFromFavoriteListContact,
        setFavoriteContacts
      }}
      {...props}
    />
  );
}
