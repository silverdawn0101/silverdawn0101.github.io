const canvas = document.createElement('canvas')
document.body.append(canvas)
canvas.width = innerWidth * 2
canvas.height = innerHeight * 2
document.body.style.margin = 0
const ctx = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height
canvas.style.width = innerWidth + 'px'
canvas.style.height = innerHeight + 'px'
ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
ctx.fillRect(0, 0, width, height)
 

let mx = 0,
  my = 0
onpointermove = (e) => {
  mx = e.clientX - innerWidth
  my = e.clientY / 300
}

const r = (n = 1) => Math.random() * n

function dejong(anchorX, anchorY) {
  const aOffset = (Math.random() - 0.5) * 2
  const bOffset = (Math.random() - 0.5) * 2
  const cOffset = (Math.random() - 0.5) * 2
  const dOffset = (Math.random() - 0.5) * 2

  let sx = Math.random() * 2 - 1
  let sy = Math.random() * 2 - 1
  let s = 20 + 240 * Math.random() * Math.random()

  let msx = 1 / (10 + Math.random() * 1000)
  let msy = 1 / (100 + Math.random() * 1000)

  let ox = 0
  //if (Math.random() < .3) ox = innerWidth
  //if (Math.random() < .1) ox = -innerWidth

  let fns = []
  for (let i = 0; i < 4; i++) fns.push(['sin', 'cos'][~~r(2)])

  let t = 0
  let rr = Math.PI * 2 * Math.random()
  return function () {
    const a = 1.4 + aOffset + (mx + ox) * msx
    const b = -2.3 + bOffset + my * msy
    const c = 2.4 + cOffset + my * msy
    const d = -2.1 + dOffset - (mx + ox) * msx

    let x = sx + t
    let y = sy + t
    t += 0.0001

    ctx.translate(anchorX, anchorY)
    ctx.rotate(rr)
    for (let i = 0; i < 500; i++) {
      let newX = Math[fns[0]](a * y) - Math[fns[2]](b * x)
      let newY = Math[fns[1]](c * x) - Math[fns[3]](d * y)
      x = newX
      y = newY

      const plotX = x * s
      const plotY = y * s

      ctx.fillStyle = 'rgba(255, 255, 255, 1)'
      ctx.fillRect(plotX, plotY, 2, 2)
    }
    ctx.setTransform(1, 0, 0, 1, 0, 0)
  }
}

let attractors = []

function gen() {
  attractors = []
  for (let i = 0; i < 20; i++) {
    attractors.push(dejong(Math.random() * width, Math.random() * height))
  }
}
gen()

let tim
onresize = e => {
  canvas.width = innerWidth * 2
  canvas.height = innerHeight * 2
  canvas.style.width = innerWidth + 'px'
  canvas.style.height = innerHeight + 'px'
 
  clearTimeout(tim)
  tim = setTimeout(() => {
     attractors = []
     gen()
  }, 200)
}

onclick = gen

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  attractors.forEach((fn) => fn())
  requestAnimationFrame(loop)
}
loop()