import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { fetchGetAll } from './action';

const Component = (props) => {
  const [menu, setMenu] = useState([])
  ChartJS.register(ArcElement, Tooltip, Legend);


  const _getAll = async () => {
    try {
      const response = await fetchGetAll();
      setMenu(response.data);
    } catch (error) {
      setMenu([]);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "center",
        labels: {
          color: "#000",
          font: {
            size: 12,
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };


  const data = {
    // menampilkan nama menu yang paling banyak dipesan dan paling sedikit dipesan
    labels: [
      `Most Ordered (${menu[0]?.menu?.menu_name})`,
      `Least Ordered (${
        menu[menu.length - 1]?.menu?.menu_name
      })`,
    ],
    // menampilkan jumlah menu yang paling banyak dipesan dan paling sedikit dipesan
    datasets: [
      {
        data: [
          `
        ${menu[0]?.jumlah || 0}
        `,
          `
        ${menu[menu.length - 1]?.jumlah || 0}
        `,
        ],
        backgroundColor: ["#AEE2FF", "#3178F6"],
        hoverOffset: 4,
      },
    ],
  }


  useEffect(() => {
    _getAll()
  }, [])
  return (
    <>
      <Pie data={data} options={options} />
    </>
  );
};

export default Component;
