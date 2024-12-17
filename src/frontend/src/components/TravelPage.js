import React from 'react';
import "./TravelPage.css";
import TravelMap from './TravelMap';

const TravelPage = () => {
    return (
        <div className='travel-container'>
            <div className='travel-map'>
                <TravelMap />
            </div>

        </div>

    );
};

export default TravelPage;