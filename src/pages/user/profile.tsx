import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import FormAddress from "../../components/form/FormAddress";
import { InputAddress } from "../../types/user";

function Profile() {
  const { getProfile, addAddress, loading, userData } = useUser();

  const [showFormAddress, setShowFormAddress] = useState(false);

  const handleShowFormAddress = () => {
    setShowFormAddress(!showFormAddress);
  }
  
  const handleAddAddress = (address : InputAddress) => {
    addAddress(address);
  }

  useEffect(() => {
    getProfile();
  }, []);

  if (loading.getProfile) {
    return <div className="text-center p-4">Loading...</div>;
  }


  return (
    <>    
      <div className="p-6 bg-white shadow-md rounded-md border border-slate-100 m-12 max-w-[820px] mx-5 md:mx-auto">
        <h1 className="text-4xl font-bold">Profile</h1>
        <div className="mt-4">
          <p className="text-xl">Name: {userData?.name}</p>
          <p className="text-xl">Email: {userData?.email}</p>
        </div>
      </div>
      
      <div className="p-6 bg-white shadow-md rounded-md border border-slate-100 m-12 max-w-[820px] mx-5 md:mx-auto">
        <h1 className="text-4xl font-bold">Address</h1>
          {
            userData?.addresses && userData?.addresses.map((address) => (
              <div key={address.id} className="mt-4 p-2 border border-slate-200 rounded-md">
                <p className="text-xl">label: {address.label}</p>
                <p className="text-xl">Street: {address.street}</p>
                {
                  address.is_primary && (
                    <p className="text-xl">Primary Address</p>
                  ) 
                }
              </div>
            ))
          }
          {
            userData?.addresses.length === 0 && (
              <p className="text-xl text-center py-6">No address found</p>
            )
          }
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full" onClick={handleShowFormAddress}>Add Address</button>
      </div>
      
      {
        showFormAddress && <FormAddress onClose={handleShowFormAddress} onSubmit={handleAddAddress} />

      }
    </>
  )
}

export default Profile