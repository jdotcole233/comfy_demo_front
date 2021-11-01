import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext, setToken } from '../../context/AuthContext';
import { useMutation } from "@apollo/client"
import { useLocation, useHistory } from 'react-router-dom'
import { LOGIN } from '../../graphql/mutattions/auth';

const Login = () => {
    const history = useHistory();
    const { authenticate } = useContext(AuthContext);
    const { register, handleSubmit, errors } = useForm();
    const [loginError, setLoginError] = useState(false)

    const { state } = useLocation()

    const [login, { loading }] = useMutation(LOGIN);

    const handleLogin = async values => {
        setLoginError(false)
        login({ variables: { ...values } })
            .then(res => {
                console.log(res.data.login)
                if (res.data?.login?.user?.first_time_signin) {
                    setToken(res.data?.login?.access_token, 0.5)
                    history.push({
                        pathname: "/auth/create-password",
                        state: { data: res.data?.login }
                    })
                } else {
                    authenticate(res.data.login, state?.pathname)
                }
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
                                    <h5 className="text-primary">Welcome Back !</h5>
                                    <p>Sign in to continue to KEK Re-Dashboard.</p>
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
                                            src={require("../../assets/visal-sm-logo.png")}
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
                            {state?.changed_password && <div className="container alert alert-success font-size-14 text-center" >
                                Password Changed SuccessFully. Login to access the KEK-Re Dashboard
                        </div>}
                            <form
                                onSubmit={handleSubmit(handleLogin)}
                            >
                                {loginError ? <div className="alert alert-danger">
                                    <strong>Incorrect username or password</strong>
                                </div> : null}
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="email"
                                        name="username"
                                        ref={register({ required: "Email required" })}
                                        className="form-control"
                                        id="username"
                                        placeholder="Enter username"
                                    />
                                    {errors.username && <p className="text-danger">{errors.username.message}</p>}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="userpassword">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        ref={register({ required: "Password required" })}
                                        id="userpassword"
                                        placeholder="Enter password"
                                    />
                                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
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
                                            Log In
                                        </button>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <img src={require('../../assets/ssl-banner.png')} alt="" />
                </div>
            </div>
        </div>

    )
}

export default Login
