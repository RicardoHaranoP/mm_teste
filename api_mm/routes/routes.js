

import { Router } from "express";
import {  addPessoa, deletePessoa, pegaPessoa, updatePessoa } from "../controllers/PessoaController.js"

const router = Router()

router.get('/', pegaPessoa)
router.post('/', addPessoa)
router.put('/:id', updatePessoa)
router.delete('/:id', deletePessoa)

export default router