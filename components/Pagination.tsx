import styled from 'styled-components';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  border-top: 1px solid var(--secondary);
  padding-top: var(--space-2);
  margin: 0 var(--space-2) var(--space-2) var(--space-2);
  grid-area: pagination;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? 'var(--secondary)' : 'var(--dark)')}; // Add a background color for active buttons
  color: ${({ $active }) => ($active ? 'var(--light)' : 'var(--neutral-300)')}; // Add a color for active buttons
  padding: 0.5em 1em;
  border-radius: 0;
  font-size: var(--font-size-small);

  &:first-of-type {
    border-radius: 1em 0 0 1em;
  }

  &:last-of-type {
    border-radius: 0 1em 1em 0;
  }

  &:hover {
    background: var(--dark);
    filter: brightness(1.2);
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
  
  // Calculate the start and end page numbers based on the current page and the total number of pages
  const renderPageButtons = () => {
    const pageButtons = [];
    const maxButtons = 4; // Adjust the number of page buttons to display

    
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2)); // Calculate the starting page number
    let endPage = Math.min(totalPages, startPage + maxButtons - 1); // Calculate the ending page number

    // Adjust the startPage if the endPage exceeds the total number of pages
    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    // Add the first page button and an ellipsis if necessary
    if (startPage > 1) {

      // Add the first page button
      pageButtons.push(
        <PageButton key={1} onClick={() => onPageChange(1)}>
          1
        </PageButton>
      );

      // Add an ellipsis if there's a gap between the first page and the start page
      if (startPage > 2) {
        pageButtons.push(<Ellipsis key="start-ellipsis">...</Ellipsis>);
      }
    }

    // Add the page buttons for the current range
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <PageButton
          key={i}
          onClick={() => {
            onPageChange(i);
          }}
          $active={i === currentPage} // Highlight the active page button
        >
          {i}
        </PageButton>
      );
    }

    // Add the last page button and an ellipsis if necessary
    if (endPage < totalPages) {

      // Add an ellipsis if there's a gap between the end page and the last page
      if (endPage < totalPages - 1) {
        pageButtons.push(<Ellipsis key="end-ellipsis">...</Ellipsis>);
      }

      // Add the last page button
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

      {/* Previous button: go to the previous page if not on the first page */}
      <PageButton
        onClick={() => {
          onPageChange(currentPage - 1);
        }}
        disabled={currentPage === 1} // Disable the button if it's the first page
      >
        Previous
      </PageButton>
      {renderPageButtons()}

      {/* Next button: go to the next page if not on the last page */}
      <PageButton
        onClick={() => {
          onPageChange(currentPage + 1);
        }}
        disabled={currentPage === totalPages} // Disable the button if it's the last page
      >
        Next
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
