'use client';

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from "./ConversationBox";

interface ConversationListProps {
    initalItems: FullConversationType[];
}

const ConversationList: React.FC<ConversationListProps> = ({
    initalItems
}) => {

    const [items, setItems] = useState(initalItems);
    const router = useRouter();

    const { isOpen, conversationId } = useConversation();

    return (
        <aside className={clsx(`
        fixed 
        inset-y-0
        pb-20
        lg:pb-0
        lg:left-20
        lg:w-80
        lg:block
        overflow-y-auto
        border-r
        border-gray-200
        `,
            isOpen ? 'hidden' : 'block w-full left-0'
        )}>
            <div className="px-5">
                <div className="flex justify-between pt-4 mb-4">
                    <div className="text-2xl font-bold text-neutral-800">
                        Messages
                    </div>
                    <div className="p-2 text-gray-600 transition bg-gray-100 rounded-full cursor-pointer hover:opacity-75">
                        <MdOutlineGroupAdd size={20} />
                    </div>
                </div>

                {items.map((item) => (
                    <ConversationBox key={item.id} data={item} selected={conversationId === item.id} />
                ))}

            </div>
        </aside>
    );
}

export default ConversationList;