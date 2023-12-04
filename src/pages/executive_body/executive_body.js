import React from 'react';
import { useParams } from 'react-router-dom';

export default function ExecutiveBody() {
  const { title, text } = useParams();

  return (
    <div>
      <h3 style={{ color: 'blue' }}>{title}</h3>
      <p style={{ color: 'blue' }}>{text}</p>
    </div>
  );
}
