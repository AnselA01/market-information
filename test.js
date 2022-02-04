src="https://unpkg.com/axios/dist/axios.min.js"

var url = "https://api.twelvedata.com/previous_close?apikey=921b0a05daf94bde867a7c42a2f236b0&dp=2&symbol=aapl"

axios.get(url)
.then(response => {
    var total = JSON.parse(response.data);
        var previous_close = total.values[0].previous_close;
        console.log(previous_close); 
})