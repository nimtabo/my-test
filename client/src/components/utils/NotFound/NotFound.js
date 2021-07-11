import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="pricing-page">
            <div className="pricing-title">
                <h1>ERROR</h1>
            </div>

            <div className="error-container">
                <div className="pricing-plan-tittle">
                    <h3>THE PAGE OR RESOURCE YOU ARE LOOKING FOR IS NOT AVAILABLE</h3>
                </div>
                <p>
                    <Link to="/">Go Home</Link>
                </p>

            </div>
        </div>
    )
}

export default NotFound
