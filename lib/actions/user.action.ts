"use server"
import { connectToDB } from "../mongoose"
import User from "../models/user.model";
import Thread from "../models/thread.model";
import { revalidatePath } from "next/cache";
import { getJsPageSizeInKb } from "next/dist/build/utils";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}
export async function updateUser({
    userId,
    username,         // these all are props 
    name,
    bio,
    image,
    path,
}: Params)
    : Promise<void> {

    try {
        connectToDB();
        await User.findOneAndUpdate(
            { id: userId },
            {
                username: username.toLowerCase(), // to make it lowercase
                name,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true }  // updating and inserting 
        );
        if (path === '/profile/edit') {
            revalidatePath(path);
        }
    }
    catch (error: any) {
        throw Error(`Failed to create/update user: ${error.message}`);

    }
}
export async function fetchUser(userId: string) {
    try {
        connectToDB();
        return await User
            .findOne({ id: userId })
        //.populate({
        //path:'communities',
        //model:Community 
        //})
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`);

    }
}


export async function fetchUserPosts(userId: string) {
    try {
        connectToDB();
        // find all the threads authored by user with the given userId
        // TODO: Populate community
        const threads = await User.findOne({ id: userId })
            .populate({
                path: 'threads',
                model: Thread,
                populate: {
                    path: 'children',
                    model: Thread,
                    populate: {
                        path: 'author',
                        model: User,
                        select: 'name image id'
                    }
                }
            })
        return threads;
    } catch (error: any) {
        throw new Error(`Failed to fetch user posts: ${error.message}`)

    }
}

export async function fetchUsers({
    userId,
    searchString = "",
    pageNumber = 1,
    pageSize = 20,
    sortBy = "desc"
}: {
    userId: string;
    searchString?: string;
    pageNumber?: number;
    pageSize?: number;
    sortBy?: SortOrder
}) {
    try {
        connectToDB();

        const skipAmount = (pageNumber - 1) * pageSize;

        const regex = new RegExp(searchString, "i");

        const query : FilterQuery<typeof User> = {
            id: { $ne: userId }
           
        }
        if (searchString.trim() !== '') {
            query.$or = [
                { username: { $regex: regex } },
                { name: { $regex: regex } }
            ]
        }

        const sortOptions = { createdAt: sortBy };
        const usersQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize);
        const totalUsersCount = await User.countDocuments(query);
        const users = await usersQuery.exec();
        const isNext = totalUsersCount > skipAmount + users.length;

        return { users, isNext };

    } catch (error: any) {
        throw new Error(`Failed to fetch users: ${error.message}`)
    }
}

export async function getActivity(userId: string) { 
    try {
        connectToDB();
        //find all threads created by the user
        const userThreads = await Thread.find({ author: userId });

        //collect all the threads ids (replies) from the 'children' field

        const childThreadIds = userThreads.reduce((acc, userThread) => {
            return acc.concat(userThread.children)
        }, [])  // [] this is the default accumalator 

        const replies = await Thread.find({
            _id: { $in: childThreadIds },
            author: { $ne: userId }
        }).populate({
            path: 'author',
            model: User,
            select: 'name image _id'
        })
         
        return replies;
        // collect all the child thread ids (replies) from the 'children' field
        const childThreads = userThreads.reduce((acc, userThread) => {
            return acc.concat(userThread.children)
        })
    } catch (error:any) {
throw new Error(`Failed too fetch activity : ${error.message}`)
    }
}7