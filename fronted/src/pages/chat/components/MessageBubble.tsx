import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";
import { Message } from "@/types";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
export type MessageBubbleTypes = {
  messages: Message[]
}
const MessageBubble = ({ messages }: MessageBubbleTypes) => {
  const { fetchUsers, selectedUser } = useChatStore();
  const { user } = useUser();

  useEffect(() => {
    if (user) fetchUsers();
  }, [fetchUsers, user]);
  return (
    <div className='p-4 space-y-4'>
      {messages.map((message) => (
        <div key={message._id} className={`flex items-start gap-3 ${message.senderId === user?.id ? 'flex-row-reverse' : ''}`}>
          <Avatar className='size-8'>
            <AvatarImage src={message.senderId === user?.id ? user.imageUrl : selectedUser?.imageUrl} />
          </Avatar>

          <div
            className={`rounded-lg p-3 max-w-[70%]	${message.senderId === user?.id ? 'bg-green-500' : 'bg-zinc-800'}`}
          >
            <p className='text-sm'>{message.content}</p>
            <span className='text-xs text-zinc-300 mt-1 block'>{formatTime(message.createdAt)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageBubble;
