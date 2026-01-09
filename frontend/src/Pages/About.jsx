import { HStack, Box, Image } from "@chakra-ui/react";
import MarioAdiranb from "../assets/Mario and Adrian b.jpg";
import MarioAndiranA from "../assets/Mario and Adrian A.jpg";

const About = () => {
  return (
    <section className="about-us" id="about-section">
      <HStack
        className="about-us-inner"
        justifyContent="space-between"
        alignItems="center"     // centers vertically
        spacing={10}
        px={12}                 // optional: adds left/right padding
      >
        <Box className="about-us-text" width="66%"  maxW="50%" padding={4}>
          <h1 id="about-title">About Us</h1>
          <p>
            Welcome to Little Lemon, where we bring the flavors of the
            Mediterranean to your table. Our restaurant is a family-owned
            establishment that prides itself on using traditional recipes and
            fresh ingredients to create delicious dishes with a modern twist.
            Whether you're in the mood for a light salad or a hearty entree, our
            menu has something for everyone. We also offer a variety of
            vegetarian and gluten-free options to accommodate all dietary needs.
            Come dine with us and experience the taste of the Mediterranean in a
            warm and inviting atmosphere.
          </p>
        </Box>
        <Box position="relative"
          flex="0 0 33%"                  // take ~1/3 of the width on larger screens
          minW="240px"
          minH={{ base: "260px", md: "360px", lg: "420px" }} // explicit height so top % works
          display="flex"
          justifyContent="center"
          alignItems="center"
         >
          {/* Base image */}
          <Image src={MarioAndiranA}
            alt="Restaurant interior"
            borderRadius="sm"
            boxShadow="md"
            id="about-image1"
            position="absolute"
            top="30%"              // 1/4 down from container top
            left="15%"              // small left inset
            width="84%"            // fit within container
            maxH="70%"             // prevents it from overflowing vertically
            objectFit="cover"
            zIndex={1}
            />
  {/* Top overlapping image */}
          <Image
            src={MarioAdiranb}
            alt="Chef preparing food"
            borderRadius="sm"
            boxShadow="lg"
            position="absolute"
            top="10%"               // sits higher than the base image
            right="50%"             // small inset from container right edge
            width="56%"
            maxH="65%"
            objectFit="cover"
            zIndex={2}
          />
        </Box>
      </HStack>
    </section>
  );
};
export default About;