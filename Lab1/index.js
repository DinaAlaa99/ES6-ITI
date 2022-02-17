class shape {
    x
    y
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    Area = () => {}
    circumference = () => {}
    log = (shape) => {
        console.log("Circumference: " + this.circumference() + " Area: " + this.Area() + " Type: " + this.constructor.name)
    }

}
class oval extends shape {
    a
    b
    constructor(x,y,a, b) {
        super(x,y)
        this.a = a
        this.b = b
    }
    Area = () => 3.14 * this.a * this.b
    circumference = () => 3.14 * (this.a + this.b)

}
class circle extends oval {
    r
    constructor(x, y, a, b,r) {
        super(x, y,a,b)
        this.r = r
    }
    Area = () => 3.14 * this.r * this.r
    circumference = () => 3.14 * (this.r + this.r)
}
class rectangle extends shape {
    height
    width
    constructor(x,y,height, width) {
        super(x, y)
        this.height = height
        this.width = width
    }
    Area = () => this.height * this.width
    circumference = () => 2 * (this.height + this.width)
}
class square extends rectangle {
    height
    width
    length
    constructor(x,y,height, width, length) {
        super(x, y,height,width)
        this.length = length
    }
    Area = () => this.length * this.length
    circumference = () => 2 * (this.length + this.length)
}
class drawArea {
    shapes=[]
    constructor() {
        this.shapes = []
    }
    Add(shape) {
        this.shapes.push(shape)
    }
    log() {
        for (let shape of this.shapes)
            shape.log()
    }
}
function main() {

    let sh = new drawArea()

    let sh1 = new oval(0, 0, 2, 2)
    sh.Add(sh1)

    let sh2 = new circle(0, 0, 2, 2, 4)
    sh.Add(sh2)

    let sh3 = new rectangle(0, 0, 2, 4)
    sh.Add(sh3)

    let sh4 = new square(0, 0, 2, 2, 2)
    sh.Add(sh4)

    sh.log()
}
main()
    
