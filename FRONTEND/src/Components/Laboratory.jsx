
const Laboratory = ({ image, heading, description }) => {
  return (
    <>

        
        <img className=" object-cover rounded-sm" src={image} alt="laboratry image h-22" />
        <h3 className=" mb-3 mt-3 pr-5 pl-5 font-bold">{heading}</h3>
        <p className="text-gray-500 mb-9 pr-5 pl-5">{description}</p>
    </>
  )
}

export default Laboratory