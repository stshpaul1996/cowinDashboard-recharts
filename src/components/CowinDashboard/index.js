// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByCoverage from '../VaccinationCoverage'
import './index.css'

const componentValue = {
  initial: 'INITIAL',
  progress: 'PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const apiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

class CowinDashboard extends Component {
  state = {
    fetchedData: {},
    displayStatus: componentValue.initial,
  }

  componentDidMount() {
    this.fetchedDataApi()
  }

  fetchedDataApi = async () => {
    this.setState({displayStatus: componentValue.progress})
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }
      this.setState({
        fetchedData: updatedData,
        displayStatus: componentValue.success,
      })
    } else {
      this.setState({displayStatus: componentValue.failure})
    }
  }

  renderPyCharts = () => {
    const {fetchedData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = fetchedData

    return (
      <>
        <VaccinationByCoverage vaccinationData={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGenderData={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-view-text">Something went wrong</h1>
    </div>
  )

  switchCaseCheck = () => {
    const {displayStatus} = this.state

    switch (displayStatus) {
      case componentValue.success:
        return this.renderPyCharts()
      case componentValue.progress:
        return this.renderLoader()
      case componentValue.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="page-container">
        <div className="page-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <p className="logo-text">Co-WIN</p>
        </div>
        <h1 className="page-heading">CoWIN Vaccination in India</h1>
        <div className="chats-container">{this.switchCaseCheck()}</div>
      </div>
    )
  }
}

export default CowinDashboard
