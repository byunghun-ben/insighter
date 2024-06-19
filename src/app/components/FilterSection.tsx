import useEventFilterContext from "../hooks/useEventFilterContext";

const FilterSection = () => {
  const { filterName, filterDate, setFilterName, setFilterDate } = useEventFilterContext();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <input
          className="p-3 border border-slate-200"
          placeholder="이벤트 이름"
          value={filterName}
          onChange={(e) => {
            setFilterName(e.target.value);
          }}
        />

        <input
          type="date"
          value={filterDate}
          onChange={(e) => {
            setFilterDate(e.target.value);
          }}
          className="p-3 border border-slate-200"
        />
      </div>
    </div>
  );
};

export default FilterSection;
