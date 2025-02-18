import useAuth from "../../hooks/useAuth"

function Navbar() {
  const { isLoggedIn, logout} = useAuth();

  return (
    <nav className="flex justify-between items-center shadow-lg p-8">
        <a href="/" className="text-2xl font-semibold" >Sneakersku</a>

        {
          isLoggedIn() ? (
            <div className="flex gap-4">
              <a href="/cart" className="mr-4 block">Cart</a>
              <a href="/profile" className="mr-4 block">Profile</a>
              <p onClick={()=> logout()} className="cursor-pointer">Logout</p>
            </div>
          ) : (
            <div className="flex gap-4">
              <a href="/login" className="mr-4 block">Login</a>
              <a href="/register" className="block">Register</a>
            </div>
          )
        }
    </nav>
  )
}

export default Navbar
