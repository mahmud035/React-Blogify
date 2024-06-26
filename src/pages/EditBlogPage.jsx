import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import InputField from '../components/ui/InputField';
import useBlogActions from '../hooks/blog/useBlogActions';
import useSetTitle from '../hooks/useSetTitle';
import { getBlogThumbnail } from '../utils';

const EditBlogPage = () => {
  useSetTitle('Edit Blog');
  const blogToEdit = JSON.parse(localStorage.getItem('blogToEdit'));
  const { id, thumbnail, title, tags, content } = blogToEdit || {};
  const { handleEditBlog } = useBlogActions();
  const blogThumbnail = getBlogThumbnail(thumbnail);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title,
      tags: tags,
      content: content,
    },
  });
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files?.length > 0) {
      setUploadedImage(e.target.files[0]);
      toast.success('Image uploaded successfully');
    }
  };

  //* Edit Blog
  const onSubmit = (data) => {
    handleEditBlog(id, data, uploadedImage, thumbnail);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main>
      <section>
        <div className="container min-h-[calc(100vh-90px)]">
          {/* Form Input field for creating Blog Post  */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="#"
            method="POST"
            className="createBlog"
          >
            <div
              style={{
                backgroundImage: `url(${blogThumbnail})`,
                filter: blur('20px'),
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
              className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4"
            >
              <div className="flex items-center gap-4 px-2 py-1 transition-all bg-[#030317] rounded-md cursor-pointer hover:scale-110">
                <label
                  htmlFor="thumbnail"
                  className="flex gap-2 cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <p className="font-medium text-white">Upload Your Image</p>
                  <input
                    {...register('thumbnail')}
                    onChange={(e) => handleImageChange(e)}
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    className="hidden"
                    accept="image/png, image/jpeg"
                  />
                </label>
              </div>
            </div>

            {errors?.thumbnail && (
              <p role="alert" className="text-red-500 ">
                {errors?.thumbnail?.message}
              </p>
            )}

            <InputField label="" error={errors?.title}>
              <input
                {...register('title', { required: 'Title is required' })}
                type="text"
                id="title"
                name="title"
                placeholder="Enter your blog title"
                className={`${
                  errors?.title ? 'border-red-500 focus:border-red-500' : null
                }`}
              />
            </InputField>

            <InputField label="" error={errors?.tags}>
              <input
                {...register('tags', { required: 'Tags are required' })}
                type="text"
                id="tags"
                name="tags"
                placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                className={`${
                  errors?.tags ? 'border-red-500 focus:border-red-500' : null
                }`}
              />
            </InputField>

            <InputField label="" error={errors?.content}>
              <textarea
                {...register('content', {
                  required: 'Blog Content is required',
                })}
                id="content"
                name="content"
                placeholder="Write your blog content"
                rows="8"
                className={`${
                  errors?.content ? 'border-red-500 focus:border-red-500' : null
                }`}
              ></textarea>
            </InputField>

            <button
              type="submit"
              className="px-6 py-2 text-white transition-all duration-200 bg-indigo-600 rounded-md md:py-3 hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default EditBlogPage;
