const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const pageNumbers = [...Array(totalPages).keys()];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-center items-center shadow-lg">
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === page ? "bg-green-500 text-white" : "bg-gray-300"
          }`}
        >
          {page + 1}
        </button>
      ))}
      {totalPages > 10 && currentPage >= 9 && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-4 py-2 mx-1 bg-blue-500 text-white rounded"
        >
          더보기
        </button>
      )}
    </div>
  );
};
