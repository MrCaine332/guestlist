import React from 'react';
import Card from "../../elements/card/Card";
import './Login.scss'
import LoginContent from "../../components/guests/login-content/LoginContent";

const Login: React.FC = () => {
    return (
        <Card className="card_login">
            <LoginContent />
        </Card>
    );
};

export default Login;