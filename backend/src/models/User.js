const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profile: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    }
})

//Transformando o password em hash antes de salvar na base de dados
UserSchema.pre('save', function (next) {
    if (this.isNew || this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, hashedPassword) => {
            if (err) {
                next(err)
            } else {
                this.password = hashedPassword;
                next()
            }
        })
    } else {
        next()
    }
})

//Metodo para verificar o password criptografado
UserSchema.methods.isCorrectPassword = async function (password) {
    try {
        const same = await bcrypt.compare(password, this.password);
        return same;
    } catch (error) {
        throw new Error(`Erro na comparação de senhas: ${error}`);
    }
}


module.exports = mongoose.model('Users', UserSchema)