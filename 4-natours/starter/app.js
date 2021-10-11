const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

// app.get('/', (req, res) => {

//     res
//         .status(200)
//         .json({ message: 'Hello from the server side!', app: 'natours' });

// })


// app.post('/', (req, res) => {
//     res.send('you can post to this endpoint')


// })

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//gets all the tours
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours
        }
    })


});

//creating a new tour
app.post('/api/v1/tours', (req, res) => {
    //contains the data
    console.log(req.body);
    //ID for the new tour added
    const newId = tours[tours.length - 1].id + 1;

    //making the new tour an object and adding the ID to it
    const newTour = Object.assign({ id: newId }, req.body);


    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });


    });


});


//getting a specific tour
app.get('/api/v1/tours/:id', (req, res) => {
    // console.log(req.params)
    const tour = req.params
    const id = tour.id

    if (id > tours.length - 1) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    const requestedTour = tours[id];

    // console.log(tours[tour.id])


    res.status(200).json({
        status: 'success',
        result: {
            tour: requestedTour
        }

    });


});


const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});