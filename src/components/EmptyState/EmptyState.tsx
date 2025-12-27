import notFoundImg from "/images/icons/emptystate.png";

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export default function EmptyState({
  title = "No results found",
  message = "Try adjusting your filters or search criteria.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center animate-fade-in-scale h-full">
      <div className=" rounded-full bg-Seafoam] shadow-sm mb-4">
        <img src={notFoundImg} />
      </div>

      {/* Text */}
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>

      <p className="text-sm text-gray-500 mt-2 max-w-xs">{message}</p>
    </div>
  );
}
