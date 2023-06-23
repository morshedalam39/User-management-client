import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const saveUser = { name: data.name, email: data.email, phone: data.phone };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(saveUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          reset();
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "User created successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="  ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto mt-6 mb-6 "
      >
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-bold">
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-bold">
            Email Address
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address",
              },
            })}
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block mb-2 font-bold">
            Phone Number
          </label>
          <input
            {...register("phone", {
              required: "Phone number is required",
            })}
            type="tel"
            id="phone"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-warning  hover:bg-yellow-700"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
