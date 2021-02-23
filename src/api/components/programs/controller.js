const Program = require('./model');

exports.get_all_programs = async (req, res) => {
    try {
        const programs = await Program.find({});
        res.json(programs);
    } catch (err) {
        res.json({ message:err});
    }
}

exports.get_program = async (req, res) => {
    try {
        const program = await Program.findById(req.params.programId);
        res.json(program)
    } catch (err) {
        res.json({ message:err})
    }
}
