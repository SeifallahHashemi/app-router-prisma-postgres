'use client'
import React from 'react';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {addPostSchema, TAddPostSchema} from "../../../libs/types";
import {useRouter} from "next/navigation";

const AddPostsPage = () => {
    const router = useRouter();
    const {register, handleSubmit, reset, formState: {errors, isSubmitting}, setError} = useForm<TAddPostSchema>({
        resolver: zodResolver(addPostSchema)
    })
    const submitFormHandler = async (data: TAddPostSchema) => {
        try {
            const response = await fetch('/api/addPosts', {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
                next: {
                    tags: ['post']
                }
            })
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error("something went wrong")
            }
            if (responseData.errors) {
                const errors = responseData.errors;
                if (errors.username) {
                    setError("username", {
                        type: "server",
                        message: errors.username,
                    });
                } else if (errors.title) {
                    setError("title", {
                        type: "server",
                        message: errors.title,
                    });
                } else if (errors.content) {
                    setError("content", {
                        type: "server",
                        message: errors.content,
                    });
                } else {
                    console.log("something went wrong!!!")
                }
            }
            reset();
            router.push("/")
        } catch (error) {

        }
    }
    return (
        <form className={"max-w-3xl container py-4"} onSubmit={handleSubmit(submitFormHandler)}>
            <div className="mb-6">
                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    Name</label>
                <input {...register("username")} type="text" id="username"
                       className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       required/>
                {errors.username && (
                    <p className={"text-rose-600"}>{`${errors.username.message}`}</p>)}
            </div>
            <div className="mb-6">
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your
                    Title</label>
                <input {...register("title")} type="text" id="title"
                       className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       required/>
                {errors.title && (
                    <p className={"text-rose-600"}>{`${errors.title.message}`}</p>)}
            </div>
            <div className="mb-6">
                <label htmlFor="content"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                <input {...register("content")} type="text" id="content"
                       className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                       required/>
                {errors.content && (
                    <p className={"text-rose-600"}>{`${errors.content.message}`}</p>)}
            </div>

            <button type="submit"
                    disabled={isSubmitting}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register
                new account
            </button>
        </form>

    );
};

export default AddPostsPage;