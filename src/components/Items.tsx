import type { LikedCategory, LikeProps } from "~/interfaces/dashboard";

interface ItemsProps extends LikeProps {
  currentItems: LikedCategory[];
}

export function Items({ currentItems, liked, setLiked }: ItemsProps) {
  const handleLikedCategories = async (likedId: number, isLiked: boolean) => {
    const userData = localStorage.getItem("userData");
    const { id: userId } = userData ? JSON.parse(userData) : null;

    if (isLiked) {
      try {
        const response = await fetch("/api/selected-category/route", {
          method: "POST",
          body: JSON.stringify({
            userId,
            likedId,
          }),
        });

        if (response.ok) {
          setLiked([...liked, likedId]);
        }
      } catch (error) {
        console.error("Error updating category liked:", error);
      }
    } else {
      try {
        const response = await fetch("/api/selected-category/route", {
          method: "DELETE",
          body: JSON.stringify({
            userId,
            likedId,
          }),
        });

        if (response.ok) {
          setLiked(liked.filter((id) => id !== likedId));
        }
      } catch (error) {
        console.error("Error updating category liked:", error);
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
            className={`h-5 w-5 ${
              liked.includes(category.id) ? "accent-black" : ""
            }`}
          />
          <label
            className="ml-4 text-base font-normal"
            htmlFor={`selected-${category.id}`}
          >
            {category.name}
          </label>
        </div>
      ))}
    </div>
  );
}
