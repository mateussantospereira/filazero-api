#!/bin/bash
# Script para cópia de arquivos e substituição de palavras

tables=(
"appointment" "Agenda"
"doctor" "Médico"
"expedient" "Expediente"
"field" "Área Médica"
"hospital" "Hospital"
"weekday" "Dia da semana"
)

num_tables=${#tables[@]}

echo "$num_tables"

for (( i=0; i<num_tables; i+=2 )); do
    table=${tables[i]}
    name=${tables[i+1]}
    cp "../src/services/registersService.js" "../src/services/${table}sService.js"
    sed -i -e "s/register/${table}/g" -e "s/Registro/${name}/g" "../src/services/${table}sService.js"
    cp "../src/controllers/registersController.js" "../src/controllers/${table}sController.js"
    sed -i -e "s/register/${table}/g" -e "s/Registro/${name}/g" "../src/controllers/${table}sController.js"
done

