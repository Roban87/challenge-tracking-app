import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCommitmentsAsync } from '../../redux/commitments/commitments.actions';
import generalDataFetch from '../../utilities/generalFetch';
import { Bar } from 'react-chartjs-2';

function FinalCharts() {
  const dispatch = useDispatch();
  const commitments = useSelector((state) => state.commitments.commitments);
  const challenge = useSelector((state) => state.challenge.challenge);
  const [users, setUsers] = useState([]);
  

  useEffect(() => {
    dispatch(fetchCommitmentsAsync());
  }, [dispatch]);

  useEffect(() => {
    const getUsersData = async () => {
      const method = 'GET';
      const endpoint = '/users';

      try {
        const users = await generalDataFetch(endpoint, method);
        setUsers(users.jsonData);
      } catch (error) {
        console.log(error);
      }
    };
    getUsersData();
  }, []);

  const usersDoneCommitments = commitments
    .filter((comm) => comm.isDone === true)
    .map((comm) => comm.userId)
    .reduce(function (prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

  const eligableUsers = Object.entries(usersDoneCommitments)
    .filter((res) => res[1] >= challenge.minCommit)
    .map((id) => +id[0]);

  const usersTotalCommitments = commitments
    .map((comm) => comm.userId)
    .reduce(function (prev, cur) {
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
    <div className='charts-main-container'>
      <div className='final-charts-container'>
        <div className='line-chart-container'>
          <Bar
            data={{
              labels: resultNames,
              datasets: [
                {
                  label: 'User Completition percentage',
                  data: sortedResults.map((user) => user[1]),
                  backgroundColor: 'rgba(67, 170, 63, 0.5)',
                },
              ],
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
        </div>
      </div>
    </div>
  );
}

export default FinalCharts;
