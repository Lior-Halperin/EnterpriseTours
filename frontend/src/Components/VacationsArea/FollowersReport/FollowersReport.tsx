
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import followersService from "../../../Service/FollowersService";
import notifyService from "../../../Service/NotifyService";
import vacationsService from "../../../Service/VacationsService";
import "./FollowersReport.css";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';

function FollowersReport(): JSX.Element {

    const [xArrayIdVacations, setXArrayIdVacations] = useState<number[]>([]);
    const [yArrayNumberOfFollowers, setYArrayNumberOfFollowers] = useState<number[]>([]);

    useEffect(() => {

        const buildArrays = () => {

            const xArrayId: Array<number> = [...xArrayIdVacations];
            const yArrayFollowers: Array<number> = [...yArrayNumberOfFollowers]

            vacationsService.getAllVacations()
                .then(AllVacations => {
                    AllVacations.forEach(vacation => {
                        xArrayId.push(vacation.id)
                        setXArrayIdVacations(xArrayId)
                    });

                    xArrayId.forEach(idVacation => {
                        followersService.followNumber(idVacation)
                            .then(numberOfFollowers => {
                                yArrayFollowers.push(numberOfFollowers)
                                setYArrayNumberOfFollowers(yArrayFollowers)
                            });
                    });
                })
                .catch(err => {
                    notifyService.error(err)
                })
        }

        return buildArrays

    }, []);

    const options = {

        responsive: true,
        legend: {
            display: true,
            position: 'right',
        },
        title: {
            display: true,
            text: 'Followers report',
        }
    };

    const data = {
        chartData: {
            labels: xArrayIdVacations,
            datasets: [{
                label: "followers",
                data: yArrayNumberOfFollowers,
                backgroundColor: 'rgba(53, 162, 235, 0.5)'
            }]
        }
    };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
    );
    
    return (
        <div className="followersReport">
            <h1> Followers report</h1>

            <Bar
                data={data.chartData}
                options={options}
            />

        </div>
    );
}

export default FollowersReport;
