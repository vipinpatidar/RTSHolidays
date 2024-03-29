import { hotelFacilities } from "../../utils/hotel-type-options";

type Props = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="lg:border-b border-slate-300 pb-5 w-max">
      <h4 className="text-md font-semibold mb-2 w-max">Facilities</h4>
      {hotelFacilities.map((facility) => (
        <label className="flex items-center space-x-2 w-max" key={facility}>
          <input
            type="checkbox"
            className="rounded"
            value={facility}
            checked={selectedFacilities.includes(facility)}
            onChange={onChange}
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
