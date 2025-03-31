const Hero = () => {
  return (
    <section className="relative flex items-center justify-center h-screen bg-cover bg-center bg-gray-900 text-white">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl">
          Welcome to Our Platform
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Discover the best services and solutions tailored for your needs.
        </p>
        <div className="mt-6 space-x-4">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition">
            Get Started
          </button>
          <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold text-lg rounded-lg transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
