import React from 'react';
import { string, bool, func } from 'prop-types';

export default function Button(
  {
    textButton,
    dataTestId,
    onClick,
    isDisabled,
  },
) {
  return (
    <button
      data-testid={ dataTestId }
      type="button"
      onClick={ onClick }
      disabled={ isDisabled }
    >
      { textButton }
    </button>
  );
}

Button.defaultProps = {
  isDisabled: false,
  onClick: () => console.log(),
};

Button.propTypes = {
  textButton: string.isRequired,
  dataTestId: string.isRequired,
  onClick: func,
  isDisabled: bool,
};
