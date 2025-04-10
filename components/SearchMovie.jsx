import RecomandationsItems from "./RecomandationsItems";

export function SearchMovie({ search }) {
    return (
        <div className="p-4">
            <RecomandationsItems movie={search} />
        </div>
    );
}