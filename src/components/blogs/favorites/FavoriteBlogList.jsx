import useProfile from '../../../hooks/profile/useProfile';
import FavoriteBlogCard from './FavoriteBlogCard';

const FavoriteBlogList = () => {
  const { profile } = useProfile();
  const { user } = profile || {};

  return (
    <ul className="my-5 space-y-5">
      {user?.favourites?.length > 0 ? (
        user?.favourites
          ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
          ?.map((blog) => <FavoriteBlogCard key={blog?.id} blog={blog} />)
      ) : (
        <p className="pt-4 text-2xl text-center">
          You have not added any blogs as favourites yet!
        </p>
      )}
    </ul>
  );
};

export default FavoriteBlogList;
