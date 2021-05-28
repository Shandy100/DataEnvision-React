import { useState, useEffect } from "react";
import moment from "moment";
import { Bar, Line } from "react-chartjs-2";

const Daychart = ({ chartdata }) => {
	const [database, setDatabase] = useState([]);
	const labels = [];
	const data_p1 = [],
		data_p2 = [],
		data_p3 = [];
	useEffect(() => {
		setDatabase(chartdata);
	}, []);

	function refactorData() {
		for (var i = 0; i < chartdata.length; i++) {
			labels.push(chartdata[i][2]);
			data_p1.push(chartdata[i][5]);
			data_p2.push(chartdata[i][6]);
			data_p3.push(chartdata[i][7]);
		}
	}
	refactorData();

	return (
		<div>
			<Line
				data={{
					labels: labels,
					datasets: [
						{
							label: "PM 1 Particle",
							data: data_p1,
							backgroundColor: "#8a307f",
							borderColor: "rgb(255, 99, 132)",
							borderWidth: 1,
						},
						{
							label: "PM 2.5 Particle",
							data: data_p2,
							backgroundColor: "#79a7d3",
							borderColor: "rgb(75, 192, 192)",
							borderWidth: 1,
						},
						{
							label: "PM 10 Particle",
							data: data_p3,
							backgroundColor: "#6883bc",
							borderColor: "rgb(153, 102, 255)",
							borderWidth: 1,
						},
					],
				}}
				width={600}
				height={500}
				options={{
					maintainAspectRatio: false,
					scales: {
						y: {
							beginAtZero: true,
						},
					},
				}}
			/>
		</div>
	);
};

export default Daychart;
