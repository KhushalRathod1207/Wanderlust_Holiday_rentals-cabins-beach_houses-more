const Listing = require("../model/listing.js");


module.exports.search_model = async (req, res) => {
    const query = req.query.query;
    // console.log('Searching for:', query);
    try {
        const results = await Listing.find({
            title: { $regex: query, $options: 'i' }
        });
        // console.log('Found results:', results);
        res.render('searchResults.ejs', { results, query });
    } catch (err) {
        // console.error(err);
        res.status(500).send('Server Error');
    }
}

