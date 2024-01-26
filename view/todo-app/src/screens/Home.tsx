import SideBar from "../component/sideAppBAr/SideBar";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import TodoCard from "../component/TodoCard/TodoCard";
import Masonry from "react-masonry-css";
const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};
const todos = [
  {
    title: "Complete Coding Assignment",
    description:
      "Finish the coding assignment for the MERN stack course. Make sure to test all functionalities and optimize the code.",
    done: false,
    userId: "User1",
  },
  {
    title: "Plan Weekend Getaway",
    description:
      "Plan a relaxing weekend getaway to the mountains. Research nearby locations, activities, and accommodations. Pack essentials and prepare an itinerary.",
    done: false,
    userId: "User2",
  },
  {
    title: "Learn New Web Development Framework",
    description:
      "Explore and learn a new web development framework. Research its features, advantages, and disadvantages. Build a small project to practice the concepts.",
    done: false,
    userId: "User3",
  },
  {
    title: "Create Personal Blog",
    description:
      "Start a personal blog to share experiences and knowledge. Choose a niche, set up a website, and regularly update with interesting and informative content.",
    done: false,
    userId: "User4",
  },
  {
    title: "Attend Networking Event",
    description:
      "Attend a local networking event in the tech industry. Prepare an elevator pitch, bring business cards, and connect with professionals in your field.",
    done: false,
    userId: "User5",
  },
  {
    title: "Build Fitness Tracking App",
    description:
      "Develop a fitness tracking app using the MERN stack. Include features like workout logs, progress tracking, and goal setting for a comprehensive user experience.",
    done: false,
    userId: "User6",
  },
  {
    title: "Start Podcast Series",
    description:
      "Launch a podcast series discussing emerging technologies and industry trends. Plan topics, invite guest speakers, and create an engaging and informative show.",
    done: false,
    userId: "User7",
  },
  {
    title: "Volunteer for Community Cleanup",
    description:
      "Get involved in a local community cleanup initiative. Coordinate with neighbors, gather supplies, and contribute to creating a cleaner and healthier environment.",
    done: false,
    userId: "User8",
  },
  {
    title: "Read Classic Literature",
    description:
      "Dive into classic literature by reading a timeless novel. Choose a book from renowned authors and explore the depth of storytelling and language.",
    done: false,
    userId: "User9",
  },
  {
    title: "Explore Photography",
    description:
      "Take up photography as a hobby. Invest in a good camera, learn the basics of composition and lighting, and capture moments that tell a compelling story.",
    done: false,
    userId: "User10",
  },
  {
    title: "Plan Weekend Getaway",
    description:
      "Plan a relaxing weekend getaway to the mountains. Research nearby locations, activities, and accommodations. Pack essentials and prepare an itinerary.",
    done: false,
    userId: "User2",
  },
  {
    title: "Learn New Web Development Framework",
    description:
      "Explore and learn a new web development framework. Research its features, advantages, and disadvantages. Build a small project to practice the concepts.",
    done: false,
    userId: "User3",
  },
  {
    title: "Create Personal Blog",
    description:
      "Start a personal blog to share experiences and knowledge. Choose a niche, set up a website, and regularly update with interesting and informative content.",
    done: false,
    userId: "User4",
  },
  {
    title: "Attend Networking Event",
    description:
      "Attend a local networking event in the tech industry. Prepare an elevator pitch, bring business cards, and connect with professionals in your field.",
    done: false,
    userId: "User5",
  },
  {
    title: "Build Fitness Tracking App",
    description:
      "Develop a fitness tracking app using the MERN stack. Include features like workout logs, progress tracking, and goal setting for a comprehensive user experience.",
    done: false,
    userId: "User6",
  },
  {
    title: "Start Podcast Series",
    description:
      "Launch a podcast series discussing emerging technologies and industry trends. Plan topics, invite guest speakers, and create an engaging and informative show.",
    done: false,
    userId: "User7",
  },
  {
    title: "Volunteer for Community Cleanup",
    description:
      "Get involved in a local community cleanup initiative. Coordinate with neighbors, gather supplies, and contribute to creating a cleaner and healthier environment.",
    done: false,
    userId: "User8",
  },
  {
    title: "Read Classic Literature",
    description:
      "Dive into classic literature by reading a timeless novel. Choose a book from renowned authors and explore the depth of storytelling and language.",
    done: false,
    userId: "User9",
  },
  {
    title: "Explore Photography",
    description:
      "Take up photography as a hobby. Invest in a good camera, learn the basics of composition and lighting, and capture moments that tell a compelling story.",
    done: false,
    userId: "User10",
  },
];

const Home = () => {
  return (
    <>
      <SideBar>
        <Container maxWidth="lg">
          <Typography variant="h1">TODO</Typography>
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {todos.map((item, index) => (
              <div key={index}>
                <TodoCard {...item} />
              </div>
            ))}
          </Masonry>
        </Container>
      </SideBar>
    </>
  );
};

export default Home;
