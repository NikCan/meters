import styled from 'styled-components';

export const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 16px 16px 0 0;
`;

export const TableWrapper = styled.div`
  overflow-y: auto;
  border: 1px solid rgba(224, 229, 235, 1);
`;

export const TableHeader = styled.div`
  background-color: rgba(240, 243, 247, 1);
  border-radius: 16px 16px 0 0;
  border: 1px solid rgba(224, 229, 235, 1);
  border-bottom: none;
  // для компенсации ширины скролла
  padding-right: 8px;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

interface TableHeaderCellProps {
  $width?: string;
}
export const TableHeaderCell = styled.th<TableHeaderCellProps>`
  padding: 12px;
  text-align: left;
  size: 13px;
  line-height: 16px;
  font-weight: 500;
  color: rgba(105, 113, 128, 1);
  min-width: ${(props) => props.$width};
  max-width: ${(props) => props.$width};
`;

interface TableCellWithHoverProps {
  $isHovered?: boolean;
}
export const TableCellWithHover = styled.td<TableCellWithHoverProps>`
  padding: 12px;
  border-bottom: 1px solid rgba(224, 229, 235, 1);
  text-align: left;
  min-width: ${(props) => props.width};
  max-width: ${(props) => props.width};
  opacity: ${(props) => (props.$isHovered ? 1 : 0)};
  transition: opacity 0.3s;
`;

export const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid rgba(224, 229, 235, 1);
  text-align: left;
  min-width: ${(props) => props.width};
  max-width: ${(props) => props.width};
`;

export const StyledTr = styled.tr`
  &:hover {
    background-color: rgba(247, 248, 249, 1);
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px 16px 8px 16px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 0 0 16px 16px;
  border: 1px solid rgba(238, 240, 244, 1);
  border-top: none;
`;

export const PaginationBlock = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
`;

interface PaginationButtonProps {
  $activeButton?: boolean;
}

export const PaginationButton = styled.button<PaginationButtonProps>`
  padding: 8px 12px;
  border: 1px solid rgba(206, 213, 222, 1);
  border-radius: 6px;
  background-color: ${(props) =>
    props.$activeButton ? 'rgba(242, 245, 248, 1)' : 'rgba(255, 255, 255, 1)'};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) =>
      props.disabled ? 'rgba(255, 255, 255, 1)' : '#f1f1f1'};
  }

  &:disabled {
    cursor: auto;
    opacity: 0.7;
  }
`;

export const Ellipsis = styled.span`
  padding: 5px 10px;
`;
