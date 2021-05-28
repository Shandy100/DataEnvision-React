import { useEffect, useState } from "react";
import DataTable from "./Table.js";
import moment from "moment";
import Chart from "./PC";
import Daychart from "./LG.js";
import { BrowserRouter as Router,  Route, Link,Switch } from "react-router-dom";
import {Button, Paper} from "@material-ui/core";
import { lightTheme, darkTheme, GlobalStyles } from "./theme.js";
import BarChart from './BC';
import styled, { ThemeProvider } from "styled-components";
const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

function App() {
	const [theme, setTheme] = useState("light");

	const themeToggler = () => {
	  theme === "light" ? setTheme("dark") : setTheme("light");};
	const [query, setQuery] = useState("");
	const [database, setDatabase] = useState([]);

	useEffect(() => {
		async function getData() {
			const response = await fetch("test_dataset_all.csv");
			const data = await response.text();

			const table = data.split("\n").slice(1);


			const col = [];
			table.forEach((record) => {
				const row = record.split(",");
				var string = row[1] + " " + row[2];
	

				let m = moment(string, "YY/MM/DD hh:mm:ss");
				var date = m.toString().split(" ");

				var month, tarik, year, time;
		
				month = date[1];
				tarik = date[2];
				year = date[3];
				time = date[4];
				row[1] = tarik + " " + month + " " + year;
				row[2] = time;

				col.push(row);
			});

			setDatabase(col);
		}
		getData();
	}, []);

	function search(records) {
		return records.filter(
			(row) => row[2].toString().toLowerCase().indexOf(query) > -1
		);
	}

	return (
		<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
		<GlobalStyles />
		<StyledApp>
				<div className="app">
					<div className="app__header" >
						<h1>DATA VISUALISATION DASHBOARD</h1>
					</div>

					<Router>
						<div className='joke'>
					
								<ul>
										<li><Link to="/chart">PieChart </Link></li>
										<li><Link to="/W">Bar-Graph</Link></li>
										<li><Link to="/Timeseries">Time-Series</Link></li>
										</ul>
							</div>
							<button className='s'  onClick={() => themeToggler()}>🌑</button>
							{/* <Button variant="contained" color="primary" checked={darkMode} onClick={()=> setDarkMode(!darkMode)}>Dark</Button> */}
						<div className="app__body">
							<div class="">
								<b>Enter the Value:</b>
								<input
									type="text"
									value={query}
									placeholder="HH MIN SS"
									onChange={(e) => {
										setQuery(e.target.value);
									}}
								/>
							</div>
							<DataTable data={search(database)} />
							<h1>Envision</h1>
							<Switch><Route path="/Timeseries">
									<Daychart chartdata={search(database)} />
								</Route>
								<Route path="/Timeseries">
									<Daychart chartdata={search(database)} />
	
								</Route>
								<Route path="/W">
							<BarChart></BarChart>
							</Route>
								<Route path="/">
									
									<Chart chartdata={search(database)} />
									
								</Route>
								
							</Switch>
							
						</div>
						
					</Router>
				</div>
				 </StyledApp>
				</ThemeProvider>
	
	
		
	);
}

export default App;
