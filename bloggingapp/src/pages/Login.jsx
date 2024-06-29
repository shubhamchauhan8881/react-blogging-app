import React, {useState, useContext} from 'react'
import AuthContext from '../utils/AuthProvider'
import { toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader'
import { Link } from 'react-router-dom';
import logo from '../media/vite.svg' 

export default function Login() {
	const [formdata, setformdata] = useState({username: '', password:''})
	const {login} = useContext(AuthContext)	
	const handleFormSubmit = (e) =>{
		e.preventDefault();
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if(regex.test(formdata.username) === false)toast.error("Please enter a valid email address!");
		else if( formdata.password === '' ) toast.error("Please enter a valid password!");
		else login(formdata.username, formdata.password);
	}
  	return (
    <>	
		<Loader />
		<ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnHover
          theme="light"
		  />
        <div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
					
					<form className="card-body" onSubmit={(e)=>handleFormSubmit(e)}>
						<div className="form-control">
							<Link to="/">
								<div className='flex items-center justify-start gap-2 p-2'>
									<div className='for-logo'>
										<img src={logo} alt='' className="size-6"/>
									</div>
									<h1 className='text-2xl font-semibold'>Login</h1>
								</div>
							</Link>
							<p className='text-sm mt-2'>Please log in to access the exclusive content and special features we've curated just for you</p>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input type="text"  placeholder="email" value={formdata.username} onChange={(e)=> setformdata({...formdata, username:e.target.value})} className="input input-bordered" />
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input type="password" placeholder="password" value={formdata.password} onChange={(e)=> setformdata({...formdata, password:e.target.value})} className="input input-bordered"/>
						</div>
						
						<div className="form-control mt-4">
							<button className="btn btn-primary" type="submit">Login</button>
						</div>

						<div className="form-control mt-4">
							<Link to="/register/" >
								<button className="btn btn-accent w-full" type="submit">Register</button>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
    </>
  )
}
