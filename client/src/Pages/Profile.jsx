import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react'

import {getStorage, uploadBytesResumable,ref, getDownloadURL} from 'firebase/storage'
import {app} from '../firebase';
import { useDispatch } from 'react-redux';
import { updateUserStart,updateUserFailure, updateUserSuccess, deleteUserStart,deleteUserSuccess,deleteUserFailure, signout } from '../redux/User/userSlice';


export default function Profile() {
  const dispatch=useDispatch()
  const fileRef=useRef(null);
  const [image,setImage]=useState(undefined);
  const [imagePercent,setImagePercent]=useState(0);
  const [imageError,setImageError]=useState(false);
  const [formData,setFormData]=useState({});
  const [updateSuccess,setuodateSuccess]=useState(false)

 
    const {currentUser,loading,error}=useSelector((state)=>state.user)
    useEffect(()=>{
      if(image){
        handleFileUpload(image)
          }
      },[image]);

      const handleFileUpload=async (image)=>{
        const storage=getStorage(app)
        const fileName=new Date().getTime()+image.name;
        const storageRef=ref(storage,fileName)
        const uploadTask=uploadBytesResumable(storageRef,image)

        uploadTask.on('state_changed',
          (snapshot)=>{
          const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
          setImagePercent(Math.round(progress))
          
    },
  
    (error)=>{
      setImageError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL)=>setFormData({ ...formData, 
        profilePicture:downloadURL}))

      }
    
   )
  };

  const handlechange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }



  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const res=await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData,)
      });
      const data=await res.json();
      if(data.success===false){
          dispatch(updateUserFailure(data));
          return
      }
      dispatch(updateUserSuccess(data));
      setuodateSuccess(true)
    }catch(error){
      dispatch(updateUserFailure(error));
    }
  };



  const handledeleteAccount =async ()=>{
    try{
      dispatch(deleteUserStart())
        const res=await fetch(`/api/user/delete/${currentUser._id}`,{

        method:'DELETE',
        })
        const data=await res.json();
        if(data.success===false){
          dispatch(deleteUserFailure(data))
          return;
        }
        dispatch(deleteUserSuccess(data))
        alert('user deleted successfully')
    }catch(error){
        dispatch(deleteUserFailure(error))
    }
  }


  const handleSignOut=async ()=>{
    try{

      await fetch('api/auth/signout')
      dispatch(signout())
    }catch(error){
        console.log(error)
    }
  }
  return (

    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form  onSubmit={handleSubmit}className='flex flex-col gap-4' >
        <input type='file' ref={fileRef} hidden accept='image/*' onChange={(e)=>setImage(e.target.files[0])}></input>

          {/*allow read;
                allow write:if
                request.resource.size < 2 * 1024 * 1024 &&
                request.resource.contentType.matches('image/.*')*/}

      <img src={formData.profilePicture||currentUser.profilePicture} alt='profile' className='h-24 w-24 self-center cursor-pointer rounded-full object-cover'
      onClick={()=>fileRef.current.click()}></img>

      <p className='text-sm self-center'>
            {imageError ?(
              <span className='text-red-700'>Error uploading image (file size must be less than 2 MB)</span>
            ):imagePercent>0&&imagePercent<100?(
              <span className='text-slate-700'>{`uploading:${imagePercent} %`}</span>
            ):imagePercent===100?(
              <span className='text-green-400'>Image uploaded successfully</span>
            ):(
              ''
            )}

      </p>

      <input defaultValue={currentUser.username} type='text' id='username' placeholder='Username' className='bg-slate-100 rounded-lg p-3' onChange={handlechange}></input>
      <input defaultValue={currentUser.email} type='email' id='email' placeholder='Email' className='bg-slate-100 rounded-lg p-3' onChange={handlechange}></input>
      <input type='password' id='password' placeholder='password' className='bg-slate-100 rounded-lg p-3' onChange={handlechange}></input>

      <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'loading...':'update'}</button>

      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handledeleteAccount} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut}className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
        <p className='text-red-700 mt-5'>{error && 'Something went wrong'}</p>
        <p className='text-green-700 mt-5'>{updateSuccess  && 'user  updated successfully'}</p>
     
    </div>
  )
}
