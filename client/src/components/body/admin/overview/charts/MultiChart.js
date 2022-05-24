// src/components/line.rechart.js

import React from "react";
import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class LineRechartComponent extends React.Component {

  data = [
    {
      "name": "Jan 2019",
      "Product A": 0,
      "Procuct B": 2342,
      "Procuct C": 1542,
      "Procuct D": 3021
    },
    {
      "name": "Feb 2019",
      "Product A": 2342,
      "Procuct B": 3246,
      "Procuct C": 1003,
      "Procuct D": 6021
    },
    {
      "name": "Mar 2019",
      "Product A": 4565,
      "Procuct B": 4556,
      "Procuct C": 2003,
      "Procuct D": 4021
    },
    {
      "name": "Apr 2019",
      "Product A": 6654,
      "Procuct B": 4465,
      "Procuct C": 3003,
      "Procuct D": 5021
    },
    {
      "name": "May 2019",
      "Product A": 8765,
      "Procuct B": 4553,
      "Procuct C": 4003,
      "Procuct D": 7021
    }
  ]

  render() {
    return (
      <LineChart width={900} height={250} data={this.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Product A" stroke="#0095FF" />
        <Line type="monotone" dataKey="Procuct B" stroke="#FF0110" />
        <Line type="monotone" dataKey="Procuct C" stroke="#FFFF00" />
        <Line type="monotone" dataKey="Procuct D" stroke="#FF00FF" />
      </LineChart>
    )
  };
}

export default LineRechartComponent;