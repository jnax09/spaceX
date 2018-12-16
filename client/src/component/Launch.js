import React, { Component, Fragment } from "react"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import { Link } from "react-router-dom"
import classnames from "classnames"

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_date_local
      launch_success
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`

export default class Launch extends Component {
  render() {
    let { flight_number } = this.props.match.params
    flight_number = parseInt(flight_number)

    return (
      <Fragment>
        <h1> Launch </h1>
        <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
          {({ loading, data, error }) => {
            if (loading) return <h4>Loading...</h4>
            if (error) console.log(error)

            const {
              mission_name,
              flight_number,
              launch_year,
              launch_success,
              rocket: { rocket_id, rocket_name, rocket_type }
            } = data.launch

            return (
              <div>
                <h1 className="display-4 my-3">
                  Mission: <span className="text-dark">{mission_name}</span>
                </h1>
                <h4 className="mb-3">Launch Details</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    Flight Number: {flight_number}
                  </li>
                  <li className="list-group-item">
                    Launch Year: {launch_year}
                  </li>
                  <li className="list-group-item">
                    Launch Successful:{" "}
                    <span
                      className={classnames({
                        "text-success": launch_success,
                        "text-danger": !launch_success
                      })}
                    >
                      {launch_success ? "yes" : "No"}
                    </span>
                  </li>
                </ul>
                <h4 className="my-3">Rocket Details</h4>
                <ul className="list-group">
                  <li className="list-group-item">Rocket ID: {rocket_id}</li>
                  <li className="list-group-item">
                    Rocket Name: {rocket_name}
                  </li>
                  <li className="list-group-item">
                    Rocket Type: {rocket_type}
                  </li>
                </ul>
                <hr />
                <Link to="/" className="btn btn-secondary">
                  Back
                </Link>
              </div>
            )
          }}
        </Query>
      </Fragment>
    )
  }
}
