import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
                <div className="card overflow-hidden">
                    <div className="bg-soft-primary">
                        <div className="row">
                            <div className="col-7">
                                <div className="text-primary p-4">
                                    <h5 className="text-primary">Free Register</h5>
                                    <p>Get your free Skote account now.</p>
                                </div>
                            </div>
                            <div className="col-5 align-self-end">
                                <img src="/assets/images/profile-img.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                    <div className="card-body pt-0">
                        <div>
                            <a href="index.html">
                                <div className="avatar-md profile-user-wid mb-4">
                                    <span className="avatar-title  bg-light">
                                        <img src="/assets/images/logo.svg" alt="" className="" height="34" />
                                    </span>
                                </div>
                            </a>
                        </div>
                        <div className="p-2">
                            <form className="form-horizontal" action="https://themesbrand.com/skote/layouts/vertical/index.html">

                                <div className="form-group">
                                    <label htmlFor="useremail">Email</label>
                                    <input type="email" className="form-control" id="useremail" placeholder="Enter email" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input type="text" className="form-control" id="username" placeholder="Enter username" />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="userpassword">Password</label>
                                    <input type="password" className="form-control" id="userpassword" placeholder="Enter password" />
                                </div>

                                <div className="mt-4">
                                    <button className="btn btn-primary btn-block waves-effect waves-light" type="submit">Register</button>
                                </div>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">By registering you agree to the Skote <a href="#" className="text-primary">Terms of Use</a></p>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
                <div className="mt-5 text-center">
                    <p>Already have an account ? <Link to="/auth/" className="font-weight-medium text-primary"> Login</Link> </p>
                    <p>© 2020 Skote. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand</p>
                </div>

            </div>
        </div>
    )
}

export default Register
