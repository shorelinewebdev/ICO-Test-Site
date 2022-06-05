document.getElementById("input").addEventListener("input", function(){
    document.getElementById("nova-input").value = this.value*8;
});

document.getElementById("nova-input").addEventListener("input", function(){
    document.getElementById("input").value = this.value/18;
});