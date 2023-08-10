import { FieldData } from 'app/data/models';

export const firstStepFields: FieldData[] = [
  {
    defaultValue: '',
    label: 'Nome',
    name: 'firstName',
    placeholder: 'Digite seu nome',
    required: true,
    type: 'text',
  },
  {
    defaultValue: '',
    label: 'Sobrenome',
    name: 'lastName',
    placeholder: 'Digite seu sobrenome',
    required: true,
    type: 'text',
  },
];

export const secondStepFields: FieldData[] = [
  {
    defaultValue: '',
    label: 'Data de Nascimento',
    name: 'dateOfBith',
    required: true,
  },
  {
    defaultValue: '',
    label: 'Telefone',
    name: 'phone',
    placeholder: 'Digite seu telefone',
    required: true,
    type: 'number',
  },
  {
    defaultValue: '',
    label: 'Tipo de conta',
    name: 'type',
    required: false,
    type: 'text',
  },
  {
    defaultValue: '',
    label: 'CPF',
    name: 'cpf',
    placeholder: 'Digite seu CPF (opcional)',
    required: false,
    type: 'text',
  },
  {
    defaultValue: '',
    label: 'CNPJ',
    name: 'cnpj',
    placeholder: 'Digite seu CNPJ (opcional)',
    required: false,
    type: 'text',
  },
];
