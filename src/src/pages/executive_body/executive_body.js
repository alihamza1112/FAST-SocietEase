import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function ExecutiveBody() {
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const titleParam = queryParams.get('title');
    const textParam = queryParams.get('text');

    if (titleParam && textParam) {
      setTitle(decodeURIComponent(titleParam));
      setText(decodeURIComponent(textParam));
    }
  }, [location.search]);

  if (!title || !text) {
    return <div>Error: Missing title or text</div>;
  }

  return (
    <div>
      <h3 style={{ color: 'black' }}>{title}</h3>
      <p style={{ color: 'black' }}>{text}</p>
    </div>
  );
}
