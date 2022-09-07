import React from 'react';
import { Input, Select } from 'antd';
import { SortContactContainer } from '../../styles/MainContact.module';

const { Option } = Select;

const SortContact: React.FC = () => {
  return <SortContactContainer>
    <span>Sort contact</span>
    <Input.Group compact>
      <Select defaultValue="A-Z">
        <Option value="ascending">A-Z</Option>
        <Option value="descending">Z-A</Option>
      </Select>
    </Input.Group>
  </SortContactContainer>;
};

export default SortContact;
