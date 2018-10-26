class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: 0,
      lightMode: 1 //1:ui is in light mode (snow), 0:ui is dark mode (rain)

    };
    this.docBody = document.querySelector("body");
  }

  modeSwitch(mode) {
    if (this.state.lightMode == mode) {
      return;
    }

    _stormsystem.toggleRespawn(0);

    _stormsystem.toggleRespawn(1);

    _stormsystem.toggleRespawn(2);

    this.docBody.classList.toggle("light");
    this.setState({
      lightMode: mode
    });
  }

  render() {
    var playPauseImg;

    if (this.state.paused) {
      playPauseImg = "img/play";
    } else {
      playPauseImg = "img/pause";
    }

    var switchText;
    var switchClass = "";

    if (this.state.lightMode) {
      switchText = "img/switchtext.png";
    } else {
      switchText = "img/switchtext-dark.png";
      switchClass = "dark";
      playPauseImg += "-dark";
    }

    playPauseImg += ".png";
    return React.createElement(React.Fragment, null, React.createElement("img", {
      className: "playpause",
      src: playPauseImg,
      onClick: () => {
        _stormsystem.playPause();

        this.setState({
          paused: this.state.paused ? 0 : 1
        });
      }
    }), React.createElement("img", {
      src: switchText
    }), React.createElement("div", {
      className: `switch ${switchClass}`
    }, React.createElement("img", {
      className: "snow",
      src: "img/snow.png",
      onClick: () => {
        this.modeSwitch(1);
      }
    }), React.createElement("img", {
      className: "rain",
      src: "img/rain.png",
      onClick: () => {
        this.modeSwitch(0);
      }
    })));
  }

}