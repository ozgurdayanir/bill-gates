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
import { useState } from 'react';
import Receipt from '../receipt';

// Cards component has two props: money and setMoney
// money is the amount of money the user has
// setMoney is a function that updates the amount of money
const Card = ({ money, setMoney }) => {
    // Card data with image, title, and price
    const cardData = [
        { img: Netflix, title: 'Netflix', price: 100 },
        { img: Boeing, title: 'Boeing', price: 148000000 },
        { img: Book, title: 'Book', price: 20 },
        { img: Ship, title: 'Ship', price: 930000000 },
        { img: Slippers, title: 'Slippers', price: 5 },
        { img: Car, title: 'Car', price: 70000 },
        { img: Horse, title: 'Horse', price: 2500 },
        { img: Mcdonalds, title: 'Mcdonalds', price: 1500000 },
        { img: Skyscraper, title: 'Skyscraper', price: 850000000 },
    ];

    // quantities: input field for each card
    // ownedQuantities: owned quantity of each card
    // receipt: list of items purchased
    const [quantities, setQuantities] = useState(Array(cardData.length).fill(0));
    const [ownedQuantities, setOwnedQuantities] = useState(Array(cardData.length).fill(0));
    const [receipt, setReceipt] = useState([]);

    // handleBuy is used to buy the card
    const handleBuy = (card, index) => {
        const newCost = card.price; // Purchase price is the same as the selling price
        if (newCost > money) {
            alert('Not enough money!');
            return;
        }
        setMoney(money - newCost);

        // Update owned quantities
        const newOwnedQuantities = [...ownedQuantities];
        newOwnedQuantities[index] += 1; // Increase owned quantity
        setOwnedQuantities(newOwnedQuantities);

        const newQuantities = [...quantities];
        newQuantities[index] = newOwnedQuantities[index]; // Set input to the new owned quantity
        setQuantities(newQuantities);

        // Update receipt
        setReceipt(prevReceipt => {
            const existingItem = prevReceipt.find(item => item.title === card.title);
            if (existingItem) {
                // If the item already exists, update the quantity
                existingItem.quantity += 1;
                return [...prevReceipt]; // Return updated receipt
            } else {
                // If the item does not exist, add it to the receipt
                return [...prevReceipt, { ...card, quantity: 1, total: card.price }];
            }
        });
    };

    // handleSell is used to sell the card
    const handleSell = (card, index) => {
        if (ownedQuantities[index] <= 0) {
            alert('You do not own any of this item to sell!');
            return;
        }

        const totalSale = card.price; // Selling price is the same as the purchase price
        setMoney(money + totalSale);

        const newOwnedQuantities = [...ownedQuantities];
        newOwnedQuantities[index] -= 1; // Decrease owned quantity
        setOwnedQuantities(newOwnedQuantities);

        // Update the input quantity to reflect the new owned quantity
        const newQuantities = [...quantities];
        newQuantities[index] = newOwnedQuantities[index]; // Set input to the new owned quantity
        setQuantities(newQuantities);

        // Update receipt for selling
        setReceipt(prevReceipt => {
            const existingItem = prevReceipt.find(item => item.title === card.title);
            if (existingItem) {
                existingItem.quantity -= 1;
                if (existingItem.quantity <= 0) {
                    // Remove item from receipt if quantity is 0
                    return prevReceipt.filter(item => item.title !== card.title);
                }
                return [...prevReceipt]; // Return updated receipt
            }
            return prevReceipt; // No change if item not found
        });
    };
    const handleQuantityChange = (index, value) => {
        const newQuantities = [...quantities];

        if (value < 0) return; // Negatif değer girilmesin

        // Yeni girilen değeri güncelle
        newQuantities[index] = value;
        setQuantities(newQuantities);

        const card = cardData[index];
        const totalCost = card.price * value;

        // Eğer girilen miktar paradan fazlaysa, kullanıcıyı uyar
        if (totalCost > money) {
            alert('Not enough money!');
            return;
        }

        // Parayı güncelle (fark kadar)
        setMoney(money - (card.price * (value - ownedQuantities[index])));

        // Sahip olunan miktarı güncelle
        const newOwnedQuantities = [...ownedQuantities];
        newOwnedQuantities[index] = value;
        setOwnedQuantities(newOwnedQuantities);

        // Fişi güncelle
        setReceipt(prevReceipt => {
            const existingItem = prevReceipt.find(item => item.title === card.title);
            if (existingItem) {
                existingItem.quantity = value;
                if (value === 0) {
                    return prevReceipt.filter(item => item.title !== card.title); // Adet 0 ise fişten sil
                }
                return [...prevReceipt];
            } else if (value > 0) {
                return [...prevReceipt, { ...card, quantity: value, total: card.price * value }];
            }
            return prevReceipt;
        });
    };

    return (
        <>
            {cardData.map((card, index) => (
                <div key={index} className="card">
                    <div className="card-body">
                        <img src={card.img} alt={card.title} />
                        <h3 className="card-title">{card.title}</h3>
                        <p>${card.price.toLocaleString()}</p>
                    </div>
                    <div className="btn-group">
                        <a
                            href="#"
                            className={`btn btn-sell ${ownedQuantities[index] <= 0 ? 'disabled' : 'active'}`}
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default anchor behavior
                                handleSell(card, index);
                            }}
                        >
                            Sell
                        </a>
                        <input
                            type="number"
                            placeholder="0"
                            min="0"
                            value={quantities[index] === 0 ? '' : quantities[index]}
                            onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                        />
                        <a
                            href="#"
                            className="btn btn-buy"
                            onClick={(e) => {
                                e.preventDefault(); // Prevent default anchor behavior
                                handleBuy(card, index);
                            }}
                        >
                            Buy
                        </a>
                    </div>
                </div>
            ))}
            {receipt.length > 0 && (
                <Receipt receipt={receipt} /> // Display the Receipt component
            )}
        </>
    );
};

export default Card;