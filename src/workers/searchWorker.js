var items = [];
self.onmessage = function(event) {
    if (event.data.action == 'getUsers') {
        var _self = self;
        var data = null;
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            var founds = 0;
            if (this.readyState === 4) {
                items = JSON.parse(this.responseText);
                _self.postMessage({
                    size: items.length,
                    data: items.slice(0, 100)
                });
            }
        });

        xhr.open("GET", "http://localhost:8080/src/pages/data.json");
        xhr.send(data);
    } else if (event.data.action = 'findUser') {
        var displayItems = event.data.filter.length > 0 ? items.filter(item => {
            return ('' + item.city).toUpperCase().indexOf(event.data.filter.toUpperCase()) >= 0 ||
                   ('' + item.state).toUpperCase().indexOf(event.data.filter.toUpperCase()) >= 0 ||
                   ('' + item.loc).toUpperCase().indexOf(event.data.filter.toUpperCase()) >= 0 ||
                   ('' + item.pop).toUpperCase().indexOf(event.data.filter.toUpperCase()) >= 0 ||
                   ('' + item._id).toUpperCase().indexOf(event.data.filter.toUpperCase()) >= 0;
        }) : items;

        self.postMessage({
            size: displayItems.length,
            data: displayItems.slice(0, 100)
        });
    }
}