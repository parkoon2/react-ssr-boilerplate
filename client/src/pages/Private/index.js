import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

// Style
import style from './private.scss'

// Components
import { logout, isAuthenticated } from '../../helper/auth'
import Button from '../../components/Button'
import { fetchUsers } from '../../actions/user'

const Private = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const auth = isAuthenticated()
    const user = useSelector(state => state.user, [])

    function handleAPITest() {
        dispatch(fetchUsers())
    }

    return <React.Fragment>
        <div className={style.banner}>
        </div>
        <Button onClick={handleAPITest}>API 테스트</Button>
        <div className={style.result}>
            {user.users.map(u => <h2>{u.name}</h2>)}
        </div>
    </React.Fragment>
}

export default Private