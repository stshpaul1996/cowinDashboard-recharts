// Write your code here
// Write your code here
import {
  BarChart,
  Bar,
  Legend,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationByCoverage = props => {
  const {vaccinationData} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="age-card-container">
      <h1 className="age-card-heading">Vaccination Coverage</h1>
      <ResponsiveContainer width={1000} height={300}>
        <BarChart data={vaccinationData} margin={{top: 5}}>
          <XAxis
            dataKey="vaccine_date"
            tick={{stroke: 'grey', strokeWidth: 1}}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{stroke: 'grey', strokeWidth: 0}}
          />
          <Legend wrapperStyle={{padding: 30}} />
          <Bar dataKey="dose_1" name="Dose 1" fil1="#5a8dee" barSize="20%" />
          <Bar dataKey="dose_2" name="Dose 2" fil1="#f54394" barSize="20%" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByCoverage
