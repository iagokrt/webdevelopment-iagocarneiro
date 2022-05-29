import { createRef } from "react"
import { Vector3 } from "three"

const state = {
  sections: 8,
  pages: 8.5,
  zoom: 75,
  paragraphs: [
    {
      offset: 0.8,
      factor: 1.25,
      header: " ",
      image: "/abc1.jpg",
      aspect: 1.51,
      text: "I am an Creative ‌V‌isual Digital Developer based in Brazil‌.‌ I am deeply rooted in the underground web community‌,‌ where I share and study a lot of the current industry‌ around the world. \n I started as a graphic designer using CorelDraw, nowdays I actually code Shaders."
    },
    {
      offset: 2,
      factor: 2.0,
      header: "Creative Design Spirit",
      image: "/abc2.jpg",
      aspect: 1.5,
      text:
        "I have a very distinct and expressive way of building things,‌ branding my own ideas into commerces. My expertises are designing - coding to web and bringing more flexible solutions within it. Either by creating a mobile responsive app or built renderers to visualize data."

      },
    {
      offset: 3,
      factor: 2.25,
      header: "Projects",
      image: "/abc3.jpg",
      aspect: 1.5037,
      text:
      "Find a lot of cool projects on GitHub Repository"

    },
    {
      offset: 4,
      factor: 1.75,
      header: "Contact",
      image: "/abc4.jpg",
      aspect: 1.55,
      text:
        "If you want to work with me the best way to contact is through e-mail contact at: iagoeletronicaifsc@gmail.com"
    },
    { offset: 7, factor: 1.05, header: "Location", image: "/photo-1548191265-cc70d3d45ba1.jpeg", aspect: 1.77, text: "If you find yourself amazed and inspired by my work, hire me! I'm available for any artistic creation around our world." }
  ],
  stripes: [
    { offset: 0, color: "#721d1d", height: 13 },
    { offset: 6.3, color: "#000", height: 20 }
  ],
  top: createRef()
}

export default state
