const Input = ({ icon: Icon, inputLabel, ...props }) => {
  return (
    <div className="relative mb-1 ">
      
      {/* Icon */}
      <div className="absolute inset-y-0 left-0 top-4 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-blue-950"/>
      </div>
    
        {/* Label */}
      <div className='pl-3 mb-1'>
        <p className="text-blue-950" >{inputLabel}</p>
      </div>

      {/* Input */}
      <input
        {...props}
        className="w-full rounded-lg py-2 pl-10 pr-3 mb-3 bg-gray-50  placeholder-gray-400 transition duration-500  focus:border-amber-500 focus:ring-2 focus:ring-amber-500"
      />

    </div>
  );
};

export default Input;