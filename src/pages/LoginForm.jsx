
const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden xl:min-w-[400px] lg:w-[900px] transition-all duration-300">

        {/* Right Side - Image */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="https://via.placeholder.com/600x800" // Replace with actual image source
            alt="Login Visual"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 p-6 lg:p-8 max-w-[450px]">
          <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 lg:mb-6">Sign in to your account</h2>

          {/* Form */}
          <form>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 lg:px-4 lg:py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4 lg:mb-6">
              <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 lg:px-4 lg:py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end mt-2">
                <a href="#" className="text-blue-600 hover:underline text-sm">Forgot password?</a>
              </div>
            </div>

            <div className="mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                <span className="ml-2 text-gray-600 text-sm">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm lg:text-base"
            >
              Sign in
            </button>
          </form>

          <div className="flex items-center justify-between my-4 lg:my-6">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className="text-xs text-gray-500 uppercase">Or continue with</span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-2">
            <button className="flex items-center justify-center w-full sm:w-1/2 bg-white border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 py-2 px-4">
              <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
              <span className="text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center w-full sm:w-1/2 bg-white border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 py-2 px-4">
              <img src="/github-icon.svg" alt="GitHub" className="w-5 h-5 mr-2" />
              <span className="text-sm">GitHub</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginForm;
