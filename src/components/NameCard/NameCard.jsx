import React from 'react';
import { Avatar, Card } from 'antd';
import imgURL from '../../lib/imgURL';
import './styles.css';

const NameCard = ({ customSize, avatarSrc, title }) => {
  const { Meta } = Card;

  return (
    <div>
      <Meta
        className='card'
        avatar={
          <Avatar src={imgURL[avatarSrc]} size={customSize} shape='square' />
        }
        title={title}
      />
    </div>
  );
};

export default NameCard;
