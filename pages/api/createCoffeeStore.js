import { table, getMinifiedRecords, findRecordByFilter } from '../../lib/airtable';

const createCoffeeStore = async (req, res) => {
    if(req.method === "POST") {
        // find a record
        const { id, name, neiborhood, address, imgUrl, voting } = req.body;

        try {
            if(id) {
                const records = await findRecordByFilter(id)

                if(records.length !== 0) {
                    res.json(records);
                } else {
                    // create a record
                    if(name) {
                        const createRecords = await table.create([
                            {
                                fields: {
                                    id,
                                    name,
                                    address,
                                    neiborhood,
                                    voting,
                                    imgUrl,
                                }
                            }
                        ]);

                        const records = getMinifiedRecords(createRecords)
                        res.json(records);
                    } else {
                        res.status(400);
                        res.json({ message: "Name is missing" });
                    }
                }
            } else {
                res.status(400);
                res.json({ message: "ID is missing" });
            }
        } catch (err) {
            console.error('Error creating or finding a store', err);
            res.status(500);
            res.json({ message: "Error creating or finding store", err });
        }
    }
}

export default createCoffeeStore;