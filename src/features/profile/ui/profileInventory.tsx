import { useInventoryState } from "../model/use-inventory-state";
import type { Game } from "../types/types";

const ProfileInventory = ({ appId }: { appId: Game }) => {
  const { items, isFetching, ref } = useInventoryState(appId);

  const renderItems = () => {
    if (isFetching) return <div>Loading...</div>;

    return items.map((item) => (
      <div
        key={item.id}
        className="border border-gray-200 rounded-lg p-2 hover:shadow-md transition"
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-32 object-contain mb-2"
        />
        <div className="text-sm text-center font-medium">{item.name}</div>
        <div className="text-xs text-center text-gray-500">
          Qty: {item.amount}
        </div>
      </div>
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {renderItems()}
      </div>
      <span ref={ref}></span>
    </div>
  );
};

export default ProfileInventory;
