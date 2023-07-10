export default function Team() {
  return (
    <section className="h-full text-rose-700 flex justify-start flex-wrap items-start text-base sm:text-lg lg:text-xl 2xl:text-2xl">
      <div className="w-1/3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-rose-900 mb-4">خوانندگان:</h2>
        <ul>
          <li>Itahaer</li>
          <li>Mojrem</li>
          <li>11AZG</li>
          <li>Arya G</li>
        </ul>
      </div>

      <div className="w-1/3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-rose-900 mb-4">تهیه کنندگان:</h2>
        <ul>
          <li>11AZG</li>
          <li>Arya G</li>
        </ul>
      </div>

      <div className="w-1/3">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-5xl text-rose-900 mb-4">هنرمندان:</h2>
        <ul>
          <li>Shayan</li>
        </ul>
      </div>
    </section>
  );
}
