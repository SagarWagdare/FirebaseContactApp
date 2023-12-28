import firebaseIcon from "../assets/images/logos_firebase.svg"
const Navbar = () => {
  return (
    <div className="
    h-[60px] bg-white m-4 rounded-lg flex justify-center items-center gap-2 ">
        <img src={firebaseIcon} alt="" />
        <h1 className="text-xl font-medium">Firebase Contact App</h1>
    </div>
  )
}

export default Navbar