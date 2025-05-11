import {React,useEffect} from 'react'
import bg from "../assets/bg.png"
import Input from "./Input";
import Button from "./Button"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function form() {
    const [submissions, setSubmissions] = useState(()=> {
        const stored = localStorage.getItem("visitorData");
        return stored ? JSON.parse(stored) : [];
      });
      
    useEffect(() => {
        localStorage.setItem("visitorData", JSON.stringify(submissions));
    }, [submissions]);
      

    const { register, handleSubmit, reset ,formState: { errors }, } = useForm()


    const onSubmit = async (data) => {
        setSubmissions(prev => [...prev, data]);
        toast.success("Visitor details saved successfully!");
        reset();
    }

  return (
    <div>
        <ToastContainer position="top-center" autoClose={3000} />
    <div className='w-screen flex '>        
        <div className='w-1/2'>
            <img src={`${bg}`}/>
        </div>

        <div className='w-1/2'>
            <div className=' w-full h-full pl-[14%] pr-[20%] '>
                <div className='my-[10%]'>
                    <p className='text-4xl py-[20px] text-gray-700'>Welcome! We'd Love to Know You Better 😊</p>
                    <p className='text-lg text-gray-500 px-[5px] pb-[20px]'>Your presence matters — help us keep our community connected and safe.</p>
                </div>
                <form  onSubmit={handleSubmit(onSubmit)} className=' w-full '>

                    <div className='mb-[20px]'>
                        <label className="block peer-focus:text-blue-500 text-sm text-gray-500">Full Name:</label>
                        <Input className="peer" required placeholder="" {...register("fullName")}/>
                        
                    </div>

                    <div className='mb-[20px] '>
                        <label className="block text-sm text-gray-500 ">Flat Number:</label>
                        <Input required  {...register("flatNumber")}/>
                    </div>

                    <div className=' mb-[20px]'>
                        <label className="block text-sm text-gray-500 mb-[5px]" htmlFor="purpose">Purpose of Visit:</    label>
                        <select className="w-25px p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" {...register("purpose")} >
                            <option value="Delivery">Delivery</option>
                            <option value="Guest">Guest</option>
                            <option value="Maintenance">Maintennce</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className=' mb-[20px]'>
                        <label className="block text-sm text-gray-500">Mobile Number:</label>
                        <Input type="tel" required className="w-full" {...register("mobile", {required: "Mobile number is required",pattern: {value: /^[0-9]{10}$/,message: "Mobile number must be exactly 10 digits",                           
                        },})}/>
                        {errors.mobile && (<p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>)}
                    </div>
                    <div className='flex justify-center'>
                        <Button
                            type="submit"
                            className="mt-5 bg-[#035a70] hover:bg-[#1e424b] disabled:cursor-not-allowed py-2 px-8 rounded-2xl">Submit
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    </div>

    <div>
        <div className="mt-20 m-[10%]">
            <h2 className="text-xl font-bold">Visitor Log:</h2>
            {submissions.map((entry, index) => (
                <div key={index} className="border p-3 my-2 rounded-lg border-gray-400 bg-gray-100">
                    <p><strong>Name:</strong> {entry.fullName}</p>
                    <p><strong>Flat:</strong> {entry.flatNumber}</p>
                    <p><strong>Purpose:</strong> {entry.purpose}</p>
                    <p><strong>Mobile:</strong> {entry.mobile}</p>
                </div>
            ))}
        </div>
    </div>
    </div> 
  )
}

export default form
