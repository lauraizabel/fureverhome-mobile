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
  {
    defaultValue: '',
    label: 'E-mail',
    name: 'email',
    placeholder: 'Digite seu e-mail',
    required: true,
    type: 'text',
  },
  {
    defaultValue: '',
    label: 'Senha',
    name: 'password',
    placeholder: 'Digite sua senha',
    required: true,
    type: 'password',
  },
  {
    defaultValue: '',
    label: 'Confirmar senha',
    name: 'confirmPassword',
    placeholder: 'Digite sua senha novamente',
    required: true,
    type: 'password',
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
