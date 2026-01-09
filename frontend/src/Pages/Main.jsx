import restauranfood from "../assets/restauranfood.jpg";
import greaksalad from "../assets/greeksalad.jpg";
import bruchetta from "../assets/bruchetta.svg";
import lemondesser from "../assets/lemondessert.jpg";

import { VStack, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../Css/main.css"
import About from "./About";

const Main = () => {
    const location = useLocation();

   useEffect(() => {
    console.log("Main: location changed", location);
    // 1. prefer explicit hash in URL
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      console.log("Main: location.hash found", location.hash, "element?", !!el);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
      }
      return;
    }

    const target = location.state?.scrollTo;
    if (target) {
      const el = document.getElementById(target);
      console.log("Main: state.scrollTo ->", target, "element?", !!el);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 80);
      }
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
            <section className="specials-grid">
                <article className="specials" id="Greek Salad">
                    <VStack>
                        <img src={greaksalad} alt="Greek Salad" />
                        <HStack>
                            <h3>Greek Salad</h3>
                            <h4>$12.99</h4>
                        </HStack>
                        <p>The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons.</p>
                        <Link to="/order-Online"><button>Order a Delivery</button></Link>
                    </VStack>
                </article>
                <article className="specials" id="Bruchetta">
                    <VStack>
                        <img src={bruchetta} alt="Bruchetta" />
                        <HStack>
                            <h3>Bruchetta</h3>
                            <h4>$5.99</h4>
                        </HStack>
                        <p>Our Bruchetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil.</p>
                        <Link to="/order-Online"><button>Order a Delivery</button></Link>
                    </VStack>
                </article>
                <article className="specials" id="Lemon Desser">
                    <VStack>
                        <img src={lemondesser} alt="Lemmon Dessert" />
                        <HStack>
                            <h3>Lemon Dessert</h3>
                            <h4>$5.00</h4>
                        </HStack>
                        <p>This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined</p>
                        <Link to="/order-Online"><button>Order a Delivery</button></Link>
                    </VStack>
                </article>
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