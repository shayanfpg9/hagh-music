import { name } from "../../assets/config/config.json";

export default async function share(music) {
  const data = {
    title: `موزیک ${music.name} در رسانه ی ${name} `,
    text: `شما اکنون میتوانید موزیک ${music.name} کاری از ${music.singer} را از رسانه ی ${name} بشنوید.`,
    url: window.location.href,
  };

  try {
    if (navigator.canShare && navigator.canShare(data)) {
      navigator.share(data);
    }
  } catch (e) {
    console.error(e);
  }
}
