import Topbar from "@/components/Topbar";
import { useChatStore } from "@/stores/useChatStore";
import { useEffect } from "react";
import UsersList from "./components/UsersList";
import ChatHeader from "./components/ChatHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageInput from "./components/MessageInput";
import { NoConversationPlaceholder } from "./components/NoConversationPlaceholder";
import MessageBubble from "./components/MessageBubble";


const ChatPage = () => {
	const { messages, selectedUser, fetchMessages } = useChatStore();


	useEffect(() => {
		if (selectedUser) fetchMessages(selectedUser.clerkId);
	}, [selectedUser, fetchMessages]);

	console.log({ messages });

	return (
		<main className='h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden'>
			<Topbar />

			<div className='grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]'>
				<UsersList />

				{/* chat message */}
				<div className='flex flex-col h-full'>
					{selectedUser ? (
						<>
							<ChatHeader />

							<ScrollArea className='h-[calc(100vh-340px)]'>
								<MessageBubble messages={messages} />
							</ScrollArea>

							<MessageInput />
						</>
					) : (
						<NoConversationPlaceholder />
					)}
				</div>
			</div>
		</main>
	);
};
export default ChatPage;

