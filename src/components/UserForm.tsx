import { useState } from "react";
import { User } from "../views/users/UsersList";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosClient from "../utils/axiosClient";
import { z } from "zod";

type CreateUserType = {
  name: string;
  email: string;
  phone: string;
  website: string;
  gender: string;
  age: string;
  nationality: string;
  password?: string;
  confirm_password?: string;
};

const UserForm = ({ user }: { user?: User }) => {
  const { showToast } = useStateContext();
  const [apiErrors, setApiErrors] = useState<any>([]);
  const navigate = useNavigate();

  const defaultValues: CreateUserType = {
    name: user ? user.name : "",
    email: user ? user.email : "",
    phone: user ? user.phone : "",
    website: user ? user.website : "",
    gender: user ? user.gender : "",
    age: user ? user.age : "",
    nationality: user ? user.nationality : "",
  };

  const userCreateSchema = z
    .object({
      name: z.string().min(1, { message: "Name is required" }),
      email: z.string().email(),
      phone: z.string(),
      website: z.string(),
      gender: z.string(),
      age: z.string(),
      nationality: z.string(),
      password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
      confirm_password: z
        .string()
        .min(1, { message: "Confirm Password is required" }),
    })
    .refine((data) => data.password === data.confirm_password, {
      path: ["confirm_password"],
      message: "Password don't match",
    });

  const userEditSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    phone: z.string(),
    website: z.string(),
    gender: z.string(),
    age: z.string(),
    nationality: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof userCreateSchema>>({
    resolver: !user
      ? zodResolver(userCreateSchema)
      : zodResolver(userEditSchema),
    defaultValues: defaultValues,
  });

  const onSubmit: SubmitHandler<CreateUserType> = (data) => {
    if (user) {
      axiosClient
        .put(`/users/${user.id}`, data)
        .then(({ data }) => {
          showToast(data.message);
          navigate("/dashboard/users/list");
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
        .post("/users", data)
        .then(({ data }) => {
          showToast(data.message);
          navigate("/dashboard/users/list");
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
        {user ? "Update User" : "Create New User"}
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
          {!user && (
            <>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {apiErrors.password && (
                  <span className="text-red-500">{apiErrors.password}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm_password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  {...register("confirm_password")}
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.confirm_password && (
                  <span className="text-red-500">
                    {errors.confirm_password.message}
                  </span>
                )}
                {apiErrors.confirm_password && (
                  <span className="text-red-500">
                    {apiErrors.confirm_password}
                  </span>
                )}
              </div>
            </>
          )}

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

export default UserForm;
