import {DashboardURL} from '../../data/URL'
import {useState} from 'react'
import {useRouter} from 'next/router'

export default ({children}) => {
    const {asPath} = useRouter()

    return (
        <section className = 'container-fluid'>
            <div className = 'row' style = {{flexDirection: 'row-reverse'}}>
                <div className = 'col px-0'>
                    <div className = 'vh100 flex-v bg-light'>
                        <div className = 'w-100 flex-1 p-4 overflow-y-auto'>
                            <h5 className = 'bold text-dark text-capitalize mb-5 mt-4'>{asPath.match(/\w+$/)}</h5>
                            {children} 
                        </div>
                        <div className = 'col-md-d-none'>
                            <div className = 'w-100 bg-white border-top flex-h overflow-x-auto' style = {{flexWrap: 'no-wrap'}}>{
                                DashboardURL && DashboardURL.map(({name, href, iconName}) => (
                                    <div className = 'col-auto' key = {href}>
                                        <button title = {name} onClick = {() => window.location = href} className = 'd-block p-4 bg-clear border-0 w-100'>
                                            <div className = 'px-3 flex-h a-i-c j-c-c'>
                                                <div className = ''>
                                                    <span className = {`bi bi-${iconName} fo-s-18`}></span>
                                                </div>
                                                <div className = 'pl-4 col-d-none col-md-d-block flex-1 text-left'>
                                                    <span className = 'text-capitalize bold'>{name}</span>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                ))
                            }</div>
                        </div>
                    </div>
                </div>
                <div className = 'col-auto col-d-none col-md-d-block px-0'>
                    <div className = 'vh100 p-3 bg-white flex-v border-right'>
                        <div>
                            <a href = '/' className = 'text-center d-block w-100 bg-clear border-0 py-4 px-3 mb-3'>
                                <img src = '/favicon.ico' width = '30' />
                            </a>
                        </div>
                        <DesktopNavBar></DesktopNavBar>
                    </div>
                </div>
            </div>
            <style>{`
                .mb-4half{
                    margin-bottom: 2.5rem;
                }
                .bi{
                    vertical-align: .4rem;
                }
            `}</style>
        </section>
    )
}

const DesktopNavBar = () => {
    const [onHover, setOnHover] = useState(false)
    //  
    return (
        <div className = 'overflow-y-auto flex-1' onMouseOver = {() => setOnHover(true)} onMouseLeave = {() => setOnHover(false)}>{
            DashboardURL.map(({name, href, iconName}) => (
                <button title = {name} key = {href} onClick = {() => window.location = href} className = 'd-block mb-4half bg-clear border-0 w-100'>
                    <div className = 'px-3 flex-h a-i-c j-c-c'>
                        <div className = ''>
                            <span className = {`bi bi-${iconName} fo-s-16`}></span>
                        </div>
                        <div style = {{width: onHover ? '120px' : '0px', maxWidth: onHover ? '120px' : '0px'}} className = 'flex-1 text-left overflow-0 transit'>
                            <span className = 'text-capitalize bold ml-4'>{name}</span>
                        </div>
                    </div>
                </button>
            ))
        }</div>
    )
}