import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import biscuit50 from "../assets/biscuit50.jpg";

const ShopItem = ({ shop }) => {
  return (
    <Link
      to={`/insideshop/${shop._id}`}
      className="bg-white sm:border-y-0 border-gray-300 sm:shadow-md py-3 sm:px-5 sm:rounded-md"
    >
      <div className="flex justify-between items-center px-2 sm:px-0">
        <div className="flex gap-2">
          <img
            className="w-10 h-10 rounded-full border"
            src={shop.profilePicture}
            alt="Shop Profile"
          />
          <div>
            <h1 className="my-0">
              {shop.name} {shop.lastName} ({shop.localisation})
            </h1>
            {shop.speciality?.length == 1 && (
              <span className="crimsonText my-0">
                Specialité : {shop.speciality?.[0]}
              </span>
            )}
            {shop.speciality?.length == 2 && (
              <span className="crimsonText my-0">
                Specialité : {shop.speciality?.[0]} et {shop.speciality?.[1]}
              </span>
            )}
            {shop.speciality?.length == 3 && (
              <span className="crimsonText my-0">
                Specialité : {shop.speciality?.[0]} , {shop.speciality?.[1]} et{" "}
                {shop.speciality?.[2]}
              </span>
            )}
            {shop.speciality?.length == 4 && (
              <span className="crimsonText my-0">
                Specialité : {shop.speciality?.[0]} , {shop.speciality?.[1]} ,{" "}
                {shop.speciality?.[2]} et {shop.speciality?.[3]}
              </span>
            )}
          </div>
        </div>

        <div className="flex sm:hidden items-center">
          <h1>({shop.totalRating})</h1>
          <ReactStars
            count={5}
            size={15} // decreased size for smaller screens
            value={shop.averageRating || 0}
            isHalf={true}
            edit={false}
            activeColor="#FBBC04"
          />
        </div>

        <div className="hidden sm:block">
          <div className="flex items-center">
            {/* For screens sm and above */}
            <h1>{shop.averageRating}</h1>
            <ReactStars
              count={5}
              size={20} // default size for larger screens
              value={shop.averageRating || 0}
              isHalf={true}
              edit={false}
              activeColor="#FBBC04"
            />
            <h1>({shop.totalRating})</h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 mt-1 border">
        {shop.articles
          .slice(0, 6)
          .map((article, index) =>
            article?.image ? (
              <img
                key={index}
                className="w-full aspect-[12/16] border object-cover"
                src={article.image}
              />
            ) : (
              <img
                key={index}
                className="w-full aspect-[12/16] border object-cover sm:hidden"
                src={biscuit50}
              />
            )
          )}
      </div>
    </Link>
  );
};

export default ShopItem;
