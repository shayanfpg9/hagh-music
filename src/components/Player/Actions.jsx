const Action = (audio) => (state, action) => {
  let Result = {};
  const end = state.time >= audio.current.duration;
  const EndObj = end
    ? {
        isPlay: false,
        BeforeClick: action.BeforeClick ? true : false,
        end: true,
      }
    : { end: false };

  switch (action.type) {
    case "play": {
      Result = { ...state, isPlay: true, BeforeClick: false, end: false };

      break;
    }

    case "pause": {
      Result = {
        ...state,
        isPlay: false,
        BeforeClick: action.BeforeClick ? true : false,
        end: false,
      };

      break;
    }

    case "SetPermission":
      Result = { ...state, CanPlay: true };

      break;

    case "SetTime": {
      if (!action.timeupdate) {
        audio.current.currentTime = action.time;
      }

      Result = {
        ...state,
        time: action.time,
        ...EndObj,
      };

      break;
    }

    case "forward": {
      const time = state.time + 5;
      audio.current.currentTime = time;
      Result = {
        ...state,
        time,
        ...EndObj,
      };

      break;
    }

    case "backward": {
      const time = state.time - 5;
      audio.current.currentTime = time;
      Result = {
        ...state,
        time,
        ...EndObj,
      };

      break;
    }

    case "volume": {
      if (action.mute) {
        Result = { ...state, volume: state.volume == 0 ? 3 : 0 };
      }

      if (action.up) {
        switch (state.volume) {
          case 0:
            Result = { ...state, volume: 1 };
            break;

          case 1:
            Result = { ...state, volume: 2 };
            break;

          case 2:
            Result = { ...state, volume: 3 };
            break;

          default:
            Result = state;
            break;
        }
      }

      if (action.down) {
        switch (state.volume) {
          case 1:
            Result = { ...state, volume: 0 };
            break;

          case 2:
            Result = { ...state, volume: 1 };
            break;

          case 3:
            Result = { ...state, volume: 2 };
            break;

          default:
            Result = state;
            break;
        }
      }

      if (action.loop) {
        switch (state.volume) {
          case 0:
            Result = { ...state, volume: 1 };
            break;

          case 1:
            Result = { ...state, volume: 2 };
            break;

          case 2:
            Result = { ...state, volume: 3 };
            break;

          case 3:
            Result = { ...state, volume: 0 };
            break;

          default:
            Result = state;
            break;
        }
      }

      break;
    }

    default:
      throw Error("Unknown action.");
  }

  return Result;
};

export default Action;
