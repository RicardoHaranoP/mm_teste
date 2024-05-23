import { db } from '../db.js'


export const pegaPessoa = (_,res) => {
    const q = "SELECT * FROM pessoa";
    
    db.query(q, (err,data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    })
}

export const addPessoa = (req,res) => {
    const q = "INSERT INTO pessoa(`nome`,`telefone`,`email`) VALUES(?)"

    const values = [
        req.body.nome,
        req.body.telefone,
        req.body.email
    ]
    
    db.query(q, [values], (err) => {
        if (err) {
            console.log(err)
            return res.json(err)
        };
        return res.status(200).json('Pessoa criada com sucesso!');
    })
}

export const updatePessoa = (req,res) => {
    const q = 'UPDATE pessoa SET `nome` = ?, `telefone`=?, `email`=? WHERE `id` = ? '

    const values = [
        req.body.nome,
        req.body.telefone,
        req.body.email
    ];

    
    db.query(q, [...values, req.params.id], (err) => {
        if (err) {
            console.log(err)
            return res.json(err)
        };
        return res.status(200).json('Pessoa atualizada com sucesso!');
    })
}

export const deletePessoa = (req, res) => {
    const q = 'DELETE FROM pessoa WHERE `id` = ? '

    db.query(q, [ req.params.id], (err) => {
        if (err) {
            console.log(err)
            return res.json(err)
        };
        return res.status(200).json('Pessoa deletada com sucesso!');
    })
}