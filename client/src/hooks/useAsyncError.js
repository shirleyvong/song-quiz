import { useState, useCallback } from 'react';

const useAsyncError = () => {
  const [, setError] = useState();

  return useCallback((errorMsg) => {
    setError(() => {
      throw new Error(errorMsg);
    });
  }, [setError]);
};

export default useAsyncError;
