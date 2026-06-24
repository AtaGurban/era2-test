import { useState, useEffect } from 'react';
import { useQueueFilterSort } from '@/features/generation-queue/model/useQueueFilterSort';

export function useHeaderSearch(delay = 300) {
  const { setSearchQuery } = useQueueFilterSort();
  const [localQuery, setLocalQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery, setSearchQuery, delay]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalQuery(e.target.value);
  };

  return {
    localQuery,
    handleQueryChange,
  };
}
