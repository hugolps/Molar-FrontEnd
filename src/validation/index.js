
export const onlyNumbers = (text) => {
    const numbers = text.replace(/[^\d]/g, "")
  
    return numbers
  }


export const isFormValid = (values, checked) => {
    return (values.nome && 
            values.email && 
            values.password && 
            values.telefone && 
            values.logradouro &&
            values.bairro &&
            values.numero &&
            values.cep &&
            values.cpf &&
            checked === true)
  }
    

export const validate = (fieldValues, errors, funcError, funcValidate) => {

    funcValidate(true)
    
    if (temp == {}) console.log('Prencha o formulário')

    let temp = {...errors}

    if ('nome' in fieldValues)
        temp.nome = fieldValues.nome ? "" : "É necessário preencher este campo."

    if ('email' in fieldValues)
        temp.email = (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(fieldValues.email) ? "" : "Este email não é válido."
    
    if ('telefone' in fieldValues)
        temp.telefone = (/^\s*(\d{2}|\d{0})[-. ]?(\d{5}|\d{4})[-. ]?(\d{4})[-. ]?\s*$/).test(fieldValues.telefone) ? "" : "O telefone deve ter no mínimo 11 dígitos (apenas números)"
    
    if ('password' in fieldValues)
        temp.password = fieldValues.password ? "" : "É necessário preencher o campo Password"
    
    if ('logradouro' in fieldValues) 
        temp.logradouro = fieldValues.logradouro ? "" : "É necessário preencher o campo Logradouro"
    
    if ('bairro' in fieldValues)
        temp.bairro = fieldValues.bairro ? "" : "É necessário preencher o campo Bairro"
    
    if ('numero' in fieldValues)
        temp.numero = !(/[^\d]/).test(fieldValues.numero) ? "" : "Preencha o campo Número adequadamente"
    
    if ('cep' in fieldValues)
        temp.cep = (/^([\d]{2})\.*([\d]{3})-*([\d]{3})/).test(fieldValues.cep) ? "" : "Preencha o campo CEP adequadamente"
    
    if ('cpf' in fieldValues)
        temp.cpf = (/([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/).test(fieldValues.cpf) ? "" : "Preencha o campo CPF adequadamente"

    funcError({
        ...temp
    })

    return Object.values(temp).every(x => x == "")
    }
