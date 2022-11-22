import React from 'react';
import './Home.scss'
import Card from "../../elements/card/Card";
import HomeContent from "../../components/guests/home-content/HomeContent";

const Home: React.FC = () => {
    return (
        <Card className="card_home">
            <HomeContent />
        </Card>
    );
};

export default Home;