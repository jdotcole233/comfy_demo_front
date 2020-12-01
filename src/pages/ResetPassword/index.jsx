import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-apollo'
import { useLocation, useHistory } from 'react-router-dom'
import { CHANGE_PASSWORD } from '../../graphql/mutattions/auth';


const ResetPassword = () => {
    const history = useHistory()
    const { register, handleSubmit, errors, watch } = useForm({ defaultValues: {} });
    const [loginError, setLoginError] = useState(false)
    const password = useRef({});
    password.current = watch("new_password", "");
    const { state } = useLocation()

    const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);

    const handleChangePassowrd = async values => {
        setLoginError(false)
        changePassword({ variables: { id: state?.data?.user.employee.employee_id, password: values.new_password } })
            .then(res => {
                history.push({ pathname: "/auth/", state: { changed_password: true } })
            }).catch(err => {
                setLoginError(true)
            })
    }
    return (
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="card overflow-hidden">
                    <div className="bg-soft-primary">
                        <div className="row">
                            <div className="col-7">
                                <div className="text-primary p-4">
                                    <h5 className="text-primary">Welcome {state?.data?.user?.employee?.employee_first_name} </h5>
                                    <p>Provide new password to keep your access secure</p>
                                </div>
                            </div>
                            <div className="col-5 align-self-end">
                                <img
                                    src="/assets/images/profile-img.png"
                                    alt=""
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-body pt-0">
                        <div>
                            <a href="index.html">
                            <div className="avatar-xl profile-user-wid mb-4">
                                    <span className="avatar-title rounded-circle bg-white">
                                        <img
                                            src={require("../../assets/visal-sm-logo.jpeg")}
                                            alt=""
                                            // className="rounded-circle"
                                            height="44"
                                            width="100"
                                        />
                                    </span>
                                </div>
                            </a>
                        </div>
                        <div className="p-2">
                            <form
                                onSubmit={handleSubmit(handleChangePassowrd)}
                            >
                                {loginError ? <div className="alert alert-danger">
                                    <strong>Incorrect username or password</strong>
                                </div> : null}
                                <div className="form-group">
                                    <label htmlFor="username">New Password</label>
                                    <input
                                        type="password"
                                        name="new_password"
                                        ref={register({ required: "New Password required" })}
                                        className="form-control"
                                        id="username"
                                        placeholder="Enter new password"
                                    />
                                    {errors.new_password && <p className="text-danger">{errors.new_password.message}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="userpassword">Confirm New Password</label>
                                    <input
                                        type="password"
                                        name="confirm_new_password"
                                        className="form-control"
                                        ref={register({
                                            validate: value =>
                                                value === password.current || "The passwords do not match"
                                        })}
                                        id="userpassword"
                                        placeholder="Confirm new password"
                                    />
                                    {errors.confirm_new_password && <p className="text-danger">{errors.confirm_new_password.message}</p>}
                                </div>
                                <div className="mt-3">

                                    {loading ?
                                        <button disabled={true} className="btn btn-primary btn-block waves-effect waves-light">
                                            <i className="bx bx-hourglass bx-spin mr-2"></i>
                                    Authenticating...
                                </button> : <button
                                            disabled={loading}
                                            className="btn btn-primary btn-block waves-effect waves-light"
                                            type="submit">
                                            Change Password
                                    </button>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ResetPassword
