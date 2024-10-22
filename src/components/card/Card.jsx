import './style.css';
import cardData from '../../assets/data.json';
import { useState } from 'react';
import Receipt from '../receipt';

// Card component has two props: money and setMoney
// money is the amount of money the user has
// setMoney is a function that updates the amount of money
const Card = ({ money, setMoney }) => {

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
            const existingItem = prevReceipt.find(item => item.name === card.name);
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
            const existingItem = prevReceipt.find(item => item.name === card.name);
            if (existingItem) {
                existingItem.quantity -= 1;
                if (existingItem.quantity <= 0) {
                    // Remove item from receipt if quantity is 0
                    return prevReceipt.filter(item => item.name !== card.name);
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
            const existingItem = prevReceipt.find(item => item.name === card.name);
            if (existingItem) {
                existingItem.quantity = value;
                if (value === 0) {
                    return prevReceipt.filter(item => item.name !== card.name); // Adet 0 ise fişten sil
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
                <div key={card.id} className="card">
                    <div className="card-body">
                    {(() => {
                            try {
                                return <img src={card.img} alt={card.name} />;
                            } catch (error) {
                                console.error(`Error loading image: ${card.img}`, error);
                                return <p>Image not found</p>;
                            }
                        })()}
                        <h3 className="card-title">{card.name}</h3>
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
                            className={`${ownedQuantities[index] <= 0 ? 'default' : 'focused'}`}
                            type="number"
                            placeholder="0"
                            min="0"
                            value={quantities[index] === 0 ? '' : quantities[index]}
                            onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                        />
                        <a
                            href="#"
                            className={`btn btn-buy ${ card.id === 42 && ownedQuantities[index] >= 1 ? 'disabled' : 'active'}`}
                            onClick={(e) => {
                                e.preventDefault();
                                if (!(card.id === 42 && ownedQuantities[index] >= 1)) {
                                    handleBuy(card, index);
                                } else if (card.id === 42 && ownedQuantities[index] >= 1) {
                                    alert('There is only one Mona Lisa on the world!');
                                }
                            }}
                            // Button disable
                            disabled={card.id === 42 && ownedQuantities[index] >= 1}
                            
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