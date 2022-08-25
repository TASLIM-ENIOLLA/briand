import {useState, useEffect} from 'react'

import {api_routes} from '../../config'
import {cryptoGraph} from '../../functions'

import Template from '../../components/dashboard/Template'

export default () => {
    const [overviewData, setOverviewData] = useState({
        users: 0, active_referrals: 0, plans: 0
    })

    useEffect(() => {
        (async () => {
            const req = await fetch(api_routes.admin.overview_data)
            const {data: {users, active_referrals, plans}} = await req.json()

            setOverviewData({users, active_referrals, plans})
        })()
    }, [])

	return (
		<Template>
			<div className = 'row my-4'>
                <div className="col-lg-3 col-sm-12 col-md-6">
                    <div className="col-12">
                        <div className="row a-i-c bg-light-purple px-3 py-4 rounded-1x overflow-0 shadow">
                            <div className="col">
                                <p className = 'text-capitalize mb-2 text-muted half-bold'>total users</p>
                                <h3 className = 'bold text-dark'>
                                    {new Intl.NumberFormat().format(overviewData.users)}
                                </h3>
                            </div>
                            <div className="col-auto my-3">
                                <a href = './admin/users' title = 'See users' className="px-3 py-2 border-0 bg-white shadow-sm border rounded-1x d-inline-block">
                                    <span className="bi bi-people fa-2x"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-12 col-md-6">
                    <div className="col-12">
                        <div className="row a-i-c bg-light-creame px-3 py-4 rounded-1x overflow-0 shadow">
                            <div className="col">
                                <p className = 'text-capitalize mb-2 text-muted half-bold'>Active referrals</p>
                                <h3 className = 'bold text-dark'>
                                    {new Intl.NumberFormat().format(overviewData.active_referrals)}
                                </h3>
                            </div>
                            <div className="col-auto my-3">
                                <a href = '.admin/referrals' title = 'See users' className="px-3 py-2 border-0 bg-white shadow-sm border rounded-1x d-inline-block">
                                    <span className="bi bi-diagram-3 fa-2x"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-12 col-md-6">
                    <div className="col-12">
                        <div className="row a-i-c bg-light-green px-3 py-4 rounded-1x overflow-0 shadow">
                            <div className="col">
                                <p className = 'text-capitalize mb-2 text-muted half-bold'>All plans</p>
                                <h3 className = 'bold text-dark'>
                                    {new Intl.NumberFormat().format(overviewData.plans)}
                                </h3>
                            </div>
                            <div className="col-auto my-3">
                                <a href = './admin/plans' title = 'See users' className="px-3 py-2 border-0 bg-white shadow-sm border rounded-1x d-inline-block">
                                    <span className="bi bi-bullseye fa-2x"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col-lg-3 col-sm-12 col-md-6">
                    <div style = {{height: '130px'}} className = 'my-3 p-4 flex-v rounded-1x shadow bg-light-purple'>
                        <div className = 'flex-1'>
                            <div title = 'Total users' className = 'text-muted one-line'>Total users</div>
                            <h2 title = {new Intl.NumberFormat().format(overviewData.users)} className = 'text-dark one-line pt-3'>
                                {new Intl.NumberFormat().format(overviewData.users)}
                            </h2>
                        </div>
                        <div>
                            <p className = 'text-muted flex-h a-i-c m-0'>
                                <a href = '/admin/users' className = 'underline flex-1 one-line text-action'>See users</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-12 col-md-6">
                    <div style = {{height: '130px'}} className = 'my-3 p-4 flex-v rounded-1x shadow bg-light-creame'>
                        <div className = 'flex-1'>
                            <div title = 'Total creators' className = 'text-muted one-line'>Active referrals</div>
                            <h2 title = {new Intl.NumberFormat().format(overviewData.active_referrals)} className = 'text-dark one-line pt-3'>
                                {new Intl.NumberFormat().format(overviewData.active_referrals)}
                            </h2>
                        </div>
                        <div>
                            <p className = 'text-muted flex-h a-i-c m-0'>
                                <a href = '/admin/referrals' className = 'underline flex-1 one-line text-action'>See referrals</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3 col-sm-12 col-md-6">
                    <div style = {{height: '130px'}} className = 'my-3 p-4 flex-v rounded-1x shadow bg-light-green'>
                        <div className = 'flex-1'>
                            <div title = 'Total views' className = 'text-muted one-line'>All plans</div>
                            <h2 title = {new Intl.NumberFormat().format(overviewData.plans)} className = 'text-dark one-line pt-3'>
                                {new Intl.NumberFormat().format(overviewData.plans)}
                            </h2>
                        </div>
                        <div>
                            <p className = 'text-muted flex-h a-i-c m-0'>
                                <a href = '/admin/plans' className = 'underline flex-1 one-line text-action'>See plans</a>
                            </p>
                        </div>
                    </div>
                </div> */}
            </div>
            <style jsx>{`
                .bg-light-purple{
                    background: #e9d6f3bd;
                }
                .bg-light-creame{
                    background: #f3efd5bd;
                }
                .bg-light-green{
                    background: #cdf3e3bd;
                }
                .bg-light-blue{
                    background: #cde7f3bd;
                }
                .text-light-purple{
                    color: #ac21f5;
                }
                .text-light-wine{
                    color: #e84444;
                }
                .text-light-creame{
                    color: #f1d625;
                }
                .text-light-green{
                    color: #1fef97;
                }
                .text-light-blue{
                    color: #25acea;
                }
            `}</style>
		</Template>
	)
}