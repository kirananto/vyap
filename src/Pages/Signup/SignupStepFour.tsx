import React, { useEffect, useState } from "react";
import vyapLogo from "../../assets/new_logo.svg";
import "./Signup.css";
import { SimpleFooter } from "../../Components/Footer";
import { useHistory } from "react-router";
import { fetchCategories } from "src/API/category.axios";
import { useDispatch, useSelector } from "react-redux";
import { selectCredentials, setCredentials } from "../Login/credentialsSlice";
import { selectSignupInfo, setCategory } from "./signupSlice";
import { signupAPI } from "src/API/signup.axios";

interface CardInterface {
  title: string
  description: string
  isSelected?: boolean
  onSelect?: () => void
  image?: string
}

const Card = ({ title, description, isSelected, image,onSelect }: CardInterface) => {
  return (
    <div onClick={onSelect} className="flex cursor-pointer items-center gap-3 bg-white custom">
      {/* ===tick-div=== */}
      <div  className={`inline-flex items-center justify-center w-8 h-8 mx-2 p-1 transition duration-500 ease-in-out rounded-full ${isSelected ? 'bg-green-200' : 'bg-gray-200'}`}>
        {isSelected && <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-green-800"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>}
      </div>
      {/* === */}
      <div className="flex flex-col custom-width-para-text ml-2">
        <h1 className="text-lg font-bold text-gray-600">{title}</h1>
        <p className="text-xs text-gray-400">
          {description}
        </p>
        {/* <img src="" alt="" /> */}
      </div>
      <div className="background-graphics"></div>
    </div>
  );
};

export default function SignupStepTwo() {
  const logoStyle = { marginLeft: "-20px" };
  const [categories, setCategories] = useState<any[]>([])
  const history = useHistory()
  const dispatch = useDispatch()
  const { token } = useSelector(selectCredentials)
  const signup = useSelector(selectSignupInfo)
  
  useEffect(() => {
    fetchCategories(token!).then(result => {
      console.log('data', result.data)
      setCategories(result.data?.data)
    }).catch(error => {
      console.log('error')
    })
  }, [])

  function handleSubmit() {//TODO Fix this
    signupAPI({
    phone: signup.phone,
    name: signup.name,
    email: signup.email,
    businessName: signup.businessName,
    address: signup.address,
    categoryId: signup.category,
    pinCode: signup.pinCode,
    listPrivately: signup.listPrivately,
    organizationLocation: {
      lat: signup.organizationLocation.lat,
      lng: signup.organizationLocation.lng,
      address: signup.address,
      city: 'Nil',
      pinCode: signup.pinCode,
      state: 'Kerala'
    }
  }).then(result => {
    console.log('result,', result.data)
    dispatch(setCredentials(result.data))
    history.push('/signup-step-4')
  })
}

  return (
    <div className="flex flex-col items-start w-full h-screen bg-gray-100">
      <div className="w-11/12 mx-auto ">
        <div className="flex items-center justify-start mt-32 mb-5">
          <img style={logoStyle} className="w-24 m--5" src={vyapLogo} alt="" />
          <h1 className="text-4xl font-bold text-gray-600 ">VYAP</h1>
        </div>

        <h1 className="text-lg font-bold text-gray-600">
          Please specify the <br /> category of business
        </h1>

        <div className="flex flex-col gap-4 mt-6">
          {categories.map(mapItem => <Card isSelected={mapItem.id === signup.category} onSelect={() => dispatch(setCategory(mapItem.id))} title={mapItem.name} key={mapItem.id} description={mapItem?.description}/>)}
        </div>
      </div>
      <SimpleFooter btnName="Create account." onClick={handleSubmit}/>
    </div>
  );
}
