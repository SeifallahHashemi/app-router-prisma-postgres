'use client'
import React from 'react';
import Link from "next/link";
import {useRouter} from "next/navigation";

export interface Props {
    username?: string;
    id: string;
    title: string;
    content?: string | null;
    authorName?: string | null;
}
const Posts = (props: Props) => {
    const router = useRouter();
    const deleteHandler = async (id: string) => {
        try {
            fetch(`/api/post/${id}`, {
                method: 'DELETE',
            }).then(() => {
                router.refresh()
            })
        } catch (err) {

        }
    }
    return (
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{props.authorName}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{props.content}</p>
            <div className={"flex flex-row gap-2"}><Link href="/"
                     className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </Link>
                <button type="button"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-blue-800"
                        onClick={deleteHandler.bind(null, props.id)}>
                    Delete
                </button>
            </div>
        </div>

    );
};

export default Posts;