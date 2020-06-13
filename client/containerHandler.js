(function () {
    var containerHandler = {
        id: 1,
        addContainer: function () {
            this.id++;
            name = $('.containerName').val() || '#' + this.id;


            $('.containers').append(
                `  <div class='container' draggable="true" id=${this.id}>
                <div class='container-details'>${name}</div>
                <input type='text' class='inventoryName'></input>
                <input type='button' value='Add Inventory' onclick="containerHandler.addInventory()"></input>
                <button type="button" class="close" aria-label="Close" onclick="containerHandler.delete()">
                    <span aria-hidden="true">&times;</span>
                </button>  
            </div>`)

            $('.container').droppable({

                drop: function (event, ui) {
                    var originalParent = $(ui.draggable).parent().parent().attr('id');
                    $(event.target).append(ui.draggable);
                    if (event.target.children.length > 1) {
                        $(ui.draggable).position({
                            my: "right",
                            at: "horizontal",
                            of: event.target.children[1]
                        })
                    } else {
                        $(ui.draggable).position({
                            my: "right",
                            at: "horizontal",
                            of: event.target.children[1]
                        })
                    }
                    let headers = new Headers();

                    headers.append('Access-Control-Allow-Origin', '*');

                    //Add inventory to newly dragged container
                    var cont = $(event.target).attr('id');
                    var invName = $(ui.draggable).html();
                    invName = invName.trim().match(/(.*)/)[0];
                    fetch("http://localhost:3000/add-inventory?cont=" + cont + "&name=" + invName, {
                        headers: headers,
                        method: 'GET'
                    }).then(response => {
                        return response.text();
                    }).then(data => {
                        console.log(data);
                    })

                    //Remove inventory from original container
                    fetch("http://localhost:3000/delete-inventory?cont=" + originalParent + '&name=' + invName, {
                        headers: headers,
                        method: 'GET'
                    }).then(response => {
                        return response.text();
                    }).then(data => {
                        console.log(data);
                    })
                }
            });
            let headers = new Headers();

            headers.append('Access-Control-Allow-Origin', '*');

            fetch("http://localhost:3000/add-container?name=" + name + "&id=" + this.id, {
                headers: headers,
                method: 'GET'
            }).then(response => {
                return response.text();
            }).then(data => {
                console.log(data);
            })
        },
        addInventory: function () {
            var invName = $(event.target).parent().find('.inventoryName').val();
            if (invName == '') {
                return;
            } else {

                if ($(event.target).parent().find('.inventory').length > 0) {
                    $(event.target).parent().find('.inventory').append(`<div class="inventory-item">
                        ${invName}
                        <button type="button" class=" close" aria-label="Close" onclick="containerHandler.delete()">
                            <span aria-hidden="true">&times;</span>
                        </button>   
                    </div>`);
                } else {

                    $(event.target).parent().append(
                        `<div class="inventory">
                        <div class="inventory-item" draggable="true">
                            ${invName}
                            <button type="button" class=" close" aria-label="Close" onclick="containerHandler.delete()">
                                <span aria-hidden="true">&times;</span>
                            </button>   
                        </div>  
                    </div>`)
                }


            }

            $('.inventory-item').draggable({
                revert: function () {
                    return true;
                },
                stack: ".inventory-item",
            });
            let headers = new Headers();

            headers.append('Access-Control-Allow-Origin', '*');

            var cont = $(event.target).parent().attr('id')
            fetch("http://localhost:3000/add-inventory?cont=" + cont + "&name=" + invName, {
                headers: headers,
                method: 'GET'
            }).then(response => {
                return response.text();
            }).then(data => {
                console.log(data);
            })
        },
        delete: function () {
            let headers = new Headers();

            headers.append('Access-Control-Allow-Origin', '*');

            var remove = $(event.target).parent().parent()
            if ($(remove).hasClass('inventory-item')) {
                var invName = $(remove).html().trim().match(/(.*)/)[0];
                var parentName = $(remove).parent().parent().attr('id');
                fetch("http://localhost:3000/delete-inventory?cont=" + parentName + '&name=' + invName, {
                    headers: headers,
                    method: 'GET'
                }).then(response => {
                    return response.text();
                }).then(data => {
                    console.log(data);
                })
            } else if ($(remove).hasClass('container')) {
                var containerId = $(remove).attr('id');
                fetch("http://localhost:3000/delete-container?cont=" + containerId, {
                    headers: headers,
                    method: 'GET'
                }).then(response => {
                    return response.text();
                }).then(data => {
                    console.log(data);
                })
            }
            $(event.target).parent().parent().remove();
        },
        showAll() {
            let headers = new Headers();

            headers.append('Access-Control-Allow-Origin', '*');

            fetch("http://localhost:3000/show-all", {
                headers: headers,
                method: 'GET'
            }).then(response => {
                return response.json();
            }).then(data => {
                var html = '';
                console.log(data);
                for (var cont in data) {
                    this.id++;
                    html += `<div class='container ui-droppable' draggable='true' id=${data[cont]['id']}>`
                    html += ` <div class='container-details'>${data[cont]['name']}</div>`;
                    html += `<button type="button" class=" close" aria-label="Close" onclick="containerHandler.delete()">
                                    <span aria-hidden="true">&times;</span>
                                </button> `
                    html += `<input type='text' class='inventoryName'></input>
                                <input type='button' value='Add Inventory' onclick="containerHandler.addInventory()"></input>
                                <button type="button" class="close" aria-label="Close" onclick="containerHandler.delete()">
                                    <span aria-hidden="true">&times;</span>
                                </button>`
                    html += `<div class="inventory">`;
                    for (var ite in data[cont]['items']) {
                        
                        html += `<div class="inventory-item ui-draggable ui-draggable-handle" draggable="true" style="position: relative;">
                                ${data[cont]['items'][ite]}
                                <button type="button" class=" close" aria-label="Close" onclick="containerHandler.delete()">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>`
                    }
                    html+='</div>'
                    $('.containers').append(html);
                }
                console.log(html);
            });
        }
    }
    window.containerHandler = containerHandler;
})();