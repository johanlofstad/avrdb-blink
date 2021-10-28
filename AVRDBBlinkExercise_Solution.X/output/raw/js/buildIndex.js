/*
 * @author: I15784
 */
/* 
 * global variables
 */
var clients = [];
var summary = [];
var unityReport;
var tests;
var passed;
var failed;
var exceptions;
var errors;
var warnings;
var time;
var percentage;
var allColumns = [];
var allRows = [];
var allModules = [];
var allDevices = [];
/* 
 *Function will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute. 
 */
$(document).ready(function () {
	getSummary(clients);
	updateSummaryUI();
	updateDetailUI();
});

function getResultData(data) {
	clients = data.result;
}

function getSummary(data) {
	clients = data;

	data = {
		Name: 'Summary Totals',
		Projects: 0,
		Score: 0,
		Passed: 0,
		Failed: 0,
		Time: 0,
	};
	data.Projects = clients.length;

	for (each of clients) {
		if (each.Result.match("Pass")) {
			data.Passed += 1;
		}
		else {
			data.Failed += 1;
		}
		data.Time += parseFloat(each.Duration);
	}
	data.Time = parseFloat(data.Time).toFixed(2);
	data.Time = `${data.Time} s`;
	data.Score = ((data.Passed) * 100) / (data.Projects);
	data.Score = parseFloat(data.Score).toFixed(2);
	data.Score = `${data.Score} %`;
	summary.push(data);
}

function updateSummaryUI() {
	$("#jsGrid0").jsGrid({
		width: "100%",
		filtering: false,
		inserting: false,
		editing: false,
		sorting: false,
		paging: false,
		data: summary,
		fields: [
			{ name: "Name", type: "text", align: "center", width: 25 },
			{ name: "Score", type: "text", align: "center", width: 25 },
			{ name: "Projects", type: "text", align: "center", width: 25 },
			{ name: "Passed", type: "text", align: "center", width: 25 },
			{ name: "Failed", type: "text", align: "center", width: 25 },
			{ name: "Time", type: "text", align: "center", width: 25 }
		]
	});
}

function updateDetailUI() {
	$("#jsGrid").jsGrid({
		width: "100%",
		height: "600px",
		filtering: false,
		inserting: false,
		editing: false,
		sorting: true,
		paging: false,
		data: clients,
		fields: [
			{
				name: "Project", type: "text", width: 100, itemTemplate: function (value) {
					return $("<div>").css({ 'word-wrap': 'break-word' }).append(value);
				}
			},
			{
				name: "Configuration", type: "text", width: 100, itemTemplate: function (value) {
					return $("<div>").css({ 'word-wrap': 'break-word' }).append(value);
				}
			},
			{ name: "Tool Name", type: "text", width: 50 },
			{ name: "Tool Version", type: "text", width: 50 },
			{
				name: "DFP Name", type: "text", width: 50, itemTemplate: function (value) {
					return $("<div>").css({ 'word-wrap': 'break-word' }).append(value);
				}
			},
			{
				name: "DFP Version", type: "text", width: 50, itemTemplate: function (value) {
					return $("<div>").css({ 'word-wrap': 'break-word' }).append(value);
				}
			},
			{
				name: "Result", type: "text", width: 40, align: 'center', itemTemplate: function (value) {
					if (value == 'Fail')
						return $("<div>").css({ background: 'red', color: 'white' }).append(value);
					if (value == 'Pass')
						return $("<div>").css({ background: 'green', color: 'white' }).append(value);
				}
			},
			{
				name: "Make Generation Time", type: "text", align: 'center', width: 50, itemTemplate: function (value) {
					value = `${value} s`;
					return $("<div>").append(value);
				}
			},
			{
				name: "Build Time", type: "text", align: 'center', width: 40, itemTemplate: function (value) {
					value = `${value} s`;
					return $("<div>").append(value);
				}
			},
			{
				name: "Duration", type: "text", align: 'center', width: 40, itemTemplate: function (value) {
					value = `${value} s`;
					return $("<div>").append(value);
				}
			},
			{
				name: "Time stamp", type: "text", align: 'center', width: 50, itemTemplate: function (value) {
					return $("<div>").css({ 'word-wrap': 'break-word' }).append(value);
				}
			},
			{
				name: "Link", type: "text", align: 'center', itemTemplate: function (value) {
					return $("<a>").attr("href", value).text('Open');
				}, width: 30
			},
		]
	});

}

/* 
 * Function:- Searching  entered string in result table.
 */

function myFunction() {
	$("#myInput").keyup(function () {
		var value = this.value;

		$("#jsGrid").find("tr").each(function (index) {
			if (index < 3)
				return;
			var found = false;
			$row = $(this);
			$row.find("td").each(function () {
				var cell = $(this).text();
				if (cell.indexOf(value) >= 0) {
					found = true;
					return;
				}
			});
			if (found === true) {
				$row.show();
			}
			else {
				$row.hide();
			}
		});
	});
}