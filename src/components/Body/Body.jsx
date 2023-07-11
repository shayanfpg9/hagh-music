export default function Body(props) {
  return (
    <main className="absolute w-[90%] min-h-[calc(100vh-(100vh/6+1.5rem+5rem))] mt-[calc(100vh/6+0.5rem)] left-1/2 -translate-x-1/2 bg-rose-200 bg-opacity-50 rounded-3xl -z-20 pt-8 pb-4 px-4">
      {props.children}
    </main>
  );
}
