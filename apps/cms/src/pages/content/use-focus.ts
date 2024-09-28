import { useState } from 'react';

const useFocus = () => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  const bind = {
    onFocus,
    onBlur,
  };

  return [isFocused, bind] as const;
};

export default useFocus;