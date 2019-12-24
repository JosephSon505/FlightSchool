import React from 'react'
import { Table } from 'reactstrap'
import '../css/Home.css'

class RPE extends React.Component {

    constructor(props) {
        super(props);

        this.createChart = this.createChart.bind(this);
    }

    render() {
        return this.chart()
    }

    chart() {
        // create array of 9 for y axis
        let yAxis = new Array(9);

        // create array of 13 for each index of y axis
        for(let i = 0; i < yAxis.length; i++) {
            yAxis[i] = new Array(13);
        }

        // @ sign for [0][0]
        yAxis[0][0] = "@"

        // populate rpe
        let rpe = 10.0;
        for(let i = 1; i < yAxis.length; i++) {
            yAxis[i][0] = rpe;
            rpe = rpe -.5
        }

        // populate rep count
        let reps = 1;
        for(let i = 1; i < yAxis[0].length; i++) {
            yAxis[0][i] = reps;
            reps = reps + 1;
        }

        // populate first row
        yAxis[1][1] = 100;
        yAxis[1][2] = 95.5;
        yAxis[1][3] = 92.2;
        yAxis[1][4] = 89.2;
        yAxis[1][5] = 86.3;
        yAxis[1][6] = 83.7;
        yAxis[1][7] = 81.1;
        yAxis[1][8] = 78.6;
        yAxis[1][9] = 76.2;
        yAxis[1][10] = 73.9;
        yAxis[1][11] = 70.7;
        yAxis[1][12] = 68;

        // populate last column
        yAxis[2][12] = 66.7;
        yAxis[3][12] = 65.3;
        yAxis[4][12] = 64;
        yAxis[5][12] = 62.6;
        yAxis[6][12] = 61.3;
        yAxis[7][12] = 59.9;
        yAxis[8][12] = 58.6;

        // populate rest of 2D array
        for(let i = 2; i < yAxis.length; i++) {
            for(let j = 1; j < 12; j++) {

                let above = parseFloat(yAxis[i-1][j]);
                let aboveRight = parseFloat(yAxis[i-1][j+1]);

                let value = ((above - aboveRight) / 2.0) + aboveRight

                yAxis[i][j] = value.toFixed(2);
            }
        }

        return this.createChart(yAxis);
    }

    createChart(yAxis) {
        return <div className="container mt-4 text-color-black">
            <div className="text-center">
                <h1>RPE Chart</h1>
            </div>

            <Table>
                <tbody>
                        {this.returnBody(yAxis)}
                </tbody>
            </Table>

            <div className="mt-3 text-center">
                <h2 className="text-center">
                    Table Guide
                </h2>

                The top row displays the number of reps <br />
                The First column displays the RPE <br />
                Each number represents the percentage of your total
            </div>

            <div className="empty-div-100px"></div>
        </div>
    }

    returnBody(yAxis) {
        return yAxis.map((row) => {

            const array = row;

            return(
                <tr key = {row}>
                    <td>{array[0]}</td>
                    <td>{array[1]}</td>
                    <td>{array[2]}</td>
                    <td>{array[3]}</td>
                    <td>{array[4]}</td>
                    <td>{array[5]}</td>
                    <td>{array[6]}</td>
                    <td>{array[7]}</td>
                    <td>{array[8]}</td>
                    <td>{array[9]}</td>
                    <td>{array[10]}</td>
                    <td>{array[11]}</td>
                    <td>{array[12]}</td>
                </tr>
            )

        });
    }
}

export default RPE