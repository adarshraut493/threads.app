import ProfileHeader from '@/components/shared/ProfileHeader';
import { currentUser } from '@clerk/nextjs'; // to know which user is creating the thread
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { communityTabs } from '@/constants';
import Image from 'next/image';
import ThreadsTab from '@/components/shared/ThreadsTab';
import { fetchCommunityDetails } from '@/lib/actions/community.actions';
import UserCard from '@/components/cards/UserCard';

async function Page({ params }: { params: { id: string } }) {

    const user = await currentUser();
    if (!user) return null;
    const communityDetails = await fetchCommunityDetails(params.id)

    return (
        <section>
            <ProfileHeader
                accountId={communityDetails.id}
                authUserId={user.id}
                name={communityDetails.name}
                username={communityDetails.username}
                imgUrl={communityDetails.imgUrl}
                bio={communityDetails.bio}
                type="Community"
            />
            <div className='mt-3'>
                <Tabs defaultValue='threads' className='w-full'>
                    <TabsList className='tab'>
                        {communityTabs.map((tab) => (
                            <TabsTrigger key={tab.label} value={tab.value}>
                                <Image src={tab.icon}
                                    alt={'tab.label'}
                                    width={24}
                                    height={24}
                                    className='object-contain'
                                />
                                <p className='max-sm:hidden'>{tab.label}
                                </p>
                                {tab.label === 'Threads' && (
                                    <p className='ml-1 rounded-sm bg-light-4 px-2
                                        py-1 !text-tiny-medium text-light-2'>
                                        {communityDetails?.threads?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    
                    <TabsContent value="threads"
                            className="w-full text-light-1">
                            <ThreadsTab
                                currentUserId={user.id}
                                accountId={communityDetails.id}
                                accounttype="User"
                            />
                        </TabsContent>
                        <TabsContent value="members" className="w-full text-light-1">
                            <section className='mt-9 flex flex-col gap-10'>
                                {communityDetails?.members.map((members:any)=>(
                                    <UserCard
                                    key={members.id}
                                    id={members.id}
                                    name={members.name}
                                    username={members.username}
                                    imgUrl={members.image}
                                    personType='User'
                                    />
                                ))}

                            </section>
                           
                        </TabsContent>
                        <TabsContent value="requests"
                            className="w-full text-light-1">
                            <ThreadsTab
                                currentUserId={user.id}
                                accountId={communityDetails.id}
                                accounttype="User"
                            />
                        </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}

export default Page;


