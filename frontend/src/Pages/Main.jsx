import restauranfood from "../assets/restauranfood.jpg";
import greaksalad from "../assets/greeksalad.jpg";
import bruchetta from "../assets/bruchetta.svg";
import lemondesser from "../assets/lemondessert.jpg";

import { VStack, HStack } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react"; // ✅ make sure useState is imported
import "../Css/main.css"
import About from "./About";

const Main = () => {
    const location = useLocation();

    // ✅ Declare specials state
    const [specials, setSpecials] = useState([]);

    // ✅ Fetch specials from Django backend
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/specials/")
            .then((res) => res.json())
            .then((data) => setSpecials(data))
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace("#", "");
            const el = document.getElementById(id);
            if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
            return;
        }
        const target = location.state?.scrollTo;
        if (target) {
            const el = document.getElementById(target);
            if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
        }
    }, [location.pathname, location.hash, location.state]);

    return (
        <>
            <div className="hero">
                <div className="site-inner">
                    <div className="hero-text" id="text">
                        <h1>Little Lemon</h1>
                        <h2>Chicago</h2>
                        <p>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</p>
                        <Link to="/reservations"><button className="reserve-btn">Reserve a Table</button></Link>
                    </div>
                    <div className="hero-image" id="resteraunt-image">
                        <img src={restauranfood} alt="restaurant food" />
                    </div>
                </div>
            </div>

            <HStack justifyContent="space-between" alignItems="center" padding="1rem 5rem" margin="2rem 0">
                <h1 className="specials-title"><b>This Week Specials!</b></h1>
                <Link to="/menu"><button className="reserve-btn"><b>Online Menu</b></button></Link>
            </HStack>

            {/* ✅ Dynamic Specials Grid */}
            <section className="specials-grid">
                {specials.map((item) => (
                    <div key={item.id} className="special-item">
                        <img
                            src={
                                item.image
                                    ? (item.image.startsWith('http')
                                        ? item.image
                                        : `http://127.0.0.1:8000${item.image}`)
                                    : ''
                            }
                            alt={item.name}
                            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                        />
                        <h2>{item.name}</h2>
                        <p>${item.price}</p>
                        <p>{item.description}</p>
                    </div>
                ))}
            </section>

            <section className="testimonials">
                <h1 className="testimonial-title">Testimonials</h1>
                <HStack className="testimonial-cards" justifyContent="space-between">
                    <VStack className="testimonial-card">
                        <h3>4.5/5</h3>
                        <p>"The food was absolutely wonderful, from preparation to presentation, very pleasing."</p>
                        <h3>- John Doe</h3>
                    </VStack>
                    <VStack className="testimonial-card">
                        <h3>5/5</h3>
                        <p>"The atmosphere is amazing, and the staff is incredibly friendly and attentive."</p>
                        <h3>- Jane Smith</h3>
                    </VStack>
                    <VStack className="testimonial-card">
                        <h3>4.8/5</h3>
                        <p>"I highly recommend this restaurant to anyone looking for a great dining experience."</p>
                        <h3>- Mike Johnson</h3>
                    </VStack>
                </HStack>
            </section>

            <section id="about-section">
                <About />
            </section>
        </>
    );
};

export default Main;
