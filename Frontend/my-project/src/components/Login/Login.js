import React, { useContext, useState } from 'react'
import { Axios} from '../../Axios/Axios'
import { useSnackbar } from 'notistack'
import UserContext from '../../context/UserContext'

const Login = () => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {enqueueSnackbar} = useSnackbar()
    const { user , setUser} = useContext(UserContext)
    
    const emaihandle = (e) => {
        setEmail(e.target.value)
    }

    const passhandle = (e) => {
        setPassword(e.target.value)
    }

    
    

    const submithandle = async (e) => {
        e.preventDefault();
        try {
          const response = await Axios.post('http://localhost:3001/api/users/login', {
            email: email,
            password: password
          }, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
      
          console.log('Status Code:', response.status);
      
          const content = response.data;

          enqueueSnackbar('Login Successful' , {
            variant:'success'
          })

          setUser(content.user)

          
        } catch (error) {
          console.error('Error during Axios request:', error);
        }
      };

    return (
        <div className=' py-10 min-h-screen bg-blue-100 w-full'>
            <h1 className=' mb-10 text-center font-bold text-3xl'>Login Here</h1>


            <form onSubmit={(e) => submithandle(e)} className="max-w-md mx-auto border px-8 py-8 bg-white rounded-xl">

                {/* <div >
                    <div className="relative z-0 w-full mb-5 group">
                        <input value={name} onChange={(e) => namehandle(e)} type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full name</label>
                    </div>

                </div> */}


                <div className="relative z-0 w-full mb-5 group">
                    <input value={email} onChange={(e) => emaihandle(e)} type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={password} onChange={(e) => passhandle(e)} type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>



                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
    )
}

export default Login