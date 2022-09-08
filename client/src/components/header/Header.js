import React, { useContext } from 'react'
import './header.css'
import logo from '../../asserts/png logo for menu.png';
import { GlobalState } from '../../GlobalState';

const Header = () => {
    const gState = useContext(GlobalState)
    const [isLogged] = gState.userAPI.isLogged
    const [isAdmin] = gState.userAPI.isAdmin
    const [isDoctor] = gState.userAPI.isDoctor
    const [isPharmacist] = gState.userAPI.isPharmacist
    const [userPhoto] = gState.userAPI.userPhoto
    return (
        <div><nav className="navbar navbar-expand-lg fixed-top navbar-light bg-color">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={logo} alt="" width="155" height="50" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    </ul>
                    <div className="d-flex">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/">Questions</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link linkColor" href="#">Drugs</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link linkColor" href="/doctors">Doctors</a>
                            </li>
                            {isLogged ?
                                <>


                                </> :
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link linkColor" href="/signin">Sign in</a>
                                    </li>

                                </>
                            }
                            {
                                isAdmin && <>

                                    <li className="nav-item">
                                        <a className="nav-link linkColor" href="/admin">Admin Dashboard</a>
                                    </li>

                                </>
                            }
                            {
                                isDoctor && <>
                                    <li className="nav-item">
                                        <a className="nav-link linkColor" href="/doctor">My Works</a>
                                    </li>
                                </>
                            }
                            {
                                isPharmacist && <>
                                    <li className="nav-item">
                                        <a className="nav-link linkColor" href="#">My Sellers</a>
                                    </li>
                                </>
                            }


                        </ul>
                    </div>
                    <div>
                        {
                            isLogged && <>

                                <a className="nav-link linkColor" href="/profile"><img className='profileGP' src={userPhoto} /></a>

                            </>
                        }
                    </div>

                </div>
            </div>
        </nav></div>
    )
}

export default Header