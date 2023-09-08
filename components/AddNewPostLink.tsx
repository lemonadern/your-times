type Props = {
  newPostUrl: string;
}

export default function AddNewPostLink({ newPostUrl }: Props) {
  return (

    <div class="fixed bottom-0 w-screen md:max-w-xl mx-auto h-[100svh] pointer-events-none">
      <a
        class="absolute pointer-events-auto w-[50px] h-[50px] bg-blue-600 flex items-center justify-center rounded-full bottom-5 right-5 shadow-xl shadow-white text-xs font-bold"
        target="_blank"
        href={newPostUrl}
      >
        + Post
      </a>
    </div>
  );
}
