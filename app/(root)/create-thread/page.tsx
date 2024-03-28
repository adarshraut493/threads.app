// In here we create threads
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";

async function Page() {
  const user = await currentUser(); // through this clerk will take us back to login.
  if (!user) return null; // this is  

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id); // if we have user data it fetches from database.
  if (!userInfo?.onboarded) redirect("/onboarding"); // if user try to create thread if they are not login it take back to onboarding.

  return (
    <>
      <h1 className='head-text'>Create Thread</h1>

      <PostThread userId={userInfo._id} />
    </>
  );
}

export default Page;
