import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth, googleAuthProvider } from '../../firebase';
import { CRUDUSER } from '../../functions/auth';
import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, GoogleOutlined, SyncOutlined } from '@ant-design/icons';
import logo from '../../images/logo.png';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));
    const location = useLocation();

    useEffect(() => {
        if (user && user.token) {
            const intended = location.state;
            if (!intended) {
                const redirectTo = user.role === 'admin' ? '/admin/dashboard' : '/';
                navigate(redirectTo);
            }
        }
    }, [user, navigate, location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await auth.signInWithEmailAndPassword(email, password);
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();
            CRUDUSER(idTokenResult.token)
                .then((res) => {
                    dispatch({
                        type: 'LOGED_IN_USER',
                        payload: {
                            ...res.data,
                            token: idTokenResult.token,
                            img: user.photoURL,
                        },
                    });
                    const redirectTo = location.state?.from || (res.data.role === 'admin' ? '/admin/dashboard' : '/');
                    navigate(redirectTo);
                })
                .catch();
        } catch (error) {
            toast.error('Invalid email or password!');
            setLoading(false);
        }
    };

    const googleLogin = async () => {
        auth.signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();
                CRUDUSER(idTokenResult.token)
                    .then((res) => {
                        dispatch({
                            type: 'LOGED_IN_USER',
                            payload: {
                                ...res.data,
                                token: idTokenResult.token,
                                img: user.photoURL,
                            },
                        });
                        const redirectTo = res.data.role === 'admin' ? '/admin/dashboard' : '/';
                        navigate(redirectTo);
                    })
                    .catch();
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <img src={logo} alt="Logo" className="login-logo" />
                <h1 className="login-title">Welcome Back</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <Input.Password
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            required
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </div>
                    <button type="submit" className="btn login-btn" disabled={loading || !email || password.length < 6}>
                        {loading ? <SyncOutlined spin /> : 'Login'}
                    </button>
                </form>
                <button className="btn google-login-btn" onClick={googleLogin}>
                    Log in with <GoogleOutlined />
                </button>
                <div className="login-links">
                    <Link to="/resetPassword" className="link">Forgot your password?</Link>
                    <Link to="/Register" className="link">Create an account</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
