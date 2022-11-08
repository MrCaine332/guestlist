import React, {useEffect} from 'react';

const Test = ({ test }) => {
    useEffect(() => {
        console.log('test')
    }, [])

    return (
        <div>
        </div>
    );
};

export default Test;