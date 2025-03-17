import React, { useEffect } from 'react'
import SideBar from '../../../components/SideBar/SideBar'
import TitleCard from '../../../components/TitleCard/TitleCard'
import InputText from '../../../components/InputText/InputText'

const Profile = () => {
  // const []
  const updateProfile = () => {

  }

  useEffect(() => {
    
  }, [])

  return (
    <SideBar>
        <TitleCard title="Profile Settings" topMargin="mt-2" width="w-full">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
            <InputText topLeft="Name" defaultValue="Alex" value={""} onChange={""}/>
            <InputText topLeft="Email Id" defaultValue="alex@dashwind.com" value={""} onChange={""}/>
            <InputText topLeft="Title" defaultValue="UI/UX Designer" value={""} onChange={""}/>
            <InputText topLeft="Place" defaultValue="California" value={""} onChange={""} />
            <InputText topLeft="Company Name" defaultValue="Google" value={""} onChange={""} />
        </div>
        <div className="divider mt-2" ></div>

        <div className="mt-16"><button className="btn btn-primary float-right" onClick={() => updateProfile()}>Update</button></div>
        </TitleCard>
    </SideBar>
  )
}

export default Profile