const ChatToFilePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return <div>ChatToFilePage {id}</div>;
};

export default ChatToFilePage;
