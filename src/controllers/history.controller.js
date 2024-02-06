/ Require necessary modules

const express = require('express');
const router = express.Router();
// Mock data for history
const historyData = [
    { id: 1, event: 'Event 1', date: '2024-01-01' },
    { id: 2, event: 'Event 2', date: '2024-01-05' },
    { id: 3, event: 'Event 3', date: '2024-01-10' }
];
// GET route to fetch all history
router.get('/', (req, res) => {
    res.json(historyData);
});
// GET route to fetch history by id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const historyItem = historyData.find(item => item.id === id);
    if (!historyItem) {
        res.status(404).send('History item not found');
    } else {
        res.json(historyItem);
    }
});
// POST route to add a new history item
router.post('/', (req, res) => {
    const { event, date } = req.body;
    const id = historyData.length + 1; // Incrementing id
    const newHistoryItem = { id, event, date };
    historyData.push(newHistoryItem);
    res.status(201).json(newHistoryItem);
});
// PUT route to update an existing history item
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { event, date } = req.body;
    const historyItemIndex = historyData.findIndex(item => item.id === id);
    if (historyItemIndex === -1) {
        res.status(404).send('History item not found');
    } else {
        historyData[historyItemIndex] = { id, event, date };
        res.json(historyData[historyItemIndex]);
    }
});
// DELETE route to delete a history item
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const historyItemIndex = historyData.findIndex(item => item.id === id);
    if (historyItemIndex === -1) {
        res.status(404).send('History item not found');
    } else {
        historyData.splice(historyItemIndex, 1);
        res.status(204).send();
    }
});
module.exports = router;
