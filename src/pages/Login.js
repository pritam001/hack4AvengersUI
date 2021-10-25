import * as React from 'react';

import './Login.css';

function Login() {
    return (
        <div className="Login" style={{display: 'flex', flexDirection: 'row', flexGrow: 1, minHeight: 'calc(100vh - 64px)'}}>
            <div style={{margin: 'auto'}}>
                <h3>Welcome to J.A.R.V.I.S</h3>
            </div>
        </div>
    );
}

export default Login;