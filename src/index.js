import ReactDOM from "react-dom"
import React, { Suspense, useEffect, useRef, useMemo } from "react"
import { Canvas, Dom, useLoader, useFrame } from "react-three-fiber"
import { TextureLoader, LinearFilter } from "three"
import lerp from "lerp"
import { Text, MultilineText } from "./components/Text"
import Diamonds from "./diamonds/Diamonds"
import Plane from "./components/Plane"
import { Block, useBlock } from "./blocks"
import state from "./store"
import "./styles.css"

function Startup() {
  const ref = useRef()
  useFrame(() => (ref.current.material.opacity = lerp(ref.current.material.opacity, 0, 0.025)))
  return <Plane ref={ref} color="#0e0e0f" position={[0, 0, 200]} scale={[100, 100, 1]} />
}

function Paragraph({ image, index, offset, factor, header, aspect, text }) {
  const { contentMaxWidth: w, canvasWidth, margin, mobile } = useBlock()
  const size = aspect < 1 && !mobile ? 0.65 : 1
  const alignRight = (canvasWidth - w * size - margin) / 2
  const pixelWidth = w * state.zoom * size
  const left = !(index % 2)
  const color = index % 2 ? "#D40749" : "#2FE8C3"
  return (
    <Block factor={factor} offset={offset}>
      <group position={[left ? -alignRight : alignRight, 0, 0]}>
        <Plane map={image} args={[1, 1, 32, 32]} shift={200} size={size} aspect={aspect} scale={[w * size, (w * size) / aspect, 1]} frustumCulled={false} />
        <Dom
          style={{ width: pixelWidth / (mobile ? 1 : 2), textAlign: left ? "left" : "right" }}
          position={[left || mobile ? (-w * size) / 2 : 0, (-w * size) / 2 / aspect - 0.4, 1]}>
          {text}
        </Dom>
        <Text left={left} right={!left} size={w * 0.04} color={color} top position={[((left ? -w : w) * size) / 2, (w * size) / aspect / 2 + 0.5, -1]}>
          {header}
        </Text>
       
      </group>
    </Block>
  )
}

function Content() {
  const images = useLoader(
    TextureLoader,
    state.paragraphs.map(({ image }) => image)
  )
  useMemo(() => images.forEach(texture => (texture.minFilter = LinearFilter)), [images])
  const { contentMaxWidth: w, canvasWidth, canvasHeight, mobile } = useBlock()
  return (
    <>
      <Block factor={1} offset={0}>
        <Block factor={1.2}>
          <Text left size={w * 0.08} position={[-w / 3.2, 3.5, -3]} color="#214252">
            {`iagocarneiro\n`}
          </Text>
          <Text left size={w * 0.08} position={[-w / 3.2, -1.0, -10]} color="#909e41">
          {`webdev`}
        </Text>
        </Block>
       
      </Block>
      <Block factor={1.2} offset={5.7}>
        <MultilineText top left size={w * 0.15} lineHeight={w / 8.2} position={[-w / 3.5, 0, -0.5]} color="crimson" text={"ia\ngo\n"} />
      </Block>
      {state.paragraphs.map((props, index) => (
        <Paragraph key={index} index={index} {...props} image={images[index]} />
      ))}
      {state.stripes.map(({ offset, color, height }, index) => (
        <Block key={index} factor={-1.5} offset={offset}>
          <Plane args={[50, height, 32, 32]} shift={-4} color={color} rotation={[0, 0, Math.PI / 8]} position={[0, 0, -5]} />
        </Block>
        
      ))}
      <Block factor={1.0}>
        <Dom position={[-w / 3.2, w * 0.07, -1]}>I'm an expert with drawings. Digital Design web and programmer.{mobile ? <br /> : " "} {mobile ? <br /> : " "}Digital Graphic Designer.</Dom>
      </Block>
    </>
  )
}

function App() {
  const scrollArea = useRef()
  const onScroll = e => (state.top.current = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])
  return (
    <>
      <Canvas concurrent pixelRatio={1} orthographic camera={{ zoom: state.zoom, position: [0, 0, 500] }}>
        <Suspense fallback={<Dom center className="loading" children="Loading..." />}>
          <Content />
          <Startup />
                <mesh>
                  <boxGeometry args={[1, 10, 1]} />
                  <meshStandardMaterial color={"orange"} />
                </mesh>
        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        {new Array(state.sections).fill().map((_, index) => (
          <div key={index} id={"0" + index} style={{ height: `${(state.pages / state.sections) * 100}vh` }} />
        ))}
      </div>
      <div className="frame">
        <h1 className="frame__title">
          <img alt="logotype" src="/icon.png" />
          <span>IagoCarneiro</span>
        </h1>
        <div className="frame__links">
          <a className="frame__link" href="https://www.linkedin.com/in/iagobarreto/">
            LinkedIn
          </a>
          <a className="frame__link" href="https://github.com/iagokrt">
          GitHub
          </a>
          <a className="frame__link" href="#05" children="Contact" />
        </div>
        <div className="frame__nav">
          <a className="frame__link" href="#01" children="About" />
          <a className="frame__link" href="#03" children="Coding" />
          <a className="frame__link" href="#07" children="Location" />
        </div>
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
