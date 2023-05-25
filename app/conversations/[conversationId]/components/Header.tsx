'use client';

import { Conversation, User } from ".prisma/client";
import useOtherUser from "@/app/hooks/useOtherUser";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: React.FC<HeaderProps> = ({
    conversation,

}) => {

    const otherUser = useOtherUser(conversation);



    return (
        <div>
            header!
        </div>
    );
}

export default Header;