import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import './style.css';

const SignInPageContainer = () => {
    const login = useSelector(state => state.login)
    const password = useSelector(state => state.password)
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)
    const loggedInUser = useSelector(state => state.loggedInUser)
    const [error, setError] = useState("");


    useEffect(async () => {
        const stringifiedUsers = await localStorage.getItem('users');
        console.log(stringifiedUsers);

        if (stringifiedUsers) {
            const setUsersAction = {
                type: "SET_USERS",
                payload: JSON.parse(stringifiedUsers)
            }
            dispatch(setUsersAction)
        }
    }, []);


    const dispatch = useDispatch();

    const onChangeLogin = useCallback((event) => {
        const changeLoginAction = {
            type: "CHANGE_LOGIN",
            payload: event.target.value
        }
        dispatch(changeLoginAction)
    }, [dispatch])

    const onChangePassword = useCallback((event) => {
        const changePasswordAction = {
            type: "CHANGE_PASSWORD",
            payload: event.target.value
        }
        dispatch(changePasswordAction)
    }, [dispatch])

    const onLogin = useCallback(() => {
        const userByLogin = users.find((user) => user.login === login); //нашли юзера по логину которого ввели в инпут

        if (!userByLogin) {
            setError('Пользователя с таким именем не существует')
        } else if (userByLogin.password === password) {
            dispatch({ type: 'LOG_IN', payload: userByLogin })
        } else {
            setError('Пароль не верный')
        }


    }, [dispatch, users, password, login])

    const onLogOut = useCallback(() => {
        dispatch({ type: 'LOG_OUT' })
    }, [dispatch])

    return (
        <div className="page">
            <div className="page-sign-in">
                <h3>Для входа в систему заказов введите имя пользователя и пароль</h3>
                <div className = 'modal-window'>
                    <h4>Имя пользователя:</h4>
                    <input className = "enter-field"
                        type="text"
                        placeholder="login"
                        onChange={onChangeLogin}
                        value={login}
                    />
                    <h4>Пароль:</h4>
                    <input className = "enter-field"
                        type="password"
                        placeholder="password"
                        onChange={onChangePassword}
                        value={password}
                    />
                    <div>
                        {user && <span>{user.name.first} {user.name.last}</span>}
                    </div>
                    <h4 className = "text-field">
                        {loggedInUser && `Добро пожаловать в сервис онлайн заказа, ${loggedInUser.login}`}
                    </h4>
                    <p className = "text-field">
                        {loggedInUser && <button onClick={onLogOut}>Выйти</button>}
                    </p>
                    <h4 className = "text-field">
                        {!loggedInUser && 'Пожалуйста, зарегистрируйтесь'}
                    </h4>
                    <p className = "text-field">
                        {!loggedInUser && <button onClick={onLogin}>Войти</button>}
                    </p>
                    <p className="text-field">
                        {!loggedInUser && error}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default SignInPageContainer;