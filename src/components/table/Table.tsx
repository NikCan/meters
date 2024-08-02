import { FC, ReactNode, useMemo, useState } from 'react';
import {
  PaginationBlock,
  PaginationButton,
  PaginationWrapper,
  StyledTable,
  StyledTr,
  TableCell,
  TableCellWithHover,
  TableContainer,
  TableHeader,
  TableHeaderCell,
  TableWrapper,
} from './Table.styles';

interface Props {
  height: string;
  data: ReactNode[][];
  headers: string[];
  columnWidths: string[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}
export const Table: FC<Props> = ({
  data,
  headers,
  currentPage,
  totalPages,
  onPageChange,
  height,
  columnWidths,
  loading,
}) => {
  const paginateButtons = useMemo(() => {
    const pageButtons = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
          <PaginationButton
            key={i}
            $activeButton={i === currentPage}
            onClick={() => onPageChange(i)}
            disabled={loading}
          >
            {i}
          </PaginationButton>
        );
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageButtons.push(
            <PaginationButton
              key={i}
              $activeButton={i === currentPage}
              onClick={() => onPageChange(i)}
              disabled={loading}
            >
              {i}
            </PaginationButton>
          );
        }
        pageButtons.push(
          <PaginationButton disabled key="ellipsis1">
            ...
          </PaginationButton>
        );
        pageButtons.push(
          <PaginationButton
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            disabled={loading}
          >
            {totalPages}
          </PaginationButton>
        );
      } else if (currentPage > totalPages - 3) {
        pageButtons.push(
          <PaginationButton
            key={1}
            onClick={() => onPageChange(1)}
            disabled={loading}
          >
            1
          </PaginationButton>
        );
        pageButtons.push(
          <PaginationButton disabled key="ellipsis1">
            ...
          </PaginationButton>
        );
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageButtons.push(
            <PaginationButton
              key={i}
              $activeButton={i === currentPage}
              onClick={() => onPageChange(i)}
              disabled={loading}
            >
              {i}
            </PaginationButton>
          );
        }
      } else {
        pageButtons.push(
          <PaginationButton
            key={1}
            onClick={() => onPageChange(1)}
            disabled={loading}
          >
            1
          </PaginationButton>
        );
        pageButtons.push(
          <PaginationButton disabled key="ellipsis1">
            ...
          </PaginationButton>
        );
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageButtons.push(
            <PaginationButton
              key={i}
              $activeButton={i === currentPage}
              onClick={() => onPageChange(i)}
              disabled={loading}
            >
              {i}
            </PaginationButton>
          );
        }
        pageButtons.push(
          <PaginationButton disabled key="ellipsis2">
            ...
          </PaginationButton>
        );
        pageButtons.push(
          <PaginationButton
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            disabled={loading}
          >
            {totalPages}
          </PaginationButton>
        );
      }
    }
    return pageButtons;
  }, [currentPage, totalPages, onPageChange, loading]);

  return (
    <TableContainer style={{ height }}>
      <TableHeader>
        <StyledTable>
          <thead style={{ borderRadius: '16px' }}>
            <tr>
              {headers.map((header, index) => (
                <TableHeaderCell key={index} $width={columnWidths[index]}>
                  {header}
                </TableHeaderCell>
              ))}
            </tr>
          </thead>
        </StyledTable>
      </TableHeader>
      <TableWrapper>
        <StyledTable>
          <tbody>
            {data.map((row, index) => (
              <TableRow key={index} cells={row} columnWidths={columnWidths} />
            ))}
          </tbody>
        </StyledTable>
      </TableWrapper>
      <PaginationWrapper>
        <PaginationBlock>{paginateButtons}</PaginationBlock>
      </PaginationWrapper>
    </TableContainer>
  );
};

export default Table;

const TableRow = ({
  cells,
  columnWidths,
}: {
  cells: ReactNode[];
  columnWidths: string[];
}) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <StyledTr
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {cells.map((cell, index, arr) =>
        index === arr.length - 1 ? (
          <TableCellWithHover
            key={index}
            $isHovered={hovered}
            width={columnWidths[index]}
          >
            {cell}
          </TableCellWithHover>
        ) : (
          <TableCell key={index} width={columnWidths[index]}>
            {cell}
          </TableCell>
        )
      )}
    </StyledTr>
  );
};
