import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Heading, Text, Button } from '@chakra-ui/react';

const MenuItem = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const passed = location.state?.item || null;
    const [item, setItem] = useState(passed);
    const [qty, setQty] = useState(1);
    const [note, setNote] = useState('');

    useEffect(() => {
        // If no item was passed, optionally you could fetch by id from URL in future.
    }, [item]);

    const imageSrc = item && item.image
        ? (item.image.startsWith('http') ? item.image : `http://127.0.0.1:8000${item.image}`)
        : '';

    function dec() { setQty(q => Math.max(1, q - 1)); }
    function inc() { setQty(q => q + 1); }

    function handleOrder() {
        // navigate to order page with order details (or handle add-to-cart)
        navigate('/order-online', { state: { item, qty, note } });
    }

    if (!item) return <p>No item selected.</p>;

    return (
        <div style={{ padding: '2rem 4rem', maxWidth: 800 }}>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                <img src={imageSrc} alt={item.name} style={{ width: 300, height: 220, objectFit: 'cover', borderRadius: 8 }} />
                <div>
                    <Heading>{item.name}</Heading>
                    <Text fontWeight="bold" mb="2">${item.price}</Text>
                    <Text mb="4">{item.description}</Text>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <Button size="sm" onClick={dec}>-</Button>
                        <input type="number" value={qty} min={1} onChange={e => setQty(Math.max(1, Number(e.target.value) || 1))} style={{ width: 60, textAlign: 'center' }} />
                        <Button size="sm" onClick={inc}>+</Button>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.25rem' }}>Notes</label>
                        <textarea value={note} onChange={e => setNote(e.target.value)} rows={4} style={{ width: '100%', padding: '0.5rem' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Button colorScheme="yellow" onClick={handleOrder}>Order</Button>
                        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;