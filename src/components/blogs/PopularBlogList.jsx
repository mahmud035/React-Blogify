import PopularBlogCard from './PopularBlogCard';

const PopularBlogList = ({ popularBlogs }) => {
  return (
    <>
      {popularBlogs?.length > 0 ? (
        popularBlogs
          ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
          ?.map((blog) => <PopularBlogCard key={blog?.id} blog={blog} />)
      ) : (
        <p className="pt-4 text-2xl italic text-center">
          No Popular Blog Found!
        </p>
      )}
    </>
  );
};

export default PopularBlogList;
