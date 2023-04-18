const mongoose = require ("mongoose")

const codeSchema= mongoose.Schema({
    code:{type:String, required: true},
    lang:{type:String, required: true}
}, {
    versionKey: false
})

const CodeModel= mongoose.model("code",codeSchema);

module.exports = {
    CodeModel,
};