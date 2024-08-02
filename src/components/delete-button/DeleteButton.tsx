import { FC, memo, useState } from 'react';
import styled from 'styled-components';

export const StyledButton = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 8px;
  padding: 10px 12px 10px 12px;
  cursor: pointer;
  border: none;
  background-color: rgba(254, 227, 227, 1);

  &:hover {
    background-color: ${(props) =>
      props.disabled ? 'rgba(254, 227, 227, 1)' : 'rgba(254, 215, 215, 1)'};
  }

  &:disabled {
    cursor: auto;
    background: rgba(242, 245, 248, 1);
    opacity: 0.6;
  }
`;

interface Props {
  callback: () => Promise<void>;
  disabled?: boolean;
}
export const DeleteButton: FC<Props> = memo(
  ({ callback, disabled = false }) => {
    const [disable, setDisable] = useState(false);
    const onClickHandler = () => {
      setDisable(true);
      callback()
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setDisable(false);
        });
    };
    return (
      <StyledButton onClick={onClickHandler} disabled={disabled || disable}>
        <img src="/meters/trash.svg" alt="trash" />
      </StyledButton>
    );
  }
);

DeleteButton.displayName = 'DeleteButton';
