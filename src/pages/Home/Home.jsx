import { useState } from "react";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Home = () => {
  const { data, refetch } = useUser();
  const MySwal = withReactContent(Swal);

  //   console.log(data);
  const handelDelete = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${user._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Deleted Class Successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  //   const {
  //     register,
  //     handleSubmit,
  //     reset,
  //     formState: { errors },
  //   } = useForm();

  //   const onSubmit = (data) => {
  //     console.log(data);
  //     const update = { name: data.name, email: data.email, phone: data.phone };
  //     fetch(`http://localhost:5000/updateUser/${upid}`,
  //     {
  //         method:'PUT',
  //         headers:{'content-type' : 'application/json'},
  //         body: JSON.stringify(update),
  //       })
  //       .then(res => res.json())
  //       .then(data=>{
  //           if(data.modifiedCount){
  //             refetch()
  //               Swal.fire({
  //                   position: 'top-end',
  //                   icon: 'success',
  //                   title: 'Update successfully',
  //                   showConfirmButton: false,
  //                   timer: 1500
  //               })
  //           }
  //       });
  //   }

  const handelUpdate = async (u) => {
    // console.log(u);
    const { value: formValues } = await MySwal.fire({
      html: (
        <div>
          <p>Name</p>
          <input
            className="swal2-input"
            defaultValue={u.name}
            id="name"
            type="text"
          />
          <p>Email</p>
          <input
            className="swal2-input"
            defaultValue={u.email}
            id="email"
            type="text"
          />
          <p>Phone Number</p>
          <input
            className="swal2-input"
            defaultValue={u.phone}
            id="phone"
            type="text"
          />
        </div>
      ),
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update",

      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById("name").value,
          document.getElementById("email").value,
          document.getElementById("phone").value,
        ];
      },
    });
    if (formValues) {
     
      const value = JSON.stringify(formValues)
      const [name, email, phone]= JSON.parse(value)
     const info={name, email, phone}
     fetch(`http://localhost:5000/updateUser/${u._id}`,
     {
         method:'PUT',
         headers:{'content-type' : 'application/json'},
         body: JSON.stringify(info),
       })
       .then(res => res.json())
       .then(data=>{
           if(data.modifiedCount){
            refetch()
               Swal.fire({
                   position: 'top-end',
                   icon: 'success',
                   title: 'Update successfully',
                   showConfirmButton: false,
                   timer: 1500
               })
           }
       });
    // console.log(JSON.stringify(formValues));

    }

    // .then((result) => {
    //     if (result.isConfirmed) {
    //         if (formValues) {
    //             Swal.fire(JSON.stringify(formValues));
    //           }

    //     }})
  };
  return (
    <div className="mt-6 mb-6 grid md:grid-cols-2 lg:grid-cols-3  gap-6">
      {data?.map((user) => (
        <div key={user._id} className="card w-full bg-base-100 shadow-2xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Name: {user.name}</h2>
            <p className=" font-medium text-base">Email: {user.email}</p>
            <p className=" font-medium text-base">Number: {user.phone}</p>
            <div className="card-actions justify-end">
              <button
                onClick={() => handelUpdate(user)}
                className="btn btn-warning btn-xs hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={() => handelDelete(user)}
                className="btn btn-error btn-xs hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
