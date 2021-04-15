import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import useSound from "use-sound";
import game from "../../assets/game.mp3";
import Select from "@material-ui/core/Select";
import CardModal from "../UI/CardModal/CardModal";
import MenuItem from '@material-ui/core/MenuItem';
export default function Timer() {
  let modal = null;

  const [timerData, setTimerData] = useState({
    time: "",
    seconds: 0,
    minutes: 0,
    category: "",
    time_start: 0,
    time_left: 0,
    time_end: 0,
    special: false,
    pc: 0,
    mode: "timer",
    money_minutes: 0,
    id: null,
    idUser: null,
    earn: 0,
  });

  const [play] = useSound(game);
  const [count, setCount] = useState("0:0");
  const [limit, setLimit] = useState(0);
  const [name, setName] = useState("");
  const [openModal, setModal] = useState(false);
  const [money, setMoney] = useState(33.333);
  const [activeTimer, setActiveTimer] = useState(false);
  const [timerId, setTimerId] = useState();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval = null;

    if (limit > 0) {
      setSeconds((prevState) => limit * 60);
      setTimerData((prevState) => ({
        ...prevState,
        time: limit,

        time_start: new Date().getTime(),
        earn: moneyWork(limit * 60),
        money_minutes:money,
      }));
      timerData.time_start = new Date().getTime();
      timerData.earn = moneyWork(timerData.seconds);

    }

    if (activeTimer) {
      setLimit(0);
      interval = setInterval(() => {
        setSeconds((prevState) => prevState - 1);
        if (seconds === 0) {
          completeTimerWork();
        }
      }, 500);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [activeTimer, seconds]);

  const startTimer = () => {
    if (limit > 0) {
      // setActiveTimer(true);
      setSeconds(minutesToSeconds(limit));
      /*timerData.seconds = minutesToSeconds(limit);
      timerData.time_start = new Date().getTime();
      timerData.earn = moneyWork(timerData.seconds);
      timerData.money_minutes = money;
      timerData.time = limit;*/

      let timer = setInterval(timerWork, 500);
      setTimerId(timer);
    }
  };

  const timerWork = () => {
    setSeconds((prevState) => prevState - 1);

    setCount(secondsToPretty(seconds));

    if (seconds === 0) {
      completeTimerWork();
    }
  };

  const stopTimerWork = () => {
    clearInterval(timerId);
    setActiveTimer(false);
  };

  const completeTimerWork = () => {
    setActiveTimer(false);
    play();
  };

  const minutesToSeconds = (minutes) => {
    return minutes * 60;
  };

  const secondsToPretty = (value) => {
    let minutes = Math.floor(value / 60);
    let seconds = value % 60;
    let pretty = `${minutes}:${seconds}`;
    return pretty;
  };

  const moneyWork = (seconds) => {
    return Math.round((money / 60) * seconds);
  };

  const timerActive = () => {
    setActiveTimer(!activeTimer);
  };

  const completeTimer = () => {
    console.log()
    setTimerData((prevState)=>({
      ...prevState,
      time_end:new Date().getTime(),
      time_left: secondsToPretty(seconds)
    }));


    setModal(!openModal);
  };

  if (openModal) {
    modal = (
      <CardModal
        onCloseModal={completeTimer}
        modal={openModal}
        data={timerData}
      />
    );
  }

  return (
    <div>
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <CardContent>
              <TextField
                onChange={(event) => {
                  setLimit(event.target.value);
                }}
                fullWidth
                label="Minutes"
              />

              <TextField
                fullWidth
                label="Names"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />

              <Select
              
                value={timerData.category}
                onChange={(event)=>(setTimerData(prevState=>({...prevState,category:event.target.value})))}
              >
                <MenuItem value={'In come'}>In come</MenuItem>
                <MenuItem value={'Pending'}>Pending</MenuItem>
                <MenuItem value={'Debt'}>Debt</MenuItem>
              </Select>
              <Typography variant="h3">{secondsToPretty(seconds)}</Typography>
            </CardContent>
            <CardActions>
              <Button onClick={timerActive}>
                {" "}
                {!activeTimer ? "Iniciar" : "Detener"}{" "}
              </Button>
              <Button onClick={completeTimer}>Completar</Button>
              <Button onClick={startTimer}>Cortar</Button>
            </CardActions>
          </Grid>

          <Grid item xs={2}></Grid>
        </Grid>
      </Card>
      {modal}
    </div>
  );
}
