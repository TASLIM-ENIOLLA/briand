import {useState, useRef, useEffect} from 'react'
import {useRouter} from 'next/router'

import {URL} from '../../data/URL'
import {closeFloatingWindow} from '/functions'

export default ({children, title}) => {
    const {asPath, ...rest} = useRouter()
    const which = asPath.match(/^\/\w+/)[0].replace(/\//, '')

    return (
        <section className = 'container-fluid'>
            <div className = 'row' style = {{flexDirection: 'row-reverse'}}>
                <div className = 'col px-0'>
                    <div className = 'vh100 flex-v bg-light'>
                        <div className = 'col-md-d-none bg-white shadow-sm'>
                            <div className = 'flex-h a-i-c py-3'>
                                <div className = 'col-auto'>
                                    <button className = 'btn bg-light shadow-sm border-0 px-3 py-2 rounded-1x'>
                                        <span className = 'bi bi-filter-left fo-s-22'></span>
                                    </button>
                                </div>
                                <div className = 'col'>
                                    <div className = 'flex-h'>
                                        <span className = 'flex-1 single-line bold text-capitalize fo-s-16'>{
                                            (title)
                                            ? title
                                            : asPath.match(/\w+$/)
                                        }</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className = 'w-100 flex-1 p-4 overflow-y-auto'>
                            <h5 className = 'bold text-dark text-capitalize mb-5 mt-4'>{
                                (title)
                                ? title
                                : asPath.match(/\w+$/)
                            }</h5>
                            {children}
                        </div>
                        <div className = 'col-md-d-none'>
                            <div className = 'w-100 bg-white border-top flex-h overflow-x-auto' style = {{flexWrap: 'nowrap'}}>{
                                URL[which] && URL[which].map(({name, href, iconName}) => (
                                    <div className = 'col-auto' key = {href}>
                                        <button title = {name} onClick = {() => window.location = href} className = 'd-block p-4 bg-clear btn border-0 w-100'>
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
            <section className = {`d-none po-fixed top-0 vh100 left-0 vw100 overflow-y-auto`}>
                <div id = '__floating_window' className = 'max-width-700px po-rel mx-auto shadow bg-white rounded-1x p-4 overflow-0'></div>
            </section>
            <style>{`
                .max-width-700px{
                    max-width: 700px;
                }
                .mb-4half{
                    margin-bottom: 2.5rem;
                }
                .bi{
                    vertical-align: .4rem;
                }
                .bg-half-dark{
                    background: rgba(0,0,0,.5);
                }
            `}</style>
        </section>
    )
}

const DesktopNavBar = () => {
    const [onHover, setOnHover] = useState(false)
    const {asPath, ...rest} = useRouter()
    const which = asPath.match(/\/\w+/)[0].replace(/\//, '')

    return (
        <div className = 'overflow-y-auto flex-1 p-1' onMouseOver = {() => setOnHover(true)} onMouseLeave = {() => setOnHover(false)}>{
            URL[which] && URL[which].map(({name, href, iconName}) => (
                <button title = {name} key = {href} onClick = {() => window.location = href} className = 'd-block mb-4 bg-clear btn border-0 w-100'>
                    <div className = 'px-2 flex-h a-i-c j-c-c'>
                        <div className = ''>
                            <span className = {`bi bi-${iconName} fo-s-16`}></span>
                        </div>
                        <div style = {{width: onHover ? '120px' : '0px', maxWidth: onHover ? '120px' : '0px'}} className = 'flex-1 text-left flex-h overflow-0 transit'>
                            <span className = 'text-capitalize flex-1 single-line bold ml-4'>{name}</span>
                        </div>
                    </div>
                </button>
            ))
        }</div>
    )
}
