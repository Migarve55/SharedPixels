
let host = location.origin.replace(/^http/, 'ws')
let ws = new WebSocket(host);

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    this.updatePixel(data.pixelId, data.color);
};

function createBoard() {
    console.log("Creating board");
    for (let index = 0; index < 1000; index++) {
        createPixel(index, "red");
    }
}

function createPixel(id, color) {
    const pixel = document.createElement("div");
    pixel.id = id;
    pixel.classList.add("pixel");
    pixel.style.backgroundColor = color;
    pixel.addEventListener("click", function () {
        const newColor = "blue";
        updatePixel(id, newColor);
        const data = {
            pixelId: id,
            color: newColor 
        };
        ws.send(JSON.stringify(data));
    });
    document.getElementById("board").appendChild(pixel);
}

function updatePixel(id, color) {
    const pixel = document.getElementById(id);
    pixel.style.backgroundColor = color;
    
}

window.onload = createBoard;