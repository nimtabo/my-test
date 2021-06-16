import React from 'react'
import Form from './Form'
import './home.css'

function Home() {
	return (
		<div className="home_page">
			<div className="hero">

				<div className="hero-text">
					<h3>Wide Selection Of Auto Parts At Lowest Price</h3>
				</div>

				<div className="hero-form">
					<Form />
				</div>

			</div>


			{/* SUBSCRIBE */}
			<div className="subscribe">
				<p className="sub-text">
					Be The First To Know.
					<br />
					Exclusively Yours
				</p>

				<input type="text" placeholder="Enter your Email Address" />

				<div className="sub-btn">
					SUBSCRIBE
				</div>
			</div>
		</div>
	)
}

export default Home
