import { useProfileStore } from "@/shared/store/profileStore";

const ProfileData = () => {
  const data = useProfileStore((state) => state.userData);
  if (!data) return null;
  return (
    <div className="flex items-center gap-4">
      <img
        src={data?.avatar}
        alt={data?.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
      />
      <span className="text-2xl font-semibold">{data?.name}</span>
    </div>
  );
};

export default ProfileData;
