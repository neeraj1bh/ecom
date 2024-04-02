import type { FC } from "react";
import toast from "react-hot-toast";
import type { LikedCategory, LikeProps } from "~/interfaces/dashboard";

interface Props extends LikeProps {
  currentItems: LikedCategory[];
}

const Items: FC<Props> = ({ currentItems, liked, setLiked }) => {
  const handleLikedCategories = async (likedId: number, isLiked: boolean) => {
    setLiked([...liked, likedId]);
    const userData = localStorage.getItem("userData");
    const { id: userId } = userData ? JSON.parse(userData) : null;

    // the update is built with the optimistic response pattern where the UI is updated before the API call is finsihed
    if (isLiked) {
      setLiked([...liked, likedId]);
      try {
        await fetch("/api/selected-category/route", {
          method: "POST",
          body: JSON.stringify({
            userId,
            likedId,
          }),
        });
      } catch (error) {
        setLiked(liked.filter((id) => id !== likedId));
        toast.error("Unable to update category");
      }
    } else {
      setLiked(liked.filter((id) => id !== likedId));
      try {
        await fetch("/api/selected-category/route", {
          method: "DELETE",
          body: JSON.stringify({
            userId,
            likedId,
          }),
        });
      } catch (error) {
        setLiked([...liked, likedId]);
        toast.error("Unable to update category");
      }
    }
  };

  return (
    <div className="h-[220px]">
      {currentItems?.map((category) => (
        <div key={category.id} className="mb-4 flex items-center">
          <input
            type="checkbox"
            value={category.id}
            id={`selected-${category.id}`}
            onChange={(event) =>
              handleLikedCategories(category.id, event.target.checked)
            }
            checked={liked.includes(category.id)}
            className={`h-5 w-5 cursor-pointer ${
              liked.includes(category.id) ? "accent-black" : ""
            }`}
          />
          <label
            className="ml-4 cursor-pointer text-base font-normal"
            htmlFor={`selected-${category.id}`}
          >
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Items;
