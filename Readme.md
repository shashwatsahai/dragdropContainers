Use npm start in backend to start node index.js which starts a express server
connects to a mongodb server on port 27017, localhost:27017, need to have mongodb setup

Features implemented->
1. Name A Container(or it will take automatically an id as name and id) and Click Add Container to Add a new Container
2. Add a name in inventory box and click Add inventory to add an item to that container's items array in db
3. Drag drop items(inventory) from one container to another to see changes in db container's item array

Features remaining->
1. Add a container to another
2. Add inventory count and info to inventory

`Backend`
Used mongodb at backend with express server for api handling,
Added model for containers considering items to be String elements with no extra info for now

`Client`
Used js, jquery-ui and bootstrap for design and implementation of ui, added in client/Helpers
