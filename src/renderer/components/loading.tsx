import { useRef } from 'react';
import { FaSpinner } from 'react-icons/fa';
import * as style from '../styles/loading.css';

export default function Loading() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className={`graphiql-container ${style.loadingContainer} ${style.fallbackFadein}`}>
      <FaSpinner className={style.spinner} style={{ fontSize: '64px' }} />
    </div>
  );
}
