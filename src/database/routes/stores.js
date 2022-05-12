const express = require('express'); 
const router = express.Router();

//???Schema can be imported as either???
//const Stores = require('../../models/StoreSchema');
const StoreSchema = require('../../models/StoreSchema');

// 1. GETS_ALL_POSTS_FROM_DATABASE
router.get('/', async (req, res) => {
    //res.send('we are on stores');
    try{
        console.log('stores fetched from database');
        const allStores = await StoreSchema.find();
        res.json(allStores);
    }catch(err){
        res.json({message:err})
    }
});


// 2. ADDS_SINGLE_POST_TO_DATABASE
router.post('/addstore', async (req, res) => {
    // 1. Converting the request data to a filled out Schema Template
    const packagedStore = new StoreSchema({
        storeName: req.body.storeName,
        storeAddress: req.body.storeAddress,
        storeNotes: req.body.storeNotes,
        profitList: req.body.profitList,
        position: req.body.position,
        storeId: req.body.storeId,
        lastVisited: req.body.lastVisited,
        markerColor: req.body.markerColor,
        tillRed: req.body.tillRed,
        tillYellow: req.body.tillYellow,
    });
    console.log('add route hit')
    // 2. Saves our packaged Schema template via a POST request
    try{
    const savedPost = await packagedStore.save();
    res.json(savedPost);
    res.status(200);
    console.log(savedPost);
    }catch(err){
        res.status(404);
        res.json({message: err});
    }

//OLD ***for reference***compare to try/catch***
/*     packagedStore.save()
        .then(data=>{
            res.status(200);
            console.log(data);
            res.json(data);
        })
        .catch(err=>{
            res.status(404);
            res.json({message: err});
        })
 */
});


// 3. GET_SPECIFIC_POST_FROM_DATABASE
router.get('/:storeId', async (req, res)=>{
    try{
    const selectedStore = await StoreSchema.findById(req.params.storeId);
    res.json(selectedStore);
    }catch(err){
        res.json({message:err});
    }
});

// 4. DELETE_A_SPECIFIC_POST_BY_ID
router.delete('/:storeId', async (req, res)=>{
    console.log('TRYING TO REMOVE');
    console.log(req.params.storeId);
    try{
        const removedStore = await StoreSchema.deleteOne({storeId: req.params.storeId});
        res.json(removedStore);
    }catch(err){
        res.json({message:err});
    }
});

// 5. UPDATE_A_STORE_BY_ID
router.patch('/:storeId', async (req, res)=>{
        console.log('patch route hit');
        console.log('new version of store after patch BELOW');
        console.log(req.body);
        
    try{
                                                   // takes two properties, 1. the id to select and 2. the updated info
        const updatedStore = await StoreSchema.updateOne({storeId: req.params.storeId}, {$set: req.body});
        res.json(updatedStore);
    }catch(err){
        res.json({message:err});
    }
});




module.exports = router;