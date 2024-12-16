import React from 'react';
import Slider from 'react-slick';
import './WriterReaderBookshelf.css';

const BooksShelf = ({ books }) => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <h3 className="bookshelf-title">Bookshelf</h3>
      <Slider {...settings}>
        {books.map((book, index) => (
          <div key={index} className="book-card">
            <div className="book-card-inner">
              <img
                src={book.Cover || 'https://placeholdmon.vercel.app/400x600?name=swampert'}
                alt={`${book.Title} cover`}
                className="book-cover"
              />
              <div className="book-info">
                <h4>{book.Title}</h4>
                <p>{book.Author}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BooksShelf;
