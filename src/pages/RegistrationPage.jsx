import { Link } from 'react-router-dom';
import RegistrationForm from '../components/auth/RegistrationForm';
import useSetTitle from '../hooks/useSetTitle';

const RegistrationPage = () => {
  useSetTitle('Registration');

  return (
    <main>
      <section className="container min-h-[calc(100vh-90px)]">
        <div className=" w-full md:w-1/2 mx-auto bg-[#030317] p-8 rounded-md mt-12">
          <h2 className="mb-6 text-2xl font-bold">Register</h2>

          <RegistrationForm />

          <p className="text-center">
            Already have account?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default RegistrationPage;
