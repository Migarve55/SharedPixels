
let host = location.origin.replace(/^http/, 'ws')
let ws = new WebSocket(host);

const colors = ["white", "red", "blue", "green", "yellow"];

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    this.updatePixel(data.pixelId, data.color);
};

function createBoard() {
    console.log("Creating board");
    fetch("/api/pixels")
    .then(response => response.json())
    .then(data => {
        data.forEach(pixel => {
            createPixel(pixel.id, pixel.color);
        });
    });
}

function createPixel(id, color) {
    const pixel = document.createElement("div");
    pixel.id = id;
    pixel.classList.add("pixel");
    pixel.style.backgroundColor = color;
    pixel.addEventListener("click", function(event) {
        const cindex = colors.findIndex(c => c === event.target.style.backgroundColor);
        const newColor = colors[(cindex + 1) % colors.length]
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