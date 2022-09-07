import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const SearchContact: React.FC = () => {

  const onSearch = (value: string) => console.log(value);

  return <>
    <Search placeholder="Cari kontak" size="large" onSearch={onSearch} style={{ width: 350, alignItems: 'left'}}  />
  </>;
};

export default SearchContact;
