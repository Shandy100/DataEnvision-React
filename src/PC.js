import { useState, useEffect } from "react";
import moment from "moment";
import { Doughnut, Pie } from "react-chartjs-2";

const Chart = ({ chartdata }) => {
	const labels = ["PM 1 Particle", "PM 2.5 Particle", "PM 10 Particle"],
		data_p1 = [];

	var sum_p1 = 0.0,
		sum_p2 = 0.0,
		sum_p10 = 0.0;

	function refactorData() {
		for (var i = 0; i < chartdata.length; i++) {
			sum_p1 = sum_p1 + parseFloat(chartdata[i][5]);
			sum_p2 = sum_p2 + parseFloat(chartdata[i][6]);
			sum_p10 = sum_p10 + parseFloat(chartdata[i][7]);
	
		}
		data_p1.push(sum_p1);
		data_p1.push(sum_p2);
		data_p1.push(sum_p10);
	}
	refactorData();

	

	return (
		<div>
			<Doughnut
				data={{
					labels: labels,
					datasets: [
						{
							label: "P1",
							data: data_p1,
							backgroundColor: [
								"#CEEAE6",
								"#291B4F",
								"#FCD42B",
							],
							fill: false,
							hoverOffset: 4,
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

export default Chart;
