

const Newscom = ({ image, heading, title, date }) => {
  return (
    
    <>
        <div className="pr-7">
            <img className=" h-19 object-cover rounded-sm mb-9 pl-4 pt-3" src={image} alt="" />
            <h1>{title}</h1>
            <p className=" rounded-sm   text-black">{heading}</p>
            <p className="text-gray-500 font-[12]">{date}</p>
        </div>
    </>
  )
}

export default Newscom