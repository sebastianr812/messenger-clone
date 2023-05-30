import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { pusherServer } from '@/app/libs/pusher';
import { NextResponse } from 'next/server';

interface IParams {
    conversationId?: string;
}

export async function DELETE(request: Request, { params }: { params: IParams }) {

    try {

        const { conversationId } = params;
        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return new NextResponse('unauthorized', { status: 401 });
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        });

        if (!conversation) {
            return new NextResponse('invalid id', { status: 400 });
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        });

        conversation.users.forEach((user) => {
            if (user.email) {
                pusherServer.trigger(user.email, 'conversation:remove', conversation);
            }
        })

        return NextResponse.json(deletedConversation);



    } catch (e: any) {
        console.log(e, ' ERROR_CONVERSATION_DELETE');
        return new NextResponse('internal error', { status: 500 });
    }


}