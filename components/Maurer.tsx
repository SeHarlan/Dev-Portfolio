import p5 from "p5"
import { FC, memo, useRef } from "react"
import debounce from "lodash.debounce";
import dynamic from "next/dynamic";
const P5Wrapper = dynamic(() => import('./P5Wrapper'), { ssr: false });

const Maurer: FC<{ className?: string }> = ({ className }) => { 
  const containerRef = useRef<HTMLDivElement>(null);

  const sketch = (p: p5) => {
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
      resizeCanvasToFitParent()
      p.stroke(0, 255*0.2)
    }

    let counter = 0;
    const counterInc = p.radians(1)
    let d = 2400 + 0.5
    let n = 2400 - 0.5
    // let d = -153 + 1
    // let n = -153 - 1.5
    p.draw = () => { 
      if (counter > p.TWO_PI - counterInc) return;
      p.translate(p.width / 2, p.height / 2);

      const radius = p.min(p.width, p.height) / 2;      
      const getVector = (num: number) => {
        let k = num * d;
        let r = radius * p.sin(n * k);
        let x = r * p.cos(k);
        let y = r * p.sin(k);
        return p.createVector(x, y);
      }

      const v1 = getVector(counter)
      const v2 = getVector(counter + counterInc)
      p.line(v1.x, v1.y, v2.x, v2.y)    

      counter += counterInc;
    }
    const resizeCanvasToFitParent = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        p.resizeCanvas(clientWidth, clientHeight);
      }
    };
    const deboucedResize = debounce(resizeCanvasToFitParent, 200);

    p.windowResized = () => {
      deboucedResize()
    };
    p.mouseClicked = () => { 
      if (p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height) return 
      p.clear(0,0,0,0)
      counter = 0
      d = p.round(p.randomGaussian(0, 1000))
      n = p.round(p.randomGaussian(0, 1000))
    }
  }
  return (
    <div ref={containerRef} className={className}>
      <P5Wrapper sketch={sketch} />
    </div>
  )
}

export default memo(Maurer)