export default async function share(music) {
  const data = {
    title: `موزیک ${music.name} در رسانه ی حق ادب`,
    text: `شما اکنون میتوانید موزیک ${music.name} کاری از ${music.singer} را از رسانه ی حق ادب بشنوید.`,
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
