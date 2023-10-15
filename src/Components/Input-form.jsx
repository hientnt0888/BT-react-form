import React, { Component } from 'react'
import { flushSync } from "react-dom"
import { connect } from 'react-redux'
import { submitCreator, updateCreator } from '../redux/redux-form/creator'

class InputForm extends Component {
    state = {
        currentState: {
            maSV: "",
            hoTen: "",
            sdt: "",
            email: "",
        },
        error: {
            maSV: "",
            hoTen: "",
            sdt: "",
            email: "",
        },
        touch: {
            maSV: false,
            hoTen: false,
            sdt: false,
            email: false,
        }

    }
    handleValidate = () => {
        const newError = { ...this.state.error };
        const { currentState } = this.state
        for (let prop in currentState) {
            switch (prop) {
                case "maSV": {
                    newError[prop] = "";
                    const regex_number = /^\d{3}$/;
                    if (!regex_number.test(currentState[prop])) {
                        newError[prop] = "Mã sinh viên phải là số có 3 chữ số"
                    }
                    const checkMaSV = this.props.DSSV.find((i) => {
                        return +i.maSV === +this.state.currentState.maSV
                    })
                    if (checkMaSV && this.props.svEdit === null) {
                        newError[prop] = "Mã sinh viên không được trùng"
                    }
                    if (currentState[prop].length === 0) {
                        newError[prop] = 'Mã sinh viên không được để trống';
                    }
                }
                    break;
                case "hoTen": {
                    newError[prop] = "";
                    const regex_name = /^[A-Za-zÀ-ỹ\s]+$/;
                    if (!regex_name.test(currentState[prop])) {
                        newError[prop] = "Phải là chữ"
                    }
                    if (currentState[prop].length === 0) {
                        newError[prop] = 'Tên sinh viên không được để trống';
                    }
                }
                    break;
                case "sdt": {
                    newError[prop] = "";

                    const regex_sdt = /^(0[1-9])(\d{8})$/;
                    if (!regex_sdt.test(currentState[prop])) {
                        newError[prop] = "Dãy số bắt đầu bằng số 0 và có độ dài 10 số"
                    }
                    const regex_number = /^\d+$/;
                    if (!regex_number.test(currentState[prop])) {
                        newError[prop] = "Phải là số"
                    }
                    if (currentState[prop].length === 0) {
                        newError[prop] = 'Nhập số điện thoại';
                    }
                }
                    break;
                case "email": {
                    newError[prop] = '';
                    const regex_email = /^[\w\.-]+@[\w\.-]+\.\w+$/;
                    if (!regex_email.test(currentState[prop])) {
                        newError[prop] = "Email không hợp lệ"
                    }
                    if (currentState[prop].length === 0) {
                        newError[prop] = 'Nhập email';
                    }
                }
                    break;
                default:
                    newError[prop] = "";
                    break;
            }
        }
        this.setState({
            error: newError,
        })
        return newError;
    }

    handleOnChange = async (event) => {
        const { target } = event;
        const { value, name } = target
        await this.setState({
            currentState: {
                ...this.state.currentState,
                [name]: value,
            }
        })
        this.handleValidate()
    }

    handleBlur = (event) => {
        const { name } = event.target
        flushSync(() => {
            this.setState({
                touch: {
                    ...this.state.touch,
                    [name]: true,
                }
            })
        })
        this.handleValidate()
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const newError = this.handleValidate()
        const checkError = Object.values(newError).every((index) => index.length === 0)
        if (checkError) {
            const action = this.props.svEdit ? updateCreator(this.state.currentState) : submitCreator(this.state.currentState)
            this.props.dispatch(action)
            this.setState({
                currentState: {
                    maSV: "",
                    hoTen: "",
                    sdt: "",
                    email: "",
                },
                touch: {
                    maSV: false,
                    hoTen: false,
                    sdt: false,
                    email: false,
                }
            })
            alert("thanh cong")

        }

        this.setState({
            touch: {
                maSV: true,
                hoTen: true,
                sdt: true,
                email: true,
            }

        })
    }
    static getDerivedStateFromProps(newProps, currentState) {
        console.log({
            newProps,
            currentState,
            // preProps: this.props,

        })
        if (newProps.svEdit !== null) {
            if (newProps.svEdit.maSV !== currentState.currentState.maSV) {
                return {
                    currentState: newProps.svEdit,
                }
            }

        }
        return null;
    }

    render() {
        console.log(this.state.currentState, "state")
        console.log(this.props.svEdit)
        return (
            <div>
                <h2 style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "10px 10px",
                    borderRadius: "5px"
                }}
                >Thông tin sinh viên</h2>
                <form
                    onSubmit={this.handleSubmit}
                >
                    <div className="row">
                        <div className="form-group col-6">
                            <label htmlFor="maSV">Mã SV</label>
                            <input
                                name="maSV"
                                disabled = {this.props.svEdit}
                                type="text"
                                className="form-control"
                                id="maSV"
                                value={this.state.currentState.maSV}
                                onChange={this.handleOnChange}
                                onBlur={this.handleBlur}



                            />
                            {this.state.touch.maSV && this.state.error.maSV && (
                                <p className='bg-warning' style={{
                                    padding: "5px 10px",
                                    borderRadius: 5,
                                    color: "red"
                                }}>{this.state.error.maSV}</p>
                            )}
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="tenSV">Họ tên</label>
                            <input
                                name="hoTen"
                                type="text"
                                value={this.state.currentState.hoTen}
                                className="form-control"
                                id="tenSV"
                                onChange={this.handleOnChange}
                                onBlur={this.handleBlur}
                            />
                            {this.state.touch.hoTen && this.state.error.hoTen && (
                                <p className='bg-warning' style={{
                                    padding: "5px 10px",
                                    borderRadius: 5,
                                    color: "red"
                                }}>{this.state.error.hoTen}</p>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-6">
                            <label htmlFor="sdtSv">Số điện thoại</label>
                            <input
                                name='sdt'
                                value={this.state.currentState.sdt}
                                type="text"
                                className="form-control"
                                id="sdtSv"
                                onChange={this.handleOnChange}
                                onBlur={this.handleBlur} />
                            {this.state.touch.sdt && this.state.error.sdt && (
                                <p className='bg-warning' style={{
                                    padding: "5px 10px",
                                    borderRadius: 5,
                                    color: "red"
                                }}>{this.state.error.sdt}</p>
                            )}
                        </div>
                        <div className="form-group col-6">
                            <label htmlFor="emailSV">Email</label>
                            <input
                                name='email'
                                value={this.state.currentState.email}
                                type="email"
                                className="form-control"
                                id="emailSV"
                                onChange={this.handleOnChange}
                                onBlur={this.handleBlur} />
                            {this.state.touch.email && this.state.error.email && (
                                <p className='bg-warning' style={{
                                    padding: "5px 10px",
                                    borderRadius: 5,
                                    color: "red"
                                }}>{this.state.error.email}</p>
                            )}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >{this.props.svEdit ? "Cập nhật" : "Thêm sinh siên"}</button>
                </form>

            </div>
        )
    }
}
const mapStateToProps = (rootReducer) => {
    return {
        DSSV: rootReducer.formReducer.DSSV,
        svEdit: rootReducer.formReducer.svEdit,
    }
}

export default connect(mapStateToProps)(InputForm)