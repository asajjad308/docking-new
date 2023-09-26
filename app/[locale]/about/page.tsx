const page = () => {
  return (
    <div className="hello">
      <div className="relative h-[400px] flex bg-cover bg-center text-white opacity-90"
        style={{ backgroundImage: "url('/images/docks.jpg')" }} >
        <div className="absolute inset-0 bg-black opacity-60"></div>{" "}
        {/* Semi-dark overlay */}
        <div className="relative  z-10 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg w-full md:w-[50%] text-center">
            Providing Docking Leasing and Rental Services in Umeå. Lorem ipsum
            is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry&apos;s standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="flex flex-col md:flex-row container mx-auto my-24 px-4 items-center justify-between w-full md:w-[80%]">
        {/* Left Side (Our Story) */}
        <div className="mb-4 md:mb-0 w-full md:w-1/2 pr-0 md:pr-8">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-lg text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
            justo pulvinar, volutpat nisl sed, volutpat nisl sed.Providing
            Docking Leasing Providing Docking Leasing and Rental Services in
            Umeå. Lorem ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry&apos;s standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen
            book.Providing Docking Leasing and Rental Services in Umeå. Lorem
            ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry&apos;s standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.Providing Docking Leasing
            and Rental Services in Umeå. Lorem ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry&apos;s standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book..
          </p>
        </div>

        {/* Right Side (Image) */}
        <div className="w-full md:w-1/2 pl-0 md:pl-8 ">
          <img
            src="/images/about.jpeg"
            alt="Our Story"
            className="w-full h-full object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
