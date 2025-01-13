import { Box } from '@mui/material';
import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RootTypes } from '../../types/Types';

const yearData = {}
const LinearChart = (finalData: {finalData: RootTypes[]}) => {
    const [graphDataList, setGraphDataList] = React.useState<{name: string, count: number | unknown}[]>([])
    const yearCalculation = () => {
        let graphData: {name: string, count: number | unknown}[] = []
        finalData.finalData.forEach((year: RootTypes) => {
            yearData[year.modelYear] = (yearData[year.modelYear] || 0) + 1;
        })
        Object.entries(yearData).forEach((arr) => {
            if (arr[0] !== 'undefined'){
                const object = {
                    name: arr[0],
                    count: arr[1]
                }
                graphData = [...graphData, object]
            }
        })
        setGraphDataList(graphData)
    }

    React.useEffect(() => {
            finalData.finalData && yearCalculation()
    }, [])
    return (
        <Box sx={{width: '100%', height:'300px'}}>
            <ResponsiveContainer>
                <LineChart
                    width={500}
                    height={300}
                    data={graphDataList}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    )
}

export default LinearChart