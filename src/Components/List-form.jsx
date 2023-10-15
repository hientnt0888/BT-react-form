import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editCreator } from '../redux/redux-form/creator'
import { deleteCreator } from '../redux/redux-form/creator'
class FormList extends Component {

  tableDSSV = () => {
    return this.props.stateRedux.DSSV.map((sv) => {
      let { maSV, hoTen, sdt, email } = sv
      return <tr key={maSV}
        style={{
          textAlign: "center"
        }}>
        <td>{maSV}</td>
        <td>{hoTen}</td>
        <td>{sdt}</td>
        <td>{email}</td>
        <td>
          <button
            className='btn btn-success mr-3'
            onClick={() => {
              this.props.dispatch(editCreator(sv))
            }}
          >edit</button>
          <button
            className='btn btn-warning'
            onClick={() => {
              this.props.dispatch(deleteCreator(sv))
            }}
          >Delete</button>
        </td>

      </tr>
    })
  }

  render() {
    return (
      <div className='mt-3'>
        <table className="table">
          <thead
            style={{
              background: "black",
              color: 'white',
              textAlign: 'center'
            }}
          >
            <tr key={"trTable"}>
              <th scope="col">Mã SV</th>
              <th scope="col">Họ tên</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {this.tableDSSV()}
          </tbody>
        </table>

      </div>
    )
  }
}

const mapStateToProps = (rootReducer) => {
  return {
    stateRedux: rootReducer.formReducer
  }
}
export default connect(mapStateToProps)(FormList)
