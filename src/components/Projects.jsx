import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Modern Weather App",
    url: "https://modern-weather-fqvm2be9r-golu098.vercel.app/",
    image: "dist/projects/Screenshot 2023-10-29 01.03.39.png",
    description: "This app is used to display weather details with best user interface",
  },
  {
    title: "Vidyarthi Khata ",
url:"https://vidyarthi-khata.vercel.app/",
    image: "dist/projects/Screenshot 2023-10-29 01.08.22.png",
    description: "App which govern all the investment which you got from office or home",
  },
  {
    title: "Study Notion",
    url:"dist/projects/Screenshot 2023-10-29 01.22.11.png",
    image: "dist/projects/Screenshot 2023-10-29 01.22.11.png",
    description: "This is a LMS website which aims to provide free acess to all contents",
  },
  // {
  //   title: "Kanagame",
  //   url: "https://www.youtube.com/watch?v=zwNF1-lsia8",
  //   image: "projects/kanagame.jpg",
  //   description: "Use React Three Fiber to create a 3D game",
  // },
  // {
  //   title: "Loader",
  //   url: "https://www.youtube.com/watch?v=L12wIvuZTOY",
  //   image: "projects/loader.jpg",
  //   description: "Create a loading screen for your r3f projects",
  // },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[2, 2.2, 5]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.1}
        position={[-1, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 2.5,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
