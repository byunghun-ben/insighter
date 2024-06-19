import { useMemo, useState } from "react";
import EventCardItem from "./components/EventCardItem";
import FilterSection from "./components/FilterSection";
import useEventContext from "./hooks/useEventContext";
import useEventFilterContext from "./hooks/useEventFilterContext";

const MainPage = () => {
  const { events, hasMore, fetchMoreEvents } = useEventContext();
  const { filterName, filterDate, resetFilter } = useEventFilterContext();

  const [isAsc, setIsAsc] = useState(true);

  const displayedEvents = useMemo(() => {
    const filterNameValue = filterName.trim().toLowerCase();

    const filtered = events.filter((event) => {
      const eventName = event.name.trim().toLowerCase();
      if (filterNameValue && !eventName.includes(filterNameValue)) {
        return false;
      }
      if (filterDate && !event.date.includes(filterDate)) {
        return false;
      }
      return true;
    });

    return filtered.sort((a, b) => {
      if (isAsc) {
        return a.date.localeCompare(b.date);
      }
      return b.date.localeCompare(a.date);
    });
  }, [events, filterName, filterDate, isAsc]);

  const isEmpty = displayedEvents.length === 0;

  return (
    <div className="flex flex-col">
      <section className="p-4 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">이벤트 목록 페이지</h1>
      </section>

      <section className="p-4 flex flex-col gap-6">
        <h2 className="text-xl font-bold">이벤트 목록</h2>

        <FilterSection />

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="ml-auto p-2 border border-slate-200 rounded-lg"
            onClick={() => {
              setIsAsc((prev) => !prev);
            }}
          >
            {isAsc ? "오래된 순" : "최신 순"}
          </button>
        </div>

        {!isEmpty && (
          <ul className="flex flex-col gap-4">
            {displayedEvents.map((event) => (
              <EventCardItem key={event.id} event={event} />
            ))}
          </ul>
        )}

        {hasMore && (
          <button type="button" className="w-full p-2 border border-slate-200 rounded-lg" onClick={fetchMoreEvents}>
            더보기
          </button>
        )}

        {isEmpty && (
          <div className="flex flex-col gap-2 items-center justify-center">
            <span>이벤트가 없습니다.</span>

            <button type="button" className="text-slate-500" onClick={resetFilter}>
              필터 초기화
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default MainPage;
