import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { GetService } from '../../../Services/CrudServices';
import API_URL from '../../../Environment/ApiRoutes.js/ApiRoutes';
import imageDefault from '../../../Assets/Images/defaultuserimage.png'
import './UserView.css'
import { FadeLoader } from "react-spinners";

const UserView = () => {

    const { id } = useParams();
    const [data, setData] = useState({})
    const refImage = useRef()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getUserData();
    }, []);


    const getUserData = async () => {
        try {
            setLoading(true)
            const res = await GetService(API_URL.GET_USER_BY_ID + '/' + id);
            setData(res.data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log("Error occurred:", error);
        }


    };


    const defaultImage = () => {
        refImage.current.src = imageDefault
    }

    return (
        <>
            <div className="ng-star-inserted userview">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="default_color d-flex align-items-center">

                                    <Link
                                        to="/users"
                                        className="fas fa-arrow-left back-button bg-secondary user-backbutton d-flex align-items-center justify-content-center mr-3"
                                    >
                                    </Link>
                                    <span> View User</span>
                                </h1>
                            </div>

                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/dashboard" href="/panel/dashboard">
                                            Dashboard
                                        </Link>
                                    </li>

                                    <li className="breadcrumb-item">
                                        <Link to="/users" href="/panel/User">
                                            User
                                        </Link>
                                    </li>

                                    <li className="breadcrumb-item active">View User</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content d-flex justify-content-center">
                    <div className="container p-2">
                        <div className="card p-3">
                            <div className="card-body">
                                {!loading && <div className="row">
                                    <div className="col-md-12">
                                        <div className="ms-3">
                                  

                                            <h6 className="text-muted userview-username"  >
                                                Full Name : {data?.full_name}
                                            </h6>

                                            <h6 className="text-muted userview-username"  >
                                                Nick Name : {data?.nickname}
                                            </h6>

                                            <h6 className="text-muted">
                                                dob : {data?.dob?.slice(0, 10)}
                                            </h6>


                                            <h6 className="text-muted">
                                                Email : {data?.email}
                                            </h6>

                                            <h6 className="text-muted">
                                                created At : {
                                                    data?.registration_time?.slice(0, 10)
                                                }
                                            </h6>

                                            <h6 className="text-muted userview-username"  >
                                                Profile Pic :
                                            </h6>
                                            <div className='userview-userimage'>
                                                <img className='userview-userimage' ref={refImage} src={data?.profile_pic} onError={defaultImage} alt={data?.profile_pic} />
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <FadeLoader speedMultiplier={2} loading={loading} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}





export default UserView






