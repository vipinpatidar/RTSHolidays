import Button from "../ui/Button";

export type PaginationProps = {
  page: number;
  pages: number;
  onPageNumChange: (pageNum: number) => void;
};

const Pagination = ({ page, pages, onPageNumChange }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center">
      <ul className="flex items-center gap-1">
        {Array.from({ length: pages }, (_, index) => index + 1).map(
          (number) => (
            <li
              className={`px-3 py-1 border border-slate-300 cursor-pointer font-semibold ${
                page === number ? "bg-hero text-white" : ""
              }`}
              key={number}
              onClick={() => onPageNumChange(number)}
            >
              <Button>{number}</Button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default Pagination;
