import "./App.css";
import "./user.css";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import "bootstrap/dist/css/bootstrap.min.css";
import Timer from "react-compound-timer";
import React from "react";

function App() {
  const isKeyboardOpen = useDetectKeyboardOpen();
  let w = 1;
  let rKey = "S";
  let MAX = 26;
  let penalty = 0;
  let highScore = 1000000000;
  let starting = true;

  // The state for our timer

  function printRandomString(n) {
    let alphabet = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ];

    let res = "";
    for (let i = 0; i < n; i++) {
      res = res + alphabet[Math.floor(Math.random() * 10) % MAX];
    }

    return res;
  }

  // to reset the agame and start again 
  const onClickReset = () => {
    starting = true;
    document.getElementById("reset").click();
    document.getElementById("gameStartInput").value = "";
    w = 0;
    penalty = 0;
    document.getElementById("rndmLtr").innerHTML = rKey;
  };

  // start the function and read the keys 
  const onClick = (e) => {
    var keynum = e.nativeEvent.data.toUpperCase().toString();
    console.log(keynum);

    w = w + 1;

    if (w >= 20) {
      starting = false;
      document.getElementById("stop").click();
      let sec = document.getElementById("secs").innerHTML;
      let ms = document.getElementById("ms").innerHTML;
      let score = parseInt(sec) * 1000 + parseInt(ms);
      if (penalty > 1) {
        score = score + penalty * 500;
        console.log(score, "score");
      }
      if (score < highScore) {
        highScore = score;
        console.log("penalty", penalty);
        console.log("highScore", highScore);

        document.getElementById("rndmLtr").innerHTML = "SUCCESS";
        document.getElementById("myBestTime").innerHTML =
          "My Best Time : " + Math.floor(score / 1000) + ":" + (score % 1000);
      } else {
        document.getElementById("rndmLtr").innerHTML = "FAIL";
      }
    } else {
      if (keynum.localeCompare(rKey.toString())) {
        penalty = penalty + 1;
        console.log("penalty", penalty);
      }
      //  document.getElementById('pp').innerHTML=w;
      rKey = printRandomString(1).toString().toUpperCase();
      document.getElementById("rndmLtr").innerHTML = rKey.toString();
    }
  };

  return (
    <div className="App mobile">
      <header className="App-header">
        <h1 className="head1">Type the Letter</h1>
        <h2 className="lowerPara">
          Typing game to see how fast you can Type. Timer starts when you do :){" "}
        </h2>
        <span className="wordBox">
          <p id="rndmLtr" className="letter">
            {rKey}
          </p>
        </span>
        <Timer initialTime={0} startImmediately={false} timeToUpdate={10}>
          {({ start, stop, reset }) => (
            <React.Fragment>
              <div>
                <p style={{ margin: "0", display: "inline" }}>Time : </p>
                <div id="secs">
                  <Timer.Seconds />
                </div>
                <p style={{ margin: "0", display: "inline" }}>.</p>
                <div id="ms">
                  <Timer.Milliseconds />
                </div>
                <p style={{ margin: "0", display: "inline" }}>s</p>
              </div>
              <div>
                <button className="btnHidden" id="start" onClick={start}>
                  Start
                </button>
                <button className="btnHidden" id="stop" onClick={stop}>
                  Stop
                </button>
                <button className="btnHidden" id="reset" onClick={reset}>
                  Reset
                </button>
              </div>
            </React.Fragment>
          )}
        </Timer>
        <h3 id="myBestTime">My Best Time : 0.000</h3>

        <div>
          <h2>{`${isKeyboardOpen ? "" : ""}`}</h2>
          <input
            className="form-control"
            placeholder="StartHere"
            id="gameStartInput"
            onKeyDown={(e) => {
              console.log(e);
              if (starting) {
                onClick(e);
                document.getElementById("start").click();
              } else {
                starting = false;
                document.getElementById("stop").click();
                let sec = document.getElementById("secs").innerHTML;
                let ms = document.getElementById("ms").innerHTML;
                console.log(sec, ms);
              }
              if (w === 20) {
                starting = false;
                document.getElementById("stop").click();
                let sec = document.getElementById("secs").innerHTML;
                let ms = document.getElementById("ms").innerHTML;
                console.log(sec, ms);
              }
            }}
          />
          <button className="btn btn-outline-success" onClick={onClickReset}>
            Reset
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
