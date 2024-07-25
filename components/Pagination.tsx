import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--secondary);
  padding-top: var(--space-2);
  margin: 2rem 0;
  grid-area: pagination;
`;

const PageButton = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? 'var(--secondary)' : 'var(--dark)')};
  color: ${({ active }) => (active ? 'var(--light)' : 'var(--neutral-300)')};
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

const Ellipsis = styled.span`
  padding: 0.5em 1em;
  font-size: var(--font-size-small);
  color: var(--neutral-300);
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (_page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageButtons = () => {
    const pageButtons = [];
    const maxButtons = 5; // Adjust this number for more/less page buttons

    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    if (startPage > 1) {
      pageButtons.push(
        <PageButton key={1} onClick={() => onPageChange(1)}>
          1
        </PageButton>
      );
      if (startPage > 2) {
        pageButtons.push(<Ellipsis key="start-ellipsis">...</Ellipsis>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <PageButton
          key={i}
          onClick={() => onPageChange(i)}
          active={i === currentPage}
        >
          {i}
        </PageButton>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(<Ellipsis key="end-ellipsis">...</Ellipsis>);
      }
      pageButtons.push(
        <PageButton key={totalPages} onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </PageButton>
      );
    }

    return pageButtons;
  };

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </PageButton>
      {renderPageButtons()}
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
