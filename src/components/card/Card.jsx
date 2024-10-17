import './style.css';
import Netflix from '../../assets/images/netflix.jpg';
import Boeing from '../../assets/images/boeing-747.jpg';
import Book from '../../assets/images/book.jpg';
import Ship from '../../assets/images/cruise-ship.jpg';
import Slippers from '../../assets/images/slippers.jpg';
import Car from '../../assets/images/car.jpg';
import Horse from '../../assets/images/horse.jpg';
import Mcdonalds from '../../assets/images/mcdonalds.jpg';
import Skyscraper from '../../assets/images/skyscraper.jpg';
const Card = () => {

    const cardData = [
        { img: Netflix, title: 'Netflix' },
        { img: Boeing, title: 'Boeing' },
        { img: Book, title: 'Book' },
        { img: Ship, title: 'Ship' },
        { img: Slippers, title: 'Slippers' },
        { img: Car, title: 'Car' },
        { img: Horse, title: 'Horse' },
        { img: Mcdonalds, title: 'Mcdonalds' },
        { img: Skyscraper, title: 'Skyscraper' }
    ];

    return (
        <>
            {cardData.map((card, index) => (
                <div key={index} className="card">
                    <div className="card-body">
                        <img src={card.img} alt={card.title} />
                        <h5 className="card-title">{card.title}</h5>
                    </div>
                    <div className="btn-group">
                        <a href="#" className="btn btn-primary">Sell</a>
                        <input type="text" placeholder="0" />
                        <a href="#" className="btn btn-primary">Buy</a>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Card;