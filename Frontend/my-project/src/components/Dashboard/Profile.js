import React, { useCallback, useContext, useEffect, useState } from 'react'
import BuyPlan from '../subscription/BuyPlan'
import ModalContext from '../../context/ModelContext'
import UserContext from '../../context/UserContext'
import { Axios } from '../../Axios/Axios'
import { useSnackbar } from 'notistack'
import { compareDates } from '../../services/CompareDates'

const Profile = () => {

    const [subscription, setSubscription] = useState(null)
    const [compareResult, setCompareResult] = useState(false)

    const { setModel } = useContext(ModalContext)
    const { user } = useContext(UserContext)


    const { enqueueSnackbar } = useSnackbar()






    const buyplan = () => {
        setModel(true)
    }


    useEffect(() => {



        getSubscriptionDetails()


    }, [])


    const resule = useCallback(() => {

            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
            var yy = String(today.getFullYear()).slice(); // Get last two digits of the year

            let curentDate = dd + '-' + mm + '-' + yy;


            if (subscription) setCompareResult(compareDates(curentDate, subscription.enddate))
            

        },
        [subscription],
    )


    const getSubscriptionDetails = async () => {
        try {
            const { data } = await Axios.get(`/api/subscriptions/user/${user.user_id}`)

            if (data) {
                setSubscription(data[0])
            }


        } catch (error) {

            // enqueueSnackbar(String(error.response.data.error), { variant: 'info' })
        }
    }


    return (
        <div className=' py-10 px-2 lg:px-12 bg-blue-200 min-h-screen'>
            <h1 className=' font-semibold mb-10 text-center text-3xl uppercase '>Profile</h1>
            <div className=' w-[90%] rounded-xl flex gap-5 flex-col justify-center items-center mx-auto bg-white lg:px-8 px-4 py-10'>
                <div className=' mb-5'>
                    <img className='  w-60 lg:w-72 rounded-full' src="https://res.cloudinary.com/drzkvppdf/image/upload/v1702831344/Mahesh_c6jxtx.png" alt="" />
                </div>

                <div className=' mt-4 flex-col lg:flex-row  gap-8 flex w-full'>
                    <div className=' gap-1 w-full flex flex-col  '>
                        <p className=' text-sm font-semibold text-gray-800'>Name</p>
                        <div className=' rounded-sm px-4 py-2 bg-gray-200' >
                            <p className='text-gray-500'>{user.name}</p>
                        </div>
                    </div>

                    <div className=' gap-1 w-full flex flex-col  '>
                        <p className=' text-sm font-semibold text-gray-800'>Email</p>
                        <div className=' rounded-sm px-4 py-2 bg-gray-200' >
                            <p className='text-gray-500'>{user.email}</p>
                        </div>
                    </div>

                </div>
                {
                    subscription &&
                    <div className=' mt-4 gap-8 flex-col lg:flex-row flex w-full'>
                        <div className=' gap-1 w-full flex flex-col  '>
                            <p className=' text-sm font-semibold text-gray-800'>Batch</p>
                            <div className=' rounded-sm px-4 py-2 bg-gray-200' >
                                <p className='text-gray-500'>{subscription.time_duration}</p>
                            </div>
                        </div>

                        <div className=' gap-1 w-full flex flex-col  '>
                            <p className=' text-sm font-semibold text-gray-800'>Start Date</p>
                            <div className=' rounded-sm px-4 py-2 bg-gray-200' >
                                <p className='text-gray-500'>{subscription.startdate}</p>
                            </div>
                        </div>

                        <div className=' gap-1 w-full flex flex-col  '>
                            <p className=' text-sm font-semibold text-gray-800'>End Subscription</p>
                            <div className=' rounded-sm px-4 py-2 bg-gray-200' >
                                <p className='text-gray-500'>{subscription.enddate}</p>
                            </div>
                        </div>

                    </div>
                }

                <button
                    disabled={compareResult}
                    onClick={buyplan}
                    className={` ${compareResult ? 'bg-gray-500' : 'bg-purple-500'}  mt-5 text-white font-medium px-4 py-2 rounded`}>
                    {subscription ? 'Renew Subscription' : 'Buy Subcription'}
                </button>



            </div>

            <BuyPlan />

        </div>
    )
}

export default Profile