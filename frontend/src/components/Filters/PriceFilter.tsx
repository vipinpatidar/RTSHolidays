type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div className="w-max">
      <h4 className="text-md font-semibold mb-2 w-max"> Max Price</h4>
      <select
        className="p-2 border rounded-md w-max outline-none"
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="1000000000">Select Max Price</option>
        {[50, 100, 200, 300, 500].map((price) => (
          <option value={price} key={price}>
            {price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
