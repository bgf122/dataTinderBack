const Program = require('./model');

exports.get_all_programs = async (req, res) => {
    if (req.query.random !== undefined) {
        try {
            const program = await Program.aggregate([{ $sample: { size: Number(req.query.random) } }])
            res.json(program);
        } catch (err) {
            res.json({ message:err });
        }
    } else {
        try {
            const programs = await Program.find();
            res.json(programs);
        } catch (err) {
            res.json({ message:err });
        }
    }
    
};

exports.get_program = async (req, res) => {
    try {
        const program = await Program.findById(req.params.programId);
        res.json(program);
    } catch (err) {
        res.json({ message:err });
    }
};

