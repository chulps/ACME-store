// components/Pagination.tsx
import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
    grid-area: pagination;

`;

const PageButton = styled.button`
  background: var(--dark);
  padding: 0.5em 1em;
  border-radius: 0;
  font-size: var(--font-size-small);

  &:first-of-type {
    border-radius: 1em 0 0 1em;
  }

  &:last-of-type {
    border-radius: 0 1em 1em 0;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (_page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <PaginationContainer>
      <PageButton onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </PageButton>
      {Array.from({ length: totalPages }, (_, index) => (
        <PageButton key={index} onClick={() => onPageChange(index + 1)}>
          {index + 1}
        </PageButton>
      ))}
      <PageButton onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
