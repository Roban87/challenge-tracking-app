import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Line, Pie } from 'react-chartjs-2';
import dayjs from 'dayjs';
import { fetchCommitmentsAsync } from '../../redux/commitments/commitments.actions';
import { getUsersAsync } from '../../redux/users/users.actions';
import './Charts.css';

function Charts() {
  const dispatch = useDispatch();
  const commitments = useSelector((state) => state.commitments.commitments);
  const userId = useSelector((state) => state.user.userId);
  const challenge = useSelector((state) => state.challenge.challenge);
  const [datesLabel, setDatesLabel] = useState([]);
  const { users } = useSelector((state) => state.users);
  const [usersToShow, setUsersToShow] = useState([]);
  const [usersDataset, setUsersDataset] = useState([]);
  const machineDate = useSelector((state) => state.currentDate.currentDate);

  useEffect(() => {
    dispatch(fetchCommitmentsAsync());
    dispatch(getUsersAsync());
  }, []);

  useEffect(() => {
    (function setChartDates() {
      const dateArray = [];
      let currentDate = dayjs(challenge.startDate);
      const stopDate = dayjs(challenge.endDate);
      while (currentDate <= stopDate) {
        dateArray.push(dayjs(currentDate).format('YYYY-MM-DD'));
        currentDate = dayjs(currentDate).add(1, 'd');
      }
      setDatesLabel(dateArray);
    }());
  }, []);

  const totalCompletedPerDay = datesLabel.map((date) => {
    const dailyComms = commitments
      .filter((comm) => comm.endDate <= date);
    const percent = (dailyComms.filter((comm) => comm.isDone === true).length
          / dailyComms.length)
        * 100;
    return percent;
  });
  const totalData = {
    label: 'Total Completion',
    data: totalCompletedPerDay,
    borderColor: '#d11313',
    fill: false,
  };

  const remaining = commitments
    .filter((comm) => comm.userId === userId)
    .filter((commitment) => commitment.endDate >= dayjs(machineDate).format())
    .length;
  const missed = commitments
    .filter((comm) => comm.userId === userId)
    .filter(
      (commitment) => commitment.endDate < dayjs(machineDate).format()
        && commitment.isDone === false,
    ).length;
  const completed = commitments
    .filter((comm) => comm.userId === userId)
    .filter((commitment) => commitment.isDone === true).length;

  function calculateDatas(id) {
    const completedPerDay = datesLabel.map((date) => {
      const dailyComms = commitments
        .filter((comm) => comm.userId === id)
        .filter((comm) => comm.endDate <= date);
      const percent = (dailyComms.filter((comm) => comm.isDone === true).length
        / dailyComms.length)
        * 100;
      return percent;
    });
    const colors = users.map((user) => [user.id, '#'.concat(Math.floor(Math.random() * 16777215).toString(16))]);
    const userColor = colors.filter((color) => color[0] === id);
    const dataset = {
      label: users.filter((user) => user.id === id)[0].username,
      data: completedPerDay,
      borderColor: userColor[0][1],
      fill: false,
    };
    return dataset;
  }

  const handelUserSelection = (event) => {
    const { id } = users.filter((user) => user.username === event.target.value)[0];
    if (usersToShow.includes(id)) {
      setUsersDataset(usersDataset
        .filter((datas) => (datas.label !== event.target.value)));
      setUsersToShow(usersToShow.filter((userid) => userid !== id));
    } else {
      setUsersDataset([...usersDataset, calculateDatas(id)]);
      setUsersToShow([...usersToShow, id]);
    }
  };

  const userSelectButtons = users.filter((user) => user.id !== userId).map((user) => (
    <div className="user" key={user.username}>
      <input
        type="checkbox"
        id={user.username}
        name="user"
        value={user.username}
        onChange={handelUserSelection}
      />
      <label htmlFor={user.username}>{user.username}</label>
    </div>
  ));

  const personalButton = users.filter((user) => user.id === userId).map((user) => (
    <div className="user" key={user.username}>
      <input
        type="checkbox"
        id={user.username}
        name="user"
        value={user.username}
        onChange={handelUserSelection}
      />
      <label htmlFor={user.username}>Personal stats</label>
    </div>
  ));

  return (
    <section className="charts-main-container">
      <div className="form-wrapper">
        <form className="user-select-form">{personalButton}</form>
        <form className="user-select-form">{userSelectButtons}</form>
      </div>
      <div className="charts-wrapper">
        <div className="charts-container">
          <Line
            id="lineChart"
            data={{
              labels: datesLabel,
              datasets: [totalData, ...usersDataset],
            }}
            options={{
              legend: {
                labels: {
                  fontColor: 'white',
                },
              },
              responsive: true,
              scales: {
                yAxes: [
                  {
                    gridLines: {
                      color: 'grey',
                    },
                    ticks: {
                      fontColor: 'white',
                      suggestedMin: 0,
                      suggestedMax: 100,
                    },
                  },
                ],
                xAxes: [
                  {
                    gridLines: {
                      color: 'grey',
                    },
                    ticks: {
                      fontColor: 'white',
                    },
                  },
                ],
              },
            }}
          />
          {/* <h2 className="pie-chart-header">Your results</h2> */}
          <Pie
            data={{
              datasets: [
                {
                  label: 'Completition percentage',
                  data: [completed, remaining, missed],
                  backgroundColor: [
                    '#86c2327b',
                    'rgba(144, 144, 144, 0.2)',
                    'rgba(255, 30, 30, 0.4)',
                  ],
                },
              ],
              labels: ['Done', 'Remaining', 'Missed'],
            }}
            options={{
              legend: {
                labels: {
                  fontColor: 'white',
                },
              },
              responsive: true,
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Charts;
