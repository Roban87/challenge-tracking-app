import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { fetchCommitmentsAsync } from '../../redux/commitments/commitments.actions';
import { getUsersAsync } from '../../redux/users/users.actions';
import './FinalCharts.css';

function FinalCharts() {
  const dispatch = useDispatch();
  const commitments = useSelector((state) => state.commitments.commitments);
  const challenge = useSelector((state) => state.challenge.challenge);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchCommitmentsAsync());
    dispatch(getUsersAsync());
  }, [dispatch]);

  const usersDoneCommitments = commitments
    .filter((comm) => comm.isDone === true)
    .map((comm) => comm.userId)
    .reduce((prev, cur) => {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

  const eligableUsers = Object.entries(usersDoneCommitments)
    .filter((res) => res[1] >= challenge.minCommit)
    .map((id) => +id[0]);

  const usersTotalCommitments = commitments
    .map((comm) => comm.userId)
    .reduce((prev, cur) => {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

  const results = Object.entries(usersDoneCommitments)
    .map((user, index) => [
      user[0],
      (user[1] / Object.entries(usersTotalCommitments)[index][1]) * 100,
    ])
    .filter((user) => eligableUsers.includes(+user[0]));

  const sortedResults = results.sort(([, a], [, b]) => b - a);
  const resultIds = sortedResults.map((res) => +res[0]);
  const resultNames = resultIds
    .map((id) => users.filter((user) => user.id === id))
    .map((user) => user.map((u) => u.username))
    .map((e) => e[0]);

  return (
    <div className="charts-main-container">
      <div className="final-chart-wrapper">
        <Bar
          data={{
            labels: resultNames,
            datasets: [
              {
                label: 'User Completition percentage',
                data: sortedResults.map((user) => user[1]),
              },
            ],
          }}
          options={{
            backgroundColor: '#86c232',
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
      </div>
    </div>
  );
}

export default FinalCharts;
