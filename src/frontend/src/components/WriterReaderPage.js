import React from 'react';
import "./WriterReaderPage.css";
import SpiderChart from './WriterReaderSpiderChart';

const WriterReaderPage = () => {
    return (
        <div className='writerreader-container'>
            <div className="books-spiderChart">
                <SpiderChart />
            </div>
            
        </div>

    );
};

export default WriterReaderPage;