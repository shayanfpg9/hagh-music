export default function Footer() {
  return (
    <footer className="w-[95%] absolute bottom-4 bg-rose-100 left-1/2 -translate-x-1/2 p-4 rounded-3xl text-center text-rose-900 font-medium -z-10 sm:text-2xl lg:text-4xl">
      copyright &#169; {new Date().getFullYear()}
      <br />
      Designed by{" "}
      <a
        className="underline text-rose-950"
        href="https://github.com/shayanfpg9"
        target="_blank"
      >
        @shayanfpg9
      </a>{" "}
      for Hagh music
    </footer>
  );
}
