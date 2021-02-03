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
  const [colorLabel, setColorLabel] = useState([]);
  const { users } = useSelector((state) => state.users);
  const [usersToShow, setUsersToShow] = useState([userId]);
  // const [totalDataset, setTotalDataset] = useState({});
  const [usersDataset, setUsersDataset] = useState([]);
  const machineDate = useSelector((state) => state.currentDate.currentDate);

  useEffect(() => {
    dispatch(fetchCommitmentsAsync());
    dispatch(getUsersAsync());
  }, [dispatch]);

  useEffect(() => {
    (function setChartDates() {
      const dateArray = [];
      let currentDate = dayjs(challenge.startDate);
      const stopDate = dayjs(challenge.endDate);
      while (currentDate <= stopDate) {
        dateArray.push(dayjs(currentDate).format('YYYY-MM-DD'));
        currentDate = dayjs(currentDate).add(1, 'd');
      }
      const colors = users.map(() => '#'.concat(Math.floor(Math.random() * 16777215).toString(16)));
      setColorLabel(colors);
      setDatesLabel(dateArray);
    }());
  }, []);
  console.log(colorLabel);

  function calculateUserData(selectedUserId) {
    const completedPerDay = datesLabel.map((date) => {
      const dailyComms = commitments
        .filter((comm) => comm.userId === selectedUserId)
        .filter((comm) => comm.endDate <= date);
      const percent = (dailyComms.filter((comm) => comm.isDone === true).length
            / dailyComms.length)
          * 100;
      return percent;
    });
    const userColor = colorLabel.filter((color) => color[0] === selectedUserId);
    const dataset = {
      label: users.filter((user) => user.id === selectedUserId)[0].username,
      data: completedPerDay,
      borderColor: userColor,
      fill: false,
      hidden: !usersToShow.includes(selectedUserId),
    };
    return dataset;
  }

  function calculateTotal() {
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
    return totalData;
  }

  useEffect(() => {
    function createChartDataset() {
      const calculatedData = users.map((user) => calculateUserData(user.id));
      const totalData = calculateTotal();
      calculatedData.push(totalData);
      setUsersDataset(calculatedData);
    }
    createChartDataset();
  }, [datesLabel]);

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

  const handelUserSelection = (event) => {
    const { id } = users.filter((user) => user.username === event.target.value)[0];
    if (usersToShow.includes(id)) {
      setUsersToShow(usersToShow.filter((userid) => userid !== id));
    } else {
      setUsersToShow([...usersToShow, id]);
    }
  };

  const userSelectButtons = users.map((user) => (
    <div className="user" key={user.username}>
      <input
        type="checkbox"
        id={user.username}
        name="user"
        value={user.username}
        onChange={handelUserSelection}
        defaultChecked={user.id === userId}
      />
      <label htmlFor={user.username}>{user.username}</label>
    </div>
  ));

  return (
    <section className="charts-main-container">
      <div className="form-wrapper">
        <form className="user-select-form">{userSelectButtons}</form>
      </div>
      <div className="charts-wrapper">
        <div className="charts-container">
          <Line
            data={{
              labels: datesLabel,
              datasets: usersDataset,
            }}
            options={{
              responsive: true,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      suggestedMin: 0,
                      suggestedMax: 100,
                    },
                  },
                ],
              },
            }}
          />
          <h2 className="pie-chart-header">Your results</h2>
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
            options={{ responsive: true }}
          />
        </div>
      </div>
    </section>
  );
}

export default Charts;
