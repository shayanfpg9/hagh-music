export default (audio) => (state, action) => {
  switch (action.type) {
    case "play": {
      if (action.inPlay) {
        return {
          ...state,
          inPlay: false,
          isPlay: true,
        };
      }

      return { ...state, isPlay: true };
    }

    case "pause": {
      if (action.inPlay) {
        return {
          ...state,
          inPlay: true,
          isPlay: false,
        };
      }

      return { ...state, isPlay: false };
    }

    case "SetPermission":
      return { ...state, CanPlay: true };

    case "SetTime": {
      if (!action.timeupdate) {
        audio.current.currentTime = action.time;
      }
      return { ...state, time: action.time };
    }

    case "forward": {
      const time = state.time + 5;
      audio.current.currentTime = time;
      return { ...state, time };
    }

    case "backward": {
      const time = state.time - 5;
      audio.current.currentTime = time;
      return { ...state, time };
    }

    case "volume": {
      if (action.mute) {
        return { ...state, volume: state.volume == 0 ? 3 : 0 };
      }

      if (action.up) {
        switch (state.volume) {
          case 0:
            return { ...state, volume: 1 };

          case 1:
            return { ...state, volume: 2 };

          case 2:
            return { ...state, volume: 3 };

          default:
            return state;
        }
      }

      if (action.down) {
        switch (state.volume) {
          case 1:
            return { ...state, volume: 0 };

          case 2:
            return { ...state, volume: 1 };

          case 3:
            return { ...state, volume: 2 };

          default:
            return state;
        }
      }

      if (action.loop) {
        switch (state.volume) {
          case 0:
            return { ...state, volume: 1 };

          case 1:
            return { ...state, volume: 2 };

          case 2:
            return { ...state, volume: 3 };

          case 3:
            return { ...state, volume: 0 };

          default:
            return state;
        }
      }
    }

    default:
      throw Error("Unknown action.");
  }
};
