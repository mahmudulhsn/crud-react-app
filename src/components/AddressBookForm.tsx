import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosClient from "../utils/axiosClient";
import { z } from "zod";
import { AddressBook } from "../views/addressBooks/AddressBooksList";

type CreateAddressBookType = {
  name: string;
  email: string;
  phone: string;
  website: string;
  gender: string;
  // user_id: string;
  age: string;
  nationality: string;
};

const AddressBookForm = ({ addressBook }: { addressBook?: AddressBook }) => {
  console.log(addressBook);
  const { showToast } = useStateContext();
  const [apiErrors, setApiErrors] = useState<any>([]);
  const navigate = useNavigate();

  const defaultValues: CreateAddressBookType = {
    name: addressBook ? addressBook.name : "",
    email: addressBook ? addressBook.email : "",
    phone: addressBook ? addressBook.phone : "",
    website: addressBook ? addressBook.website : "",
    gender: addressBook ? addressBook.gender : "",
    // user_id: addressBook ? addressBook.addressBook?.id : "",
    age: addressBook ? addressBook.age : "",
    nationality: addressBook ? addressBook.nationality : "",
  };

  const addressBookCreateSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    phone: z.string(),
    website: z.string(),
    gender: z.string(),
    // user_id: z.string(),
    age: z.string(),
    nationality: z.string(),
  });

  const addressBookEditSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    phone: z.string(),
    website: z.string(),
    gender: z.string(),
    // user_id: z.string(),
    age: z.string(),
    nationality: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof addressBookCreateSchema>>({
    resolver: !addressBook
      ? zodResolver(addressBookCreateSchema)
      : zodResolver(addressBookEditSchema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<CreateAddressBookType> = (data) => {
    console.log(data);
    if (addressBook) {
      axiosClient
        .put(`/address-books/${addressBook.id}`, data)
        .then(({ data }) => {
          showToast(data.message);
          navigate("/dashboard/address-books");
        })
        .catch((err) => {
          if (err.response.status === 422) {
            setApiErrors(err.response.data.errors);
          } else {
            console.log(err);
          }
        });
    } else {
      axiosClient
        .post("/address-books", data)
        .then(({ data }) => {
          showToast(data.message);
          navigate("/dashboard/address-books");
        })
        .catch((err) => {
          if (err.response.status === 422) {
            setApiErrors(err.response.data.errors);
          } else {
            console.log(err);
          }
        });
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl text-bold py-2">
        {addressBook ? "Update addressBook" : "Create New addressBook"}
      </h1>
      <div className="bg-white p-10 rounded">
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              {...register("name")}
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
            {apiErrors.name && (
              <span className="text-red-500">{apiErrors.name}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
            {apiErrors.email && (
              <span className="text-red-500">{apiErrors.email}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone
            </label>
            <input
              {...register("phone")}
              type="text"
              name="phone"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="+8801111111111"
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone.message}</span>
            )}
            {apiErrors.phone && (
              <span className="text-red-500">{apiErrors.phone}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="website"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Website
            </label>
            <input
              {...register("website")}
              type="text"
              name="website"
              id="website"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://example.com"
            />
            {errors.website && (
              <span className="text-red-500">{errors.website.message}</span>
            )}
            {apiErrors.website && (
              <span className="text-red-500">{apiErrors.website}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender
            </label>
            <select
              {...register("gender")}
              name="gender"
              id="gender"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            {errors.gender && (
              <span className="text-red-500">{errors.gender.message}</span>
            )}
            {apiErrors.gender && (
              <span className="text-red-500">{apiErrors.gender}</span>
            )}
          </div>
          {/* <div>
            <label
              htmlFor="user_id"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Created By
            </label>
            <select
              {...register("user_id")}
              name="user_id"
              id="user_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {addressBookList.map((addressBook) => (
                <option value={addressBook.id} key={addressBook.id}>
                  {addressBook.name}
                </option>
              ))}
            </select>
            {errors.user_id && (
              <span className="text-red-500">{errors.user_id.message}</span>
            )}
            {apiErrors.user_id && (
              <span className="text-red-500">{apiErrors.user_id}</span>
            )}
          </div> */}
          <div>
            <label
              htmlFor="age"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Age
            </label>
            <input
              {...register("age")}
              type="text"
              name="age"
              id="age"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="28"
            />
            {errors.age && (
              <span className="text-red-500">{errors.age.message}</span>
            )}
            {apiErrors.age && (
              <span className="text-red-500">{apiErrors.age}</span>
            )}
          </div>
          <div>
            <label
              htmlFor="nationality"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nationality
            </label>
            <input
              {...register("nationality")}
              type="text"
              name="nationality"
              id="nationality"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Bangladeshi"
            />
            {errors.nationality && (
              <span className="text-red-500">{errors.nationality.message}</span>
            )}
            {apiErrors.nationality && (
              <span className="text-red-500">{apiErrors.nationality}</span>
            )}
          </div>

          <button
            type="submit"
            className=" text-white bg-cyan-900 hover:bg-cyan-900 focus:ring-4 focus:outline-none focus:ring-cyan-900 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-900 dark:hover:bg-cyan-900 dark:focus:ring-cyan-900"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressBookForm;
