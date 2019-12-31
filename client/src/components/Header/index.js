import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
// Style
import style from './header.scss'

// Components
import LinkButton from '../LinkButton'

// Actions
import { fetchLogout } from '../../actions/user'
import { isAuthenticated, logout } from '../../helper/auth'

const Header = () => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const history = useHistory()

    function _logout() {
        if (confirm('로그아웃 하시겠습니까?')) {
            dispatch(fetchLogout(() => {

                logout()
                history.push('/login')

            }))
        }
    }

    return (
        <header className={style.header}>
            <div className="logo">
                <h1>REAL CLASS!</h1>
            </div>
            <div className={style.auth}>
                <ul>
                    {isAuthenticated() && <li>{user.info.name}님 환영합니다.</li>}
                    <li>
                        {isAuthenticated() ? <LinkButton onClick={_logout} title="로그아웃" color="green" /> : <LinkButton to='/login' title="로그인" color="green" />}
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header