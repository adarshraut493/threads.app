import { fetchUserPosts } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface Props {
    currentUserId: string;
    accountId: string;
    accounttype: string;
}

const ThreadsTab = async ({ currentUserId, accountId, accounttype }: Props) => {

    let result: any;

    if (accounttype === 'Community') {
        result = await fetchCommunityPosts(accountId);
    } else {
        result = await fetchUserPosts(accountId);
    }

    if (!result) redirect('/')

    return (
        <section className="mt-9 flex flex-col gap-10">
            {result.threads.map((thread: any) => (
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={currentUserId}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={
                        accounttype === 'User'
                            ? { name: result.name, image: result.image, id: result.id }
                            : {
                                name: thread.author.name, image: thread.author.image,
                                id: thread.author.id
                            }
                    }
                    community={thread.community}  //todo
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            ))}
        </section>
    )
}

export default ThreadsTab;