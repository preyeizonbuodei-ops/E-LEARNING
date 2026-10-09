import UserData from "../UserPages/Component/UserData"
import Hero from "./Component/Hero"
import UserProgressArea from "./Component/UserProgressArea"



const UserLanding = () => {
  return (
    <>
        <div>
          <UserData />
          <Hero />
          <UserProgressArea />
        </div>
    </>
  )
}

export default UserLanding