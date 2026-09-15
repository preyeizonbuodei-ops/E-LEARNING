

const Action = ({ image: Icon, description }) => {
  return (
    <>
        <div className="flex justify-center items-center gap-3 text-amber-500">
            <Icon  className="h-10 w-10"/>
            <p className="text-white font-bold leading-3.5 text-[13px]">{description}</p>
        </div>
    </>
  )
}

export default Action