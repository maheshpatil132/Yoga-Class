import React, { useContext, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog';
import ModalContext from '../../context/ModelContext';
import { Axios } from '../../Axios/Axios';
import UserContext from '../../context/UserContext';
import { useSnackbar } from 'notistack';


const BuyPlan = () => {

  const { model, setModel } = useContext(ModalContext)
  const { user } = useContext(UserContext)
  const [batches, setBatches] = useState([])

  const {enqueueSnackbar} = useSnackbar()
  // user_id, batch_id, startdate, enddate

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  var yy = String(today.getFullYear()).slice(); // Get last two digits of the year
  
  let formattedStartDate = dd + '-' + mm + '-' + yy;
  
  // Calculate last date of the current month
  var lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  var lastDayDD = String(lastDay.getDate()).padStart(2, '0');
  let formattedEndDate = lastDayDD + '-' + mm + '-' + yy;

 
  const [selectedTime, setSelectedTime] = useState(1);

  const handleRadioChange = (event) => {
    setSelectedTime( Number(event.target.value));
  };

  const payment = async () => {

    const res = await Axios.post('/api/subscriptions/create', {
      user_id: user.user_id,
      batch_id : selectedTime,
      startdate : formattedStartDate,
      enddate : formattedEndDate
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    
    if(res){

      enqueueSnackbar(res.data.message)
    }
    setModel(false)

  }


  useEffect(() => {

    getAllBatches()

  }, [])


  const getAllBatches = async () => {

    try {

      const { data } = await Axios.get('/api/batches/all')
       
      if(data) setBatches(data.batches)

    } catch (error) {
    }

  }





  return (
    <div>
      <Dialog open={model}>
        <div className=' bg-white rounded-xl lg:w-[400px] px-4 py-4 flex flex-col'>
          <h1 className=' text-2xl font-medium'>Buy plan for 1 month</h1>
          <hr className=' my-2 mb-4 h-0.5 bg-black' />

          <div className=' '>
            <h1 className=' font-medium mb-4 text-gray-600 capitalize'>Select your batch timing</h1>


            {
              batches.map((elem, ind) => {
                return (
                  <div key={ind} className="flex items-center mb-4">
                    <input
                      id="default-radio-1"
                      type="radio"
                      name="default-radio"
                      value={elem.batch_id}
                      checked={selectedTime === elem.batch_id}
                      onChange={handleRadioChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {elem.time_duration}
                    </label>
                  </div>
                )
              })
            }





          </div>
          <div className=' mt-4 flex flex-col gap-6'>
            <h1 className=' text-black font-medium'>Pay Amount 500 INR to the Outrichiy</h1>
            <div className=' flex flex-col md:flex-row gap-3'>
              <button onClick={payment} className=' bg-blue-300 px-8 py-1 rounded-md font-medium'>Pay</button>
              <button onClick={() => setModel(false)} className=' bg-red-300 px-8 py-1 rounded-md font-medium'>Cancel</button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default BuyPlan