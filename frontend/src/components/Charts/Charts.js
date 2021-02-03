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
  const [usersToShow, setUsersToShow] = useState([userId]);
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
      setDatesLabel(dateArray);
    }());
    (function calculateTotalData() {
      const totalCompletedPerDay = datesLabel.map((date) => {
        const dailyComms = commitments
          .filter((comm) => comm.endDate <= date);
        const percent = (dailyComms.filter((comm) => comm.isDone === true).length
            / dailyComms.length)
          * 100;
        return percent;
      });
      setUsersDataset(totalCompletedPerDay);
    }());
  }, []);

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
    const dataset = {
      label: selectedUserId,
      data: completedPerDay,
      borderColor: '#86c232',
      fill: false,
    };
    console.log(users.filter((user) => user.id === selectedUserId)[0].username);
    console.log(usersDataset);
    return dataset;
  }

  function createChartDataset() {
    const calculatedData = usersToShow.map((user) => calculateUserData(user));
    setUsersDataset(calculatedData);
  }

  const handelUserSelection = (event) => {
    const { id } = users.filter((user) => user.username === event.target.value)[0];
    if (usersToShow.includes(id)) {
      setUsersToShow(usersToShow.filter((userid) => userid !== id));
    } else {
      setUsersToShow([...usersToShow, id]);
    }
    createChartDataset();
  };
  console.log(usersToShow);

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
