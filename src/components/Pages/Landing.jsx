import { Link } from "react-router-dom";
import Banner from "../../assets/images/banner.svg";

export default function Landing() {
  return (
    <section className="h-full flex justify-center items-center">
      <div className="basis-3/4 text-xl text-rose-700 font-medium flex justify-center items-center flex-wrap">
        لیبل تازه تاسیس "حق ادب" در زمینه ی تولید محتوای صوتی به صورت موسیقی رپ
        فعالیت میکند این لیبل با هدف متحد کردن جوانان با استعداد ایرانی در تیر
        مال سال 1402 فعالیت خود را به صورت حرفه ای اغاز کرده است و ما امیدواریم
        با حمایت شما طرفداران عزیز به موفقیت های بسیاری در این عرصه دست یابد :)
        <section className="flex justify-center items-center flex-col mt-4 text-rose-800">
          <Link
            className="bg-rose-200 p-4 mt-2 rounded-2xl hover:shadow-lg hover:shadow-rose-300 hover:-translate-y-2"
            to="/team"
          >
            اشنایی با تیم
          </Link>
          <Link
            className="bg-rose-200 p-4 mt-4 rounded-2xl hover:shadow-lg hover:shadow-rose-300 hover:-translate-y-2"
            to="/musics"
          >
            بازدید از آهنگ ها
          </Link>
        </section>
      </div>
      <figure className="h-full">
        <img src={Banner} alt="banner" />
        <figcaption className="italic text-rose-900">
          سایت مرجع تصویر استفاده شده:{" "}
          <Link className="underline" to="https://undraw.co" target="_blank">
            https://undraw.co
          </Link>
        </figcaption>
      </figure>
    </section>
  );
}
