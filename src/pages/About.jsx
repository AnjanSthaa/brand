import NavBar from "../components/NavBar";

const About = () => {

  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">About Products</h3>
            <p className="text-gray-600 mb-4">High quality raw and edited photos for events like meetups, marriages, and more.</p>
            <img src="/path/to/events-image.jpg" alt="Events" className="w-full h-48 object-cover rounded-md" />
          </div>  

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">About Services</h3>
            <p className="text-gray-600 mb-4">Open to nature, colorful, candid, day or night landscape photography.</p>
            <img src="/path/to/landscape-image.jpg" alt="Landscape" className="w-full h-48 object-cover rounded-md" />
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">About Team</h3>
            <p className="text-gray-600 mb-4">Open to nature, colorful, candid, day or night landscape photography.</p>
            <img src="/path/to/landscape-image.jpg" alt="Landscape" className="w-full h-48 object-cover rounded-md" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;