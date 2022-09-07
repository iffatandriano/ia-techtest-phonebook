import { createContext, Dispatch, SetStateAction } from 'react';

export type AppContextType = {
  favoriteContacts: any[];
  addToFavoriteListContact: (contacts: any) => void;
  deleteFromFavoriteListContact: (
    contacts: any,
    listFavoriteContacts: any
  ) => void;
  setFavoriteContacts: Dispatch<SetStateAction<any[]>>;
};

const ContactContext = createContext<AppContextType | null>(null);

export default ContactContext;
